interface FindPartnerCardProps {
  toUserId: string
  onChange: (value: string) => void
  onSend: () => void
  loading: boolean
  error: string | null
}

export const FindPartnerCard = ({ toUserId, onChange, onSend, loading, error }: FindPartnerCardProps) => {
  return (
    <div className="bg-white border border-[#e0bfbf33] rounded-lg p-10 flex flex-col gap-6 shadow-[0px_4px_20px_-2px_#6b5e511f]">
      <h2 className="font-[family-name:var(--font-playfair)] font-semibold text-[#570013] text-2xl">
        Find a Partner
      </h2>
      <div className="flex flex-col gap-2">
        <label className="font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[13px] tracking-[0.65px]">
          Partner User ID
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={toUserId}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter User ID (e.g. #LUMINA42)"
            className="flex-1 font-[family-name:var(--font-garamond)] text-[#584141] placeholder:text-[#e0bfbf99] text-[17px] border-b border-gray-500 py-3 px-0 bg-transparent focus:outline-none focus:border-[#570013] transition-colors duration-200"
          />
          <button
            type="button"
            onClick={onSend}
            disabled={loading || !toUserId.trim()}
            className="px-6 py-3 bg-[#2d5016] text-white rounded-xl font-[family-name:var(--font-inter)] font-medium text-[13px] tracking-[0.65px] hover:bg-[#1e3a0f] transition-colors duration-200 disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </div>
        {error && (
          <p className="font-[family-name:var(--font-garamond)] text-red-600 text-[15px]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
