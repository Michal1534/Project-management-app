import { ProjectUsersState } from '../project-users-state';
import { createSelector } from '@ngrx/store';
import { selectProjectUsersState } from '../project-users-state.selector';

export const selectProjectUsers = createSelector(
    selectProjectUsersState,
    (state: ProjectUsersState) => state.projectUsers
);

export const selectProjectName = createSelector(
    selectProjectUsersState,
    (state: ProjectUsersState) => state.projectName
);

export const selectUsersNotInProject = createSelector(
    selectProjectUsersState,
    (state: ProjectUsersState) => state.usersNotInProject
);
