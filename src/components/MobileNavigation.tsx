'use client';

import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import AppColors from '@/constants/AppColors';
import { useTranslations } from '@/contexts/TranslationProvider';
import amazonLogo from '../../public/images/amazon-logo.png';
import seasnIcon from '../../public/images/seasn-icon.svg';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MobileNavContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${AppColors.brand.neutral.neutralBlack};
  border-radius: 14px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  animation: ${slideDown} 0.3s ease-out forwards;
`;

const AnimatedList = styled.ul`
  list-style: none;
  padding: 16px 24px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: ${fadeInUp} 0.3s ease-out forwards;
`;

const MobilePrimaryItem = styled.li`
  font-size: 18px;
  font-weight: 600;
  color: ${AppColors.white};

  a {
    color: inherit;
    text-decoration: none;
    display: block;
    padding: 12px 0;
    cursor: pointer;
  }
`;

const MobileButtonWrapper = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const AmazonLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${AppColors.white};
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
`;

interface MobileNavigationProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export default function MobileNavigation({ isOpen, closeMenu }: MobileNavigationProps) {
  const { t } = useTranslations();

  if (!isOpen) return null;

  const handleLinkClick = () => {
    setTimeout(() => {
      closeMenu();
    }, 100);
  };

  return (
    <MobileNavContainer>
      <AnimatedList>
        <MobilePrimaryItem>
          <Link href="/rendite" onClick={handleLinkClick}>
            {t('header.navigation.rendite')}
          </Link>
        </MobilePrimaryItem>
        <MobilePrimaryItem>
          <Link href="/gmp" onClick={handleLinkClick}>
            {t('header.navigation.gmp')}
          </Link>
        </MobilePrimaryItem>
        <MobilePrimaryItem>
          <Link href="/vermoegen" onClick={handleLinkClick}>
            {t('header.navigation.vermoegen')}
          </Link>
        </MobilePrimaryItem>
        <MobilePrimaryItem>
          <Link href="/ki" onClick={handleLinkClick}>
            {t('header.navigation.ki')}
          </Link>
        </MobilePrimaryItem>
        <MobileButtonWrapper>
          <AmazonLink href="https://amzn.eu/d/01rqUUpb" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
            <Image
              src={amazonLogo}
              alt="Amazon"
              width={24}
              height={24}
            />
            {t('home.book.cta_button')}
          </AmazonLink>
          <AmazonLink href="https://seasn.de" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
            <Image
              src={seasnIcon}
              alt="Seasn"
              width={24}
              height={24}
              unoptimized
            />
            Seasn
          </AmazonLink>
        </MobileButtonWrapper>
      </AnimatedList>
    </MobileNavContainer>
  );
}
