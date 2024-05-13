import { createAction, props } from '@ngrx/store';
import { UserProjectsResponse } from './fetch-projects.response';

export const fetchProjectsAction = createAction('[Projects] Fetch Projects Action');

export const fetchProjectsSuccessAction = createAction(
    '[Projects] Fetch Projects Success Action',
    props<{ projects: UserProjectsResponse[] }>()
);

export const fetchProjectsErrorAction = createAction(
    '[Projects] Fetch Projects Error Action',
    props<{ error: Error }>()
);
