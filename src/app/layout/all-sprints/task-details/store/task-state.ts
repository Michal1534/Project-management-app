import { CommentsResponse } from './fetch-comments/fetch-comments.response';
import { Users } from './fetch-project-users/fetch-project-users.response';
import { TaskResponse } from './fetch-task/fetch-task.response';

export interface TaskState {
    task: any;
    comments: any[];
    projectUsers: Users[];
}
