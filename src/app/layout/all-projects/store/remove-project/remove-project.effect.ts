import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { removeProjectAction, removeProjectErrorAction, removeProjectSuccessAction } from './remove-project.action';

@Injectable()
export class RemoveProjectEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public removeProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeProjectAction),
            switchMap(({ projectId }: { projectId: number }) => {
                return this.httpClient.delete(`http://localhost:3000/api/project/${projectId}`).pipe(
                    map(() => {
                        return removeProjectSuccessAction({ projectId: String(projectId) });
                    }),
                    catchError((error: Error) => of(removeProjectErrorAction({ error })))
                );
            })
        )
    );
}
