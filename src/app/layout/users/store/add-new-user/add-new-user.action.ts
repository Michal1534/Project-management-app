import { createAction, props } from '@ngrx/store';
import { AddUser } from './add-new-user.request';

export const addUserAction = createAction('[Users] Add User Action', props<{ user: AddUser }>());

export const addUserSuccessAction = createAction('[Users] Add User Success Action');

export const addUserErrorAction = createAction('[Users] Add User Error Action', props<{ error: Error }>());
