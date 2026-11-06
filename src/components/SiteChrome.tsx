'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight, Instagram, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useQuote } from '@/context/QuoteContext';
import { catalogueFamilies } from '@/lib/catalogue';

const mainLinks = [
  { label: 'New Arrivals', href: '/#new-arrivals', image: '/images/client-home/hero-event-table.jpg', description: 'Explore our newest rental pieces and thoughtfully chosen seasonal favourites.', group: 'new' },
  { label: 'Linens', href: '/rentals?family=linens', image: '/images/client-home/tablecloth-setting.jpg', description: 'Layer texture and colour with elegant tablecloths, runners, napkins and more.', group: 'linens' },
  { label: 'Furniture', href: '/furniture', image: '/images/client-home/long-table.jpg', description: 'Complete your event with beautiful tables, chairs and finishing touches.', group: 'furniture' },
  { label: 'Tabletop and Accessories', href: '/rentals?family=tabletop', image: '/images/client-home/charger-place-setting.jpg', description: 'Explore carefully selected dinnerware details, chargers and glassware.', group: 'tabletop' },
  { label: 'Our Collections', href: '/categories', image: '/images/client-home/romantic-florals.jpg', description: 'Find a curated setting to suit your celebration.', group: 'collections' },
  { label: 'Your Quotation', href: '/quote', image: '/images/client-home/neutral-place-setting.jpg', description: 'Review your selected rentals and request a tailored quotation.', group: 'quote' },
  { label: 'Inspiration', href: '/lookbook', image: '/images/client-home/outdoor-aisle.jpg', description: 'Find inspiration in timeless celebrations and beautifully styled occasions.', group: 'inspiration' },
];
const groupItems: Record<string, { label: string; href: string }[]> = {
  new: [{label:'Shop All Rentals',href:'/rentals'},{label:'See New Arrivals',href:'/#new-arrivals'},...catalogueFamilies.linens.categories.slice(0,3).map(label=>({label,href:`/rentals?category=${encodeURIComponent(label)}`}))],
  linens: catalogueFamilies.linens.categories.map(label=>({label,href:`/rentals?category=${encodeURIComponent(label)}`})),
  furniture: catalogueFamilies.furniture.categories.map(label=>({label,href:`/rentals?category=${encodeURIComponent(label)}`})),
  tabletop: catalogueFamilies.tabletop.categories.map(label=>({label,href:`/rentals?category=${encodeURIComponent(label)}`})),
  collections:[{label:'Browse All Categories',href:'/categories'}, {label:'Shop Linens',href:'/rentals?family=linens'}, {label:'Shop Furniture',href:'/furniture'}, {label:'Shop Tabletop',href:'/rentals?family=tabletop'}],
  quote:[{label:'View Quotation Bag',href:'/quote'},{label:'Contact Us',href:'/contact'}],
  inspiration:[{label:'Real Events',href:'/lookbook'}, {label:'About Impress',href:'/about'}],
};

