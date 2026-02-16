'use client';

import styled from 'styled-components';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import authorPhoto from '../../../public/andreas_hackethal.jpeg';

const MOBILE_BREAKPOINT = 768;

const PageTitle = styled.h1`
  font-size: ${AppFontSizes['4xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 8px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${AppFontSizes.md};
  color: ${AppColors.brand.neutral[40]};
  font-weight: 600;
  margin: 0 0 40px 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: 1fr;
    gap: 32px;
    justify-items: center;
  }
`;

const PhotoWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);

  img {
    display: block;
    width: 300px;
    height: auto;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    img {
      width: 240px;
    }
  }
`;

const BioText = styled.p`
  font-size: ${AppFontSizes.md};
  color: ${AppColors.brand.neutral[20]};
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes.base};
    text-align: center;
  }
`;

export default function AutorPage() {
  const { t } = useTranslations();

  return (
    <PageLayout>
      <PageTitle>{t('autor.title')}</PageTitle>
      <Subtitle>{t('autor.subtitle')}</Subtitle>

      <ContentGrid>
        <PhotoWrapper>
          <Image
            src={authorPhoto}
            alt={t('autor.alt_text')}
            width={300}
            height={400}
            priority
            style={{ width: '300px', height: 'auto' }}
          />
        </PhotoWrapper>
        <BioText>{t('autor.bio')}</BioText>
      </ContentGrid>
    </PageLayout>
  );
}
