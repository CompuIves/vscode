import { ICrashReporterService } from 'vs/workbench/services/crashReporter/electron-browser/crashReporterService';

export class CodeSandboxCrashReporterService implements ICrashReporterService {
	_serviceBrand: any;

	getChildProcessStartOptions(processName: string): any {
		console.log('CrashReporter called');
	}
}