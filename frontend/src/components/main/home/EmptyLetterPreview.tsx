
const quoteLines = [
  '"The silence is just a space for your next',
  "thought. Your digital heirloom is a quiet",
  'sanctuary."',
];

const descriptionLines = [
  "There are no letters here yet, only the anticipation of",
  "your first word.",
];

export const EmptyLetterPreview = () => {
  return (
    <article className="relative mr-[-0.77px] mt-[-2.57px] flex w-[448px] flex-[0_0_auto] flex-col items-start border border-solid border-[#e0bfbf4c] bg-white p-12">
      <div
        aria-hidden="true"
        className="absolute left-px top-px h-[calc(100%_-_2px)] w-[calc(100%_-_2px)] opacity-10"
      />
      <div className="relative flex w-full flex-[0_0_auto] flex-col items-center gap-[23px] self-stretch">
        <div
          aria-hidden="true"
          className="relative h-px w-16 bg-[#57001333]"
        />
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-center px-0 pb-0 pt-[1.01px] self-stretch">
          <blockquote className="m-0 flex flex-col items-center">
            {quoteLines.map((line, index) => (
              <p
                key={index}
                className="font-[family-name:var(--font-garamond)] relative flex w-fit items-center justify-center whitespace-nowrap text-center text-xl font-normal italic leading-[32.5px] tracking-[0] text-[#584141]"
              >
                {line}
              </p>
            ))}
          </blockquote>
        </div>
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-center px-0 pb-px pt-0 self-stretch">
          {descriptionLines.map((line, index) => (
            <p
              key={index}
              className="font-[family-name:var(--font-garamond)] relative flex w-fit items-center justify-center whitespace-nowrap text-center text-[17px] font-normal leading-[25.5px] tracking-[0] text-[#584141b2]"
            >
              {line}
            </p>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="relative h-[1.01px] w-16 bg-[#57001333]"
        />
      </div>
    </article>
  );
}
