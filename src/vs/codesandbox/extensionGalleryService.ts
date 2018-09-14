/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TPromise } from 'vs/base/common/winjs.base';
import { StatisticType, IGalleryExtension, IExtensionGalleryService,  IQueryOptions, IExtensionManifest, IExtensionIdentifier, IReportedExtension, InstallOperation, ITranslation } from 'vs/platform/extensionManagement/common/extensionManagement';
import { IPager } from 'vs/base/common/paging';

export class CodeSandboxExtensionGalleryService implements IExtensionGalleryService {
  _serviceBrand: any;

  isEnabled(): boolean {
    return false;
  }
  reportStatistic(publisher: string, name: string, version: string, type: StatisticType): TPromise<void, any> {
    throw new Error("Method not implemented.");
  }

	query(options?: IQueryOptions): TPromise<IPager<IGalleryExtension>> {
    throw new Error('query not implemented');
  }
	download(extension: IGalleryExtension, operation: InstallOperation): TPromise<string> {
    throw new Error('	download not implemented');
  }
	getReadme(extension: IGalleryExtension): TPromise<string> {
    throw new Error('	getReadme not implemented');
  }
	getManifest(extension: IGalleryExtension): TPromise<IExtensionManifest> {
    throw new Error('	getManifest not implemented');
  }
	getChangelog(extension: IGalleryExtension): TPromise<string> {
    throw new Error('	getChangelog not implemented');
  }
	getCoreTranslation(extension: IGalleryExtension, languageId: string): TPromise<ITranslation> {
    throw new Error('getCoreTranslation not implemented');
  }
	loadCompatibleVersion(extension: IGalleryExtension): TPromise<IGalleryExtension> {
    throw new Error('loadCompatibleVersion not implemented');
  }
	loadAllDependencies(dependencies: IExtensionIdentifier[]): TPromise<IGalleryExtension[]> {
    throw new Error('loadAllDependencies not implemented');
  }
	getExtensionsReport(): TPromise<IReportedExtension[]> {
    throw new Error('getExtensionsReport not implemented');
  }
}
