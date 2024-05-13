import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserProjectsResponse } from './fetch-projects.response';
import { fetchProjectsAction, fetchProjectsErrorAction, fetchProjectsSuccessAction } from './fetch-projects.action';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser } from '../../../store/selectors/authenticated-user.selector';
import { AuthenticatedUserResponse } from '../../../store/queries/fetch-authenticated-user/fetch-authenticated-user.response';

@Injectable()
export class FetchUserProjectsEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchUserProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProjectsAction),
            switchMap(() => this.store.select(selectAuthenticatedUser)),
            switchMap((authenticateUser: AuthenticatedUserResponse) => {
                console.log(authenticateUser.id);
                return this.httpClient
                    .get<UserProjectsResponse[]>(
                        `http://localhost:3000/api/user-projects/projects/${authenticateUser.id}`
                    )
                    .pipe(
                        map((userProjects: UserProjectsResponse[]) =>
                            fetchProjectsSuccessAction({ projects: userProjects })
                        ),
                        catchError((error: Error) => of(fetchProjectsErrorAction({ error })))
                    );
            })
        )
    );
}
