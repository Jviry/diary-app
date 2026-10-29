import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const footerLinks = [
  { label: "Home", href: "/home" },
  { label: "Letters", href: "/letters" },
  { label: "Profile", href: "/profile" },
];

export const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-line/30">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 py-8 text-center sm:px-10 md:flex-row md:justify-between md:gap-8 md:py-10 md:text-left lg:px-16">
        <Logo href="/home" className="text-xl" />

        <p className="font-[family-name:var(--font-garamond)] text-[15px] italic leading-relaxed text-foreground sm:text-[17px]">
          © D/ARY. Built for slow, intentional love.
        </p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="focus-ring rounded-sm font-[family-name:var(--font-inter)] text-[11px] font-normal tracking-[0.88px] text-foreground/80 transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
