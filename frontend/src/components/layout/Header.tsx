'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Home", href: "/home" },
  { label: "Letters", href: "/letters" },
  { label: "Pings", href: "/pings" },
  { label: "Profile", href: "/profile" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#fbfaeecc] shadow-sm backdrop-blur-md"
    >
      <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between px-10">
        <Link
          href="#"
          aria-label="D/ARY home"
          className="relative w-[83.06px] h-[31.19px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013]"
        >
          <div className="absolute -top-px left-0 h-8 flex items-center font-[family-name:var(--font-playfair)] font-semibold text-[#570013] text-2xl tracking-[2.40px] leading-[31.2px] whitespace-nowrap">
            D/ARY
          </div>
        </Link>
        <nav
          aria-label="Primary"
          className="inline-flex items-center gap-6 relative flex-[0_0_auto]"
        >
          {navigationItems.map((item) => {

            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex flex-col items-start relative flex-[0_0_auto] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013] transition-all duration-200 group
                  ${active
                    ? "pt-0 pb-1 px-0 border-b-2 border-[#570013]"
                    : "pt-0 pb-1 px-0 border-b-2 border-transparent hover:border-[#57001366]"
                  }`}
              >
                <div
                  className={`relative flex items-center w-fit transition-colors duration-200
                    ${active ? "mt-[-2.00px]" : "mt-[-1.00px]"}
                    ${active
                      ? "font-[family-name:var(--font-garamond)] font-semibold text-[#570013]"
                      : "font-[family-name:var(--font-garamond)] font-medium text-[#584141] hover:text-[#570013]"
                    } text-xl tracking-[0] leading-8 whitespace-nowrap`}
                >
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          aria-label="Settings"
          className="flex-col justify-center pt-2 pb-[15px] px-2 inline-flex items-center relative flex-[0_0_auto] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013]"
        >
          <div className="inline-flex items-start justify-center relative flex-[0_0_auto]">
            <img
              className="relative w-[18.79px] h-[19px]"
              alt=""
              aria-hidden="true"
              src="/icons/settings.svg"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
