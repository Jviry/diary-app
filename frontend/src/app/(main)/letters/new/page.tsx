'use client';

import { Layout } from '@/components/layout/Layout';
import { ComposeLetterForm } from '@/components/main/letters/ComposeLetterForm';
import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';

export default function ComposeLetterPage() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/login');
    }
  }, [isHydrated, user, router]);

  if (!isHydrated || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <PageLoader label="Preparing your paper..." />
      </div>
    );
  }

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-[768px] flex-1 flex-col items-center gap-8 px-6 py-10 sm:gap-10 sm:px-10 lg:px-16">
        <div className="flex w-full flex-col items-start gap-2 self-stretch border-b border-line/30 pb-5">
          <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[1.1px] text-foreground">
            New Correspondence
          </span>
          <h1 className="animate-fade-up font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight tracking-[-0.96px] text-primary sm:text-[48px]">
            Compose Letter
          </h1>
        </div>

        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex w-full justify-center rounded-xl bg-paper shadow-[0_4px_20px_-2px_rgba(107,94,81,0.15)]">
            <div className="w-full">
              <div className="h-1 rounded-t-xl bg-primary/10" />
              <div className="flex justify-center p-5 sm:p-10 lg:p-14">
                <ComposeLetterForm user={user} />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-2 opacity-60">
            <div className="h-px w-24 bg-[linear-gradient(90deg,rgba(140,112,113,0)_0%,#8c7071_50%,rgba(140,112,113,0)_100%)]" />
            <p className="text-center font-[family-name:var(--font-garamond)] text-[11px] font-semibold italic tracking-[0.88px] text-foreground">
              The slowest post is the most meaningful.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
