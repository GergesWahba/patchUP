import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { PaginatedResponse, ServiceRequest } from '../types';
import { fetchProviderFeed, fetchRequests } from '../services/api';

type Mode = 'mine' | 'providerFeed';

export function useRequests(mode: Mode) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<ServiceRequest>['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      if (mode === 'providerFeed') {
        const response = await fetchProviderFeed();
        setRequests(response.items);
        setMeta(response.meta);
      } else {
        const response = await fetchRequests();
        setRequests(response);
        setMeta(null);
      }
    } catch (requestError: any) {
      setError(requestError?.response?.data?.message ?? 'Unable to load requests right now.');
    } finally {
      setIsLoading(false);
    }
  }, [mode]);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return {
    requests,
    meta,
    isLoading,
    error,
    refresh,
  };
}
