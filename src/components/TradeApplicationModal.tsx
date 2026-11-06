'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, X } from 'lucide-react';

type Props = { open: boolean; onClose: () => void };
type FormData = {
  fullName: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  city: string;
  websiteOrSocial: string;
  workFocus: string;
  details: string;
  consent: boolean;
  website: string; // hidden spam-trap; not a visible website field
};
const empty: FormData = {
  fullName: '', businessName: '', businessType: '', email: '', phone: '',
  city: '', websiteOrSocial: '', workFocus: '', details: '', consent: false, website: ''
};

export default function TradeApplicationModal({ open, onClose }: Props) {
  const [form, setForm] = useState<FormData>(empty);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => { sendingRef.current = sending; }, [sending]);
  useEffect(() => { if (!open) { setSent(false); setError(''); setSending(false); setForm(empty); } }, [open]);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !sendingRef.current) { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled):not([tabindex="-1"]), select:not(:disabled), textarea:not(:disabled), a[href]'
      )).filter(el => el.getClientRects().length > 0);
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  function change<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || !form.consent) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/trade', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(typeof json.error === 'string' ? json.error : 'Your enquiry could not be sent.');
      setSent(true);
      setForm(empty);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }
  if (!open) return null;
  const close = () => { if (!sending) onClose(); };

  return <div className="im-trade-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="im-trade-form-heading" aria-describedby="im-trade-form-summary" className="im-trade-modal">
      <div className="im-trade-modal-head">
        <div><span className="im-trade-eyebrow">IMPRESS EVENTS · TRADE PARTNERSHIPS</span><h2 id="im-trade-form-heading">Let&apos;s Work Together.</h2></div>
        <button ref={closeRef} type="button" className="im-trade-modal-close" onClick={close} disabled={sending} aria-label="Close trade application"><X size={23}/></button>
      </div>
      {sent ? <div className="im-trade-success" role="status">
        <CheckCircle2 size={48} strokeWidth={1.2}/>
        <h3>Thank You for Your Interest.</h3>
        <p>We&apos;ve received your trade partnership enquiry. The Impress team will review your details and respond by email. Submission does not automatically establish a trade account.</p>
        <button type="button" onClick={onClose} className="im-trade-primary">CLOSE <ArrowRight size={17}/></button>
      </div> : <form className="im-trade-form" onSubmit={submit}>
        <p id="im-trade-form-summary">Tell us a little about your business and the events you work on. Fields marked * are required.</p>
        <div className="im-trade-form-grid">
          <label><span>Your Full Name *</span><input autoComplete="name" required minLength={2} maxLength={120} value={form.fullName} onChange={e=>change('fullName',e.target.value)} placeholder="Full name" /></label>
          <label><span>Company / Business Name *</span><input autoComplete="organization" required minLength={2} maxLength={150} value={form.businessName} onChange={e=>change('businessName',e.target.value)} placeholder="Business or studio name" /></label>
          <label><span>Work / Business Type *</span><select required value={form.businessType} onChange={e=>change('businessType',e.target.value)}><option value="">Select your profession</option><option>Wedding / Event Planner</option><option>Event Stylist / Designer</option><option>Venue / Hospitality</option><option>Floral Designer</option><option>Event Production</option><option>Corporate Events</option><option>Other Event Professional</option></select></label>
          <label><span>Email Address *</span><input type="email" autoComplete="email" required maxLength={180} value={form.email} onChange={e=>change('email',e.target.value)} placeholder="you@business.com" /></label>
          <label><span>Contact Number *</span><input type="tel" autoComplete="tel" required pattern="[+0-9() .\-]{7,40}" maxLength={40} value={form.phone} onChange={e=>change('phone',e.target.value)} placeholder="Phone / WhatsApp" /></label>
          <label><span>City / Service Area *</span><input autoComplete="address-level2" required minLength={2} maxLength={120} value={form.city} onChange={e=>change('city',e.target.value)} placeholder="Your location" /></label>
          <label className="im-trade-full"><span>Business Website / Instagram (optional)</span><input maxLength={250} value={form.websiteOrSocial} onChange={e=>change('websiteOrSocial',e.target.value)} placeholder="Website URL or Instagram handle" /></label>
          <label className="im-trade-full"><span>What Services Are You Interested In? *</span><select required value={form.workFocus} onChange={e=>change('workFocus',e.target.value)}><option value="">Select rental interest</option><option>Linens, Napkins &amp; Runners</option><option>Chairs &amp; Event Tables</option><option>Tabletop, Chargers &amp; Glassware</option><option>Full Event Rental Collection</option><option>Partnership / Project Collaboration</option></select></label>
          <label className="im-trade-full"><span>Tell Us About Your Work (optional)</span><textarea rows={4} maxLength={1500} value={form.details} onChange={e=>change('details',e.target.value)} placeholder="Types of events, upcoming projects or how you'd like to work with Impress..." /></label>
        </div>
        <div className="im-trade-honeypot" aria-hidden="true"><label>Do not fill<input tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>change('website',e.target.value)} /></label></div>
        <label className="im-trade-consent"><input type="checkbox" required checked={form.consent} onChange={e=>change('consent',e.target.checked)} /><span>I agree that Impress Events may contact me about this trade enquiry. I understand this form is a request, not automatic approval. *</span></label>
        {error && <p className="im-trade-error" role="alert"><AlertCircle size={16}/>{error}</p>}
        <div className="im-trade-form-actions"><button className="im-trade-primary" type="submit" disabled={sending}>{sending ? 'SENDING ENQUIRY…' : 'SUBMIT PARTNERSHIP ENQUIRY'} <ArrowRight size={17}/></button><p>We&apos;ll be in touch using the details you provide.</p></div>
      </form>}
    </div>
  </div>;
}
