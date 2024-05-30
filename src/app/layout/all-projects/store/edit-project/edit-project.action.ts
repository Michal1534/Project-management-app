import { createAction, props } from '@ngrx/store';

export const editProjectAction = createAction('[Projects] Edit Project Action', props<{ projectId: number ,project: { name: string } }>());

export const editProjectSuccessAction = createAction('[Projects] Edit Project Success Action');

export const editProjectErrorAction = createAction('[Projects] Edit Project Error Action', props<{ error: Error }>());
