import productsJson from '@/data/products.json';

export type Product = {
  id: string;
  sku: string;
  sourceSku: string;
  title: string;
  category: string;
  subcategory: string;
  fabric: string;
  variants: string[];
  description: string;
  image: string;
  imageStatus: string;
  source: string;
  featured: boolean;
};

export const products: Product[] = productsJson as Product[];

export const categories = [
  { name: 'Tablecloths', image: '/images/client-home/tablecloth-setting.jpg', group: 'Table Linen', description: 'A beautiful foundation for every setting.' },
  { name: 'Runners', image: '/images/client-home/warm-dining.jpg', group: 'Table Linen', description: 'Texture, movement & effortless elegance.' },
  { name: 'Napkins', image: '/images/client-home/napkin-setting.jpg', group: 'Table Linen', description: 'Thoughtful details in every fold.' },
  { name: 'Chargers', image: '/images/client-home/charger-place-setting.jpg', group: 'Tabletop', description: 'The finishing detail at every place.' },
  { name: 'Placemats', image: '/images/client-home/neutral-place-setting.jpg', group: 'Tabletop', description: 'Layers that make an impression.' },
  { name: 'Glassware', image: '/images/client-home/glassware-table.jpg', group: 'Tabletop', description: 'Elevated pieces for every toast.' },
  { name: 'Cutlery', image: '/images/client-home/soft-table.jpg', group: 'Tabletop', description: 'Beautifully considered dining details.' },
  { name: 'Table Numbers', image: '/images/client-home/brand-showcase-event.jpg', group: 'Tabletop', description: 'Little details, unforgettable tables.' },
  { name: 'Napkin Rings', image: '/images/client-home/candle-centerpiece.jpg', group: 'Tabletop', description: 'An elegant final touch.' },
  { name: 'Chairs', image: '/images/client-home/chair-ceremony.jpg', group: 'Furniture', description: 'Seating that complements every moment.' },
  { name: 'Tables', image: '/images/client-home/long-table.jpg', group: 'Furniture', description: 'A perfect setting starts here.' },
  { name: 'Chair Sashes', image: '/images/client-home/outdoor-aisle.jpg', group: 'Accessories', description: 'Make every chair part of the story.' },
  { name: 'Cushion Covers', image: '/images/client-home/luxury-hall.png', group: 'Accessories', description: 'Comfort with a sophisticated finish.' },
] as const;

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getCategoryImage(cat: string) {
  return categories.find((c) => c.name === cat)?.image || '/images/gallery-01.webp';
}

export function titleCase(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
