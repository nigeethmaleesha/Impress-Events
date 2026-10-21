'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight, Check, ShieldCheck, X } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

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

export default function QuoteRequestModal({ open, onClose }: Props) {
  const { items, count, hydrated } = useQuote();
  const [form, setForm] = useState<State>(initial);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const selectedItems = useMemo(() => (hydrated ? items : []), [hydrated, items]);

  const edit = (key: keyof State, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !sending) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, sending]);

  useEffect(() => {
    if (!open) {
      setError('');
      setSuccess('');
      setSending(false);
      setForm(initial);
    }
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: selectedItems,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Could not send your request.');
      setSuccess(body.reference);
      setForm(initial);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div className="quote-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title" onClick={() => !sending && onClose()}>
      <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
        <div className="quote-modal-header">
          <div>
            <span className="eyebrow">Request A Quotation</span>
            <h2 id="quote-modal-title">Tell Us About Your Event.</h2>
            <p>
              Share your details, event information and the items you need. You can submit this form even if you have not selected products yet.
            </p>
          </div>
          <button type="button" className="quote-modal-close" aria-label="Close quotation form" onClick={onClose} disabled={sending}>
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="quote-modal-success">
            <div className="success-circle"><Check size={30} /></div>
            <span className="eyebrow">Enquiry Submitted</span>
            <h3>Thank You For Getting In Touch.</h3>
            <p>Your quotation request has been sent successfully. Our team will review it and contact you by email.</p>
            <div className="confirmation-reference"><span>Your Reference</span><b>{success}</b></div>
            <button type="button" className="button button-dark" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="request-form quote-modal-form" onSubmit={submit} noValidate={false}>
            <div className="quote-modal-summary">
              <b>Selected Quote Cart Items:</b> {hydrated ? count : 0}
              <span>{hydrated && selectedItems.length > 0 ? 'Your currently selected items will be included in this enquiry.' : 'No selected products yet? No problem — describe what you need below.'}</span>
            </div>

            <div className="step-label"><span>01</span> Your Contact Information</div>
            <div className="form-grid">
              <label className="form-field">
                <span>Full Name *</span>
                <input value={form.name} onChange={(e) => edit('name', e.target.value)} placeholder="Your full name" required minLength={2} maxLength={120} autoComplete="name" />
              </label>
              <label className="form-field">
                <span>Email Address *</span>
                <input type="email" value={form.email} onChange={(e) => edit('email', e.target.value)} placeholder="you@example.com" required maxLength={180} autoComplete="email" />
              </label>
              <label className="form-field full">
                <span>Contact Number *</span>
                <input type="tel" value={form.phone} onChange={(e) => edit('phone', e.target.value)} placeholder="Your phone number" required pattern="[+0-9() \-]{7,40}" maxLength={40} autoComplete="tel" />
              </label>
            </div>

            <div className="step-label next-step"><span>02</span> Tell Us About Your Event</div>
            <div className="form-grid">
              <label className="form-field">
                <span>Event Type *</span>
                <select value={form.eventType} onChange={(e) => edit('eventType', e.target.value)} required>
                  <option>Wedding</option>
                  <option>Engagement</option>
                  <option>Birthday / Private Celebration</option>
                  <option>Corporate Event</option>
                  <option>Funeral</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="form-field">
                <span>Number Of Attendees *</span>
                <input type="number" min={1} max={100000} value={form.attendeeCount} onChange={(e) => edit('attendeeCount', e.target.value)} placeholder="Approximate guest count" required />
              </label>
              {form.eventType === 'Other' && (
                <label className="form-field full">
                  <span>Please Specify The Event Type *</span>
                  <input value={form.customEventType} onChange={(e) => edit('customEventType', e.target.value)} placeholder="Please enter the event type" required={form.eventType === 'Other'} maxLength={80} minLength={2} />
                </label>
              )}
              <label className="form-field">
                <span>Event Date *</span>
                <input type="date" min={new Date().toISOString().slice(0, 10)} value={form.eventDate} onChange={(e) => edit('eventDate', e.target.value)} required />
              </label>
              <label className="form-field full">
                <span>Event Location *</span>
                <input value={form.eventLocation} onChange={(e) => edit('eventLocation', e.target.value)} placeholder="Venue, city or area" required maxLength={220} minLength={2} />
              </label>
              <label className="form-field full">
                <span>Items / Event Requirements *</span>
                <textarea value={form.notes} onChange={(e) => edit('notes', e.target.value)} rows={5} maxLength={1500} minLength={8} required placeholder="Tell us what items you need, your styling ideas, colours, setup details or any special requirements." />
              </label>
            </div>

            <div className="honeypot" aria-hidden="true">
              <label>
                Website
                <input type="text" value={form.website} onChange={(e) => edit('website', e.target.value)} tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="form-reminder">
              <ShieldCheck size={21} />
              <p>This is a quotation request only. Items are not booked or reserved until our team confirms availability and terms with you.</p>
            </div>

            {error && (
              <div className="form-error" role="alert">
                <AlertCircle size={17} />
                {error}
              </div>
            )}

            <div className="quote-modal-actions">
              <button className="button button-dark submit-button" type="submit" disabled={sending}>
                {sending ? 'Sending Your Enquiry…' : <>Send Quotation Request <ArrowRight size={18} /></>}
              </button>
              <button type="button" className="button button-outline-dark modal-cancel" onClick={onClose} disabled={sending}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
