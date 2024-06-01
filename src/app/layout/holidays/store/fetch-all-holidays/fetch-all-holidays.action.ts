import { createAction, props } from '@ngrx/store';
import { HolidaysResponse } from './fetch-all-holidays.response';

export const fetchAllHolidaysAction = createAction(
    '[Holidays] Fetch All Holidays Action',
    props<{ projectId: number }>()
);

export const fetchAllHolidaysSuccessAction = createAction(
    '[Holidays] Fetch All Holidays Success Action',
    props<{ holidays: HolidaysResponse[] }>()
);

export const fetchAllHolidaysErrorAction = createAction(
    '[Holidays] Fetch All Holidays Error Action',
    props<{ error: Error }>()
);
