'use client';

import { useGetLetterById } from "@/hooks/letter/useGetLetterById";
import { useMarkAsRead } from "@/hooks/letter/useMarkAsRead";
import { LetterComponent } from "@/components/main/letters/LetterComponent";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { PageLoader } from "@/components/ui/PageLoader";

export default function LetterPage() {
  const params = useParams();
  const id = params.id as string;

  const { letter, loading, error } = useGetLetterById(id);
  useMarkAsRead(id);

  if (loading) {
    return (
      <Layout>
        <PageLoader label="Unfolding your letter..." />
      </Layout>
    );
  }

  if (error || !letter) {
    return (
      <Layout>
        <div className="flex min-h-[55vh] items-center justify-center px-5 py-16">
          <div className="flex w-full max-w-md animate-fade-up flex-col gap-4 rounded-2xl border border-line/40 bg-paper p-6 text-center shadow-md sm:p-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-primary">
              Letter Not Found
            </h2>
            <p className="font-[family-name:var(--font-garamond)] text-[17px] leading-relaxed text-foreground">
              {error || "We couldn't find the letter you were looking for."}
            </p>
            <Link
              href="/letters"
              className="focus-ring motion-press mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-deep"
            >
              Return to Letters Archive
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <LetterComponent letter={letter} />
    </Layout>
  );
}
