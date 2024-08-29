import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UsersResponse } from './fetch-users.response';
import { fetchUsersAction, fetchUsersErrorAction, fetchUsersSuccessAction } from './fetch-users.action';
import { addUserSuccessAction } from '../add-new-user/add-new-user.action';
import { editUserSuccessAction } from '../edit-user/edit-user.action';
import { removeUserSuccessAction } from '../remove-user/remove-user.action';
import { selectAuthenticatedUser } from '../../../../store/selectors/authenticated-user.selector';
import { AuthenticatedUserResponse } from '../../../../store/queries/fetch-authenticated-user/fetch-authenticated-user.response';
import { assignUsersToProjectSuccessAction } from '../assign-users-to-project/assign-users-to-project.action';

@Injectable()
export class FetchUsersEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    fetchUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                fetchUsersAction,
                addUserSuccessAction,
                editUserSuccessAction,
                removeUserSuccessAction,
                assignUsersToProjectSuccessAction
            ),
            switchMap((action: { type: string; projectId?: string }) =>
                this.store.select(selectAuthenticatedUser).pipe(
                    switchMap((authenticatedUser: AuthenticatedUserResponse) => {
                        const { projectId } = action;
                        if (!projectId && authenticatedUser.role !== 'Admin') {
                            return of(
                                fetchUsersErrorAction({ error: new Error('No projectId provided for non-admin user') })
                            );
                        }

                        const url =
                            authenticatedUser.role === 'Admin'
                                ? `http://localhost:3000/api/users`
                                : `http://localhost:3000/api/user-projects/users/${projectId}`;

                        return this.httpClient.get<UsersResponse[] | { users: UsersResponse[] }>(url).pipe(
                            map((response: UsersResponse[] | { users: UsersResponse[] }) => {
                                const users = Array.isArray(response) ? response : response.users;
                                return fetchUsersSuccessAction({ users });
                            }),
                            catchError((error: Error) => of(fetchUsersErrorAction({ error })))
                        );
                    })
                )
            )
        )
    );
}
