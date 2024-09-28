import { useQuery } from '@tanstack/react-query';
import type { I_User } from '@/types/user';

type I_FetchUserResponse = {
  total: number;
  page: number;
  limit: number;
  users: I_User[];
};

function useUser() {
  const query = useQuery<I_FetchUserResponse>({
    queryKey: ['user'],
    queryFn: () => fetch('/api/users').then(resp => resp.json()),
    placeholderData: {
      total: 0,
      page: 0,
      limit: 0,
      users: []
    }
  });

  return { ...query };
}

export default useUser;
