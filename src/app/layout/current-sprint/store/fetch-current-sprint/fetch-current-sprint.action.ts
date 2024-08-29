import { createAction, props } from '@ngrx/store';
import { SprintResponse } from './fetch-current-sprint.response';

export const fetchCurrentSprintAction = createAction(
    '[Current Sprint] Fetch Current Sprint Action',
    props<{ projectId: string; sprintId: string }>()
);

export const fetchCurrentSprintSuccessAction = createAction(
    '[Current Sprint] Fetch Current Sprint Success Action',
    props<{ sprint: SprintResponse }>()
);

export const fetchCurrentSprintErrorAction = createAction(
    '[Current Sprint] Fetch Current Sprint Error Action',
    props<{ error: Error }>()
);
