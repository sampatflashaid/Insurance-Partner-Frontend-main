import { useMutation } from '@tanstack/react-query';
import { getPlanDetails } from '../Api-call';


export default function useGetPlanDetails() {
  const {
    mutate: getPlans,
    isPending,
    data,
  } = useMutation({
    mutationFn: getPlanDetails,
  });
  return { getPlans, isPending, data };
}
