'use client';

import { AuthHeader } from "@/components/auth/AuthHeader";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <AuthHeader />
      <main className="relative flex flex-1 items-center justify-center px-5 py-10 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(224,191,191,0.22),transparent_55%)]"
        />
        <div className="relative flex w-full max-w-[440px] flex-col items-stretch gap-6">
          <section aria-labelledby="register-heading" className="flex flex-col items-center gap-2 text-center">
            <h1
              id="register-heading"
              className="animate-fade-up font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight tracking-[-0.96px] text-primary sm:text-5xl"
            >
              Start your story
            </h1>
            <p className="max-w-sm font-[family-name:var(--font-garamond)] text-lg italic leading-relaxed text-foreground sm:text-xl">
              Create your private space for slow, intentional love.
            </p>
          </section>
          <RegisterForm />
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-[family-name:var(--font-garamond)] text-[17px] text-foreground">
            Already have a diary?
            <Link
              href="/login"
              className="focus-ring rounded-sm font-medium text-primary underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-primary-deep"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
