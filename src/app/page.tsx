'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import PageLayout from '@/components/PageLayout';
import MarktportfolioSection from '@/components/MarktportfolioSection';
import KIAntwortenSection from '@/components/KIAntwortenSection';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import amazonLogo from '../../public/images/amazon-logo.png';
import bookCover from '../../public/images/book_cover.png';
import seasnLogo from '../../public/images/seasn-logo.svg';
import teaserStart from '../../public/images/teaser-start.jpeg';
import teaserCode1 from '../../public/images/teaser-code1.jpeg';
import teaserCode2 from '../../public/images/teaser-code2.jpeg';
import teaserCode3 from '../../public/images/teaser-code3.jpeg';
import teaserCode4 from '../../public/images/teaser-code4.jpeg';
import teaserCode5 from '../../public/images/teaser-code5.jpeg';
import teaserBuch from '../../public/images/teaser-buch.jpeg';

const MOBILE_BREAKPOINT = 768;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    gap: 48px;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
  width: 100%;
  max-width: 900px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column-reverse;
    gap: 32px;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    align-items: center;
  }
`;

const BookCoverWrapper = styled.div`
  flex-shrink: 0;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  width: 280px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 220px;
  }
`;

const BookTitle = styled.h1`
  font-size: ${AppFontSizes['4xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 16px 0;
  line-height: 1.2;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes['3xl']};
  }
`;

const BookDescription = styled.p`
  font-size: ${AppFontSizes.md};
  color: ${AppColors.brand.neutral[30]};
  line-height: 1.7;
  margin: 0 0 32px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes.base};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    justify-content: center;
  }
`;

const AmazonButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 28px;
  background: ${AppColors.brand.neutral.neutralBlack};
  color: ${AppColors.white};
  font-size: ${AppFontSizes.base};
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${AppColors.brand.neutral[10]};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 12px 24px;
    gap: 10px;
    font-size: ${AppFontSizes.sm};
  }
`;

const SeasnButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${AppColors.white};
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${AppColors.brand.neutral[50]};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 12px 24px;
  }
`;

const LeseprobeFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid ${AppColors.brand.neutral[80]};
  width: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
`;

const LeseprobeText = styled.div`
  flex: 1;
`;

const LeseprobeTitle = styled.h3`
  font-size: ${AppFontSizes.base};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 4px 0;
`;

const LeseprobeDescription = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[30]};
  line-height: 1.5;
  margin: 0;
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  border-radius: 12px;
  color: ${AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${AppColors.brand.neutral[40]};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
  }
`;

const TeaserSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeaserSectionTitle = styled.h2`
  font-size: ${AppFontSizes['2xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 8px 0;
  text-align: center;
`;

const TeaserSectionDescription = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[30]};
  text-align: center;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const TeaserScrollWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const TeaserScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollFade = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  background: linear-gradient(to right, transparent, ${AppColors.white});
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const TeaserTrack = styled.div`
  display: flex;
  gap: 16px;
  width: max-content;
  padding: 8px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    gap: 12px;
  }
`;

const TeaserCard = styled.div`
  width: 220px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 180px;
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const LightboxImage = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;

  img {
    display: block;
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  }
`;

const LightboxClose = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  z-index: 10000;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ColoredSection = styled.div<{ $bgColor: string }>`
  width: 100%;
  background: ${(props) => props.$bgColor};
  border-radius: 24px;
  padding: 48px 40px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 32px 20px;
    border-radius: 20px;
  }
`;

const teaserImages = [
  { src: teaserStart, alt: 'Start' },
  { src: teaserCode1, alt: 'Code I' },
  { src: teaserCode2, alt: 'Code II' },
  { src: teaserCode3, alt: 'Code III' },
  { src: teaserCode4, alt: 'Code IV' },
  { src: teaserCode5, alt: 'Code V' },
  { src: teaserBuch, alt: 'Buch' },
];

export default function Home() {
  const { t } = useTranslations();
  const [lightboxImage, setLightboxImage] = useState<{ src: StaticImageData; alt: string } | null>(null);
  const [showScrollFade, setShowScrollFade] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      setShowScrollFade(!atEnd);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxImage, closeLightbox]);

  return (
    <PageLayout>
      <ContentWrapper>
        <HeroSection>
          <HeroContent>
            <BookTitle>{t('home.welcome.title')}</BookTitle>
            <BookDescription>{t('home.welcome.description')}</BookDescription>
            <ButtonRow>
              <AmazonButton
                href='https://amzn.eu/d/01rqUUpb'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image src={amazonLogo} alt='Amazon' width={28} height={28} />
                {t('home.book.cta_button')}
              </AmazonButton>
              <SeasnButton
                href='https://seasn.de'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image src={seasnLogo} alt='Seasn' width={115} height={30} unoptimized style={{ width: '115px', height: 'auto' }} />
              </SeasnButton>
            </ButtonRow>
          </HeroContent>
          <BookCoverWrapper>
            <Image
              src={bookCover}
              alt={t('home.book.alt_text')}
              width={280}
              height={400}
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </BookCoverWrapper>
        </HeroSection>

        <TeaserSection>
          <TeaserSectionTitle>{t('home.teaser.title')}</TeaserSectionTitle>
          <TeaserSectionDescription>{t('home.teaser.description')}</TeaserSectionDescription>
          <TeaserScrollWrapper>
            <TeaserScroll ref={scrollRef}>
              <TeaserTrack>
                {teaserImages.map((img) => (
                  <TeaserCard key={img.alt} onClick={() => setLightboxImage(img)}>
                    <Image src={img.src} alt={img.alt} width={400} height={400} style={{ width: '100%', height: 'auto' }} />
                  </TeaserCard>
                ))}
              </TeaserTrack>
            </TeaserScroll>
            <ScrollFade $visible={showScrollFade} />
          </TeaserScrollWrapper>
          <LeseprobeFooter>
            <LeseprobeText>
              <LeseprobeTitle>{t('home.leseprobe.title')}</LeseprobeTitle>
              <LeseprobeDescription>{t('home.leseprobe.description')}</LeseprobeDescription>
            </LeseprobeText>
            <DownloadLink
              href="/Hackethal,_52062_Dein_Financial_Lifestyle_Code_Einleitung.pdf"
              download
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('home.leseprobe.download_button')}
            </DownloadLink>
          </LeseprobeFooter>
        </TeaserSection>

        <ColoredSection $bgColor={AppColors.brand.blue[90]}>
          <MarktportfolioSection />
        </ColoredSection>

        <KIAntwortenSection />
      </ContentWrapper>

      {lightboxImage && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxClose onClick={closeLightbox} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </LightboxClose>
          <LightboxImage onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1200}
              height={1200}
              style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh' }}
            />
          </LightboxImage>
        </LightboxOverlay>
      )}
    </PageLayout>
  );
}
