import { AuthenticatedUserResponse } from "./queries/fetch-authenticated-user/fetch-authenticated-user.response";

export interface AuthenticatedUserState {
  authenticatedUser: AuthenticatedUserResponse
}
