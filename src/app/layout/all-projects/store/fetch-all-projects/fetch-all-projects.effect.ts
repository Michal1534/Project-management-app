import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProjectsResponse } from './fetch-all-projects.response';
import {
    fetchAllProjectsAction,
    fetchAllProjectsSuccessAction,
    fetchAllProjectsErrorAction,
} from './fetch-all-projects.action';
import { addProjectSuccessAction } from '../add-new-project/add-new-project.action';
import { removeProjectSuccessAction } from '../remove-project/remove-project.action';
import { editProjectSuccessAction } from '../edit-project/edit-project.action';

@Injectable()
export class FetchAllProjectsEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchAllProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                fetchAllProjectsAction,
                addProjectSuccessAction,
                removeProjectSuccessAction,
                editProjectSuccessAction
            ),
            switchMap(() => {
                return this.httpClient.get<ProjectsResponse[]>(`http://localhost:3000/api/project`).pipe(
                    map((projects: ProjectsResponse[]) => {
                        console.log(projects);
                        return fetchAllProjectsSuccessAction({ projects });
                    }),
                    catchError((error: Error) => of(fetchAllProjectsErrorAction({ error })))
                );
            })
        )
    );
}
