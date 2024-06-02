import { createAction, props } from '@ngrx/store';
import { ProjectUsers } from './fetch-project-users.response';

export const fetchProjectUsersAction = createAction(
    '[Tasks List] Fetch Project Users Action',
    props<{ projectId: string }>()
);

export const fetchProjectUsersSuccessAction = createAction(
    '[Tasks List] Fetch Project Users Success Action',
    props<{ projectUsers: ProjectUsers }>()
);

export const fetchProjectUsersErrorAction = createAction(
    '[Tasks List] Fetch Project Users Error Action',
    props<{ error: Error }>()
);
