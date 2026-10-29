'use client';

import { useAuth } from "@/context/auth.context";

export const GreetingHeader = () => {
  const { user } = useAuth();

  return (
    <section className="flex w-full animate-fade-up flex-col items-start gap-2">
      <h1 className="break-words font-[family-name:var(--font-playfair)] text-4xl font-normal italic leading-tight tracking-[-0.96px] text-primary sm:text-5xl">
        Hello, {user?.name}
      </h1>
      <p className="font-[family-name:var(--font-garamond)] text-[17px] italic text-foreground/70 sm:text-lg">
        A quiet place for the words that matter.
      </p>
    </section>
  );
};
