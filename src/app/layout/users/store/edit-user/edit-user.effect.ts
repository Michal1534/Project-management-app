import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { editUserAction, editUserErrorAction, editUserSuccessAction } from './edit-user.action';
import { EditUser } from './edit-user.request';

@Injectable()
export class EditUserEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public editUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editUserAction),
            switchMap(({ userId, user }: { userId: number; user: EditUser }) => {
                return this.httpClient.put(`http://localhost:3000/api/users/${userId}`, { ...user }).pipe(
                    map(() => editUserSuccessAction()),
                    catchError((error: Error) => of(editUserErrorAction({ error })))
                );
            })
        )
    );
}
