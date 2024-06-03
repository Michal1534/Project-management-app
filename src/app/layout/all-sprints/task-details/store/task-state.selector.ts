import { createFeatureSelector } from '@ngrx/store';
import { TaskState } from './task-state';

export const TASK_STATE_FEATURE_KEY = 'task-state-feature-key';

export const selectTaskState = createFeatureSelector<TaskState>(TASK_STATE_FEATURE_KEY);
