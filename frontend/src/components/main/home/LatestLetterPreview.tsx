'use client';

import { useLatestLetter } from "@/hooks/letter/useLatestLetter";
import { LetterPreview } from "./LetterPreview";
import { EmptyLetterPreview } from "./EmptyLetterPreview";

export const LatestLetterPreview = () => {
  const { letter: latestLetter, loading } = useLatestLetter();

  return (
    <div className="flex w-full animate-fade-up flex-col items-start gap-4">
      <div className="px-1">
        <h2
          id="latest-letter-heading"
          className="font-[family-name:var(--font-inter)] text-[11px] font-normal tracking-[1.10px] text-muted"
        >
          YOUR LATEST LETTER
        </h2>
      </div>
      <article className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-xl border border-line/40 bg-panel p-4 sm:min-h-[400px] sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#8c7071_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-sm border border-line/40 bg-[#e4e3d7] shadow-sm"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[1.5deg] rounded-sm border border-line/30 bg-[#e9e9dd] shadow-sm"
        />
        <div className="relative z-10 flex w-full justify-center">
          {loading ? (
            <div className="aspect-[4/3] w-full max-w-md animate-pulse rounded-sm bg-[#e4e3d7]" />
          ) : latestLetter ? (
            <LetterPreview letter={latestLetter} />
          ) : (
            <EmptyLetterPreview />
          )}
        </div>
      </article>
    </div>
  );
};
