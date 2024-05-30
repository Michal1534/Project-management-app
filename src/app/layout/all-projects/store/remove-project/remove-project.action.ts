import { createAction, props } from '@ngrx/store';

export const removeProjectAction = createAction('[Projects] Remove Project Action', props<{ projectId: number }>());

export const removeProjectSuccessAction = createAction(
    '[Projects] Remove Project Success Action',
    props<{ projectId: string }>()
);

export const removeProjectErrorAction = createAction(
    '[Projects] Remove Project Error Action',
    props<{ error: Error }>()
);
