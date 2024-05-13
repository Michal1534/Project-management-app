export interface AuthenticatedUserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  groupName: string;
  groupId: number
}
