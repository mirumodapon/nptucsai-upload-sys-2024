import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

export type I_User = {
  user_id: string;
  username: string;
};

const useUser = () => useQuery<I_User[]>({
  queryKey: ['user'],
  queryFn: () => ky('/api/users').json(),
  placeholderData: []
});

export default useUser;
