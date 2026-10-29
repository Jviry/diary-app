'use client';

import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { partnerService } from '@/services/partner.service';

export const useProfile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [removingPartner, setRemovingPartner] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleRemovePartner = async () => {
    setRemoveError(null);
    setRemovingPartner(true);
    try {
      await partnerService.remove();
      window.location.reload();
    } catch (error) {
      console.error('Failed to remove partner', error);
      setRemoveError('Failed to remove partner. Please try again.');
    } finally {
      setRemovingPartner(false);
    }
  };

  const handleCopyId = async () => {
    if (!user?.id) return;

    try {
      await navigator.clipboard.writeText(user.id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy user id', error);
    }
  };

  const clearRemoveError = () => setRemoveError(null);

  return {
    user,
    handleLogout,
    handleRemovePartner,
    handleCopyId,
    removingPartner,
    removeError,
    clearRemoveError,
    copied,
  };
};
