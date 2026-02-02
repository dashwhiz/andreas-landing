'use client';

import styled from 'styled-components';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import MarktportfolioSection from '@/components/MarktportfolioSection';
import KIAntwortenSection from '@/components/KIAntwortenSection';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import amazonLogo from '../../public/amazon-logo.png';
import bookCover from '../../public/book_cover.png';

const MOBILE_BREAKPOINT = 768;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    gap: 48px;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
  width: 100%;
  max-width: 900px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column-reverse;
    gap: 32px;
    text-align: center;
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

  img {
    display: block;
    width: 220px;
    height: auto;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    img {
      width: 180px;
    }
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

const ColoredSection = styled.div<{ $bgColor: string }>`
  width: 100%;
  background: ${(props) => props.$bgColor};
  border-radius: 24px;
  padding: 48px 40px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 32px 20px;
    border-radius: 20px;
  }
`;

export default function Home() {
  const { t } = useTranslations();

  return (
    <PageLayout>
      <ContentWrapper>
        <HeroSection>
          <HeroContent>
            <BookTitle>{t('home.welcome.title')}</BookTitle>
            <BookDescription>{t('home.welcome.description')}</BookDescription>
            <AmazonButton href="#" target="_blank" rel="noopener noreferrer">
              <Image
                src={amazonLogo}
                alt="Amazon"
                width={28}
                height={28}
              />
              {t('home.book.cta_button')}
            </AmazonButton>
          </HeroContent>
          <BookCoverWrapper>
            <Image
              src={bookCover}
              alt={t('home.book.alt_text')}
              width={220}
              height={320}
              priority
            />
          </BookCoverWrapper>
        </HeroSection>

        <ColoredSection $bgColor={AppColors.brand.blue[90]}>
          <MarktportfolioSection />
        </ColoredSection>

        <KIAntwortenSection />
      </ContentWrapper>
    </PageLayout>
  );
}
