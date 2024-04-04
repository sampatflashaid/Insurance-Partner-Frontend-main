import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { encryptData } from '../Utils/Encrypt';
import { updateUserPut as updateUserPutApi } from '../Api-call';

export function useUpdateUserPut() {
  const queryClient = useQueryClient();

  const { mutate: updateUserPut, isPending: isUpdating } = useMutation({
    mutationFn: updateUserPutApi,
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
  return { updateUserPut, isUpdating };
}
