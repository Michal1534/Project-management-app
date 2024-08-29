import { createAction, props } from '@ngrx/store';
import { EditUser } from './edit-user.request';

export const editUserAction = createAction(
    '[Users] Edit User Action',
    props<{ projectId: string; userId: number; user: EditUser }>()
);

export const editUserSuccessAction = createAction('[Users] Edit User Success Action', props<{ projectId: string }>());

export const editUserErrorAction = createAction('[Users] Edit User Error Action', props<{ error: Error }>());
