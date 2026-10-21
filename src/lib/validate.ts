import { products } from './catalogue';
import type { QuoteItem } from '@/context/QuoteContext';

export type QuoteRequest = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  attendeeCount: number;
  eventDate: string;
  eventLocation: string;
  notes: string;
  items: QuoteItem[];
  website?: string;
};

const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function safe(v: unknown, max: number) { return typeof v === 'string' ? v.trim().slice(0, max) : ''; }

export function validateQuote(raw: unknown): { ok: true; data: QuoteRequest } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Invalid request.' };
  const r = raw as Record<string, unknown>;
  if (safe(r.website, 200)) return { ok: false, error: 'Unable to submit this request.' };

  const name = safe(r.name, 120);
  const email = safe(r.email, 180);
  const phone = safe(r.phone, 40);
  const baseEventType = safe(r.eventType, 80);
  const customEventType = safe(r.customEventType, 80);
  const eventType = baseEventType === 'Other' ? customEventType : baseEventType;
  const attendeeRaw = typeof r.attendeeCount === 'number' || typeof r.attendeeCount === 'string' ? String(r.attendeeCount).trim() : '';
  const attendeeCount = Number.parseInt(attendeeRaw, 10);
  const eventDate = safe(r.eventDate, 25);
  const eventLocation = safe(r.eventLocation, 220);
  const notes = safe(r.notes, 1500);

  if (name.length < 2) return { ok: false, error: 'Please enter your full name.' };
  if (!reEmail.test(email)) return { ok: false, error: 'Please provide a valid email address.' };
  if (!/^[+\d\s()\-]{7,40}$/.test(phone)) return { ok: false, error: 'Please enter a valid contact number.' };
  if (eventType.length < 2 || eventLocation.length < 2) return { ok: false, error: 'Please complete your event type and location.' };
  if (!Number.isInteger(attendeeCount) || attendeeCount < 1 || attendeeCount > 100000) return { ok: false, error: 'Please enter a valid number of attendees.' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || Number.isNaN(Date.parse(eventDate))) return { ok: false, error: 'Please choose a valid event date.' };
  if (eventDate < new Date().toISOString().slice(0, 10)) return { ok: false, error: 'Event date cannot be in the past.' };
  if (notes.length < 8) return { ok: false, error: 'Please add a few details about your event or rental requirements.' };

  const items: QuoteItem[] = [];
  if (r.items !== undefined) {
    if (!Array.isArray(r.items) || r.items.length > 100) return { ok: false, error: 'Invalid product selection.' };
    for (const i of r.items) {
      if (!i || typeof i !== 'object') return { ok: false, error: 'Invalid product selection.' };
      const p = products.find((p) => p.id === i.productId);
      if (!p || typeof i.variant !== 'string' || !p.variants.includes(i.variant) || !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 999) {
        return { ok: false, error: 'An item has an invalid product, variant or quantity. Please review your quote.' };
      }
      if (items.some((x) => x.productId === i.productId && x.variant === i.variant)) return { ok: false, error: 'Your cart contains a repeated line item.' };
      items.push({ productId: p.id, variant: i.variant, quantity: i.quantity });
    }
  }

  return { ok: true, data: { name, email, phone, eventType, attendeeCount, eventDate, eventLocation, notes, items } };
}
