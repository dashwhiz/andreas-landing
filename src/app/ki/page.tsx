'use client';

import { useState } from 'react';
import styled from 'styled-components';
import PageLayout from '@/components/PageLayout';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;

const PageTitle = styled.h1`
  font-size: ${AppFontSizes['4xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 16px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes['3xl']};
  }
`;

const PageDescription = styled.p`
  font-size: ${AppFontSizes.md};
  color: ${AppColors.brand.neutral[20]};
  line-height: 1.6;
  margin: 0 0 48px 0;
  max-width: 900px;
`;

const SectionWrapper = styled.div<{ $bg: string }>`
  background: ${(props) => props.$bg};
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 20px 16px;
    border-radius: 16px;
  }
`;

const SectionHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const SectionHeading = styled.h2`
  font-size: ${AppFontSizes['2xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes.xl};
  }
`;

const CountBadge = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: 14px;
  background: ${(props) => props.$bg};
  color: ${(props) => props.$color};
  font-size: ${AppFontSizes.xs};
  font-weight: 700;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Card = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 14px;
  overflow: hidden;
`;

const CardHeader = styled.button`
  width: 100%;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${AppColors.white};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const NumberBadge = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${(props) => props.$bg};
  color: ${(props) => props.$color};
  font-size: ${AppFontSizes.xs};
  font-weight: 800;
  flex-shrink: 0;
`;

const CardTitle = styled.span`
  font-size: ${AppFontSizes.base};
  font-weight: 600;
  color: ${AppColors.brand.neutral.neutralBlack};
  text-align: left;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? '180deg' : '0deg')});
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
    stroke: ${AppColors.brand.neutral[40]};
  }
`;

const ContentContainer = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${(props) => (props.$isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease;
`;

const ContentInner = styled.div`
  overflow: hidden;
`;

const ContentBody = styled.div`
  padding: 0 20px 20px 20px;
`;

const ProviderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const ProviderTabs = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ProviderTab = styled.button<{ $isActive: boolean; $color: string }>`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.$isActive ? props.$color : AppColors.brand.neutral[70])};
  background: ${(props) => (props.$isActive ? props.$color : AppColors.white)};
  color: ${(props) =>
    props.$isActive ? AppColors.white : AppColors.brand.neutral[20]};
  font-size: ${AppFontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => props.$color};
  }
`;

const AnswerContent = styled.div`
  background: ${AppColors.brand.neutral[100]};
  border-radius: 10px;
  padding: 16px;
`;

const AnswerText = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[10]};
  line-height: 1.7;
  margin: 0;
  white-space: pre-wrap;
`;

const QuestionText = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[10]};
  line-height: 1.6;
  margin: 0 0 16px 0;
  font-weight: 500;
`;

const PromptText = styled.div`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[10]};
  line-height: 1.7;
  background: ${AppColors.brand.neutral[100]};
  border-radius: 12px;
  padding: 16px;
  white-space: pre-wrap;
  user-select: text;
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${(props) =>
    props.$copied ? AppColors.brand.green[50] : AppColors.brand.neutral[70]};
  background: ${(props) =>
    props.$copied ? AppColors.brand.green[90] : AppColors.white};
  color: ${(props) =>
    props.$copied ? AppColors.brand.green[30] : AppColors.brand.neutral[30]};
  font-size: ${AppFontSizes.xs};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${(props) =>
      props.$copied ? AppColors.brand.green[90] : AppColors.brand.neutral[100]};
  }
`;

const CopyButtonLarge = styled(CopyButton)`
  margin-top: 12px;
  padding: 8px 16px;
  font-size: ${AppFontSizes.sm};
`;

type Provider = 'chatgpt' | 'gemini' | 'perplexity';

const providerColors: Record<Provider, string> = {
  chatgpt: '#10a37f',
  gemini: '#4285f4',
  perplexity: '#1fb8cd',
};

const QUIZ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11'] as const;
const COPY_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'] as const;
const PROVIDERS: Provider[] = ['chatgpt', 'gemini', 'perplexity'];

// Section theme colors
const quizTheme = {
  sectionBg: AppColors.brand.blue[90],
  accent: AppColors.brand.blue[50],
  badgeBg: AppColors.brand.blue[50],
  badgeColor: AppColors.white,
  numberBg: AppColors.brand.blue[90],
  numberColor: AppColors.brand.blue[30],
};

const copyTheme = {
  sectionBg: AppColors.brand.orange[90],
  accent: AppColors.brand.orange[60],
  badgeBg: AppColors.brand.orange[60],
  badgeColor: AppColors.white,
  numberBg: AppColors.brand.orange[90],
  numberColor: AppColors.brand.orange[30],
};

