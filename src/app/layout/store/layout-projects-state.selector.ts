import { createFeatureSelector } from '@ngrx/store';
import { LayoutProjectsState } from './layout-projects-state';

export const LAYOUT_PROJECTS_STATE_FEATURE_KEY = 'layout-projects-state-feature-key';

export const selectLayoutProjectsState = createFeatureSelector<LayoutProjectsState>(LAYOUT_PROJECTS_STATE_FEATURE_KEY);
