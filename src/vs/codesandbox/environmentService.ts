import { IEnvironmentService, ParsedArgs, IExtensionHostDebugParams, IDebugParams } from 'vs/platform/environment/common/environment';

export class CodeSandboxEnvironmentService implements IEnvironmentService {
	_serviceBrand: any;
	args: ParsedArgs = {
		_: []
	};
	execPath: string;
	cliPath: string;
	appRoot: string = '/vscode';
	userHome: string = '/home/codesandbox';
	userDataPath: string = '/vscode/userdata';
	appNameLong: string;
	appQuality: string;
	appSettingsHome: string = '/vscode';
	appSettingsPath: string = '/vscode/settings.json';
	appKeybindingsPath: string;
	settingsSearchBuildId: number;
	settingsSearchUrl: string;
	backupHome: string;
	backupWorkspacesPath: string;
	workspacesHome: string;
	isExtensionDevelopment: boolean = false;
	disableExtensions: boolean | string[];
	extensionsPath: string = '/vscode/extensions';
	extensionDevelopmentPath: string;
	extensionTestsPath: string;
	debugExtensionHost: IExtensionHostDebugParams = {
		debugId: '',
		port: null,
		break: false,
	};
	debugSearch: IDebugParams;
	logExtensionHostCommunication: boolean;
	isBuilt: boolean;
	wait: boolean;
	status: boolean;
	performance: boolean;
	logsPath: string;
	verbose: boolean;
	skipGettingStarted: boolean;
	skipReleaseNotes: boolean;
	skipAddToRecentlyOpened: boolean;
	mainIPCHandle: string;
	sharedIPCHandle: string;
	nodeCachedDataDir: string;
	installSourcePath: string;
	disableUpdates: boolean;
	disableCrashReporter: boolean;
	driverHandle: string;
	driverVerbose: boolean;
}