
import { useState } from "react";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: saveAuthSession } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login({ email, password });

      saveAuthSession(response.user, response.token);

      router.push('/home');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <section
      aria-labelledby="login-title"
      className="flex flex-col items-start gap-[39px] p-10 relative self-stretch flex-[0_0_auto] bg-white border border-solid border-[#e0bfbf33] w-full rounded-lg"
    >
      <div
        aria-hidden="true"
        className="absolute h-full top-0 left-0 bg-[#ffffff01] shadow-[0px_10px_30px_-15px_#6b5e5126] w-full rounded-lg"
      />
      <div className="flex flex-col items-start gap-[7px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <h1
            id="login-title"
            className="relative justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-playfair)] font-semibold text-[#570013] text-5xl text-center tracking-[-0.96px] leading-[52.8px] flex items-center whitespace-nowrap"
          >
            Welcome back
          </h1>
        </div>
        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-garamond)] font-normal italic text-[#584141] text-[17px] text-center tracking-[0] leading-[25.5px] flex items-center whitespace-nowrap">
            The ink has dried, but the words wait for you.
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-4 pt-px pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]"
      >
        <div className="flex-col items-start gap-1 w-full flex-[0_0_auto] flex relative self-stretch">
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <label
              className="items-center mt-[-1.00px] font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[13px] tracking-[0.65px] leading-[13px] flex relative self-stretch"
            >
              EMAIL ADDRESS
            </label>
          </div>
          <div className="flex items-start justify-center pt-[13px] pb-[14.5px] px-3 relative self-stretch w-full flex-[0_0_auto] bg-white border-b [border-bottom-style:solid] border-gray-500">
            <input
              className="relative grow border-[none] [background:none] self-stretch mt-[-1.00px] font-[family-name:var(--font-garamond)] font-normal text-[#584141] placeholder:text-[#e0bfbf99] text-[17px] tracking-[0] leading-[normal] p-0"
              name="email"
              autoComplete="email"
              placeholder="you@love.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-required="true"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 pt-0 pb-4 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <label
              className="relative flex items-center self-stretch mt-[-1.00px] font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[13px] tracking-[0.65px] leading-[13px]"
            >
              PASSWORD
            </label>
          </div>
          <div className="flex items-start justify-center pt-[13px] pb-[14.5px] px-3 relative self-stretch w-full flex-[0_0_auto] bg-white border-b [border-bottom-style:solid] border-gray-500">
            <input
              className="relative grow border-[none] [background:none] self-stretch mt-[-1.00px] pr-8 font-[family-name:var(--font-garamond)] font-normal text-[#584141] placeholder:text-[#e0bfbf99] text-[17px] tracking-[0] leading-[normal] p-0"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-required="true"
            />
          </div>
          <div className="inline-flex flex-col items-center justify-center pt-0 pb-2 px-0 absolute right-0 bottom-7">
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? "Hide secret key" : "Show secret key"
              }
              aria-pressed={showPassword}
              className="inline-flex items-start justify-center relative flex-[0_0_auto] cursor-pointer"
            >
              <img
                className="relative w-[17.44px] h-[15.57px]"
                alt=""
                aria-hidden="true"
                src="/icons/show-password.svg"
              />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 p-4 relative self-stretch w-full flex-[0_0_auto] bg-[#570013] rounded-xl cursor-pointer"
        >
          <div
            aria-hidden="true"
            className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-xl shadow-[0px_4px_6px_-4px_#57001333,0px_10px_15px_-3px_#57001333]"
          />
          <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
            <span className="relative justify-center w-fit mt-[-1.00px] font-[family-name:var(--font-inter)] font-medium text-white text-[13px] text-center tracking-[2.60px] leading-[13px] flex items-center whitespace-nowrap">
              OPEN ENVELOPE
            </span>
          </div>
          <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
            <img
              className="relative w-[14.25px] h-[14.18px]"
              alt=""
              aria-hidden="true"
              src="icons/envelope.svg"
            />
          </div>
        </button>
      </form>
    </section>
  );
}
