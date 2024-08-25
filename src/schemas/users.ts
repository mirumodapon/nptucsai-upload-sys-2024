import { z } from 'zod';
import { S_Pagination } from '@/schemas/pages';

export const S_UserId = z.string().min(1).max(10).toUpperCase();
export const S_Username = z.string().min(1);
export const S_Email = z.string().email().toLowerCase();
export const S_Permission = z.coerce.number();
export const S_Role = z.enum(['TEACHER', 'STAFF', 'STUDENT']);
export const S_Id = z.string().regex(/[A-Z][0-9]{9}/);
export const S_Birthday = z.string().date();
export const S_Phone = z.string().regex(/09[0-9]{8}/);
export const S_Address = z.string().max(120);
export const S_Graduate = z.coerce.boolean();
export const S_UserType = z.enum(['CBE', 'BBE', 'PBE']);
export const S_Grade = z.coerce.number();

export const S_User = z.object({
  user_id: S_UserId,
  username: S_Username,
  email: S_Email,
  permission: S_Permission,
  role: S_Role,
  id: S_Id,
  birthday: S_Birthday,
  phone: S_Phone,
  address: S_Address,
  graduate: S_Graduate,
  type: S_UserType,
  grade: S_Grade
});

export const S_UserListFilter = S_User
  .pick({ type: true, role: true, grade: true, graduate: true, permission: true })
  .partial();

export const S_UserListFilterWithPagination = S_UserListFilter.merge(S_Pagination);

export const S_UserCreate = S_User
  .partial()
  .required({ type: true, grade: true })
  .merge(z.object({
    role: S_Role.default('STUDENT'),
    graduate: S_Graduate.default(false)
  }))
  .transform((val) => {
    const { id, birthday, phone, address, grade, graduate, type, ...user } = val;

    return {
      ...user,
      user_information: { id, birthday, phone, address },
      user_education: { grade, graduate, type }
    };
  });

export const S_UserDelete = z.array(S_UserId);

export const S_UserUpdate = S_User
  .partial()
  .merge(z.object({ user_id: z.array(S_UserId) }))
  .transform((val) => {
    const { id, birthday, phone, address, grade, graduate, type, ...user } = val;

    return {
      ...user,
      user_information: { id, birthday, phone, address },
      user_education: { grade, graduate, type }
    };
  });

export type I_UserListFilter = z.infer<typeof S_UserListFilter>;
export type I_UserListFilterWithPagination = z.infer<typeof S_UserListFilterWithPagination>;
export type I_UserCreate = z.infer<typeof S_UserCreate>;
export type I_UserDelete = z.infer<typeof S_UserDelete>;
export type I_UserUpdate = z.infer<typeof S_UserUpdate>;
