'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { categories, catalogueFamilies, products } from '@/lib/catalogue';
import stockData from '@/data/stockFacets.json';
import CategoryProductCard from './CategoryProductCard';

type FilterKey = 'color' | 'fabric' | 'pattern';
type FilterSelections = Record<FilterKey, string[]>;
type StockFacet = { color: string[]; fabric: string; pattern: string[]; sourceDescription?: string };
const stock = stockData as Record<string, StockFacet>;
const FILTERS: {key: FilterKey; label: string}[] = [
  { key: 'color', label: 'COLOR' },
  { key: 'fabric', label: 'FABRIC' },
  { key: 'pattern', label: 'PATTERN' },
];
const EMPTY_FILTERS = (): FilterSelections => ({color: [], fabric: [], pattern: []});
const LOAD_BATCH = 24;
const COLOR_ORDER = ['Black','Blue','Champagne/Gold','Copper/Brown','Green/Teal','Ivory','Orange','Pink','Purple','Red','Silver/Grey','White','Yellow','Beige/Cream','Clear'];
const PATTERN_ORDER = ['Floral','Stripe','Plain','Geometric','Checkered','Lace','Sequin','Crinkle','Pintuck','Pinwheel','Embroidered','Leaf','Rosette','Scalloped','Beaded','Textured'];
const DISPLAY_CATEGORIES: Record<string, string> = {
  Tablecloths: 'TABLECLOTHS AND OVERLAYS',
  Napkins: 'NAPKINS', Runners: 'RUNNERS',
};

function getFacetValues(sku: string, key: FilterKey) {
  const row = stock[sku];
  if (!row) return [];
  return key === 'fabric' ? (row.fabric ? [row.fabric] : []) : row[key];
}
function matchFilter(sku: string, selection: FilterSelections) {
  return FILTERS.every(({key}) =>
    selection[key].length === 0 || selection[key].some(value => getFacetValues(sku, key).includes(value))
  );
}

