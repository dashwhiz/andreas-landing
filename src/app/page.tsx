'use client';

import styled from 'styled-components';
import Image from 'next/image';
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

  img {
    display: block;
    width: 220px;
    height: auto;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    img {
      width: 180px;
    }
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

const LeseprobeInner = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
`;

const LeseprobeIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${AppColors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 28px;
    height: 28px;
    stroke: ${AppColors.brand.green[20]};
  }
`;

const LeseprobeContent = styled.div`
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
  color: ${AppColors.brand.neutral[20]};
  line-height: 1.5;
  margin: 0;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[70]};
  border-radius: 12px;
  color: ${AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${AppColors.brand.neutral[50]};
    background: ${AppColors.brand.neutral[90]};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`;

const TeaserSection = styled.section`
  width: 100%;
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

const TeaserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const TeaserCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
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

export default function Home() {
  const { t } = useTranslations();

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
                <Image src={seasnLogo} alt='Seasn' width={115} height={30} />
              </SeasnButton>
            </ButtonRow>
          </HeroContent>
          <BookCoverWrapper>
            <Image
              src={bookCover}
              alt={t('home.book.alt_text')}
              width={220}
              height={320}
              priority
              style={{ width: '220px', height: 'auto' }}
            />
          </BookCoverWrapper>
        </HeroSection>

        <ColoredSection $bgColor={AppColors.brand.green[90]}>
          <LeseprobeInner>
            <LeseprobeIcon>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </LeseprobeIcon>
            <LeseprobeContent>
              <LeseprobeTitle>{t('home.leseprobe.title')}</LeseprobeTitle>
              <LeseprobeDescription>{t('home.leseprobe.description')}</LeseprobeDescription>
            </LeseprobeContent>
            <DownloadButton
              href="/Hackethal,_52062_Dein_Financial_Lifestyle_Code_Einleitung.pdf"
              download
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('home.leseprobe.download_button')}
            </DownloadButton>
          </LeseprobeInner>
        </ColoredSection>

        <TeaserSection>
          <TeaserSectionTitle>{t('home.teaser.title')}</TeaserSectionTitle>
          <TeaserSectionDescription>{t('home.teaser.description')}</TeaserSectionDescription>
          <TeaserGrid>
            <TeaserCard>
              <Image src={teaserStart} alt="Start" width={400} height={400} style={{ width: '100%', height: 'auto' }} />
            </TeaserCard>
            <TeaserCard>
              <Image src={teaserCode1} alt="Code I" width={400} height={400} style={{ width: '100%', height: 'auto' }} />
            </TeaserCard>
            <TeaserCard>
              <Image src={teaserCode2} alt="Code II" width={400} height={400} style={{ width: '100%', height: 'auto' }} />
            </TeaserCard>
            <TeaserCard>
              <Image src={teaserCode3} alt="Code III" width={400} height={400} style={{ width: '100%', height: 'auto' }} />
            </TeaserCard>
            <TeaserCard>
              <Image src={teaserCode4} alt="Code IV" width={400} height={400} style={{ width: '100%', height: 'auto' }} />
            </TeaserCard>
            <TeaserCard>
              <Image src={teaserCode5} alt="Code V" width={400} height={400} style={{ width: '100%', height: 'auto' }} />
            </TeaserCard>
            <TeaserCard>
              <Image src={teaserBuch} alt="Buch" width={400} height={400} style={{ width: '100%', height: 'auto' }} />
            </TeaserCard>
          </TeaserGrid>
        </TeaserSection>

        <ColoredSection $bgColor={AppColors.brand.blue[90]}>
          <MarktportfolioSection />
        </ColoredSection>

        <KIAntwortenSection />
      </ContentWrapper>
    </PageLayout>
  );
}
