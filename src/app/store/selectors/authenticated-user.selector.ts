import { AuthenticatedUserState } from '../authenticated-user-state';
import { createSelector } from '@ngrx/store';
import { selectAuthenticatedUserState } from '../authenticate-user-state.selector';

export const selectAuthenticatedUser = createSelector(
  selectAuthenticatedUserState,
  (state: AuthenticatedUserState) => state.authenticatedUser
);
