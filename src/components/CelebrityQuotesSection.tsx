'use client';

import styled, { keyframes } from 'styled-components';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;

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
`;

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const Track = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
  animation: ${scroll} 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    gap: 16px;
    animation-duration: 25s;
  }
`;

const QuoteCard = styled.div`
  width: 300px;
  flex-shrink: 0;
  background: ${AppColors.brand.neutral[100]};
  border-radius: 16px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 260px;
    padding: 24px 20px;
  }
`;

const QuoteText = styled.p`
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral[10]};
  line-height: 1.7;
  margin: 0;
  font-style: italic;

  &::before {
    content: '\u201E';
  }

  &::after {
    content: '\u201C';
  }
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
  text: string;
  name: string;
  role: string;
}

function QuoteCardItem({ quote }: { quote: Quote }) {
  return (
    <QuoteCard>
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

  if (quotes.length === 0) return null;

  return (
    <Section>
      <SectionTitle>{t('celebrity_quotes.title')}</SectionTitle>
      <MarqueeWrapper>
        <Track>
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
