interface ProfileActionsProps {
  onLogout: () => void;
}

export const ProfileActions = ({ onLogout }: ProfileActionsProps) => {
  return (
    <div className="flex animate-fade-up items-center justify-center gap-6 [animation-delay:180ms]">
      <button
        type="button"
        onClick={onLogout}
        className="focus-ring flex items-center gap-2 rounded-sm font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[1.3px] text-primary transition-all duration-200 hover:underline hover:underline-offset-4"
      >
        <img src="/icons/logout.svg" alt="" aria-hidden="true" className="h-4 w-4" />
        LOGOUT
      </button>
    </div>
  );
};
