import { createReducer, on } from "@ngrx/store";
import { AuthenticatedUserState } from "./authenticated-user-state";
import { fetchAuthenticatedUserSuccessAction } from "./queries/fetch-authenticated-user/fetch-authenticated-user.action";
import { AuthenticatedUserResponse } from "./queries/fetch-authenticated-user/fetch-authenticated-user.response";

export const authenticatedUserInitialState: AuthenticatedUserState = {
  authenticatedUser: {
    email: '',
    firstName: '',
    groupId: 0,
    groupName: '',
    id: 0,
    lastName: '',
    role: ''
  }
};

export const authenticatedUserReducer = createReducer(
  authenticatedUserInitialState,
  on(fetchAuthenticatedUserSuccessAction, (authenticatedUserState: AuthenticatedUserState, { authenticatedUser }: { authenticatedUser: AuthenticatedUserResponse }) => ({
    ...authenticatedUserState,
    authenticatedUser: authenticatedUser
  }))
);
