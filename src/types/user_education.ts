import type { UserId } from '@/types/user';

export enum EducationType {
  CBE = 'CBE',
  BBE = 'BBE',
  PBE = 'PBE'
}

export type I_UserEducation = {
  user_id: UserId;
  graduate: boolean;
  type: EducationType;
  grade: number;
};
