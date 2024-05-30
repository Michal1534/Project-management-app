import { createAction, props } from '@ngrx/store';

export const addProjectAction = createAction('[Projects] Add Project Action', props<{ project: { name: string, status: string } }>());

export const addProjectSuccessAction = createAction('[Projects] Add Project Success Action');

export const addProjectErrorAction = createAction('[Projects] Add Project Error Action', props<{ error: Error }>());
