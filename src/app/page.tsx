'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import HomeHero from '@/components/HomeHero';
import { designGallery } from '@/data/designGallery';
import ShopTheLookGallery from '@/components/ShopTheLookGallery';
import { impressStories } from '@/data/impressStories';

const browseCategories=[
 {name:'Linens',src:'/images/client-home/tablecloth-setting.jpg',href:'/rentals?family=linens'},
 {name:'Napkins',src:'/images/client-home/napkin-setting.jpg',href:'/rentals?category=Napkins'},
 {name:'Runners',src:'/images/client-home/long-table.jpg',href:'/rentals?category=Runners'},
 {name:'Chargers',src:'/images/client-home/charger-place-setting.jpg',href:'/rentals?category=Chargers'},
 {name:'Furniture',src:'/images/client-home/chair-ceremony.jpg',href:'/rentals?family=furniture'},
 {name:'Tabletop',src:'/images/client-home/neutral-place-setting.jpg',href:'/rentals?family=tabletop'},
 {name:'Glassware',src:'/images/client-home/glassware-table.jpg',href:'/rentals?category=Glassware'},
 {name:'Placemats',src:'/images/client-home/soft-table.jpg',href:'/rentals?category=Placemats'},
];


function CarouselControls({value,onChange,max}:{value:number,onChange:(index:number)=>void,max:number}){
 // The thumb stays continuous and glides across the entire track as the image window moves.
 const thumbWidth=100/max;
 const thumbLeft=max>1?(value/(max-1))*(100-thumbWidth):0;
 return <div className="im-carousel-controls">
   <button type="button" aria-label="Previous photos" onClick={()=>onChange(Math.max(0,value-1))} disabled={value===0}><ArrowLeft size={22}/></button>
   <span className="im-carousel-track" role="progressbar" aria-label="Carousel position" aria-valuemin={1} aria-valuemax={max} aria-valuenow={value+1}><span className="im-carousel-thumb" style={{width:`${thumbWidth}%`,left:`${thumbLeft}%`}}/></span>
   <button type="button" aria-label="Next photos" onClick={()=>onChange(Math.min(max-1,value+1))} disabled={value===max-1}><ArrowRight size={22}/></button>
 </div>
}

export default function Home(){
 const [browseIndex,setBrowseIndex]=useState(0);
 const [eventIndex,setEventIndex]=useState(0);
 const selectedCategories=browseCategories.slice(browseIndex,browseIndex+4);
 return <>
   <HomeHero/>
   <div id="im-home-scroll-layer" className="im-home-scroll-layer">
   <section className="im-home-browse im-home-padding" id="new-arrivals">
     <div className="im-home-section-top"><h2>BROWSE OUR PRODUCTS</h2><Link href="/categories" className="im-shop-all-categories-button" aria-label="Shop all Impress rental categories">SHOP ALL CATEGORIES</Link></div>
     <div className="im-home-four-grid">{selectedCategories.map(item=><Link className="im-browse-item" href={item.href} key={item.name}><div className="im-browse-pic"><Image src={item.src} alt={`${item.name} for events`} fill sizes="(max-width:700px) 50vw, 25vw"/></div><span>{item.name}</span></Link>)}</div>
     <CarouselControls value={browseIndex} onChange={setBrowseIndex} max={browseCategories.length-3}/>
   </section>
   <section className="im-home-collection-banner"><Image src="/images/client-home/soft-table.jpg" alt="Refined linens, gold-rimmed plates and flowers at an event table" fill sizes="100vw"/><div className="im-home-banner-scrim"/><div><span>DISCOVER THE IMPRESS EDIT</span><h2>The Impress Collection</h2><Link href="/collections/impress">EXPLORE THE COLLECTION <ArrowRight size={15}/></Link></div></section>
   <section className="im-home-design"><div className="im-home-design-image"><Image src="/images/client-home/outdoor-aisle.jpg" alt="Sunlit outdoor ceremony with beautiful flowers and event chairs" fill sizes="(max-width:700px) 100vw, 50vw"/></div><div className="im-home-design-copy"><h2>DESIGN MADE EASY, POWERED BY IDEAS</h2><div className="im-design-divider"/><p>Bring your event vision to life with thoughtfully selected furniture, linens and tabletop pieces. Explore our curated collection, find new inspiration and bring beautiful details together for a celebration that feels uniquely yours.</p><p>From an intimate garden gathering to an unforgettable wedding reception, Impress Events is here to help you create the perfect setting.</p><Link href="/contact">GET IN TOUCH <ArrowRight size={14}/></Link></div></section>
   <section className="im-home-real-events im-home-padding"><div className="im-home-centered-title"><h2>Inspiration straight from real events</h2><Link href="/gallery">SHOP OUR DESIGN GALLERY</Link></div><ShopTheLookGallery variant="home" looks={designGallery.slice(eventIndex, eventIndex + 4)}/><CarouselControls value={eventIndex} onChange={setEventIndex} max={designGallery.length-3}/></section>
   <section className="im-home-furniture-banner"><Image src="/images/client-home/luxury-hall.png" alt="Grand wedding reception with elegant chairs and lavish table settings" fill sizes="100vw"/><div className="im-home-banner-scrim"/><div><h2>The Furniture Edit</h2><Link href="/furniture">EXPLORE OUR FURNITURE COLLECTION <ArrowRight size={15}/></Link></div></section>
   <section className="im-home-stories im-home-padding"><div className="im-home-section-top"><h2>FEATURED STORIES: <em>The Impress Journal</em></h2><Link href="/stories">BROWSE ALL STORIES <ArrowRight size={14}/></Link></div><div className="im-home-four-grid">{impressStories.map(story=><Link className="im-home-story-card" key={story.slug} href={`/stories/${story.slug}`}><div><Image src={story.hero} alt={story.heroAlt} fill sizes="(max-width:700px) 50vw, 25vw"/></div><p>{story.title}</p></Link>)}</div></section>
   <section className="im-home-professional"><h2>Are you an event professional?</h2><p>Discover the Impress trade partnership experience.</p><Link href="/trade" className="im-home-trade-link">EXPLORE TRADE PARTNERSHIPS <ArrowRight size={15}/></Link></section>
   </div>
 </>
}
