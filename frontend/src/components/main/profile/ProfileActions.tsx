interface ProfileActionsProps {
  onLogout: () => void
}

export const ProfileActions = ({ onLogout }: ProfileActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        type="button"
        className="flex items-center gap-2 font-[family-name:var(--font-inter)] font-medium text-[#584141] text-[13px] tracking-[1.30px] hover:text-[#570013] transition-colors duration-200"
      >
        <img src="/icons/settings.svg" alt="" aria-hidden="true" className="w-4 h-4" />
        SETTINGS
      </button>
      <span className="text-[#e0bfbf]">•</span>
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 font-[family-name:var(--font-inter)] font-medium text-[#570013] text-[13px] tracking-[1.30px] hover:underline transition-all duration-200"
      >
        <img src="/icons/logout.svg" alt="" aria-hidden="true" className="w-4 h-4" />
        LOGOUT
      </button>
    </div>
  )
}
