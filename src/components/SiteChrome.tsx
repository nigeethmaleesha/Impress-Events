'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, Menu, Search, ShoppingBag, X, Instagram } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useQuote } from '@/context/QuoteContext';
import { categories } from '@/lib/catalogue';

// Same primary destinations as the desktop navigation, plus the FAQ resource.
const navigation = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/rentals', label: 'The Collection' },
  { href: '/lookbook', label: 'Inspiration' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQs' },
];
const categoryGroups = [
  { title: 'Linens', items: ['Tablecloths', 'Napkins', 'Runners'], image: '/images/client-home/tablecloth-setting.jpg' },
  { title: 'Furniture', items: ['Chairs', 'Tables'], image: '/images/client-home/chair-ceremony.jpg' },
  { title: 'Tabletop & Accessories', items: ['Chargers', 'Placemats', 'Glassware', 'Cutlery', 'Napkin Rings', 'Table Numbers', 'Chair Sashes', 'Cushion Covers'], image: '/images/client-home/charger-place-setting.jpg' },
];

export function Header() {
  const { count, hydrated } = useQuote();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pathname = usePathname();
  const homePage = pathname === "/";
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // Outside clicks dismiss the catalogue menu without preventing ordinary page navigation.
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuPanelRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [menuOpen]);
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); setMegaOpen(false); }, [pathname]);
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); setMegaOpen(false); } };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);
  // The homepage always shows this toggle at the top LEFT. Inner pages keep
  // their original desktop navigation and only show the toggle on tablets/phones.
  const menuToggle = (
    <button
      ref={menuButtonRef}
      type="button"
      className={`icon-button mobile-menu-button ${homePage ? 'im-home-menu-button' : ''}`}
      aria-label={menuOpen ? 'Close site menu' : 'Open site menu'}
      aria-controls="nd-site-menu"
      aria-expanded={menuOpen}
      onClick={() => { setMenuOpen((open) => !open); setSearchOpen(false); setMegaOpen(false); }}
    >
      {menuOpen ? <X size={25} strokeWidth={1.6}/> : <Menu size={25} strokeWidth={1.6}/>}
    </button>
  );
  return (
    <div className={`site-header-shell nd-shell ${homePage ? "im-home-header" : ""}`} onMouseLeave={() => setMegaOpen(false)}>
      <div className="nd-announcement">CURATED RENTALS FOR EVERY CELEBRATION <span>•</span> LET'S MAKE SOMETHING BEAUTIFUL</div>
      <header className="header nd-header">
        {homePage && menuToggle}
        <Link href="/" className="brandmark nd-brand" aria-label="Impress Events — Home"><Image src="/images/brand/impress-logo.png" alt="Impress Luxury Event Rentals" width={180} height={136} priority className="brandmark-image" /></Link>
        <nav className="nd-navigation" aria-label="Primary navigation">
          <Link href="/" className={pathname === '/' ? 'nd-active' : ''}>Home</Link>
          <div className="nd-nav-item" onMouseEnter={() => setMegaOpen(true)}>
            <Link href="/categories" className={pathname === '/categories' ? 'nd-active' : ''} onFocus={() => setMegaOpen(true)}>Categories</Link>
            <button type="button" className="nd-mega-toggle" aria-label="Show categories submenu" aria-expanded={megaOpen} onClick={() => setMegaOpen(!megaOpen)}><ChevronDown size={13}/></button>
          </div>
          <Link href="/rentals" className={pathname === '/rentals' ? 'nd-active' : ''}>The Collection</Link>
          <Link href="/lookbook" className={pathname === '/lookbook' ? 'nd-active' : ''}>Inspiration</Link>
          <Link href="/about" className={pathname === '/about' ? 'nd-active' : ''}>Our Story</Link>
          <Link href="/contact" className={pathname === '/contact' ? 'nd-active' : ''}>Contact</Link>
        </nav>
        <div className="header-actions nd-actions">
          {homePage && <Link className="im-header-contact" href="/contact">CONTACT US</Link>}
          <button type="button" className="icon-button" title="Search collection" aria-label="Search the collection" aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); setMegaOpen(false); }}><Search size={20} strokeWidth={1.5}/></button>
          <Link className="icon-button cart-link" href="/quote" aria-label={`Quote bag, ${count} selected items`}><ShoppingBag size={21} strokeWidth={1.5}/>{hydrated && count > 0 && <span className="cart-count">{count > 99 ? '99+' : count}</span>}</Link>
          {!homePage && menuToggle}
        </div>
        {searchOpen && <form action="/rentals" className="nd-search" role="search"><Search size={18}/><input name="q" aria-label="Search rentals" placeholder="Search products, colours or item codes..." value={query} autoFocus onChange={e => setQuery(e.target.value)}/><button type="submit">SEARCH <ArrowRight size={16}/></button><button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={18}/></button></form>}
      </header>
      {megaOpen && <div className="nd-mega" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
        <div className="nd-mega-inner page-container">
          {categoryGroups.map(group => <div className="nd-mega-column" key={group.title}>
            <Link className="nd-mega-title" href="/categories" onClick={() => setMegaOpen(false)}>{group.title} <ArrowRight size={15}/></Link>
            {group.items.filter(item => categories.some(c => c.name === item)).map(item => <Link key={item} href={`/rentals?category=${encodeURIComponent(item)}`} onClick={() => setMegaOpen(false)}>{item}</Link>)}
          </div>)}
          <Link className="nd-mega-photo" href="/lookbook" onClick={() => setMegaOpen(false)}><Image src="/images/client-home/warm-dining.jpg" alt="Refined event table setting" fill sizes="230px"/><span>Discover our inspiration <ArrowRight size={15}/></span></Link>
        </div>
      </div>}
      {menuOpen && <nav ref={menuPanelRef} id="nd-site-menu" className="nd-mobile-menu" aria-label="Site menu">
        {navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowRight size={16}/></Link>)}
        <div className="nd-mobile-category-links">{categories.slice(0, 8).map(c => <Link key={c.name} href={`/rentals?category=${encodeURIComponent(c.name)}`} onClick={() => setMenuOpen(false)}>{c.name}</Link>)}</div>
        <Link href="/quote" className="nd-mobile-quote" onClick={() => setMenuOpen(false)}>View your quote bag ({count}) <ShoppingBag size={18}/></Link>
      </nav>}
    </div>
  );
}

