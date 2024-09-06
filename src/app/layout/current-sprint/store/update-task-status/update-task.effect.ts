import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, of, mergeMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UpdateTaskAction, UpdateTaskErrorAction, UpdateTaskSuccessAction } from './update-task.action';

@Injectable()
export class UpdateTaskEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public updateTaskEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UpdateTaskAction),
            mergeMap(
                ({
                    projectId,
                    sprintId,
                    taskId,
                    task,
                }: {
                    projectId: string;
                    sprintId: string;
                    task: any;
                    taskId: string;
                }) => {
                    return this.httpClient
                        .put(`http://localhost:3000/api/task/${taskId}`, {
                            ...task,
                            status: task.status,
                            type: task.task_type,
                            storyPoints: task.story_points,
                            createdBy: task.reported_by_user_id,
                            sprintId: task.sprint_id,
                        })
                        .pipe(
                            map(() => UpdateTaskSuccessAction({ sprintId, projectId })),
                            catchError((error: Error) => of(UpdateTaskErrorAction({ error })))
                        );
                }
            )
        )
    );
}
