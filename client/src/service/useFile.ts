import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

type Props = {
  type: string;
};

type I_File = {
  file_id: string;
  group_id: number;
  filename: string;
  UserModel: {
    username: string;
  };
  createdAt: string;
};

export default function useFile({ type }: Props) {
  return useQuery<I_File[]>({
    queryKey: ['file', type],
    queryFn: () => ky(`/api/files/${type}`).json(),
    placeholderData: []
  });
}
