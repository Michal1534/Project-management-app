import { createFeatureSelector } from '@ngrx/store';
import { AllProjectsState } from './all-projects-state';

export const ALL_PROJECTS_STATE_FEATURE_KEY = 'all-projects-state-feature-key';

export const selectAllProjectsState = createFeatureSelector<AllProjectsState>(ALL_PROJECTS_STATE_FEATURE_KEY);
