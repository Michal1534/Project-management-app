import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { addHolidayAction, addHolidayErrorAction, addHolidaySuccessAction } from './add-new-holiday.action';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AddHolidayEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public addHoliday$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addHolidayAction),
            switchMap(
                ({
                    projectId,
                    holiday,
                }: {
                    projectId: number;
                    holiday: { userId: number; startDate: Date; endDate: Date; reason: string };
                }) => {
                    return this.httpClient
                        .post('http://localhost:3000/api/vacation/create-vacation', { ...holiday })
                        .pipe(
                            map(() => addHolidaySuccessAction({ projectId })),
                            catchError((error: Error) => of(addHolidayErrorAction({ error })))
                        );
                }
            )
        )
    );
}
