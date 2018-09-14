import { IOutputService, IOutputChannel, IOutputChannelIdentifier } from 'vs/workbench/parts/output/common/output';
import { TPromise } from 'vs/base/common/winjs.base';
import { Event } from 'vs/base/common/event';

export class CodeSandboxOutputService implements IOutputService {
	_serviceBrand: any;

	getChannel(id: string): IOutputChannel {
		throw new Error('getChannel not implemented.');
	}
	getChannels(): IOutputChannelIdentifier[] {
		throw new Error('getChannels not implemented.');
	}
	getActiveChannel(): IOutputChannel {
		throw new Error('getActiveChannel not implemented.');
	}
	showChannel(id: string, preserveFocus?: boolean): TPromise<void, any> {
		throw new Error('showChannel not implemented.');
	}
	onActiveOutputChannel: Event<string>;
}