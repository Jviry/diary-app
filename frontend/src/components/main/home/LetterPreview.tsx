import Link from "next/link";
import type { Letter } from "@/types/letter.types";

type LetterPreviewProps = {
  letter: Letter;
};

export const LetterPreview = ({ letter }: LetterPreviewProps) => {
  return (
    <div className="relative flex aspect-[4/3] w-full max-w-md flex-col items-center justify-end overflow-hidden rounded-sm border border-line/30 bg-paper px-5 pb-3 shadow-sm sm:px-10 sm:pb-7">
      <div className="absolute inset-px z-[1] overflow-hidden rounded-sm">
        <img
          className="h-full w-full object-cover"
          alt=""
          aria-hidden="true"
          src="/images/desk-surface.png"
        />
      </div>

      <img
        className="absolute left-0 top-0 z-[3] h-1/2 w-full object-cover"
        alt=""
        aria-hidden="true"
        src="/images/envelope-flap.png"
      />

      <Link
        href={`/letters/${letter.id}`}
        aria-label={`Open latest letter: ${letter.title}`}
        className="focus-ring group absolute left-1/2 top-1/2 z-[4] -translate-x-1/2 -translate-y-1/2 rounded-xl transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-primary bg-primary-deep shadow-[0px_4px_12px_#5700134c,inset_0px_2px_4px_2px_#00000033] transition-shadow duration-200 group-hover:shadow-[0px_8px_20px_#57001366,inset_0px_2px_4px_2px_#00000033] sm:h-16 sm:w-16">
          <img
            className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6 sm:h-[24.31px] sm:w-[22.5px]"
            alt=""
            aria-hidden="true"
            src="/icons/seal.svg"
          />
        </div>
      </Link>

      <div className="relative z-[2] flex w-full flex-col items-center gap-1.5 text-center sm:gap-2">
        <p className="line-clamp-1 font-[family-name:var(--font-garamond)] text-base font-normal italic leading-snug text-primary sm:line-clamp-2 sm:text-xl">
          From {letter.fromUser.name}
        </p>
        <p className="line-clamp-1 font-[family-name:var(--font-inter)] text-[11px] font-normal leading-relaxed tracking-[0.88px] text-foreground sm:line-clamp-2">
          {letter.title}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-sm bg-[#ffffff01] shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]"
      />
    </div>
  );
};
