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
import { addSprintSuccessAction } from '../add-new-sprint/add-new-sprint.action';
import { startSprintSuccessAction } from '../start-sprint/start-sprint.action';
import { removeSprintSuccessAction } from '../remove-sprint/remove-sprint.action';
import { endSprintSuccessAction } from '../end-sprint/end-sprint.action';
import { addTaskSuccessAction } from '../add-task/add-new-sprint.action';

@Injectable()
export class FetchAllSprintsEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchAllProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                fetchAllSprintsAction,
                addSprintSuccessAction,
                startSprintSuccessAction,
                removeSprintSuccessAction,
                endSprintSuccessAction,
                addTaskSuccessAction
            ),
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
