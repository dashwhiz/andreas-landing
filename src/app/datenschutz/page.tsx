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
    font-size: ${AppFontSizes['3xl']};
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

export default function DatenschutzPage() {
  const { t } = useTranslations();

  return (
    <PageLayout>
      <PageTitle>{t('datenschutz.title')}</PageTitle>
      <Section>
        <SectionTitle>{t('datenschutz.responsible_title')}</SectionTitle>
        <Text>{t('datenschutz.responsible_text')}</Text>
      </Section>
      <Section>
        <SectionTitle>{t('datenschutz.overview_title')}</SectionTitle>
        <Text>{t('datenschutz.overview_text')}</Text>
      </Section>
      <Section>
        <SectionTitle>{t('datenschutz.hosting_title')}</SectionTitle>
        <Text>{t('datenschutz.hosting_text')}</Text>
      </Section>
      <Section>
        <SectionTitle>{t('datenschutz.analytics_title')}</SectionTitle>
        <Text>{t('datenschutz.analytics_text')}</Text>
      </Section>
      <Section>
        <SectionTitle>{t('datenschutz.local_storage_title')}</SectionTitle>
        <Text>{t('datenschutz.local_storage_text')}</Text>
      </Section>
      <Section>
        <SectionTitle>{t('datenschutz.external_links_title')}</SectionTitle>
        <Text>{t('datenschutz.external_links_text')}</Text>
      </Section>
      <Section>
        <SectionTitle>{t('datenschutz.rights_title')}</SectionTitle>
        <Text>{t('datenschutz.rights_text')}</Text>
      </Section>
    </PageLayout>
  );
}
