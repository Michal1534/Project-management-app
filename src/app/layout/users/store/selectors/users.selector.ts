import { UsersState } from '../users-state';
import { createSelector } from '@ngrx/store';
import { selectUsersState } from '../users-state.selector';

export const selectUsers = createSelector(selectUsersState, (state: UsersState) => state.users);

export const selectUsersNotInProject = createSelector(selectUsersState, (state: UsersState) => state.usersNotInProject);
