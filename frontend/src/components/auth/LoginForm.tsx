'use client';

import { useState } from "react";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { PasswordField } from "@/components/ui/PasswordField";
import { Spinner } from "@/components/ui/Spinner";
import { getErrorMessage } from "@/lib/errors";

export const LoginForm = () => {
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
      const response = await authService.login({ email, password });
      saveAuthSession(response.user, response.token);
      router.push('/home');
    } catch (err) {
      setError(getErrorMessage(err, 'We could not open your diary. Please try again.'));
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="login-title"
      className="animate-fade-up w-full rounded-2xl border border-line/30 bg-paper p-6 shadow-[0_18px_50px_-28px_rgba(107,94,81,0.45)] sm:p-10"
    >
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <h1
          id="login-title"
          className="font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-tight tracking-[-0.96px] text-primary sm:text-5xl"
        >
          Welcome back
        </h1>
        <p className="max-w-sm font-[family-name:var(--font-garamond)] text-[17px] italic leading-relaxed text-foreground sm:text-lg">
          The ink has dried, but the words wait for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-5 sm:mt-10">
        <div className="flex w-full flex-col gap-1.5">
          <label
            htmlFor="login-email"
            className="font-[family-name:var(--font-inter)] text-[13px] font-medium leading-[13px] tracking-[0.65px] text-foreground"
          >
            EMAIL ADDRESS
          </label>
          <div className="border-b border-line/80 transition-colors duration-200 focus-within:border-primary">
            <input
              id="login-email"
              name="email"
              autoComplete="email"
              placeholder="you@love.com"
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
          id="login-password"
          name="password"
          label="PASSWORD"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
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
          className="focus-ring motion-press group mt-1 flex w-full items-center justify-center gap-3 rounded-xl bg-primary p-4 shadow-[0_4px_6px_-4px_#57001333,0_10px_15px_-3px_#57001333] transition-all duration-200 hover:bg-primary-deep hover:shadow-[0_12px_24px_-12px_#57001380] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Spinner />
              <span className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[2.6px] text-white">
                OPENING...
              </span>
            </>
          ) : (
            <>
              <span className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[2.6px] text-white">
                OPEN ENVELOPE
              </span>
              <img
                className="h-[14.18px] w-[14.25px] transition-transform duration-200 group-hover:translate-x-0.5"
                alt=""
                aria-hidden="true"
                src="/icons/envelope.svg"
              />
            </>
          )}
        </button>
      </form>
    </section>
  );
};
