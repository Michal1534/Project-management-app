import { createAction, props } from '@ngrx/store';

export const addHolidayAction = createAction(
    '[Holidays] Add Holidays Action',
    props<{
        projectId: number;
        holiday: {
            userId: number;
            startDate: Date;
            endDate: Date;
            reason: string;
        };
    }>()
);

export const addHolidaySuccessAction = createAction(
    '[Holidays] Add Holidays Success Action',
    props<{ projectId: number }>()
);

export const addHolidayErrorAction = createAction('[Holidays] Add Holidays Error Action', props<{ error: Error }>());
