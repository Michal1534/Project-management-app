import { AllSprintsState } from '../all-sprints-state';
import { createSelector } from '@ngrx/store';
import { selectAllSprintsState } from '../all-sprints-state.selector';

export const selectAllSprints = createSelector(selectAllSprintsState, (state: AllSprintsState) => state.sprints);
