import { createAction, props } from '@ngrx/store';
import { FetchUserRequest } from './fetch-user.request';

export const fetchAuthenticatedUserTokenAction = createAction(
    '[AuthenticatedUser] Fetch AuthenticatedUser Token Action',
    props<{ user: FetchUserRequest }>()
);

export const fetchAuthenticatedUserTokenSuccessAction = createAction(
    '[AuthenticatedUser] Fetch AuthenticatedUser Token Success Action',
    props<{ token: string }>()
);

export const fetchAuthenticatedUserTokenErrorAction = createAction(
    '[AuthenticatedUser] Fetch AuthenticatedUser Token Error Action',
    props<{ error: Error }>()
);
