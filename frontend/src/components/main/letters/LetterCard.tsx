import Link from "next/link";
import type { Letter } from "@/types/letter.types";

type LetterCardProps = {
  letter: Letter;
  now: number
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function formatLetterDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export const LetterCard = ({ letter, now }: LetterCardProps) => {
  const isNewArrival =
    !letter.isRead && now - new Date(letter.createdAt).getTime() < ONE_DAY_MS;
  return (
    <article className="relative flex h-[288px] flex-col items-start justify-between border border-solid border-[#d4af3733] bg-white p-4">
      <div className="flex w-full flex-col items-start gap-2 self-stretch">
        {!letter.isRead && (
          <span className="inline-flex items-start rounded-xl bg-[#fbdbdb] px-2 py-1 font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.55px] text-[#574142]">
            {isNewArrival ? "New Arrival" : "Unopened"}
          </span>
        )}
        <h3 className="w-full self-stretch font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[31.2px] text-[#570013]">
          {letter.title}
        </h3>
        <div className="flex h-[76.5px] w-full items-center self-stretch overflow-hidden">
          <p className="line-clamp-3 font-[family-name:var(--font-garamond)] text-[17px] font-normal leading-[25.5px] text-[#584141]">
            {letter.content}
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between self-stretch border-t border-solid border-[#e0bfbf33] pt-4">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.88px] text-[#584141]">
          {formatLetterDate(letter.createdAt)}
        </span>
        <Link
          href={`/letters/${letter.id}`}
          className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-[#570013] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013]"
        >
          {letter.isRead ? "Read Again" : "Open Letter"}
        </Link>
      </div>
      {!letter.isRead && (
        <div className="absolute right-4 top-4">
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
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#570013]" />
          )}
        </div>
      )}
    </article>
  );
};
