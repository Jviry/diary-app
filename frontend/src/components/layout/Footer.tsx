
const footerLinks = [
  { label: "Our Story", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Support", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-16 py-10 relative self-stretch w-full flex-[0_0_auto] z-0 border-t [border-top-style:solid] border-[#e0bfbf4c]">
      <div className="relative w-[71.06px] h-[31.19px]">
        <a
          href="#"
          aria-label="D/ARY home"
          className="absolute -top-px left-0 h-8 font-[family-name:var(--font-playfair)] font-normal text-[#570013] text-2xl tracking-[0] leading-[31.2px] flex items-center whitespace-nowrap"
        >
          D/ARY
        </a>
      </div>
      <nav
        aria-label="Footer"
        className="inline-flex items-start gap-4 relative flex-[0_0_auto]"
      >
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto] mt-[-1.00px] font-[family-name:var(--font-inter)] font-semibold text-[#584141] text-[11px] tracking-[0.88px] leading-[11px] whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="relative w-[269.08px] h-[25.5px] opacity-80">
        <p className="absolute -top-px left-0 h-[26px] font-[family-name:var(--font-garamond)] font-normal text-[#584141] text-[17px] tracking-[0] leading-[25.5px] flex items-center whitespace-nowrap">
          © D/ARY. Built for slow, intentional love.
        </p>
      </div>
    </footer>
  );
};
