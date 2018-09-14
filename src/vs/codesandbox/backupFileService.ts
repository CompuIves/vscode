import { IBackupFileService } from 'vs/workbench/services/backup/common/backup';
import { TPromise } from 'vs/base/common/winjs.base';
import { ITextSnapshot } from 'vs/platform/files/common/files';
import { ITextBufferFactory } from 'vs/editor/common/model';
import URI from 'vs/base/common/uri';

/**
 * A service that handles any I/O and state associated with the backup system.
 */
export class CodeSandboxBackupService implements IBackupFileService {
	_serviceBrand: any;

	/**
	 * Finds out if there are any backups stored.
	 */
	hasBackups(): TPromise<boolean> {
		return new TPromise(resolve => resolve(false));
	};

	/**
	 * Loads the backup resource for a particular resource within the current workspace.
	 *
	 * @param resource The resource that is backed up.
	 * @return The backup resource if any.
	 */
	loadBackupResource(resource: URI): TPromise<URI> {
		return new TPromise(resolve => resolve(null));
	};

	/**
	 * Given a resource, returns the associated backup resource.
	 *
	 * @param resource The resource to get the backup resource for.
	 * @return The backup resource.
	 */
	toBackupResource(resource: URI): URI {
		return resource;
	};

	/**
	 * Backs up a resource.
	 *
	 * @param resource The resource to back up.
	 * @param content The content of the resource as snapshot.
	 * @param versionId The version id of the resource to backup.
	 */
	backupResource(resource: URI, content: ITextSnapshot, versionId?: number): TPromise<void> {
		return new TPromise(resolve => resolve(null));
	};

	/**
	 * Gets a list of file backups for the current workspace.
	 *
	 * @return The list of backups.
	 */
	getWorkspaceFileBackups(): TPromise<URI[]> {
		return new TPromise(resolve => resolve(null));
	};

	/**
	 * Resolves the backup for the given resource.
	 *
	 * @param value The contents from a backup resource as stream.
	 * @return The backup file's backed up content as text buffer factory.
	 */
	resolveBackupContent(backup: URI): TPromise<ITextBufferFactory> {
		return new TPromise(resolve => resolve(null));
	}

	/**
	 * Discards the backup associated with a resource if it exists..
	 *
	 * @param resource The resource whose backup is being discarded discard to back up.
	 */
	discardResourceBackup(resource: URI) {
		return new TPromise(resolve => resolve(null));
	};

	/**
	 * Discards all backups associated with the current workspace and prevents further backups from
	 * being made.
	 */
	discardAllWorkspaceBackups() {
		return new TPromise(resolve => resolve(null));
	};
}
