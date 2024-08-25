import { z } from 'zod';
import { S_UserId } from '@/schemas/users';
import { S_ActivityId } from '@/schemas/activity';

export const S_ActivityRecordUpdate = z.object({
  activity: S_ActivityId,
  user: z.array(S_UserId)
});

export const S_ActivityRecordCreate = S_ActivityRecordUpdate;
export const S_ActivityRecordDelete = S_ActivityRecordUpdate;

export type I_ActivityRecordUpdate = z.infer<typeof S_ActivityRecordUpdate>;
export type I_ActivityRecordCreate = z.infer<typeof S_ActivityRecordCreate>;
export type I_ActivityRecordDelete = z.infer<typeof S_ActivityRecordDelete>;
