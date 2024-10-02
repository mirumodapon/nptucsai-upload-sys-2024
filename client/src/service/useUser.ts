import ky from 'ky';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useUserFilter from '@/store/useUserFilter';
import type { I_User } from '@/types/user';

type I_FetchUserResponse = {
  total: number;
  page: number;
  limit: number;
  users: I_User[];
};

function useUser() {
  const [page, setPage] = useState(1);
  const filter = useUserFilter(state => state.filter);

  const query = useQuery<I_FetchUserResponse>({
    queryKey: ['user', filter, page],
    queryFn: () => ky(
      '/api/users',
      { searchParams: Object.assign({ page }, filter) }
    ).json(),
    placeholderData: previousData => previousData ?? {
      total: 0,
      page: 0,
      limit: 0,
      users: []
    }
  });

  return { ...query, page, setPage };
}

export default useUser;
