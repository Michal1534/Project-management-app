import { createSelector } from '@ngrx/store';
import { selectAllHolidaysState } from '../all-holidays-state.selector';
import { AllHolidaysState } from '../all-holidays-state';

export const selectAllHolidays = createSelector(selectAllHolidaysState, (state: AllHolidaysState) => state.holidays);
