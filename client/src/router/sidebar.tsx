import { ElementType } from 'react';
import { MdInfoOutline } from 'react-icons/md';

export type SidbarItem = {
  label: string;
  path: string;
  Before?: ElementType;
  After?: ElementType;
};

const sidebar: SidbarItem[] = [
  {
    label: '關於系統',
    path: '/dashboard/sys',
    Before: MdInfoOutline
  }
];

export default sidebar;
