import { createSelector } from '@ngrx/store';
import { CurrentSprintState } from '../current-sprint-state';
import { selectCurrentSprintState } from '../current-sprint-state.selector';

export const selectCurrentSprint = createSelector(
    selectCurrentSprintState,
    (state: CurrentSprintState) => state.sprint
);
