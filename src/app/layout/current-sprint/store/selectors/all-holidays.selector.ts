import { createSelector } from '@ngrx/store';
import { CurrentSprintState } from '../current-sprint-state';
import { selectCurrentSprintState } from '../current-sprint-state.selector';

export const selectAllHolidays = createSelector(
    selectCurrentSprintState,
    (state: CurrentSprintState) => state.holidays
);
