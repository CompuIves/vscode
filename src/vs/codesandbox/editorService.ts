import { ServicesAccessor } from 'vs/platform/instantiation/common/instantiation';
import { IResourceInput, ITextEditorOptions, IEditorOptions } from 'vs/platform/editor/common/editor';
import { IEditorInput, IEditor, GroupIdentifier, IUntitledResourceInput, IResourceDiffInput, IResourceSideBySideInput, IEditorInputWithOptions, ITextEditor, ITextDiffEditor, ITextSideBySideEditor, IEditorCloseEvent, IEditorIdentifier } from 'vs/workbench/common/editor';
import { Emitter, Event } from 'vs/base/common/event';
import { TPromise } from 'vs/base/common/winjs.base';
import { IEditorGroup, IEditorReplacement, IEditorGroupsService } from 'vs/workbench/services/group/common/editorGroupsService';
import { IResourceEditor, ACTIVE_GROUP_TYPE, SIDE_GROUP_TYPE, IResourceEditorReplacement, IOpenEditorOverrideHandler, IEditorService } from 'vs/workbench/services/editor/common/editorService';
import { Disposable, IDisposable } from 'vs/base/common/lifecycle';
import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
import { EditorGroupsServiceImpl } from 'vs/workbench/browser/parts/editor/editor';


export class CodeSandboxEditorService extends Disposable implements IEditorService {
	_serviceBrand: any;

	constructor(
		@IEditorGroupsService private editorGroupService: EditorGroupsServiceImpl,

	) {
		super();
	}

	//#region events

	private _onDidActiveEditorChange: Emitter<void> = this._register(new Emitter<void>());
	get onDidActiveEditorChange(): Event<void> { return this._onDidActiveEditorChange.event; }

	private _onDidVisibleEditorsChange: Emitter<void> = this._register(new Emitter<void>());
	get onDidVisibleEditorsChange(): Event<void> { return this._onDidVisibleEditorsChange.event; }

	private _onDidCloseEditor: Emitter<IEditorCloseEvent> = this._register(new Emitter<IEditorCloseEvent>());
	get onDidCloseEditor(): Event<IEditorCloseEvent> { return this._onDidCloseEditor.event; }

	private _onDidOpenEditorFail: Emitter<IEditorIdentifier> = this._register(new Emitter<IEditorIdentifier>());
	get onDidOpenEditorFail(): Event<IEditorIdentifier> { return this._onDidOpenEditorFail.event; }

	//#endregion

	/**
	 * The currently active editor or `undefined` if none. An editor is active when it is
	 * located in the currently active editor group. It will be `undefined` if the active
	 * editor group has no editors open.
	 */
	get activeEditor() {
		const activeGroup = this.editorGroupService.activeGroup;

		return activeGroup ? activeGroup.activeEditor : void 0;
	}

	/**
	 * The currently active editor control or `undefined` if none. The editor control is
	 * the workbench container for editors of any kind.
	 *
	 * @see `IEditorService.activeEditor`
	 */
	get activeControl(): IEditor {
		const activeGroup = this.editorGroupService.activeGroup;

		return activeGroup ? activeGroup.activeControl : null;
	}
	/**
	 * The currently active text editor widget or `undefined` if there is currently no active
	 * editor or the active editor widget is neither a text nor a diff editor.
	 *
	 * @see `IEditorService.activeEditor`
	 */
	get activeTextEditorWidget(): ICodeEditor {
		return (<any>window).CSEditor && (<any>window).CSEditor.editor;
	}

	/**
	 * All editors that are currently visible. An editor is visible when it is opened in an
	 * editor group and active in that group. Multiple editor groups can be opened at the same time.
	 */
	get visibleEditors() {
		return [(<any>window).CSEditor.editor];
	}

	/**
	 * All editor controls that are currently visible across all editor groups.
	 */
	get visibleControls() {
		return [(<any>window).CSEditor.editor];
	}

	/**
	 * All text editor widgets that are currently visible across all editor groups. A text editor
	 * widget is either a text or a diff editor.
	 */
	get visibleTextEditorWidgets() {
		return [(<any>window).CSEditor.editor];
	}

	/**
	 * All editors that are opened across all editor groups. This includes active as well as inactive
	 * editors in each editor group.
	 */
	get editors() {
		const editors: IEditorInput[] = [];
		this.editorGroupService.groups.forEach(group => {
			editors.push(...group.editors);
		});

		return editors;
	}

