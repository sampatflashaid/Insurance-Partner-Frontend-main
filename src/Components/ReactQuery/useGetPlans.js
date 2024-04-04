import { useQuery } from '@tanstack/react-query';
import { getPlans } from '../Api-call';

export default function useGetPlans(id) {
  const { data, isLoading } = useQuery({
    queryKey: ['Plans'],
    queryFn: () => getPlans(id),
  });
  return { data, isLoading };
}