export function Header() {
  const pathname=usePathname();
  const { count, hydrated }=useQuote();
  const [menuOpen,setMenuOpen]=useState(false);
  const [activeGroup,setActiveGroup]=useState<string|null>(null);
  const [searchOpen,setSearchOpen]=useState(false);
  const [query,setQuery]=useState('');
  const [scrolled,setScrolled]=useState(false);
  const [headerHovered,setHeaderHovered]=useState(false);
  const [scrollProgress,setScrollProgress]=useState(0);
  const searchRef=useRef<HTMLInputElement>(null);
  const menuButtonRef=useRef<HTMLButtonElement>(null);
  const firstMenuRef=useRef<HTMLAnchorElement>(null);
  useEffect(()=>{setMenuOpen(false);setSearchOpen(false);setActiveGroup(null);setHeaderHovered(false)},[pathname]);
  // Keep the homepage header transparent while the sticky hero is visible.
  // Only switch to the cream header when the scrolling content reaches it.
  useEffect(() => {
    const listener = () => {
      if (pathname === '/') {
        const content = document.getElementById('im-home-scroll-layer');
        setScrolled(content ? content.getBoundingClientRect().top <= 66 : window.scrollY > 28);
      } else {
        setScrolled(window.scrollY > 28);
      }
      const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(availableScroll > 0 ? Math.min(1,Math.max(0,window.scrollY / availableScroll)) : 0);
    };
    listener();
    window.addEventListener('scroll', listener, { passive: true });
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
    };
  }, [pathname]);
  useEffect(()=>{if(searchOpen)searchRef.current?.focus()},[searchOpen]);
  useEffect(()=>{const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenuOpen(false);setActiveGroup(null);setSearchOpen(false);menuButtonRef.current?.focus()}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape)},[]);
  useEffect(()=>{if(!menuOpen)return;const prior=document.body.style.overflow;document.body.style.overflow='hidden';firstMenuRef.current?.focus();return()=>{document.body.style.overflow=prior}},[menuOpen]);
  const closeMenu=()=>{setMenuOpen(false);setActiveGroup(null)};
  const home=pathname==='/' && !scrolled && !headerHovered && !menuOpen && !searchOpen;
  const selected=mainLinks.find(item=>item.group===activeGroup);
  return <div className={`im-shell${pathname==='/'?' im-shell-home':''}${pathname==='/' && !scrolled?' im-shell-precontent':''}${home?' im-shell-transparent':''}`}>
    <div className="im-page-progress" aria-hidden="true"><span style={{transform:`scaleX(${scrollProgress})`}}/></div>
    <header className="im-site-header" onMouseEnter={()=>setHeaderHovered(true)} onMouseLeave={()=>setHeaderHovered(false)}>
      <div className="im-head-start">
        <button ref={menuButtonRef} type="button" aria-expanded={menuOpen} aria-controls="im-drawer" aria-label={menuOpen?'Close navigation':'Open navigation'} className="im-icon im-menu-toggle" onClick={()=>{setMenuOpen(v=>!v);setSearchOpen(false);setActiveGroup(null)}}>{menuOpen?<X strokeWidth={1.35}/>:<Menu strokeWidth={1.35}/>}<span className="im-menu-word">{menuOpen?'Close':''}</span></button>
        {!menuOpen&&<button className="im-icon im-search-trigger" type="button" aria-label="Search rentals" aria-expanded={searchOpen} onClick={()=>{setSearchOpen(v=>!v);setMenuOpen(false)}}><Search strokeWidth={1.35}/></button>}
      </div>
      <Link href="/" className="im-header-logo" aria-label="Impress Events — Go to homepage" onClick={closeMenu}><Image src={home ? "/images/brand/impress-logo-white.png" : "/images/brand/impress-logo.png"} width={200} height={170} alt="Impress Events" priority /></Link>
      <div className="im-head-end">
        <Link href="/quote" className="im-icon im-header-bag" aria-label={`Quotation bag with ${count} items`}><ShoppingBag strokeWidth={1.3}/>{hydrated&&count>0&&<span>{count}</span>}</Link>
        <Link href="/contact" className="im-head-contact">CONTACT</Link>
      </div>
    </header>
    {searchOpen&&<div id="im-search" className="im-search-panel"><form action="/rentals" role="search"><Search size={20}/><input ref={searchRef} name="q" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search our collection" aria-label="Search rental products"/><button type="submit" aria-label="Submit search"><ArrowRight size={20}/></button><button type="button" aria-label="Close search" onClick={()=>setSearchOpen(false)}><X size={20}/></button></form></div>}
    {menuOpen&&<div className="im-menu-layer" id="im-drawer" role="dialog" aria-modal="true" aria-label="Main navigation">
      <button type="button" className="im-menu-backdrop" aria-label="Close navigation" onClick={closeMenu}/>
      <nav className="im-menu-primary" aria-label="Main navigation">
        {mainLinks.map((item,i)=><div className="im-menu-main-row" key={item.group} onMouseEnter={()=>setActiveGroup(item.group)}><Link ref={i===0?firstMenuRef:undefined} href={item.href} onClick={closeMenu} className={activeGroup===item.group?'is-active':''}>{item.label}</Link><button type="button" aria-label={`Browse ${item.label}`} aria-expanded={activeGroup===item.group} onClick={()=>setActiveGroup(activeGroup===item.group?null:item.group)}><ChevronRight size={20} strokeWidth={1.3}/></button></div>)}
        <div className="im-menu-divider"/><Link href="/about" onClick={closeMenu} className="im-menu-secondary">About Us</Link><Link href="/contact" onClick={closeMenu} className="im-menu-secondary">Contact Us</Link><Link href="/faq" onClick={closeMenu} className="im-menu-secondary">FAQs</Link>
      </nav>
      {selected&&<div className="im-menu-submenu" key={selected.group}>
        <button className="im-menu-submenu-back" type="button" onClick={()=>setActiveGroup(null)}><ArrowLeft size={16}/> Back to menu</button>
        <Link href={selected.href} onClick={closeMenu} className="im-menu-image"><Image src={selected.image} alt={`${selected.label} event rentals`} fill sizes="(max-width:700px) 65vw, 27vw"/><span>SHOP {selected.label.toUpperCase()} <ArrowRight size={17}/></span></Link>
        <h2>{selected.label}</h2><p>{selected.description}</p>
        <div className="im-menu-submenu-links">{groupItems[selected.group].map(item=><Link key={item.href+item.label} href={item.href} onClick={closeMenu}>{item.label}</Link>)}</div>
      </div>}
    </div>}
  </div>
}

