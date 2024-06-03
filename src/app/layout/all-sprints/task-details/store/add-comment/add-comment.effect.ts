import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { addCommentAction, addCommentErrorAction, addCommentSuccessAction } from './add-comment.action';

@Injectable()
export class AddCommentEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient) {}

    public addComment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCommentAction),
            switchMap(
                ({
                    comment,
                }: {
                    comment: { comment_content: string; userId: number; taskId: number; commentDate: Date };
                }) => {
                    return this.httpClient
                        .post('http://localhost:3000/api/comment/create-comment', { ...comment })
                        .pipe(
                            map(() => addCommentSuccessAction({ taskId: String(comment.taskId) })),
                            catchError((error: Error) => of(addCommentErrorAction({ error })))
                        );
                }
            )
        )
    );
}
