import { createFeatureSelector } from '@ngrx/store';
import { AllHolidaysState } from './all-holidays-state';

export const ALL_HOLIDAYS_STATE_FEATURE_KEY = 'all-holidays-state-feature-key';

export const selectAllHolidaysState = createFeatureSelector<AllHolidaysState>(ALL_HOLIDAYS_STATE_FEATURE_KEY);
