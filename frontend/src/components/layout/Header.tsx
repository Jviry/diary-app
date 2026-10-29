'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const navigationItems = [
  { label: "Home", href: "/home" },
  { label: "Letters", href: "/letters" },
  { label: "Pings", href: "/pings" },
  { label: "Profile", href: "/profile" },
];

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/20 bg-background/85 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:h-[74px] sm:px-10 lg:px-16">
        <Logo href="/home" />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring relative rounded-lg px-3 py-2 font-[family-name:var(--font-garamond)] text-lg font-medium leading-8 tracking-[0] transition-colors duration-200",
                  active
                    ? "font-semibold text-primary after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary"
                    : "text-foreground hover:bg-panel/70 hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/profile"
            aria-label="Settings"
            className="focus-ring hidden h-10 w-10 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-panel hover:text-primary active:scale-95 sm:inline-flex"
          >
            <img className="h-[19px] w-[18.79px]" alt="" aria-hidden="true" src="/icons/settings.svg" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors duration-200 hover:bg-panel active:scale-95 md:hidden"
          >
            <span className="flex w-5 flex-col items-end gap-[5px]" aria-hidden="true">
              <span
                className={cn(
                  "block h-0.5 w-5 rounded-full bg-primary transition-transform duration-200",
                  menuOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 rounded-full bg-primary transition-opacity duration-200",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 rounded-full bg-primary transition-transform duration-200",
                  menuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={cn(
          "overflow-hidden border-line/20 bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out md:hidden",
          menuOpen ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav aria-label="Mobile primary" className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-5 py-4 sm:px-10">
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring flex items-center justify-between rounded-xl px-4 py-3 font-[family-name:var(--font-garamond)] text-xl transition-colors duration-200",
                  active
                    ? "bg-panel font-semibold text-primary"
                    : "text-foreground hover:bg-panel/70 hover:text-primary"
                )}
              >
                {item.label}
                <span aria-hidden="true" className="text-muted">
                  →
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
