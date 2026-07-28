"use client"
import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full box-border origin-top will-change-transform backface-hidden transform-3d ${itemClassName}`.trim()}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  mode?: 'animated' | 'sticky';
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  entryScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  topPaddingClassName?: string;
  bottomPaddingClassName?: string;
  childGapClassName?: string;
  pushDistance?: number; // px of scroll travel to push one card up (default 200)
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  mode = 'animated',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  entryScale = 1.08,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
  topPaddingClassName = 'pt-[30vh]',
  bottomPaddingClassName = 'pb-[200vh]',
  childGapClassName = '',
  pushDistance = 200,
}) => {
  const isStickyMode = mode === 'sticky';
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const windowScrollCleanupRef = useRef<(() => void) | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const N = cardsRef.current.length;

    const endElement = useWindowScroll
      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    // pinEnd is when the whole stack starts releasing
    const pinEnd = endElementTop - containerHeight / 2;

    // allStackedAt: scroll position when the LAST card finishes stacking
    // = pinStart of the last card
    const lastCardTop = cardOffsetsRef.current[N - 1] ?? 0;
    const allStackedAt = lastCardTop - stackPositionPx - itemStackDistance * (N - 1);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i] ?? getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;

      const scaleProgress = calculateProgress(scrollTop, triggerStart - containerHeight * 0.35, triggerEnd);
      const targetScale = i === 0 ? 1 : baseScale + i * itemScale;
      const startScale = i === 0 ? 1 : entryScale;
      const scale = i === 0 ? 1 : startScale - scaleProgress * (startScale - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < N; j++) {
          const jCardTop = cardOffsetsRef.current[j] ?? getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        // ── Phase 1: card is stacked/pinned ──
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;

      } else if (scrollTop > pinEnd) {
        // ── Phase 2: push cards upward one by one ──
        //
        // After allStackedAt, each subsequent pushDistance px of scroll
        // causes card (N-1) to catch card (N-2), then (N-2) catches (N-3), etc.
        //
        // Card i gets pushed up when card i+1 catches it.
        // Card j catches card j-1 after (N-1-j) * pushDistance px past allStackedAt.

        const pushScroll = Math.max(0, scrollTop - allStackedAt);

        // Base stacked translateY (where this card sits when fully stacked)
        const baseTranslateY = allStackedAt - cardTop + stackPositionPx + itemStackDistance * i;

        // How much card i gets pushed up:
        // Each card j > i pushes card i up by itemStackDistance
        // when pushScroll crosses (N-1-j)*pushDistance
        let pushUp = 0;
        for (let j = N - 1; j > i; j--) {
          // card j starts pushing at this scroll offset
          const pushStart = (N - 1 - j) * pushDistance;
          const pushProgress = Math.max(0, Math.min(1, (pushScroll - pushStart) / pushDistance));
          pushUp += pushProgress * itemStackDistance;
        }

        translateY = baseTranslateY - pushUp;

      } else if (scrollTop > pinEnd - 1 && scrollTop <= pinEnd) {
        // tiny guard for the exact boundary
        const stickyTop = parseFloat(window.getComputedStyle(card).top || '0');
        translateY = scrollTop - cardTop + stickyTop;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === N - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    entryScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    pushDistance,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const containerClassName = useWindowScroll
    ? `relative w-full overflow-visible [transform:translateZ(0)] [will-change:transform] ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible [overscroll-behavior:contain] [scroll-behavior:smooth] [transform:translateZ(0)] [will-change:scroll-position] ${className}`.trim();

  const setupLenis = useCallback(() => {
    if (isStickyMode) return;

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      windowScrollCleanupRef.current = () => window.removeEventListener('scroll', handleScroll);
      handleScroll();
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    return lenis;
  }, [handleScroll, isStickyMode, useWindowScroll]);

  useLayoutEffect(() => {
    if (isStickyMode) return;
    if (!useWindowScroll && !scrollerRef.current) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])
    ) as HTMLElement[];

    cardsRef.current = cards;
    cardOffsetsRef.current = cards.map(card => getElementOffset(card));
    const transformsCache = lastTransformsRef.current;

    cards.forEach(card => {
      card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';
    });

    setupLenis();
    updateCardTransforms();

    return () => {
      windowScrollCleanupRef.current?.();
      windowScrollCleanupRef.current = null;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenisRef.current?.destroy();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance, itemScale, itemStackDistance,
    stackPosition, scaleEndPosition, baseScale,
    scaleDuration, rotationAmount, blurAmount,
    useWindowScroll, isStickyMode, onStackComplete,
    pushDistance, getElementOffset, setupLenis, updateCardTransforms,
  ]);

  return (
    <div className={containerClassName} ref={scrollerRef}>
      <div className={`scroll-stack-inner px-20 min-h-screen ${topPaddingClassName} ${bottomPaddingClassName} ${childGapClassName}`.trim()}>
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;