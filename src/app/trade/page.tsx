'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarCheck2, ClipboardCheck, HeartHandshake, Layers3, MessageCircleHeart, PanelsTopLeft, Sparkles } from 'lucide-react';
import { useCallback, useState } from 'react';
import TradeApplicationModal from '@/components/TradeApplicationModal';
import './trade.css';

const benefits = [
  { Icon: Layers3, title: 'Explore Our Rental Collection', body: 'Browse thoughtful linens, event furniture, tabletop pieces and finishing details for celebrations of different sizes.' },
  { Icon: MessageCircleHeart, title: 'Talk Through Your Vision', body: 'Share your event ideas and discuss which pieces from the Impress catalogue could work for your setting.' },
  { Icon: ClipboardCheck, title: 'Request a Tailored Quote', body: 'Send the products, quantities and event details you need so our team can review availability and rental requirements.' },
  { Icon: PanelsTopLeft, title: 'Style With Confidence', body: 'Use collection images and real-event styling inspiration to bring colour, texture and personality together.' },
  { Icon: CalendarCheck2, title: 'Plan for Each Occasion', body: 'Tell us about your dates, venue and type of event so the conversation can start with the right information.' },
  { Icon: HeartHandshake, title: 'A Collaborative Approach', body: 'Explore working with Impress on weddings, private celebrations, corporate gatherings and styled events.' },
];

export default function TradePage(){
  const [open,setOpen] = useState(false);
  const onClose = useCallback(()=>setOpen(false),[]);
  const onOpen = ()=>setOpen(true);
  return <div className="im-trade-page">
    <TradeApplicationModal open={open} onClose={onClose}/>
    <section className="im-trade-hero">
      <Image src="/images/client-home/romantic-florals.jpg" alt="Elegant floral arrangement and beautifully styled event table" fill priority sizes="100vw" />
      <div className="im-trade-hero-shade" />
      <div className="im-trade-hero-inner">
        <Image className="im-trade-hero-logo" src="/images/brand/impress-logo-white.png" alt="Impress Events" width={125} height={110} />
        <p className="im-trade-kicker">ARE YOU IN THE EVENT INDUSTRY?</p>
        <h1>Partner With Impress</h1>
        <p className="im-trade-hero-sub">Your creativity, our curated event rentals. Discover a thoughtful way to collaborate on exceptional celebrations.</p>
        <button type="button" onClick={onOpen} className="im-trade-primary">ENQUIRE ABOUT PARTNERING <ArrowRight size={17}/></button>
      </div>
    </section>

    <section className="im-trade-intro">
      <h2>Beautiful Events Begin With Great Partnerships.</h2>
      <p>Whether you plan weddings, style private celebrations, manage a venue or bring corporate events to life, Impress Events offers a carefully selected collection to help shape your ideas. Start a conversation with our team about the rental pieces your projects need.</p>
      <div className="im-trade-intro-photo"><Image src="/images/client-home/blush-table-detail.jpg" alt="Blush floral tablescape with carefully styled plates, glassware and napkins" fill sizes="(max-width:700px) 75vw, 380px" /></div>
    </section>

    <section className="im-trade-benefits">
      <div className="im-trade-benefits-head"><span className="im-trade-eyebrow">DISCOVER WHAT'S POSSIBLE</span><h2>Working With Impress.</h2><p>Thoughtful pieces, useful inspiration and a clear path to your next rental enquiry.</p></div>
      <div className="im-trade-benefits-grid">
        {benefits.map(({Icon,title,body})=><article className="im-trade-benefit" key={title}><Icon size={27} strokeWidth={1.35} aria-hidden="true"/><h3>{title}</h3><p>{body}</p></article>)}
      </div>
      <p className="im-trade-benefits-disclaimer">Rental availability, pricing and any trade arrangements are confirmed individually by Impress Events; submitting an enquiry does not guarantee approval or reservations.</p>
    </section>

    <section className="im-trade-statement"><h2>Considered Details. Memorable Celebrations.</h2><p>Great event design comes from the people behind it. Tell us about your work, explore our collections and discover how Impress Events might support your upcoming projects.</p><Link href="/rentals">BROWSE THE RENTAL COLLECTION <ArrowRight size={16}/></Link></section>

    <section className="im-trade-final"><Image src="/images/client-home/hero-event-table.jpg" alt="Beautifully arranged wedding reception table with soft flowers and rental table settings" fill sizes="100vw"/><div className="im-trade-final-shade"/><div><span className="im-trade-kicker">LET'S CREATE SOMETHING BEAUTIFUL</span><h2>Ready to Collaborate?</h2><p>Share your professional details and start the conversation.</p><button type="button" className="im-trade-primary" onClick={onOpen}>REQUEST TRADE PARTNERSHIP <ArrowRight size={17}/></button></div></section>
  </div>;
}