export default function CatalogueClient({initialCategory, initialQuery, initialFamily = ''}: {
  initialCategory: string;
  initialQuery: string;
  initialFamily?: string;
}) {
  const validCategory = categories.some(c => c.name === initialCategory) ? initialCategory : 'All';
  const activeFamily = Object.prototype.hasOwnProperty.call(catalogueFamilies, initialFamily)
    ? catalogueFamilies[initialFamily as keyof typeof catalogueFamilies]
    : null;
  const [activeFilters, setActiveFilters] = useState<FilterSelections>(EMPTY_FILTERS);
  const [draftFilters, setDraftFilters] = useState<FilterSelections>(EMPTY_FILTERS);
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [filterSearch, setFilterSearch] = useState('');
  const [columns, setColumns] = useState<3 | 4 | 5>(3);
  const [shown, setShown] = useState(LOAD_BATCH);
  const [query, setQuery] = useState(initialQuery);
  const filterRowRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<Record<FilterKey, HTMLButtonElement | null>>({color: null, fabric: null, pattern: null});

  // Selecting a category from the home mega-menu, or Browser Back/Forward,
  // must reset filters belonging to the previous category.
  useEffect(() => {
    setActiveFilters(EMPTY_FILTERS());
    setDraftFilters(EMPTY_FILTERS());
    setOpenFilter(null);
    setShown(LOAD_BATCH);
    setQuery(initialQuery);
  }, [initialCategory, initialFamily, initialQuery]);

  const baseProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(product => {
      const categoryMatch = validCategory === 'All' || product.category === validCategory;
      const familyMatch = !activeFamily || (activeFamily.categories as readonly string[]).includes(product.category);
      const searchMatch = !q || `${product.title} ${product.sku} ${product.fabric} ${product.category} ${stock[product.sku]?.sourceDescription || ''}`.toLowerCase().includes(q);
      return categoryMatch && familyMatch && searchMatch;
    });
  }, [validCategory, activeFamily, query]);

  const filterOptions = useMemo(() => {
    const result = {} as Record<FilterKey, {label: string; count: number}[]>;
    for (const {key} of FILTERS) {
      const count = new Map<string, number>();
      for (const product of baseProducts) {
        for (const value of getFacetValues(product.sku, key)) {
          count.set(value, (count.get(value) || 0) + 1);
        }
      }
      const preferred = key === 'color' ? COLOR_ORDER : key === 'pattern' ? PATTERN_ORDER : [];
      result[key] = [...count.entries()]
        .sort((a,b) => {
          const ia = preferred.indexOf(a[0]); const ib = preferred.indexOf(b[0]);
          if (ia >= 0 && ib >= 0) return ia - ib;
          if (ia >= 0) return -1;
          if (ib >= 0) return 1;
          return a[0].localeCompare(b[0]);
        })
        .map(([label, value]) => ({label, count: value}));
    }
    return result;
  }, [baseProducts]);

  const matched = useMemo(() => baseProducts.filter(product => matchFilter(product.sku, activeFilters)), [baseProducts, activeFilters]);
  const previewCount = useMemo(() => baseProducts.filter(product => matchFilter(product.sku, draftFilters)).length, [baseProducts, draftFilters]);
  const shownProducts = matched.slice(0, shown);
  const hasFilters = FILTERS.some(({key}) => activeFilters[key].length > 0);
  const categoryTitle = validCategory !== 'All'
    ? (DISPLAY_CATEGORIES[validCategory] || validCategory.toUpperCase())
    : (activeFamily?.title ?? (query ? 'SEARCH RESULTS' : 'ALL RENTAL PIECES')).toUpperCase();
  const breadcrumbCategory = validCategory !== 'All' ? validCategory : activeFamily?.title ?? 'All Collections';

  const closeFilter = () => {
    setOpenFilter(null);
    setFilterSearch('');
    setDraftFilters({
      color: [...activeFilters.color], fabric: [...activeFilters.fabric], pattern: [...activeFilters.pattern],
    });
  };
  useEffect(() => {
    if (!openFilter) return;
    const pointerOutside = (event: PointerEvent) => {
      if (!filterRowRef.current?.contains(event.target as Node)) closeFilter();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const current = openFilter;
        closeFilter();
        dropdownTriggerRef.current[current]?.focus();
      }
    };
    document.addEventListener('pointerdown', pointerOutside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', pointerOutside);
      document.removeEventListener('keydown', escape);
    };
  }, [openFilter, activeFilters]);

  const openOrClose = (key: FilterKey) => {
    if (openFilter === key) { closeFilter(); return; }
    if (!openFilter) setDraftFilters({
      color: [...activeFilters.color], fabric: [...activeFilters.fabric], pattern: [...activeFilters.pattern],
    });
    setOpenFilter(key);
    setFilterSearch('');
  };
  const toggleDraft = (key: FilterKey, label: string) => {
    setDraftFilters(old => ({
      ...old,
      [key]: old[key].includes(label) ? old[key].filter(value => value !== label) : [...old[key], label],
    }));
  };
  const applyFilters = () => {
    setActiveFilters({color: [...draftFilters.color], fabric: [...draftFilters.fabric], pattern: [...draftFilters.pattern]});
    setOpenFilter(null);
    setFilterSearch('');
    setShown(LOAD_BATCH);
  };
  const clearFilters = () => {
    setActiveFilters(EMPTY_FILTERS());
    setDraftFilters(EMPTY_FILTERS());
    setOpenFilter(null);
    setFilterSearch('');
    setShown(LOAD_BATCH);
  };

  return <section className="im-cat-page" aria-label="Impress rental product catalogue">
    <div className="im-cat-page-inner">
      <h1 className="im-cat-heading">{categoryTitle}</h1>
      <div className="im-cat-filters" ref={filterRowRef}>
        {FILTERS.map(({key, label}) => {
          const options = filterOptions[key].filter(option => option.label.toLowerCase().includes(filterSearch.trim().toLowerCase()));
          const expanded = openFilter === key;
          const selectedCount = activeFilters[key].length;
          return <div className={`im-cat-filter ${expanded ? 'is-open' : ''}`} key={key}>
            <button
              type="button"
              ref={node => {dropdownTriggerRef.current[key] = node;}}
              className="im-cat-filter-trigger"
              onClick={() => openOrClose(key)}
              aria-expanded={expanded}
              aria-controls={`im-filter-panel-${key}`}
              aria-haspopup="true"
            >
              <span>{label}{selectedCount ? ` (${selectedCount})` : ''}</span>
              <ChevronDown size={21} strokeWidth={1.6} aria-hidden="true" />
            </button>
            {expanded && <div className="im-cat-dropdown" id={`im-filter-panel-${key}`}>
              <div className="im-cat-dropdown-search">
                <Search size={21} strokeWidth={1.4} aria-hidden="true" />
                <input
                  autoFocus
                  value={filterSearch}
                  onChange={event => setFilterSearch(event.target.value)}
                  aria-label={`Search ${label.toLowerCase()} options`}
                  placeholder={`Search ${label.toLowerCase()}`}
                />
                {filterSearch && <button type="button" aria-label="Clear search" onClick={() => setFilterSearch('')}><X size={16}/></button>}
              </div>
              <div className="im-cat-dropdown-list" role="group" aria-label={`${label.toLowerCase()} choices`}>
                {options.length ? options.map(option => {
                  const selected = draftFilters[key].includes(option.label);
                  return <button
                    key={option.label}
                    type="button"
                    role="checkbox"
                    aria-checked={selected}
                    className={selected ? 'is-selected' : ''}
                    onClick={() => toggleDraft(key, option.label)}
                  >
                    <span>{option.label} ({option.count})</span>
                    {selected && <Check size={18} aria-hidden="true" />}
                  </button>;
                }) : <p className="im-cat-options-empty">{filterOptions[key].length === 0 ? `No ${label.toLowerCase()} details listed in the stock sheet for this category.` : 'No matching options'}</p>}
              </div>
              <div className="im-cat-dropdown-actions">
                <button type="button" onClick={clearFilters}>CLEAR ALL</button>
                <button type="button" className="im-cat-show-results" onClick={applyFilters}>SHOW RESULTS ({previewCount})</button>
              </div>
            </div>}
          </div>;
        })}
      </div>

      <div className="im-cat-grid-toolbar">
        <div className="im-cat-crumb">
          <Link href="/rentals" aria-label="All collections" className="im-cat-crumb-grid"><span/><span/><span/><span/></Link>
          <span className="im-cat-crumb-slash">/</span>
          <span>{breadcrumbCategory.toUpperCase()}</span>
          {hasFilters && <button onClick={clearFilters} type="button" className="im-cat-active-clear">CLEAR FILTERS <X size={13}/></button>}
        </div>
        <div className="im-cat-grid-tools">
          <span className="im-cat-count">{matched.length} {matched.length === 1 ? 'PIECE' : 'PIECES'}</span>
          <div className="im-cat-grid-views" role="group" aria-label="Product grid columns">
            {([3, 4, 5] as const).map(count => <button type="button" key={count}
              onClick={() => setColumns(count)} className={columns === count ? 'is-current' : ''}
              aria-label={`Show ${count} columns`} aria-pressed={columns === count} title={`${count} column view`}>
              {Array.from({length: count}, (_, index) => <i key={index}/>)}
            </button>)}
          </div>
        </div>
      </div>

      {query && <div className="im-cat-search-current">Showing matches for “{query}”</div>}
      {matched.length ? <>
        <div className={`im-cat-products im-cat-columns-${columns}`}>
          {shownProducts.map(product => <CategoryProductCard key={product.id} product={product} stock={stock[product.sku]}/>)}
        </div>
        {shown < matched.length && <div className="im-cat-load-more">
          <p>Showing {shownProducts.length} of {matched.length} products</p>
          <button type="button" onClick={() => setShown(old => old + LOAD_BATCH)}>LOAD MORE PRODUCTS</button>
        </div>}
      </> : <div className="im-cat-no-products">
        <h2>No matching pieces found.</h2>
        <p>Try a different color, fabric, or pattern combination.</p>
        <button type="button" onClick={() => {clearFilters(); setQuery('');}}>CLEAR ALL FILTERS</button>
      </div>}
    </div>
  </section>;
}
