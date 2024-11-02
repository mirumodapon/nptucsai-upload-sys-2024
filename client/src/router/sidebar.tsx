import { ElementType } from 'react';
import { MdInfoOutline, MdGroups } from 'react-icons/md';
import { BsPersonFill } from 'react-icons/bs';

export type SidbarItem = {
  label: string;
  path: string;
  Before?: ElementType;
  After?: ElementType;
};

const sidebar: SidbarItem[] = [
  {
    label: '用戶管理',
    path: '/dashboard/users',
    Before: BsPersonFill
  },
  {
    label: '群組管理',
    path: '/dashboard/groups',
    Before: MdGroups
  },
  {
    label: '關於系統',
    path: '/dashboard/sys',
    Before: MdInfoOutline
  }
];

export default sidebar;
