import Link from "next/link";

export const WriteLetterFab = () => {
  return (
    <Link
      href="/letters/new"
      aria-label="Write a Letter"
      className="group fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#800020_0%,#570013_100%)] shadow-[inset_-2px_-2px_5px_0_#00000033,2px_2px_5px_0_#0000004d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013]"
    >
      <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 12.5V10H8.75V12.5H0ZM0 7.5V5H13.75V7.5H0ZM0 2.5V0H13.75V2.5H0ZM11.25 20V16.1562L18.1562 9.28125C18.3438 9.09375 18.5521 8.95833 18.7812 8.875C19.0104 8.79167 19.2396 8.75 19.4688 8.75C19.7188 8.75 19.9583 8.79688 20.1875 8.89062C20.4167 8.98438 20.625 9.125 20.8125 9.3125L21.9688 10.4688C22.1354 10.6562 22.2656 10.8646 22.3594 11.0938C22.4531 11.3229 22.5 11.5521 22.5 11.7812C22.5 12.0104 22.4583 12.2448 22.375 12.4844C22.2917 12.724 22.1562 12.9375 21.9688 13.125L15.0938 20H11.25ZM19.4688 13L20.625 11.7812L19.4688 10.625L18.2812 11.8125L19.4688 13Z"
          fill="white"
        />
      </svg>
      <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded bg-[#570013] px-4 py-2 font-[family-name:var(--font-garamond)] text-[13px] font-medium tracking-[0.65px] text-white opacity-0 transition-opacity group-hover:opacity-100">
        Write a Letter
      </span>
    </Link>
  );
};
