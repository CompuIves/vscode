import { IContextKeyService, ContextKeyExpr } from 'vs/platform/contextkey/common/contextkey';
import { ICommandService, ICommandHandler } from 'vs/platform/commands/common/commands';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { INotificationService } from 'vs/platform/notification/common/notification';
import { AbstractKeybindingService } from 'vs/platform/keybinding/common/abstractKeybindingService';
import { KeybindingResolver } from 'vs/platform/keybinding/common/keybindingResolver';
import { IKeybindingItem, KeybindingsRegistry } from 'vs/platform/keybinding/common/keybindingsRegistry';
import { StandardKeyboardEvent, IKeyboardEvent } from 'vs/base/browser/keyboardEvent';
import { createKeybinding, Keybinding, ResolvedKeybinding, SimpleKeybinding } from 'vs/base/common/keyCodes';
import { OS } from 'vs/base/common/platform';
import { IDisposable, toDisposable, combinedDisposable } from 'vs/base/common/lifecycle';
import { KeybindingSource, IKeybindingEvent } from 'vs/platform/keybinding/common/keybinding';
import { ResolvedKeybindingItem } from 'vs/platform/keybinding/common/resolvedKeybindingItem';
import { USLayoutResolvedKeybinding } from 'vs/platform/keybinding/common/usLayoutResolvedKeybinding';
import * as dom from 'vs/base/browser/dom';
import { CodeSandboxCommandService } from 'vs/codesandbox/commandService';


export class CodeSandboxKeybindingService extends AbstractKeybindingService {
	private _cachedResolver: KeybindingResolver;
	private _dynamicKeybindings: IKeybindingItem[];

	constructor(
		window: Window,
		@IContextKeyService contextKeyService: IContextKeyService,
		@ICommandService commandService: ICommandService,
		@ITelemetryService telemetryService: ITelemetryService,
		@INotificationService notificationService: INotificationService,
	) {
		super(contextKeyService, commandService, telemetryService, notificationService);

		this._cachedResolver = null;
		this._dynamicKeybindings = [];

		this._register(dom.addDisposableListener(window, dom.EventType.KEY_DOWN, (e: KeyboardEvent) => {
			let keyEvent = new StandardKeyboardEvent(e);
			let shouldPreventDefault = this._dispatch(keyEvent, keyEvent.target);
			if (shouldPreventDefault) {
				keyEvent.preventDefault();
			}
		}));
	}

	public addDynamicKeybinding(commandId: string, keybinding: number, handler: ICommandHandler, when: ContextKeyExpr): IDisposable {
		let toDispose: IDisposable[] = [];

		this._dynamicKeybindings.push({
			keybinding: createKeybinding(keybinding, OS),
			command: commandId,
			when: when,
			weight1: 1000,
			weight2: 0
		});

		toDispose.push(toDisposable(() => {
			for (let i = 0; i < this._dynamicKeybindings.length; i++) {
				let kb = this._dynamicKeybindings[i];
				if (kb.command === commandId) {
					this._dynamicKeybindings.splice(i, 1);
					this.updateResolver({ source: KeybindingSource.Default });
					return;
				}
			}
		}));

		let commandService = this._commandService;
		if (commandService instanceof CodeSandboxCommandService) {
			toDispose.push(commandService.addCommand({
				id: commandId,
				handler: handler
			}));
		} else {
			throw new Error('Unknown command service!');
		}
		this.updateResolver({ source: KeybindingSource.Default });

		return combinedDisposable(toDispose);
	}

	private updateResolver(event: IKeybindingEvent): void {
		this._cachedResolver = null;
		this._onDidUpdateKeybindings.fire(event);
	}

	protected _getResolver(): KeybindingResolver {
		if (!this._cachedResolver) {
			const defaults = this._toNormalizedKeybindingItems(KeybindingsRegistry.getDefaultKeybindings(), true);
			const overrides = this._toNormalizedKeybindingItems(this._dynamicKeybindings, false);
			this._cachedResolver = new KeybindingResolver(defaults, overrides);
		}
		return this._cachedResolver;
	}

	protected _documentHasFocus(): boolean {
		return document.hasFocus();
	}

	private _toNormalizedKeybindingItems(items: IKeybindingItem[], isDefault: boolean): ResolvedKeybindingItem[] {
		let result: ResolvedKeybindingItem[] = [], resultLen = 0;
		for (let i = 0, len = items.length; i < len; i++) {
			const item = items[i];
			const when = (item.when ? item.when.normalize() : null);
			const keybinding = item.keybinding;

			if (!keybinding) {
				// This might be a removal keybinding item in user settings => accept it
				result[resultLen++] = new ResolvedKeybindingItem(null, item.command, item.commandArgs, when, isDefault);
			} else {
				const resolvedKeybindings = this.resolveKeybinding(keybinding);
				for (let j = 0; j < resolvedKeybindings.length; j++) {
					result[resultLen++] = new ResolvedKeybindingItem(resolvedKeybindings[j], item.command, item.commandArgs, when, isDefault);
				}
			}
		}

		return result;
	}

	public resolveKeybinding(keybinding: Keybinding): ResolvedKeybinding[] {
		return [new USLayoutResolvedKeybinding(keybinding, OS)];
	}

	public resolveKeyboardEvent(keyboardEvent: IKeyboardEvent): ResolvedKeybinding {
		let keybinding = new SimpleKeybinding(
			keyboardEvent.ctrlKey,
			keyboardEvent.shiftKey,
			keyboardEvent.altKey,
			keyboardEvent.metaKey,
			keyboardEvent.keyCode
		);
		return new USLayoutResolvedKeybinding(keybinding, OS);
	}

	public resolveUserBinding(userBinding: string): ResolvedKeybinding[] {
		return [];
	}
}