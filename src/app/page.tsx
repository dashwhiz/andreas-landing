'use client';

import styled from 'styled-components';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import NavigationChip from '@/components/NavigationChip';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 80px;
  max-width: 700px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-bottom: 60px;
  }
`;

const BookCoverPlaceholder = styled.div`
  width: 220px;
  height: 320px;
  background: linear-gradient(145deg, ${AppColors.brand.blue[80]}, ${AppColors.brand.blue[90]});
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  color: ${AppColors.brand.neutral[40]};
  font-size: ${AppFontSizes.sm};

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 180px;
    height: 260px;
    margin-bottom: 24px;
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

const NavigationSection = styled.section`
  width: 100%;
  max-width: 800px;
`;

const SectionTitle = styled.h2`
  font-size: ${AppFontSizes['2xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 32px 0;
  text-align: center;
`;

const ChipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: 1fr;
  }
`;

export default function Home() {
  const { t } = useTranslations();

  return (
    <PageLayout>
      <ContentWrapper>
        <HeroSection>
          <BookCoverPlaceholder>
            {t('home.book.alt_text')}
          </BookCoverPlaceholder>
          <BookTitle>{t('home.welcome.title')}</BookTitle>
          <BookDescription>{t('home.welcome.description')}</BookDescription>
          <AmazonButton href="#" target="_blank" rel="noopener noreferrer">
            <Image
              src="/amazon-logo.png"
              alt="Amazon"
              width={28}
              height={28}
            />
            {t('home.book.cta_button')}
          </AmazonButton>
        </HeroSection>

        <NavigationSection>
          <SectionTitle>{t('home.navigation.title')}</SectionTitle>
          <ChipsGrid>
            <NavigationChip
              href="/marktportfolio"
              label={t('home.navigation.marktportfolio')}
              variant="blue"
            />
            <NavigationChip
              href="/ki-antworten"
              label={t('home.navigation.ki_antworten')}
              variant="violet"
            />
            <NavigationChip
              href="/zinseszins"
              label={t('home.navigation.zinseszins')}
              variant="green"
            />
            <NavigationChip
              href="/rentenprognose"
              label={t('home.navigation.rentenprognose')}
              variant="orange"
            />
          </ChipsGrid>
        </NavigationSection>
      </ContentWrapper>
    </PageLayout>
  );
}
