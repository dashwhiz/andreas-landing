'use client';

import styled from 'styled-components';
import Image from 'next/image';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import amazonLogo from '../../../public/images/amazon-logo.png';
import bookCover from '../../../public/images/book_cover.png';

const MOBILE_BREAKPOINT = 768;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
  width: 100%;
  max-width: 900px;
  padding-top: 48px;
  margin-bottom: 32px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column-reverse;
    gap: 32px;
    text-align: center;
    padding-top: 32px;
    margin-bottom: 16px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    align-items: center;
  }
`;

const BookCoverWrapper = styled.div`
  flex-shrink: 0;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  width: 280px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 220px;
  }
`;

const BookTitle = styled.h1`
  font-size: ${AppFontSizes['4xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 16px 0;
  line-height: 1.2;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes['3xl']};
  }
`;

const BookDescription = styled.p`
  font-size: ${AppFontSizes.md};
  color: ${AppColors.brand.neutral[30]};
  line-height: 1.7;
  margin: 0 0 32px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes.base};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    justify-content: center;
  }
`;

const AmazonButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 28px;
  background: ${AppColors.brand.neutral.neutralBlack};
  color: ${AppColors.white};
  font-size: ${AppFontSizes.base};
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${AppColors.brand.neutral[10]};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 12px 24px;
    gap: 10px;
    font-size: ${AppFontSizes.sm};
  }
`;

export default function HeroSection() {
  const { t } = useTranslations();

  return (
    <Section>
      <HeroContent>
        <BookTitle>{t('home.welcome.title')}</BookTitle>
        <BookDescription>{t('home.welcome.description')}</BookDescription>
        <ButtonRow>
          <AmazonButton
            href='https://amzn.eu/d/01rqUUpb'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image src={amazonLogo} alt='Amazon' width={28} height={28} />
            {t('home.book.cta_button')}
          </AmazonButton>
        </ButtonRow>
      </HeroContent>
      <BookCoverWrapper>
        <Image
          src={bookCover}
          alt={t('home.book.alt_text')}
          width={280}
          height={400}
          priority
          style={{ width: '100%', height: 'auto' }}
        />
      </BookCoverWrapper>
    </Section>
  );
}
