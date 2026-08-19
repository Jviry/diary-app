'use client'

import { UserCard } from '@/components/main/profile/UserCard'
import { PartnerCard } from '@/components/main/profile/PartnerCard'
import { ProfileActions } from '@/components/main/profile/ProfileActions'
import { useProfile } from '@/hooks/profile/useProfile'
import { Layout } from '@/components/layout/Layout'

export default function ProfilePage() {
  const { user, handleLogout, handleRemovePartner, handleCopyId, removingPartner } = useProfile()

  if (!user) return null

  return (
    <Layout>
      <div className="mx-auto flex max-w-[672px] flex-col gap-6 px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
        <div className="flex flex-col gap-2">
          <h1 className="font-[family-name:var(--font-playfair)] font-semibold text-[#570013] text-5xl">
            Profile
          </h1>
          <p className="font-[family-name:var(--font-garamond)] italic text-[#584141] text-xl">
            Manage your account and partner.
          </p>
        </div>

        <UserCard
          name={user.name}
          id={user.id}
          onCopy={handleCopyId}
        />

        <PartnerCard
          partner={user.partner}
          onRemove={handleRemovePartner}
          removing={removingPartner}
        />

        <ProfileActions onLogout={handleLogout} />
      </div>
    </Layout>
  )
}
