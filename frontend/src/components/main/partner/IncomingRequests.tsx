import type { PartnerRequest } from '@/types/partner.types';

interface IncomingRequestsProps {
  requests: PartnerRequest[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export const IncomingRequests = ({ requests, onAccept, onDecline }: IncomingRequestsProps) => {
  return (
    <div className="flex animate-fade-up flex-col gap-4 [animation-delay:120ms]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-primary">
          Incoming Requests
        </h2>
        {requests.length > 0 && (
          <span className="rounded-full bg-[#fce8e8] px-3 py-1 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-primary">
            {requests.length} New
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <p className="font-[family-name:var(--font-garamond)] text-[17px] italic text-foreground/70">
          No incoming requests.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col items-start justify-between gap-4 rounded-xl border border-line/30 bg-paper px-5 py-4 shadow-[0px_4px_20px_-2px_#6b5e511f] transition-shadow duration-200 hover:shadow-[0px_10px_28px_-12px_#6b5e5140] sm:flex-row sm:items-center sm:px-6"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <span className="break-words font-[family-name:var(--font-playfair)] text-xl font-semibold text-ink">
                  {request.fromUser.name}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[0.88px] text-foreground">
                  #{request.fromUser.id.slice(0, 8).toUpperCase()}
                </span>
              </div>
              <div className="flex w-full items-center gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => onDecline(request.id)}
                  className="focus-ring flex-1 rounded-xl border border-line px-5 py-2 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-foreground transition-colors duration-200 hover:border-primary hover:text-primary active:scale-[0.98] sm:flex-none"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => onAccept(request.id)}
                  className="focus-ring flex-1 rounded-xl bg-success px-5 py-2 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-white transition-colors duration-200 hover:bg-[#1e3a0f] active:scale-[0.98] sm:flex-none"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
