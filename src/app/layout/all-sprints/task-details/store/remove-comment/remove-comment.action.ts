import { createAction, props } from '@ngrx/store';

export const removeCommentAction = createAction(
    '[Comments] Remove Comment Action',
    props<{ taskId: string; commentId: number }>()
);

export const removeCommentSuccessAction = createAction(
    '[Comments] Remove Comment Success Action',
    props<{ taskId: string }>()
);

export const removeCommentErrorAction = createAction(
    '[Comments] Remove Comment Error Action',
    props<{ error: Error }>()
);
