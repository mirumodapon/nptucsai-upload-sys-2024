import { z } from 'zod';

export const UserSchema = z.object({
  user_id: z.string().min(1).max(10),
  username: z.string().min(1).max(10)
});

export const CreateGroupSchema = z.object({
  name: z.string().min(1),
  users: z.array(UserSchema)
});

export type CreateGroupType = z.infer<typeof CreateGroupSchema>;
export type UserType = z.infer<typeof UserSchema>;
