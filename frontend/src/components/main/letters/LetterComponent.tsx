'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useAuth } from '@/context/auth.context';
import { letterService } from '@/services/letter.service';
import { Letter, LetterImage } from '@/types/letter.types';
import { WriteLetterFab } from './WriteLetterFab';

interface LetterProps {
  letter: Letter;
}

export const LetterComponent = ({ letter }: LetterProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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
      setIsDeleting(true);
      await letterService.delete(letter.id);
      router.push('/letters');
    } catch (err) {
      console.error('Failed to delete letter:', err);
      alert('Failed to delete letter. Please try again.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
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

  const rotationClasses = [
    'rotate-[-3deg]',
    'rotate-[4deg]',
    'rotate-[-2deg]',
    'rotate-[3deg]',
    'rotate-[-4deg]',
  ];

  return (
    <div className="min-h-screen bg-[#FBFAEE] py-10 px-4 sm:px-6 lg:px-8 relative flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8 relative">

        <div className="flex items-center justify-between w-full">
          <Link
            href="/letters"
            className="flex items-center gap-2 text-[#584141] hover:text-[#570013] transition-colors font-[family-name:var(--font-inter)] text-xs font-semibold tracking-wider uppercase"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L0 7.5L7.5 0L8.83125 1.33125L2.6625 7.5L8.83125 13.6687L7.5 15Z" fill="currentColor" />
            </svg>
            BACK TO ARCHIVE
          </Link>

          {isSender && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 text-[#584141]/60 hover:text-[#570013] transition-colors font-[family-name:var(--font-inter)] text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.25 13.5C1.8375 13.5 1.48438 13.3531 1.19062 13.0594C0.896875 12.7656 0.75 12.4125 0.75 12V2.25H0V0.75H3.75V0H8.25V0.75H12V2.25H11.25V12C11.25 12.4125 11.1031 12.7656 10.8094 13.0594C10.5156 13.3531 10.1625 13.5 9.75 13.5H2.25ZM9.75 2.25H2.25V12H9.75V2.25ZM3.75 10.5H5.25V3.75H3.75V10.5ZM6.75 10.5H8.25V3.75H6.75V10.5ZM2.25 2.25V12V2.25Z"
                  fill="currentColor"
                />
              </svg>
              DELETE LETTER
            </button>
          )}
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border border-[#e0bfbf4d] flex flex-col gap-4">
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#570013]">
                Delete Letter?
              </h3>
              <p className="font-[family-name:var(--font-garamond)] text-base text-[#584141]">
                Are you sure you want to delete this letter? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-[#584141] hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#570013] hover:bg-[#3d000d] rounded-md transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        <article className="w-full bg-white rounded-sm border border-[#e0bfbf4d] shadow-[0_4px_20px_-2px_rgba(107,94,81,0.10),0_2px_10px_-2px_rgba(107,94,81,0.05)] p-8 sm:p-16 flex flex-col gap-10 relative">

          <header className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#e0bfbf33] pb-8 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl text-[#570013] font-normal leading-tight">
                {letter.title}
              </h1>
              <p className="font-[family-name:var(--font-garamond)] text-lg text-[#584141] italic">
                Dearest, from {letter.fromUser?.name || 'Someone Special'}
              </p>
            </div>
            <div className="self-start sm:self-auto bg-[#E9E9DD] px-4 py-1.5 rounded-full">
              <span className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-wide text-[#584141]">
                {format(new Date(letter.createdAt), 'MMMM d, yyyy')}
              </span>
            </div>
          </header>

          <div className="font-[family-name:var(--font-garamond)] text-lg text-[#1B1C15] leading-relaxed whitespace-pre-line flex flex-col gap-6">
            {letter.content}

            <div className="pt-6 flex flex-col gap-1">
              <p className="italic text-[#1B1C15]">Yours always,</p>
              <p className="font-[family-name:var(--font-playfair)] text-3xl text-[#570013]">
                {letter.fromUser?.name || 'Elena'}
              </p>
            </div>
          </div>

          {(letter.spotifyTrackId || images.length > 0) && (
            <div className="pt-6 border-t border-[#e0bfbf33] flex flex-col md:flex-row items-start justify-between gap-8 w-full">

              {images.length > 0 && (
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-inter)] text-xs font-semibold tracking-wider text-[#584141]/70 uppercase">
                      ATTACHED MEMORIES ({images.length})
                    </span>
                  </div>

                  <div className="relative h-[290px] w-full sm:w-[260px] flex items-center justify-center">
                    {images.map((img, idx) => {
                      const rotation = rotationClasses[idx % rotationClasses.length];
                      const offsetStyle = {
                        top: `${idx * 10}px`,
                        left: `${idx * 10}px`,
                        zIndex: images.length - idx,
                      };

                      return (
                        <div
                          key={img.id || idx}
                          onClick={() => setActiveImageIndex(idx)}
                          style={offsetStyle}
                          className={`absolute w-48 sm:w-52 p-3 bg-white border border-gray-200 shadow-xl rounded-sm transition-all duration-300 transform hover:scale-105 hover:z-30 cursor-pointer ${rotation}`}
                        >
                          <div className="w-full h-52 bg-[#E9E9DD] overflow-hidden relative border border-gray-100 rounded-xs flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={getImageUrl(img)}
                              alt={`Letter attachment ${idx + 1}`}
                              className="w-full h-full object-cover"
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
                          </div>
                          <div className="pt-2 text-center">
                            <span className="font-[family-name:var(--font-garamond)] text-xs italic text-gray-500">
                              Memory #{idx + 1}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {images.length > 1 && (
                      <div className="absolute -bottom-2 right-0 bg-[#570013] text-white text-[10px] uppercase font-[family-name:var(--font-inter)] tracking-wider px-2.5 py-1 rounded-full shadow-md z-40">
                        Click to view all {images.length}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {letter.spotifyTrackId && (
                <div className="flex flex-col gap-3 w-full md:max-w-xs">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icons/music.svg" alt="" className="w-3.5 h-4" />
                    <span className="font-[family-name:var(--font-inter)] text-xs font-semibold tracking-wider text-[#570013] uppercase">
                      THE ATMOSPHERE
                    </span>
                  </div>
                  <div className="w-full rounded-md overflow-hidden shadow-sm border border-[#5700131a]">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${letter.spotifyTrackId}`}
                      width="100%"
                      height="100"
                      style={{ border: 'none' }}
                      allow="encrypted-media"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center opacity-25 pt-4">
            <div className="w-32 h-[1px] bg-[#570013]" />
          </div>

        </article>

        <WriteLetterFab />
      </div>

      {activeImageIndex !== null && images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4">

          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="relative flex items-center justify-center w-full max-w-2xl max-h-[85vh]">

            {images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:-left-12 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 p-3 rounded-full transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-200 shadow-2xl max-w-full flex flex-col items-center gap-4">
              <div className="relative min-h-[300px] max-h-[65vh] w-full flex items-center justify-center bg-gray-900 rounded-sm overflow-hidden">
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

              <div className="flex items-center justify-between w-full text-[#584141] font-[family-name:var(--font-garamond)] italic text-sm pt-1">
                <span>Memory #{activeImageIndex + 1}</span>
                <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-gray-500">
                  {activeImageIndex + 1} of {images.length}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:-right-12 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 p-3 rounded-full transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
