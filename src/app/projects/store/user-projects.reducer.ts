import { createReducer, on } from '@ngrx/store';
import { UserProjectsState } from './user-projects-state';
import { fetchProjectsSuccessAction } from './fetch-projects/fetch-projects.action';
import { UserProjectsResponse } from './fetch-projects/fetch-projects.response';

export const userProjectsInitialState: UserProjectsState = {
    userProjects: [],
};

export const userProjectsReducer = createReducer(
    userProjectsInitialState,
    on(
        fetchProjectsSuccessAction,
        (userProjectsState: UserProjectsState, { projects }: { projects: UserProjectsResponse[] }) => ({
            ...userProjectsState,
            userProjects: projects,
        })
    )
);
