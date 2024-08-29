import { createAction, props } from '@ngrx/store';
import { UserProjectsResponse } from './fetch-projects.response';

export const fetchProjectsAction = createAction('[Layout] Fetch Projects Action');

export const fetchProjectsSuccessAction = createAction(
    '[Layout] Fetch Projects Success Action',
    props<{ projects: UserProjectsResponse[] }>()
);

export const fetchProjectsErrorAction = createAction('[Layout] Fetch Projects Error Action', props<{ error: Error }>());
