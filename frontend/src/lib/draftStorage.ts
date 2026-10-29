import type { LetterDraft } from '@/types/letter.types';

const DB_NAME = 'diary-app';
const DB_VERSION = 1;
const STORE_NAME = 'letter-drafts';

let dbPromise: Promise<IDBDatabase | null> | null = null;

const openDatabase = (): Promise<IDBDatabase | null> => {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.resolve(null);
  }

  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'userId' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });

  return dbPromise;
};

const waitForTransaction = (transaction: IDBTransaction): Promise<void> =>
  new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('Draft storage failed'));
    transaction.onabort = () => reject(transaction.error ?? new Error('Draft storage aborted'));
  });

export const getDraft = async (userId: string): Promise<LetterDraft | null> => {
  const db = await openDatabase();
  if (!db) return null;

  try {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const request = transaction.objectStore(STORE_NAME).get(userId);
    const draft = await new Promise<LetterDraft | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as LetterDraft | undefined);
      request.onerror = () => reject(request.error ?? new Error('Failed to read draft'));
    });

    return draft ?? null;
  } catch {
    return null;
  }
};

export const saveDraft = async (draft: LetterDraft): Promise<void> => {
  const db = await openDatabase();
  if (!db) throw new Error('Draft storage is unavailable');

  const transaction = db.transaction(STORE_NAME, 'readwrite');
  transaction.objectStore(STORE_NAME).put(draft);
  await waitForTransaction(transaction);
};

export const deleteDraft = async (userId: string): Promise<void> => {
  const db = await openDatabase();
  if (!db) return;

  try {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).delete(userId);
    await waitForTransaction(transaction);
  } catch {
    // Clearing a draft is best-effort; a stale draft is recoverable.
  }
};
