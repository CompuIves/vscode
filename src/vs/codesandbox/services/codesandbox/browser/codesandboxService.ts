import { ICodeSandboxService } from 'vs/codesandbox/services/codesandbox/common/codesandbox';

/**
 * A service that enables to search for files or with in files.
 */
export class CodeSandboxService implements ICodeSandboxService {
	_serviceBrand: any;
	controller: any;

	constructor(controller: any) {
		this.controller = controller;
	}

	getController() {
		return this.controller;
	}

	getFilesByPath() {
		return this.controller.getState('editor.modulesByPath');
	}
}
