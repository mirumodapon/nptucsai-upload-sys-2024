import { z } from 'zod';
import { S_Pagination } from './pages';

export const S_ActivityId = z.string().uuid();
export const S_ActivityName = z.string().min(1).max(50);
export const S_ActivityHost = z.string().max(20);
export const S_ActivityLocation = z.string().max(20);
export const S_ActivityDatetime = z.string().datetime();

export const S_Activity = z.object({
  name: S_ActivityName,
  host: S_ActivityHost,
  location: S_ActivityLocation,
  datetime: S_ActivityDatetime
});

export const S_ActivityWithId = S_Activity.merge(z.object({
  activity_id: S_ActivityId
}));

export const S_ActivityCreate = S_Activity.partial().required({ name: true });

export const S_ActivityList = z.object({
  start: S_ActivityDatetime.optional(),
  end: S_ActivityDatetime.optional()
});

export const S_ActivityListWithPagination = S_Pagination
  .merge(S_ActivityList);

export const S_ActivityDelete = z.array(S_ActivityId);

export const S_ActivityUpdate = S_Activity.partial().merge(
  z.object({ activity_id: z.array(S_ActivityId) })
);

export type I_ActivityListWithPagination = z.infer<typeof S_ActivityListWithPagination>;
export type I_ActivityList = z.infer<typeof S_ActivityList>;
export type I_ActivityCreate = z.infer<typeof S_ActivityCreate>;
export type I_ActivityDelete = z.infer<typeof S_ActivityDelete>;
export type I_ActivityUpdate = z.infer<typeof S_ActivityUpdate>;
