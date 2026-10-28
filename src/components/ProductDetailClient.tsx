'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Maximize2, Minus, Plus, ShoppingBag, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '@/lib/catalogue';
import { getProductGallery, products } from '@/lib/catalogue';
import { useQuote } from '@/context/QuoteContext';
import ProductCard from './ProductCard';

export default function ProductDetailClient({ product }: { product: Product }) {
  const photos = useMemo(() => getProductGallery(product), [product]);
  const hasVerifiedPhotos = photos.length > 0 && photos.every(photo => photo.verified);
  const [variant, setVariant] = useState(product.variants[0] ?? 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const sourceButton = useRef<HTMLButtonElement>(null);
  const { addItem } = useQuote();
  const related = useMemo(() => products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4), [product]);
  const otherPieces = useMemo(() => products.filter(p => p.id !== product.id && p.category !== product.category && p.featured).slice(0, 4), [product]);
  const move = useCallback((delta: number) => {
    setZoom(false);
    setActiveImage(previous => (previous + delta + photos.length) % photos.length);
  }, [photos.length]);
  const swipeStart = useRef<number | null>(null);
  const onTouchStart = (event: React.TouchEvent) => { swipeStart.current = event.touches[0]?.clientX ?? null; };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (swipeStart.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? swipeStart.current) - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) > 55) move(distance < 0 ? 1 : -1);
  };
  const show = (index: number) => {setActiveImage(index); setZoom(false);};
  const openGallery = () => { setZoom(false); setLightbox(true); };
  const add = () => {
    addItem(product.id, variant, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2300);
  };

  useEffect(() => {
    if (!lightbox) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false);
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKey);
      sourceButton.current?.focus();
    };
  }, [lightbox, move]);

  return <>
    <div className="page-container nd-detail-container im-detail-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={13}/><Link href="/categories">Categories</Link><ChevronRight size={13}/><Link href={`/rentals?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><ChevronRight size={13}/><span>{product.title}</span></nav>
      <div className="nd-detail-grid im-detail-grid">
        <section className="nd-detail-gallery im-product-gallery" aria-label="Product image gallery">
          <div className="im-gallery-main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <button ref={sourceButton} className="im-gallery-image-button" type="button" onClick={openGallery} aria-label={`Enlarge ${photos[activeImage]?.label ?? 'product image'}`}>
              {photos[activeImage] && <Image key={photos[activeImage].src} src={photos[activeImage].src} alt={photos[activeImage].alt} fill sizes="(max-width:900px) 100vw, 55vw" priority/>}
              <span className="im-gallery-enlarge"><Maximize2 size={18}/> VIEW LARGE</span>
            </button>
            {photos.length > 1 && <>
              <button type="button" className="im-gallery-step is-previous" onClick={() => move(-1)} aria-label="Previous photograph"><ChevronLeft size={24}/></button>
              <button type="button" className="im-gallery-step is-next" onClick={() => move(1)} aria-label="Next photograph"><ChevronRight size={24}/></button>
            </>}
            <div className="im-gallery-count">{String(activeImage + 1).padStart(2,'0')} / {String(photos.length).padStart(2,'0')} <span>· {photos[activeImage]?.label}</span></div>
          </div>
          <div className="im-gallery-thumbnails" aria-label="Select a photograph">
            {photos.map((photo, i) => <button key={`${photo.src}-${i}`} type="button" className={i === activeImage ? 'is-active' : ''} onClick={() => show(i)} aria-label={`Show ${photo.label}`} aria-pressed={i === activeImage}>
              <Image src={photo.src} alt="" fill sizes="100px"/>
              <span>{photo.label}</span>
            </button>)}
          </div>
          {/* {!hasVerifiedPhotos && <p className="im-gallery-disclaimer"><strong>Demo photography:</strong> These are different event-styling reference photos, not confirmed front / side / back photographs of this SKU. The interactive multi-view gallery is ready for actual item photography.</p>} */}
        </section>
        <section className="nd-detail-info im-detail-info">
          <span className="nd-kicker">IMPRESS EVENTS / {product.category.toUpperCase()}</span>
          <h1>{product.title}</h1>
          <p className="im-product-code">REFERENCE {product.sku}</p>
          <div className="nd-detail-divider"/>
          <span className="im-price-heading">RENTAL PRICE</span>
          <div className="nd-detail-price">Price on request</div>
          <p className="nd-detail-description">{product.description}</p>
          <div className="nd-detail-specs">
            <div><span>CATEGORY</span><b>{product.category}</b></div>
            <div><span>MATERIAL</span><b>{product.fabric || 'To be confirmed'}</b></div>
            <div><span>AVAILABLE STYLES</span><b>{product.variants.length} {product.variants.length === 1 ? 'option' : 'options'} available for enquiry</b></div>
          </div>
          <div className="nd-detail-controls">
            <label htmlFor="item-option">PRODUCTS & SIZES</label>
            <div className="nd-detail-select"><select id="item-option" value={variant} onChange={e => {setVariant(e.target.value); setAdded(false);}}>{product.variants.map(v => <option key={v} value={v}>{v}</option>)}</select><ChevronRight size={17}/></div>
            <label htmlFor="item-quantity">QUANTITY</label>
            <div className="nd-detail-qty"><button type="button" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(q => Math.max(1,q - 1))}><Minus size={17}/></button><input id="item-quantity" type="number" min={1} max={999} inputMode="numeric" value={quantity} onChange={e => setQuantity(Math.max(1, Math.min(999, Number.parseInt(e.target.value) || 1)))}/><button type="button" aria-label="Increase quantity" disabled={quantity === 999} onClick={() => setQuantity(q => Math.min(999,q + 1))}><Plus size={17}/></button></div>
            <button type="button" className="nd-detail-add" onClick={add}>{added ? <><Check size={18}/> ADDED TO YOUR INQUIRY</> : <><ShoppingBag size={18}/> ADD TO INQUIRY</>}<ArrowRight size={17}/></button>
            {added && <Link href="/quote" className="nd-line-link">VIEW YOUR INQUIRY BAG <ArrowUpRight size={15}/></Link>}
            <p className="im-pricing-note">Our team will confirm availability, product details and a personalized rental quotation before booking.</p>
          </div>
          {/* <details className="nd-detail-accordion" open><summary>ABOUT THIS RENTAL <Plus size={16}/></summary><p>Choose your preferred size and quantity, then add the item to your inquiry. We will confirm rental availability for your event date, along with delivery information.</p></details>
          <details className="nd-detail-accordion"><summary>PRODUCT INFORMATION <Plus size={16}/></summary><p>Reference: {product.sku}. Material: {product.fabric || 'Awaiting confirmation'}. Product finishes, sizes and colours will be verified with Impress Events.</p></details>
          <details className="nd-detail-accordion"><summary>REQUEST A QUOTE <Plus size={16}/></summary><p>No payment is taken online. Browse the collection and send a single inquiry for all your selected pieces.</p><Link href="/quote" className="nd-line-link">YOUR INQUIRY BAG <ArrowRight size={14}/></Link></details>
          <Link className="im-back-to-category" href={`/rentals?category=${encodeURIComponent(product.category)}`}><ArrowLeft size={16}/> BACK TO {product.category.toUpperCase()}</Link> */}
        </section>
      </div>
    </div>
    {related.length > 0 && <section className="nd-related-section page-container"><div className="nd-section-heading"><div><span className="nd-kicker">EXPLORE THE COLLECTION</span><h2>More from {product.category}</h2></div><Link href={`/rentals?category=${encodeURIComponent(product.category)}`} className="nd-line-link">VIEW ALL {product.category.toUpperCase()} <ArrowUpRight size={15}/></Link></div><div className="nd-related-grid">{related.map(p => <ProductCard key={p.id} product={p}/>)}</div></section>}
    {otherPieces.length > 0 && <section className="nd-related-section page-container im-complete-look"><div className="nd-section-heading"><div><span className="nd-kicker">INSPIRATION FOR YOUR EVENT</span><h2>Complete the look</h2></div><Link href="/rentals" className="nd-line-link">EXPLORE ALL PIECES <ArrowUpRight size={15}/></Link></div><div className="nd-related-grid">{otherPieces.map(p => <ProductCard key={p.id} product={p}/>)}</div></section>}
    {lightbox && <div className="im-lightbox" role="dialog" aria-modal="true" aria-label="Product image viewer" onClick={event => {if(event.target === event.currentTarget) setLightbox(false)}}>
      <div className="im-lightbox-top"><span>{product.title} <small>· {activeImage + 1} OF {photos.length}</small></span><div><button type="button" aria-label={zoom ? 'Zoom out' : 'Zoom in'} onClick={() => setZoom(z => !z)}>{zoom ? <ZoomOut size={22}/> : <ZoomIn size={22}/>}</button><button ref={closeButton} type="button" onClick={() => setLightbox(false)} aria-label="Close gallery"><X size={25}/></button></div></div>
      <div className="im-lightbox-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}><button type="button" aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft size={30}/></button><div className={`im-lightbox-photo ${zoom ? 'zoomed' : ''}`} onClick={() => setZoom(z => !z)}>{photos[activeImage] && <Image src={photos[activeImage].src} alt={photos[activeImage].alt} fill sizes="100vw"/>}</div><button type="button" aria-label="Next image" onClick={() => move(1)}><ChevronRight size={30}/></button></div>
      <div className="im-lightbox-bottom"><span>{photos[activeImage]?.label}{!hasVerifiedPhotos ? ' · Editorial styling reference, not verified product photography' : ''}</span><div className="im-lightbox-dots">{photos.map((photo,i)=><button key={`${photo.src}-${i}`} type="button" aria-label={`Go to image ${i + 1}`} aria-current={i === activeImage ? 'true' : undefined} onClick={() => show(i)}/>)}</div></div>
    </div>}
  </>;
}
