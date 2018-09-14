import { IPartService, Position, Parts, IDimension, ILayoutOptions } from 'vs/workbench/services/part/common/partService';
import { ServiceIdentifier } from 'vs/platform/instantiation/common/instantiation';
import { TPromise } from 'vs/base/common/winjs.base';
import { Event, Emitter } from 'vs/base/common/event';
import * as DOM from 'vs/base/browser/dom';
import { Disposable } from 'vs/base/common/lifecycle';
import { ServiceCollection } from 'vs/platform/instantiation/common/serviceCollection';
import { IWindowConfiguration } from 'vs/platform/windows/common/windows';

export class CodeSandboxWorkbench extends Disposable implements IPartService {
	_serviceBrand: ServiceIdentifier<any>;

	//#region IPartService

	private _onTitleBarVisibilityChange: Emitter<void> = this._register(new Emitter<void>());
	get onTitleBarVisibilityChange(): Event<void> { return this._onTitleBarVisibilityChange.event; }

	private _onMenubarVisibilityChange: Emitter<DOM.Dimension> = this._register(new Emitter<DOM.Dimension>());
	get onMenubarVisibilityChange(): Event<DOM.Dimension> { return this._onMenubarVisibilityChange.event; }


	// get onEditorLayout(): Event<IDimension> { return this.editorPart.onDidLayout; }

	// private _onDidLayout: Emitter<IDimension> = this._register(new Emitter<IDimension>());
	get onEditorLayout(): Event<IDimension> { return null; }


	//#endregion
	layout(options?: ILayoutOptions): void {
		throw new Error('Method not implemented.');
	}
	isCreated(): boolean {
		return true;
	}
	hasFocus(part: Parts): boolean {
		throw new Error('Method not implemented.');
	}
	getContainer(part: Parts): HTMLElement {
		throw new Error('Method not implemented.');
	}
	isVisible(part: Parts): boolean {
		throw new Error('Method not implemented.');
	}
	setActivityBarHidden(hidden: boolean): void {
		throw new Error('Method not implemented.');
	}
	getTitleBarOffset(): number {
		return 0;
	}
	setSideBarHidden(hidden: boolean): TPromise<void, any> {
		throw new Error('Method not implemented.');
	}
	setPanelHidden(hidden: boolean): TPromise<void, any> {
		throw new Error('Method not implemented.');
	}
	toggleMaximizedPanel(): void {
		throw new Error('Method not implemented.');
	}
	isPanelMaximized(): boolean {
		throw new Error('Method not implemented.');
	}
	getSideBarPosition(): Position {
		throw new Error('Method not implemented.');
	}
	getPanelPosition(): Position {
		throw new Error('Method not implemented.');
	}
	setPanelPosition(position: Position): TPromise<void, any> {
		throw new Error('Method not implemented.');
	}
	getWorkbenchElementId(): string {
		// TODO: Make this a wrqp in CodeSandbox, then put editor deeper in the tree.
		return 'workbench.main.container';
	}
	toggleZenMode(): void {
		throw new Error('Method not implemented.');
	}
	isEditorLayoutCentered(): boolean {
		throw new Error('Method not implemented.');
	}
	centerEditorLayout(active: boolean): void {
		throw new Error('Method not implemented.');
	}
	resizePart(part: Parts, sizeChange: number): void {
		throw new Error('Method not implemented.');
	}

	private initServices(): void { }

}