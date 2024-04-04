import { useMutation } from '@tanstack/react-query';
import { UserLogin } from '../Api-call';

export default function useLogin() {
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: UserLogin,
  });

  return { login, isLoading };
}
