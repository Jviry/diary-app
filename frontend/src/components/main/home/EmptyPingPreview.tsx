export const EmptyPingPreview = () => {
  return (
    <div className="flex w-full flex-col items-center gap-2 py-6 text-center">
      <img
        src="/icons/empty-ping.svg"
        alt=""
        aria-hidden="true"
        className="mb-1 h-10 w-10 opacity-70"
      />
      <p className="font-[family-name:var(--font-garamond)] text-base leading-relaxed text-foreground/60">
        No pings yet today.
      </p>
    </div>
  );
};
