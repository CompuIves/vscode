'use strict';

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';

export const ICodeSandboxService = createDecorator<ICodeSandboxService>('codesandboxService');

/**
 * A service that allows for connection with the CodeSandbox stores while CodeSandbox
 * is moving to VSCode. This is a temporary service.
 */
export interface ICodeSandboxService {
	_serviceBrand: any;

	getController(): any;

	getFilesByPath(): {[path: string]: IPathedModule};
}

export interface IPathedModule {
	code: string;
	updatedAt: string;
}