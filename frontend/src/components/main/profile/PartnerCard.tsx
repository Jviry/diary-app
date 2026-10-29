import Link from "next/link";

interface PartnerCardProps {
  partner: { id: string; name: string; email: string } | null;
  onRemove: () => void;
  removing: boolean;
}

export const PartnerCard = ({ partner, onRemove, removing }: PartnerCardProps) => {
  return (
    <div className="flex animate-fade-up flex-col gap-6 rounded-2xl border border-line/30 bg-paper p-6 shadow-[0px_4px_20px_-2px_#6b5e511f] sm:p-10 [animation-delay:120ms]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src="/icons/heart.svg" alt="" aria-hidden="true" className="h-5 w-5" />
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-primary">
            Partner
          </h3>
        </div>
        {partner && (
          <span className="flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[0.88px] text-foreground">
              Connected
            </span>
          </span>
        )}
      </div>

      {partner ? (
        <>
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-line/30 bg-panel px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="flex min-w-0 flex-col gap-1">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[0.88px] text-foreground">
                CURRENT PARTNER
              </span>
              <span className="break-words font-[family-name:var(--font-playfair)] text-2xl font-semibold text-ink">
                {partner.name}
              </span>
            </div>
            <button
              type="button"
              onClick={onRemove}
              disabled={removing}
              className="focus-ring shrink-0 rounded-sm font-[family-name:var(--font-garamond)] text-[17px] font-medium text-primary underline-offset-4 transition-all duration-200 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {removing ? "Removing..." : "Remove Partner"}
            </button>
          </div>
          <p className="font-[family-name:var(--font-garamond)] text-[17px] italic leading-relaxed text-foreground/70">
            Sharing the journey of slow communication.
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-line/30 bg-panel px-5 py-8 text-center sm:px-6 sm:py-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ede9e0]">
            <img src="/icons/envelope-close-red.svg" alt="" aria-hidden="true" className="h-6 w-6" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h4 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-ink sm:text-2xl">
              No partner connected yet.
            </h4>
            <p className="max-w-sm font-[family-name:var(--font-garamond)] text-[17px] leading-relaxed text-foreground">
              Connect with someone using their User ID to start exchanging letters.
            </p>
          </div>
          <Link
            href="/profile/partner"
            className="focus-ring motion-press mt-2 flex w-full items-center justify-center rounded-xl bg-primary px-8 py-4 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[2.6px] text-white transition-colors duration-200 hover:bg-primary-deep sm:w-auto"
          >
            MANAGE PARTNER
          </Link>
        </div>
      )}
    </div>
  );
};
