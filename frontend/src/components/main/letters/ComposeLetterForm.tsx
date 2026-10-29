'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateLetter } from '@/hooks/letter/useCreateLetter';
import { useLetterDraft, type LetterDraftController } from '@/hooks/letter/useLetterDraft';
import type { User } from '@/types/auth.types';
import type { LetterDraft } from '@/types/letter.types';
import { getErrorMessage } from '@/lib/errors';
import { PageLoader } from '@/components/ui/PageLoader';
import { Spinner } from '@/components/ui/Spinner';

interface ComposeLetterFormProps {
  user: User;
}

interface ComposeLetterEditorProps extends ComposeLetterFormProps {
  initialDraft: LetterDraft | null;
  autosave: LetterDraftController;
}

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read image'));
    reader.readAsDataURL(file);
  });

const readFiles = (files: File[]): Promise<string[]> =>
  Promise.all(files.map(readFileAsDataUrl));

const serializeDraft = (
  draft: Pick<LetterDraft, 'recipientId' | 'title' | 'content' | 'spotifyUrl' | 'images'>
) =>
  JSON.stringify({
    recipientId: draft.recipientId,
    title: draft.title,
    content: draft.content,
    spotifyUrl: draft.spotifyUrl,
    images: draft.images.map((file) => [file.name, file.size, file.lastModified, file.type]),
  });

export const ComposeLetterForm = ({ user }: ComposeLetterFormProps) => {
  const { restoredDraft, isLoadingDraft, ...autosave } = useLetterDraft(user.id);

  if (isLoadingDraft) {
    return <PageLoader label="Checking for a saved draft..." />;
  }

  return <ComposeLetterEditor user={user} initialDraft={restoredDraft} autosave={autosave} />;
};

