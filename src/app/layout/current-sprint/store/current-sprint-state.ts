import { SprintResponse } from './fetch-current-sprint/fetch-current-sprint.response';
import { Users } from './fetch-project-users/fetch-project-users.response';

export interface CurrentSprintState {
    sprint: SprintResponse;
    sprints: SprintResponse[];
    projectUsers: Users[];
    holidays: any[];
}
