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
  width: 350px;
  flex-shrink: 0;
  background: ${AppColors.white};
  border-radius: 16px;
  border-left: 3px solid
    ${({ $type }) =>
      $type === 'magazine'
        ? AppColors.brand.orange[50]
        : AppColors.brand.blue[50]};
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  user-select: none;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 300px;
    padding: 24px 20px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DecorativeQuote = styled.span<{ $type: string }>`
  font-size: 64px;
  font-weight: 700;
  color: ${({ $type }) =>
    $type === 'magazine'
      ? AppColors.brand.orange[80]
      : AppColors.brand.blue[80]};
  line-height: 0.6;
  font-family: Georgia, serif;
`;

const LogoImage = styled.img`
  max-height: 24px;
  max-width: 80px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.5;
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

interface QuoteData {
  id: string;
  type: 'person' | 'magazine';
  logo?: string;
}

interface QuoteTranslations {
  text: string;
  name: string;
  role: string;
}

interface Quote extends QuoteData, QuoteTranslations {}

const QUOTE_DATA: QuoteData[] = [
  { id: 'cq1', type: 'person' },
  { id: 'cq2', type: 'person' },
  { id: 'cq3', type: 'person' },
  { id: 'cq4', type: 'magazine', logo: 'euro-logo.png' },
  { id: 'cq5', type: 'person' },
  { id: 'cq6', type: 'magazine', logo: 'der_spiegel_logo.svg' },
  { id: 'cq7', type: 'person' },
  { id: 'cq8', type: 'person' },
  { id: 'cq9', type: 'magazine', logo: 'prisma_logo.png' },
  { id: 'cq10', type: 'person' },
  { id: 'cq11', type: 'magazine', logo: 'sat-1-logo.svg' },
];

function QuoteCardItem({ quote }: { quote: Quote }) {
  return (
    <QuoteCard $type={quote.type}>
      <CardHeader>
        <DecorativeQuote $type={quote.type}>&ldquo;</DecorativeQuote>
        {quote.logo && (
          <LogoImage src={`/images/${quote.logo}`} alt={quote.name} />
        )}
      </CardHeader>
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
  const quoteTranslations = tObject<Record<string, QuoteTranslations>>('celebrity_quotes.quotes') ?? {};
  const quotes: Quote[] = QUOTE_DATA.map((qd) => ({
    ...qd,
    ...(quoteTranslations[qd.id] ?? { text: '', name: '', role: '' }),
  }));
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const paused = useRef(false);
  const rafId = useRef<number>(0);

  const getHalfWidth = useCallback(() => {
    if (!trackRef.current) return 1;
    return trackRef.current.scrollWidth / 2;
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!paused.current && !dragging.current) {
        offset.current += SPEED;
        const half = getHalfWidth();
        if (offset.current >= half) offset.current -= half;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offset.current}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [getHalfWidth]);

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
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          dragging.current = false;
          paused.current = false;
        }}
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
