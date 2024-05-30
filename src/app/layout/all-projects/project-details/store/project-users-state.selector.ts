import { createFeatureSelector } from '@ngrx/store';
import { ProjectUsersState } from './project-users-state';

export const PROJECT_USERS_STATE_FEATURE_KEY = 'project-users-state-feature-key';

export const selectProjectUsersState = createFeatureSelector<ProjectUsersState>(PROJECT_USERS_STATE_FEATURE_KEY);
