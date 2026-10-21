'use client';

import { useEffect } from 'react';

/**
 * Homepage enhancement for the photo only.
 * All headings, copy, links and sections stay completely static, even when
 * navigating away and back to the homepage.
 * Desktop pointer parallax is disabled for touch and reduced-motion users.
 */
export default function LandingMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.impress-hero');
    if (!hero) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const resetImage = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      hero.style.removeProperty('--hero-pointer-x');
      hero.style.removeProperty('--hero-pointer-y');
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) {
        resetImage();
        return;
      }
      const rect = hero.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        hero.style.setProperty('--hero-pointer-x', `${(-x * 14).toFixed(1)}px`);
        hero.style.setProperty('--hero-pointer-y', `${(-y * 10).toFixed(1)}px`);
        frame = 0;
      });
    };

    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', resetImage);
    finePointer.addEventListener('change', resetImage);
    reducedMotion.addEventListener('change', resetImage);

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', resetImage);
      finePointer.removeEventListener('change', resetImage);
      reducedMotion.removeEventListener('change', resetImage);
      resetImage();
    };
  }, []);

  return null;
}
