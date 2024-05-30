import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    fetchNoProjectUsersAction,
    fetchNoProjectUsersErrorAction,
    fetchNoProjectUsersSuccessAction,
} from './fetch-no-project-users.action';
import { assignUsersToProjectSuccessAction } from '../assign-users-to-project/assign-users-to-project.action';
import { removeUserFromProjectSuccessAction } from '../remove-user-from-project/remove-user-from-project.action';

@Injectable()
export class FetchNoProjectUsersEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public fetchNoProjectUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchNoProjectUsersAction, assignUsersToProjectSuccessAction, removeUserFromProjectSuccessAction),
            switchMap(({ projectId }: { projectId: string }) => {
                return this.httpClient.get<any[]>(`http://localhost:3000/api/users/not-in-project/${projectId}`).pipe(
                    map((usersNotInProject: any[]) => fetchNoProjectUsersSuccessAction({ usersNotInProject })),
                    catchError((error: Error) => of(fetchNoProjectUsersErrorAction({ error })))
                );
            })
        )
    );
}
