import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getProduct, type Product } from '@/lib/catalogue';
import './collection.css';

export const metadata: Metadata = {
  title: 'The Impress Collection',
  description:
    'Explore The Impress Collection: a curated edit of real Impress Events rental inventory, with linens, chargers, napkins, glassware, furniture and finishing touches.',
};

/**
 * This is a visual EDIT of real stock items, not a new supplier/designer range.
 * Each ID resolves to the existing Impress catalogue and product detail route.
 * These photos are approved styling/editorial assets already used in this site;
 * no verified SKU-specific product photography was supplied.
 */
const collectionEdit: ReadonlyArray<{ id: string; src: string; imageAlt: string }> = [
  { id: 'plt01', src: '/images/client-home/neutral-place-setting.jpg', imageAlt: 'Gold-edged place setting with soft white florals' },
  { id: 'plt02', src: '/images/client-home/charger-place-setting.jpg', imageAlt: 'Fine tableware with pale blue linen and flowers' },
  { id: 'plt03', src: '/images/client-home/candle-centerpiece.jpg', imageAlt: 'Elegant light place setting with a charger plate' },
  { id: 'plt07', src: '/images/client-home/soft-table.jpg', imageAlt: 'Light-toned table setting with chargers and stemware' },
  { id: 'nwht04', src: '/images/client-home/napkin-setting.jpg', imageAlt: 'Folded napkin on a gold-accented place setting' },
  { id: 'ncrm03', src: '/images/client-home/blush-table-detail.jpg', imageAlt: 'Soft textured linens in a romantic table setting' },
  { id: 'rwht02', src: '/images/client-home/long-table.jpg', imageAlt: 'Long banquet table with a floral arrangement' },
  { id: 'rgld02', src: '/images/client-home/romantic-florals.jpg', imageAlt: 'Layers of linen and flowers on a celebration table' },
  { id: 'gls01', src: '/images/client-home/warm-dining.jpg', imageAlt: 'Dinner reception with layered glassware and candlelight' },
  { id: 'gls04', src: '/images/client-home/glassware-table.jpg', imageAlt: 'Warmly lit dining tables dressed with glassware' },
  { id: 'ctl01', src: '/images/client-home/hero-event-table.jpg', imageAlt: 'Coordinated cutlery, glasses and floral styling' },
  { id: 'ctl04', src: '/images/client-home/brand-showcase-event.jpg', imageAlt: 'Elegant event table with a refined place setting' },
  { id: 'twht05', src: '/images/client-home/tablecloth-setting.jpg', imageAlt: 'Refined linen-covered table set for a celebration' },
  { id: 'tcrm03', src: '/images/client-home/romantic-florals.jpg', imageAlt: 'Soft table linens with romantic floral details' },
  { id: 'mat10', src: '/images/client-home/charger-place-setting.jpg', imageAlt: 'Layered placemat and charger in a floral tablescape' },
  { id: 'imp-chair-244', src: '/images/client-home/chair-ceremony.jpg', imageAlt: 'Event seating with flowers in an outdoor setting' },
] as const;

const items: { product: Product; src: string; imageAlt: string }[] = collectionEdit.flatMap((item) => {
  const product = getProduct(item.id);
  return product ? [{ product, src: item.src, imageAlt: item.imageAlt }] : [];
});

export default function ImpressCollectionPage() {
  return (
    <div className="im-collection-page">
      <h1 className="im-collection-visually-hidden">The Impress Collection</h1>
      <section className="im-collection-editorial" aria-label="About the Impress Collection">
        <div className="im-collection-editorial-image">
          <Image
            src="/images/client-home/neutral-place-setting.jpg"
            alt="Beautifully layered event table with floral arrangements and fine tabletop details"
            fill priority sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
        <div className="im-collection-editorial-copy im-collection-intro">
          <div className="im-collection-copy-inner">
            <p className="im-collection-eyebrow">THE IMPRESS EDIT</p>
            <h2>THE IMPRESS COLLECTION</h2>
            <div className="im-collection-rule" />
            <h3>BEAUTIFUL DETAILS, MADE FOR CELEBRATION</h3>
            <p>
              The Impress Collection brings together thoughtfully selected pieces
              from our event rental catalogue. From elegant linens and napkins to
              carefully layered chargers, glassware and finishing touches, discover
              the details that make every gathering feel special.
            </p>
            <p>
              Mix textures, colours and shapes to create a setting that feels
              personal to your celebration. Our team can help you explore available
              options and request a tailored quotation.
            </p>
          </div>
        </div>
        <div className="im-collection-editorial-copy im-collection-story">
          <div className="im-collection-copy-inner">
            <h2>From the first detail to the final flourish</h2>
            <Link href="/lookbook" className="im-collection-story-cta">
              VIEW REAL EVENT INSPIRATION <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p>
              See how beautiful event spaces come together with considered tables,
              timeless furniture, and decorative accents. Explore our event gallery
              for styling ideas, then choose the pieces that suit your day.
            </p>
          </div>
        </div>
        <div className="im-collection-editorial-image">
          <Image
            src="/images/client-home/brand-showcase-event.jpg"
            alt="Celebration setting featuring floral details and thoughtfully arranged tables"
            fill sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="im-collection-products" aria-labelledby="im-collection-products-heading">
        <div className="im-collection-products-heading">
          <p className="im-collection-eyebrow">CURATED FROM OUR RENTAL CATALOGUE</p>
          <h2 id="im-collection-products-heading">Explore the collection</h2>
          <p>Discover the pieces to build your own Impress setting.</p>
        </div>
        <div className="im-collection-products-grid">
          {items.map(({ product, src, imageAlt }) => (
            <Link
              key={product.id}
              href={`/rentals/${product.id}`}
              className="im-collection-product"
              aria-label={`View ${product.title} in rental catalogue`}
            >
              <div className="im-collection-product-image">
                <Image
                  src={src}
                  alt={`${imageAlt}. Editorial styling image; not verified product photography.`}
                  fill sizes="(max-width: 540px) 50vw, (max-width: 900px) 33vw, 25vw"
                />
                <span className="im-collection-product-arrow" aria-hidden="true"><ArrowUpRight size={20}/></span>
              </div>
              <span className="im-collection-product-name">{product.title}</span>
              <span className="im-collection-product-category">{product.category}</span>
            </Link>
          ))}
        </div>
        <p className="im-collection-image-disclaimer">
          Styling images are for inspiration, not verified photographs of individual stock items.
          Product options, availability and quotation details can be confirmed with the Impress Events team.
        </p>
        <Link href="/rentals" className="im-collection-all-button">
          BROWSE ALL RENTALS <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="im-collection-professional">
        <h2>Are you an event professional?</h2>
        <p>Let&apos;s create something beautiful together.</p>
        <Link href="/contact">ENQUIRE HERE</Link>
      </section>
    </div>
  );
}
