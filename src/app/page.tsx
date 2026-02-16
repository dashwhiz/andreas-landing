'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import CelebrityQuotesSection from '@/components/CelebrityQuotesSection';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import amazonLogo from '../../public/images/amazon-logo.png';
import bookCover from '../../public/images/book_cover.png';
import authorPhoto from '../../public/images/andreas_hackethal.jpeg';
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
  border: none;
  border-radius: 12px;
  background: ${AppColors.brand.green[55]};
  color: ${AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${AppColors.brand.green[70]};
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

const bounceRight = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
`;

const ScrollArrow = styled.button<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${AppColors.brand.neutral.neutralBlack};
  color: ${AppColors.white};
  cursor: pointer;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  animation: ${bounceRight} 1.5s ease-in-out infinite;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;

  svg {
    width: 18px;
    height: 18px;
  }
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

const LightboxArrow = styled.button<{ $direction: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'left' ? 'left: 16px;' : 'right: 16px;')}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 20px;
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

const LightboxDots = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10000;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => ($active ? 'white' : 'rgba(255, 255, 255, 0.4)')};
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease;
`;

const AuthorSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 32px;
  background: transparent;
  border-radius: 20px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
    text-align: center;
    padding: 24px;
    gap: 20px;
  }
`;

const AuthorPhoto = styled.div`
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

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    align-items: center;
  }
`;

const AuthorName = styled.h3`
  font-size: ${AppFontSizes.lg};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0;
`;

const AuthorBio = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[20]};
  line-height: 1.6;
  margin: 0;
`;

const LinkedInLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #0A66C2;
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

const AMAZON_URL = 'https://amzn.eu/d/01rqUUpb';

const teaserImages = [
  { src: teaserStart, alt: 'Start' },
  { src: teaserCode1, alt: 'Code I' },
  { src: teaserCode2, alt: 'Code II' },
  { src: teaserCode3, alt: 'Code III' },
  { src: teaserCode4, alt: 'Code IV' },
  { src: teaserCode5, alt: 'Code V' },
  { src: teaserBuch, alt: 'Buch', link: AMAZON_URL },
];

const SWIPE_THRESHOLD = 50;

export default function Home() {
  const { t } = useTranslations();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showScrollFade, setShowScrollFade] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % teaserImages.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + teaserImages.length) % teaserImages.length : null
    );
  }, []);

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
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

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
                {teaserImages.map((img, index) => (
                  <TeaserCard key={img.alt} onClick={() => {
                    if (img.link) {
                      window.open(img.link, '_blank', 'noopener,noreferrer');
                    } else {
                      setLightboxIndex(index);
                    }
                  }}>
                    <Image src={img.src} alt={img.alt} width={400} height={400} style={{ width: '100%', height: 'auto' }} />
                  </TeaserCard>
                ))}
              </TeaserTrack>
            </TeaserScroll>
            <ScrollArrow
              $visible={showScrollFade}
              onClick={() => {
                scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </ScrollArrow>
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

        <CelebrityQuotesSection />

        <AuthorSection>
          <AuthorPhoto>
            <Image
              src={authorPhoto}
              alt={t('autor.alt_text')}
              width={160}
              height={213}
              style={{ width: '160px', height: 'auto' }}
            />
          </AuthorPhoto>
          <AuthorInfo>
            <AuthorName>{t('autor.title')}</AuthorName>
            <AuthorBio>{t('autor.bio')}</AuthorBio>
            <LinkedInLink
              href={t('autor.linkedin_url')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {t('autor.linkedin_label')}
            </LinkedInLink>
          </AuthorInfo>
        </AuthorSection>
      </ContentWrapper>

      {lightboxIndex !== null && (
        <LightboxOverlay
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <LightboxClose onClick={closeLightbox} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </LightboxClose>
          <LightboxArrow $direction="left" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </LightboxArrow>
          <LightboxImage onClick={(e) => {
            e.stopPropagation();
            const currentImg = teaserImages[lightboxIndex];
            if (currentImg.link) {
              window.open(currentImg.link, '_blank', 'noopener,noreferrer');
            }
          }} style={{ cursor: teaserImages[lightboxIndex].link ? 'pointer' : 'default' }}>
            <Image
              src={teaserImages[lightboxIndex].src}
              alt={teaserImages[lightboxIndex].alt}
              width={1200}
              height={1200}
              style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh' }}
            />
          </LightboxImage>
          <LightboxArrow $direction="right" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </LightboxArrow>
          <LightboxDots>
            {teaserImages.map((_, i) => (
              <Dot
                key={i}
                $active={i === lightboxIndex}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
              />
            ))}
          </LightboxDots>
        </LightboxOverlay>
      )}
    </PageLayout>
  );
}
