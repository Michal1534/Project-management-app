import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { addUserAction, addUserErrorAction, addUserSuccessAction } from './add-new-user.action';
import { AddUser } from './add-new-user.request';

@Injectable()
export class AddUserEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUserAction),
            switchMap(({ user }: { user: AddUser }) => {
                console.log({ ...user });
                return this.httpClient.post('http://localhost:3000/api/auth/signup', { ...user }).pipe(
                    map(() => addUserSuccessAction()),
                    catchError((error: Error) => of(addUserErrorAction({ error })))
                );
            })
        )
    );
}
