import { useMutation } from '@tanstack/react-query';
import { UserSignUp } from '../Api-call';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: UserSignUp,
    onError: (error) => {
      toast.error(error);
    },
  });

  return { signup, isLoading };
}
