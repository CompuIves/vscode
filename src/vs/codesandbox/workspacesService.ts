import { IWorkspacesService, IWorkspaceIdentifier, IWorkspaceFolderCreationData } from 'vs/platform/workspaces/common/workspaces';

import { TPromise } from 'vs/base/common/winjs.base';

export class CodeSandboxWorkspacesService implements IWorkspacesService {
	_serviceBrand: any;

	createWorkspace(folders?: IWorkspaceFolderCreationData[]): TPromise<IWorkspaceIdentifier> {
		return new TPromise(r => r({
			id: 'codesandbox-workspace',
			configPath: '/codesandbox/config.json'
		}));
	}
}
