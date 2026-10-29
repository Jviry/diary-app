'use client';

import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <PageLoader label="Opening your diary..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <PageLoader label="Returning you to the beginning..." />
      </div>
    );
  }

  return <>{children}</>;
}
