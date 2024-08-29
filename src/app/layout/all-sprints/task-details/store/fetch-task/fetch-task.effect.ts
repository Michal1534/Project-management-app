import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetchTaskAction, fetchTaskSuccessAction, fetchTaskErrorAction } from './fetch-task.action';
import { TaskResponse } from './fetch-task.response';
import { UpdateTaskSuccessAction } from '../update-task/update-task.action';

@Injectable()
export class FetchTaskEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTaskAction, UpdateTaskSuccessAction),
            switchMap(({ taskId }: { taskId: string }) => {
                return this.httpClient.get<TaskResponse>(`http://localhost:3000/api/task/${taskId}`).pipe(
                    map((task: TaskResponse) => {
                        return fetchTaskSuccessAction({ task });
                    }),
                    catchError((error: Error) => of(fetchTaskErrorAction({ error })))
                );
            })
        )
    );
}
