import { createReducer, on } from '@ngrx/store';
import { AllProjectsState } from './all-projects-state';
import { ProjectsResponse } from './fetch-all-projects/fetch-all-projects.response';
import { fetchAllProjectsSuccessAction } from './fetch-all-projects/fetch-all-projects.action';

export const allProjectsInitialState: AllProjectsState = {
    projects: [],
};

export const allProjectsReducer = createReducer(
    allProjectsInitialState,
    on(
        fetchAllProjectsSuccessAction,
        (allProjectsState: AllProjectsState, { projects }: { projects: ProjectsResponse[] }) => ({
            ...allProjectsState,
            projects,
        })
    )
);
