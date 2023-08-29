import useSWR from 'swr';
import { LoadState } from '../types';
import { fetcher } from '../utils/fetcher';
import { EMP_API_URL } from '../constants';
import { Market } from '../types/market';

export const useGetMarkets = (): LoadState<Market[]> => {
  const { data, error, isLoading } = useSWR<Market[], Error>(`${EMP_API_URL}/markets`, fetcher);

  return {
    data: data,
    isLoading,
    error,
  };
};
