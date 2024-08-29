import { createSelector } from '@ngrx/store';
import { TaskState } from '../task-state';
import { selectTaskState } from '../task-state.selector';

export const selectProjectUsers = createSelector(selectTaskState, (state: TaskState) => state.projectUsers);
