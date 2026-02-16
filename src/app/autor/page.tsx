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

const BioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    align-items: center;
  }
`;

const BioText = styled.p`
  font-size: ${AppFontSizes.md};
  color: ${AppColors.brand.neutral[20]};
  line-height: 1.8;
  margin: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes.base};
    text-align: center;
  }
`;

const LinkedInLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #0A66C2;
  color: ${AppColors.white};
  font-size: ${AppFontSizes.sm};
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: #004182;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(10, 102, 194, 0.3);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
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
        <BioWrapper>
          <BioText>{t('autor.bio')}</BioText>
          <LinkedInLink
            href={t('autor.linkedin_url')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            {t('autor.linkedin_label')}
          </LinkedInLink>
        </BioWrapper>
      </ContentGrid>
    </PageLayout>
  );
}
