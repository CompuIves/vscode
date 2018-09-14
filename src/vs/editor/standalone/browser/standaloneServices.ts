/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { Disposable } from 'vs/base/common/lifecycle';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { ContextMenuService } from 'vs/platform/contextview/browser/contextMenuService';
import { IContextMenuService, IContextViewService } from 'vs/platform/contextview/browser/contextView';
import { ContextViewService } from 'vs/platform/contextview/browser/contextViewService';
import { createDecorator, IInstantiationService, ServiceIdentifier } from 'vs/platform/instantiation/common/instantiation';
import { InstantiationService } from 'vs/platform/instantiation/common/instantiationService';
import { ServiceCollection } from 'vs/platform/instantiation/common/serviceCollection';
import { ICommandService } from 'vs/platform/commands/common/commands';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { MarkerService } from 'vs/platform/markers/common/markerService';
import { IMarkerService } from 'vs/platform/markers/common/markers';
import { IProgressService } from 'vs/platform/progress/common/progress';
import { IStorageService, NullStorageService } from 'vs/platform/storage/common/storage';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IWorkspaceContextService } from 'vs/platform/workspace/common/workspace';
import { ICodeEditorService } from 'vs/editor/browser/services/codeEditorService';
import { IEditorWorkerService } from 'vs/editor/common/services/editorWorkerService';
import { EditorWorkerServiceImpl } from 'vs/editor/common/services/editorWorkerServiceImpl';
import { ITextResourceConfigurationService } from 'vs/editor/common/services/resourceConfiguration';
import { IModeService } from 'vs/editor/common/services/modeService';
import { ModeServiceImpl } from 'vs/editor/common/services/modeServiceImpl';
import { IModelService } from 'vs/editor/common/services/modelService';
import { ModelServiceImpl } from 'vs/editor/common/services/modelServiceImpl';
import { StandaloneCodeEditorServiceImpl } from 'vs/editor/standalone/browser/standaloneCodeServiceImpl';
import {
	SimpleConfigurationService, SimpleResourceConfigurationService, SimpleMenuService,
	SimpleProgressService, StandaloneCommandService, StandaloneKeybindingService, SimpleNotificationService,
	StandaloneTelemetryService, SimpleWorkspaceContextService, SimpleDialogService, SimpleBulkEditService
} from 'vs/editor/standalone/browser/simpleServices';
import { ContextKeyService } from 'vs/platform/contextkey/browser/contextKeyService';
import { IMenuService } from 'vs/platform/actions/common/actions';
import { IStandaloneThemeService } from 'vs/editor/standalone/common/standaloneThemeService';
import { StandaloneThemeServiceImpl } from 'vs/editor/standalone/browser/standaloneThemeServiceImpl';
import { ILogService, NullLogService } from 'vs/platform/log/common/log';
import { INotificationService } from 'vs/platform/notification/common/notification';
import { IDialogService } from 'vs/platform/dialogs/common/dialogs';
import { IListService, ListService } from 'vs/platform/list/browser/listService';
import { IBulkEditService } from 'vs/editor/browser/services/bulkEditService';
import { IQuickOpenService } from 'vs/platform/quickOpen/common/quickOpen';
import { IEditorGroupsService } from 'vs/workbench/services/group/common/editorGroupsService';
import { IPartService } from 'vs/workbench/services/part/common/partService';
import { IHistoryService } from 'vs/workbench/services/history/common/history';
import { IFileService } from 'vs/platform/files/common/files';
import { IEnvironmentService } from 'vs/platform/environment/common/environment';
import { IEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IWindowsService, IWindowService } from 'vs/platform/windows/common/windows';
import { ITextFileService } from 'vs/workbench/services/textfile/common/textfiles';
import { IExtensionService } from 'vs/workbench/services/extensions/common/extensions';
import { IUntitledEditorService } from 'vs/workbench/services/untitled/common/untitledEditorService';
import { IHashService } from 'vs/workbench/services/hash/common/hashService';
import { IBackupFileService } from 'vs/workbench/services/backup/common/backup';
import { IDecorationsService } from 'vs/workbench/services/decorations/browser/decorations';
import { IPreferencesService } from 'vs/workbench/services/preferences/common/preferences';
import { IJSONEditingService } from 'vs/workbench/services/configuration/common/jsonEditing';
import { ITextModelService } from 'vs/editor/common/services/resolverService';
import { IWorkspacesService } from 'vs/platform/workspaces/common/workspaces';
import { ISearchService } from 'vs/platform/search/common/search';
import { IViewletService } from 'vs/workbench/services/viewlet/browser/viewlet';
import { ICodeSandboxService } from 'vs/codesandbox/services/codesandbox/common/codesandbox';
import { IRequestService } from 'vs/platform/request/node/request';
import { IExtensionGalleryService, IExtensionManagementService, IExtensionEnablementService } from 'vs/platform/extensionManagement/common/extensionManagement';
import { IBroadcastService } from 'vs/platform/broadcast/electron-browser/broadcastService';
import { ICrashReporterService } from 'vs/workbench/services/crashReporter/electron-browser/crashReporterService';
import { IBreadcrumbsService } from 'vs/workbench/browser/parts/editor/breadcrumbs';
import { IProgressService2 } from 'vs/workbench/services/progress/common/progress';
import { IActivityService } from 'vs/workbench/services/activity/common/activity';
import { IOutputService } from 'vs/workbench/parts/output/common/output';
import { IPanelService } from 'vs/workbench/services/panel/common/panelService';
import { IQuickInputService } from 'vs/platform/quickinput/common/quickInput';
import { IHeapService } from 'vs/workbench/api/electron-browser/mainThreadHeapService';

