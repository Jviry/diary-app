import { Logo } from "@/components/ui/Logo";

export const AuthHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/20 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center px-5 sm:h-[74px] sm:px-10 lg:px-16">
        <Logo href="/login" />
      </div>
    </header>
  );
};
