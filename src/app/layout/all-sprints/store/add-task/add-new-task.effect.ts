import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { addTaskAction, addTaskErrorAction, addTaskSuccessAction } from './add-new-task.action';

@Injectable()
export class AddTaskEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTaskAction),
            switchMap(
                ({
                    projectId,
                    task,
                }: {
                    projectId: number;
                    task: {
                        sprintId: number;
                        name: string;
                        status: string;
                        description: string;
                        priority: string;
                        type: string;
                        storyPoints: number;
                        assignedTo: number;
                        createdBy: number;
                        component: string;
                    };
                }) => {
                    return this.httpClient.post('http://localhost:3000/api/task/create-task', { ...task }).pipe(
                        map(() => addTaskSuccessAction({ projectId: String(projectId) })),
                        catchError((error: Error) => of(addTaskErrorAction({ error })))
                    );
                }
            )
        )
    );
}
