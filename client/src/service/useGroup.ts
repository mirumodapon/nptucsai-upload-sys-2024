import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

export type I_Group = {
  group_id: string;
  name: string;
};

const useGroup = () => useQuery<I_Group[]>({
  queryKey: ['group'],
  queryFn: () => ky('/api/groups').json(),
  placeholderData: []
});

export default useGroup;
