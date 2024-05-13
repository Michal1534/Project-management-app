import { createReducer, on } from '@ngrx/store';
import { UsersState } from './users-state';
import { fetchUsersSuccessAction } from './fetch-users/fetch-users.action';
import { UsersResponse } from './fetch-users/fetch-users.response';

export const usersInitialState: UsersState = {
    users: [],
};

export const usersReducer = createReducer(
    usersInitialState,
    on(fetchUsersSuccessAction, (usersState: UsersState, { users }: { users: UsersResponse[] }) => ({
        ...usersState,
        users,
    }))
);
