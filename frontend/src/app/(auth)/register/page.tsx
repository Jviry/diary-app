'use client';

import { AuthHeader } from "@/components/auth/AuthHeader";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function RegisterPage() {

  return (
    <div className="flex min-h-screen flex-col items-start relative bg-[linear-gradient(0deg,rgba(251,250,238,1)_0%,rgba(251,250,238,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]">
      <AuthHeader />
      <main className="flex items-center justify-center pt-8 pb-16  px-5 relative self-stretch w-full flex-[1_0_auto] z-[1]">
        <div className="flex flex-col max-w-md w-[448px] items-start gap-[39px] relative">
          <section
            aria-labelledby="register-heading"
            className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]"
          >
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <h1
                id="register-heading"
                className="relative flex items-center justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-playfair)] font-bold text-[#570013] text-5xl text-center tracking-[-0.96px] leading-[52.8px] whitespace-nowrap"
              >
                Start your story
              </h1>
            </div>
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative flex items-center justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-garamond)] font-normal italic text-[#584141] text-xl text-center tracking-[0] leading-8 whitespace-nowrap">
                Create your private space for slow, intentional love.
              </p>
            </div>
          </section>
          <RegisterForm />
          <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
            <div className="items-end gap-2 inline-flex relative flex-[0_0_auto]">
              <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-garamond)] font-normal text-[#584141] text-[17px] text-center tracking-[0] leading-[25.5px] whitespace-nowrap">
                Already have a diary?
              </div>
              <Link href="/login" className="relative w-[39.97px] h-[25.5px]">
                <span className="absolute -top-px left-[calc(50.00%_-_20px)] h-[26px] flex items-center justify-center font-[family-name:var(--font-garamond)] font-medium text-[#584141] text-[17px] text-center tracking-[0] leading-[25.5px] underline whitespace-nowrap">
                  Login
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
