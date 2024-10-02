import { BaseSyntheticEvent } from 'react';
import { create } from 'zustand';

const useUserColumn = create<UseUserColumn>((set, get) => ({

  cols: [
    { name: '姓名', value: 'username', checked: true },
    { name: '類別', value: 'role', checked: true },
    { name: '學制', value: 'type', checked: true },
    { name: '級數', value: 'grade', checked: true },
    { name: '信箱', value: 'email', checked: false },
    { name: '畢業', value: 'graduate', checked: false },
    { name: '權限', value: 'permission', checked: false }
  ],

  getCol: () => get().cols.filter(col => col.checked),

  setCol: (e) => {
    set((state) => {
      const cols = [...state.cols];
      const col = cols.find(c => c.value === e.target.value);

      if (!col) return {};

      col.checked = !col.checked;
      return { cols };
    });
  }

}));

export default useUserColumn;

type UserColumn = {
  name: string;
  value: string;
  checked: boolean;
};

type UseUserColumn = {
  cols: UserColumn[];
  getCol: () => UserColumn[];
  setCol: (e: BaseSyntheticEvent) => void;
};
