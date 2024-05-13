import { AllProjectsState } from '../all-projects-state';
import { createSelector } from '@ngrx/store';
import { selectAllProjectsState } from '../all-projects-state.selector';

export const selectAllProjects = createSelector(selectAllProjectsState, (state: AllProjectsState) => state.projects);
