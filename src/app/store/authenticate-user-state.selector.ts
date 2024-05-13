import { createSelector } from "@ngrx/store";
import { AuthenticatedUserState } from "./authenticated-user-state";

export const selectAuthenticatedUserState = createSelector(
  (state: any) => state.authenticatedUser,
  (state: AuthenticatedUserState) => state
);
