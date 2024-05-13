import { UserProjectsState } from '../user-projects-state';
import { createSelector } from '@ngrx/store';
import { selectUserProjectsState } from '../user-projects-state.selector';

export const selectUserProjects = createSelector(
    selectUserProjectsState,
    (state: UserProjectsState) => state.userProjects
);
