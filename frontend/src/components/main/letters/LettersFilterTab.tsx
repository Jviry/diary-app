import { cn } from "@/lib/utils";

type LettersFilterTabsProps = {
  unreadOnly: boolean;
  onChange: (unreadOnly: boolean) => void;
};

export const LettersFilterTabs = ({ unreadOnly, onChange }: LettersFilterTabsProps) => {
  return (
    <div
      className="flex shrink-0 items-center gap-1 rounded-xl border border-line/30 bg-panel p-1"
      role="group"
      aria-label="Filter letters"
    >
      {[
        { label: "All", value: false },
        { label: "Unread", value: true },
      ].map((option) => {
        const active = unreadOnly === option.value;

        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "focus-ring flex items-center justify-center rounded-lg px-5 py-2 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] transition-all duration-200 active:scale-[0.98] sm:px-6",
              active
                ? "bg-primary text-white shadow-[0_4px_10px_-6px_#570013cc]"
                : "text-foreground hover:bg-paper hover:text-primary"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
