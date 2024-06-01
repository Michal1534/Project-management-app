import { createAction, props } from '@ngrx/store';

export const removeHolidayAction = createAction(
    '[Holidays] Remove Holiday Action',
    props<{ holidayId: number; projectId: number }>()
);

export const removeHolidaySuccessAction = createAction(
    '[Holidays] Remove Holiday Success Action',
    props<{ projectId: number }>()
);

export const removeHolidayErrorAction = createAction(
    '[Holidays] Remove Holiday Error Action',
    props<{ error: Error }>()
);
