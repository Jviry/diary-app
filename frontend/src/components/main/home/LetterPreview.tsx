import type { Letter } from "@/types/letter.types";

type LetterPreviewProps = {
  letter: Letter;
};

export const LetterPreview = ({ letter }: LetterPreviewProps) => {
  return (
    <div className="flex flex-col max-w-md w-[448px] items-center justify-center px-10 py-[81.5px] relative bg-white rounded-sm border border-solid border-[#e0bfbf33] aspect-[1.33]">
      <div className="flex-col h-24 items-start pt-8 pb-0 px-0 z-[4] flex w-16 relative">
        <div className="h-16 items-center justify-center bg-[#800020] rounded-xl border-2 border-solid border-[#570013] shadow-[0px_4px_12px_#5700134c,inset_0px_2px_4px_2px_#00000033] flex w-16 relative">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <img
              className="relative w-[22.5px] h-[24.31px]"
              alt=""
              aria-hidden="true"
              src="/icons/seal.svg"
            />
          </div>
        </div>
      </div>
      <img
        className="absolute w-[calc(100%_-_1px)] h-[50%] top-0 left-px z-[3] object-cover"
        alt=""
        aria-hidden="true"
        src="/images/envelope-flap.png"
      />
      <div className="pt-6 pb-0 px-0 mt-[-5.68e-14px] z-[2] inline-flex flex-col items-start relative flex-[0_0_auto]">
        <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
          <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-garamond)] font-normal italic text-[#570013] text-xl text-center tracking-[0] leading-8 whitespace-nowrap">
              From {letter.fromUser.name}
            </div>
          </div>
          <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-inter)] font-normal text-[#584141] text-[11px] text-center tracking-[0.88px] leading-[11px] whitespace-nowrap">
              {letter.title}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[calc(100%_-_2px)] h-[calc(100%_-_2px)] items-start justify-center absolute top-px left-px z-[1] rounded-sm overflow-hidden">
        <img
          className="relative flex-1 self-stretch w-full grow"
          alt="Letter artwork"
          src="/images/desk-surface.png"
        />
      </div>
      <div className="absolute w-full h-full top-0 left-0 z-0 bg-[#ffffff01] rounded-sm shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]" />
    </div>
  );
}
