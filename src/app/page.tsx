'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import QuoteRequestModal from '@/components/QuoteRequestModal';
import EventGallery from '@/components/EventGallery';
import { eventPhotos } from '@/data/eventPhotos';
import HomeHero from '@/components/HomeHero';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/lib/catalogue';

const quickCategories = ['Tablecloths', 'Napkins', 'Runners', 'Chairs', 'Tables', 'Chargers', 'Glassware', 'Placemats'];
const features = [
 { group: 'LINENS', name: 'Linens', title: 'The art of a beautiful table.', copy: 'Understated neutrals, considered textures and a beautiful spectrum of colour. Discover table linens made to set the tone for any occasion.', photo: '/images/client-home/tablecloth-setting.jpg', alt: 'Thoughtfully decorated tables with elegant linens', categories: ['Tablecloths','Napkins','Runners'], reverse: false },
 { group: 'FURNITURE', name: 'Furniture', title: 'Beautiful spaces begin here.', copy: 'From timeless ceremony chairs to celebration tables, our rental furniture brings ease, harmony and character to your event.', photo: '/images/client-home/long-table.jpg', alt: 'Warmly styled long tables and chairs with flowers', categories: ['Chairs','Tables'], reverse: true },
 { group: 'TABLETOP', name: 'Tabletop & Accessories', title: 'It’s all in the details.', copy: 'Finishing touches with personality. Thoughtful layers, statement chargers, glassware and tabletop accents make the setting your own.', photo: '/images/client-home/charger-place-setting.jpg', alt: 'Refined table arrangement with charger plate', categories: ['Chargers','Placemats','Glassware','Cutlery','Napkin Rings','Table Numbers'], reverse: false },
];

export default function Home() {
 const [quoteOpen, setQuoteOpen] = useState(false);
 return <>
   <QuoteRequestModal open={quoteOpen} onClose={() => setQuoteOpen(false)}/>
   <HomeHero/>
   <section className="nd-intro page-container" id="discover"><span className="nd-kicker">THE IMPRESS EDIT</span><h2>Thoughtful details. <em>Remarkable celebrations.</em></h2><p>Explore a thoughtfully curated world of event rentals, where every texture, detail and finishing touch is chosen to complement your vision.</p></section>
   <section className="im-new-arrivals page-container" id="new-arrivals"><div className="nd-section-heading"><div><span className="nd-kicker">THE IMPRESS SELECTION</span><h2>Pieces to fall in love with</h2><p>Discover a few favourites from our growing rental catalogue.</p></div><Link className="nd-line-link" href="/rentals">BROWSE ALL PRODUCTS <ArrowUpRight size={15}/></Link></div><div className="im-arrivals-grid">{products.filter(p => p.featured).slice(0,4).map(p => <ProductCard key={p.id} product={p}/>)}</div></section>
   <section className="nd-quick page-container"><div className="nd-section-heading"><div><span className="nd-kicker">THE COLLECTION</span><h2>Shop by category</h2></div><Link className="nd-line-link" href="/categories">VIEW ALL CATEGORIES <ArrowUpRight size={15}/></Link></div><div className="nd-quick-grid">{quickCategories.map(name=>{const cat=categories.find(c=>c.name===name)!;return <Link href={`/rentals?category=${encodeURIComponent(name)}`} key={name} className="nd-quick-card"><div className="nd-quick-image"><Image src={cat.image} alt={`${name} inspiration`} fill sizes="(max-width:700px) 44vw, (max-width:1100px) 24vw, 14vw"/></div><span>{name} <ArrowUpRight size={14}/></span></Link>})}</div></section>
   {features.map(feature => <section key={feature.name} className={`nd-feature-section ${feature.reverse ? 'nd-feature-reverse':''}`}><div className="nd-feature-image"><Image src={feature.photo} alt={feature.alt} fill sizes="(max-width:900px) 100vw, 52vw"/></div><div className="nd-feature-content"><span className="nd-kicker">{feature.group}</span><h2>{feature.name}</h2><p className="nd-feature-title">{feature.title}</p><p className="nd-feature-copy">{feature.copy}</p><Link href={`/rentals?category=${encodeURIComponent(feature.categories[0])}`} className="nd-outline-button">SHOP {feature.name.toUpperCase()} <ArrowUpRight size={16}/></Link><div className="nd-feature-subcats"><b>BROWSE BY CATEGORY</b>{feature.categories.map(name=><Link key={name} href={`/rentals?category=${encodeURIComponent(name)}`}>{name} <ArrowRight size={14}/></Link>)}</div></div></section>)}
   <section className="nd-stats-strip"><div className="page-container"><p>Beautiful occasions start with thoughtful choices.</p><span>{products.length} CURATED RENTAL PIECES & COUNTING</span></div></section>
   <section className="nd-inspiration page-container"><div className="nd-section-heading"><div><span className="nd-kicker">GET INSPIRED</span><h2>Inspiration delivered</h2><p>Beautiful settings. Real celebrations. Possibilities to make your own.</p></div><Link className="nd-line-link" href="/lookbook">EXPLORE THE LOOKBOOK <ArrowUpRight size={15}/></Link></div><EventGallery photos={eventPhotos} limit={4}/></section>
   <section className="nd-cta"><Image src="/images/client-home/warm-dining.jpg" fill sizes="100vw" alt="Warmly lit event table ready for a beautiful celebration"/><div className="nd-cta-overlay"/><div className="nd-cta-content"><span className="nd-kicker light">LET'S PLAN SOMETHING BEAUTIFUL</span><h2>Every beautiful event<br/><em>begins with an idea.</em></h2><p>Discover the perfect pieces for your celebration.</p><button type="button" onClick={() => setQuoteOpen(true)} className="nd-white-button">REQUEST A QUOTATION <ArrowRight size={17}/></button></div></section>
 </>;
}
