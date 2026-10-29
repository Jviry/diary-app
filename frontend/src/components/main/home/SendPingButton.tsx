import Link from "next/link";

export const SendPingButton = () => {
  return (
    <Link
      href="/pings"
      aria-label="Send a Ping"
      className="focus-ring motion-press group flex w-full items-center gap-4 rounded-xl border border-line bg-paper p-4 text-left shadow-[0px_1px_2px_#0000000d] transition-all duration-200 hover:border-primary/40 hover:shadow-[0_18px_35px_-24px_#57001366]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blush transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
        <img className="h-[19.19px] w-[18.77px]" alt="" aria-hidden="true" src="/icons/ping.svg" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-6 text-primary sm:text-2xl">
          Send a Ping
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[11px] leading-[11px] tracking-[0.88px] text-foreground">
          A digital tap on the shoulder.
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-lg text-primary/50 transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
};
