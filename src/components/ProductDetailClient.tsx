'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown, ChevronLeft, ChevronRight, Grid2X2, Maximize2, Minus, Plus, ShoppingBag, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '@/lib/catalogue';
import { getProductGallery, products } from '@/lib/catalogue';
import stockFacets from '@/data/stockFacets.json';
import { useQuote } from '@/context/QuoteContext';

type Facet = { color?: string[]; fabric?: string; pattern?: string[] };
const facets = stockFacets as Record<string, Facet>;

// Display-only swatch approximations; Excel provides colour names, not colour codes/photographs.
const colorPalette: Record<string, string> = {
  White: '#f3f2eb', 'Beige/Cream': '#d8c7a9', Ivory: '#eee8d7',
  Black: '#2c2929', Blue: '#577e9b', 'Green/Teal': '#488477',
  'Copper/Brown': '#9f674d', 'Champagne/Gold': '#c5a661',
  'Silver/Grey': '#9b9f9c', Pink: '#d991a7', Red: '#a53b48',
  Orange: '#d98e52', Yellow: '#e1bf56', Purple: '#7e6691',
};

const eventPhotos = [
  { src: '/images/client-home/outdoor-aisle.jpg', alt: 'Outdoor event setting with floral details' },
  { src: '/images/client-home/neutral-place-setting.jpg', alt: 'Elegant neutral dining place setting' },
  { src: '/images/client-home/long-table.jpg', alt: 'Long banquet table prepared for an event' },
  { src: '/images/client-home/romantic-florals.jpg', alt: 'Romantic floral styling for a celebration' },
  { src: '/images/client-home/candle-centerpiece.jpg', alt: 'Candlelit table centerpiece' },
  { src: '/images/client-home/warm-dining.jpg', alt: 'Warm and intimate event dining setup' },
];