export interface IEditorOverrideServices {
	[index: string]: any;
}

export module StaticServices {

	const _serviceCollection = new ServiceCollection();

	export class LazyStaticService<T> {
		private _serviceId: ServiceIdentifier<T>;
		private _factory: (overrides: IEditorOverrideServices) => T;
		private _value: T;

		public get id() { return this._serviceId; }

		constructor(serviceId: ServiceIdentifier<T>, factory: (overrides: IEditorOverrideServices) => T) {
			this._serviceId = serviceId;
			this._factory = factory;
			this._value = null;
		}

		public get(overrides?: IEditorOverrideServices): T {
			if (!this._value) {
				if (overrides) {
					this._value = overrides[this._serviceId.toString()];
				}
				if (!this._value) {
					this._value = this._factory(overrides);
				}
				if (!this._value) {
					throw new Error('Service ' + this._serviceId + ' is missing!');
				}
				_serviceCollection.set(this._serviceId, this._value);
			}
			return this._value;
		}
	}

	let _all: LazyStaticService<any>[] = [];

	function define<T>(serviceId: ServiceIdentifier<T>, factory: (overrides: IEditorOverrideServices) => T): LazyStaticService<T> {
		let r = new LazyStaticService(serviceId, factory);
		_all.push(r);
		return r;
	}

	export function init(overrides: IEditorOverrideServices): [ServiceCollection, IInstantiationService] {
		// Create a fresh service collection
		let result = new ServiceCollection();

		// Initialize the service collection with the overrides
		for (let serviceId in overrides) {
			if (overrides.hasOwnProperty(serviceId)) {
				result.set(createDecorator(serviceId), overrides[serviceId]);
			}
		}

		// Make sure the same static services are present in all service collections
		_all.forEach(service => result.set(service.id, service.get(overrides)));

		// Ensure the collection gets the correct instantiation service
		let instantiationService = new InstantiationService(result, true);
		result.set(IInstantiationService, instantiationService);

		return [result, instantiationService];
	}

	export const instantiationService = define<IInstantiationService>(IInstantiationService, () => new InstantiationService(_serviceCollection, true));

	const configurationServiceImpl = new SimpleConfigurationService();
	export const configurationService = define(IConfigurationService, () => configurationServiceImpl);

	export const resourceConfigurationService = define(ITextResourceConfigurationService, () => new SimpleResourceConfigurationService(configurationServiceImpl));

	export const contextService = define(IWorkspaceContextService, () => new SimpleWorkspaceContextService());

	export const telemetryService = define(ITelemetryService, () => new StandaloneTelemetryService());

	export const dialogService = define(IDialogService, () => new SimpleDialogService());

	export const notificationService = define(INotificationService, () => new SimpleNotificationService());

	export const markerService = define(IMarkerService, () => new MarkerService());

	export const modeService = define(IModeService, (o) => new ModeServiceImpl());

	export const modelService = define(IModelService, (o) => new ModelServiceImpl(markerService.get(o), configurationService.get(o)));

	export const editorWorkerService = define(IEditorWorkerService, (o) => new EditorWorkerServiceImpl(modelService.get(o), resourceConfigurationService.get(o)));

	export const standaloneThemeService = define(IStandaloneThemeService, () => new StandaloneThemeServiceImpl());

