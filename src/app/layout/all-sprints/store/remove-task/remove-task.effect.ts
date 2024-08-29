import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { removeTaskAction, removeTaskErrorAction, removeTaskSuccessAction } from './remove-task.action';

@Injectable()
export class RemoveTaskEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public removeTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeTaskAction),
            switchMap(({ taskId, projectId }: { taskId: number; projectId: number }) => {
                return this.httpClient.delete(`http://localhost:3000/api/task/${taskId}`).pipe(
                    map(() => {
                        return removeTaskSuccessAction({ projectId: String(projectId) });
                    }),
                    catchError((error: Error) => of(removeTaskErrorAction({ error })))
                );
            })
        )
    );
}
