import Link from "next/link";

export const EmptyLettersState = () => {
  return (
    <div className="flex min-h-96 w-full animate-fade-up flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <img
        src="/icons/no-letter.svg"
        alt=""
        aria-hidden="true"
        className="mb-4 h-20 w-20 opacity-40"
      />
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold leading-8 text-ink">
        No letters found yet.
      </h2>
      <p className="mb-6 max-w-xs font-[family-name:var(--font-garamond)] text-lg leading-8 text-foreground/80 sm:text-xl">
        Every story starts with a single word.
      </p>
      <Link
        href="/letters/new"
        className="focus-ring motion-press inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-[family-name:var(--font-inter)] text-xs font-medium tracking-wide text-white transition-colors duration-200 hover:bg-primary-deep"
      >
        Write Your First Letter
      </Link>
    </div>
  );
};
