'use client';

import { useState } from "react";
import { useAuth } from "@/context/auth.context";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { PasswordField } from "@/components/ui/PasswordField";
import { Spinner } from "@/components/ui/Spinner";
import { getErrorMessage } from "@/lib/errors";

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login: saveAuthSession } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await authService.register({ email, name, password });
      saveAuthSession(response.user, response.token);
      router.push('/home');
    } catch (err) {
      setError(getErrorMessage(err, 'We could not start your story. Please try again.'));
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-up flex w-full flex-col gap-6 rounded-2xl border border-line/30 bg-paper p-6 shadow-[0_18px_50px_-28px_rgba(107,94,81,0.45)] sm:p-10"
    >
      <div className="flex flex-col gap-5">
        <div className="flex w-full flex-col gap-1.5">
          <label
            htmlFor="register-name"
            className="font-[family-name:var(--font-inter)] text-[13px] font-medium leading-[13px] tracking-[0.65px] text-foreground"
          >
            NAME
          </label>
          <div className="border-b border-line/80 transition-colors duration-200 focus-within:border-primary">
            <input
              id="register-name"
              name="name"
              autoComplete="name"
              placeholder="Your name or nickname"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              aria-required="true"
              className="w-full border-none bg-transparent py-3 pl-3 pr-3 font-[family-name:var(--font-garamond)] text-[17px] text-foreground outline-none placeholder:text-line/70"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1.5">
          <label
            htmlFor="register-email"
            className="font-[family-name:var(--font-inter)] text-[13px] font-medium leading-[13px] tracking-[0.65px] text-foreground"
          >
            EMAIL ADDRESS
          </label>
          <div className="border-b border-line/80 transition-colors duration-200 focus-within:border-primary">
            <input
              id="register-email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-required="true"
              className="w-full border-none bg-transparent py-3 pl-3 pr-3 font-[family-name:var(--font-garamond)] text-[17px] text-foreground outline-none placeholder:text-line/70"
            />
          </div>
        </div>

        <PasswordField
          id="register-password"
          name="password"
          label="PASSWORD"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />

        <img
          className="h-10 w-full object-contain opacity-70"
          alt=""
          src="/icons/decor-divider.svg"
          aria-hidden="true"
        />

        {error && (
          <p
            role="alert"
            className="animate-fade-in rounded-lg bg-blush/70 px-4 py-3 font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-primary"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring motion-press group flex w-full items-center justify-center gap-2 rounded-xl bg-primary p-4 shadow-[0_4px_6px_-4px_#57001333,0_10px_15px_-3px_#57001333] transition-all duration-200 hover:bg-primary-deep hover:shadow-[0_12px_24px_-12px_#57001380] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting && <Spinner />}
          <span className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[2.6px] text-white">
            {isSubmitting ? "BEGINNING..." : "BEGIN YOUR JOURNEY"}
          </span>
        </button>
      </div>

      <p className="w-full font-[family-name:var(--font-inter)] text-[11px] font-semibold leading-relaxed tracking-[0.88px] text-foreground/70">
        By beginning, you agree to cherish the digital heirlooms created here.
      </p>
    </form>
  );
};
