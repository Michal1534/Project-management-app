import { UsersResponse } from './fetch-users/fetch-users.response';

export interface UsersState {
    users: UsersResponse[];
    usersNotInProject: UsersResponse[];
}