export function Footer() {
  return <footer className="footer nd-footer">
    <div className="page-container nd-footer-top">
      <div className="nd-footer-brand"><Link href="/" aria-label="Impress Events Home"><Image src="/images/brand/impress-logo.png" alt="Impress Events" width={180} height={136}/></Link><p>Beautifully considered pieces for weddings, celebrations and events worth remembering.</p><span>Event styling starts with the little things.</span></div>
      <div className="nd-footer-col"><h4>THE COLLECTION</h4><Link href="/categories">Shop by Category</Link><Link href="/rentals?category=Tablecloths">Table Linens</Link><Link href="/rentals?category=Chairs">Furniture</Link><Link href="/rentals?category=Chargers">Tabletop</Link><Link href="/rentals">All Rentals</Link></div>
      <div className="nd-footer-col"><h4>DISCOVER</h4><Link href="/lookbook">Inspiration</Link><Link href="/about">Our Story</Link><Link href="/contact">Contact Us</Link><Link href="/faq">FAQs</Link></div>
      <div className="nd-footer-col"><h4>INFORMATION</h4><Link href="/policies/rental">Rental Policy</Link><Link href="/policies/terms">Terms & Conditions</Link><Link href="/policies/privacy">Privacy Policy</Link><Link href="/policies/cancellation">Cancellation & Damages</Link><Link href="/quote">Your Quote Bag</Link></div>
      <div className="nd-footer-contact"><span>HERE TO HELP</span><h3>Planning something special?</h3><p>Let us help you bring your vision to life.</p><Link href="/contact" className="nd-outline-button">GET IN TOUCH <ArrowRight size={16}/></Link><Instagram size={19} aria-hidden="true"/></div>
    </div>
    <div className="page-container nd-footer-bottom"><span>© {new Date().getFullYear()} Impress Events. All rights reserved.</span><span>Luxury Event Rentals · Design-led celebrations</span></div>
  </footer>;
}