	export const codeEditorService = define(ICodeEditorService, (o) => new StandaloneCodeEditorServiceImpl(standaloneThemeService.get(o)));

	export const progressService = define(IProgressService, () => new SimpleProgressService());

	export const storageService = define(IStorageService, () => NullStorageService);

	export const logService = define(ILogService, () => new NullLogService());

	// export const textModelService = define(ITextModelService, () => new SimpleEditorModelResolverService())
}

export class DynamicStandaloneServices extends Disposable {

	private _serviceCollection: ServiceCollection;
	private _instantiationService: IInstantiationService;

	constructor(domElement: HTMLElement, overrides: IEditorOverrideServices) {
		super();

		const [_serviceCollection, _instantiationService] = StaticServices.init(overrides);
		this._serviceCollection = _serviceCollection;
		this._instantiationService = _instantiationService;

		const configurationService = this.get(IConfigurationService);
		const notificationService = this.get(INotificationService);
		const telemetryService = this.get(ITelemetryService);

		let ensure = <T>(serviceId: ServiceIdentifier<T>, factory: () => T): T => {
			let value: T = null;
			if (overrides && overrides[serviceId.toString()]) {
				const override = overrides[serviceId.toString()];
				value = typeof override === 'function' ? override(this._instantiationService) : override;
			}
			if (!value) {
				value = factory();
			}
			this._serviceCollection.set(serviceId, value);
			return value;
		};

		let contextKeyService = ensure(IContextKeyService, () => this._register(new ContextKeyService(configurationService)));

		ensure(IListService, () => new ListService(contextKeyService));

		let commandService = ensure(ICommandService, () => new StandaloneCommandService(this._instantiationService));

		ensure(IKeybindingService, () => this._register(new StandaloneKeybindingService(contextKeyService, commandService, telemetryService, notificationService, domElement)));

		let contextViewService = ensure(IContextViewService, () => this._register(new ContextViewService(domElement, telemetryService, new NullLogService())));

		ensure(IContextMenuService, () => this._register(new ContextMenuService(domElement, telemetryService, notificationService, contextViewService)));

		ensure(IMenuService, () => new SimpleMenuService(commandService));

		// console.log(IRequestService);
		// ensure(IRequestService, () => null);
		ensure(IActivityService, () => null);
		ensure(IOutputService, () => null);
		ensure(IPanelService, () => null);
		ensure(IBreadcrumbsService, () => null);
		ensure(ICrashReporterService, () => null);
		ensure(ICodeSandboxService, () => null);
		ensure(IBroadcastService, () => null);
		ensure(IWorkspacesService, () => null);
		ensure(ISearchService, () => null);
		ensure(IEnvironmentService, () => null);
		ensure(IJSONEditingService, () => null);
		ensure(IDecorationsService, () => null);
		ensure(IBackupFileService, () => null);
		ensure(IFileService, () => null);
		ensure(IWindowService, () => null);
		ensure(IExtensionGalleryService, () => null);
		ensure(IExtensionManagementService, () => null);
		ensure(IExtensionEnablementService, () => null);
		ensure(IExtensionService, () => null);
		ensure(IHashService, () => null);
		ensure(IUntitledEditorService, () => null);
		ensure(IEditorGroupsService, () => null);
		ensure(IStorageService, () => null);
		ensure(IWindowsService, () => null);
		ensure(IViewletService, () => null);
		ensure(ITextFileService, () => null);
		ensure(ITextModelService, () => null);
		ensure(IEditorService, () => null);
		ensure(IPreferencesService, () => null);
		ensure(IPartService, () => null);
		ensure(IProgressService2, () => null);
		ensure(IHistoryService, () => null);
		ensure(IQuickOpenService, () => null);
		ensure(IQuickInputService, () => null);
		ensure(IHeapService, () => null);

		ensure(IBulkEditService, () => new SimpleBulkEditService(StaticServices.modelService.get(IModelService)));
	}

	public get<T>(serviceId: ServiceIdentifier<T>): T {
		let r = <T>this._serviceCollection.get(serviceId);
		if (!r) {
			throw new Error('Missing service ' + serviceId);
		}
		return r;
	}

	public set<T>(serviceId: ServiceIdentifier<T>, instance: T): void {
		this._serviceCollection.set(serviceId, instance);
	}

	public has<T>(serviceId: ServiceIdentifier<T>): boolean {
		return this._serviceCollection.has(serviceId);
	}
}
