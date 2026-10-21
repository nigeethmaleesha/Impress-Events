'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { EventPhoto } from '@/data/eventPhotos';

export default function EventGallery({ photos, limit }: { photos: EventPhoto[]; limit?: number }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const visible = typeof limit === 'number' ? photos.slice(0, limit) : photos;

  useEffect(() => {
    if (active === null) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setActive(null); }
      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (event.key === 'ArrowRight') setActive((index) => index === null ? null : (index + 1) % visible.length);
      if (event.key === 'ArrowLeft') setActive((index) => index === null ? null : (index - 1 + visible.length) % visible.length);
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', handleKey); previousFocus?.focus(); };
  }, [active, visible.length]);

  return (
    <>
      <div className="ie-event-grid">
        {visible.map((photo, index) => (
          <button className="ie-event-card" key={`${photo.src}-${index}`} type="button" onClick={() => setActive(index)} aria-label={`View larger photo: ${photo.title}`}>
            <span className="ie-event-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width:680px) 100vw, 50vw" className="ie-cover" /></span>
            <span className="ie-event-info"><span><strong>{photo.title}</strong><small>{photo.details}</small></span><ArrowUpRight size={19} aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      {active !== null && (
        <div ref={dialogRef} className="ie-lightbox" role="dialog" aria-modal="true" aria-label={`Event Photo: ${visible[active].title}`} onClick={() => setActive(null)}>
          <button ref={closeRef} type="button" className="ie-lightbox-close" onClick={() => setActive(null)} aria-label="Close Photo Viewer"><X size={24} /></button>
          <button type="button" className="ie-lightbox-prev" aria-label="Previous Photo" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + visible.length) % visible.length); }}><ChevronLeft size={24} /></button>
          <div className="ie-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="ie-lightbox-photo"><Image src={visible[active].src} alt={visible[active].alt} fill sizes="90vw" className="ie-contain" priority /></div>
            <div className="ie-lightbox-details"><div><h3>{visible[active].title}</h3><p>{visible[active].details}</p></div><Link href={`/rentals?category=${encodeURIComponent(visible[active].collection)}`} onClick={() => setActive(null)}>Browse Related Rentals <ArrowRight size={15} /></Link></div>
            <span className="ie-lightbox-count">{active + 1} / {visible.length}</span>
          </div>
          <button type="button" className="ie-lightbox-next" aria-label="Next Photo" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % visible.length); }}><ChevronRight size={24} /></button>
        </div>
      )}
    </>
  );
}