function productFamily(product: Product) {
  // Only group clearly matching names in the same category and fabric.
  // Do not imply unrelated stock products are colours of one design.
  const cleaned = product.title.toLowerCase()
    .replace(/^(white|classic off white|warm white|ivory|cream|light beige|dark beige|sand beige|beige|black|red|blue|navy blue|dusty blue|green|gold|silver|pink|yellow|orange|purple|grey|gray|turquoise|champagne|coffee cream|chocolate brown|olive|maroon|burgundy|hot pink|light gold|dark gold)\s+/i, '')
    .replace(/\s+/g, ' ').trim();
  return `${product.category.toLowerCase()}|${product.fabric.toLowerCase()}|${cleaned}`;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const photos = useMemo(() => getProductGallery(product), [product]);
  const photoVerified = photos.every(photo => photo.verified);
  const ownColors = facets[product.sku]?.color ?? [];
  const [chosenColor, setChosenColor] = useState(ownColors[0] ?? '');
  const [moreColors, setMoreColors] = useState(false);
  const [chosenSize, setChosenSize] = useState(product.variants.length === 1 ? product.variants[0] : '');
  const [sizeOpen, setSizeOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [inspirationAt, setInspirationAt] = useState(0);
  const [mobileInspiration, setMobileInspiration] = useState(false);
  useEffect(() => {
    const check = () => setMobileInspiration(window.innerWidth <= 750);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const inspirationMax = eventPhotos.length - (mobileInspiration ? 2 : 4);
  useEffect(() => { setInspirationAt(i => Math.min(i, inspirationMax)); }, [inspirationMax]);
  const firstClose = useRef<HTMLButtonElement>(null);
  const imageOpener = useRef<HTMLButtonElement>(null);
  const sizePicker = useRef<HTMLDivElement>(null);
  const swipeX = useRef<number | null>(null);
  const { addItem } = useQuote();

  const siblingColors = useMemo(() => products.filter(candidate =>
    candidate.id !== product.id && productFamily(candidate) === productFamily(product) && (facets[candidate.sku]?.color?.length ?? 0) > 0
  ).slice(0, 12), [product]);
  const realColorChoices = useMemo(() => {
    const output: { name: string; href?: string }[] = ownColors.map(name => ({ name }));
    siblingColors.forEach(p => (facets[p.sku]?.color ?? []).forEach(name => {
      if (!output.some(item => item.name === name)) output.push({ name, href: `/rentals/${p.id}` });
    }));
    return output;
  }, [ownColors, siblingColors]);
  const visibleColors = moreColors ? realColorChoices : realColorChoices.slice(0, 7);
  const complementary = useMemo(() => {
    const preferred = product.category === 'Napkins' ? ['Tablecloths', 'Chargers', 'Chairs', 'Glassware']
      : product.category === 'Tablecloths' ? ['Napkins', 'Chargers', 'Glassware', 'Chairs']
      : ['Napkins', 'Tablecloths', 'Chargers', 'Chairs'];
    return preferred.map(category => products.find(p => p.id !== product.id && p.category === category && p.featured)
      ?? products.find(p => p.id !== product.id && p.category === category)).filter((p): p is Product => Boolean(p)).slice(0, 4);
  }, [product]);

  const movePhoto = useCallback((delta: number) => {
    setZoomed(false);
    setActiveImage(current => (current + delta + photos.length) % photos.length);
  }, [photos.length]);
  useEffect(() => {
    if (!lightbox) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstClose.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false);
      if (event.key === 'ArrowLeft') movePhoto(-1);
      if (event.key === 'ArrowRight') movePhoto(1);
    };
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = original; document.removeEventListener('keydown', key); imageOpener.current?.focus(); };
  }, [lightbox, movePhoto]);
  useEffect(() => {
    if (!sizeOpen) return;
    const close = (event: PointerEvent) => { if (!sizePicker.current?.contains(event.target as Node)) setSizeOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSizeOpen(false); };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape); };
  }, [sizeOpen]);
  const touchStart = (event: React.TouchEvent) => { swipeX.current = event.touches[0]?.clientX ?? null; };
  const touchEnd = (event: React.TouchEvent) => {
    if (swipeX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? swipeX.current) - swipeX.current;
    swipeX.current = null;
    if (Math.abs(distance) > 55) movePhoto(distance < 0 ? 1 : -1);
  };
  const addToInquiry = () => {
    if (!chosenSize) return;
    const choice = chosenColor ? `${chosenSize} · ${chosenColor}` : chosenSize;
    addItem(product.id, choice, quantity);
    setAdded(true);
  };
  const galleryImage = photos[activeImage];
  const familyLabel = product.category === 'Tablecloths' || product.category === 'Runners' || product.category === 'Napkins' ? 'LINENS' : product.subcategory.toUpperCase();

  return <div className="im-pdp">
    <div className="im-pdp-inner">
      <nav className="im-pdp-crumbs" aria-label="Breadcrumb">
        <Link href="/categories" aria-label="All product categories"><Grid2X2 size={13} fill="currentColor" strokeWidth={1}/></Link>
        <span>/</span><Link href={`/rentals?category=${encodeURIComponent(product.category)}`}>{familyLabel}</Link>
        <span>/</span><Link href={`/rentals?category=${encodeURIComponent(product.category)}`}>{product.category === 'Tablecloths' ? 'TABLECLOTHS AND OVERLAYS' : product.category.toUpperCase()}</Link>
      </nav>
      <div className="im-pdp-main">
        <section className="im-pdp-gallery" aria-label="Product gallery">
          <div className="im-pdp-rail" aria-label="Product photos">
            {photos.map((photo, index) => <button type="button" key={`${photo.src}-${index}`} onClick={() => setActiveImage(index)} className={index === activeImage ? 'is-active' : ''} aria-label={`View image ${index + 1}`} aria-pressed={index === activeImage}>
              <Image src={photo.src} alt="" fill sizes="120px"/>
            </button>)}
          </div>
          <div className="im-pdp-visual" onTouchStart={touchStart} onTouchEnd={touchEnd}>
            <button ref={imageOpener} type="button" className="im-pdp-visual-open" onClick={() => { setLightbox(true); setZoomed(false); }} aria-label="Enlarge product photograph">
              {galleryImage && <Image key={galleryImage.src} src={galleryImage.src} alt={galleryImage.alt} fill sizes="(max-width: 800px) 100vw, 44vw" priority/>}
              <span className="im-pdp-expand"><Maximize2 size={18}/></span>
            </button>
            {!photoVerified && <span className="im-pdp-photo-note">EVENT STYLING REFERENCE · SKU PHOTO PENDING</span>}
          </div>
        </section>
        <section className="im-pdp-info" aria-label="Product information">
          <h1>{product.title}</h1>
          <p className="im-pdp-price">RENTAL PRICE ON REQUEST</p>
          <p className="im-pdp-collection">MATERIAL: {product.fabric || 'TO BE CONFIRMED'} <span> · SKU {product.sku}</span></p>
          <div className="im-pdp-rule"/>
          <div className="im-pdp-swatches" aria-label="Available product colours">
            {realColorChoices.length ? <>
              <div className="im-pdp-swatch-list">
                {visibleColors.map(item => item.href ?
                  <Link key={item.name} href={item.href} title={`View ${item.name} version`} aria-label={`View ${item.name} version`} className="im-pdp-swatch" style={{backgroundColor: colorPalette[item.name] ?? '#d1c5b4'}}/> :
                  <button key={item.name} type="button" onClick={() => { setChosenColor(item.name); setAdded(false); }} aria-label={`Choose ${item.name}`} aria-pressed={chosenColor === item.name} title={item.name} className={`im-pdp-swatch ${chosenColor === item.name ? 'is-selected' : ''}`} style={{backgroundColor: colorPalette[item.name] ?? '#d1c5b4'}}/>
                )}
              </div>
              {realColorChoices.length > 7 && <button className="im-pdp-show-colors" type="button" onClick={() => setMoreColors(s => !s)} aria-expanded={moreColors}>{moreColors ? 'Less' : `+${realColorChoices.length - 7}`} <ChevronDown size={14}/></button>}
            </> : <p className="im-pdp-color-unknown">Colour details available on request</p>}
            {chosenColor && <span className="im-pdp-selected-color">{chosenColor} <small>· indicative swatch</small></span>}
          </div>
          <Link className="im-pdp-order-swatch" href="/contact">REQUEST A SWATCH</Link>
          <div className="im-pdp-buy">
            <label id="im-pdp-size-label">Products and Sizes</label>
            <div className="im-pdp-size" ref={sizePicker}>
              <button type="button" className="im-pdp-size-trigger" aria-haspopup="listbox" aria-expanded={sizeOpen} aria-labelledby="im-pdp-size-label" onClick={() => setSizeOpen(o => !o)}>
                <span>{chosenSize ? `${product.title} — ${chosenSize}` : 'Please select a size'} <small>Price on request</small></span><ChevronDown size={18}/>
              </button>
              {sizeOpen && <div className="im-pdp-size-options" role="listbox" aria-label="Available products and sizes">
                {product.variants.map(size => <button type="button" role="option" aria-selected={chosenSize === size} key={size} onClick={() => { setChosenSize(size); setSizeOpen(false); setAdded(false); }}><span>{product.title} — {size}</span><small>Price on request</small>{chosenSize === size && <Check size={15}/>}</button>)}
              </div>}
            </div>
            <label className="im-pdp-quantity-label">Quantity</label>
            <div className="im-pdp-purchase-row">
              <div className="im-pdp-quantity" aria-label="Quantity selector"><button type="button" onClick={() => { setQuantity(v => Math.max(1, v - 1)); setAdded(false); }} disabled={quantity === 1} aria-label="Decrease quantity"><ChevronLeft size={21}/></button><output aria-live="polite">{quantity}</output><button type="button" onClick={() => { setQuantity(v => Math.min(999, v + 1)); setAdded(false); }} disabled={quantity === 999} aria-label="Increase quantity"><ChevronRight size={21}/></button></div>
              <button type="button" className={`im-pdp-add ${added ? 'is-added' : ''}`} onClick={addToInquiry} disabled={!chosenSize}>{added ? <><Check size={17}/> ADDED TO INQUIRY</> : 'ADD TO INQUIRY'}</button>
            </div>
            {added && <div className="im-pdp-confirmation" role="status"><Check size={17}/> {quantity} {quantity === 1 ? 'item' : 'items'} added to your inquiry bag. <Link href="/quote">VIEW BAG <ShoppingBag size={14}/></Link></div>}
            <p className="im-pdp-pricing-note">Availability, exact colour and rental pricing will be confirmed with your quotation. No payment is taken here.</p>
          </div>
        </section>
      </div>
    </div>
    <section className="im-pdp-inspiration" aria-label="Inspiration in the wild">
      <div className="im-pdp-section-head"><h2>INSPIRATION IN THE WILD</h2><div><button type="button" onClick={() => setInspirationAt(i => Math.max(0, i - 1))} disabled={inspirationAt === 0} aria-label="Previous inspiration photographs"><ChevronLeft size={20}/></button><button type="button" onClick={() => setInspirationAt(i => Math.min(inspirationMax, i + 1))} disabled={inspirationAt >= inspirationMax} aria-label="Next inspiration photographs"><ChevronRight size={20}/></button></div></div>
      <div className="im-pdp-inspiration-window"><div className="im-pdp-inspiration-track" style={{transform:`translateX(-${inspirationAt * (mobileInspiration ? 50 : 25)}%)`}}>{eventPhotos.map(photo => <div className="im-pdp-inspiration-photo" key={photo.src}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 650px) 80vw, 25vw"/></div>)}</div></div>
    </section>
    {complementary.length > 0 && <section className="im-pdp-complete"><div className="im-pdp-complete-inner"><h2>COMPLETE THE LOOK</h2><div className="im-pdp-complete-grid">{complementary.map(item => { const photo = getProductGallery(item)[0]; return <Link href={`/rentals/${item.id}`} key={item.id} className="im-pdp-complete-card"><span className="im-pdp-complete-photo"><Image src={photo.src} alt={`${item.category} event styling reference`} fill sizes="(max-width:650px) 48vw, 25vw"/></span><span>{item.title}</span></Link>; })}</div></div></section>}
    <section className="im-pdp-professional"><h2>Are you an event professional?</h2><p>We would love to help with your next event.</p><Link href="/contact">GET IN TOUCH</Link></section>
    {lightbox && <div className="im-lightbox" role="dialog" aria-label="Product gallery viewer" aria-modal="true" onClick={e => {if (e.target === e.currentTarget) setLightbox(false);}}>
      <div className="im-lightbox-top"><span>{product.title} <small>· {activeImage + 1} OF {photos.length}</small></span><div><button type="button" aria-label={zoomed ? 'Zoom out' : 'Zoom in'} onClick={() => setZoomed(v => !v)}>{zoomed ? <ZoomOut size={22}/> : <ZoomIn size={22}/>}</button><button ref={firstClose} type="button" aria-label="Close gallery" onClick={() => setLightbox(false)}><X size={25}/></button></div></div>
      <div className="im-lightbox-stage" onTouchStart={touchStart} onTouchEnd={touchEnd}><button type="button" onClick={() => movePhoto(-1)} aria-label="Previous photo"><ChevronLeft size={28}/></button><div className={`im-lightbox-photo ${zoomed ? 'zoomed' : ''}`} onClick={() => setZoomed(v => !v)}>{galleryImage && <Image src={galleryImage.src} alt={galleryImage.alt} fill sizes="100vw"/>}</div><button type="button" onClick={() => movePhoto(1)} aria-label="Next photo"><ChevronRight size={28}/></button></div>
      <div className="im-lightbox-bottom"><span>{galleryImage?.label}{!photoVerified ? ' · Event styling image; not a verified image of this SKU' : ''}</span><div className="im-lightbox-dots">{photos.map((photo, i) => <button type="button" key={photo.src + i} aria-label={`Photo ${i+1}`} aria-current={i === activeImage ? 'true' : undefined} onClick={() => setActiveImage(i)}/>)}</div></div>
    </div>}
  </div>;
}
