import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import {
    fetchAuthenticatedUserTokenAction,
    fetchAuthenticatedUserTokenSuccessAction,
    fetchAuthenticatedUserTokenErrorAction,
} from './fetch-user-token.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { FetchUserRequest } from './fetch-user.request';
import { FetchUserTokenResponse } from './fetch-user-token.response';
import { Store } from '@ngrx/store';
import { fetchAuthenticatedUserAction } from '../fetch-authenticated-user/fetch-authenticated-user.action';

@Injectable()
export class FetchAuthenticatedUserTokenEffect {
    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private router: Router,
        private store: Store
    ) {}

    public fetchAuthenticatedUserToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchAuthenticatedUserTokenAction),
            switchMap(({ user }: { user: FetchUserRequest }) => {
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                }
                return this.httpClient
                    .post<FetchUserTokenResponse>('http://localhost:3000/api/auth/login', {
                        username: user.email,
                        password: user.password,
                    })
                    .pipe(
                        tap((response: FetchUserTokenResponse) => {
                            this.store.dispatch(fetchAuthenticatedUserAction());

                            localStorage.setItem('token', response.token);
                            this.router.navigate(['/projects']);
                        }),
                        map((token: FetchUserTokenResponse) =>
                            fetchAuthenticatedUserTokenSuccessAction({ token: token.token })
                        ),
                        catchError((error: Error) => of(fetchAuthenticatedUserTokenErrorAction({ error })))
                    );
            })
        )
    );
}
