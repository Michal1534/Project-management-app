import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { removeSprintAction, removeSprintErrorAction, removeSprintSuccessAction } from './remove-sprint.action';

@Injectable()
export class RemoveSprintEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public removeSprint$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeSprintAction),
            switchMap(({ sprintId, projectId }: { sprintId: number; projectId: number }) => {
                return this.httpClient.delete(`http://localhost:3000/api/sprint/${sprintId}`).pipe(
                    map(() => {
                        return removeSprintSuccessAction({ projectId: String(projectId) });
                    }),
                    catchError((error: Error) => of(removeSprintErrorAction({ error })))
                );
            })
        )
    );
}
