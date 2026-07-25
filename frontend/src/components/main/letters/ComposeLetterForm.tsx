'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateLetter } from '@/hooks/letter/useCreateLetter';
import type { User } from '@/types/auth.types';

interface ComposeLetterFormProps {
  user: User;
}

export const ComposeLetterForm = ({ user }: ComposeLetterFormProps) => {
  const router = useRouter();
  const { createLetter, loading: isSubmitting, error } = useCreateLetter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [recipientId, setRecipientId] = useState(user.partnerId || user.id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [localError, setLocalError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, file]);
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      router.push('/letters');
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to send letter');
    }
  };

  const displayError = localError || error;

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[896px] flex-col gap-8">
      <div className="flex items-center gap-3">
        <label htmlFor="recipient" className="font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.65px] text-[#584141]">
          TO:
        </label>
        <select
          id="recipient"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="flex items-center gap-2 rounded-xl bg-[#e9e9dd] px-3 py-1 font-[family-name:var(--font-garamond)] text-[16px] font-bold text-[#570013] focus:outline-none"
        >
          {user.partnerId && (
            <option value={user.partnerId}>Partner</option>
          )}
          <option value={user.id}>Myself</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-[#584141]">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your thoughts..."
          className="border-b border-solid border-[#6b7280] bg-white px-3 py-2 font-[family-name:var(--font-playfair)] text-2xl font-semibold placeholder-[#e0bfbf80] focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-[#584141]">
          Your Letter
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write from the heart..."
          rows={12}
          className="border-b border-solid border-[#6b7280] bg-white px-3 py-2 font-[family-name:var(--font-garamond)] text-[17px] font-normal placeholder-[#e0bfbf66] focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="spotify" className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-[#584141]">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          className="border-b border-solid border-[#6b7280] bg-white px-3 py-2 font-[family-name:var(--font-garamond)] text-[17px] placeholder-[#e0bfbf66] focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.88px] text-[#584141]">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.16667 10.5C0.845833 10.5 0.571181 10.3858 0.342708 10.1573C0.114236 9.92882 0 9.65417 0 9.33333V1.16667C0 0.845833 0.114236 0.571181 0.342708 0.342708C0.571181 0.114236 0.845833 0 1.16667 0H9.33333C9.65417 0 9.92882 0.114236 10.1573 0.342708C10.3858 0.571181 10.5 0.845833 10.5 1.16667V9.33333C10.5 9.65417 10.3858 9.92882 10.1573 10.1573C9.92882 10.3858 9.65417 10.5 9.33333 10.5H1.16667ZM1.16667 9.33333H9.33333V1.16667H1.16667V9.33333ZM1.75 8.16667H8.75L6.5625 5.25L4.8125 7.58333L3.5 5.83333L1.75 8.16667ZM1.16667 9.33333V1.16667V9.33333Z" fill="#584141" />
          </svg>
          Tuck In A Photograph
        </label>
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-75"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-3 rounded border border-dashed border-[#e0bfbf66] bg-white p-4">
          <label className="flex flex-col items-center gap-2 py-4">
            <span className="font-[family-name:var(--font-garamond)] text-[13px] font-medium tracking-[0.65px] text-[#e0bfbf]">
              Click to upload or drag images
            </span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              aria-label="Upload images"
            />
          </label>
        </div>
      </div>

      {displayError && (
        <div className="rounded bg-[#fbdbdb] px-3 py-2 font-[family-name:var(--font-inter)] text-[13px] text-[#570013]">
          {displayError}
        </div>
      )}

      <div className="flex w-full items-center justify-between border-t border-solid border-[#e0bfbf33] pt-4">
        <div className="flex items-center gap-1 font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.88px] text-[#584141] text-opacity-60">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 9C3.35 9 2.34792 8.61875 1.49375 7.85625C0.639583 7.09375 0.15 6.14167 0.025 5H1.05C1.16667 5.86667 1.55208 6.58333 2.20625 7.15C2.86042 7.71667 3.625 8 4.5 8C5.475 8 6.30208 7.66042 6.98125 6.98125C7.66042 6.30208 8 5.475 8 4.5C8 3.525 7.66042 2.69792 6.98125 2.01875C6.30208 1.33958 5.475 1 4.5 1C3.925 1 3.3875 1.13333 2.8875 1.4C2.3875 1.66667 1.96667 2.03333 1.625 2.5H3V3.5H0V0.5H1V1.675C1.425 1.14167 1.94375 0.729167 2.55625 0.4375C3.16875 0.145833 3.81667 0 4.5 0C5.125 0 5.71042 0.11875 6.25625 0.35625C6.80208 0.59375 7.27708 0.914583 7.68125 1.31875C8.08542 1.72292 8.40625 2.19792 8.64375 2.74375C8.88125 3.28958 9 3.875 9 4.5C9 5.125 8.88125 5.71042 8.64375 6.25625C8.40625 6.80208 8.08542 7.27708 7.68125 7.68125C7.27708 8.08542 6.80208 8.40625 6.25625 8.64375C5.71042 8.88125 5.125 9 4.5 9ZM5.9 6.6L4 4.7V2H5V4.3L6.6 5.9L5.9 6.6Z" fill="#584141" fillOpacity="0.6" />
          </svg>
          Draft auto-saving...
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-3 rounded-xl bg-[#800020] px-10 py-4 font-[family-name:var(--font-inter)] text-[13px] font-medium uppercase tracking-[2.6px] text-[#ff828a] hover:bg-[#6a001a] disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Seal and Send'}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0L19.05 5.4C19.35 5.58333 19.5833 5.83333 19.75 6.15C19.9167 6.46667 20 6.8 20 7.15V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H2C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V7.15C0 6.8 0.0833333 6.46667 0.25 6.15C0.416667 5.83333 0.65 5.58333 0.95 5.4L10 0ZM10 11.65L17.8 7L10 2.35L2.2 7L10 11.65Z" fill="#FFDADA" />
          </svg>
        </button>
      </div>
    </form>
  );
};
