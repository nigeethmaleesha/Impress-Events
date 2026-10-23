'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, AlertCircle } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { getCategoryImage, products } from '@/lib/catalogue';
import { useQuote } from '@/context/QuoteContext';
import QuoteRequestModal from '@/components/QuoteRequestModal';

type State = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  customEventType: string;
  attendeeCount: string;
  eventDate: string;
  eventLocation: string;
  notes: string;
  website: string;
};

const initial: State = {
  name: '',
  email: '',
  phone: '',
  eventType: 'Wedding',
  customEventType: '',
  attendeeCount: '',
  eventDate: '',
  eventLocation: '',
  notes: '',
  website: '',
};

export default function QuoteForm() {
  const { items, hydrated, updateQuantity, removeItem, clear } = useQuote();
  const [form, setForm] = useState<State>(initial);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [quoteOpen, setQuoteOpen] = useState(false);

  const enriched = useMemo(
    () => items.map((i) => ({ item: i, product: products.find((p) => p.id === i.productId) })).filter((x) => x.product !== undefined),
    [items],
  );

  const edit = (name: keyof State, value: string) => setForm((prev) => ({ ...prev, [name]: value }));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length || sending) return;
    setSending(true);
    setError('');
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Could not send your request.');
      setSuccess(body.reference);
      clear();
      setForm(initial);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

  if (success) return <section className="quote-success page-container"><div className="success-circle"><Check size={35} /></div><span className="eyebrow">Enquiry Submitted</span><h1>Thank You For<br /><em>Getting In Touch.</em></h1><p>Your rental quotation request has been sent. We&apos;ll review your items and event details and respond by email.</p><div className="confirmation-reference"><span>Your Reference</span><b>{success}</b></div><p className="confirmation-note">Please note: submitting a request does not confirm a booking or reserve rental items.</p><Link href="/rentals" className="button button-dark">Continue Exploring <ArrowRight size={17} /></Link></section>;

  return <>
    <QuoteRequestModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    <div className="page-container"><div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={13} /><span>Request Quotation</span></div></div>
    {!hydrated ? <div className="page-container quote-loading">Loading your quote cart…</div> : items.length === 0 ? <div className="empty-quote page-container"><ShoppingBag size={40} strokeWidth={1.2} /><h2>Your Story Starts With A Selection.</h2><p>Your quotation cart is empty. You can still request a quotation without choosing products yet just tell us what you need.</p><button type="button" className="button button-dark" onClick={() => setQuoteOpen(true)}>Request A Quotation <ArrowRight size={17} /></button></div> : <div className="page-container quote-page-layout"><div className="quote-form-side"><div className="step-label"><span>01</span> Your Selected Pieces</div><div className="quote-items">{enriched.map(({ item, product }) => product && <div className="quote-line" key={`${item.productId}-${item.variant}`}><div className="quote-thumb"><Image src={getCategoryImage(product.category)} alt="Illustrative category photo" fill unoptimized sizes="100px" /></div><div className="quote-line-info"><Link href={`/rentals/${product.id}`}>{product.title}</Link><span>SKU {product.sku} · {item.variant}</span><span>Price on request</span><div className="quote-line-controls"><div className="quantity-picker small"><button aria-label="Decrease quantity" disabled={item.quantity === 1} onClick={() => updateQuantity(item.productId, item.variant, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" disabled={item.quantity === 999} onClick={() => updateQuantity(item.productId, item.variant, item.quantity + 1)}><Plus size={13} /></button></div><button onClick={() => removeItem(item.productId, item.variant)} className="remove-line"><Trash2 size={15} /> Remove</button></div></div></div>)}</div><Link href="/rentals" className="continue-rentals"><ArrowLeft size={16} /> Add More Rentals</Link>
      <form className="request-form" onSubmit={submit} noValidate={false}><div className="step-label"><span>02</span> Your Contact Information</div><div className="form-grid"><label className="form-field"><span>Full Name *</span><input value={form.name} onChange={e => edit('name', e.target.value)} placeholder="Your full name" required minLength={2} maxLength={120} autoComplete="name" /></label><label className="form-field"><span>Email Address *</span><input type="email" value={form.email} onChange={e => edit('email', e.target.value)} placeholder="you@example.com" required maxLength={180} autoComplete="email" /></label><label className="form-field full"><span>Contact Number *</span><input type="tel" value={form.phone} onChange={e => edit('phone', e.target.value)} placeholder="Your phone number" required pattern="[+0-9() \-]{7,40}" maxLength={40} autoComplete="tel" /></label></div><div className="step-label next-step"><span>03</span> Tell Us About Your Event</div><div className="form-grid"><label className="form-field"><span>Event Type *</span><select value={form.eventType} onChange={e => edit('eventType', e.target.value)} required><option>Wedding</option><option>Engagement</option><option>Birthday / Private Celebration</option><option>Corporate Event</option><option>Funeral</option><option>Other</option></select></label><label className="form-field"><span>Number Of Attendees *</span><input type="number" min={1} max={100000} value={form.attendeeCount} onChange={e => edit('attendeeCount', e.target.value)} placeholder="Approximate guest count" required /></label>{form.eventType === 'Other' && <label className="form-field full"><span>Please Specify The Event Type *</span><input value={form.customEventType} onChange={e => edit('customEventType', e.target.value)} placeholder="Please enter the event type" required={form.eventType === 'Other'} maxLength={80} minLength={2} /></label>}<label className="form-field"><span>Event Date *</span><input type="date" min={new Date().toISOString().slice(0, 10)} value={form.eventDate} onChange={e => edit('eventDate', e.target.value)} required /></label><label className="form-field full"><span>Event Location *</span><input value={form.eventLocation} onChange={e => edit('eventLocation', e.target.value)} placeholder="Venue, city or area" required maxLength={220} minLength={2} /></label><label className="form-field full"><span>Additional Requirements *</span><textarea value={form.notes} onChange={e => edit('notes', e.target.value)} rows={5} maxLength={1500} minLength={8} required placeholder="Tell us what you need, your styling ideas, setup details or delivery requirements." /></label></div><div className="honeypot" aria-hidden="true"><label>Website <input type="text" value={form.website} onChange={e => edit('website', e.target.value)} tabIndex={-1} autoComplete="off" /></label></div><div className="form-reminder"><ShieldCheck size={21} /><p>This is a quotation request only. Items are not booked or reserved until our team confirms availability and terms with you.</p></div>{error && <div className="form-error" role="alert"><AlertCircle size={17} />{error}</div>}<button className="button button-dark submit-button" type="submit" disabled={sending}>{sending ? 'Sending your enquiry…' : <>Send Quotation Request <ArrowRight size={18} /></>}</button><p className="submission-footnote">No payment required. You&apos;ll receive a confirmation on screen once your request has been sent.</p></form>
      </div><aside className="quote-aside"><div className="quote-summary"><span className="eyebrow">Your Enquiry</span><h3>Quotation Summary</h3><div className="summary-count"><span>Selected Products</span><b>{items.length}</b></div><div className="summary-count"><span>Total Rental Quantities</span><b>{items.reduce((n, i) => n + i.quantity, 0)}</b></div><div className="summary-separator" /><div className="summary-price"><span>Rental Total</span><strong>To Be Quoted</strong></div><p>Pricing and availability will be confirmed by our team after reviewing your request.</p></div><div className="quote-help"><CheckCircle2 size={19} /><span>Questions about your event? <Link href="/contact">Talk to our team.</Link></span></div></aside></div>}
  </>;
}
