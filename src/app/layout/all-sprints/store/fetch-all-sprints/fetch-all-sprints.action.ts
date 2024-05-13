import { createAction, props } from '@ngrx/store';
import { SprintsResponse } from './fetch-all-sprints.response';

export const fetchAllSprintsAction = createAction('[Sprints] Fetch All Sprints Action', props<{ projectId: string }>());

export const fetchAllSprintsSuccessAction = createAction(
    '[Sprints] Fetch All Sprints Success Action',
    props<{ sprints: SprintsResponse[] }>()
);

export const fetchAllSprintsErrorAction = createAction(
    '[Sprints] Fetch All Sprints Error Action',
    props<{ error: Error }>()
);
