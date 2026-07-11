'use client';

import { useLatestPing } from "@/hooks/ping/useLatestPing";
import { PingPreview } from "./PingPreview";
import { EmptyPingPreview } from "./EmptyPingPreview";

export const LatestPingPreview = () => {
  const { ping: latestPing, loading } = useLatestPing();

  return (
    <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
      <div className="px-2 py-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <h2
          id="thinking-of-you-heading"
          className="relative flex items-center self-stretch mt-[-1.00px] font-[family-name:var(--font-inter)] font-normal text-[#8c7071] text-[11px] tracking-[1.10px] leading-[11px]"
        >
          THINKING OF YOU
        </h2>
      </div>
      <article className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto] bg-[#efeee3] rounded-lg border-l-4 [border-left-style:solid] border-[#570013] shadow-[0px_1px_2px_#0000000d]">
        {latestPing ? (
          <PingPreview ping={latestPing} />
        ) : (
          <EmptyPingPreview />
        )}
      </article>
    </div>
  );
}
