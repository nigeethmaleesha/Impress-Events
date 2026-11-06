import type { Metadata } from 'next';
import ShopTheLookGallery from '@/components/ShopTheLookGallery';
import { designGallery } from '@/data/designGallery';

export const metadata: Metadata = {
  title: 'Shop Our Design Gallery',
  description: 'Discover event styling inspiration and explore complementary rental pieces from Impress Events.',
};

export default function GalleryPage() {
  return (
    <section className="im-gallery-page">
      <header className="im-gallery-intro">
        <h1>SHOPPABLE GALLERY</h1>
        <p>Explore event styling inspiration and discover beautiful rental pieces for your celebration.</p>
        <p>Hover over an image, then select <strong>Shop the Look</strong> to explore matching Impress rental suggestions.</p>
      </header>
      <div className="im-gallery-content">
        <ShopTheLookGallery looks={designGallery} />
      </div>
    </section>
  );
}
