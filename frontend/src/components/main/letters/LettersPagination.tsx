type LettersPaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const LettersPagination = ({ page, totalPages, onChange }: LettersPaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;
  return (
    <nav
      aria-label="Letters pagination"
      className="flex w-full flex-wrap items-center justify-center gap-4"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={isFirstPage}
        onClick={() => onChange(page - 1)}
        className={`flex flex-col items-center justify-center p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013] ${isFirstPage ? "cursor-not-allowed opacity-30" : "cursor-pointer"
          }`}
      >
        <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.6538 19.3076L8 13.6538L13.6538 8L14.7076 9.05382L10.1076 13.6538L14.7076 18.2538L13.6538 19.3076Z"
            fill="#584141"
          />
        </svg>
      </button>
      <div className="flex items-center gap-2">
        {pages.map((pageNumber) => {
          const isActive = pageNumber === page;
          return (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onChange(pageNumber)}
              className={`flex h-8 w-8 items-center justify-center rounded-xl font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013] ${isActive ? "bg-[#570013] text-white" : "text-[#584141]"
                }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        aria-label="Next page"
        disabled={isLastPage}
        onClick={() => onChange(page + 1)}
        className={`flex flex-col items-center justify-center p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013] ${isLastPage ? "cursor-not-allowed opacity-30" : "cursor-pointer"
          }`}
      >
        <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.6 13.6538L8 9.05382L9.05382 8L14.7076 13.6538L9.05382 19.3076L8 18.2538L12.6 13.6538Z"
            fill="#584141"
          />
        </svg>
      </button>
    </nav>
  );
};
