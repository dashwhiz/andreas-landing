'use client';

import styled from 'styled-components';
import PageLayout from '@/components/PageLayout';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;

const PageTitle = styled.h1`
  font-size: ${AppFontSizes['4xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 32px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes['2xl']};
  }
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: ${AppFontSizes.lg};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 12px 0;
`;

const Text = styled.p`
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral[20]};
  line-height: 1.8;
  margin: 0 0 8px 0;
  white-space: pre-line;
`;

export default function ImpressumPage() {
  const { t } = useTranslations();

  return (
    <PageLayout>
      <PageTitle>{t('impressum.title')}</PageTitle>
      <Section>
        <SectionTitle>{t('impressum.responsible_title')}</SectionTitle>
        <Text>{t('impressum.responsible_text')}</Text>
      </Section>
      <Section>
        <SectionTitle>{t('impressum.contact_title')}</SectionTitle>
        <Text>{t('impressum.contact_text')}</Text>
      </Section>
      <Section>
        <SectionTitle>{t('impressum.disclaimer_title')}</SectionTitle>
        <Text>{t('impressum.disclaimer_text')}</Text>
      </Section>
    </PageLayout>
  );
}
