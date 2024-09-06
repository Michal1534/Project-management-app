import { createAction, props } from '@ngrx/store';

export const addTaskAction = createAction(
    '[Tasks] Add Task Action',
    props<{
        projectId: number;
        task: {
            sprintId: number;
            name: string;
            status: string;
            description: string;
            priority: string;
            type: string;
            storyPoints: number;
            assignedTo: number;
            createdBy: number;
            component: string;
        };
    }>()
);

export const addTaskSuccessAction = createAction('[Tasks] Add Task Success Action', props<{ projectId: string }>());

export const addTaskErrorAction = createAction('[Tasks] Add Task Error Action', props<{ error: Error }>());
