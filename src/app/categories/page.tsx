import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import { categories, products } from '@/lib/catalogue';
export const metadata: Metadata = { title: 'Shop by Category', description: 'Discover rental linens, furniture, tabletop pieces and event accessories at Impress Events.' };
const groups = [
 { id:'linens', eyebrow:'LINENS', title:'Linens', desc:'A beautifully dressed table tells a story. Discover a curated selection of tablecloths, runners and napkins in versatile textures and styles.', image:'/images/client-home/tablecloth-setting.jpg', alt:'Wedding table set with fine linens, white plates and florals', cats:['Tablecloths','Napkins','Runners'], reverse:false },
 { id:'furniture', eyebrow:'FURNITURE', title:'Furniture', desc:'Build the perfect gathering place. Discover thoughtfully chosen chairs and tables for occasions both intimate and grand.', image:'/images/client-home/long-table.jpg', alt:'Long outdoor dining tables and woven chairs decorated with flowers', cats:['Chairs','Tables'],reverse:true },
 { id:'tabletop', eyebrow:'TABLETOP', title:'Tabletop & Accessories', desc:'A little personality in every detail. From charger plates to glassware and elegant finishing pieces, discover the art of a considered table setting.', image:'/images/client-home/charger-place-setting.jpg', alt:'Close-up of a charger plate and tabletop setting', cats:['Chargers','Placemats','Glassware','Cutlery','Napkin Rings','Table Numbers'],reverse:false },
 { id:'accessories', eyebrow:'FINISHING TOUCHES', title:'Finishing Touches', desc:'Bring cohesion and character to your chosen setting with subtle finishing accents designed to make every space feel complete.', image:'/images/client-home/napkin-setting.jpg', alt:'Elegant finishing touches on a decorated event table', cats:['Chair Sashes','Cushion Covers'],reverse:true },
];
export default function CategoriesPage(){return <>
  <nav className="nd-category-jump page-container" aria-label="Category sections">{groups.map(g=><a key={g.id} href={`#${g.id}`}>{g.title}<ArrowRight size={14}/></a>)}</nav>
  {groups.map(g=><section id={g.id} key={g.id} className={`nd-category-row ${g.reverse ? 'nd-category-reverse' : ''}`}>
    <div className="nd-category-photo"><Image src={g.image} alt={g.alt} fill sizes="(max-width:850px) 100vw, 54vw"/></div>
    <div className="nd-category-copy"><span className="nd-kicker">{g.eyebrow}</span><h2>{g.title}</h2><p>{g.desc}</p><Link className="nd-outline-button" href={`/rentals?category=${encodeURIComponent(g.cats[0])}`}>EXPLORE {g.title.toUpperCase()} <ArrowUpRight size={17}/></Link><div className="nd-category-links"><span>BROWSE BY CATEGORY</span>{g.cats.filter(name=>categories.some(c=>c.name===name)).map(name=><Link href={`/rentals?category=${encodeURIComponent(name)}`} key={name}><span>{name}</span><span>{products.filter(p=>p.category===name).length} PIECES <ArrowRight size={15}/></span></Link>)}</div></div>
  </section>)}
  <section className="nd-category-bottom page-container"><div><span className="nd-kicker">CAN'T FIND WHAT YOU'RE LOOKING FOR?</span><h2>Let us help you curate <em>the details.</em></h2></div><Link href="/contact" className="nd-outline-button">CONTACT US <ArrowRight size={17}/></Link></section>
</>}
