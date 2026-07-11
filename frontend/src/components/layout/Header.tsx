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
    <header className="flex flex-1 max-h-[74px] relative flex-col w-[1280px] items-start px-10 py-0 bg-[#fbfaeecc] shadow-[0px_1px_2px_#0000000d] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]">
      <div className="flex max-w-[1200px] items-center justify-between px-16 py-4 relative w-full flex-[0_0_auto]">
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
                className={`inline-flex flex-col items-start relative flex-[0_0_auto] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013] ${active
                  ? "pt-0 pb-1 px-0 border-b-2 [border-bottom-style:solid] border-[#570013]"
                  : ""
                  }`}
              >
                <div
                  className={`relative flex items-center w-fit ${active ? "mt-[-2.00px]" : "mt-[-1.00px]"
                    } ${active
                      ? "font-[family-name:var(--font-garamond)] font-semibold text-[#570013]"
                      : "font-[family-name:var(--font-garamond)] font-medium text-[#584141]"
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
