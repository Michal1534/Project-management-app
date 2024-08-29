import { createAction, props } from '@ngrx/store';

export const removeTaskAction = createAction(
    '[Sprints] Remove Task Action',
    props<{ taskId: number; projectId: number }>()
);

export const removeTaskSuccessAction = createAction(
    '[Sprints] Remove Task Success Action',
    props<{ projectId: string }>()
);

export const removeTaskErrorAction = createAction('[Sprints] Remove Task Error Action', props<{ error: Error }>());
