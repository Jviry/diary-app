
const footerLinks = [
  { label: "Our Story", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Support", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="flex flex-1 max-h-[112.19px] relative mt-[39.8px] flex-col w-[1280px] items-start p-10 bg-transparent border-t [border-top-style:solid] [border-right-style:none] [border-bottom-style:none] [border-left-style:none] border-[#e0bfbf4c]">
      <div className="flex max-w-[1200px] items-center justify-between px-16 py-0 relative w-full flex-[0_0_auto]">
        <a
          href="#"
          aria-label="D/ARY home"
          className="relative w-[83.06px] h-[31.19px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013]"
        >
          <div className="absolute -top-px left-0 h-8 flex items-center font-[family-name:var(--font-playfair)] font-semibold text-[#570013] text-2xl tracking-[2.40px] leading-[31.2px] whitespace-nowrap">
            D/ARY
          </div>
        </a>
        <div className="relative w-[263.83px] h-[25.5px]">
          <p className="absolute -top-px left-0 h-[26px] flex items-center font-[family-name:var(--font-garamond)] font-normal italic text-[#584141] text-[17px] tracking-[0] leading-[25.5px] whitespace-nowrap">
            © D/ARY. Built for slow, intentional love.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="inline-flex items-start gap-4 relative flex-[0_0_auto]"
        >
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex flex-col items-start relative self-stretch flex-[0_0_auto] opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#570013]"
            >
              <div className="relative flex items-center w-fit mt-[-1.00px] font-[family-name:var(--font-inter)] font-normal text-[#584141] text-[11px] tracking-[0.88px] leading-[11px] whitespace-nowrap">
                {link.label}
              </div>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
