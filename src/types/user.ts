export type UserId = string;

export enum UserRole {
  STAFF = 'STAFF',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export type I_User = {
  user_id: UserId;
  username: string;
  email: string;
  permission: number;
  role: UserRole;
};
