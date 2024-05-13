import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UsersResponse } from './fetch-users.response';
import { fetchUsersAction, fetchUsersErrorAction, fetchUsersSuccessAction } from './fetch-users.action';
import { addUserSuccessAction } from '../add-new-user/add-new-user.action';

@Injectable()
export class FetchUsersEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchUsersAction, addUserSuccessAction),
            switchMap(() => {
                return this.httpClient.get<UsersResponse[]>(`http://localhost:3000/api/users`).pipe(
                    map((users: UsersResponse[]) => fetchUsersSuccessAction({ users })),
                    catchError((error: Error) => of(fetchUsersErrorAction({ error })))
                );
            })
        )
    );
}
