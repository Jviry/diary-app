'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { deleteDraft, getDraft, saveDraft } from '@/lib/draftStorage';
import type { LetterDraft } from '@/types/letter.types';

const AUTOSAVE_DELAY = 1200;
const MIN_SAVING_STATUS = 700;
const SAVED_STATUS_DURATION = 2500;

export type DraftStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface LetterDraftController {
  status: DraftStatus;
  lastSavedAt: number | null;
  queueSave: (draft: LetterDraft) => void;
  saveNow: () => void;
  discardDraft: () => Promise<void>;
  suspend: () => Promise<void>;
  resume: () => void;
}

interface UseLetterDraftResult extends LetterDraftController {
  restoredDraft: LetterDraft | null;
  isLoadingDraft: boolean;
}

export function useLetterDraft(userId: string): UseLetterDraftResult {
  const [restoredDraft, setRestoredDraft] = useState<LetterDraft | null>(null);
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);
  const [status, setStatus] = useState<DraftStatus>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingDraftRef = useRef<LetterDraft | null>(null);
  const revisionRef = useRef(0);
  const suspendedRef = useRef(false);
  const unmountedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const flush = useCallback(async () => {
    clearTimer();

    const draft = pendingDraftRef.current;
    if (!draft || suspendedRef.current || unmountedRef.current) return;

    const revision = revisionRef.current;
    pendingDraftRef.current = null;
    const savingStartedAt = Date.now();
    setStatus('saving');

    try {
      await saveDraft(draft);

      const remainingSavingTime = MIN_SAVING_STATUS - (Date.now() - savingStartedAt);
      if (remainingSavingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingSavingTime));
      }

      if (unmountedRef.current || suspendedRef.current || revision !== revisionRef.current) {
        return;
      }

      setLastSavedAt(draft.updatedAt);
      setStatus('saved');

      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => {
        if (!unmountedRef.current) {
          setStatus((current) => (current === 'saved' ? 'idle' : current));
        }
      }, SAVED_STATUS_DURATION);
    } catch {
      if (!unmountedRef.current && revision === revisionRef.current) {
        pendingDraftRef.current = draft;
        setStatus('error');
      }
    }
  }, [clearTimer]);

  const queueSave = useCallback(
    (draft: LetterDraft) => {
      if (suspendedRef.current || unmountedRef.current) return;

      pendingDraftRef.current = draft;
      revisionRef.current += 1;
      clearTimer();

      timerRef.current = setTimeout(() => {
        void flush();
      }, AUTOSAVE_DELAY);
    },
    [clearTimer, flush]
  );

  const saveNow = useCallback(() => {
    void flush();
  }, [flush]);

  const discardDraft = useCallback(async () => {
    clearTimer();
    pendingDraftRef.current = null;
    revisionRef.current += 1;
    setRestoredDraft(null);
    setLastSavedAt(null);
    setStatus('idle');

    await deleteDraft(userId);
  }, [clearTimer, userId]);

  const suspend = useCallback(async () => {
    suspendedRef.current = true;
    clearTimer();

    const draft = pendingDraftRef.current;
    pendingDraftRef.current = null;
    revisionRef.current += 1;

    if (!draft) return;

    try {
      await saveDraft(draft);
    } catch {
      // Sending can still proceed; the in-memory letter is intact.
    }
  }, [clearTimer]);

  const resume = useCallback(() => {
    suspendedRef.current = false;
  }, []);

  useEffect(() => {
    let cancelled = false;

    void getDraft(userId).then((draft) => {
      if (cancelled) return;

      setRestoredDraft(draft);
      setLastSavedAt(draft?.updatedAt ?? null);
      setIsLoadingDraft(false);
    });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    unmountedRef.current = false;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') void flush();
    };
    const handlePageHide = () => {
      void flush();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      unmountedRef.current = true;
      clearTimer();

      const pendingDraft = pendingDraftRef.current;
      pendingDraftRef.current = null;
      if (pendingDraft) {
        void saveDraft(pendingDraft).catch(() => {
          // Best-effort save when leaving the page.
        });
      }

      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [clearTimer, flush]);

  return {
    restoredDraft,
    isLoadingDraft,
    status,
    lastSavedAt,
    queueSave,
    saveNow,
    discardDraft,
    suspend,
    resume,
  };
}
