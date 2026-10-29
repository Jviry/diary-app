import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
};

export const Logo = ({ href = "/home", className }: LogoProps) => {
  return (
    <Link
      href={href}
      aria-label="D/ARY home"
      className={cn(
        "focus-ring inline-flex shrink-0 items-center font-[family-name:var(--font-playfair)] text-2xl font-semibold tracking-[2.4px] text-primary transition-opacity duration-200 hover:opacity-75",
        className
      )}
    >
      D/ARY
    </Link>
  );
};
