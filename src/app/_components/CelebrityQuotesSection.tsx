'use client';

import { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;
const SPEED = 0.5; // px per frame

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: ${AppFontSizes['2xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 32px 0;
  text-align: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes.xl};
    margin: 0 0 24px 0;
  }
`;

const MarqueeWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Track = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
  will-change: transform;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    gap: 16px;
  }
`;

const QuoteCard = styled.div<{ $type: string }>`
  width: 300px;
  flex-shrink: 0;
  background: ${AppColors.white};
  border-radius: 16px;
  border-left: 3px solid ${({ $type }) =>
    $type === 'magazine' ? AppColors.brand.orange[50] : AppColors.brand.blue[50]};
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  user-select: none;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 260px;
    padding: 24px 20px;
  }
`;

const DecorativeQuote = styled.span<{ $type: string }>`
  font-size: 64px;
  font-weight: 700;
  color: ${({ $type }) =>
    $type === 'magazine' ? AppColors.brand.orange[80] : AppColors.brand.blue[80]};
  line-height: 0.6;
  font-family: Georgia, serif;
`;

const QuoteText = styled.p`
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral[10]};
  line-height: 1.7;
  margin: 0;
  font-style: italic;
`;

const QuoteAuthor = styled.div`
  margin-top: auto;
`;

const AuthorName = styled.p`
  font-size: ${AppFontSizes.sm};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0;
`;

const AuthorRole = styled.p`
  font-size: ${AppFontSizes.xs};
  color: ${AppColors.brand.neutral[40]};
  margin: 4px 0 0 0;
`;

interface Quote {
  id: string;
  type: 'person' | 'magazine';
  text: string;
  name: string;
  role: string;
}

function QuoteCardItem({ quote }: { quote: Quote }) {
  return (
    <QuoteCard $type={quote.type}>
      <DecorativeQuote $type={quote.type}>&ldquo;</DecorativeQuote>
      <QuoteText>{quote.text}</QuoteText>
      <QuoteAuthor>
        <AuthorName>{quote.name}</AuthorName>
        <AuthorRole>{quote.role}</AuthorRole>
      </QuoteAuthor>
    </QuoteCard>
  );
}

export default function CelebrityQuotesSection() {
  const { t, tObject } = useTranslations();
  const quotes = tObject<Quote[]>('celebrity_quotes.quotes') || [];
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const paused = useRef(false);
  const rafId = useRef<number>(0);

  const getHalfWidth = useCallback(() => {
    if (!trackRef.current) return 1;
    // Half the track = one full set of cards + gaps
    return trackRef.current.scrollWidth / 2;
  }, []);

  const animate = useCallback(() => {
    if (!paused.current && !dragging.current) {
      offset.current += SPEED;
      const half = getHalfWidth();
      if (offset.current >= half) offset.current -= half;
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offset.current}px)`;
    }
    rafId.current = requestAnimationFrame(animate);
  }, [getHalfWidth]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offset.current;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const delta = dragStartX.current - e.clientX;
    offset.current = dragStartOffset.current + delta;
    const half = getHalfWidth();
    if (offset.current < 0) offset.current += half;
    if (offset.current >= half) offset.current -= half;
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = offset.current;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    const delta = dragStartX.current - e.touches[0].clientX;
    offset.current = dragStartOffset.current + delta;
    const half = getHalfWidth();
    if (offset.current < 0) offset.current += half;
    if (offset.current >= half) offset.current -= half;
  };

  const onTouchEnd = () => {
    dragging.current = false;
  };

  if (quotes.length === 0) return null;

  return (
    <Section>
      <SectionTitle>{t('celebrity_quotes.title')}</SectionTitle>
      <MarqueeWrapper
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { dragging.current = false; paused.current = false; }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Track ref={trackRef}>
          {quotes.map((quote) => (
            <QuoteCardItem key={quote.id} quote={quote} />
          ))}
          {/* Duplicate for seamless loop */}
          {quotes.map((quote) => (
            <QuoteCardItem key={`dup-${quote.id}`} quote={quote} />
          ))}
        </Track>
      </MarqueeWrapper>
    </Section>
  );
}
