import { createAction, props } from '@ngrx/store';

export const addSprintAction = createAction(
    '[Sprints] Add Sprint Action',
    props<{ sprint: { projectId: number; name: string; status: string } }>()
);

export const addSprintSuccessAction = createAction(
    '[Sprints] Add Sprint Success Action',
    props<{ projectId: string }>()
);

export const addSprintErrorAction = createAction('[Sprints] Add Sprint Error Action', props<{ error: Error }>());
