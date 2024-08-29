import { createAction, props } from '@ngrx/store';

export const removeUserAction = createAction(
    '[Projects] Remove User Action',
    props<{ userId: number; projectId: string }>()
);

export const removeUserSuccessAction = createAction(
    '[Projects] Remove User Success Action',
    props<{ projectId: string }>()
);

export const removeUserErrorAction = createAction('[Projects] Remove User Error Action', props<{ error: Error }>());
