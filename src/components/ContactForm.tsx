'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, MessageCircle, AlertCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { faqs } from '@/data/faqs';

const contactFaqs = faqs.slice(4);
const mapAddress = 'Impress Wedding Planner & Dance Studio, 185 f Kottawa Rd, Pannipitiya 10240';
const mapEmbed = 'https://www.google.com/maps?q=' + encodeURIComponent(mapAddress) + '&z=15&output=embed';

export default function ContactForm() {
  const [data, setData] = useState({ name: '', email: '', subject: 'General enquiry', message: '', website: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const change = (key: keyof typeof data, v: string) => setData((s) => ({ ...s, [key]: v }));

  async function send(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Unable to send.');
      setSuccess(true);
      setData({ name: '', email: '', subject: 'General enquiry', message: '', website: '' });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send your message.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-grid page-container section-space contact-page-start">
        <div className="contact-details">
          <span className="eyebrow">GET IN TOUCH</span>
          <h2>
            Tell Us About
            <br />
            <em>Your Occasion.</em>
          </h2>
          <p>
            Whether you&apos;re planning a wedding, a private celebration or a corporate event, share a little about what you
            have in mind.
          </p>
          <div className="contact-icon-text">
            <MessageCircle size={22} />
            <div>
              <b>Planning An Event?</b>
              <p>Start by browsing the rental collection, then send a quotation request with the pieces you love.</p>
              <Link className="text-arrow" href="/rentals">
                Explore Rentals <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="contact-icon-text">
            <Mail size={22} />
            <div>
              <b>General Enquiries</b>
              <p>Use the form to reach our team directly. Business contact details will be added when supplied by the client.</p>
            </div>
          </div>
          <div className="contact-feature-photo">
            <Image
              src="/images/client-home/brand-showcase-event.jpg"
              alt="Elegant event styling with glassware and floral table decor"
              fill
              unoptimized
              sizes="(max-width:800px) 100vw, 450px"
            />
          </div>
        </div>

        <div className="contact-form-area">
          {success ? (
            <div className="contact-success">
              <CheckCircle2 size={40} />
              <h3>Message Sent Successfully.</h3>
              <p>Thank you for getting in touch. Our team will review your enquiry and reply to your email.</p>
              <button className="text-arrow" onClick={() => setSuccess(false)}>
                Send Another Message <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={send} className="contact-form">
              <span className="eyebrow">SEND US A MESSAGE</span>
              <h3>We&apos;re Listening.</h3>
              <label className="form-field">
                <span>Your Full Name *</span>
                <input value={data.name} onChange={(e) => change('name', e.target.value)} required minLength={2} placeholder="Full name" maxLength={120} />
              </label>
              <label className="form-field">
                <span>Your Email *</span>
                <input type="email" value={data.email} onChange={(e) => change('email', e.target.value)} required placeholder="Email address" maxLength={180} />
              </label>
              <label className="form-field">
                <span>Subject</span>
                <select value={data.subject} onChange={(e) => change('subject', e.target.value)}>
                  <option>General enquiry</option>
                  <option>Rental collection</option>
                  <option>Event styling</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="form-field">
                <span>How can we help? *</span>
                <textarea value={data.message} onChange={(e) => change('message', e.target.value)} rows={6} required minLength={10} maxLength={3000} placeholder="Tell us what you're looking for..." />
              </label>
              <div className="honeypot">
                <label>
                  Website
                  <input value={data.website} onChange={(e) => change('website', e.target.value)} tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {error && (
                <p className="form-error" role="alert">
                  <AlertCircle size={16} />
                  {error}
                </p>
              )}
              <button className="button button-dark submit-button" type="submit" disabled={sending}>
                {sending ? (
                  'Sending…'
                ) : (
                  <>
                    Send Enquiry <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="page-container contact-map-faq-section" aria-label="Location Map And Frequently Asked Questions">
        <div className="contact-map-faq-grid">
          <div className="contact-map-embed">
            <iframe
              src={mapEmbed}
              title="Google Maps Location: Impress Wedding Planner & Dance Studio, 185 f Kottawa Rd, Pannipitiya 10240"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="faqs contact-faqs-list" aria-label="More Frequently Asked Questions">
            {contactFaqs.map((faq, index) => (
              <details key={faq.q} open={index === 0}>
                <summary>
                  {faq.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
