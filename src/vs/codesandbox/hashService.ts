/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { IHashService } from 'vs/workbench/services/hash/common/hashService';

export class CodeSandboxHashService implements IHashService {

	_serviceBrand: any;

	public createSHA1(content: string): string {
		// TODO: Implement native node module after moving to ESM build
		return content;
	}
}