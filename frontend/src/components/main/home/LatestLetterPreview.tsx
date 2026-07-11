'use client';

import { useLatestLetter } from "@/hooks/letter/useLatestLetter";
import { LetterPreview } from "./LetterPreview";
import { EmptyLetterPreview } from "./EmptyLetterPreview";

export const LatestLetterPreview = () => {

  const { letter: latestLetter, loading } = useLatestLetter();
  return (
    <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
      <div className="px-2 py-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <h2
          id="latest-letter-heading"
          className="relative flex items-center self-stretch mt-[-1.00px] font-[family-name:var(--font-inter)] font-normal text-[#8c7071] text-[11px] tracking-[1.10px] leading-[11px]"
        >
          YOUR LATEST LETTER
        </h2>
      </div>
      <article className="min-h-[400px] justify-center p-10 relative self-stretch w-full flex-[0_0_auto] bg-[#f5f4e8] rounded overflow-hidden border border-solid border-[#e0bfbf4c] flex items-center">
        <div className="absolute w-[calc(100%_-_2px)] h-[calc(100%_-_2px)] top-px left-px [background:radial-gradient(50%_50%_at_50%_50%,rgba(140,112,113,1)_4%,rgba(140,112,113,0)_4%)] opacity-10" />
        <div className="absolute w-[calc(100%_-_259px)] top-[45px] left-[129px] h-[336px] bg-[#e4e3d7] rounded-sm border border-solid border-[#e0bfbf33] rotate-[-1.00deg] aspect-[1.33]" />
        <div className="absolute w-[calc(100%_-_259px)] top-[43px] left-[129px] h-[336px] bg-[#e9e9dd] rounded-sm border border-solid border-[#e0bfbf33] rotate-[1.50deg] aspect-[1.33]" />
        {latestLetter ? (
          <LetterPreview letter={latestLetter} />

        ) : (
          <EmptyLetterPreview />
        )}
      </article>
    </div>
  );
}
