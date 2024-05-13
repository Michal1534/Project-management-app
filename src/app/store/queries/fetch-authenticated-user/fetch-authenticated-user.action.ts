import { createAction, props } from '@ngrx/store';
import { AuthenticatedUserResponse } from './fetch-authenticated-user.response';

export const fetchAuthenticatedUserAction = createAction(
  '[AuthenticatedUser] Fetch AuthenticatedUser Action'
);

export const fetchAuthenticatedUserSuccessAction = createAction(
  '[AuthenticatedUser] Fetch AuthenticatedUser Success Action',
  props<{ authenticatedUser: AuthenticatedUserResponse }>(),
);

export const fetchAuthenticatedUserErrorAction = createAction(
  '[AuthenticatedUser] Fetch AuthenticatedUser Token Error Action',
  props<{ error: Error }>()
);
