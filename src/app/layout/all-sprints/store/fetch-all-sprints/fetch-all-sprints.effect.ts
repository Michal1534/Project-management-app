import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    fetchAllSprintsAction,
    fetchAllSprintsErrorAction,
    fetchAllSprintsSuccessAction,
} from './fetch-all-sprints.action';
import { SprintsResponse } from './fetch-all-sprints.response';

@Injectable()
export class FetchAllSprintsEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchAllProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchAllSprintsAction),
            switchMap(({ projectId }: { projectId: string }) => {
                return this.httpClient
                    .get<SprintsResponse[]>(`http://localhost:3000/api/sprint/project/${projectId}`)
                    .pipe(
                        map((sprints: SprintsResponse[]) => fetchAllSprintsSuccessAction({ sprints })),
                        catchError((error: Error) => of(fetchAllSprintsErrorAction({ error })))
                    );
            })
        )
    );
}