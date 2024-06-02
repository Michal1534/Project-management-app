import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { startSprintAction, startSprintSuccessAction, startSprintErrorAction } from './start-sprint.action';

@Injectable()
export class StartSprintEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public startSprint$ = createEffect(() =>
        this.actions$.pipe(
            ofType(startSprintAction),
            switchMap(
                ({
                    sprint,
                }: {
                    sprint: {
                        id: number;
                        startDate: Date;
                        endDate: Date;
                        projectId: number;
                        status: string;
                        name: string;
                    };
                }) => {
                    return this.httpClient.put(`http://localhost:3000/api/sprint/${sprint.id}`, { ...sprint }).pipe(
                        map(() => startSprintSuccessAction({ projectId: String(sprint.projectId) })),
                        catchError((error: Error) => of(startSprintErrorAction({ error })))
                    );
                }
            )
        )
    );
}
