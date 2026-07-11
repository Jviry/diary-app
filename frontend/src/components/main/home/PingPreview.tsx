import { Ping } from "@/types/ping.types";
import { formatDistanceToNow } from "date-fns";

interface PingPreviewProps {
  ping: Ping
}

export const PingPreview = ({ ping }: PingPreviewProps) => {
  return (
    <div className="flex items-start gap-[15.99px] relative self-stretch w-full flex-[0_0_auto]">
      <div className="pt-1 pb-[7px] px-0 inline-flex flex-col items-start relative flex-[0_0_auto]">
        <img
          className="relative w-3 h-[18px]"
          alt=""
          aria-hidden="true"
          src="/icons/music.svg"
        />
      </div>
      <div className="relative w-[265.33px] h-[130px]">
        <div className="flex flex-col w-full items-start pt-0 pb-[0.75px] px-0 absolute -top-px left-0">
          {ping.note && (
            <p className="relative w-fit mt-[-1.00px] font-[family-name:var(--font-garamond)] font-normal text-[#1b1c15] text-[17px] tracking-[0] leading-[25.5px]">
              {ping.note}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full items-start absolute top-[55px] left-0">
          <div className="relative flex items-center w-fit mt-[-1.00px] font-[family-name:var(--font-inter)] font-normal text-[#584141] text-[11px] tracking-[0.88px] leading-[11px] whitespace-nowrap">
            {formatDistanceToNow(new Date(ping.createdAt), { addSuffix: true })}
          </div>
        </div>
        <div className="w-full absolute top-[82px] left-0 rounded overflow-hidden">
          <iframe
            src={`https://open.spotify.com/embed/track/${ping.spotifyTrackId}`}
            width="100%"
            height="80"
            style={{ border: 'none' }}
            allow="encrypted-media"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
