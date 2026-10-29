import Link from "next/link";
import { Layout } from "@/components/layout/Layout";

export default function PingsPage() {
  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
        <div className="flex animate-fade-up flex-col gap-2 border-b border-line/30 pb-5">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-primary sm:text-5xl">
            Pings
          </h1>
          <p className="font-[family-name:var(--font-garamond)] text-lg italic text-foreground sm:text-xl">
            Small taps of affection across the quiet.
          </p>
        </div>

        <div className="flex animate-fade-up flex-col items-center gap-5 rounded-2xl border border-line/30 bg-paper px-6 py-16 text-center shadow-[0px_4px_20px_-2px_#6b5e511f] [animation-delay:60ms] sm:py-20">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blush">
            <img src="/icons/ping.svg" alt="" aria-hidden="true" className="h-7 w-7" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-ink sm:text-3xl">
              No pings yet.
            </h2>
            <p className="mx-auto max-w-sm font-[family-name:var(--font-garamond)] text-[17px] leading-relaxed text-foreground">
              When your partner sends a little tap on the shoulder, it will wait for you here.
            </p>
          </div>
          <Link
            href="/home"
            className="focus-ring motion-press mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-white transition-colors duration-200 hover:bg-primary-deep"
          >
            Back to your diary
          </Link>
        </div>
      </div>
    </Layout>
  );
}
