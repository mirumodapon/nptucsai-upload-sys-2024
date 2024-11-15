import { z } from 'zod';

export const SetParamBody = z.object({
  key: z.string().min(1),
  value: z.string()
});

export const GetParamPayload = z.object({
  key: z.string().min(1).regex(/[A-Z,]*/)
});
