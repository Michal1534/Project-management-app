import { createFeatureSelector } from '@ngrx/store';
import { UserProjectsState } from './user-projects-state';

export const USER_PROJECTS_STATE_FEATURE_KEY = 'user-projects-state-feature-key';

export const selectUserProjectsState = createFeatureSelector<UserProjectsState>(USER_PROJECTS_STATE_FEATURE_KEY);
