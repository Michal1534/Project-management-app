import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { addSprintAction, addSprintErrorAction, addSprintSuccessAction } from './add-new-sprint.action';

@Injectable()
export class AddSprintEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public addSprint$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addSprintAction),
            switchMap(({ sprint }: { sprint: { projectId: number; name: string; status: string } }) => {
                return this.httpClient.post('http://localhost:3000/api/sprint/create-sprint', { ...sprint }).pipe(
                    map(() => addSprintSuccessAction({ projectId: String(sprint.projectId) })),
                    catchError((error: Error) => of(addSprintErrorAction({ error })))
                );
            })
        )
    );
}
