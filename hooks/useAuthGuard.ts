'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/Context/AuthContext';

export function useAuthGuard(redirectTo = '/auth') {
  const { user, ready } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace(redirectTo);
  }, [ready, user, router, redirectTo]);

  const isLoading = !ready || (!user && typeof window !== 'undefined');
  return { user, ready, isLoading };
}
