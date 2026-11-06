'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import { useQuote } from '@/context/QuoteContext';
import { getProductGallery, type Product } from '@/lib/catalogue';

type StockFacet = { color: string[]; fabric: string; pattern: string[] };

const SWATCH_COLORS: Record<string, string> = {
  Black: '#292724', Blue: '#627e9b', 'Champagne/Gold': '#b9a16b',
  'Copper/Brown': '#8a654f', 'Green/Teal': '#668579', Ivory: '#e9e2d0',
  Orange: '#d48e5d', Pink: '#d9a9b1', Purple: '#9985a7', Red: '#af615e',
  'Silver/Grey': '#b0b2b1', White: '#f7f5ef', Yellow: '#e5d08b',
  'Beige/Cream': '#d7c5a9', Clear: '#e5e8e7',
};

export default function CategoryProductCard({product, stock}: {product: Product; stock?: StockFacet}) {
  const { addItem } = useQuote();
  const [added, setAdded] = useState(false);
  const gallery = getProductGallery(product);
  const verified = gallery[0]?.verified ?? false;
  const imageSource = gallery[0]?.src || product.image;
  const colors = stock?.color ?? [];

  return (
    <article className="im-cat-product">
      <div className="im-cat-product-image">
        <Link href={`/rentals/${encodeURIComponent(product.id)}`} aria-label={`View details for ${product.title}`}>
          <Image
            src={imageSource}
            alt={verified ? `${product.title}, verified product photo` : `${product.category} editorial styling image. This is not a verified photo of SKU ${product.sku}.`}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 920px) 31vw, (max-width: 1400px) 24vw, 33vw"
            className="im-cat-product-photo"
          />
        </Link>
        {!verified && <span className="im-cat-image-disclaimer">STYLING IMAGE</span>}
        <button
          type="button"
          className={`im-cat-product-add ${added ? 'is-added' : ''}`}
          title="Add to quote"
          aria-label={`Add ${product.title} to your quotation`}
          onClick={() => {
            addItem(product.id, product.variants[0] || 'Standard', 1);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1600);
          }}
        >
          {added ? <Check size={18} /> : <Plus size={18} />}
        </button>
      </div>
      <div className="im-cat-product-meta">
        <div className="im-cat-product-colors" aria-label={colors.length ? `Stock color: ${colors.join(', ')}` : 'Color not specified in stock sheet'}>
          {colors.length ? colors.map(color => (
            <span key={color} className="im-cat-swatch" title={`${color} (illustrative color only)`}>
              <i style={{backgroundColor: SWATCH_COLORS[color] || '#eee6d9'}} />
            </span>
          )) : <span className="im-cat-swatch-empty" title="Color not specified in stock sheet" />}
        </div>
        <Link className="im-cat-quote-link" href={`/rentals/${encodeURIComponent(product.id)}`}>VIEW DETAILS</Link>
      </div>
      <Link className="im-cat-product-title" href={`/rentals/${encodeURIComponent(product.id)}`}>{product.title}</Link>
      <p className="im-cat-product-stock">{product.sku}{stock?.fabric ? ` · ${stock.fabric}` : ''}</p>
    </article>
  );
}
