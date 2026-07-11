import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GreetingHeader } from "@/components/main/home/GreetingHeader";
import { LatestLetterPreview } from "@/components/main/home/LatestLetterPreview";
import { WriteLetterButton } from "@/components/main/home/WriteLetterButton";
import { LatestPingPreview } from "@/components/main/home/LatestPingPreview";
import { SendPingButton } from "@/components/main/home/SendPingButton";

export default function HomePage() {
  return (
    <div className="bg-[linear-gradient(0deg,rgba(251,250,238,1)_0%,rgba(251,250,238,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] w-full min-w-[1280px] min-h-[1010.98px] flex flex-col">
      <Header />
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
      <Footer />
    </div>
  );
};
