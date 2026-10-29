'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useAuth } from '@/context/auth.context';
import { letterService } from '@/services/letter.service';
import { Letter, LetterImage } from '@/types/letter.types';
import { WriteLetterFab } from './WriteLetterFab';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface LetterProps {
  letter: Letter;
}

export const LetterComponent = ({ letter }: LetterProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const isSender = user?.id === letter.fromUserId;
  const images = letter.images || [];

  const getImageUrl = (img: LetterImage) => {
    if (!img) return '';
    if (img.url) return img.url;
    if (img.s3Key && (img.s3Key.startsWith('http://') || img.s3Key.startsWith('https://'))) {
      return img.s3Key;
    }
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://leqqocvfckabhmnjkdsw.supabase.co';
    const cleanKey = img.s3Key ? img.s3Key.replace(/^\/+/, '') : '';
    return `${baseUrl}/storage/v1/object/public/letter-images/${cleanKey}`;
  };

  const handleDelete = async () => {
    try {
      setDeleteError(null);
      setIsDeleting(true);
      await letterService.delete(letter.id);
      router.push('/letters');
    } catch (err) {
      console.error('Failed to delete letter:', err);
      setDeleteError('Failed to delete letter. Please try again.');
      setIsDeleting(false);
    }
  };

  const handleNextImage = useCallback(() => {
    if (activeImageIndex === null || images.length === 0) return;
    setActiveImageIndex((prev) => (prev! + 1) % images.length);
  }, [activeImageIndex, images.length]);

  const handlePrevImage = useCallback(() => {
    if (activeImageIndex === null || images.length === 0) return;
    setActiveImageIndex((prev) => (prev! - 1 + images.length) % images.length);
  }, [activeImageIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handleNextImage, handlePrevImage]);

  useEffect(() => {
    if (activeImageIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeImageIndex]);

  const rotationClasses = [
    'rotate-[-3deg]',
    'rotate-[4deg]',
    'rotate-[-2deg]',
    'rotate-[3deg]',
    'rotate-[-4deg]',
  ];

  return (
    <div className="relative flex w-full flex-col items-center px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/letters"
            className="focus-ring inline-flex items-center gap-2 rounded-sm font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-foreground transition-colors duration-200 hover:text-primary"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7.5 15L0 7.5L7.5 0L8.83125 1.33125L2.6625 7.5L8.83125 13.6687L7.5 15Z" fill="currentColor" />
            </svg>
            BACK TO ARCHIVE
          </Link>

          {isSender && (
            <button
              type="button"
              onClick={() => {
                setDeleteError(null);
                setShowDeleteConfirm(true);
              }}
              className="focus-ring flex items-center gap-2 rounded-sm font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-foreground/60 transition-colors duration-200 hover:text-primary"
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M2.25 13.5C1.8375 13.5 1.48438 13.3531 1.19062 13.0594C0.896875 12.7656 0.75 12.4125 0.75 12V2.25H0V0.75H3.75V0H8.25V0.75H12V2.25H11.25V12C11.25 12.4125 11.1031 12.7656 10.8094 13.0594C10.5156 13.3531 10.1625 13.5 9.75 13.5H2.25ZM9.75 2.25H2.25V12H9.75V2.25ZM3.75 10.5H5.25V3.75H3.75V10.5ZM6.75 10.5H8.25V3.75H6.75V10.5ZM2.25 2.25V12V2.25Z"
                  fill="currentColor"
                />
              </svg>
              DELETE LETTER
            </button>
          )}
        </div>

        <article className="relative flex w-full animate-fade-up flex-col gap-8 rounded-2xl border border-line/40 bg-paper p-6 shadow-[0_4px_20px_-2px_rgba(107,94,81,0.10),0_2px_10px_-2px_rgba(107,94,81,0.05)] sm:gap-10 sm:p-10 lg:p-16">
          <header className="flex flex-col justify-between gap-4 border-b border-line/30 pb-6 sm:flex-row sm:items-end sm:pb-8">
            <div className="flex min-w-0 flex-col gap-2">
              <h1 className="break-words font-[family-name:var(--font-playfair)] text-3xl font-normal leading-tight text-primary sm:text-4xl lg:text-5xl">
                {letter.title}
              </h1>
              <p className="break-words font-[family-name:var(--font-garamond)] text-lg italic text-foreground">
                Dearest, from {letter.fromUser?.name || 'Someone Special'}
              </p>
            </div>
            <div className="self-start rounded-full bg-panel-deep px-4 py-1.5 sm:self-auto">
              <span className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-wide text-foreground">
                {format(new Date(letter.createdAt), 'MMMM d, yyyy')}
              </span>
            </div>
          </header>

          <div className="flex flex-col gap-6 whitespace-pre-line break-words font-[family-name:var(--font-garamond)] text-lg leading-relaxed text-ink">
            {letter.content}

            <div className="flex flex-col gap-1 pt-6">
              <p className="italic text-ink">Yours always,</p>
              <p className="break-words font-[family-name:var(--font-playfair)] text-3xl text-primary">
                {letter.fromUser?.name || 'Elena'}
              </p>
            </div>
          </div>

          {(letter.spotifyTrackId || images.length > 0) && (
            <div className="flex w-full flex-col items-start justify-between gap-8 border-t border-line/30 pt-6 md:flex-row">
              {images.length > 0 && (
                <div className="flex w-full flex-col gap-3 md:w-auto">
                  <span className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-foreground/70">
                    ATTACHED MEMORIES ({images.length})
                  </span>

                  <div className="relative flex h-[290px] w-full items-center justify-center sm:w-[260px]">
                    {images.map((img, idx) => {
                      const rotation = rotationClasses[idx % rotationClasses.length];
                      const offsetStyle = {
                        top: `${idx * 10}px`,
                        left: `${idx * 10}px`,
                        zIndex: images.length - idx,
                      };

                      return (
                        <button
                          key={img.id || idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          style={offsetStyle}
                          className={`focus-ring absolute w-48 rounded-sm border border-line/30 bg-paper p-3 shadow-xl transition-all duration-300 hover:z-30 hover:scale-105 sm:w-52 ${rotation}`}
                          aria-label={`Open memory ${idx + 1}`}
                        >
                          <span className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-sm border border-line/20 bg-panel-deep">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={getImageUrl(img)}
                              alt={`Letter attachment ${idx + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                const parent = (e.target as HTMLImageElement).parentElement;
                                if (parent && !parent.querySelector('.img-fallback')) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'img-fallback flex flex-col items-center justify-center p-4 text-center text-[#584141] text-xs font-[family-name:var(--font-garamond)]';
                                  fallback.innerHTML = `<svg class="w-8 h-8 opacity-40 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>Memory #${idx + 1}`;
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </span>
                          <span className="block pt-2 text-center font-[family-name:var(--font-garamond)] text-xs italic text-muted">
                            Memory #{idx + 1}
                          </span>
                        </button>
                      );
                    })}

                    {images.length > 1 && (
                      <span className="absolute -bottom-2 right-0 z-40 rounded-full bg-primary px-2.5 py-1 font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-wider text-white shadow-md">
                        Click to view all {images.length}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {letter.spotifyTrackId && (
                <div className="flex w-full flex-col gap-3 md:max-w-xs">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icons/music.svg" alt="" aria-hidden="true" className="h-4 w-3.5" />
                    <span className="font-[family-name:var(--font-inter)] text-xs font-semibold uppercase tracking-wider text-primary">
                      THE ATMOSPHERE
                    </span>
                  </div>
                  <div className="w-full overflow-hidden rounded-lg border border-primary/10 shadow-sm">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${letter.spotifyTrackId}`}
                      width="100%"
                      height="100"
                      style={{ border: 'none' }}
                      allow="encrypted-media"
                      loading="lazy"
                      title="Spotify track attached to this letter"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center pt-4 opacity-25">
            <div className="h-px w-32 bg-primary" />
          </div>
        </article>

        <WriteLetterFab />
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete Letter?"
        description="Are you sure you want to delete this letter? This action cannot be undone."
        confirmLabel="Delete Letter"
        busy={isDeleting}
        error={deleteError}
        onConfirm={handleDelete}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteError(null);
        }}
      />

      {activeImageIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 z-[60] flex animate-fade-in flex-col items-center justify-center bg-ink/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Letter image viewer"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="focus-ring absolute right-4 top-4 rounded-full p-2 text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
            aria-label="Close image viewer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative flex max-h-[85vh] w-full max-w-2xl items-center justify-center animate-scale-in"
            onClick={(event) => event.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="focus-ring absolute left-2 z-10 rounded-full bg-ink/40 p-3 text-white/80 transition-all duration-200 hover:bg-ink/70 hover:text-white active:scale-90 sm:-left-12"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div className="flex max-w-full flex-col items-center gap-4 rounded-lg border border-line/30 bg-paper p-4 shadow-2xl sm:p-6">
              <div className="relative flex max-h-[65vh] min-h-[300px] w-full items-center justify-center overflow-hidden rounded-sm bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getImageUrl(images[activeImageIndex])}
                  alt={`Attachment ${activeImageIndex + 1}`}
                  className="max-h-[65vh] max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('.modal-fallback')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'modal-fallback flex flex-col items-center justify-center p-8 text-center text-white/70 text-sm font-[family-name:var(--font-garamond)]';
                      fallback.innerHTML = `<svg class="w-12 h-12 opacity-50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>Memory #${activeImageIndex! + 1}`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>

              <div className="flex w-full items-center justify-between gap-4 pt-1 font-[family-name:var(--font-garamond)] text-sm italic text-foreground">
                <span>Memory #{activeImageIndex + 1}</span>
                <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-muted">
                  {activeImageIndex + 1} of {images.length}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="focus-ring absolute right-2 z-10 rounded-full bg-ink/40 p-3 text-white/80 transition-all duration-200 hover:bg-ink/70 hover:text-white active:scale-90 sm:-right-12"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
