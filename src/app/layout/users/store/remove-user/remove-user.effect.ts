import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { removeUserAction, removeUserErrorAction, removeUserSuccessAction } from './remove-user.action';

@Injectable()
export class RemoveUserEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public removeUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeUserAction),
            switchMap(({ userId }: { userId: number }) => {
                return this.httpClient.delete(`http://localhost:3000/api/users/${userId}`).pipe(
                    map(() => {
                        return removeUserSuccessAction();
                    }),
                    catchError((error: Error) => of(removeUserErrorAction({ error })))
                );
            })
        )
    );
}
