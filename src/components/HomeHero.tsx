'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { heroMenuTabs } from '@/data/homeMegaMenu';
import MegaMenuLinkGrid from '@/components/MegaMenuLinkGrid';

const slides = [
  { src: '/images/client-home/hero-event-table.jpg', title: 'The Impress Collection', alt: 'Elegant wedding table with floral centerpiece' },
  { src: '/images/client-home/long-table.jpg', title: 'Inspired Gatherings', alt: 'A beautifully arranged long reception table' },
  { src: '/images/client-home/warm-dining.jpg', title: 'Timeless Celebrations', alt: 'Candlelit wedding dining and elegant event furniture' },
];

export default function HomeHero() {
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [pointerX, setPointerX] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const navLinks = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setActive(null), 170);
  };
  const openPreview = (index: number) => {
    cancelClose();
    const hero = heroRef.current?.getBoundingClientRect();
    const item = navLinks.current[index]?.getBoundingClientRect();
    if (hero && item) setPointerX(item.left - hero.left + item.width / 2);
    setActive(index);
  };

  // The slider stays still while shoppers explore a category panel.
  useEffect(() => {
    if (active !== null) return;
    const timer = window.setInterval(() => setSlide((index) => (index + 1) % slides.length), 4500);
    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        cancelClose();
        setActive(null);
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('keydown', onEscape);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const preview = active === null ? null : heroMenuTabs[active];
  return (
    <section
      ref={heroRef}
      className="im-ref-hero"
      aria-label="Impress Events featured collections"
      onMouseLeave={scheduleClose}
    >
      {slides.map((item, index) => (
        <div
          className={`im-ref-hero-slide${index === slide ? ' visible' : ''}`}
          aria-hidden={index !== slide}
          key={item.src}
        >
          <Image src={item.src} alt={index === slide ? item.alt : ''} fill sizes="100vw" priority={index === 0} />
        </div>
      ))}
      <div className="im-ref-hero-dark" />
      <h1>{slides[slide].title}</h1>
      <div className="im-ref-hero-controls">
        <button type="button" aria-label="Previous hero image" onClick={() => setSlide((index) => (index + slides.length - 1) % slides.length)}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" aria-label="Next hero image" onClick={() => setSlide((index) => (index + 1) % slides.length)}>
          <ChevronRight size={20} />
        </button>
      </div>

      {preview && (
        <>
          <div
            className={`im-mega-hover im-mega-hover--${preview.variant}`}
            id="im-home-mega-menu"
            role="region"
            aria-label={`${preview.title} categories`}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <Link className="im-mega-photo" href={preview.href} onClick={() => setActive(null)} aria-label={`Explore ${preview.title}`}>
              <Image src={preview.photo} alt={`${preview.title} styling by Impress Events`} fill sizes="(max-width: 700px) 100vw, 34vw" />
            </Link>
            <div className="im-mega-body" key={preview.label}>
              <h2>{preview.title}</h2>
              <div className="im-mega-rule" />
              <p>{preview.copy}</p>
              <Link href={preview.href} className="im-mega-cta" onClick={() => setActive(null)}>{preview.cta}</Link>

              <div className="im-mega-content">
                {preview.sections.map((section, sectionIndex) => (
                  <section className={`im-mega-section im-mega-section-${sectionIndex}`} key={`${preview.label}-${section.title}`}>
                    {section.title && <h3>{section.title}</h3>}
                    <MegaMenuLinkGrid
                      links={section.links}
                      columns={section.columns ?? 1}
                      onNavigate={() => setActive(null)}
                    />
                  </section>
                ))}
              </div>
            </div>
          </div>
          {pointerX !== null && <span className="im-mega-pointer" style={{ left: pointerX }} aria-hidden="true" />}
        </>
      )}

      <nav className={`im-hero-bottom-nav${active !== null ? ' is-expanded' : ''}`} aria-label="Shop product categories">
        <div className="im-hero-nav-links">
          {heroMenuTabs.map((tab, index) => (
            <Link
              ref={(node) => { navLinks.current[index] = node; }}
              href={tab.href}
              key={tab.label}
              className={active === index ? 'active' : ''}
              aria-controls={active !== null ? "im-home-mega-menu" : undefined}
              aria-expanded={active === index}
              onMouseEnter={() => openPreview(index)}
              onFocus={() => openPreview(index)}
              onClick={() => { cancelClose(); setActive(null); }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}
