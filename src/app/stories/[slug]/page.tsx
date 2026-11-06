import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProduct, getProductStylingImage } from '@/lib/catalogue';
import { getImpressStory, impressStories } from '@/data/impressStories';

type PageProps={params:Promise<{slug:string}>};

export function generateStaticParams(){return impressStories.map(story=>({slug:story.slug}))}

export async function generateMetadata({params}:PageProps):Promise<Metadata>{
  const {slug}=await params;
  const story=getImpressStory(slug);
  if(!story) return {title:'Story not found'};
  return {title:story.title,description:story.excerpt};
}

export default async function ImpressStoryDetail({params}:PageProps){
  const {slug}=await params;
  const story=getImpressStory(slug);
  if(!story) notFound();
  const related=story.productIds.map(id=>getProduct(id)).filter((p):p is NonNullable<typeof p>=>Boolean(p));
  const currentIndex=impressStories.findIndex(item=>item.slug===slug);
  const nextStory=impressStories[(currentIndex+1)%impressStories.length];
  return <article className="im-journal im-story-page">
    <section className="im-story-hero">
      <div className="im-story-hero-photo"><Image src={story.hero} alt={story.heroAlt} fill priority sizes="(max-width:800px) 100vw, 50vw"/></div>
      <div className="im-story-hero-copy" style={{backgroundColor:story.accent}}>
        <p className="im-journal-eyebrow">{story.kicker}</p>
        <h1>{story.title}</h1>
        <p>{story.excerpt}</p>
        <Link href="/stories">BACK TO THE JOURNAL <ArrowRight size={16}/></Link>
      </div>
    </section>
    <section className="im-story-opening" aria-labelledby="story-opening-heading">
      <p className="im-journal-eyebrow">THE IMPRESS EDIT</p>
      <h2 id="story-opening-heading">{story.openingTitle}</h2>
      {story.opening.map(para=><p key={para}>{para}</p>)}
      <Link href="/rentals">EXPLORE THE RENTAL COLLECTION <ArrowRight size={15}/></Link>
    </section>
    <section className="im-story-triptych" aria-label="Event styling photographs">
      {story.triptych.map((src,i)=><div key={src} className="im-story-triptych-image"><Image src={src} alt={`${story.category} styling inspiration ${i+1}`} fill sizes="(max-width:700px) 33vw, 33vw"/></div>)}
    </section>
    <p className="im-story-photo-caption">{story.caption}</p>
    <div className="im-story-wide-image"><Image src={story.widePhoto} alt={`${story.title}: reception table setting inspiration`} fill sizes="100vw"/></div>
    <section className="im-story-feature">
      <div className="im-story-feature-copy"><p className="im-journal-eyebrow">DESIGN NOTES</p><h2>{story.midTitle}</h2>{story.midText.map(para=><p key={para}>{para}</p>)}</div>
      <div className="im-story-feature-photo"><Image src={story.detailPhoto} alt={`${story.category} details`} fill sizes="(max-width:800px) 100vw, 50vw"/></div>
    </section>
    <section className="im-story-edit-section">
      <p className="im-journal-eyebrow">A CLOSER LOOK</p><h2>{story.detailHeading}</h2><p>{story.detailText}</p>
      <div className="im-story-edit-images">
        {story.triptych.slice(0,2).map((src,i)=><div key={src}><Image src={src} alt={`Selected styling detail ${i+1}`} fill sizes="(max-width:700px) 50vw, 50vw"/></div>)}
      </div>
    </section>
    <section className="im-story-products" id="shop-impress-edit">
      <header><p className="im-journal-eyebrow">CURATED FROM IMPRESS STOCK</p><h2>Explore the pieces behind the look</h2><p>Browse real items from the Impress rental catalogue. Images are editorial styling references until individual product photography is available.</p></header>
      <div className="im-story-product-grid">
        {related.map(product=><Link className="im-story-product" href={`/rentals/${product.id}`} key={product.id}>
          <div className="im-story-product-photo"><Image src={getProductStylingImage(product)} alt={`${product.category} editorial styling reference—not a verified product image of ${product.sku}`} fill sizes="(max-width:650px) 50vw, (max-width:1100px) 33vw, 25vw"/><span>STYLING IMAGE</span></div>
          <p>{product.category} · {product.sku}</p><h3>{product.title}</h3>
        </Link>)}
      </div>
      <Link className="im-story-all-rentals" href="/rentals">BROWSE ALL RENTALS <ArrowRight size={16}/></Link>
    </section>
    <section className="im-story-tips"><h2>Making it yours</h2><ul>{story.details.map(point=><li key={point}>{point}</li>)}</ul><p>Availability, exact product appearance, rental options and pricing are confirmed by the Impress team when you request a quote.</p><Link href="/contact">PLAN YOUR EVENT WITH US <ArrowRight size={16}/></Link></section>
    <nav className="im-story-next" aria-label="Explore more stories"><Link href="/stories"><ArrowLeft size={17}/> ALL STORIES</Link><Link href={`/stories/${nextStory.slug}`}>NEXT STORY: {nextStory.title} <ArrowRight size={17}/></Link></nav>
  </article>
}
