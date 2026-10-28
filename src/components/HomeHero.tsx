'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

// Licensed/client-supplied Impress photographs. Never use Nuage images or brand assets.
const slides = [
  { image: '/images/client-home/hero-event-table.jpg', eyebrow: 'IMPRESS EVENTS · THE EVENT EDIT', title: 'A celebration, beautifully considered.', caption: 'The little details make the biggest impression.', link: '/categories', action: 'EXPLORE THE COLLECTION', alt: 'Warm elegant wedding table with candles and flowers' },
  { image: '/images/client-home/romantic-florals.jpg', eyebrow: 'INSPIRATION · THE ART OF GATHERING', title: 'Every detail tells your story.', caption: 'Thoughtfully curated pieces for unforgettable moments.', link: '/lookbook', action: 'DISCOVER INSPIRATION', alt: 'Romantic flowers and styling details at an event' },
  { image: '/images/client-home/long-table.jpg', eyebrow: 'THE FURNITURE COLLECTION', title: 'Made for moments together.', caption: 'Elevate your gathering with pieces chosen with care.', link: '/rentals?category=Tables', action: 'BROWSE FURNITURE', alt: 'Long dining tables arranged for a special gathering' },
];
const browse = [
  { text: 'NEW ARRIVALS', url: '/#new-arrivals' },
  { text: 'LINENS', url: '/rentals?category=Tablecloths' },
  { text: 'FURNITURE', url: '/rentals?category=Chairs' },
  { text: 'TABLETOP', url: '/rentals?category=Chargers' },
  { text: 'ACCESSORIES', url: '/rentals?category=Napkin%20Rings' },
  { text: 'INSPIRATION', url: '/lookbook' },
];

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 7500);
    return () => window.clearInterval(interval);
  }, [paused]);
  const move = (delta: number) => setIndex((current) => (current + delta + slides.length) % slides.length);
  return (
    <section className="im-hero" aria-label="Discover Impress Events" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false); }}>
      {slides.map((slide, i) => (
        <div key={slide.image} className={`im-hero-slide ${i === index ? 'is-current' : ''}`} aria-hidden={i !== index}>
          <Image src={slide.image} alt={i === index ? slide.alt : ''} fill priority={i === 0} sizes="100vw" quality={85}/>
        </div>
      ))}
      <div className="im-hero-shade" aria-hidden="true"/>
      {/* Keep the logo and hero message in one responsive stack on laptop/desktop.
          On smaller screens the layout retains the existing mobile positioning. */}
      <div className="im-hero-center">
        <div className="im-hero-identity">
          <Image src="/images/brand/impress-logo-white.png" width={210} height={179} alt="Impress Events — Luxury Event Rentals" priority className="im-hero-brand-image" />
        </div>
        <div className="im-hero-story" aria-live="polite">
          <span className="im-hero-eyebrow">{slides[index].eyebrow}</span>
          <h1 key={`title-${index}`}>{slides[index].title}</h1>
          <p>{slides[index].caption}</p>
          <Link className="im-hero-action" href={slides[index].link}>{slides[index].action}<ArrowRight size={16}/></Link>
        </div>
      </div>
      <div className="im-hero-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous featured photograph"><ChevronLeft size={20}/></button>
        <span aria-label={`Slide ${index + 1} of ${slides.length}`}>{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(1)} aria-label="Next featured photograph"><ChevronRight size={20}/></button>
        <button className="im-hero-pause" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button>
      </div>
      <nav className="im-hero-nav" aria-label="Browse the collection">
        {browse.map((item) => <Link href={item.url} key={item.text}>{item.text}</Link>)}
        <Link className="im-hero-nav-all" href="/categories">ALL CATEGORIES <ArrowRight size={14}/></Link>
      </nav>
      <a className="im-hero-scroll" href="#discover">SCROLL TO DISCOVER <ArrowDown size={15}/></a>
    </section>
  );
}
