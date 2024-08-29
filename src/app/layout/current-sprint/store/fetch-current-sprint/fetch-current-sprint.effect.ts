import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    fetchCurrentSprintAction,
    fetchCurrentSprintErrorAction,
    fetchCurrentSprintSuccessAction,
} from './fetch-current-sprint.action';
import { SprintResponse } from './fetch-current-sprint.response';
import { UpdateTaskSuccessAction } from '../update-task-status/update-task.action';

@Injectable()
export class FetchCurrentSprintEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchAllProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCurrentSprintAction, UpdateTaskSuccessAction),
            switchMap(({ projectId, sprintId }: { projectId: string; sprintId: string }) => {
                return this.httpClient
                    .get<SprintResponse>(`http://localhost:3000/api/sprint/project/${projectId}/${sprintId}`)
                    .pipe(
                        map((sprint: SprintResponse) => fetchCurrentSprintSuccessAction({ sprint })),
                        catchError((error: Error) => of(fetchCurrentSprintErrorAction({ error })))
                    );
            })
        )
    );
}
