'use client';

import { useGetLetterById } from "@/hooks/letter/useGetLetterById";
import { useMarkAsRead } from "@/hooks/letter/useMarkAsRead";
import { LetterComponent } from "@/components/main/letters/LetterComponent";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function LetterPage() {
  const params = useParams();
  const id = params.id as string;

  const { letter, loading, error } = useGetLetterById(id);
  useMarkAsRead(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAEE] flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#570013]" />
        <p className="mt-4 font-[family-name:var(--font-garamond)] italic text-[#584141] text-lg">
          Unfolding your letter...
        </p>
      </div>
    );
  }

  if (error || !letter) {
    return (
      <div className="min-h-screen bg-[#FBFAEE] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-sm border border-[#e0bfbf4d] shadow-md max-w-md w-full flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-[#570013]">
            Letter Not Found
          </h2>
          <p className="font-[family-name:var(--font-garamond)] text-[#584141]">
            {error || "We couldn't find the letter you were looking for."}
          </p>
          <Link
            href="/letters"
            className="mt-2 inline-flex justify-center items-center px-4 py-2 bg-[#570013] text-white text-sm font-medium rounded-md hover:bg-[#3d000d] transition-colors"
          >
            Return to Letters Archive
          </Link>
        </div>
      </div>
    );
  }

  return <LetterComponent letter={letter} />;
}
