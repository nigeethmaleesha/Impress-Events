import productsJson from '@/data/products.json';
import productViewsJson from '@/data/productViews.json';

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

// Editorial photographs are styling references, NEVER a claim that a particular SKU
// has a verified product photograph. Replace via master catalogue once supplied.
const stylingImages: Record<string, string[]> = {
  Tablecloths: ['/images/client-home/tablecloth-setting.jpg', '/images/client-home/romantic-florals.jpg', '/images/client-home/hero-event-table.jpg', '/images/client-home/soft-table.jpg'],
  Runners: ['/images/client-home/warm-dining.jpg', '/images/client-home/long-table.jpg', '/images/client-home/tablecloth-setting.jpg'],
  Napkins: ['/images/client-home/napkin-setting.jpg', '/images/client-home/neutral-place-setting.jpg', '/images/client-home/candle-centerpiece.jpg'],
  Chargers: ['/images/client-home/charger-place-setting.jpg', '/images/client-home/candle-centerpiece.jpg', '/images/client-home/neutral-place-setting.jpg'],
  Placemats: ['/images/client-home/neutral-place-setting.jpg', '/images/client-home/charger-place-setting.jpg'],
  Glassware: ['/images/client-home/glassware-table.jpg', '/images/client-home/blush-table-detail.jpg', '/images/client-home/hero-event-table.jpg'],
  Cutlery: ['/images/client-home/soft-table.jpg', '/images/client-home/neutral-place-setting.jpg'],
  'Table Numbers': ['/images/client-home/brand-showcase-event.jpg', '/images/client-home/candle-centerpiece.jpg'],
  'Napkin Rings': ['/images/client-home/napkin-setting.jpg', '/images/client-home/candle-centerpiece.jpg'],
  Chairs: ['/images/client-home/chair-ceremony.jpg', '/images/client-home/outdoor-aisle.jpg', '/images/client-home/long-table.jpg'],
  Tables: ['/images/client-home/long-table.jpg', '/images/client-home/warm-dining.jpg', '/images/client-home/luxury-hall.png'],
  'Chair Sashes': ['/images/client-home/outdoor-aisle.jpg', '/images/client-home/chair-ceremony.jpg'],
  'Cushion Covers': ['/images/client-home/luxury-hall.png', '/images/client-home/warm-dining.jpg'],
};
export function getProductStylingImages(product: Product): string[] {
  const choices = stylingImages[product.category] ?? [getCategoryImage(product.category)];
  const parsed = Array.from(product.sku).reduce((total, char) => total + char.charCodeAt(0), 0);
  return [...choices.slice(parsed % choices.length), ...choices.slice(0, parsed % choices.length)];
}
export function getProductStylingImage(product: Product) {
  return getProductStylingImages(product)[0];
}


export type ProductView = { src: string; alt: string; label: string; verified: boolean };
/**
 * Verified, SKU-specific photographs are referenced in src/data/productViews.json.
 * Example entry: "CHAIR123": ["/images/products/CHAIR123/front.webp", "/images/products/CHAIR123/side.webp"]
 * Never claim fallback editorial photos show different angles of the actual product.
 */
export function getProductGallery(product: Product): ProductView[] {
  const productPhotos = (productViewsJson as Record<string, string[]>)[product.sku];
  if (Array.isArray(productPhotos) && productPhotos.some(src => typeof src === 'string' && src.startsWith('/images/products/'))) {
    return productPhotos.filter(src => typeof src === 'string' && src.startsWith('/images/products/')).map((src, index) => ({
      src,
      alt: `${product.title}, product photograph ${index + 1}`,
      label: ['Front', 'Side', 'Back', 'Detail', 'Setting', 'Additional view'][index] ?? `View ${index + 1}`,
      verified: true,
    }));
  }
  return getProductStylingImages(product).map((src, index) => ({
    src,
    alt: `${product.category} editorial styling reference ${index + 1}; not a photograph of ${product.sku}`,
    label: `Styling ${index + 1}`,
    verified: false,
  }));
}
