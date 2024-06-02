import { Users } from '../../all-projects/project-details/store/fetch-project-users/fetch-project-users.response';
import { SprintsResponse } from './fetch-all-sprints/fetch-all-sprints.response';

export interface AllSprintsState {
    sprints: SprintsResponse[];
    projectUsers: Users[];
}
