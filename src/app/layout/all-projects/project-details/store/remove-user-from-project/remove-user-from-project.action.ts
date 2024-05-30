import { createAction, props } from '@ngrx/store';

export const removeUserFromProjectAction = createAction(
    '[Projects] Remove User From Project Action',
    props<{ userId: number; projectId: number }>()
);

export const removeUserFromProjectSuccessAction = createAction(
    '[Projects] Remove User From Project Success Action',
    props<{ projectId: string }>()
);

export const removeUserFromProjectErrorAction = createAction(
    '[Projects] Remove User From Project Error Action',
    props<{ error: Error }>()
);
