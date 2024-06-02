import { createAction, props } from '@ngrx/store';

export const startSprintAction = createAction(
    '[Sprints] Start Sprint Action',
    props<{ sprint: { id: number; startDate: Date; endDate: Date; projectId: number; status: string; name: string } }>()
);

export const startSprintSuccessAction = createAction(
    '[Sprints] Start Sprint Success Action',
    props<{ projectId: string }>()
);

export const startSprintErrorAction = createAction('[Sprints] Start Sprint Error Action', props<{ error: Error }>());
