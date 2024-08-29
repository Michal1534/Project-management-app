import { createFeatureSelector } from '@ngrx/store';
import { CurrentSprintState } from './current-sprint-state';

export const CURRENT_SPRINT_STATE_FEATURE_KEY = 'current=sprint-state-feature-key';

export const selectCurrentSprintState = createFeatureSelector<CurrentSprintState>(CURRENT_SPRINT_STATE_FEATURE_KEY);
