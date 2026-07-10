'use client';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { LoginForm } from '@/components/auth/LoginForm';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';


export default function LoginPage() {

  return (
    <div className="flex min-h-screen flex-col items-start relative bg-[linear-gradient(0deg,rgba(251,250,238,1)_0%,rgba(251,250,238,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center pt-8 pb-16 px-5 relative self-stretch w-full z-[1]">
        <div className="flex flex-col max-w-[440px] w-[440px] items-start gap-4 relative">
          <LoginForm />
          <div className="flex items-center justify-center gap-2 w-full relative self-stretch flex-[0_0_auto]">
            <p className="relative flex items-center justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-garamond)] font-normal text-[#584141] text-[17px] text-center tracking-[0] leading-[25.5px] whitespace-nowrap">
              Haven&apos;t made an account yet?
            </p>
            <div className="relative w-[39.97px] h-[25.5px]">
              <Link
                href="/register"
                className="absolute top-0 left-[calc(50.00%_-_23px)] h-[26px] flex items-center justify-center font-[family-name:var(--font-garamond)] font-medium text-[#584141] text-[17px] text-center tracking-[0] leading-[25.5px] underline whitespace-nowrap"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="flex items-start justify-center relative self-stretch w-full flex-[0_0_auto] opacity-30">
            <div className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto]">
              <img
                className="relative w-[23.05px] h-[26.67px]"
                alt=""
                aria-hidden="true"
                src="/icons/icon.svg"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
