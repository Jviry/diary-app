'use client';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { LoginForm } from '@/components/auth/LoginForm';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <AuthHeader />
      <main className="relative flex flex-1 items-center justify-center px-5 py-10 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(224,191,191,0.22),transparent_55%)]"
        />
        <div className="relative flex w-full max-w-[440px] flex-col items-stretch gap-5">
          <LoginForm />
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-[family-name:var(--font-garamond)] text-[17px] text-foreground">
            Haven&apos;t made an account yet?
            <Link
              href="/register"
              className="focus-ring rounded-sm font-medium text-primary underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-primary-deep"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
