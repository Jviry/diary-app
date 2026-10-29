'use client';

import Link from 'next/link';
import { IncomingRequests } from '@/components/main/partner/IncomingRequests';
import { FindPartnerCard } from '@/components/main/partner/FindPartnerCard';
import { useManagePartner } from '@/hooks/partner/useManagePartner';
import { Layout } from '@/components/layout/Layout';

export default function ManagePartnerPage() {
  const {
    toUserId,
    setToUserId,
    receivedRequests,
    loading,
    error,
    sendRequest,
    acceptRequest,
    declineRequest,
  } = useManagePartner();

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
        <Link
          href="/profile"
          className="focus-ring flex w-fit items-center gap-2 rounded-sm font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-foreground transition-colors duration-200 hover:text-primary"
        >
          <span aria-hidden="true">←</span> Back to Profile
        </Link>

        <div className="flex animate-fade-up flex-col gap-2">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-primary sm:text-5xl">
            Manage Partner
          </h1>
          <p className="font-[family-name:var(--font-garamond)] text-[17px] leading-relaxed text-foreground sm:text-lg">
            Manage your digital sanctuary. Invite someone to share letters, memories, and slow moments.
          </p>
        </div>

        <FindPartnerCard
          toUserId={toUserId}
          onChange={setToUserId}
          onSend={sendRequest}
          loading={loading}
          error={error}
        />

        <IncomingRequests
          requests={receivedRequests}
          onAccept={acceptRequest}
          onDecline={declineRequest}
        />
      </div>
    </Layout>
  );
}
