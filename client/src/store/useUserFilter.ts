import { BaseSyntheticEvent } from 'react';
import { create } from 'zustand';

const useUserFilter = create<UseUserFilter>(set => ({
  filter: {},

  setFilter: ({ target }) => {
    const col = target.dataset.col;
    const value = target.value;

    set((state) => {
      const filter = Object.assign({}, state.filter);

      if (value === '*') delete filter[col];
      else filter[col] = value;

      return { filter };
    });
  },

  setSearch: ({ target }) => {
    const value = target.value;

    set((state) => {
      const filter = Object.assign({}, state.filter);

      if (value === '') delete filter.search;
      else filter.search = value;

      return { filter };
    });
  }
}));

export default useUserFilter;

type UseUserFilter = {
  filter: Record<string, string>;
  setFilter: (e: BaseSyntheticEvent) => void;
  setSearch: (e: BaseSyntheticEvent) => void;
};
