import { createAction, props } from '@ngrx/store';
import { TaskResponse } from './fetch-task.response';

export const fetchTaskAction = createAction('[Task Details] Fetch Task Action', props<{ taskId: string }>());

export const fetchTaskSuccessAction = createAction(
    '[Task Details] Fetch Task Success Action',
    props<{ task: TaskResponse }>()
);

export const fetchTaskErrorAction = createAction('[Task Details] Fetch Task Error Action', props<{ error: Error }>());
