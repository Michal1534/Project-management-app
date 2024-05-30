import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { editProjectAction, editProjectErrorAction, editProjectSuccessAction } from './edit-project.action';

@Injectable()
export class EditProjectEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public editProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editProjectAction),
            switchMap(({ projectId, project }: { projectId: number; project: { name: string } }) => {
                return this.httpClient.put(`http://localhost:3000/api/project/${projectId}`, { ...project }).pipe(
                    map(() => editProjectSuccessAction()),
                    catchError((error: Error) => of(editProjectErrorAction({ error })))
                );
            })
        )
    );
}