const ComposeLetterEditor = ({ user, initialDraft, autosave }: ComposeLetterEditorProps) => {
  const router = useRouter();
  const { createLetter, loading: isSubmitting, error } = useCreateLetter();
  const {
    status: draftStatus,
    queueSave,
    saveNow,
    discardDraft,
    suspend,
    resume,
  } = autosave;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultRecipientId = user.partner?.id ?? user.id;
  const restoredRecipientId =
    initialDraft &&
    (initialDraft.recipientId === user.id || initialDraft.recipientId === user.partner?.id)
      ? initialDraft.recipientId
      : defaultRecipientId;

  const [recipientId, setRecipientId] = useState(restoredRecipientId);
  const [title, setTitle] = useState(initialDraft?.title ?? '');
  const [content, setContent] = useState(initialDraft?.content ?? '');
  const [spotifyUrl, setSpotifyUrl] = useState(initialDraft?.spotifyUrl ?? '');
  const [images, setImages] = useState<File[]>(initialDraft?.images ?? []);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [localError, setLocalError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(Boolean(initialDraft));

  const draftSnapshotRef = useRef(initialDraft ? serializeDraft(initialDraft) : '');

  useEffect(() => {
    if (!initialDraft || initialDraft.images.length === 0) return;

    let cancelled = false;
    void readFiles(initialDraft.images)
      .then((previews) => {
        if (!cancelled) setImagePreviews(previews);
      })
      .catch(() => {
        if (!cancelled) setLocalError('Some restored photos could not be previewed.');
      });

    return () => {
      cancelled = true;
    };
  }, [initialDraft]);

  useEffect(() => {
    if (isSubmitting) return;

    const hasContent =
      title.trim() !== '' ||
      content.trim() !== '' ||
      spotifyUrl.trim() !== '' ||
      images.length > 0;

    if (!hasContent) {
      draftSnapshotRef.current = '';
      void discardDraft();
      return;
    }

    const snapshot = serializeDraft({ recipientId, title, content, spotifyUrl, images });
    if (snapshot === draftSnapshotRef.current) return;

    draftSnapshotRef.current = snapshot;
    queueSave({
      version: 1,
      userId: user.id,
      recipientId,
      title,
      content,
      spotifyUrl,
      images,
      updatedAt: Date.now(),
    });
  }, [
    title,
    content,
    spotifyUrl,
    recipientId,
    images,
    isSubmitting,
    user.id,
    queueSave,
    discardDraft,
  ]);

  const addFiles = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      const previews = await readFiles(files);
      setImages((prev) => [...prev, ...files]);
      setImagePreviews((prev) => [...prev, ...previews]);
    } catch {
      setLocalError('One of those photos could not be added. Please try another.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void addFiles(e.target.files ? Array.from(e.target.files) : []);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    void addFiles(Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/')));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleStartFresh = () => {
    setRecipientId(defaultRecipientId);
    setTitle('');
    setContent('');
    setSpotifyUrl('');
    setImages([]);
    setImagePreviews([]);
    setLocalError('');
    setHasRestoredDraft(false);
    draftSnapshotRef.current = '';
    void discardDraft();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!title.trim()) {
      setLocalError('Please enter a title');
      return;
    }
    if (!content.trim()) {
      setLocalError('Please write something');
      return;
    }

    await suspend();

    try {
      await createLetter(
        {
          toUserId: recipientId,
          title,
          content,
          spotifyUrl: spotifyUrl || undefined,
        },
        images.length > 0 ? images : undefined
      );

      await discardDraft();
      setHasRestoredDraft(false);
      router.push('/letters');
    } catch (err) {
      resume();
      setLocalError(getErrorMessage(err, 'Failed to send letter. Please try again.'));
    }
  };

  const displayError = localError || error;

  const fieldClass =
    'w-full rounded-none border-b border-[#6b7280] bg-transparent px-3 py-2 font-[family-name:var(--font-garamond)] text-[17px] text-foreground outline-none transition-colors duration-200 placeholder:text-line/60 focus:border-primary';

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[896px] flex-col gap-8">
      {hasRestoredDraft && (
        <div className="animate-fade-in flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line/40 bg-panel px-4 py-3">
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-foreground">
            Draft restored from your last visit.
          </p>
          <button
            type="button"
            onClick={handleStartFresh}
            className="focus-ring rounded font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-primary transition-colors duration-200 hover:text-primary-deep hover:underline"
          >
            Start fresh
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="recipient" className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-foreground">
          TO:
        </label>
        <select
          id="recipient"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="focus-ring flex max-w-full items-center gap-2 rounded-xl bg-panel-deep px-3 py-1.5 font-[family-name:var(--font-garamond)] text-[16px] font-bold text-primary outline-none transition-colors duration-200 hover:bg-[#e5e5d8]"
        >
          {user.partner && (
            <option value={user.partner.id}>{user.partner.name} (Partner)</option>
          )}
          <option value={user.id}>{user.name} (Myself)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-foreground">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your thoughts..."
          required
          className="border-b border-solid border-[#6b7280] bg-transparent px-3 py-2 font-[family-name:var(--font-playfair)] text-xl font-semibold text-ink outline-none transition-colors duration-200 placeholder-[#e0bfbf80] focus:border-primary sm:text-2xl"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-foreground">
          Your Letter
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write from the heart..."
          rows={12}
          required
          className={`${fieldClass} resize-y leading-relaxed`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="spotify" className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-foreground">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2.33333 10.5C1.69167 10.5 1.14236 10.2715 0.685417 9.81458C0.228472 9.35764 0 8.80833 0 8.16667C0 7.525 0.228472 6.97569 0.685417 6.51875C1.14236 6.06181 1.69167 5.83333 2.33333 5.83333C2.55694 5.83333 2.76354 5.86007 2.95312 5.91354C3.14271 5.96701 3.325 6.04722 3.5 6.15417V0H7V2.33333H4.66667V8.16667C4.66667 8.80833 4.43819 9.35764 3.98125 9.81458C3.52431 10.2715 2.975 10.5 2.33333 10.5Z" fill="#584141" />
          </svg>
          A Song For This Moment
        </label>
        <input
          id="spotify"
          type="text"
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
          placeholder="Spotify link..."
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-foreground">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M1.16667 10.5C0.845833 10.5 0.571181 10.3858 0.342708 10.1573C0.114236 9.92882 0 9.65417 0 9.33333V1.16667C0 0.845833 0.114236 0.571181 0.342708 0.342708C0.571181 0.114236 0.845833 0 1.16667 0H9.33333C9.65417 0 9.92882 0.114236 10.1573 0.342708C10.3858 0.571181 10.5 0.845833 10.5 1.16667V9.33333C10.5 9.65417 10.3858 9.92882 10.1573 10.1573C9.92882 10.3858 9.65417 10.5 9.33333 10.5H1.16667ZM1.16667 9.33333H9.33333V1.16667H1.16667V9.33333ZM1.75 8.16667H8.75L6.5625 5.25L4.8125 7.58333L3.5 5.83333L1.75 8.16667ZM1.16667 9.33333V1.16667V9.33333Z" fill="#584141" />
          </svg>
          Tuck In A Photograph
        </label>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="group relative flex h-32 w-full items-center justify-center overflow-hidden rounded-lg border border-line/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="focus-ring absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink/60 text-sm text-white opacity-100 transition-all duration-200 hover:bg-ink/80 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col gap-3 rounded-lg border border-dashed p-4 transition-colors duration-200 ${
            isDragging ? 'border-primary bg-blush/20' : 'border-line/60 bg-paper'
          }`}
        >
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg py-4 transition-colors duration-200 hover:bg-panel/60">
            <span className="font-[family-name:var(--font-garamond)] text-[13px] font-medium tracking-[0.65px] text-muted">
              Click to upload or drag images here
            </span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
              aria-label="Upload images"
            />
          </label>
        </div>
      </div>

      {displayError && (
        <div role="alert" className="animate-fade-in rounded-lg bg-blush px-4 py-3 font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-primary">
          {displayError}
        </div>
      )}

      <div className="flex w-full flex-col-reverse items-stretch gap-4 border-t border-line/30 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          aria-live="polite"
          className={`flex items-center gap-1 font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.88px] ${
            draftStatus === 'error' ? 'text-primary' : 'text-foreground/60'
          }`}
        >
          {draftStatus === 'saving' ? (
            <>
              <Spinner className="h-3 w-3" />
              <span>Auto-saving…</span>
            </>
          ) : draftStatus === 'error' ? (
            <>
              <span>Couldn&apos;t save your draft.</span>
              <button
                type="button"
                onClick={saveNow}
                className="focus-ring rounded underline underline-offset-2 transition-colors duration-200 hover:text-primary"
              >
                Retry
              </button>
            </>
          ) : draftStatus === 'saved' ? (
            <>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3.2 7.2L0.8 4.8L1.6 4L3.2 5.6L7.4 1.4L8.2 2.2L3.2 7.2Z" fill="#2D5016" />
              </svg>
              <span>Saved</span>
            </>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring motion-press flex w-full items-center justify-center gap-3 rounded-xl bg-primary-deep px-8 py-4 font-[family-name:var(--font-inter)] text-[13px] font-medium uppercase tracking-[2.6px] text-[#ff828a] transition-all duration-200 hover:bg-[#6a001a] hover:shadow-[0_16px_30px_-20px_#800020] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
        >
          {isSubmitting ? 'Sending...' : 'Seal and Send'}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 0L19.05 5.4C19.35 5.58333 19.5833 5.83333 19.75 6.15C19.9167 6.46667 20 6.8 20 7.15V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H2C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V7.15C0 6.8 0.0833333 6.46667 0.25 6.15C0.416667 5.83333 0.65 5.58333 0.95 5.4L10 0ZM10 11.65L17.8 7L10 2.35L2.2 7L10 11.65Z" fill="#FFDADA" />
          </svg>
        </button>
      </div>
    </form>
  );
};
