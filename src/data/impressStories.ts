/**
 * Impress editorial styling stories.
 * These are inspiration guides assembled from existing Impress imagery and the
 * supplied rental catalogue. They are not presented as reports about named
 * client events, verified product photography, or independently documented news.
 */
export type ImpressStory = {
  slug: string;
  title: string;
  category: string;
  kicker: string;
  excerpt: string;
  hero: string;
  heroAlt: string;
  accent: string;
  openingTitle: string;
  opening: string[];
  triptych: string[];
  caption: string;
  widePhoto: string;
  midTitle: string;
  midText: string[];
  detailPhoto: string;
  detailHeading: string;
  detailText: string;
  details: string[];
  productIds: string[];
};

export const impressStories: ImpressStory[] = [
  {
    slug: 'beautifully-layered-table',
    title: 'A Beautifully Layered Table',
    category: 'The Tabletop Edit',
    kicker: 'THE IMPRESS JOURNAL / TABLETOP',
    excerpt: 'A considered mix of linen, chargers, flowers and the finishing touches that make every setting feel personal.',
    hero: '/images/client-home/charger-place-setting.jpg',
    heroAlt: 'Layered plate setting with gold-toned cutlery and soft floral accents',
    accent: '#6c775f',
    openingTitle: 'The art of a beautiful table',
    opening: [
      'A memorable table begins with a few considered layers. Start with the linen, choose a charger to frame each setting, then add a napkin and glassware that bring your palette together.',
      'This Impress styling edit celebrates the small details that help a dining space feel welcoming, cohesive and ready for an unforgettable occasion.'
    ],
    triptych: ['/images/client-home/tablecloth-setting.jpg', '/images/client-home/neutral-place-setting.jpg', '/images/client-home/napkin-setting.jpg'],
    caption: 'Explore tone, texture and contrast before deciding on the pieces for your own event.',
    widePhoto: '/images/client-home/soft-table.jpg',
    midTitle: 'Texture creates the atmosphere',
    midText: [
      'Linen gives a setting its foundation; a subtle glass or metallic finish adds just enough light. Repeating one or two materials across the table helps every place setting feel connected.',
      'Look for an easy balance of soft fabric, simple shapes and thoughtful finishing touches rather than adding detail for its own sake.'
    ],
    detailPhoto: '/images/client-home/blush-table-detail.jpg',
    detailHeading: 'A finishing touch worth noticing',
    detailText: 'Napkin folds, table numbers and carefully chosen cutlery can quietly bring the whole look together.',
    details: ['Begin with the tablecloth or runner.', 'Build your place settings with chargers and placemats.', 'Choose napkins and glassware to complement the palette.', 'Finish with practical details, such as table numbers and napkin rings.'],
    productIds: ['twht03', 'rwht01', 'nwht03', 'plt03', 'mat01', 'gls05', 'ctl03', 'nrg02']
  },
  {
    slug: 'timeless-tabletop-details',
    title: 'Timeless Tabletop Details',
    category: 'The Details Edit',
    kicker: 'THE IMPRESS JOURNAL / DETAILS',
    excerpt: 'From glassware to carefully chosen napkins, discover how everyday pieces can shape an elegant event setting.',
    hero: '/images/client-home/neutral-place-setting.jpg',
    heroAlt: 'Neutral tablescape with softly arranged plates, glassware and linens',
    accent: '#385c70',
    openingTitle: 'The beauty is in the details',
    opening: [
      'An inviting celebration does not need to be complicated. Beautifully paired essentials can create just as much impact as a bold centrepiece.',
      'Our Impress tabletop edit brings together glassware, linens and dining accents with the same simple idea: let each detail have space to shine.'
    ],
    triptych: ['/images/client-home/glassware-table.jpg', '/images/client-home/candle-centerpiece.jpg', '/images/client-home/charger-place-setting.jpg'],
    caption: 'A restrained palette and a few well-chosen accents can feel wonderfully timeless.',
    widePhoto: '/images/client-home/hero-event-table.jpg',
    midTitle: 'The finishing touches',
    midText: [
      'A charger creates a frame for dinnerware, glassware catches the light and a neatly folded napkin softens the overall composition.',
      'Use repetition to create rhythm along a long table, then introduce a little contrast with your chosen metal finish or fabric texture.'
    ],
    detailPhoto: '/images/client-home/napkin-setting.jpg',
    detailHeading: 'Keep it beautifully simple',
    detailText: 'An elegant place setting leaves room for the people around it: easy to enjoy, practical to use and personal in feel.',
    details: ['Pair glassware with the overall colour story.', 'Mix one statement accent with quieter pieces.', 'Use napkin rings or carefully folded napkins to introduce texture.', 'Keep enough room for comfortable dining.'],
    productIds: ['plt01', 'plt05', 'gls01', 'gls03', 'nwht01', 'ncrm02', 'ctl02', 'mat07']
  },
  {
    slug: 'elegant-event-story',
    title: 'An Elegant Event Story',
    category: 'The Celebration Edit',
    kicker: 'THE IMPRESS JOURNAL / CELEBRATIONS',
    excerpt: 'The furniture, linen and tabletop elements that create a naturally connected celebration space.',
    hero: '/images/client-home/brand-showcase-event.jpg',
    heroAlt: 'Elegant decorated event space with floral styling and reception tables',
    accent: '#7a6770',
    openingTitle: 'Make room for the moments that matter',
    opening: [
      'The overall feeling of an event comes from how every element works together. Seating, dining tables and fine details all help guests move comfortably from one moment to the next.',
      'Explore a furniture-first approach to event styling using the real rental categories available through Impress Events.'
    ],
    triptych: ['/images/client-home/chair-ceremony.jpg', '/images/client-home/long-table.jpg', '/images/client-home/outdoor-aisle.jpg'],
    caption: 'Think about the way your guests experience the space, from arrival through to the last toast.',
    widePhoto: '/images/client-home/luxury-hall.png',
    midTitle: 'A setting with a sense of occasion',
    midText: [
      'Beautiful furniture gives the celebration structure. Once the seating plan is considered, tables and linen can establish the visual language for the event.',
      'Mixing thoughtful details with comfortable, practical rental pieces helps create a cohesive look without losing the warm feeling of a gathering.'
    ],
    detailPhoto: '/images/client-home/warm-dining.jpg',
    detailHeading: 'Start with the essentials',
    detailText: 'Whether your event calls for a classic chair or a flexible table arrangement, begin with the pieces guests will use most.',
    details: ['Choose tables and seating for the guest count.', 'Use cohesive linen throughout the dining area.', 'Introduce subtle changes in colour or texture.', 'Add finishing details without overcrowding the space.'],
    productIds: ['imp-chair-244', 'imp-chair-245', 'imp-table-252', 'imp-table-253', 'twht02', 'rwht02', 'plt02', 'tbn06']
  },
  {
    slug: 'romantic-celebration',
    title: 'A Romantic Celebration',
    category: 'The Wedding Edit',
    kicker: 'THE IMPRESS JOURNAL / WEDDINGS',
    excerpt: 'Soft linens, delicate colour and an inviting atmosphere for a celebration filled with meaning.',
    hero: '/images/client-home/romantic-florals.jpg',
    heroAlt: 'Romantic floral wedding table in warm pink and cream tones',
    accent: '#956a64',
    openingTitle: 'A softly romantic setting',
    opening: [
      'Romance can be expressed in an understated palette, a linen with gentle movement, or a place setting chosen with care.',
      'This Impress inspiration edit explores how to layer warm tones and thoughtful rental essentials into a setting that feels effortless and personal.'
    ],
    triptych: ['/images/client-home/blush-table-detail.jpg', '/images/real-events/blush-reception.webp', '/images/client-home/soft-table.jpg'],
    caption: 'Let the colour story flow from the table linen through to the smaller details.',
    widePhoto: '/images/real-events/pastel-banquet.webp',
    midTitle: 'A palette with personality',
    midText: [
      'Warm white, blush and a subtle metallic detail can bring an intimate, welcoming mood to a room. Choose one colour to lead and let the others support it.',
      'Napkins and runners offer an easy way to weave that palette throughout a celebration while keeping the setting functional and beautiful.'
    ],
    detailPhoto: '/images/client-home/candle-centerpiece.jpg',
    detailHeading: 'Romance in the details',
    detailText: 'A graceful linen, a well-paired charger and simple glassware create a timeless foundation for whatever flowers or accents you love.',
    details: ['Pick a soft base colour and one accent.', 'Bring the palette into napkins and runners.', 'Choose glassware and chargers that flatter the mood.', 'Keep the finished look warm, balanced and guest-friendly.'],
    productIds: ['twht05', 'ncrm01', 'nwht02', 'mat02', 'plt09', 'gls04', 'rgld02', 'nrg01']
  }
];

export function getImpressStory(slug:string){return impressStories.find(story=>story.slug===slug)}
