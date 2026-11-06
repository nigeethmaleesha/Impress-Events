'use client';

import Link from 'next/link';
import type { HeroMenuLink } from '@/data/homeMegaMenu';

interface MegaMenuLinkGridProps {
  links: HeroMenuLink[];
  columns: 1 | 2 | 3;
  onNavigate: () => void;
}

/**
 * Nuage-style paired underline animation.
 *
 * Each link owns its own underline so two animations can overlap:
 * the link the pointer leaves retracts from RIGHT to LEFT, while
 * the newly hovered link draws from LEFT to RIGHT.
 *
 * Keyboard focus uses the same animation, with reduced-motion support
 * provided in impress-reference-2026.css.
 */
export default function MegaMenuLinkGrid({ links, columns, onNavigate }: MegaMenuLinkGridProps) {
  return (
    <div className={`im-mega-link-grid im-mega-cols-${columns} im-mega-link-grid--animated`}>
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
