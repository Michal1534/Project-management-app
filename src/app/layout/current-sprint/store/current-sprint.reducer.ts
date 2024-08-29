import { createReducer, on } from '@ngrx/store';
import { CurrentSprintState } from './current-sprint-state';
import { SprintResponse } from './fetch-current-sprint/fetch-current-sprint.response';
import { fetchCurrentSprintSuccessAction } from './fetch-current-sprint/fetch-current-sprint.action';
import { fetchAllSprintsSuccessAction } from '../../all-sprints/store/fetch-all-sprints/fetch-all-sprints.action';
import { fetchProjectUsersSuccessAction } from './fetch-project-users/fetch-project-users.action';
import { fetchAllHolidaysSuccessAction } from './fetch-all-holidays/fetch-all-holidays.action';
import { HolidaysResponse } from './fetch-all-holidays/fetch-all-holidays.response';

export const currentSprintInitialState: CurrentSprintState = {
    sprint: {
        createdAt: '',
        deletedAt: '',
        end_date: new Date(),
        id: 0,
        name: '',
        projectId: 0,
        project: {
            createdAt: '',
            deletedAt: '',
            description: '',
            id: 0,
            name: '',
            updatedAt: '',
        },
        start_date: new Date(),
        status: '',
        tasks: [],
        updatedAt: '',
    },
    sprints: [],
    projectUsers: [],
    holidays: [],
};

export const currentSprintReducer = createReducer(
    currentSprintInitialState,
    on(
        fetchCurrentSprintSuccessAction,
        (currentSprintState: CurrentSprintState, { sprint }: { sprint: SprintResponse }) => ({
            ...currentSprintState,
            sprint,
        })
    ),
    on(
        fetchAllSprintsSuccessAction,
        (currentSprintState: CurrentSprintState, { sprints }: { sprints: SprintResponse[] }) => ({
            ...currentSprintState,
            sprints,
        })
    ),
    on(fetchProjectUsersSuccessAction, (currentSprintState: CurrentSprintState, { projectUsers }) => ({
        ...currentSprintState,
        projectUsers: projectUsers.users,
    })),
    on(
        fetchAllHolidaysSuccessAction,
        (allHolidaysState: CurrentSprintState, { holidays }: { holidays: HolidaysResponse[] }) => ({
            ...allHolidaysState,
            holidays,
        })
    )
);
