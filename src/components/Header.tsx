'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import MobileNavigation from './MobileNavigation';
import amazonLogo from '../../public/images/amazon-logo.png';
import seasnIcon from '../../public/images/seasn-icon.svg';

const MOBILE_BREAKPOINT = 900;

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: transparent;
`;

const NavWithSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1146px;
  position: relative;
`;

const NavContainer = styled.nav`
  width: 100%;
  padding: 8px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${AppColors.brand.neutral.neutralBlack};
  border-radius: 14px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 14px 20px;
  }
`;

const Logo = styled(Link)`
  font-size: ${AppFontSizes.lg};
  font-weight: 700;
  color: ${AppColors.white};
  text-decoration: none;
  transition: opacity 0.2s ease;
  padding: 14px 0;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 0;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

const NavItem = styled.li`
  font-weight: 600;
  font-size: ${AppFontSizes.base};
  color: ${AppColors.white};
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  a {
    color: inherit;
    text-decoration: none;
    display: block;
    padding: 8px 12px;
    cursor: pointer;
  }
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

const AmazonButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Hamburger = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    display: flex;
  }

  div {
    width: 22px;
    height: 2px;
    background: white;
    margin: 3px 0;
    transition: all 0.3s ease;
    border-radius: 1px;
  }

  .bar1 {
    transform: ${({ $open }) =>
      $open ? 'rotate(45deg) translate(4px, 4px)' : 'none'};
  }

  .bar2 {
    transform: ${({ $open }) =>
      $open ? 'rotate(-45deg) translate(4px, -4px)' : 'none'};
  }
`;

export default function Header() {
  const { t } = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <HeaderWrapper>
      <NavWithSubMenu ref={navRef}>
        <NavContainer>
          <Logo href='/' onClick={handleLogoClick}>
            {t('header.logo_text')}
          </Logo>

          <NavLinks>
            <NavItem>
              <Link href='/rendite'>
                {t('header.navigation.rendite')}
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/gmp'>
                {t('header.navigation.gmp')}
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/vermoegen'>
                {t('header.navigation.vermoegen')}
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/ki'>
                {t('header.navigation.ki')}
              </Link>
            </NavItem>
          </NavLinks>

          <Hamburger
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            $open={mobileMenuOpen}
            aria-label='Menu'
          >
            <div className='bar1' />
            <div className='bar2' />
          </Hamburger>

          <RightArea>
            <AmazonButton
              href='https://amzn.eu/d/01rqUUpb'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Buy on Amazon'
              title={t('header.amazon_tooltip')}
            >
              <Image
                src={amazonLogo}
                alt='Buy on Amazon'
                width={28}
                height={28}
              />
            </AmazonButton>
            <AmazonButton
              href='https://seasn.de'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Seasn'
              title={t('header.seasn_tooltip')}
            >
              <Image
                src={seasnIcon}
                alt='Seasn'
                width={28}
                height={28}
                unoptimized
              />
            </AmazonButton>
          </RightArea>
        </NavContainer>

        <MobileNavigation
          isOpen={mobileMenuOpen}
          closeMenu={() => setMobileMenuOpen(false)}
        />
      </NavWithSubMenu>
    </HeaderWrapper>
  );
}
