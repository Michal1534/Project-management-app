import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import {
    assignUsersToProjectAction,
    assignUsersToProjectErrorAction,
    assignUsersToProjectSuccessAction,
} from './assign-users-to-project.action';

@Injectable()
export class AssignUsersToProjectEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public assignUsersToProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(assignUsersToProjectAction),
            switchMap(({ userIds, projectId }: { userIds: number[]; projectId: number }) => {
                return this.httpClient
                    .post('http://localhost:3000/api/user-projects/create-project-users', { userIds, projectId })
                    .pipe(
                        map(() => assignUsersToProjectSuccessAction({ projectId: String(projectId) })),
                        catchError((error: Error) => of(assignUsersToProjectErrorAction({ error })))
                    );
            })
        )
    );
}
