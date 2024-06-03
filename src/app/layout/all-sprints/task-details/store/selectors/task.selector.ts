import { TaskState } from '../task-state';
import { createSelector } from '@ngrx/store';
import { selectTaskState } from '../task-state.selector';

export const selectTask = createSelector(selectTaskState, (state: TaskState) => state.task);
