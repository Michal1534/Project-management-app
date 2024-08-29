import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { removeUserAction, removeUserErrorAction, removeUserSuccessAction } from './remove-user.action';
import { selectAuthenticatedUser } from '../../../../store/selectors/authenticated-user.selector';
import { AuthenticatedUserResponse } from '../../../../store/queries/fetch-authenticated-user/fetch-authenticated-user.response';

@Injectable()
export class RemoveUserEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public removeUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeUserAction),
            switchMap((action: { type: string; projectId?: string; userId?: number }) =>
                this.store.select(selectAuthenticatedUser).pipe(
                    switchMap((authenticatedUser: AuthenticatedUserResponse) => {
                        const { projectId, userId } = action;
                        if (!projectId && !userId && authenticatedUser.role !== 'Admin') {
                            return of(
                                removeUserErrorAction({ error: new Error('No projectId provided for non-admin user') })
                            );
                        }

                        const url =
                            authenticatedUser.role === 'Admin'
                                ? `http://localhost:3000/api/users/${userId}`
                                : `http://localhost:3000/api/user-projects/${userId}/${projectId}`;
                        return this.httpClient.delete(url).pipe(
                            map(() => {
                                return removeUserSuccessAction({ projectId: String(projectId) });
                            }),
                            catchError((error: Error) => of(removeUserErrorAction({ error })))
                        );
                    })
                )
            )
        )
    );
}
