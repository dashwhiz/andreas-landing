'use client';

import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
`;

const NavContainer = styled.nav`
  width: 100%;
  max-width: 1146px;
  padding: 14px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${AppColors.brand.neutral.neutralBlack};
  border-radius: 14px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 12px 20px;
  }
`;

const Logo = styled(Link)`
  font-size: ${AppFontSizes.lg};
  font-weight: 700;
  color: ${AppColors.white};
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const AmazonButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

export default function Header() {
  const { t } = useTranslations();

  return (
    <HeaderWrapper>
      <NavContainer>
        <Logo href="/">{t('header.logo_text')}</Logo>
        <AmazonButton href="#" target="_blank" rel="noopener noreferrer" aria-label="Buy on Amazon">
          <Image
            src="/amazon-logo.png"
            alt="Buy on Amazon"
            width={32}
            height={32}
          />
        </AmazonButton>
      </NavContainer>
    </HeaderWrapper>
  );
}
