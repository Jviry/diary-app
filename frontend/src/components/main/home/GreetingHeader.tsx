'use client';

import { useAuth } from "@/context/auth.context";

export const GreetingHeader = () => {
  const { user } = useAuth();

  return (
    <section className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <h1 className="relative flex items-center self-stretch mt-[-1.00px] font-[family-name:var(--font-playfair)] font-normal italic text-[#570013] text-5xl tracking-[-0.96px] leading-[52.8px]">
          Hello, {user?.name}
        </h1>
      </div>
      <div className="relative self-stretch w-full h-8 opacity-80" />
    </section>
  );

}
