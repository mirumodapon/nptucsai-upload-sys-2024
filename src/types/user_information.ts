import type { UserId } from '@/types/user';

export type I_UserInformation = {
  user_id: UserId;
  id: string;
  birthday: string;
  phone: string;
  address: string;
};
