type LettersFilterTabsProps = {
  unreadOnly: boolean;
  onChange: (unreadOnly: boolean) => void;
};

export const LettersFilterTabs = ({ unreadOnly, onChange }: LettersFilterTabsProps) => {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-solid border-[#e0bfbf33] bg-[#f5f4e8] p-1">
      <button
        type="button"
        aria-pressed={!unreadOnly}
        onClick={() => onChange(false)}
        className={`flex flex-col items-center justify-center rounded-xl px-6 py-2 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013] ${!unreadOnly ? "bg-[#570013] text-white" : "text-[#584141]"
          }`}
      >
        All
      </button>
      <button
        type="button"
        aria-pressed={unreadOnly}
        onClick={() => onChange(true)}
        className={`flex flex-col items-center justify-center rounded-xl px-6 py-2 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013] ${unreadOnly ? "bg-[#570013] text-white" : "text-[#584141]"
          }`}
      >
        Unread
      </button>
    </div>
  );
};
