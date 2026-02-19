'use client';

import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import AppColors from '@/constants/AppColors';

const MOBILE_BREAKPOINT = 768;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${AppColors.white};
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1146px;
  margin: 0 auto;
  padding: 136px 36px 80px 36px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 124px 16px 60px 16px;
  }
`;

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </PageContainer>
  );
}
