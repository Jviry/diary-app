export const EmptyLetterPreview = () => {
  return (
    <article className="flex w-full max-w-md flex-col items-center gap-5 border border-line/40 bg-paper px-6 py-8 text-center sm:gap-6 sm:px-10 sm:py-12">
      <div aria-hidden="true" className="h-px w-16 bg-primary/20" />
      <blockquote className="max-w-sm font-[family-name:var(--font-garamond)] text-lg font-normal italic leading-relaxed text-foreground sm:text-xl">
        &ldquo;The silence is just a space for your next thought. Your digital heirloom is a quiet sanctuary.&rdquo;
      </blockquote>
      <p className="max-w-xs font-[family-name:var(--font-garamond)] text-[15px] leading-relaxed text-foreground/70 sm:text-[17px]">
        There are no letters here yet, only the anticipation of your first word.
      </p>
      <div aria-hidden="true" className="h-px w-16 bg-primary/20" />
    </article>
  );
};
