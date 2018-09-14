import 'vs/workbench/browser/parts/quickopen/quickopen.contribution';
import 'vs/workbench/parts/quickopen/browser/quickopen.contribution';
import 'vs/workbench/parts/search/electron-browser/search.contribution';
import 'vs/workbench/parts/files/electron-browser/files.contribution';
import 'vs/codesandbox/configuration.contribution';
import 'vs/workbench/api/electron-browser/extensionHost.contribution';

import 'vs/workbench/browser/parts/editor/breadcrumbs';

// // Import when extension system is ready
// import 'vs/workbench/parts/emmet/browser/emmet.browser.contribution';
// import 'vs/workbench/parts/emmet/electron-browser/emmet.contribution';

import 'vs/codesandbox/commandService';
import 'vs/codesandbox/hashService';
import 'vs/codesandbox/keybindingService';
import 'vs/codesandbox/editorGroupsService';
import 'vs/codesandbox/workbench';
import 'vs/codesandbox/environmentService';
import 'vs/codesandbox/fileService';
import 'vs/codesandbox/activityService';
import 'vs/codesandbox/outputService';
import 'vs/codesandbox/panelService';
// import 'vs/codesandbox/extensionService';
import 'vs/workbench/services/extensions/electron-browser/extensionService';
import 'vs/platform/extensionManagement/common/extensionEnablementService';
import 'vs/platform/extensionManagement/node/extensionManagementService';
import 'vs/codesandbox/extensionGalleryService';
import 'vs/platform/request/node/requestService';
import 'vs/codesandbox/workspacesService';
import 'vs/codesandbox/searchService';
import 'vs/codesandbox/services/codesandbox/browser/codesandboxService';
import 'vs/workbench/services/decorations/browser/decorationsService';
import 'vs/codesandbox/windowsService';
import 'vs/codesandbox/broadcastService';
import 'vs/codesandbox/backupFileService';
import 'vs/platform/lifecycle/common/lifecycle';
import 'vs/workbench/browser/parts/quickopen/quickOpenController';
import 'vs/workbench/services/history/electron-browser/history';
import 'vs/platform/storage/common/storageService';
import 'vs/workbench/services/untitled/common/untitledEditorService';
import 'vs/workbench/services/editor/browser/editorService';
import 'vs/workbench/services/textfile/electron-browser/textFileService';
import 'vs/platform/windows/electron-browser/windowService';
import 'vs/workbench/services/preferences/browser/preferencesService';
import 'vs/workbench/services/configuration/node/jsonEditingService';
import 'vs/workbench/services/viewlet/browser/viewletService';
import 'vs/workbench/services/textmodelResolver/common/textModelResolverService';
import 'vs/codesandbox/crashReporterService';
import 'vs/workbench/services/progress/browser/progressService2';
import 'vs/workbench/browser/parts/quickinput/quickInput';
import 'vs/workbench/api/electron-browser/mainThreadHeapService';
// import 'vs/workbench/services/extensions/electron-browser/extensionHost';

// TODO: IContextMenuProvider
// TODO: look into registerSingleton