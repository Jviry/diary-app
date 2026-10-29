"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export const PasswordField = ({
  id,
  name,
  label,
  value,
  onChange,
  autoComplete,
  placeholder = "••••••••",
  required = true,
  className,
}: PasswordFieldProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="font-[family-name:var(--font-inter)] text-[13px] font-medium leading-[13px] tracking-[0.65px] text-foreground"
      >
        {label}
      </label>
      <PasswordInput
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

type PasswordInputProps = Pick<
  PasswordFieldProps,
  "id" | "name" | "value" | "onChange" | "autoComplete" | "placeholder" | "required"
>;

export const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  autoComplete,
  placeholder = "••••••••",
  required = true,
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="group relative flex items-center border-b border-line/80 transition-colors duration-200 focus-within:border-primary">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-required={required}
        className="min-w-0 flex-1 border-none bg-transparent py-3 pl-3 pr-10 font-[family-name:var(--font-garamond)] text-[17px] text-foreground outline-none placeholder:text-line/70"
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="focus-ring absolute right-0 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-blush/50 hover:text-primary active:scale-90"
      >
        <span className="relative block h-[18px] w-[18px]" aria-hidden="true">
          <EyeIcon
            className={cn(
              "absolute inset-0 h-[18px] w-[18px] transition-all duration-200",
              visible ? "rotate-12 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
            )}
          />
          <EyeOffIcon
            className={cn(
              "absolute inset-0 h-[18px] w-[18px] transition-all duration-200",
              visible ? "rotate-0 scale-100 opacity-100" : "-rotate-12 scale-75 opacity-0"
            )}
          />
        </span>
      </button>
    </div>
  );
};

const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1.5 9S4.2 4.5 9 4.5 16.5 9 16.5 9 13.8 13.5 9 13.5 1.5 9 1.5 9Z" />
    <circle cx="9" cy="9" r="2.4" />
  </svg>
);

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1.5 9S4.2 4.5 9 4.5 16.5 9 16.5 9 13.8 13.5 9 13.5 1.5 9 1.5 9Z" />
    <circle cx="9" cy="9" r="2.4" />
    <path d="M2.5 2.5L15.5 15.5" />
  </svg>
);
