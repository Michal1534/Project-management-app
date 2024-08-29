import { createReducer, on } from '@ngrx/store';
import { UsersState } from './users-state';
import { fetchUsersSuccessAction } from './fetch-users/fetch-users.action';
import { UsersResponse } from './fetch-users/fetch-users.response';
import { fetchNoProjectUsersSuccessAction } from './fetch-no-project-users/fetch-no-project-users.action';

export const usersInitialState: UsersState = {
    users: [],
    usersNotInProject: [],
};

export const usersReducer = createReducer(
    usersInitialState,
    on(fetchUsersSuccessAction, (usersState: UsersState, { users }: { users: UsersResponse[] }) => ({
        ...usersState,
        users,
    })),
    on(
        fetchNoProjectUsersSuccessAction,
        (projectUsersState: UsersState, { usersNotInProject }: { usersNotInProject: UsersResponse[] }) => ({
            ...projectUsersState,
            usersNotInProject,
        })
    )
);
