import { IExtensionService, IExtensionDescription, ExtensionPointContribution, IExtensionsStatus, ProfileSession } from "vs/workbench/services/extensions/common/extensions";
import {Event, Emitter} from 'vs/base/common/event';
import { TPromise } from "vs/base/common/winjs.base";
import { IExtensionPoint } from 'vs/workbench/services/extensions/common/extensionsRegistry';
import { Disposable } from 'vs/base/common/lifecycle';

export class CodeSandboxExtensionService extends Disposable implements IExtensionService {
	_serviceBrand: any;

	private readonly _onDidRegisterExtensions: Emitter<void> = this._register(new Emitter<void>());
	public readonly onDidRegisterExtensions: Event<void> = this._onDidRegisterExtensions.event;

	private readonly _onDidChangeExtensionsStatus: Emitter<string[]> = this._register(new Emitter<string[]>());
	public readonly onDidChangeExtensionsStatus: Event<string[]> = this._onDidChangeExtensionsStatus.event;

	/**
	 * Send an activation event and activate interested extensions.
	 */
	activateByEvent(activationEvent: string): TPromise<void> {
			return new TPromise(r => r(null))
	};

	/**
	 * An promise that resolves when the installed extensions are registered after
	 * their extension points got handled.
	 */
	whenInstalledExtensionsRegistered(): TPromise<boolean> {
		return new TPromise(r => r(true))
	};

	/**
	 * Return all registered extensions
	 */
	getExtensions(): TPromise<IExtensionDescription[]> {
		return new TPromise(r => r([]))
	};

	/**
	 * Read all contributions to an extension point.
	 */
	readExtensionPointContributions<T>(extPoint: IExtensionPoint<T>): TPromise<ExtensionPointContribution<T>[]> {
		return new TPromise(r => r([]))
	};

	/**
	 * Get information about extensions status.
	 */
	getExtensionsStatus(): { [id: string]: IExtensionsStatus } {
		return {};
	};

	/**
	 * Check if the extension host can be profiled.
	 */
	canProfileExtensionHost(): boolean {
		return false;
	};

	/**
	 * Begin an extension host process profile session.
	 */
	startExtensionHostProfile(): TPromise<ProfileSession> {
		return new TPromise(r => r(null));
	};

	/**
	 * Restarts the extension host.
	 */
	restartExtensionHost(): void {

	};

	/**
	 * Starts the extension host.
	 */
	startExtensionHost(): void {

	};

	/**
	 * Stops the extension host.
	 */
	stopExtensionHost(): void {

	};
}