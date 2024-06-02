import { createAction, props } from '@ngrx/store';

export const removeSprintAction = createAction(
    '[Sprints] Remove Sprint Action',
    props<{ sprintId: number; projectId: number }>()
);

export const removeSprintSuccessAction = createAction(
    '[Sprints] Remove Sprint Success Action',
    props<{ projectId: string }>()
);

export const removeSprintErrorAction = createAction('[Sprints] Remove Sprint Error Action', props<{ error: Error }>());
