import { Ping } from "@/types/ping.types";
import { formatDistanceToNow } from "date-fns";

interface PingPreviewProps {
  ping: Ping;
}

export const PingPreview = ({ ping }: PingPreviewProps) => {
  return (
    <div className="flex w-full items-start gap-3">
      <img
        className="mt-1.5 h-[18px] w-3 shrink-0"
        alt=""
        aria-hidden="true"
        src="/icons/music.svg"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {ping.note && (
          <p className="break-words font-[family-name:var(--font-garamond)] text-[17px] leading-relaxed text-ink">
            {ping.note}
          </p>
        )}
        <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.88px] text-foreground/80">
          {formatDistanceToNow(new Date(ping.createdAt), { addSuffix: true })}
        </p>
        <div className="w-full overflow-hidden rounded-lg border border-line/20">
          <iframe
            src={`https://open.spotify.com/embed/track/${ping.spotifyTrackId}`}
            width="100%"
            height="100"
            style={{ border: "none" }}
            allow="encrypted-media"
            loading="lazy"
            title="Spotify track shared in this ping"
          />
        </div>
      </div>
    </div>
  );
};
