import Link from "next/link";

interface PartnerCardProps {
  partner: { id: string; name: string; email: string } | null
  onRemove: () => void
  removing: boolean
}

export const PartnerCard = ({ partner, onRemove, removing }: PartnerCardProps) => {
  return (
    <div className="bg-white border border-[#e0bfbf33] rounded-lg p-10 flex flex-col gap-6 shadow-[0px_4px_20px_-2px_#6b5e511f]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/icons/heart.svg" alt="" aria-hidden="true" className="w-5 h-5" />
          <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-[#570013] text-2xl">
            Partner
          </h3>
        </div>
        {partner && (
          <span className="flex items-center gap-2 bg-[#f5f3ee] border border-[#e0bfbf] rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[11px] tracking-[0.88px]">
              Connected
            </span>
          </span>
        )}
      </div>

      {partner ? (
        <>
          <div className="bg-[#f5f3ee] border border-[#e0bfbf33] rounded-lg px-6 py-4 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[11px] tracking-[0.88px]">
                CURRENT PARTNER
              </span>
              <span className="font-[family-name:var(--font-playfair)] font-semibold text-[#1b1c15] text-2xl">
                {partner.name}
              </span>
            </div>
            <button
              type="button"
              onClick={onRemove}
              disabled={removing}
              className="font-[family-name:var(--font-garamond)] font-medium text-[#570013] text-[17px] hover:underline disabled:opacity-50 transition-opacity duration-200"
            >
              {removing ? 'Removing...' : 'Remove Partner'}
            </button>
          </div>
          <p className="font-[family-name:var(--font-garamond)] italic text-[#584141] text-[17px] opacity-70">
            Sharing the journey of slow communication.
          </p>
        </>
      ) : (
        <div className="bg-[#f5f3ee] border border-[#e0bfbf33] rounded-lg px-6 py-10 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 bg-[#ede9e0] rounded-xl">
            <img src="/icons/envelope-close-red.svg" alt="" aria-hidden="true" className="w-6 h-6 text-[#570013]" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h4 className="font-[family-name:var(--font-playfair)] font-semibold text-[#1b1c15] text-2xl">
              No partner connected yet.
            </h4>
            <p className="font-[family-name:var(--font-garamond)] text-[#584141] text-[17px] leading-[25.5px]">
              Connect with someone using their User ID to start exchanging letters.
            </p>
          </div>
          <Link
            href="/profile/partner"
            className="flex items-center justify-center px-8 py-4 bg-[#570013] rounded-xl font-[family-name:var(--font-inter)] font-medium text-white text-[13px] tracking-[2.60px] hover:bg-[#3d000d] transition-colors duration-200 mt-2"
          >
            MANAGE PARTNER
          </Link>
        </div>
      )}
    </div>
  )
}
