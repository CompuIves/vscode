import { Event, Emitter } from 'vs/base/common/event';
import { ICommandService, ICommand, ICommandEvent, CommandsRegistry } from 'vs/platform/commands/common/commands';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IDisposable, toDisposable } from 'vs/base/common/lifecycle';
import { TPromise } from 'vs/base/common/winjs.base';

export class CodeSandboxCommandService implements ICommandService {
	_serviceBrand: any;

	private _dynamicCommands: { [id: string]: ICommand; };

	private readonly _onWillExecuteCommand: Emitter<ICommandEvent> = new Emitter<ICommandEvent>();
	public readonly onWillExecuteCommand: Event<ICommandEvent> = this._onWillExecuteCommand.event;

	constructor(
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
		// @IExtensionService private readonly _extensionService: IExtensionService,
		// @ILogService private readonly _logService: ILogService
	) {
		this._dynamicCommands = Object.create(null);
	}

	public addCommand(command: ICommand): IDisposable {
		const { id } = command;

		this._dynamicCommands[id] = command;
		return toDisposable(() => {
			delete this._dynamicCommands[id];
		});
	}

	public executeCommand<T>(id: string, ...args: any[]): TPromise<T> {
		const command = (CommandsRegistry.getCommand(id) || this._dynamicCommands[id]);
		if (!command) {
			return TPromise.wrapError<T>(new Error(`command '${id}' not found`));
		}

		try {
			this._onWillExecuteCommand.fire({ commandId: id });
			const result = this._instantiationService.invokeFunction.apply(this._instantiationService, [command.handler].concat(args));
			return TPromise.as(result);
		} catch (err) {
			return TPromise.wrapError<T>(err);
		}
	}
}
