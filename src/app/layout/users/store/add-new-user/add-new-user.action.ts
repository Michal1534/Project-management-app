import { createAction, props } from '@ngrx/store';
import { AddUser } from './add-new-user.request';

export const addUserAction = createAction('[Users] Add User Action', props<{ projectId: string; user: AddUser }>());

export const addUserSuccessAction = createAction('[Users] Add User Success Action', props<{ projectId: string }>());

export const addUserErrorAction = createAction('[Users] Add User Error Action', props<{ error: Error }>());
