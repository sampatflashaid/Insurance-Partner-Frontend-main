import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserPatch as updateUserApi } from '../Api-call';
import toast from 'react-hot-toast';
import { encryptData } from '../Utils/Encrypt';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUserPatch, isPending: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      encryptData('user', user);
      toast.success('User update success');
      queryClient.invalidateQueries({ queryKey: ['User'] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });
  return { updateUserPatch, isUpdating };
}
