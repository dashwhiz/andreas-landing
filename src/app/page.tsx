'use client';

import styled from 'styled-components';
import PageLayout from '@/components/PageLayout';
import CelebrityQuotesSection from './_components/CelebrityQuotesSection';
import HeroSection from './_components/HeroSection';
import TeaserSection from './_components/TeaserSection';
import InterviewsSection from './_components/InterviewsSection';
import AuthorSection from './_components/AuthorSection';

const MOBILE_BREAKPOINT = 768;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    gap: 56px;
  }
`;

export default function Home() {
  return (
    <PageLayout>
      <ContentWrapper>
        <HeroSection />
        <TeaserSection />
        <CelebrityQuotesSection />
        <InterviewsSection />
        <AuthorSection />
      </ContentWrapper>
    </PageLayout>
  );
}
