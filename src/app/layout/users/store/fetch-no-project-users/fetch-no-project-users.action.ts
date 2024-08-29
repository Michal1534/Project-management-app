import { createAction, props } from '@ngrx/store';
import { ProjectUsers, Users } from './fetch-project-users.response';

export const fetchNoProjectUsersAction = createAction(
    '[Users] Fetch No Project Users Action',
    props<{ projectId: string }>()
);

export const fetchNoProjectUsersSuccessAction = createAction(
    '[Users] Fetch No Project Users Success Action',
    props<{ usersNotInProject: Users[] }>()
);

export const fetchNoProjectUsersErrorAction = createAction(
    '[Users] Fetch No Project Users Error Action',
    props<{ error: Error }>()
);
