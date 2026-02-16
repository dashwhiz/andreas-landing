'use client';

import styled from 'styled-components';
import Link from 'next/link';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;

const FooterWrapper = styled.footer`
  width: 100%;
  background: ${AppColors.brand.neutral.neutralBlack};
  color: ${AppColors.white};
  margin-top: auto;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1146px;
  margin: 0 auto;
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 32px 16px;
    gap: 20px;
  }
`;

const LogoLink = styled(Link)`
  font-size: ${AppFontSizes.xl};
  font-weight: 700;
  color: ${AppColors.white};
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    gap: 20px;
  }
`;

const FooterLink = styled(Link)`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[50]};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${AppColors.white};
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 400px;
  height: 1px;
  background: ${AppColors.brand.neutral[20]};
`;

const Copyright = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[40]};
  margin: 0;
  text-align: center;
`;

export default function Footer() {
  const { t } = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <LogoLink href="/">{t('header.logo_text')}</LogoLink>
        <FooterLinks>
          <FooterLink href="/zinseszins">{t('header.navigation.rendite')}</FooterLink>
          <FooterLink href="/gmp">{t('header.navigation.gmp')}</FooterLink>
          <FooterLink href="/rentenprognose">{t('header.navigation.vermoegen')}</FooterLink>
          <FooterLink href="/ki">{t('header.navigation.ki')}</FooterLink>
        </FooterLinks>
        <FooterLinks>
          <FooterLink href="/impressum">{t('footer.impressum')}</FooterLink>
          <FooterLink href="/datenschutz">{t('footer.datenschutz')}</FooterLink>
        </FooterLinks>
        <Divider />
        <Copyright>
          © {currentYear} {t('header.logo_text')}. {t('footer.copyright')}
        </Copyright>
      </FooterContent>
    </FooterWrapper>
  );
}
