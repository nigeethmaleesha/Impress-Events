import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { faqs } from '@/data/faqs';

export const metadata: Metadata = { title: 'Frequently Asked Questions' };

export default function FAQ() {
  return <>
    <section className="faq-layout page-container section-space"><div><span className="eyebrow">FAQs</span><h2>A Little More<br /><em>Peace Of Mind.</em></h2><p>Need more information about your event? We&apos;re always happy to hear from you.</p><Link className="text-arrow" href="/contact">Get In Touch <ArrowUpRight size={16} /></Link></div><div className="faqs">{faqs.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}<span>+</span></summary><p>{f.a}</p></details>)}</div></section>
  </>;
}
