import { IBroadcastService, IBroadcast } from 'vs/platform/broadcast/electron-browser/broadcastService';
import { Event, Emitter } from 'vs/base/common/event';

export class CodeSandboxBroadcastService implements IBroadcastService {
	_serviceBrand: any;
	private readonly _onBroadcast: Emitter<IBroadcast>;

	constructor(private windowId: number) {
		this._onBroadcast = new Emitter<IBroadcast>();

		this.registerListeners();
	}

	private registerListeners(): void {
		(window || self).addEventListener('message', (e) => {
			const { data } = e;

			if (data.$type === 'broadcast' && data.$windowId !== this.windowId) {
				const b = data.b;
				this._onBroadcast.fire(b);
			}
		});
	}

	public get onBroadcast(): Event<IBroadcast> {
		return this._onBroadcast.event;
	}
	
	broadcast(b: IBroadcast): void {
		console.log('Sending broadcast', b);

		(window.parent || window).postMessage({
			$type: 'broadcast',
			$windowId: this.windowId,
			b
		}, '*');
	}
}