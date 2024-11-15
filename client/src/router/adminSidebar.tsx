import { ElementType } from 'react';
import { MdInfoOutline, MdGroups } from 'react-icons/md';
import { BsPersonFill } from 'react-icons/bs';
import { IoCalendarOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { TbInfoSquareRounded } from 'react-icons/tb';

export type SidbarItem = {
  label: string;
  path: string;
  Before?: ElementType;
  After?: ElementType;
};

const sidebar: SidbarItem[] = [
  {
    label: '用戶管理',
    path: '/admin/users',
    Before: BsPersonFill
  },
  {
    label: '群組管理',
    path: '/admin/groups',
    Before: MdGroups
  },
  {
    label: '時間設定',
    path: '/admin/expsetting',
    Before: IoCalendarOutline
  },
  {
    label: '首頁編輯',
    path: '/admin/indexsetting',
    Before: TbEdit
  },
  {
    label: '編輯提示',
    path: '/admin/hintsetting',
    Before: TbInfoSquareRounded
  },
  {
    label: '關於系統',
    path: '/admin/sys',
    Before: MdInfoOutline
  }
];

export default sidebar;
