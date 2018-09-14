import { IActivityService, IBadge } from 'vs/workbench/services/activity/common/activity';
import { IDisposable, toDisposable } from 'vs/base/common/lifecycle';

export class CodeSandboxActivityService implements IActivityService {
	_serviceBrand: any;

	showActivity(
		compositeOrActionId: string,
		badge: IBadge,
		clazz?: string,
		priority?: number
	): IDisposable {
		console.log('activityService', compositeOrActionId, badge, clazz, priority);

		return toDisposable(() => true);
	}
}
