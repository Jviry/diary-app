import type { PartnerRequest } from '@/types/partner.types';

interface IncomingRequestsProps {
  requests: PartnerRequest[]
  onAccept: (id: string) => void
  onDecline: (id: string) => void
}

export const IncomingRequests = ({ requests, onAccept, onDecline }: IncomingRequestsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] font-semibold text-[#570013] text-2xl">
          Incoming Requests
        </h2>
        {requests.length > 0 && (
          <span className="bg-[#fce8e8] text-[#570013] font-[family-name:var(--font-inter)] font-medium text-[13px] tracking-[0.65px] px-3 py-1 rounded-full">
            {requests.length} New
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <p className="font-[family-name:var(--font-garamond)] italic text-[#584141] text-[17px] opacity-70">
          No incoming requests.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white border border-[#e0bfbf33] rounded-lg px-6 py-4 flex items-center justify-between shadow-[0px_4px_20px_-2px_#6b5e511f]"
            >
              <div className="flex flex-col gap-1">
                <span className="font-[family-name:var(--font-playfair)] font-semibold text-[#1b1c15] text-xl">
                  {request.fromUser.name}
                </span>
                <span className="font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[11px] tracking-[0.88px]">
                  #{request.fromUser.id.slice(0, 8).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onDecline(request.id)}
                  className="px-5 py-2 border border-[#e0bfbf] rounded-xl font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[13px] tracking-[0.65px] hover:border-[#570013] hover:text-[#570013] transition-colors duration-200"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => onAccept(request.id)}
                  className="px-5 py-2 bg-[#2d5016] text-white rounded-xl font-[family-name:var(--font-inter)] font-medium text-[13px] tracking-[0.65px] hover:bg-[#1e3a0f] transition-colors duration-200"
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
}
