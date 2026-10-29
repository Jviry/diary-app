'use client';

import { useLatestPing } from "@/hooks/ping/useLatestPing";
import { PingPreview } from "./PingPreview";
import { EmptyPingPreview } from "./EmptyPingPreview";

export const LatestPingPreview = () => {
  const { ping: latestPing, loading } = useLatestPing();

  return (
    <div className="flex w-full animate-fade-up flex-col items-start gap-4 [animation-delay:80ms]">
      <div className="px-1">
        <h2
          id="thinking-of-you-heading"
          className="font-[family-name:var(--font-inter)] text-[11px] font-normal tracking-[1.10px] text-muted"
        >
          THINKING OF YOU
        </h2>
      </div>
      <article className="flex w-full flex-col items-start rounded-xl border-l-4 border-primary bg-panel-deep p-4 shadow-[0px_1px_2px_#0000000d] sm:p-5">
        {loading ? (
          <div className="flex w-full animate-pulse flex-col gap-3">
            <div className="h-4 w-1/3 rounded bg-[#d8d7cc]" />
            <div className="h-3 w-full rounded bg-[#d8d7cc]" />
            <div className="h-3 w-4/5 rounded bg-[#d8d7cc]" />
            <div className="h-3 w-2/3 rounded bg-[#d8d7cc]" />
          </div>
        ) : latestPing ? (
          <PingPreview ping={latestPing} />
        ) : (
          <EmptyPingPreview />
        )}
      </article>
    </div>
  );
};
