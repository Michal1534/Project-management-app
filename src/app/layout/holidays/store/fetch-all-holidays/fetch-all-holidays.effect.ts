import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    fetchAllHolidaysAction,
    fetchAllHolidaysErrorAction,
    fetchAllHolidaysSuccessAction,
} from './fetch-all-holidays.action';
import { addHolidaySuccessAction } from '../add-new-holiday/add-new-holiday.action';
import { HolidaysResponse } from './fetch-all-holidays.response';
import { removeHolidaySuccessAction } from '../remove-holiday/remove-holiday.action';

@Injectable()
export class FetchAllHolidaysEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchAllHolidays$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchAllHolidaysAction, addHolidaySuccessAction, removeHolidaySuccessAction),
            switchMap(({ projectId }: { projectId: number }) => {
                return this.httpClient
                    .get<HolidaysResponse[]>(`http://localhost:3000/api/vacation/project/${projectId}`)
                    .pipe(
                        map((holidays: HolidaysResponse[]) => {
                            return fetchAllHolidaysSuccessAction({ holidays });
                        }),
                        catchError((error: Error) => of(fetchAllHolidaysErrorAction({ error })))
                    );
            })
        )
    );
}