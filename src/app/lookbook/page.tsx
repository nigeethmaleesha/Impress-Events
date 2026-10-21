import type { Metadata } from 'next';
import EventGallery from '@/components/EventGallery';
import { eventPhotos } from '@/data/eventPhotos';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Real Event Lookbook' };

export default function Lookbook() {
  return (
    <>
      <header className="ie-page-heading page-container">
        <span className="ie-eyebrow">Event Inspiration</span>
        <h1>See The Details In Place</h1>
        <p>Explore real celebrations and imagine how our collections could look at yours.</p>
      </header>
      <section className="ie-section ie-lookbook page-container" aria-label="Real Event Gallery">
        <EventGallery photos={eventPhotos} />
        <div className="ie-gallery-foot"><p>Images show styled event environments for inspiration. Please confirm individual product details and availability before booking.</p><Link className="ie-text-link" href="/rentals">Browse The Rental Catalogue <ArrowUpRight size={17} /></Link></div>
      </section>
    </>
  );
}
