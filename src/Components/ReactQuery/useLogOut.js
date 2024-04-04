import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../Api-call';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return { logout, isLoading };
}
