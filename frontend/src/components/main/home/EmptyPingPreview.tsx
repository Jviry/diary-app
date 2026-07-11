
export const EmptyPingPreview = () => {
  return (
    <div className="self-stretch h-32 pt-6 pb-7 inline-flex flex-col justify-start items-center gap-1.5">
      <div className="self-stretch pb-[5px] flex flex-col justify-start items-center">
        <img
          src="/icons/empty-ping.svg
          "/>
      </div>
      <div className="self-stretch flex flex-col justify-start items-center">
        <div className="text-center justify-center text-stone-700/60 text-base font-normal font-[family-name:var(--font-garamond)] leading-6">No pings yet today.</div>
      </div>
    </div>
  );
}
