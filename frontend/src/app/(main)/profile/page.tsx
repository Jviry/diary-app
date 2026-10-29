'use client';

import { useState } from 'react';
import { UserCard } from '@/components/main/profile/UserCard';
import { PartnerCard } from '@/components/main/profile/PartnerCard';
import { ProfileActions } from '@/components/main/profile/ProfileActions';
import { useProfile } from '@/hooks/profile/useProfile';
import { Layout } from '@/components/layout/Layout';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { PageLoader } from '@/components/ui/PageLoader';

export default function ProfilePage() {
  const {
    user,
    handleLogout,
    handleRemovePartner,
    handleCopyId,
    removingPartner,
    removeError,
    clearRemoveError,
    copied,
  } = useProfile();
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <PageLoader label="Finding your page..." />
      </div>
    );
  }

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-[672px] flex-col gap-6 px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
        <div className="flex animate-fade-up flex-col gap-2">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-primary sm:text-5xl">
            Profile
          </h1>
          <p className="font-[family-name:var(--font-garamond)] text-lg italic text-foreground sm:text-xl">
            Manage your account and partner.
          </p>
        </div>

        <UserCard name={user.name} id={user.id} onCopy={handleCopyId} copied={copied} />

        <PartnerCard
          partner={user.partner}
          onRemove={() => {
            clearRemoveError();
            setShowRemoveConfirm(true);
          }}
          removing={removingPartner}
        />

        <ProfileActions onLogout={handleLogout} />
      </div>

      <ConfirmDialog
        open={showRemoveConfirm}
        title="Remove Partner?"
        description="You will stop sharing letters and pings with this person. Your existing letters will remain in your archive."
        confirmLabel="Remove Partner"
        busy={removingPartner}
        error={removeError}
        onConfirm={handleRemovePartner}
        onClose={() => {
          setShowRemoveConfirm(false);
          clearRemoveError();
        }}
      />
    </Layout>
  );
}
