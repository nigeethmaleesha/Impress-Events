/** Event photographs supplied for this redesign. Credit/watermarks remain in place. */
export type EventPhoto = {
  src: string;
  title: string;
  details: string;
  alt: string;
  collection: string;
};

export const eventPhotos: EventPhoto[] = [
  {
    src: '/images/real-events/pastel-banquet.webp',
    title: 'A Pastel Celebration',
    details: 'Long Banquet Tables · Chiavari Chairs · Soft Florals',
    alt: 'Bright reception featuring white-draped long banquet tables, gold chairs and blush pink flowers',
    collection: 'Chairs',
  },
  {
    src: '/images/real-events/blush-reception.webp',
    title: 'An Evening In Blush',
    details: 'Round Tables · Black Chairs · Floral Centrepieces',
    alt: 'Evening reception with round blush tables and black chairs beneath elevated floral arrangements',
    collection: 'Tables',
  },
  {
    src: '/images/real-events/white-floral-centerpiece.webp',
    title: 'Timeless In White',
    details: 'White Table Linen · Chiavari Chairs · Candlelight',
    alt: 'Elegant round reception table with white chiavari chairs and a grand white floral centrepiece',
    collection: 'Tablecloths',
  },
  {
    src: '/images/real-events/garden-evening.webp',
    title: 'Under The Flowers',
    details: 'Round Tables · Gold Chairs · Garden Styling',
    alt: 'Intimate evening garden event with gold cross-back chairs and white flowers hanging from trees',
    collection: 'Chairs',
  },
];
