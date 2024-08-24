import { z } from 'zod';

export const S_Page = z.coerce.number();
export const S_Limit = z.coerce.number();

export const S_Pagination = z.object({
  page: S_Page.default(1),
  limit: S_Limit.default(50)
});

export type I_Pagination = z.infer<typeof S_Pagination>;
