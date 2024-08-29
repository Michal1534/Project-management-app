import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    fetchProjectUsersAction,
    fetchProjectUsersSuccessAction,
    fetchProjectUsersErrorAction,
} from './fetch-project-users.action';
import { ProjectUsers } from './fetch-project-users.response';

@Injectable()
export class FetchProjectUsersEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public fetchProjectUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProjectUsersAction),
            switchMap(({ projectId }: { projectId: string }) => {
                return this.httpClient
                    .get<ProjectUsers>(`http://localhost:3000/api/user-projects/users/${projectId}`)
                    .pipe(
                        map((projectUsers: ProjectUsers) => fetchProjectUsersSuccessAction({ projectUsers })),
                        catchError((error: Error) => of(fetchProjectUsersErrorAction({ error })))
                    );
            })
        )
    );
}
