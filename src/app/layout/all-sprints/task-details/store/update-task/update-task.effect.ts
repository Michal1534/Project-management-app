import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UpdateTaskAction, UpdateTaskErrorAction, UpdateTaskSuccessAction } from './update-task.action';

@Injectable()
export class UpdateTaskEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UpdateTaskAction),
            switchMap(({ taskId, task }: { task: any; taskId: string }) => {
                return this.httpClient
                    .put(`http://localhost:3000/api/task/${taskId}`, {
                        ...task,
                    })
                    .pipe(
                        map(() => UpdateTaskSuccessAction({ taskId })),
                        catchError((error: Error) => of(UpdateTaskErrorAction({ error })))
                    );
            })
        )
    );
}
