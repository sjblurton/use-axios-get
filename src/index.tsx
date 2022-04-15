import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useSWR, { KeyedMutator } from 'swr';

const getFetcher = (url: string) => axios.get(url).then(res => res.data);

type Status = 'idle' | 'pending' | 'fulfilled' | 'error';

function useAxiosGet<Data>(
  url: string
): {
  status: Status;
  data: Data[] | undefined;
  error: AxiosError | undefined;
  mutate: KeyedMutator<Data[]>;
} {
  const [status, setStatus] = useState<Status>('idle');
  const { data, isValidating, mutate, error } = useSWR<Data[]>(url, getFetcher);

  useEffect(() => {
    if ((!data && !error) || isValidating) return setStatus('pending');
    if (error) return setStatus('error');
    if (data && !isValidating) return setStatus('fulfilled');
  }, [data, status, isValidating, error]);

  return { status, data, error, mutate };
}

export default useAxiosGet;
