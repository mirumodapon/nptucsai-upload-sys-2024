export type I_UserRole = 'STUDENT' | 'STAFF' | 'TEACHER';
export type I_UserType = 'CBE' | 'BBE' | 'PBE';

export type I_User = {
  user_id: string;
  username: string;
  email: string;
  permission: number;
  graduate: boolean;
  role: I_UserRole;
  type: I_UserType;
  grade: number;
};
