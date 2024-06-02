import { createReducer, on } from '@ngrx/store';
import { AllSprintsState } from './all-sprints-state';
import { SprintsResponse } from './fetch-all-sprints/fetch-all-sprints.response';
import { fetchAllSprintsSuccessAction } from './fetch-all-sprints/fetch-all-sprints.action';
import { fetchProjectUsersSuccessAction } from './fetch-project-users/fetch-project-users.action';
import { ProjectUsers } from '../../all-projects/project-details/store/fetch-project-users/fetch-project-users.response';

export const allSprintsInitialState: AllSprintsState = {
    sprints: [],
    projectUsers: [],
};

export const allSprintsReducer = createReducer(
    allSprintsInitialState,
    on(
        fetchAllSprintsSuccessAction,
        (allSprintsState: AllSprintsState, { sprints }: { sprints: SprintsResponse[] }) => ({
            ...allSprintsState,
            sprints,
        })
    ),
    on(
        fetchProjectUsersSuccessAction,
        (allSprintsState: AllSprintsState, { projectUsers }: { projectUsers: ProjectUsers }) => ({
            ...allSprintsState,
            projectUsers: projectUsers.users,
        })
    )
);
