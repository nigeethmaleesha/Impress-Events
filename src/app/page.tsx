'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import QuoteRequestModal from '@/components/QuoteRequestModal';
import EventGallery from '@/components/EventGallery';
import { eventPhotos } from '@/data/eventPhotos';
import { categories } from '@/lib/catalogue';

const collectionNames = ['Chairs', 'Tablecloths', 'Chargers', 'Tables', 'Napkins', 'Glassware'];

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const collections = collectionNames.map((name) => categories.find((category) => category.name === name)!).filter(Boolean);

  return (
    <>
      <QuoteRequestModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <section className="ie-hero" aria-labelledby="home-title">
        <div className="ie-hero-copy">
          <span className="ie-eyebrow">Impress Luxury Event Rentals</span>
          <h1 id="home-title">Beautiful Details.<br />Memorable Moments.</h1>
          <p>Discover considered rentals for weddings and celebrations, and see how they look in real settings.</p>
          <div className="ie-hero-actions">
            <Link href="/rentals" className="ie-button ie-button-dark">Explore The Collection <ArrowUpRight size={17} /></Link>
            <Link href="/lookbook" className="ie-text-link">View Events In Use <ArrowRight size={17} /></Link>
          </div>
          <span className="ie-hero-small">The Details Make The Difference.</span>
        </div>
        <div className="ie-hero-media">
          <Image src={eventPhotos[0].src} alt={eventPhotos[0].alt} fill priority sizes="(max-width:800px) 100vw, 64vw" className="ie-cover" />
          <div className="ie-image-caption">Thoughtfully Styled Celebrations</div>
        </div>
      </section>

      <section className="ie-section ie-collections page-container" aria-labelledby="collections-title">
        <div className="ie-section-heading">
          <div><span className="ie-eyebrow">The Rental Catalogue</span><h2 id="collections-title">Explore By Collection</h2></div>
          <Link href="/rentals" className="ie-text-link">View All Rentals <ArrowUpRight size={17} /></Link>
        </div>
        <div className="ie-collection-grid">
          {collections.map((category) => (
            <Link className="ie-collection-card" href={`/rentals?category=${encodeURIComponent(category.name)}`} key={category.name}>
              <div className="ie-collection-image"><Image src={category.image} alt={`${category.name} rental inspiration`} fill sizes="(max-width:600px) 50vw, (max-width:1050px) 33vw, 25vw" className="ie-cover" /></div>
              <div className="ie-collection-label"><h3>{category.name}</h3><ArrowUpRight size={17} aria-hidden="true" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="ie-editorial-strip" aria-label="Our Approach">
        <div className="page-container"><p>From The Smallest Detail To The Complete Setting.</p><Link href="/about" className="ie-text-link">Meet Impress <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="ie-section ie-events-section page-container" aria-labelledby="events-title">
        <div className="ie-section-heading">
          <div><span className="ie-eyebrow">Styled In Real Spaces</span><h2 id="events-title">See The Collection In Use</h2></div>
          <Link href="/lookbook" className="ie-text-link">Explore The Lookbook <ArrowUpRight size={17} /></Link>
        </div>
        <EventGallery photos={eventPhotos} limit={4} />
      </section>

      <section className="ie-quote-band" aria-labelledby="quote-title">
        <div className="page-container ie-quote-inner">
          <div><span className="ie-eyebrow">Planning An Event?</span><h2 id="quote-title">Find Your Perfect Pieces.</h2><p>Choose your favourites or tell us what you have in mind.</p></div>
          <button className="ie-button ie-button-dark" type="button" onClick={() => setQuoteOpen(true)}>Request A Quotation <ArrowUpRight size={17} /></button>
        </div>
      </section>
    </>
  );
}
