import { IDisposable, Disposable, toDisposable } from 'vs/base/common/lifecycle';
import { TPromise } from 'vs/base/common/winjs.base';
import { Schemas } from 'vs/base/common/network';
import * as objects from 'vs/base/common/objects';
import * as strings from 'vs/base/common/strings';
import { FileMatch, IFileMatch, ISearchComplete, ISearchConfiguration, ISearchProgressItem, ISearchQuery, ISearchResultProvider, ISearchService, LineMatch, pathIncludedInQuery, QueryType } from 'vs/platform/search/common/search';
import uri from 'vs/base/common/uri';
import { IModelService } from 'vs/editor/common/services/modelService';
import { IUntitledEditorService } from 'vs/workbench/services/untitled/common/untitledEditorService';
import { IEnvironmentService } from 'vs/platform/environment/common/environment';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { ResourceMap } from 'vs/base/common/map';
import { ICodeSandboxService } from 'vs/codesandbox/services/codesandbox/common/codesandbox';

/**
 * A service that enables to search for files or with in files.
 */
export class CodeSandboxSearchService extends Disposable implements ISearchService {
	_serviceBrand: any;
	private diskSearch: DiskSearch;
	private fileSearchProvider: ISearchResultProvider;
	private readonly searchProviders: ISearchResultProvider[] = [];

	constructor(
		@ICodeSandboxService private codesandboxService: ICodeSandboxService,
		@IModelService private modelService: IModelService,
		@IUntitledEditorService private untitledEditorService: IUntitledEditorService,
		@IEnvironmentService environmentService: IEnvironmentService,
		@IConfigurationService private configurationService: IConfigurationService,
	) {
		super();

		this.diskSearch = new DiskSearch();
	}

	search(query: ISearchQuery, onProgress?: (result: ISearchProgressItem) => void): TPromise<ISearchComplete> {
		if (this.fileSearchProvider) {
			return this.fileSearchProvider.search(query);
		}

		const localResults = this.getLocalResults(query);

		const modulesByPath = this.codesandboxService.getFilesByPath();


		return new TPromise(r => r({
			results: Object.keys(modulesByPath).map(p => ({resource: uri.file(p)}))
		}));
	}

	public extendQuery(query: ISearchQuery): void {
		const configuration = this.configurationService.getValue<ISearchConfiguration>();

		// Configuration: Encoding
		if (!query.fileEncoding) {
			const fileEncoding = configuration && configuration.files && configuration.files.encoding;
			query.fileEncoding = fileEncoding;
		}

		// Configuration: File Excludes
		if (!query.disregardExcludeSettings) {
			const fileExcludes = objects.deepClone(configuration && configuration.files && configuration.files.exclude);
			if (fileExcludes) {
				if (!query.excludePattern) {
					query.excludePattern = fileExcludes;
				} else {
					objects.mixin(query.excludePattern, fileExcludes, false /* no overwrite */);
				}
			}
		}
	}

	public clearCache(cacheKey: string): TPromise<void> {
		return TPromise.join([
			...this.searchProviders,
			this.fileSearchProvider,
			this.diskSearch
		].map(provider => provider && provider.clearCache(cacheKey)))
			.then(() => { });
	}

	public registerSearchResultProvider(scheme: string, provider: ISearchResultProvider): IDisposable {
		if (scheme === 'file') {
			this.fileSearchProvider = provider;
		} else {
			this.searchProviders.push(provider);
		}

		return toDisposable(() => {
			if (scheme === 'file') {
				this.fileSearchProvider = null;
			} else {
				const idx = this.searchProviders.indexOf(provider);
				if (idx >= 0) {
					this.searchProviders.splice(idx, 1);
				}
			}
		});
	}

	private getLocalResults(query: ISearchQuery): ResourceMap<IFileMatch> {
		const localResults = new ResourceMap<IFileMatch>();

		if (query.type === QueryType.Text) {
			let models = this.modelService.getModels();

			models.forEach((model) => {
				let resource = model.uri;
				if (!resource) {
					return;
				}

				// Support untitled files
				if (resource.scheme === Schemas.untitled) {
					if (!this.untitledEditorService.exists(resource)) {
						return;
					}
				}

				// Don't support other resource schemes than files for now
				// todo@remote
				// why is that? we should search for resources from other
				// schemes
				else if (resource.scheme !== Schemas.file) {
					return;
				}

				if (!this.matches(resource, query)) {
					return; // respect user filters
				}

				// Use editor API to find matches
				let matches = model.findMatches(query.contentPattern.pattern, false, query.contentPattern.isRegExp, query.contentPattern.isCaseSensitive, query.contentPattern.isWordMatch ? query.contentPattern.wordSeparators : null, false, query.maxResults);
				if (matches.length) {
					let fileMatch = new FileMatch(resource);
					localResults.set(resource, fileMatch);

					matches.forEach((match) => {
						fileMatch.lineMatches.push(new LineMatch(model.getLineContent(match.range.startLineNumber), match.range.startLineNumber - 1, [[match.range.startColumn - 1, match.range.endColumn - match.range.startColumn]]));
					});
				} else {
					localResults.set(resource, null);
				}
			});
		}

		return localResults;
	}

	private matches(resource: uri, query: ISearchQuery): boolean {
		// file pattern
		if (query.filePattern) {
			if (resource.scheme !== Schemas.file) {
				return false; // if we match on file pattern, we have to ignore non file resources
			}

			if (!strings.fuzzyContains(resource.fsPath, strings.stripWildcards(query.filePattern).toLowerCase())) {
				return false;
			}
		}

		// includes
		if (query.includePattern) {
			if (resource.scheme !== Schemas.file) {
				return false; // if we match on file patterns, we have to ignore non file resources
			}
		}

		return pathIncludedInQuery(query, resource.fsPath);
	}
}

export class DiskSearch implements ISearchResultProvider {

	public search(query: ISearchQuery, onProgress?: (p: ISearchProgressItem) => void): TPromise<ISearchComplete> {
		const folderQueries = query.folderQueries || [];

		return new TPromise(re => {
			re({
				results: [],
				limitHit: false,
			});
		});

		// return TPromise.join(folderQueries.map(q => q.folder.scheme === Schemas.file && fs.exists(q.folder.fsPath)))
		// 	.then(exists => {
		// 		const existingFolders = folderQueries.filter((q, index) => exists[index]);
		// 		const rawSearch = this.rawSearchQuery(query, existingFolders);

		// 		let event: Event<ISerializedSearchProgressItem | ISerializedSearchComplete>;
		// 		if (query.type === QueryType.File) {
		// 			event = this.raw.fileSearch(rawSearch);
		// 		} else {
		// 			event = this.raw.textSearch(rawSearch);
		// 		}

		// 		return DiskSearch.collectResultsFromEvent(event, onProgress);
		// 	});
	}

	public clearCache(cacheKey: string) {
		return new TPromise(r => r(undefined));
	}
}
