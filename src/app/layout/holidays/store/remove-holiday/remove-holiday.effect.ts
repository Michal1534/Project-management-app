import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { removeHolidayAction, removeHolidayErrorAction, removeHolidaySuccessAction } from './remove-holiday.action';

@Injectable()
export class RemoveHolidayEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public removeHoliday$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeHolidayAction),
            switchMap(({ holidayId, projectId }: { holidayId: number; projectId: number }) => {
                return this.httpClient.delete(`http://localhost:3000/api/vacation/${holidayId}`).pipe(
                    map(() => {
                        return removeHolidaySuccessAction({ projectId });
                    }),
                    catchError((error: Error) => of(removeHolidayErrorAction({ error })))
                );
            })
        )
    );
}
