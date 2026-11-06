'use client';

import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Plus, Share2, ShoppingBag, X } from 'lucide-react';
import { getProduct, getProductGallery, type Product } from '@/lib/catalogue';
import type { DesignGalleryLook } from '@/data/designGallery';

type Props = {
  looks: DesignGalleryLook[];
  variant?: 'home' | 'gallery';
};

const markerPositions = [
  { left: '45%', top: '56%' },
  { left: '64%', top: '71%' },
  { left: '76%', top: '46%' },
  { left: '28%', top: '78%' },
];

/** Shared home preview and complete shoppable-gallery experience. */
export default function ShopTheLookGallery({ looks, variant = 'gallery' }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [shareStatus, setShareStatus] = useState('');
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const productRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const selectedLook = selectedIndex === null ? null : looks[selectedIndex];
  const isOpen = selectedLook !== null;

  useEffect(() => setMounted(true), []);

  // The gallery URL can be shared with a look already selected.
  useEffect(() => {
    if (variant !== 'gallery' || looks.length === 0) return;
    const id = new URLSearchParams(window.location.search).get('look');
    if (!id) return;
    const index = looks.findIndex((look) => look.id === id);
    if (index >= 0) setSelectedIndex(index);
  }, [looks, variant]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedIndex(null);
      } else if (event.key === 'ArrowDown' && !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
        event.preventDefault();
        setSelectedIndex((current) => (current === null ? null : (current + 1) % looks.length));
        setSelectedProduct(0);
      } else if (event.key === 'ArrowUp' && !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
        event.preventDefault();
        setSelectedIndex((current) => (current === null ? null : (current - 1 + looks.length) % looks.length));
        setSelectedProduct(0);
      } else if (event.key === 'Tab') {
        const focusables = [...(modalRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])];
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, looks.length]);

  function openLook(index: number) {
    setSelectedProduct(0);
    setShareStatus('');
    setSelectedIndex(index);
  }

  function moveLook(direction: number) {
    setSelectedIndex((current) => (current === null ? null : (current + direction + looks.length) % looks.length));
    setSelectedProduct(0);
    setShareStatus('');
    panelRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }

  function highlightProduct(index: number) {
    setSelectedProduct(index);
    productRefs.current[index]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  async function shareLook(look: DesignGalleryLook) {
    const url = new URL('/gallery', window.location.origin);
    url.searchParams.set('look', look.id);
    try {
      if (navigator.share) {
        await navigator.share({ title: `${look.title} | Impress Events`, url: url.toString() });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url.toString());
        setShareStatus('Gallery link copied');
      } else {
        setShareStatus('Share this link: ' + url.toString());
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShareStatus('Unable to share this link');
    }
  }

  const products = selectedLook?.productIds
    .map((id) => getProduct(id))
    .filter((product): product is Product => product !== undefined) ?? [];

  const modal = selectedLook && (
    <div className="im-look-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null); }}>
      <div className="im-look-dialog-wrap" ref={modalRef} role="dialog" aria-modal="true" aria-label={`Shop the Look: ${selectedLook.title}`}>
        <div className="im-look-dialog">
          <div className="im-look-photo">
            <Image key={selectedLook.src} src={selectedLook.src} alt={selectedLook.alt} fill sizes="(max-width: 760px) 100vw, 50vw" priority className="im-look-photo-main" />
            <div className="im-look-photo-caption">{selectedLook.title}</div>
            {products.slice(0, markerPositions.length).map((product, index) => (
              <button
                type="button"
                key={`${selectedLook.id}-${product.id}`}
                className={`im-look-hotspot${selectedProduct === index ? ' is-active' : ''}`}
                style={markerPositions[index]}
                onClick={() => highlightProduct(index)}
                aria-label={`Explore suggested rental: ${product.title}`}
                title={product.title}
              />
            ))}
            <span className="im-look-photo-note">Explore the styling details</span>
          </div>
          <div className="im-look-detail" ref={panelRef}>
            <div className="im-look-detail-head">
              <p>SHOP THE LOOK</p>
              <h2>{selectedLook.title}</h2>
              <span>{selectedLook.detail}</span>
            </div>
            <p className="im-look-subheading">Discover complementary pieces from the Impress rental collection</p>
            <div className="im-look-related-list">
              {products.map((product, index) => {
                const gallery = getProductGallery(product);
                return (
                  <Link
                    key={`${selectedLook.id}-${product.id}`}
                    ref={(node) => { productRefs.current[index] = node; }}
                    className={`im-look-product${selectedProduct === index ? ' is-highlighted' : ''}`}
                    href={`/rentals/${product.id}`}
                    onFocus={() => setSelectedProduct(index)}
                    onMouseEnter={() => setSelectedProduct(index)}
                    onClick={() => setSelectedIndex(null)}
                  >
                    <span className="im-look-product-img"><Image src={gallery[0].src} alt={gallery[0].alt} fill sizes="130px" /></span>
                    <span className="im-look-product-info"><strong>{product.title}</strong><small>{product.category} · View rental</small></span>
                    <ArrowUpRight size={19} strokeWidth={1.3} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
            <div className="im-look-detail-foot">
              <p>Product suggestions are drawn from the Impress stock catalogue. Event photographs are styling inspiration, not verified photos of the listed SKUs. Please enquire about availability.</p>
              <Link href="/rentals" onClick={() => setSelectedIndex(null)}>BROWSE ALL RENTALS <ArrowUpRight size={16} /></Link>
              <Link href="/quote" onClick={() => setSelectedIndex(null)}>YOUR INQUIRY BAG <ShoppingBag size={16} /></Link>
            </div>
          </div>
        </div>
        <div className="im-look-floating-controls">
          <button type="button" ref={closeRef} onClick={() => setSelectedIndex(null)} aria-label="Close gallery detail" title="Close"><X size={23} strokeWidth={1.4} /></button>
          <span className="im-look-control-spacer" />
          <button type="button" onClick={() => moveLook(-1)} aria-label="Previous look" title="Previous look"><ArrowUp size={22} strokeWidth={1.3} /></button>
          <button type="button" onClick={() => moveLook(1)} aria-label="Next look" title="Next look"><ArrowDown size={22} strokeWidth={1.3} /></button>
          <span className="im-look-control-spacer" />
          <button type="button" onClick={() => void shareLook(selectedLook)} aria-label="Share this look" title="Share this look"><Share2 size={20} strokeWidth={1.4} /></button>
        </div>
      </div>
      <p className="im-look-share-feedback" role="status" aria-live="polite">{shareStatus}</p>
    </div>
  );

  return (
    <>
      <div className={variant === 'home' ? 'im-home-four-grid im-shop-grid im-shop-grid-home' : 'im-shop-grid im-shop-grid-page'}>
        {looks.map((look, index) => (
          <button
            type="button"
            className="im-shop-card"
            key={look.id}
            onClick={() => openLook(index)}
            aria-label={`Shop the Look: ${look.title}`}
          >
            <Image src={look.src} alt={look.alt} fill sizes={variant === 'home' ? '(max-width: 700px) 50vw, 25vw' : '(max-width: 650px) 50vw, (max-width: 1000px) 33vw, 25vw'} />
            <span className="im-shop-card-shade" aria-hidden="true" />
            <span className="im-shop-card-hover" aria-hidden="true"><em>Shop the Look</em><span><Plus size={21} strokeWidth={1.4} /></span></span>
          </button>
        ))}
      </div>
      {mounted && selectedLook && createPortal(modal, document.body)}
    </>
  );
}
