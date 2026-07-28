import Link from "next/link";

export const EmptyLettersState = () => {
  return (
    <div className="self-stretch min-h-96 py-20 inline-flex flex-col justify-center items-center">
      <div className="size- pb-6 flex flex-col justify-start items-start">
        <div className="size- opacity-40 flex flex-col justify-start items-center">
          <img src='/icons/no-letter.svg' />
        </div>
      </div>
      <div className="w-56 h-10 relative">
        <div className="size- left-0 top-[-1px] absolute inline-flex flex-col justify-start items-center">
          <div className="text-center justify-center text-stone-900 text-2xl font-semibold font-[family-name:var(--font-playfair)] leading-8">No letters found yet.</div>
        </div>
      </div>
      <div className="size- pb-8 flex flex-col justify-start items-start">
        <div className="size- flex flex-col justify-start items-center">
          <div className="text-center justify-center text-stone-700 text-xl font-normal font-[family-name:var(--font-garamond)]  leading-8">Every story starts with a single word.</div>
        </div>
      </div>
      <div className="size- px-8 py-3 bg-rose-950 rounded-xl flex flex-col justify-center items-center">
        <Link href='/letters/new' className="text-center justify-center text-white text-xs font-medium font-[family-name:var(--font-inter)] leading-3 tracking-wide">Write Your First Letter</Link>
      </div>
    </div>
  );
}
