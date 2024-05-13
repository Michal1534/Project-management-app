import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticatedUserResponse } from './fetch-authenticated-user.response';
import {
    fetchAuthenticatedUserAction,
    fetchAuthenticatedUserSuccessAction,
    fetchAuthenticatedUserErrorAction,
} from './fetch-authenticated-user.action';

@Injectable()
export class FetchAuthenticatedUserEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public fetchAuthenticatedUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchAuthenticatedUserAction),
            switchMap(() => {
                return this.httpClient.get<AuthenticatedUserResponse>('http://localhost:3000/api/auth').pipe(
                    map((authenticatedUser: AuthenticatedUserResponse) =>
                        fetchAuthenticatedUserSuccessAction({ authenticatedUser })
                    ),
                    catchError((error: Error) => of(fetchAuthenticatedUserErrorAction({ error })))
                );
            })
        )
    );
}
