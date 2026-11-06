import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import './about.css';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Discover the thoughtful approach behind Impress Events and our curated wedding and event rental collection.',
};

const values = [
  {
    title: 'Celebrate With Intention',
    description: 'We believe meaningful occasions begin with details that feel personal, considered and true to the celebration.',
  },
  {
    title: 'Care In Every Detail',
    description: 'From the shape of a chair to the texture of a table linen, we value the little touches that bring a setting together.',
  },
  {
    title: 'Thoughtful Collections',
    description: 'Our rental catalogue is curated to make it easier to mix, match and create a look that feels beautifully cohesive.',
  },
  {
    title: 'Create Together',
    description: 'We welcome ideas from couples, event planners and creative partners, and help them explore pieces that suit their vision.',
  },
  {
    title: 'Make It Memorable',
    description: 'Our focus is on the feeling guests take away: a setting that is welcoming, memorable and unmistakably yours.',
  },
];

export default function AboutPage() {
  return (
    <div className="im-about-page">
      <section className="im-about-hero" aria-labelledby="im-about-title">
        <Image
          src="/images/client-home/long-table.jpg"
          alt="Elegant long event table with lush flowers, place settings and chairs"
          fill
          priority
          sizes="100vw"
          className="im-about-cover"
        />
        <div className="im-about-hero-shade" aria-hidden="true" />
        <h1 id="im-about-title">OUR STORY</h1>
      </section>

      <section className="im-about-intro" aria-label="About Impress Events">
        <p>
          At Impress Events, we believe the most beautiful celebrations are made of thoughtful details.
          Our carefully selected wedding and event rentals help bring individuality, warmth and timeless
          style to every setting — from intimate tablescapes to larger gatherings.
        </p>
        <div className="im-about-intro-rule" aria-hidden="true" />
      </section>

      <section className="im-about-values" aria-labelledby="im-about-values-title">
        <div className="im-about-values-copy">
          <h2 id="im-about-values-title">What We Stand For</h2>
          <ul>
            {values.map((value) => (
              <li key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="im-about-values-photo">
          <Image
            src="/images/client-home/napkin-setting.jpg"
            alt="Carefully layered dinner setting with fine linen, tableware and natural details"
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
            className="im-about-cover"
          />
        </div>
      </section>

      <section className="im-about-quote" aria-label="Our philosophy">
        <blockquote>
          “We believe every celebration deserves to feel like its own story — thoughtfully styled,
          beautifully brought together and remembered long after the last guest has left.”
        </blockquote>
        <p>THE IMPRESS EVENTS APPROACH</p>
      </section>

      <section className="im-about-origin" aria-labelledby="im-about-origin-title">
        <div className="im-about-origin-inner">
          <div className="im-about-origin-copy">
            <span className="im-about-eyebrow">THE HEART OF IMPRESS</span>
            <h2 id="im-about-origin-title">A Story Built Around Beautiful Details</h2>
            <p>
              Impress Events was shaped by a simple idea: the right rental pieces can transform a space
              and help people feel at home in a moment worth celebrating. That spirit guides the way
              we present our collection today.
            </p>
            <p>
              From tablecloths and runners to napkins, chargers, glassware, chairs and tables, our
              catalogue brings together essentials and statement pieces that can be layered into a
              distinctive event setting.
            </p>
            <p>
              Whether you are planning your own celebration or creating an event for a client,
              we invite you to explore the collection, find inspiration and tell us what you envision.
            </p>
            <Link className="im-about-text-link" href="/categories">
              Explore Our Collections <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="im-about-origin-photo">
            <Image
              src="/images/client-home/romantic-florals.jpg"
              alt="Romantic event table with green foliage, fine linen and elegant finishing details"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              className="im-about-cover"
            />
          </div>
        </div>
      </section>

      <section className="im-about-team" aria-labelledby="im-about-team-title">
        <h2 id="im-about-team-title">Let's Bring Your Vision To Life</h2>
        <p>Have an upcoming event in mind? We'd love to hear what you are planning.</p>
        <Link href="/contact" className="im-about-button">GET IN TOUCH <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
