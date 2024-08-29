import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CommentsResponse } from './fetch-comments.response';
import { fetchCommentsAction, fetchCommentsSuccessAction, fetchCommentsErrorAction } from './fetch-comments.action';
import { addCommentSuccessAction } from '../add-comment/add-comment.action';
import { removeCommentSuccessAction } from '../remove-comment/remove-comment.action';

@Injectable()
export class FetchCommentsEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public fetchComments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCommentsAction, addCommentSuccessAction, removeCommentSuccessAction),
            switchMap(({ taskId }: { taskId: string }) => {
                return this.httpClient.get<CommentsResponse[]>(`http://localhost:3000/api/comment/task/${taskId}`).pipe(
                    map((comments: CommentsResponse[]) => {
                        return fetchCommentsSuccessAction({ comments });
                    }),
                    catchError((error: Error) => of(fetchCommentsErrorAction({ error })))
                );
            })
        )
    );
}
