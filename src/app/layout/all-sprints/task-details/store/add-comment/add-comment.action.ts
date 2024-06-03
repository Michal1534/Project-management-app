import { createAction, props } from '@ngrx/store';

export const addCommentAction = createAction(
    '[Comments] Add Comment Action',
    props<{ comment: { comment_content: string; userId: number; taskId: number; commentDate: Date } }>()
);

export const addCommentSuccessAction = createAction(
    '[Comments] Add Comment Success Action',
    props<{ taskId: string }>()
);

export const addCommentErrorAction = createAction('[Comments] Add Comment Error Action', props<{ error: Error }>());
