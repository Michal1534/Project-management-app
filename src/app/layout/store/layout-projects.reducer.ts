import { createReducer, on } from '@ngrx/store';
import { LayoutProjectsState } from './layout-projects-state';
import { fetchProjectsSuccessAction } from './fetch-projects/fetch-projects.action';
import { UserProjectsResponse } from './fetch-projects/fetch-projects.response';

export const layoutProjectsInitialState: LayoutProjectsState = {
    userProjects: [],
};

export const layoutProjectsReducer = createReducer(
    layoutProjectsInitialState,
    on(
        fetchProjectsSuccessAction,
        (userProjectsState: LayoutProjectsState, { projects }: { projects: UserProjectsResponse[] }) => ({
            ...userProjectsState,
            userProjects: projects,
        })
    )
);
