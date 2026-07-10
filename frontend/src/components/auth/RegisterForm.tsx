
import { useAuth } from "@/context/auth.context";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const RegisterForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: saveAuthSession } = useAuth();
  const [showSecretKey, setShowSecretKey] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.register({ email, name, password });

      saveAuthSession(response.user, response.token);

      router.push('/home');
    } catch (error) {
      console.error('Register failed', error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-[39px] p-10 relative self-stretch flex-[0_0_auto] bg-white border border-solid border-[#e0bfbf33] w-full rounded-lg"
    >
      <div className="gap-10 flex flex-col items-start relative self-stretch w-full">
        {/* Name */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[13px] tracking-[0.65px] leading-[13px]">
            NAME
          </label>
          <div className="flex items-start justify-center pt-[13px] pb-[14.5px] px-3 bg-white border-b border-gray-500">
            <input
              className="grow border-none bg-transparent font-[family-name:var(--font-garamond)] font-normal text-[#584141] placeholder:text-[#e0bfbf99] text-[17px] p-0"
              name="name"
              autoComplete="name"
              placeholder="Your name or nickname"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 w-full">
          <label className="font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[13px] tracking-[0.65px] leading-[13px]">
            EMAIL ADDRESS
          </label>
          <div className="flex items-start justify-center pt-[13px] pb-[14.5px] px-3 bg-white border-b border-gray-500">
            <input
              className="grow border-none bg-transparent font-[family-name:var(--font-garamond)] font-normal text-[#584141] placeholder:text-[#e0bfbf99] text-[17px] p-0"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 w-full relative pb-4">
          <label className="font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[13px] tracking-[0.65px] leading-[13px]">
            PASSWORD
          </label>
          <div className="flex items-start justify-center pt-[13px] pb-[14.5px] px-3 bg-white border-b border-gray-500">
            <input
              className="grow border-none bg-transparent pr-8 font-[family-name:var(--font-garamond)] font-normal text-[#584141] placeholder:text-[#e0bfbf99] text-[17px] p-0"
              name="password"
              autoComplete="new-password"
              placeholder="••••••••"
              type={showSecretKey ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            aria-label={showSecretKey ? 'Hide secret key' : 'Show secret key'}
            aria-pressed={showSecretKey}
            onClick={() => setShowSecretKey((current) => !current)}
            className="absolute right-0 bottom-7 cursor-pointer"
          >
            <img
              className="w-[17.44px] h-[15.57px]"
              alt=""
              src="/icons/show-password.svg"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Divider */}
        <img
          className="relative self-stretch w-full h-10 object-cover"
          alt=""
          src="/icons/decor-divider.svg"
          aria-hidden="true"
        />

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 p-4 relative self-stretch w-full bg-[#570013] rounded-xl cursor-pointer"
        >
          <div
            aria-hidden="true"
            className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-xl shadow-[0px_4px_6px_-4px_#57001333,0px_10px_15px_-3px_#57001333]"
          />
          <span className="font-[family-name:var(--font-inter)] font-medium text-white text-[13px] text-center tracking-[2.60px] leading-[13px]">
            BEGIN YOUR JOURNEY
          </span>
        </button>
      </div>

      <p className="font-[family-name:var(--font-inter)] font-semibold text-[#584141b2] text-[11px] text-center tracking-[0.88px] leading-[17.9px] w-full">
        By beginning, you agree to cherish the digital heirlooms
        <br />
        created here.
      </p>
    </form>
  );
}
