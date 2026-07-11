
export const WriteLetterButton = () => {
  return (
    <div className="flex items-center justify-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
      <button
        type="button"
        aria-label="Write a Letter"
        className="gap-4 pl-4 pr-[102.03px] py-[17px] bg-[#570013] rounded-lg inline-flex items-center relative flex-[0_0_auto] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013]"
      >
        <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-lg shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]" />
        <div className="w-12 h-12 justify-center relative bg-[#fed65b] rounded-xl flex items-center">
          <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
            <img
              className="relative w-[17px] h-[15px]"
              alt=""
              aria-hidden="true"
              src="/icons/write.svg"
            />
          </div>
        </div>
        <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto] z-[1]">
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex items-center w-fit mt-[-1.00px] font-[family-name:var(--font-playfair)] font-semibold text-white text-2xl tracking-[0] leading-6 whitespace-nowrap">
              Write a Letter
            </div>
          </div>
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] opacity-80">
            <div className="relative flex items-center w-fit mt-[-1.00px] font-[family-name:var(--font-inter)] font-normal text-white text-[11px] tracking-[0.88px] leading-[11px] whitespace-nowrap">
              Slow thoughts, deep love.
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
