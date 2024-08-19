export type UserId = string;

export enum UserRole {
  STAFF = 'STAFF',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export enum EducationType {
  CBE = 'CBE',
  BBE = 'BBE',
  PBE = 'PBE'
}

export type I_User = {
  user_id: UserId;
  username: string;
  email: string;
  permission: number;
  role: UserRole;
};

export type I_UserEducation = {
  user_id: UserId;
  graduate: boolean;
  type: EducationType;
  grade: number;
};

export type I_UserInformation = {
  user_id: UserId;
  id: string;
  birthday: string;
  phone: string;
  address: string;
};