const footerGroups=[
 {label:'Resources',links:[['Lookbook','/lookbook'],['Rental Catalogue','/rentals'],['All Categories','/categories'],['Rental FAQs','/faq'],['Your Quotation','/quote'],['Trade Partnerships','/trade']]},
 {label:'Customer Experience',links:[['Contact Us','/contact'],['Rental Policy','/policies/rental'],['Terms and Conditions','/policies/terms'],['Privacy Policy','/policies/privacy']]},
 {label:'Our Company',links:[['About Us','/about'],['Inspiration','/lookbook'],['Contact','/contact']]},
] as const;
const instagramImages=['/images/client-home/romantic-florals.jpg','/images/client-home/outdoor-aisle.jpg','/images/client-home/long-table.jpg','/images/client-home/charger-place-setting.jpg','/images/client-home/warm-dining.jpg','/images/client-home/brand-showcase-event.jpg','/images/client-home/hero-event-table.jpg','/images/client-home/neutral-place-setting.jpg'];
export function Footer(){return <footer className="im-editorial-footer">
    <div className="im-footer-giant" aria-label="Impress Events">IMPRESS</div>
    <div className="im-footer-columns">
      {footerGroups.map(group=><nav key={group.label} aria-label={group.label} className="im-footer-col"><h2>{group.label}</h2>{group.links.map(([label,href])=><Link href={href} key={label}>{label}</Link>)}</nav>)}
      <div className="im-footer-col im-footer-connect"><h2>Stay in touch</h2><p>Thoughtfully curated event rentals. Beautiful details, lasting impressions.</p><Link href="/contact">Contact Impress Events <ArrowRight size={15}/></Link></div>
    </div>
    <div className="im-footer-social-heading"><span>Follow along for inspiration</span><Instagram size={19}/></div>
    <div className="im-footer-photos">{instagramImages.map((src,i)=><Link key={src} href="/lookbook" aria-label={`View event inspiration photo ${i+1}`}><Image src={src} alt={`Impress event inspiration ${i+1}`} fill sizes="(max-width:600px) 25vw, 12.5vw"/></Link>)}</div>
    <div className="im-footer-end"><span>© {new Date().getFullYear()} Impress Events. All rights reserved.</span><div><Link href="/policies/terms">Terms</Link><Link href="/policies/privacy">Privacy Policy</Link><Link href="/contact">Contact</Link></div></div>
  </footer>}
