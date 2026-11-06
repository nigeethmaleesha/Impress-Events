import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import './furniture.css';

export const metadata: Metadata = {
  title: 'Furniture Collection',
  description: 'Explore genuine Impress Events stock: event chairs, Tiffany chairs, tables, chair sashes and cushion covers. Request a tailored rental quotation.',
};

type FurnitureTile = {
  title: string;
  image: string;
  alt: string;
  href: string;
};

// Category labels and product-family searches are grounded in the existing Impress
// stock catalogue. The editorial photos are styling references, not SKU photos.
const featured: FurnitureTile[] = [
  {
    title: 'Chairs & Event Seating',
    image: '/images/client-home/chair-ceremony.jpg',
    alt: 'Wedding ceremony seating and elegant floral event styling',
    href: '/rentals?category=Chairs',
  },
  {
    title: 'Dining & Event Tables',
    image: '/images/client-home/long-table.jpg',
    alt: 'Beautifully arranged long event dining table with flowers',
    href: '/rentals?category=Tables',
  },
];

const collections: FurnitureTile[] = [
  {
    title: 'Tiffany Chairs',
    image: '/images/client-home/luxury-hall.png',
    alt: 'Elegant ballroom event with decorative chairs and dining tables',
    href: '/rentals?category=Chairs&q=Tiffany',
  },
  {
    title: 'Kids Chairs',
    image: '/images/client-home/outdoor-aisle.jpg',
    alt: 'Outdoor ceremony chairs and floral arrangements',
    href: '/rentals?category=Chairs&q=Kids',
  },
  {
    title: 'Round Tables',
    image: '/images/client-home/warm-dining.jpg',
    alt: 'Warm event dining setting with floral table decorations',
    href: '/rentals?category=Tables&q=Round',
  },
  {
    title: 'Rectangle Tables',
    image: '/images/client-home/brand-showcase-event.jpg',
    alt: 'Refined reception table styling in a celebration setting',
    href: '/rentals?category=Tables&q=Rectangle',
  },
  {
    title: 'Chair Sashes',
    image: '/images/client-home/neutral-place-setting.jpg',
    alt: 'Soft neutral celebration styling with layered textiles',
    href: '/rentals?category=Chair%20Sashes',
  },
  {
    title: 'Cushion Covers',
    image: '/images/client-home/soft-table.jpg',
    alt: 'Soft-toned fabrics and decorative details for a celebration',
    href: '/rentals?category=Cushion%20Covers',
  },
];

function FurnitureCard({ item, priority = false }: { item: FurnitureTile; priority?: boolean }) {
  return (
    <Link href={item.href} className="im-furniture-tile" aria-label={`Browse Impress ${item.title}`}>
      <span className="im-furniture-tile-photo">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority={priority}
          sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 34vw"
        />
        <span className="im-furniture-tile-arrow" aria-hidden="true"><ArrowUpRight size={19} strokeWidth={1.4}/></span>
      </span>
      <span className="im-furniture-tile-caption">{item.title}</span>
    </Link>
  );
}

export default function FurniturePage() {
  return (
    <div className="im-furniture-page">
      <header className="im-furniture-intro">
        <h1>FURNITURE</h1>
        <p>
          Explore Impress Events seating, tables and thoughtful finishing touches
          for weddings and celebrations. Select the pieces that suit your setting,
          then contact our team to confirm availability and rental arrangements.
        </p>
      </header>

      <section className="im-furniture-featured" aria-label="Furniture categories">
        {featured.map((item, index) => <FurnitureCard item={item} key={item.title} priority={index === 0}/>)}
      </section>

      <section className="im-furniture-secondary" aria-label="Explore furniture by type">
        {collections.map((item) => <FurnitureCard item={item} key={item.title}/>)}
      </section>

      <div className="im-furniture-ending">
        <p>
          From classic Tiffany chairs and practical event tables to chair sashes
          and cushion covers, create a welcoming space with pieces from the
          Impress Events rental collection.
        </p>
        <Link href="/rentals?family=furniture" className="im-furniture-shop-all">
          VIEW ALL FURNITURE RENTALS <ArrowUpRight size={16} strokeWidth={1.5}/>
        </Link>
        <p className="im-furniture-photo-note">
          Event images are styling references and are not verified photos of individual stock items.
        </p>
      </div>
    </div>
  );
}
