'use client';

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { LettersFilterTabs } from "@/components/main/letters/LettersFilterTab";
import { LetterCard } from "@/components/main/letters/LetterCard";
import { useReceivedLetters } from "@/hooks/letter/useReceivedLetters";
import { LettersPagination } from "@/components/main/letters/LettersPagination";
import { WriteLetterFab } from "@/components/main/letters/WriteLetterFab";
import { EmptyLettersState } from "@/components/main/letters/EmptyLettersState";

export default function LettersArchive() {
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [now] = useState(() => Date.now());

  const { letters, pagination, loading, error } = useReceivedLetters(page, unreadOnly);

  const handleFilterChange = (nextUnreadOnly: boolean) => {
    setUnreadOnly(nextUnreadOnly);
    setPage(1);
  };

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-8 px-6 py-10 sm:gap-10 sm:px-10 sm:py-14 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-line/30 pb-5 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <h1 className="animate-fade-up font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
              The Archive
            </h1>
            <p className="animate-fade-up font-[family-name:var(--font-garamond)] text-lg italic text-foreground/90 [animation-delay:60ms] sm:text-xl">
              Every word, preserved in time.
            </p>
          </div>

          <LettersFilterTabs unreadOnly={unreadOnly} onChange={handleFilterChange} />
        </div>

        {error ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-line/30 bg-paper px-6 py-12 text-center">
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-primary">
              The archive is resting.
            </p>
            <p className="max-w-sm font-[family-name:var(--font-garamond)] text-[17px] leading-relaxed text-foreground">
              {error}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="focus-ring mt-2 rounded-xl bg-primary px-5 py-2.5 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-white transition-all duration-200 hover:bg-primary-deep active:scale-[0.98]"
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[288px] animate-pulse rounded-xl bg-[#e4e3d7]"
              />
            ))}
          </div>
        ) : letters.length === 0 ? (
          <EmptyLettersState />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {letters.map((letter, index) => (
              <LetterCard key={letter.id} letter={letter} now={now} index={index} />
            ))}
          </div>
        )}

        {!loading && !error && letters.length > 0 && (
          <LettersPagination page={page} totalPages={pagination?.totalPages ?? 1} onChange={setPage} />
        )}
      </div>

      <WriteLetterFab />
    </Layout>
  );
}
