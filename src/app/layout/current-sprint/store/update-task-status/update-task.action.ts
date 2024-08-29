import { createAction, props } from '@ngrx/store';

export const UpdateTaskAction = createAction(
    '[Current Sprint] Update Task Action',
    props<{ projectId: string; sprintId: string; task: any; taskId: string }>()
);

export const UpdateTaskSuccessAction = createAction(
    '[Current Sprint] Update Task Success Action',
    props<{ projectId: string; sprintId: string }>()
);

export const UpdateTaskErrorAction = createAction(
    '[Current Sprint] Update Task Error Action',
    props<{ error: Error }>()
);
