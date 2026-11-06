/**
 * Homepage editorial navigation. The layout follows the client's reference,
 * while category and material links use the Impress catalogue / stock data.
 * No Nuage product or collection names are used as Impress inventory.
 */
export type HeroMenuLink = { label: string; href: string };
export type HeroMenuSection = {
  title: string;
  links: HeroMenuLink[];
  columns?: 1 | 2 | 3;
};
export type HeroMenuTab = {
  label: string;
  title: string;
  photo: string;
  copy: string;
  href: string;
  cta: string;
  variant: 'arrivals' | 'split' | 'categories' | 'simple';
  sections: HeroMenuSection[];
};

const category = (label: string): HeroMenuLink => ({
  label,
  href: `/rentals?category=${encodeURIComponent(label)}`,
});
const material = (label: string): HeroMenuLink => ({
  label,
  // Catalogue search covers the fabric field, and the family keeps these
  // searches within the four actual Impress linen categories.
  href: `/rentals?family=linens&q=${encodeURIComponent(label)}`,
});

const linenMaterials = [
  'Curtain Satin', 'Polyester', 'Cotton', 'Twill', 'Chiffon', 'Satin',
  'Velvet', 'Valentina', 'Sequin', 'Net', 'Pajero', 'Stretch',
  'Lace', 'Raw Silk', 'Organza', 'Amuredi', 'Cheese Cloth',
];

export const heroMenuTabs: HeroMenuTab[] = [
  {
    label: 'NEW ARRIVALS',
    title: 'New Arrivals',
    photo: '/images/client-home/glassware-table.jpg',
    copy: 'Discover the newest looks in our curated rental collection, with timeless pieces and thoughtful finishing touches for every celebration.',
    href: '/rentals',
    cta: 'SHOP NEW ARRIVALS',
    variant: 'arrivals',
    sections: [
      { title: '', links: ['Tablecloths', 'Napkins', 'Runners', 'Placemats', 'Chair Sashes'].map(category) },
      { title: '', links: ['Chairs', 'Tables', 'Chargers', 'Glassware', 'Cutlery', 'Cushion Covers'].map(category) },
    ],
  },
  {
    label: 'LINENS',
    title: 'Linens',
    photo: '/images/client-home/napkin-setting.jpg',
    copy: 'Explore our selection of elegant textures, soft colors and versatile fabrics for beautiful celebrations.',
    href: '/rentals?family=linens',
    cta: 'SHOP ALL LINENS',
    variant: 'split',
    sections: [
      {
        title: 'BROWSE BY CATEGORY:',
        columns: 1,
        links: ['Tablecloths', 'Napkins', 'Runners', 'Placemats'].map(category),
      },
      {
        title: 'BROWSE BY FABRIC:',
        columns: 3,
        links: linenMaterials.map(material),
      },
    ],
  },
  {
    label: 'FURNITURE',
    title: 'Furniture',
    photo: '/images/client-home/chair-ceremony.jpg',
    copy: 'Bring your venue to life with refined seating, tables and event furniture selected for unforgettable occasions.',
    href: '/furniture',
    cta: 'EXPLORE FURNITURE',
    variant: 'categories',
    sections: [{
      title: 'BROWSE BY CATEGORY:',
      columns: 2,
      links: ['Chairs', 'Tables', 'Chair Sashes', 'Cushion Covers'].map(category),
    }],
  },
  {
    label: 'TABLETOP',
    title: 'Tabletop & Accessories',
    photo: '/images/client-home/charger-place-setting.jpg',
    copy: 'Layer your setting with beautifully considered tableware and finishing details, from glassware to charger plates.',
    href: '/rentals?family=tabletop',
    cta: 'SHOP TABLETOP',
    variant: 'categories',
    sections: [{
      title: 'BROWSE BY CATEGORY:',
      columns: 2,
      links: ['Chargers', 'Glassware', 'Cutlery', 'Napkin Rings', 'Table Numbers'].map(category),
    }],
  },
  {
    label: 'INSPIRATION',
    title: 'Inspiration',
    photo: '/images/client-home/romantic-florals.jpg',
    copy: 'Find your next great idea in our real event galleries, considered styling and beautifully layered celebrations.',
    href: '/lookbook',
    cta: 'EXPLORE OUR LOOKBOOK',
    variant: 'simple',
    sections: [{
      title: 'DISCOVER MORE:',
      links: [
        { label: 'Real Events', href: '/lookbook' },
        { label: 'Our Collections', href: '/categories' },
        { label: 'Contact Our Team', href: '/contact' },
      ],
    }],
  },
  {
    label: 'DESIGN WITH US ✦',
    title: 'Design With Impress',
    photo: '/images/client-home/brand-showcase-event.jpg',
    copy: 'Tell us about your celebration. Our team can help you choose beautifully coordinated rentals for your event.',
    href: '/contact',
    cta: 'CONTACT OUR TEAM',
    variant: 'simple',
    sections: [{
      title: 'GET STARTED:',
      links: [
        { label: 'Browse All Rentals', href: '/rentals' },
        { label: 'View Your Quotation', href: '/quote' },
        { label: 'Ask a Question', href: '/contact' },
      ],
    }],
  },
];
