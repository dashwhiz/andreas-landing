'use client';

import styled from 'styled-components';
import Image from 'next/image';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import fasScreenshot from '../../../public/images/frankfurter_allgemeine_sonntagszeitung.jpg';
import campusScreenshot from '../../../public/images/podcast_banner.png';

const MOBILE_BREAKPOINT = 768;

const interviewImages: Record<string, typeof fasScreenshot> = {
  'frankfurter_allgemeine_sonntagszeitung.jpg': fasScreenshot,
  'campus_podcast.png': campusScreenshot,
  'podcast_banner.png': campusScreenshot,
};

interface InterviewItem {
  id: string;
  image: string;
  logo?: string;
  title: string;
  text: string;
  link: string;
  upcoming?: boolean;
  date?: string;
}

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: ${AppFontSizes['2xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 8px 0;
  text-align: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes.xl};
  }
`;

const SectionDescription = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[30]};
  text-align: center;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const Grid = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 8px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.a`
  width: 230px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 195px;
  }
`;

const StaticCard = styled.div`
  width: 230px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 14px;
  overflow: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 195px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background: ${AppColors.brand.neutral[90]};

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const UpcomingPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: ${AppColors.brand.neutral[90]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UpcomingLabel = styled.span`
  font-size: ${AppFontSizes.sm};
  font-weight: 700;
  color: ${AppColors.brand.neutral[30]};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: ${AppFontSizes.sm};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0;
  line-height: 1.4;
`;

const CardText = styled.p`
  font-size: ${AppFontSizes.xs};
  color: ${AppColors.brand.neutral[30]};
  line-height: 1.5;
  margin: 0;
`;

const CardDate = styled.p`
  font-size: ${AppFontSizes.xs};
  color: ${AppColors.brand.neutral[50]};
  margin: 0;
  line-height: 1.4;
`;

const CardLogo = styled.img`
  max-height: 20px;
  max-width: 100px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.45;
  align-self: flex-end;
  margin-top: auto;
`;

export default function InterviewsSection() {
  const { t, tObject } = useTranslations();
  const items = tObject<InterviewItem[]>('home_interviews.items') || [];

  if (items.length === 0) return null;

  return (
    <Section>
      <SectionTitle>{t('home_interviews.title')}</SectionTitle>
      <SectionDescription>{t('home_interviews.description')}</SectionDescription>
      <Grid>
        {items.map((item) => {
          const cardContent = (
            <>
              {item.upcoming ? (
                <UpcomingPlaceholder>
                  <UpcomingLabel>demnächst</UpcomingLabel>
                </UpcomingPlaceholder>
              ) : (
                <ImageWrapper>
                  {interviewImages[item.image] && (
                    <Image
                      src={interviewImages[item.image]}
                      alt={item.title}
                      sizes="230px"
                      style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                  )}
                </ImageWrapper>
              )}
              <Content>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.text}</CardText>
                {item.date && <CardDate>{item.date}</CardDate>}
                {item.logo && (
                  <CardLogo src={`/images/${item.logo}`} alt={item.title} />
                )}
              </Content>
            </>
          );

          if (item.upcoming || !item.link) {
            return <StaticCard key={item.id}>{cardContent}</StaticCard>;
          }

          return (
            <Card
              key={item.id}
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {cardContent}
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
}
