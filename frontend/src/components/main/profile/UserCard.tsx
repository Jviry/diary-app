interface UserCardProps {
  name: string;
  id: string;
  onCopy: () => void;
  copied?: boolean;
}

export const UserCard = ({ name, id, onCopy, copied = false }: UserCardProps) => {
  return (
    <div className="flex animate-fade-up flex-col gap-6 rounded-2xl border border-line/30 bg-paper p-6 shadow-[0px_4px_20px_-2px_#6b5e511f] sm:p-10 [animation-delay:60ms]">
      <h2 className="break-words font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-tight text-ink sm:text-5xl">
        {name}
      </h2>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "User ID copied" : "Copy user ID"}
        className="focus-ring group flex w-fit max-w-full items-center gap-2 rounded-lg border border-line bg-panel px-4 py-2 transition-all duration-200 hover:border-primary/40 hover:bg-panel-deep active:scale-[0.98]"
      >
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[0.88px] text-foreground">
          USER ID
        </span>
        <span className="break-all font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.65px] text-ink">
          {id.slice(0, 8).toUpperCase()}
        </span>
        {copied ? (
          <span
            role="status"
            className="animate-fade-in font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.65px] text-success"
          >
            COPIED
          </span>
        ) : (
          <img
            src="/icons/copy.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        )}
      </button>
    </div>
  );
};
