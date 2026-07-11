
export const SendPingButton = () => {
  return (
    <button
      type="button"
      aria-label="Send a Ping"
      className="gap-4 pl-4 pr-[81.1px] py-4 bg-white rounded-lg border border-solid border-[#e0bfbf] shadow-[0px_1px_2px_#0000000d] inline-flex items-center relative flex-[0_0_auto] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013]"
    >
      <div className="w-12 h-12 justify-center relative bg-[#fbdbdb] rounded-xl flex items-center">
        <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
          <img
            className="relative w-[18.77px] h-[19.19px]"
            alt=""
            aria-hidden="true"
            src="/icons/ping.svg"
          />
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative flex items-center w-fit mt-[-1.00px] font-[family-name:var(--font-playfair)] font-semibold text-[#570013] text-2xl tracking-[0] leading-6 whitespace-nowrap">
            Send a Ping
          </div>
        </div>
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative flex items-center w-fit mt-[-1.00px] font-[family-name:var(--font-inter)] font-normal text-[#584141] text-[11px] tracking-[0.88px] leading-[11px] whitespace-nowrap">
            A digital tap on the shoulder.
          </p>
        </div>
      </div>
    </button>
  );
}
