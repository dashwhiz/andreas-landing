'use client';

import styled from 'styled-components';
import Image from 'next/image';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import fasScreenshot from '../../../public/images/frankfurter_allgemeine_sonntagszeitung.jpg';
import campusScreenshot from '../../../public/images/campus_podcast.png';

const MOBILE_BREAKPOINT = 768;

const interviewImages: Record<string, typeof fasScreenshot> = {
  'frankfurter_allgemeine_sonntagszeitung.jpg': fasScreenshot,
  'campus_podcast.png': campusScreenshot,
};

interface InterviewItem {
  id: string;
  image: string;
  title: string;
  text: string;
  link: string;
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
  width: 320px;
  flex-shrink: 0;
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
    width: 280px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: ${AppColors.brand.neutral[90]};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
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

export default function InterviewsSection() {
  const { t, tObject } = useTranslations();
  const items = tObject<InterviewItem[]>('home_interviews.items') || [];

  if (items.length === 0) return null;

  return (
    <Section>
      <SectionTitle>{t('home_interviews.title')}</SectionTitle>
      <SectionDescription>{t('home_interviews.description')}</SectionDescription>
      <Grid>
        {items.map((item) => (
          <Card
            key={item.id}
            href={item.link}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ImageWrapper>
              {interviewImages[item.image] && (
                <Image
                  src={interviewImages[item.image]}
                  alt={item.title}
                  width={640}
                  height={400}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </ImageWrapper>
            <Content>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </Content>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
