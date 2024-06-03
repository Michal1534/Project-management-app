import { createReducer, on } from '@ngrx/store';
import { TaskState } from './task-state';
import { fetchTaskSuccessAction } from './fetch-task/fetch-task.action';
import { TaskResponse } from './fetch-task/fetch-task.response';
import { fetchProjectUsersSuccessAction } from '../../store/fetch-project-users/fetch-project-users.action';
import { ProjectUsers } from '../../store/fetch-project-users/fetch-project-users.response';
import { fetchCommentsSuccessAction } from './fetch-comments/fetch-comments.action';

export const taskInitialState: TaskState = {
    task: {
        assigned_user: {
            first_name: '',
            last_name: '',
        },
        assigned_user_id: 0,
        component: '',
        created_at: '',
        description: '',
        id: 0,
        name: '',
        priority: '',
        reported_by_user_id: 0,
        sprint_id: 0,
        status: '',
        story_points: 0,
        task_type: '',
    },
    comments: [],
};

export const taskReducer = createReducer(
    taskInitialState,
    on(fetchCommentsSuccessAction, (taskState: TaskState, { comments }: { comments: any[] }) => ({
        ...taskState,
        comments: comments,
    })),
    on(fetchTaskSuccessAction, (taskState: TaskState, { task }: { task: TaskResponse }) => ({
        ...taskState,
        task: task,
    }))
);
