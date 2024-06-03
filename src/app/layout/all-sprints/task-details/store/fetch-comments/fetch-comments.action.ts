import { createAction, props } from '@ngrx/store';

export const fetchCommentsAction = createAction('[Task Details] Fetch Comments Action', props<{ taskId: string }>());

export const fetchCommentsSuccessAction = createAction(
    '[Task Details] Fetch Comments Success Action',
    props<{ comments: any[] }>()
);

export const fetchCommentsErrorAction = createAction(
    '[Task Details] Fetch Comments Error Action',
    props<{ error: Error }>()
);
