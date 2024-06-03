import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap, map, catchError, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { removeCommentAction, removeCommentErrorAction, removeCommentSuccessAction } from './remove-comment.action';

@Injectable()
export class RemoveCommentEffect {
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

    public removeComment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeCommentAction),
            switchMap(({ taskId, commentId }: { taskId: string; commentId: number }) => {
                return this.httpClient.delete(`http://localhost:3000/api/comment/${commentId}`).pipe(
                    map(() => {
                        return removeCommentSuccessAction({ taskId });
                    }),
                    catchError((error: Error) => of(removeCommentErrorAction({ error })))
                );
            })
        )
    );
}
