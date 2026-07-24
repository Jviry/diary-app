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

  const { letters, pagination, loading } = useReceivedLetters(page, unreadOnly);

  const handleFilterChange = (nextUnreadOnly: boolean) => {
    setUnreadOnly(nextUnreadOnly);
    setPage(1);
  };

  return (
    <Layout>
      <div className="mx-auto flex max-w-[1152px] flex-col gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border/30 pb-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-4xl font-bold font-[family-name:var(--font-playfair)] leading-[1.1] tracking-tight text-primary sm:text-5xl">
              The Archive
            </h1>
            <p className=" font-[family-name:var(--font-garamond)] text-xl italic text-foreground/90">
              Every word, preserved in time.
            </p>
          </div>

          <LettersFilterTabs unreadOnly={unreadOnly} onChange={handleFilterChange} />
        </div>

        {!loading && letters.length === 0 ? (
          <EmptyLettersState />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {letters.map((letter) => (
              <LetterCard key={letter.id} letter={letter} now={now} />
            ))}
          </div>
        )}

        <LettersPagination page={page} totalPages={pagination?.totalPages ?? 1} onChange={setPage} />
      </div>

      <WriteLetterFab />

    </Layout>
  );
}
