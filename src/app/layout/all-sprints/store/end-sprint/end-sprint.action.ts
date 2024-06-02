import { createAction, props } from '@ngrx/store';

export const endSprintAction = createAction(
    '[Sprints] End Sprint Action',
    props<{ sprint: { id: number; startDate: Date; endDate: Date; projectId: number; status: string; name: string } }>()
);

export const endSprintSuccessAction = createAction(
    '[Sprints] End Sprint Success Action',
    props<{ projectId: string }>()
);

export const endSprintErrorAction = createAction('[Sprints] End Sprint Error Action', props<{ error: Error }>());
