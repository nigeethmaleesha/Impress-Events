'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuote } from '@/context/QuoteContext';

const links = [
  { href: '/', title: 'Home' },
  { href: '/rentals', title: 'The Collection' },
  { href: '/lookbook', title: 'Inspiration' },
  { href: '/about', title: 'Our Story' },
  { href: '/contact', title: 'Contact' },
];

export function Header() {
  const { count, hydrated } = useQuote();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const pathname = usePathname();

  useEffect(() => { setOpen(false); setSearchOpen(false); }, [pathname]);

  return (
    <div className="site-header-shell">
      <header className="header">
        <Link href="/" className="brandmark" aria-label="Impress Events Home">
          <Image src="/images/brand/impress-logo.png" alt="Impress Luxury Event Rentals" width={180} height={136} priority className="brandmark-image" />
        </Link>
        <nav className="navlinks" aria-label="Main Navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''} aria-current={pathname === link.href ? 'page' : undefined}>{link.title}</Link>)}
        </nav>
        <div className="header-actions">
          <button aria-label="Search The Rental Catalogue" aria-expanded={searchOpen} className="icon-button" type="button" onClick={() => { setOpen(false); setSearchOpen(!searchOpen); }}><Search size={19} strokeWidth={1.6} /></button>
          <Link href="/quote" className="icon-button cart-link" aria-label={`Quote Cart With ${count} Selected Items`}><ShoppingBag size={19} strokeWidth={1.6} />{hydrated && count > 0 && <span className="cart-count">{count > 99 ? '99+' : count}</span>}</Link>
          <button type="button" aria-label={open ? 'Close Menu' : 'Open Menu'} aria-expanded={open} className="icon-button mobile-menu-button" onClick={() => { setSearchOpen(false); setOpen(!open); }}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {searchOpen && <form action="/rentals" className="header-search"><Search size={17} aria-hidden="true" /><input name="q" aria-label="Search Rentals" placeholder="Search The Collection..." value={search} onChange={(e) => setSearch(e.target.value)} autoFocus /><button type="submit">Search <ArrowRight size={15} /></button></form>}
      </header>
      {open && <nav className="mobile-nav" aria-label="Mobile Navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.title}<ArrowRight size={17} /></Link>)}<Link className="mobile-quote" href="/quote" onClick={() => setOpen(false)}>Your Quote Cart ({count})</Link></nav>}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top page-container">
        <div className="footer-brand">
          <Link href="/" className="footer-logo-link" aria-label="Impress Events Home"><Image src="/images/brand/impress-logo.png" alt="Impress Luxury Event Rentals" width={170} height={128} className="footer-logo" /></Link>
          <p>Thoughtful Rentals For Beautiful Celebrations.</p>
        </div>
        <div className="footer-col"><h4>Explore</h4><Link href="/rentals">The Collection</Link><Link href="/lookbook">Inspiration</Link><Link href="/about">Our Story</Link><Link href="/contact">Contact</Link></div>
        <div className="footer-col"><h4>Support</h4><Link href="/faq">Frequently Asked Questions</Link><Link href="/policies/rental">Rental Policy</Link><Link href="/policies/terms">Terms & Conditions</Link><Link href="/policies/privacy">Privacy Policy</Link><Link href="/policies/cancellation">Cancellation & Damages</Link></div>
        <div className="footer-col footer-message"><h4>Planning Something Special?</h4><p>We Would Love To Hear About It.</p><Link href="/contact" className="ie-text-link">Get In Touch <ArrowRight size={16} /></Link></div>
      </div>
      <div className="footer-bottom page-container"><span>© {new Date().getFullYear()} Impress Events. All Rights Reserved.</span><span>Luxury Event Rentals</span></div>
    </footer>
  );
}
