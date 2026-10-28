'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useQuote } from '@/context/QuoteContext';
import type { Product } from '@/lib/catalogue';
import { getProductGallery } from '@/lib/catalogue';
export default function ProductCard({product, visualSrc, visualAlt}:{product:Product;visualSrc?:string;visualAlt?:string}){
 const {addItem}=useQuote();const [added,setAdded]=useState(false);
 const quickAdd=()=>{addItem(product.id,product.variants[0],1);setAdded(true);window.setTimeout(()=>setAdded(false),1800)};
 const gallery = getProductGallery(product);
 const verified = gallery[0]?.verified ?? false;
 const imageSrc=visualSrc||gallery[0]?.src||product.image;
 return <article className="product-card nd-product-card">
  <div className="product-image-wrap nd-product-image">
   <Link className="product-image-link" href={`/rentals/${product.id}`} aria-label={`View ${product.title}`}><Image src={imageSrc} alt={visualAlt||(verified?`${product.title}, rental product photograph`:`${product.category} editorial styling reference; not a verified image of ${product.sku}`)} fill sizes="(max-width:650px) 50vw, (max-width:1100px) 33vw, 24vw" className="product-image"/></Link>
   {!verified && <span className="nd-visual-caveat">STYLING IMAGE</span>}<button type="button" onClick={quickAdd} className={`quick-add ${added?'added':''}`} aria-label={`Add ${product.title} to quote`}>{added?<Check size={18}/>:<Plus size={18}/>}</button>
  </div>
  <div className="nd-product-text"><span className="nd-product-category">{product.category} · {product.sku}</span><Link className="product-title" href={`/rentals/${product.id}`}>{product.title} <ArrowUpRight size={15}/></Link><span className="nd-product-foot">PRICE ON REQUEST <span>VIEW DETAILS <ArrowUpRight size={12}/></span></span></div>
 </article>;
}
