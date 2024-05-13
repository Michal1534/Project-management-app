import { createFeatureSelector } from '@ngrx/store';
import { UsersState } from './users-state';

export const USERS_STATE_FEATURE_KEY = 'users-state-feature-key';

export const selectUsersState = createFeatureSelector<UsersState>(USERS_STATE_FEATURE_KEY);
