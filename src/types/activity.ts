import { UserId } from '@/types/user';

export type ActivityId = number;

export type I_Activity = {
  activity_id: ActivityId;
  name: string;
  host: string;
  location: string;
  datetime: Date;
};

export type I_ActivityRecord = {
  activity_id: ActivityId;
  user_id: UserId;
  sign_in: Date;
  sign_out: Date;
  enable: boolean;
};
