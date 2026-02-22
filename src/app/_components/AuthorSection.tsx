'use client';

import styled from 'styled-components';
import Image from 'next/image';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import authorPhoto from '../../../public/images/andreas_hackethal.jpeg';

const MOBILE_BREAKPOINT = 768;

const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 32px;
  background: ${AppColors.brand.blue[90]};
  border-radius: 20px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
    text-align: center;
    padding: 24px;
    gap: 20px;
  }
`;

const Photo = styled.div`
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  width: 160px;

  img {
    display: block;
    width: 160px;
    height: auto;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 140px;

    img {
      width: 140px;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    align-items: center;
  }
`;

const Name = styled.h3`
  font-size: ${AppFontSizes.lg};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0;
`;

const Bio = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[20]};
  line-height: 1.6;
  margin: 0;
`;

const LinkedInLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 12px 24px;
  background: #0a66c2;
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

export default function AuthorSection() {
  const { t } = useTranslations();

  return (
    <Section>
      <Photo>
        <Image
          src={authorPhoto}
          alt={t('autor.alt_text')}
          width={160}
          height={213}
          style={{ width: '160px', height: 'auto' }}
        />
      </Photo>
      <Info>
        <Name>{t('autor.title')}</Name>
        <Bio>{t('autor.bio')}</Bio>
        <LinkedInLink
          href={t('autor.linkedin_url')}
          target='_blank'
          rel='noopener noreferrer'
        >
          <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
          </svg>
          {t('autor.linkedin_label')}
        </LinkedInLink>
      </Info>
    </Section>
  );
}
