import { createReducer, on } from '@ngrx/store';
import { AllHolidaysState } from './all-holidays-state';
import { fetchAllHolidaysSuccessAction } from './fetch-all-holidays/fetch-all-holidays.action';
import { HolidaysResponse } from './fetch-all-holidays/fetch-all-holidays.response';

export const allHolidaysInitialState: AllHolidaysState = {
    holidays: [],
};

export const allHolidaysReducer = createReducer(
    allHolidaysInitialState,
    on(
        fetchAllHolidaysSuccessAction,
        (allHolidaysState: AllHolidaysState, { holidays }: { holidays: HolidaysResponse[] }) => ({
            ...allHolidaysState,
            holidays,
        })
    )
);
