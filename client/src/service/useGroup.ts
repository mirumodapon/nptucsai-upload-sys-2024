import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';

import type { I_User } from './useUser';

export type I_Group = {
  group_id: string;
  name: string;
};

export type I_CreateGroup = {
  name: string;
  users: I_User[];
};

export const useGroup = () => useQuery<I_Group[]>({
  queryKey: ['group'],
  queryFn: () => ky('/api/groups').json(),
  placeholderData: []
});

export const useAddGroup = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ['group'],
    mutationFn: (payload: I_CreateGroup) =>
      ky.post('/api/groups', { json: payload }).json(),
    onSuccess() {
      console.log('OK');
      client.invalidateQueries({ queryKey: ['group'], refetchType: 'all' });
      client.invalidateQueries({ queryKey: ['user'], refetchType: 'all' });
    }
  });
};
