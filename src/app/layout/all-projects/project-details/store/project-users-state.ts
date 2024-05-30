import { ProjectUsers, Users } from './fetch-project-users/fetch-project-users.response';

export interface ProjectUsersState {
    projectUsers: Users[];
    projectName: string;
    usersNotInProject: Users[];
}
