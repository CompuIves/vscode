import { IWindowsService, INativeOpenDialogOptions, MessageBoxOptions, IMessageBoxResult, SaveDialogOptions, OpenDialogOptions, IDevToolsOptions, IEnterWorkspaceResult, CrashReporterStartOptions } from 'vs/platform/windows/common/windows';
import { TPromise } from 'vs/base/common/winjs.base';
import { IWorkspaceFolderCreationData, IWorkspaceIdentifier } from 'vs/platform/workspaces/common/workspaces';
import {Event} from 'vs/base/common/event';
import URI from 'vs/base/common/uri';
import {ISerializableCommandAction} from 'vs/platform/actions/common/actions';
import { IRecentlyOpened } from 'vs/platform/history/common/history';
import { ParsedArgs } from 'vs/platform/environment/common/environment';

export class CodeSandboxWindowsService implements IWindowsService {
	onWindowOpen: Event<number>;
	onWindowFocus: Event<number>;
	onWindowBlur: Event<number>;
	onWindowMaximize: Event<number>;
	onWindowUnmaximize: Event<number>;
	onRecentlyOpenedChange: Event<void>;
	_serviceBrand: any;

	pickFileFolderAndOpen(options: INativeOpenDialogOptions): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	pickFileAndOpen(options: INativeOpenDialogOptions): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	pickFolderAndOpen(options: INativeOpenDialogOptions): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	pickWorkspaceAndOpen(options: INativeOpenDialogOptions): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	showMessageBox(windowId: number, options: MessageBoxOptions): TPromise<IMessageBoxResult> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	showSaveDialog(windowId: number, options: SaveDialogOptions): TPromise<string> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	showOpenDialog(windowId: number, options: OpenDialogOptions): TPromise<string[]> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	reloadWindow(windowId: number, args?: ParsedArgs): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	openDevTools(windowId: number, options?: IDevToolsOptions): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	toggleDevTools(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	closeWorkspace(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	enterWorkspace(windowId: number, path: string): TPromise<IEnterWorkspaceResult> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	createAndEnterWorkspace(windowId: number, folders?: IWorkspaceFolderCreationData[], path?: string): TPromise<IEnterWorkspaceResult> {
		console.log('WindowService Called');
		throw new Error('Method not implemented.');
	}
	saveAndEnterWorkspace(windowId: number, path: string): TPromise<IEnterWorkspaceResult> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	toggleFullScreen(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	setRepresentedFilename(windowId: number, fileName: string): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	addRecentlyOpened(files: string[]): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	removeFromRecentlyOpened(paths: (string | IWorkspaceIdentifier | URI)[]): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	clearRecentlyOpened(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	getRecentlyOpened(windowId: number): TPromise<IRecentlyOpened> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	focusWindow(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	closeWindow(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	isFocused(windowId: number): TPromise<boolean> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	isMaximized(windowId: number): TPromise<boolean> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	maximizeWindow(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	unmaximizeWindow(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	minimizeWindow(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	onWindowTitleDoubleClick(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	setDocumentEdited(windowId: number, flag: boolean): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	quit(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	relaunch(options: { addArgs?: string[]; removeArgs?: string[]; }): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	showPreviousWindowTab(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	showNextWindowTab(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	moveWindowTabToNewWindow(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	mergeAllWindowTabs(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	toggleWindowTabsBar(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	updateTouchBar(windowId: number, items: ISerializableCommandAction[][]): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	whenSharedProcessReady(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	toggleSharedProcess(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	openWindow(windowId: number, paths: URI[], options?: {forceNewWindow?: boolean; forceReuseWindow?: boolean; forceOpenWorkspaceAsFile?: boolean; args?: ParsedArgs; }): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	openNewWindow(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	showWindow(windowId: number): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	getWindows(): TPromise<{id: number; workspace?: IWorkspaceIdentifier; folderUri?: URI; title: string; filename?: string; }[]> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	getWindowCount(): TPromise<number> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	log(severity: string, ...messages: string[]): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	showItemInFolder(path: string): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	getActiveWindowId(): TPromise<number> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	openExternal(url: string): TPromise<boolean> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	startCrashReporter(config: CrashReporterStartOptions): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	openAccessibilityOptions(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
	openAboutDialog(): TPromise<void> {
		console.log('WindowService Called')
		throw new Error('Method not implemented.');
	}
}