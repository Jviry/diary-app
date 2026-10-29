import { GreetingHeader } from "@/components/main/home/GreetingHeader";
import { LatestLetterPreview } from "@/components/main/home/LatestLetterPreview";
import { WriteLetterButton } from "@/components/main/home/WriteLetterButton";
import { LatestPingPreview } from "@/components/main/home/LatestPingPreview";
import { SendPingButton } from "@/components/main/home/SendPingButton";
import { Layout } from "@/components/layout/Layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-8 sm:gap-10 sm:px-10 sm:py-10 lg:px-16">
        <GreetingHeader />
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <section
            aria-labelledby="latest-letter-heading"
            className="flex w-full flex-col items-start gap-8 lg:col-span-8 lg:gap-10"
          >
            <LatestLetterPreview />
            <WriteLetterButton />
          </section>
          <aside
            aria-labelledby="thinking-of-you-heading"
            className="flex w-full flex-col items-start gap-8 lg:col-span-4 lg:gap-10"
          >
            <LatestPingPreview />
            <SendPingButton />
          </aside>
        </div>
      </div>
    </Layout>
  );
}
