import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { categories, catalogueFamilies } from '@/lib/catalogue';
import './categories.css';

export const metadata: Metadata = {
  title: 'Shop All Categories',
  description: 'Explore Impress Events rental linens, furniture, tabletop and accessories for weddings and celebrations.',
};

// Only show categories present in the Impress catalogue. Each category
// links to the existing /rentals filters; this page is an editorial index.
const categorySections = [
  {
    id: 'linens',
    heading: 'Linens',
    image: '/images/client-home/romantic-florals.jpg',
    imageAlt: 'Long celebration table with white linen, greenery and elegant tableware',
    cta: 'SHOP LINENS',
    href: '/rentals?family=linens',
    categories: catalogueFamilies.linens.categories,
  },
  {
    id: 'furniture',
    heading: 'Furniture',
    image: '/images/client-home/brand-showcase-event.jpg',
    imageAlt: 'Impress event seating and beautifully furnished reception setting',
    cta: 'SHOP FURNITURE',
    href: '/furniture',
    categories: catalogueFamilies.furniture.categories,
  },
  {
    id: 'tabletop',
    heading: 'Tabletop & Accessories',
    image: '/images/client-home/neutral-place-setting.jpg',
    imageAlt: 'Impress glassware, plates and table details arranged for a celebration',
    cta: 'SHOP TABLETOP',
    href: '/rentals?family=tabletop',
    categories: catalogueFamilies.tabletop.categories,
  },
] as const;

export default function CategoriesPage() {
  const availableCategories = new Set<string>(categories.map((category) => category.name));

  return (
    <div className="im-categories-page">
      <h1 className="im-categories-sr-only">Shop Impress Event Rental Categories</h1>
      {categorySections.map((section, index) => (
        <section
          className={`im-categories-feature${index % 2 === 1 ? ' im-categories-feature--reverse' : ''}`}
          key={section.id}
          id={section.id}
          aria-labelledby={`im-category-title-${section.id}`}
        >
          <Link className="im-categories-photo" href={section.href} aria-label={`Explore Impress ${section.heading}`}>
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              priority={index === 0}
              sizes="(max-width: 720px) 100vw, 50vw"
            />
          </Link>
          <div className="im-categories-content">
            <div className="im-categories-content-inner">
              <h2 id={`im-category-title-${section.id}`}>{section.heading}</h2>
              <ul className="im-categories-subcategories">
                {section.categories.filter((name) => availableCategories.has(name)).map((name) => (
                  <li key={name}>
                    <Link href={`/rentals?category=${encodeURIComponent(name)}`}>{name}</Link>
                  </li>
                ))}
              </ul>
              <Link className="im-categories-cta" href={section.href}>{section.cta}</Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
