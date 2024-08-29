import { createAction, props } from '@ngrx/store';

export const assignUsersToProjectAction = createAction(
    '[Users] Assign Users To Project Action',
    props<{ userIds: number[]; projectId: number }>()
);

export const assignUsersToProjectSuccessAction = createAction(
    '[Users] Assign Users To Project Success Action',
    props<{ projectId: string }>()
);

export const assignUsersToProjectErrorAction = createAction(
    '[Users] Assign Users To Project Error Action',
    props<{ error: Error }>()
);
