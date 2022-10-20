//class decalartion of user
export class User {
  id!: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  accessToken?: string;
  permissions?: [string];
}
