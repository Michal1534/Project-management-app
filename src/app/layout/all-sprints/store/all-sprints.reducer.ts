import { createReducer, on } from '@ngrx/store';
import { AllSprintsState } from './all-sprints-state';
import { SprintsResponse } from './fetch-all-sprints/fetch-all-sprints.response';
import { fetchAllSprintsSuccessAction } from './fetch-all-sprints/fetch-all-sprints.action';

export const allSprintsInitialState: AllSprintsState = {
    sprints: [],
};

export const allSprintsReducer = createReducer(
    allSprintsInitialState,
    on(
        fetchAllSprintsSuccessAction,
        (allSprintsState: AllSprintsState, { sprints }: { sprints: SprintsResponse[] }) => ({
            ...allSprintsState,
            sprints,
        })
    )
);
