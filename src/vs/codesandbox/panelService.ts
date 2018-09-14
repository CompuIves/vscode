import { IPanelService, IPanelIdentifier } from 'vs/workbench/services/panel/common/panelService';
import { ServiceIdentifier } from 'vs/platform/instantiation/common/instantiation';
import { Event } from 'vs/base/common/event';
import { IPanel } from 'vs/workbench/common/panel';
import { TPromise } from 'vs/base/common/winjs.base';
import { IActionItem, IAction } from 'vs/base/common/actions';
import { ICompositeControl } from 'vs/workbench/common/composite';

class DefaultPanel implements IPanel {
	getId(): string {
		return 'panel'
	}

	getTitle(): string {
		return 'codesandboxPanel';
	}
	getActions(): IAction[] {
		console.log('getActions');
		return [];
	}
	getSecondaryActions(): IAction[] {
		console.log('getSecondaryActions');
		return [];
	}
	getContextMenuActions(): IAction[] {
		console.log('getContextMenuActions');
		return [];
	}
	getActionItem(action: IAction): IActionItem {
		throw new Error('getActionItem');
	}
	getControl(): ICompositeControl {
		throw new Error('getControl');
	}
	focus(): void {
		console.log('focus');
	}
}

const panel = new DefaultPanel();

export class CodeSandboxPanelService implements IPanelService {
	_serviceBrand: ServiceIdentifier<any>;

	onDidPanelOpen: Event<IPanel>;
	onDidPanelClose: Event<IPanel>;
	openPanel(id: string, focus?: boolean): TPromise<IPanel, any> {
		console.log('openPanel', id, focus);

		return new TPromise(r => r(panel));
	}
	getActivePanel(): IPanel {
		return panel;
	}
	getPanels(): IPanelIdentifier[] {
		return [{
			id: 'codesandboxPanel',
			name: 'CodeSandbox Panel',
			cssClass: 'csb',
		}]
	}
	setPanelEnablement(id: string, enabled: boolean): void {
		console.log('setPanelEnablement', id, enabled);
	}
}