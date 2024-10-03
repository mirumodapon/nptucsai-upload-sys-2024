import { BaseSyntheticEvent } from 'react';
import { create } from 'zustand';

const useUserSelect = create<UseUserSelect>(set => ({
  users: [],

  toggleUser: ({ target }) => set((state) => {
    const id = target.dataset.id;
    const users = [...state.users];
    const index = users.indexOf(id);

    if (index === -1) return { users: [...users, id] };

    users.splice(index, 1);
    return { users };
  }),

  setUser: id => set(() => ({ users: id })),

  clear: () => set(() => ({ users: [] }))
}));

export default useUserSelect;

type UseUserSelect = {
  users: string[];
  toggleUser: (e: BaseSyntheticEvent) => void;
  setUser: (id: string[]) => void;
  clear: () => void;
};
