import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { endSprintAction, endSprintSuccessAction, endSprintErrorAction } from './end-sprint.action';

@Injectable()
export class EndSprintEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public endSprint$ = createEffect(() =>
        this.actions$.pipe(
            ofType(endSprintAction),
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
                        map(() => endSprintSuccessAction({ projectId: String(sprint.projectId) })),
                        catchError((error: Error) => of(endSprintErrorAction({ error })))
                    );
                }
            )
        )
    );
}
