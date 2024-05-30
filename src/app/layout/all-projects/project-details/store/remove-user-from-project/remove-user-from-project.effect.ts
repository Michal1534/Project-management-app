import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
    removeUserFromProjectAction,
    removeUserFromProjectErrorAction,
    removeUserFromProjectSuccessAction,
} from './remove-user-from-project.action';

@Injectable()
export class RemoveUserFromProjectEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public removeUserFromProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeUserFromProjectAction),
            switchMap(({ userId, projectId }: { userId: number; projectId: number }) => {
                return this.httpClient.delete(`http://localhost:3000/api/user-projects/${userId}/${projectId}`).pipe(
                    map(() => {
                        return removeUserFromProjectSuccessAction({ projectId: String(projectId) });
                    }),
                    catchError((error: Error) => of(removeUserFromProjectErrorAction({ error })))
                );
            })
        )
    );
}
