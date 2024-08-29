import { createAction, props } from '@ngrx/store';
import { HolidaysResponse } from './fetch-all-holidays.response';

export const fetchAllHolidaysAction = createAction(
    '[Current sprint] Fetch All Holidays Action',
    props<{ projectId: number }>()
);

export const fetchAllHolidaysSuccessAction = createAction(
    '[Current sprint] Fetch All Holidays Success Action',
    props<{ holidays: HolidaysResponse[] }>()
);

export const fetchAllHolidaysErrorAction = createAction(
    '[Current sprint] Fetch All Holidays Error Action',
    props<{ error: Error }>()
);
