import { LayoutProjectsState } from '../layout-projects-state';
import { createSelector } from '@ngrx/store';
import { selectLayoutProjectsState } from '../layout-projects-state.selector';

export const selectUserProjects = createSelector(
    selectLayoutProjectsState,
    (state: LayoutProjectsState) => state.userProjects
);