	/**
	 * Open an editor in an editor group.
	 *
	 * @param editor the editor to open
	 * @param options the options to use for the editor
	 * @param group the target group. If unspecified, the editor will open in the currently
	 * active group. Use `SIDE_GROUP_TYPE` to open the editor in a new editor group to the side
	 * of the currently active group.
	 */
	openEditor(editor: IEditorInput, options?: IEditorOptions | ITextEditorOptions, group?: IEditorGroup | GroupIdentifier | SIDE_GROUP_TYPE | ACTIVE_GROUP_TYPE): TPromise<IEditor>;
	openEditor(editor: IResourceInput | IUntitledResourceInput, group?: IEditorGroup | GroupIdentifier | SIDE_GROUP_TYPE | ACTIVE_GROUP_TYPE): TPromise<ITextEditor>;
	openEditor(editor: IResourceDiffInput, group?: IEditorGroup | GroupIdentifier | SIDE_GROUP_TYPE | ACTIVE_GROUP_TYPE): TPromise<ITextDiffEditor>;
	openEditor(editor: IResourceSideBySideInput, group?: IEditorGroup | GroupIdentifier | SIDE_GROUP_TYPE | ACTIVE_GROUP_TYPE): TPromise<ITextSideBySideEditor>;
	openEditor(editor: IEditorInput | IResourceEditor, optionsOrGroup?: IEditorOptions | ITextEditorOptions | IEditorGroup | GroupIdentifier | SIDE_GROUP_TYPE | ACTIVE_GROUP_TYPE, group?: GroupIdentifier): TPromise<IEditor> {
		throw new Error('Implementation');
	}

	/**
	 * Open editors in an editor group.
	 *
	 * @param editors the editors to open with associated options
	 * @param group the target group. If unspecified, the editor will open in the currently
	 * active group. Use `SIDE_GROUP_TYPE` to open the editor in a new editor group to the side
	 * of the currently active group.
	 */
	openEditors(editors: IEditorInputWithOptions[], group?: IEditorGroup | GroupIdentifier | SIDE_GROUP_TYPE | ACTIVE_GROUP_TYPE): TPromise<ReadonlyArray<IEditor>>;
	openEditors(editors: IResourceEditor[], group?: IEditorGroup | GroupIdentifier | SIDE_GROUP_TYPE | ACTIVE_GROUP_TYPE): TPromise<ReadonlyArray<IEditor>> {
		throw new Error('Implementation');
	}

	replaceEditors(editors: IResourceEditorReplacement[], group: IEditorGroup | GroupIdentifier): TPromise<void>;
	replaceEditors(editors: IEditorReplacement[], group: IEditorGroup | GroupIdentifier): TPromise<void>;
	replaceEditors(editors: (IEditorReplacement | IResourceEditorReplacement)[], group: IEditorGroup | GroupIdentifier): TPromise<void> {
		throw new Error('Implementation')
	}

	/**
	 * Find out if the provided editor (or resource of an editor) is opened in any or
	 * a specific editor group.
	 *
	 * Note: An editor can be opened but not actively visible.
	 *
	 * @param group optional to specify a group to check for the editor being opened
	 */
	isOpen(editor: IEditorInput | IResourceInput | IUntitledResourceInput, group?: IEditorGroup | GroupIdentifier): boolean {
		console.error("TRYING UNIMPLEMENTED MODULE");
		return true;
	};

	/**
	 * Allows to override the opening of editors by installing a handler that will
	 * be called each time an editor is about to open allowing to override the
	 * operation to open a different editor.
	 */
	overrideOpenEditor(handler: IOpenEditorOverrideHandler): IDisposable {
		console.error("TRYING UNIMPLEMENTED MODULE");
		return this;
	}

	/**
	 * Invoke a function in the context of the services of the active editor.
	 */
	invokeWithinEditorContext<T>(fn: (accessor: ServicesAccessor) => T): T {
		return (<any> window).CSEditor.editor.invokeWithinContext(fn);
	}

	/**
	 * Converts a lightweight input to a workbench editor input.
	 */
	createInput(input: IResourceEditor, options?: { forceFileInput: boolean }): IEditorInput {
		return null;
	}
}