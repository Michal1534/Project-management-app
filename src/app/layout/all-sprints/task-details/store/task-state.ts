import { CommentsResponse } from './fetch-comments/fetch-comments.response';
import { TaskResponse } from './fetch-task/fetch-task.response';

export interface TaskState {
    task: any;
    comments: any[];
}
