import { createAction, props } from '@ngrx/store';

export const UpdateTaskAction = createAction(
    '[Task Details] Update Task Action',
    props<{ task: any; taskId: string }>()
);

export const UpdateTaskSuccessAction = createAction(
    '[Task Details] Update Task Success Action',
    props<{ taskId: string }>()
);

export const UpdateTaskErrorAction = createAction('[Task Details] Update Task Error Action', props<{ error: Error }>());
