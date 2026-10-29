interface FindPartnerCardProps {
  toUserId: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  error: string | null;
}

export const FindPartnerCard = ({ toUserId, onChange, onSend, loading, error }: FindPartnerCardProps) => {
  return (
    <div className="flex animate-fade-up flex-col gap-6 rounded-2xl border border-line/30 bg-paper p-6 shadow-[0px_4px_20px_-2px_#6b5e511f] sm:p-10 [animation-delay:60ms]">
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-primary">
        Find a Partner
      </h2>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="partner-id"
          className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-foreground"
        >
          Partner User ID
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="partner-id"
            type="text"
            value={toUserId}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter User ID (e.g. #LUMINA42)"
            className="min-w-0 flex-1 border-b border-[#6b7280] bg-transparent px-1 py-3 font-[family-name:var(--font-garamond)] text-[17px] text-foreground outline-none transition-colors duration-200 placeholder:text-line/70 focus:border-primary"
          />
          <button
            type="button"
            onClick={onSend}
            disabled={loading || !toUserId.trim()}
            className="focus-ring motion-press shrink-0 rounded-xl bg-success px-6 py-3 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-white transition-colors duration-200 hover:bg-[#1e3a0f] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </div>
        {error && (
          <p role="alert" className="animate-fade-in font-[family-name:var(--font-garamond)] text-[15px] text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
