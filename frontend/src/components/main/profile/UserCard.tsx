interface UserCardProps {
  name: string
  id: string
  onCopy: () => void
}

export const UserCard = ({ name, id, onCopy }: UserCardProps) => {
  return (
    <div className="bg-white border border-[#e0bfbf33] rounded-lg p-10 flex flex-col gap-6 shadow-[0px_4px_20px_-2px_#6b5e511f]">
      <h2 className="font-[family-name:var(--font-playfair)] font-semibold text-[#1b1c15] text-5xl">
        {name}
      </h2>
      <button
        type="button"
        onClick={onCopy}
        className="flex items-center gap-2 bg-[#f5f3ee] border border-[#e0bfbf] rounded-lg px-4 py-2 w-fit hover:bg-[#ede9e0] transition-colors duration-200"
      >
        <span className="font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[11px] tracking-[0.88px]">
          USER ID
        </span>
        <span className="font-[family-name:var(--font-inter)] font-semibold text-[#1b1c15] text-[13px] tracking-[0.65px]">
          {id.slice(0, 8).toUpperCase()}
        </span>
        <img src="/icons/copy.svg" alt="copy" className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  )
}