export default function KiPage() {
  const { t } = useTranslations();
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
  const [selectedProviders, setSelectedProviders] = useState<Record<string, Provider>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!selectedProviders[id]) {
      setSelectedProviders((prev) => ({ ...prev, [id]: 'chatgpt' }));
    }
  };

  const selectProvider = (id: string, provider: Provider) => {
    setSelectedProviders((prev) => ({ ...prev, [id]: provider }));
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <PageLayout>
      <PageTitle>{t('ki_page.title')}</PageTitle>
      <PageDescription>{t('ki_page.description')}</PageDescription>

      <SectionWrapper $bg={quizTheme.sectionBg}>
        <SectionHeaderRow>
          <SectionHeading>{t('ki_page.quiz_section_title')}</SectionHeading>
          <CountBadge $bg={quizTheme.badgeBg} $color={quizTheme.badgeColor}>
            {QUIZ_KEYS.length}
          </CountBadge>
        </SectionHeaderRow>
        <CardList>
          {QUIZ_KEYS.map((key, index) => {
            const isOpen = openCards[key] || false;
            const provider = selectedProviders[key] || 'chatgpt';
            const question = t(`ki_page.quiz_prompts.${key}.question`);

            return (
              <Card key={key}>
                <CardHeader onClick={() => toggleCard(key)} aria-expanded={isOpen}>
                  <NumberBadge $bg={quizTheme.numberBg} $color={quizTheme.numberColor}>
                    Q{index + 1}
                  </NumberBadge>
                  <CardTitle>{question}</CardTitle>
                  <ChevronIcon $isOpen={isOpen}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </ChevronIcon>
                </CardHeader>

                <ContentContainer $isOpen={isOpen}>
                  <ContentInner>
                    <ContentBody>
                      <QuestionText>{question}</QuestionText>
                      <ProviderRow>
                        <ProviderTabs>
                          {PROVIDERS.map((p) => (
                            <ProviderTab
                              key={p}
                              $isActive={provider === p}
                              $color={providerColors[p]}
                              onClick={() => selectProvider(key, p)}
                            >
                              {t(`ki_page.providers.${p}`)}
                            </ProviderTab>
                          ))}
                        </ProviderTabs>
                        <CopyButton
                          $copied={copiedId === key}
                          onClick={() => handleCopy(question, key)}
                        >
                          {copiedId === key ? t('ki_page.copied') : t('ki_page.copy_button')}
                        </CopyButton>
                      </ProviderRow>
                      <AnswerContent>
                        <AnswerText>
                          {t(`ki_page.quiz_prompts.${key}.answers.${provider}`)}
                        </AnswerText>
                      </AnswerContent>
                    </ContentBody>
                  </ContentInner>
                </ContentContainer>
              </Card>
            );
          })}
        </CardList>
      </SectionWrapper>

      <SectionWrapper $bg={copyTheme.sectionBg}>
        <SectionHeaderRow>
          <SectionHeading>{t('ki_page.copy_section_title')}</SectionHeading>
          <CountBadge $bg={copyTheme.badgeBg} $color={copyTheme.badgeColor}>
            {COPY_KEYS.length}
          </CountBadge>
        </SectionHeaderRow>
        <CardList>
          {COPY_KEYS.map((key, index) => {
            const isOpen = openCards[`copy_${key}`] || false;
            const title = t(`ki_page.copy_prompts.${key}.title`);
            const prompt = t(`ki_page.copy_prompts.${key}.prompt`);
            const copyId = `copy_${key}`;

            return (
              <Card key={key}>
                <CardHeader onClick={() => toggleCard(copyId)} aria-expanded={isOpen}>
                  <NumberBadge $bg={copyTheme.numberBg} $color={copyTheme.numberColor}>
                    P{index + 1}
                  </NumberBadge>
                  <CardTitle>{title}</CardTitle>
                  <ChevronIcon $isOpen={isOpen}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </ChevronIcon>
                </CardHeader>

                <ContentContainer $isOpen={isOpen}>
                  <ContentInner>
                    <ContentBody>
                      <PromptText>{prompt}</PromptText>
                      <CopyButtonLarge
                        $copied={copiedId === copyId}
                        onClick={() => handleCopy(prompt, copyId)}
                      >
                        {copiedId === copyId ? t('ki_page.copied') : t('ki_page.copy_button')}
                      </CopyButtonLarge>
                    </ContentBody>
                  </ContentInner>
                </ContentContainer>
              </Card>
            );
          })}
        </CardList>
      </SectionWrapper>
    </PageLayout>
  );
}
