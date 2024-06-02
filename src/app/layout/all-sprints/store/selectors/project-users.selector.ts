import { createSelector } from '@ngrx/store';
import { AllSprintsState } from '../all-sprints-state';
import { selectAllSprintsState } from '../all-sprints-state.selector';

export const selectProjectUsers = createSelector(selectAllSprintsState, (state: AllSprintsState) => state.projectUsers);
