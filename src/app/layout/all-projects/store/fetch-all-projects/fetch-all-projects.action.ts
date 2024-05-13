import { createAction, props } from '@ngrx/store';
import { ProjectsResponse } from './fetch-all-projects.response';

export const fetchAllProjectsAction = createAction('[Projects] Fetch All Projects Action');

export const fetchAllProjectsSuccessAction = createAction(
    '[Projects] Fetch All Projects Success Action',
    props<{ projects: ProjectsResponse[] }>()
);

export const fetchAllProjectsErrorAction = createAction(
    '[Projects] Fetch All Projects Error Action',
    props<{ error: Error }>()
);
