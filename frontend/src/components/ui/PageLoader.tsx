type PageLoaderProps = {
  label?: string;
};

export const PageLoader = ({ label = "Unfolding your diary..." }: PageLoaderProps) => {
  return (
    <div className="flex min-h-[55vh] w-full flex-col items-center justify-center gap-5 px-6 py-16">
      <span className="relative flex h-12 w-12 items-center justify-center" aria-hidden="true">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-line/60 border-t-primary" />
        <span className="h-3 w-3 rounded-full bg-primary/80" />
      </span>
      <p className="font-[family-name:var(--font-garamond)] text-lg italic text-foreground/80">
        {label}
      </p>
      <span className="sr-only" role="status">
        Loading
      </span>
    </div>
  );
};
