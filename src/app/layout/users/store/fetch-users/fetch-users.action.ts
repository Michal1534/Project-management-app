import { createAction, props } from '@ngrx/store';
import { UsersResponse } from './fetch-users.response';

export const fetchUsersAction = createAction('[Users] Fetch Users Action');

export const fetchUsersSuccessAction = createAction(
    '[Users] Fetch Users Success Action',
    props<{ users: UsersResponse[] }>()
);

export const fetchUsersErrorAction = createAction('[Users] Fetch Users Error Action', props<{ error: Error }>());
