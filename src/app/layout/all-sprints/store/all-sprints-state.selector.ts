import { createFeatureSelector } from '@ngrx/store';
import { AllSprintsState } from './all-sprints-state';

export const ALL_SPRINTS_STATE_FEATURE_KEY = 'all-sprints-state-feature-key';

export const selectAllSprintsState = createFeatureSelector<AllSprintsState>(ALL_SPRINTS_STATE_FEATURE_KEY);
