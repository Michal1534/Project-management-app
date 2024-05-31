import { createAction, props } from '@ngrx/store';
import { EditUser } from './edit-user.request';

export const editUserAction = createAction('[Users] Edit User Action', props<{ userId: number; user: EditUser }>());

export const editUserSuccessAction = createAction('[Users] Edit User Success Action');

export const editUserErrorAction = createAction('[Users] Edit User Error Action', props<{ error: Error }>());
