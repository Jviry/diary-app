import Link from "next/link";
import type { Letter } from "@/types/letter.types";

type LetterCardProps = {
  letter: Letter;
  now: number;
  index?: number;
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function formatLetterDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export const LetterCard = ({ letter, now, index = 0 }: LetterCardProps) => {
  const isNewArrival =
    !letter.isRead && now - new Date(letter.createdAt).getTime() < ONE_DAY_MS;

  return (
    <article
      style={{ animationDelay: `${(index % 6) * 55}ms` }}
      className="group relative flex h-full min-h-[288px] animate-fade-up flex-col justify-between gap-4 border border-[#d4af3733] bg-paper p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line/70 hover:shadow-[0_18px_35px_-24px_rgba(87,0,19,0.45)] sm:p-6"
    >
      <div className="flex w-full flex-col items-start gap-2 self-stretch">
        <div className="flex min-h-6 w-full items-center justify-between gap-3 pr-8">
          {!letter.isRead ? (
            <span className="inline-flex items-start rounded-xl bg-blush px-2 py-1 font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.55px] text-[#574142]">
              {isNewArrival ? "New Arrival" : "Unopened"}
            </span>
          ) : (
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.55px] text-muted/80">
              Opened
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 w-full self-stretch font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[31.2px] text-primary">
          {letter.title}
        </h3>
        <p className="line-clamp-3 w-full font-[family-name:var(--font-garamond)] text-[17px] font-normal leading-[25.5px] text-foreground">
          {letter.content}
        </p>
      </div>

      <div className="flex w-full items-center justify-between gap-3 self-stretch border-t border-line/30 pt-4">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.88px] text-foreground/80">
          {formatLetterDate(letter.createdAt)}
        </span>
        <Link
          href={`/letters/${letter.id}`}
          className="focus-ring inline-flex items-center gap-1 rounded-sm font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-primary transition-colors duration-200 hover:text-primary-deep"
        >
          {letter.isRead ? "Read Again" : "Open Letter"}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      {!letter.isRead && (
        <div className="absolute right-4 top-5" aria-hidden="true">
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM10 9L18 4V2L10 7L2 2V4L10 9Z"
              fill="#800020"
            />
          </svg>
          {isNewArrival && (
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
          )}
        </div>
      )}
    </article>
  );
};
