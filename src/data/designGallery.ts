/**
 * Impress gallery photographs already available in this project's asset library.
 * Product IDs below come from the supplied Impress stock catalogue.
 * Associations are editorial suggestions, not proof the exact SKU appears in a photo.
 */
export type DesignGalleryLook = {
  id: string;
  title: string;
  src: string;
  alt: string;
  detail: string;
  productIds: string[];
};

export const designGallery: DesignGalleryLook[] = [
  {
    id: 'pastel-celebration', title: 'A Pastel Celebration',
    src: '/images/real-events/pastel-banquet.webp',
    alt: 'Light-filled reception with long white banquet tables, gold chairs and soft pink flowers',
    detail: 'Soft colour, beautiful tables and thoughtful finishing touches.',
    productIds: ['twht03', 'nwht03', 'plt03', 'imp-chair-244', 'gls05'],
  },
  {
    id: 'evening-in-blush', title: 'An Evening in Blush',
    src: '/images/real-events/blush-reception.webp',
    alt: 'Evening reception with blush tables and dark chairs under floral centrepieces',
    detail: 'Warm candlelight, elegant seating and delicate floral details.',
    productIds: ['mat02', 'nwht02', 'imp-chair-246', 'plt09', 'gls04'],
  },
  {
    id: 'timeless-white', title: 'Timeless in White',
    src: '/images/real-events/white-floral-centerpiece.webp',
    alt: 'White floral centrepiece above an elegant round wedding reception table',
    detail: 'White-on-white textures and classic formal dining accents.',
    productIds: ['twht01', 'nwht01', 'plt08', 'imp-chair-245', 'gls05'],
  },
  {
    id: 'garden-evening', title: 'Under the Flowers',
    src: '/images/real-events/garden-evening.webp',
    alt: 'Intimate garden dinner with gold chairs and white flowers under trees',
    detail: 'An intimate garden setting with softly layered textures.',
    productIds: ['imp-chair-244', 'imp-table-252', 'twht05', 'nwht04', 'plt03'],
  },
  {
    id: 'blush-table-details', title: 'Blush Table Details',
    src: '/images/client-home/blush-table-detail.jpg',
    alt: 'Soft pink napkins and flower petals arranged on a beautifully dressed dinner table',
    detail: 'Gentle blush tones and romantic place settings.',
    productIds: ['nwht02', 'mat02', 'plt09', 'gls04', 'ctl04'],
  },
  {
    id: 'golden-celebration', title: 'Golden Celebration',
    src: '/images/client-home/glassware-table.jpg',
    alt: 'Luxurious golden event setting with flowers, tableware and soft lighting',
    detail: 'A layered dinner setting with a hint of gold.',
    productIds: ['plt01', 'ctl01', 'gls05', 'imp-chair-244', 'twht05'],
  },
  {
    id: 'floral-banquet', title: 'Floral Banquet',
    src: '/images/client-home/long-table.jpg',
    alt: 'Long reception table decorated with colourful flowers and greenery',
    detail: 'A long-table arrangement full of flowers and colour.',
    productIds: ['imp-table-253', 'rwht01', 'imp-chair-245', 'gls01', 'nwht03'],
  },
  {
    id: 'candlelit-table', title: 'Candlelit Table',
    src: '/images/client-home/candle-centerpiece.jpg',
    alt: 'A refined plate arrangement and candlelight at an event dinner setting',
    detail: 'Simple details and refined tabletop textures.',
    productIds: ['plt03', 'nwht03', 'nrg01', 'ctl02', 'gls02'],
  },
  {
    id: 'outdoor-ceremony', title: 'Garden Ceremony',
    src: '/images/client-home/outdoor-aisle.jpg',
    alt: 'Outdoor wedding aisle with chairs and a lush display of soft pastel flowers',
    detail: 'Elegant seating and soft colour in a garden celebration.',
    productIds: ['imp-chair-244', 'imp-chair-245', 'imp-chair-256', 'imp-table-252'],
  },
  {
    id: 'chair-installation', title: 'Seating with Style',
    src: '/images/client-home/chair-ceremony.jpg',
    alt: 'Rows of cane-backed event chairs arranged beside elaborate florals',
    detail: 'An elegant seating arrangement for a memorable occasion.',
    productIds: ['imp-chair-244', 'imp-chair-245', 'imp-chair-255', 'imp-table-253'],
  },
  {
    id: 'napkin-details', title: 'The Finishing Fold',
    src: '/images/client-home/napkin-setting.jpg',
    alt: 'A white napkin folded on a gold-rimmed plate at a decorated table',
    detail: 'Beautiful napkins and considered finishing touches.',
    productIds: ['nwht03', 'nwht04', 'plt03', 'nrg02', 'ctl01'],
  },
  {
    id: 'charger-roses', title: 'Modern Romance',
    src: '/images/client-home/charger-place-setting.jpg',
    alt: 'Pink and orange roses with layered place settings at a refined reception',
    detail: 'Soft florals and pastel tabletop details.',
    productIds: ['plt09', 'mat02', 'nwht02', 'gls04', 'ctl04'],
  },
  {
    id: 'warm-dining', title: 'Warm and Welcoming',
    src: '/images/client-home/warm-dining.jpg',
    alt: 'Warm wooden dining table set for an elegant event with candles and flowers',
    detail: 'Natural warmth and inviting dining textures.',
    productIds: ['imp-table-253', 'rbge01', 'nbge01', 'imp-chair-244', 'gls02'],
  },
  {
    id: 'neutral-setting', title: 'Quiet Elegance',
    src: '/images/client-home/neutral-place-setting.jpg',
    alt: 'Neutral dinner setting with gold-edged plates and white flowers',
    detail: 'An understated table with timeless pieces.',
    productIds: ['twht05', 'nwht03', 'plt03', 'ctl02', 'gls05'],
  },
  {
    id: 'romantic-florals', title: 'A Romantic Garden',
    src: '/images/client-home/romantic-florals.jpg',
    alt: 'An outdoor table under flowing fabric and romantic floral arrangements',
    detail: 'Natural scenery meets soft table linen.',
    productIds: ['twht03', 'rwht02', 'nwht04', 'imp-chair-245', 'gls05'],
  },
  {
    id: 'showcase-evening', title: 'An Elegant Showcase',
    src: '/images/client-home/brand-showcase-event.jpg',
    alt: 'Elegant event showcase with floral centrepieces on a long table',
    detail: 'Statement table styling with a polished finish.',
    productIds: ['tbn01', 'plt02', 'nwht03', 'imp-table-253', 'gls05'],
  },
  {
    id: 'soft-table', title: 'Soft Table Styling',
    src: '/images/client-home/soft-table.jpg',
    alt: 'Soft pink floral centrepiece on a white table with simple place settings',
    detail: 'A romantic white setting with subtle accents.',
    productIds: ['twht05', 'nwht02', 'plt09', 'gls05', 'ctl04'],
  },
  {
    id: 'reception-hall', title: 'The Grand Reception',
    src: '/images/client-home/luxury-hall.png',
    alt: 'Grand indoor event reception with elegant table settings and lighting',
    detail: 'A grand celebration with a timeless finish.',
    productIds: ['imp-chair-244', 'imp-table-252', 'plt01', 'gls05', 'ctl01'],
  },
  {
    id: 'hero-floral-table', title: 'A Floral Welcome',
    src: '/images/client-home/hero-event-table.jpg',
    alt: 'White linen dining table with a pink floral centrepiece and sparkling glassware',
    detail: 'Light and romantic dining moments.',
    productIds: ['twht03', 'nwht03', 'plt03', 'gls05', 'ctl01'],
  },
  {
    id: 'wedding-celebration', title: 'Celebrating Together',
    src: '/images/client-home/wedding-exit.jpg',
    alt: 'Happy couple walking through their wedding celebration with friends and guests',
    detail: 'Moments made unforgettable by thoughtful event details.',
    productIds: ['imp-chair-245', 'imp-table-253', 'rwht01', 'nwht03'],
  },
];
