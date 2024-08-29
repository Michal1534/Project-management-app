import { createSelector } from '@ngrx/store';
import { CurrentSprintState } from '../current-sprint-state';
import { selectCurrentSprintState } from '../current-sprint-state.selector';

export const selectProjectUsers = createSelector(
    selectCurrentSprintState,
    (state: CurrentSprintState) => state.projectUsers
);
