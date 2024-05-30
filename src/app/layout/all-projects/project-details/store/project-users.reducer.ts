import { createReducer, on } from '@ngrx/store';
import { ProjectUsersState } from './project-users-state';
import { fetchProjectUsersSuccessAction } from './fetch-project-users/fetch-project-users.action';
import { ProjectUsers, Users } from './fetch-project-users/fetch-project-users.response';
import { fetchNoProjectUsersSuccessAction } from './fetch-no-project-users/fetch-no-project-users.action';
import { clearProjectUsersAction } from './clear-project-users/clear-project-users.action';

export const projectUsersInitialState: ProjectUsersState = {
    projectUsers: [],
    projectName: '',
    usersNotInProject: [],
};

export const projectUsersReducer = createReducer(
    projectUsersInitialState,
    on(
        fetchProjectUsersSuccessAction,
        (projectUsersState: ProjectUsersState, { projectUsers }: { projectUsers: ProjectUsers }) => ({
            ...projectUsersState,
            projectUsers: projectUsers.users,
            projectName: projectUsers.project.name,
        })
    ),
    on(
        fetchNoProjectUsersSuccessAction,
        (projectUsersState: ProjectUsersState, { usersNotInProject }: { usersNotInProject: Users[] }) => ({
            ...projectUsersState,
            usersNotInProject,
        })
    ),
    on(clearProjectUsersAction, (projectUsersState: ProjectUsersState) => ({
        ...projectUsersInitialState,
    }))
);
