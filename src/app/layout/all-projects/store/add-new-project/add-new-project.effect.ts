import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { addProjectAction, addProjectErrorAction, addProjectSuccessAction } from './add-new-project.action';

@Injectable()
export class AddProjectEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public addProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addProjectAction),
            switchMap(({ project }: { project: { name: string; status: string } }) => {
                return this.httpClient.post('http://localhost:3000/api/project/create-project', { ...project }).pipe(
                    map(() => addProjectSuccessAction()),
                    catchError((error: Error) => of(addProjectErrorAction({ error })))
                );
            })
        )
    );
}
