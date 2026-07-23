import { GreetingHeader } from "@/components/main/home/GreetingHeader";
import { LatestLetterPreview } from "@/components/main/home/LatestLetterPreview";
import { WriteLetterButton } from "@/components/main/home/WriteLetterButton";
import { LatestPingPreview } from "@/components/main/home/LatestPingPreview";
import { SendPingButton } from "@/components/main/home/SendPingButton";
import { Layout } from "@/components/layout/Layout";

export default function HomePage() {
  return (
    <Layout>
      <main className="flex ml-10 mr-10 flex-1 max-h-[780px] relative mt-[5.0px] flex-col max-w-[1200px] w-[1200px] items-start gap-10 px-16 py-10">
        <GreetingHeader />
        <div className="grid grid-cols-12 grid-rows-[567px] h-fit gap-6 w-full">
          <section
            aria-labelledby="latest-letter-heading"
            className="relative row-[1_/_2] col-[1_/_9] [align-self:start] w-full h-fit flex flex-col items-start gap-10"
          >
            <LatestLetterPreview />
            <WriteLetterButton />
          </section>
          <aside
            aria-labelledby="thinking-of-you-heading"
            className="relative row-[1_/_2] col-[9_/_13] [align-self:start] w-full h-fit flex flex-col items-start gap-10"
          >
            <LatestPingPreview />
            <SendPingButton />
          </aside>
        </div>
      </main>
    </Layout>
  );
};
