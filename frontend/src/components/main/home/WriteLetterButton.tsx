import Link from "next/link";

export const WriteLetterButton = () => {
  return (
    <Link
      href="/letters/new"
      aria-label="Write a Letter"
      className="focus-ring motion-press group relative flex w-full items-center gap-4 overflow-hidden rounded-xl bg-primary p-4 text-left shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] transition-all duration-200 hover:bg-[#6a001a] hover:shadow-[0_18px_35px_-20px_#570013cc]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]"
      />
      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <img className="h-[15px] w-[17px]" alt="" aria-hidden="true" src="/icons/write.svg" />
      </span>
      <span className="relative z-10 flex min-w-0 flex-1 flex-col items-start gap-1">
        <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-6 text-white sm:text-2xl">
          Write a Letter
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[11px] leading-[11px] tracking-[0.88px] text-white/80">
          Slow thoughts, deep love.
        </span>
      </span>
      <span
        aria-hidden="true"
        className="relative z-10 text-lg text-white/60 transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
};
