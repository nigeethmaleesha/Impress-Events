import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { impressStories } from '@/data/impressStories';

export const metadata:Metadata = {
  title: 'The Impress Journal | Stories & Styling Ideas',
  description: 'Explore thoughtful event styling ideas, beautiful tablescapes, seating and wedding inspiration from Impress Events.'
};

export default function StoriesPage(){
  return <div className="im-journal im-journal-index">
    <header className="im-journal-index-hero">
      <p className="im-journal-eyebrow">THE IMPRESS JOURNAL</p>
      <h1>Stories, Style &amp; Celebrations</h1>
      <p>Inspiration for creating beautiful settings, memorable tables and personal celebrations—through the details available from Impress Events.</p>
    </header>
    <section className="im-journal-index-grid" aria-label="Impress styling stories">
      {impressStories.map(story=><Link href={`/stories/${story.slug}`} className="im-journal-story-tile" key={story.slug}>
        <div className="im-journal-story-tile-photo"><Image src={story.hero} alt={story.heroAlt} fill sizes="(max-width:650px) 100vw, (max-width:1050px) 50vw, 25vw"/></div>
        <p className="im-journal-story-category">{story.category}</p>
        <h2>{story.title}</h2>
        <p className="im-journal-tile-desc">{story.excerpt}</p>
        <span>READ THE STORY <ArrowRight size={16}/></span>
      </Link>)}
    </section>
    <div className="im-journal-index-ending"><p>Find the pieces for a setting of your own.</p><Link href="/rentals">EXPLORE OUR RENTAL COLLECTION <ArrowRight size={16}/></Link></div>
  </div>
}
