import type { I_User, I_UserRole, I_UserType } from '@/types/user';

export const userRoleMap = {
  STAFF: '工作人員',
  TEACHER: '教授 / 老師',
  STUDENT: '學生'
};

export const userTypeMap = {
  CBE: '日間學士班',
  BBE: '日間碩士班',
  PBE: '在職碩士班'
};

export const mappingUserRole = (role: I_UserRole) => userRoleMap[role];
export const mappingUserType = (type: I_UserType) => userTypeMap[type];

export const getUserColumn = (user: I_User, col: string) => {
  switch (col) {
    case 'role': return mappingUserRole(user[col]);
    case 'type': return mappingUserType(user[col]);
    case 'graduate': return user[col] ? '是' : '否';
    default: return user[col as keyof I_User];
  }
};
