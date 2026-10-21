import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Our Story' };

export default function About() {
  return (
    <>
      <section className="ie-about page-container">
        <div className="ie-about-photo"><Image src="/images/real-events/white-floral-centerpiece.webp" alt="Elegant white table styling with a tall floral arrangement at a real event" fill priority sizes="(max-width:800px) 100vw, 55vw" className="ie-cover" /></div>
        <div className="ie-about-copy"><span className="ie-eyebrow">About Impress Events</span><h1>A Beautiful Setting Starts With The Details.</h1><p>We believe the right pieces make a celebration feel personal. Our collection brings together considered event essentials, from seating and table linen to the finishing touches on every table.</p><p>Explore our rentals, discover inspiration from real events, and let us know what you are planning.</p><Link href="/rentals" className="ie-button ie-button-dark">Discover The Collection <ArrowUpRight size={17} /></Link></div>
      </section>
      <section className="ie-about-note"><div className="page-container"><span className="ie-eyebrow">The Owner's Vision</span><h2>Simple Pieces. Beautifully Brought Together.</h2><p>Impress Events was created around a simple vision: make it easier to discover beautiful rental pieces and bring every celebration to life with care and a personal touch.</p></div></section>
    </>
  );
}
