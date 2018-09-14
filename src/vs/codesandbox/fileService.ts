import URI from 'vs/base/common/uri';
import { FileOperationEvent, IContent, IFileService, IResolveFileOptions, IResolveFileResult, IResolveContentOptions, IFileStat, IStreamContent, IUpdateContentOptions, FileChangesEvent, ICreateFileOptions, ITextSnapshot, IFileSystemProviderRegistrationEvent, IFileSystemProvider, IResourceEncodings, IStringStream } from 'vs/platform/files/common/files';
import { TPromise } from 'vs/base/common/winjs.base';
import { IDisposable, Disposable } from 'vs/base/common/lifecycle';
import { Event, Emitter } from 'vs/base/common/event';
import { ICodeSandboxService } from 'vs/codesandbox/services/codesandbox/common/codesandbox';
import { basename } from 'path';

const createStreamFromString = (value: string): IStringStream => ({
	on(e, cb) {
		if (e === 'data') {
			cb(value);
		}

		if (e === 'end') {
			cb();
		}
	},
});

const createFileFromModule = (p, m) => ({
	isDirectory: false,
	resource: URI.file(p),
	etag: undefined,
	mtime: new Date(m.updatedAt).getTime(),
	name: basename(p),
});

export class CodeSandboxFileService extends Disposable implements IFileService {
	_serviceBrand: any; encoding: IResourceEncodings;

	constructor(
		@ICodeSandboxService private codesandboxService: ICodeSandboxService,
	) {
		super();
	}

	protected readonly _onFileChanges: Emitter<FileChangesEvent> = this._register(new Emitter<FileChangesEvent>());
	get onFileChanges(): Event<FileChangesEvent> { return this._onFileChanges.event; }

	protected readonly _onAfterOperation: Emitter<FileOperationEvent> = this._register(new Emitter<FileOperationEvent>());
	get onAfterOperation(): Event<FileOperationEvent> { return this._onAfterOperation.event; }

	protected readonly _onDidChangeFileSystemProviderRegistrations = this._register(new Emitter<IFileSystemProviderRegistrationEvent>());
	get onDidChangeFileSystemProviderRegistrations(): Event<IFileSystemProviderRegistrationEvent> { return this._onDidChangeFileSystemProviderRegistrations.event; }

	registerProvider(scheme: string, provider: IFileSystemProvider): IDisposable {
		throw new Error('Method not implemented.');
	}
	canHandleResource(resource: URI): boolean {
		return true;
	}

	resolveFile(resource: URI, options?: IResolveFileOptions): TPromise<IFileStat> {
		const modules = this.codesandboxService.getFilesByPath();
		const module = modules[resource.fsPath];

		if (!module) {
			const modulesByPath = Object.keys(modules).filter(key => key.indexOf(resource.fsPath + '/') === 0);
			if (modulesByPath.length) {
				return new TPromise(resolve => {
					resolve({
						isDirectory: true,
						resource: URI.file(resource.fsPath),
						etag: undefined,
						mtime: new Date().getTime(),
						name: basename(resource.fsPath),
						children: modulesByPath.map(p => createFileFromModule(p, modules[p])),
					});
				});
			}
		}

		return new TPromise(resolve => {
			resolve(createFileFromModule(resource.fsPath, module));
		});
	}
	resolveFiles(toResolve: { resource: URI, options?: IResolveFileOptions; }[]): TPromise<IResolveFileResult[]> {
		throw new Error('resolveFiles not implemented.');
	}
	existsFile(resource: URI): TPromise<boolean, any> {
		throw new Error('existsFile not implemented.');
	}
	resolveContent(resource: URI, options?: IResolveContentOptions): TPromise<IContent> {
		const module = this.codesandboxService.getFilesByPath()[resource.fsPath];

		return new TPromise(resolve => {
			resolve({
				encoding: 'utf8',
				value: module.code,
				name: basename(resource.fsPath),
				resource: URI.file(resource.fsPath),
				etag: undefined,
				isReadonly: false,
				mtime: new Date(module.updatedAt).getTime(),
			});
		});
	}
	resolveStreamContent(resource: URI, options?: IResolveContentOptions): TPromise<IStreamContent> {
		return this.resolveContent(resource, options).then((syncValue) => {
			const asyncValue = {
				...syncValue,
				value: createStreamFromString(syncValue.value),
			}

			return asyncValue;
		});
	}
	updateContent(resource: URI, value: string | ITextSnapshot, options?: IUpdateContentOptions): TPromise<IFileStat> {
		this._onFileChanges.fire();
		throw new Error('updateContent not implemented.');
	}
	moveFile(source: URI, target: URI, overwrite?: boolean): TPromise<IFileStat> {
		throw new Error('moveFile not implemented.');
	}
	copyFile(source: URI, target: URI, overwrite?: boolean): TPromise<IFileStat> {
		throw new Error('copyFile not implemented.');
	}
	createFile(resource: URI, content?: string, options?: ICreateFileOptions): TPromise<IFileStat> {
		throw new Error('createFile not implemented.');
	}
	createFolder(resource: URI): TPromise<IFileStat, any> {
		throw new Error('createFolder not implemented.');
	}
	del(resource: URI, options?: { useTrash?: boolean; recursive?: boolean; }): TPromise<void> {
		throw new Error('del not implemented.');
	}
	watchFileChanges(resource: URI): void {
		throw new Error('watchFileChanges not implemented.');
	}
	unwatchFileChanges(resource: URI): void {
		throw new Error('unwatchFileChanges not implemented.');
	}
}