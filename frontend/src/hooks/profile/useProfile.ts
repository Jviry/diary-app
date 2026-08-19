'use client';

import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { partnerService } from '@/services/partner.service';

export const useProfile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [removingPartner, setRemovingPartner] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  const handleRemovePartner = async () => {
    if (!confirm('Are you sure you want to remove your partner?')) return;
    setRemovingPartner(true);
    try {
      await partnerService.remove();
      window.location.reload();
    } catch (error) {
      console.error('Failed to remove partner', error);
    } finally {
      setRemovingPartner(false);
    }
  }

  const handleCopyId = () => {
    if (user?.id) navigator.clipboard.writeText(user.id);
  }

  return { user, handleLogout, handleRemovePartner, handleCopyId, removingPartner };
}
