import { RiSlideshow2Line, RiFilePaper2Line, RiBookLine } from 'react-icons/ri';
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
    label: '專題海報上傳',
    path: '/dashboard/poster',
    Before: RiFilePaper2Line
  },
  {
    label: '專題報告書上傳',
    path: '/dashboard/book',
    Before: RiBookLine
  },
  {
    label: '展示簡報或影片上傳',
    path: '/dashboard/demo',
    Before: RiSlideshow2Line
  },
  {
    label: '關於系統',
    path: '/dashboard/sys',
    Before: MdInfoOutline
  }
];

export default sidebar;
