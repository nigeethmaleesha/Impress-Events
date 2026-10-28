'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { categories, products } from '@/lib/catalogue';
import ProductCard from './ProductCard';

const groups = ['All', 'Table Linen', 'Tabletop', 'Furniture', 'Accessories'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured First' },
  { value: 'az', label: 'Name: A To Z' },
  { value: 'za', label: 'Name: Z To A' },
] as const;
const PER_PAGE = 12;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export default function CatalogueClient({
  initialCategory,
  initialQuery,
}: {
  initialCategory: string;
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [group, setGroup] = useState('All');
  const [sort, setSort] = useState<SortValue>('featured');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const filterCloseRef = useRef<HTMLButtonElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const filterPanelRef = useRef<HTMLElement>(null);

  // Next.js preserves client component state when only the URL's search parameters change.
  // Keep the visible catalogue in sync with navigation from the category mega menu,
  // search links and the browser's Back/Forward buttons.
  useEffect(() => {
    setCategory(initialCategory);
    setQuery(initialQuery);
    setGroup('All');
    setPage(1);
    setSortOpen(false);
    setFiltersOpen(false);
  }, [initialCategory, initialQuery]);

  const validCat = categories.some((c) => c.name === category) ? category : 'All';
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    const matches = products.filter(
      (p) =>
        (validCat === 'All' || p.category === validCat) &&
        (group === 'All' || p.subcategory === group) &&
        `${p.title} ${p.category} ${p.fabric} ${p.sku}`.toLowerCase().includes(normalized),
    );
    if (sort === 'az') return matches.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'za') return matches.sort((a, b) => b.title.localeCompare(a.title));
    return matches.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [validCat, group, query, sort]);

  const maxPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, maxPages);
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const sortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Featured First';

  useEffect(() => {
    if (!sortOpen) return;
    const onOutsideClick = (event: PointerEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) setSortOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSortOpen(false);
        sortButtonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onOutsideClick);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', onOutsideClick);
      document.removeEventListener('keydown', onEscape);
    };
  }, [sortOpen]);

  useEffect(() => {
    if (!filtersOpen) return;
    const media = window.matchMedia('(max-width: 1024px)');
    const oldOverflow = document.body.style.overflow;
    const syncScrollLock = () => {
      document.body.style.overflow = media.matches ? 'hidden' : oldOverflow;
    };
    syncScrollLock();
    filterCloseRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFiltersOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !media.matches) return;
      const focusables = filterPanelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    media.addEventListener('change', syncScrollLock);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      media.removeEventListener('change', syncScrollLock);
      document.removeEventListener('keydown', onKeyDown);
      filterTriggerRef.current?.focus();
    };
  }, [filtersOpen]);

  const setCat = (nextCategory: string) => {
    setCategory(nextCategory);
    setPage(1);
  };
  const chooseGroup = (nextGroup: string) => {
    setGroup(nextGroup);
    setCat('All');
  };
  const changeSort = (nextSort: SortValue) => {
    setSort(nextSort);
    setPage(1);
    setSortOpen(false);
    sortButtonRef.current?.focus();
  };
  const changePage = (nextPage: number) => {
    setPage(nextPage);
    document.querySelector('.catalogue-main-head')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="page-container catalogue-area">
        <div className="catalogue-toolbar">
          <div className="catalogue-breadcrumb">
            Home <ArrowRight size={12} /> Rentals <span>/ {validCat === 'All' ? 'All Collections' : validCat}</span>
          </div>
          <button
            ref={filterTriggerRef}
            type="button"
            className="filters-mobile-button"
            aria-controls="rental-filters"
            aria-expanded={filtersOpen}
            onClick={() => {
              setSortOpen(false);
              setFiltersOpen(true);
            }}
          >
            <SlidersHorizontal size={17} aria-hidden="true" /> Filters
          </button>

          <div className="sort-control" ref={sortRef}>
            <span className="pieces-count">{filtered.length} pieces</span>
            <span className="sort-label">Sort By</span>
            <button
              type="button"
              ref={sortButtonRef}
              className="sort-trigger"
              aria-expanded={sortOpen}
              aria-haspopup="true"
              aria-controls="sort-options"
              onClick={() => setSortOpen((open) => !open)}
            >
              <span>{sortLabel}</span>
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            {sortOpen && (
              <div id="sort-options" className="sort-menu" role="group" aria-label="Sort rental products">
                {SORT_OPTIONS.map((option) => (
                  <button
                    type="button"
                    className={sort === option.value ? 'selected' : ''}
                    aria-pressed={sort === option.value}
                    key={option.value}
                    onClick={() => changeSort(option.value)}
                  >
                    <span>{option.label}</span>
                    {sort === option.value && <Check size={17} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="catalogue-layout">
          {filtersOpen && (
            <button
              className="filters-backdrop"
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
              tabIndex={-1}
            />
          )}
          <aside
            ref={filterPanelRef}
            id="rental-filters"
            className={`catalogue-sidebar ${filtersOpen ? 'show' : ''}`}
            role={filtersOpen ? 'dialog' : undefined}
            aria-modal={filtersOpen || undefined}
            aria-label="Filter rental products"
          >
            <div className="filter-mobile-header">
              <h3>Filters</h3>
              <button type="button" ref={filterCloseRef} onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={24} />
              </button>
            </div>
            <div className="filter-scroll-content">
              <h3>Find Your Pieces</h3>
              <div className="filter-search">
                <Search size={16} aria-hidden="true" />
                <input
                  aria-label="Search products"
                  value={query}
                  placeholder="Search the collection..."
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <h4>Collection</h4>
              <div className="filter-options">
                {groups.map((g) => (
                  <button key={g} type="button" className={group === g ? 'selected' : ''} onClick={() => chooseGroup(g)}>
                    {g}
                    <span>{g === 'All' ? products.length : products.filter((p) => p.subcategory === g).length}</span>
                  </button>
                ))}
              </div>
              <h4>Categories</h4>
              <div className="filter-options">
                {['All', ...categories.map((c) => c.name)]
                  .filter((c) => group === 'All' || c === 'All' || categories.find((x) => x.name === c)?.group === group)
                  .map((c) => (
                    <button key={c} type="button" className={validCat === c ? 'selected' : ''} onClick={() => setCat(c)}>
                      {c === 'All' ? 'All categories' : c}
                      <span>{c === 'All' ? products.length : products.filter((p) => p.category === c).length}</span>
                    </button>
                  ))}
              </div>
              <div className="sidebar-help">
                <span>NEED A HAND?</span>
                <p>Not sure what to choose? Tell us about your celebration.</p>
                <a href="/contact">
                  Get in touch <ArrowRight size={14} />
                </a>
              </div>
            </div>
            <div className="filter-mobile-footer">
              <button className="button button-dark" type="button" onClick={() => setFiltersOpen(false)}>
                Show {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} <ArrowRight size={17} />
              </button>
            </div>
          </aside>

          <div className="catalogue-main">
            <div className="catalogue-main-head">
              <div>
                <span className="eyebrow">The Rental Catalogue</span>
                <h2>{validCat === 'All' ? 'All Rental Pieces' : validCat}</h2>
              </div>
              {validCat !== 'All' && (
                <button className="clear-filter" type="button" onClick={() => setCat('All')}>
                  Clear category <X size={13} aria-hidden="true" />
                </button>
              )}
            </div>
            {/* <p className="catalogue-image-note">
              Images show styling references, not confirmed photos of each individual SKU. Please confirm item details when requesting a quote.
            </p> */}
            {filtered.length ? (
              <>
                <div className="products-grid">
                  {visible.map((p) => (
                    <ProductCard product={p} key={p.id} />
                  ))}
                </div>
                <div className="pagination">
                  <span>
                    Showing {(currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} of{' '}
                    {filtered.length}
                  </span>
                  <div>
                    <button type="button" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} aria-label="Previous page">
                      ‹
                    </button>
                    {Array.from({ length: maxPages }, (_, i) => i + 1)
                      .filter((n) => n === 1 || n === maxPages || Math.abs(n - currentPage) < 2)
                      .map((n) => (
                        <button type="button" className={n === currentPage ? 'active' : ''} key={n} onClick={() => changePage(n)} aria-label={`Go to page ${n}`} aria-current={n === currentPage ? 'page' : undefined}>
                          {n}
                        </button>
                      ))}
                    <button type="button" disabled={currentPage === maxPages} onClick={() => changePage(currentPage + 1)} aria-label="Next page">
                      ›
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-catalogue">
                <Search size={34} />
                <h3>No Matching Pieces Found.</h3>
                <p>Try Searching By Colour, Category, Material Or SKU.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setQuery('');
                    setCat('All');
                    setGroup('All');
                  }}
                >
                  Show All Pieces <ArrowDown size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
