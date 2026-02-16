'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;

const Section = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: ${AppFontSizes['2xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 12px 0;
  text-align: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-size: ${AppFontSizes.xl};
  }
`;

const SectionDescription = styled.p`
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral[30]};
  line-height: 1.6;
  margin: 0 0 32px 0;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const QASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QuestionCard = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 14px;
  overflow: hidden;
`;

const QuestionHeader = styled.button`
  width: 100%;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: ${AppColors.white};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const QuestionText = styled.span`
  font-size: ${AppFontSizes.base};
  font-weight: 600;
  color: ${AppColors.brand.neutral.neutralBlack};
  text-align: left;
  flex: 1;
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

const AnswersContainer = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${(props) => (props.$isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease;
`;

const AnswersInner = styled.div`
  overflow: hidden;
`;

const AnswersContent = styled.div`
  padding: 0 20px 20px 20px;
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

const CopyPromptButton = styled.button<{ $copied: boolean }>`
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

const ProviderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
`;

const SeeMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const SeeMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${AppColors.white};
  color: ${AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${AppColors.brand.neutral[100]};
    border-color: ${AppColors.brand.neutral[50]};
  }
`;

interface Question {
  id: string;
  question: string;
  answers: {
    chatgpt: string;
    gemini: string;
    perplexity: string;
  };
}

type Provider = 'chatgpt' | 'gemini' | 'perplexity';

const providerColors: Record<Provider, string> = {
  chatgpt: '#10a37f', // OpenAI green
  gemini: '#4285f4', // Google blue
  perplexity: '#1fb8cd', // Perplexity teal
};

export default function KIAntwortenSection() {
  const { t, tObject } = useTranslations();
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});
  const [selectedProviders, setSelectedProviders] = useState<Record<string, Provider>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const questions = tObject<Question[]>('ki_antworten.questions');
  const providers: Provider[] = ['chatgpt', 'gemini', 'perplexity'];

  const toggleQuestion = (id: string) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (!selectedProviders[id]) {
      setSelectedProviders((prev) => ({
        ...prev,
        [id]: 'chatgpt',
      }));
    }
  };

  const selectProvider = (questionId: string, provider: Provider) => {
    setSelectedProviders((prev) => ({
      ...prev,
      [questionId]: provider,
    }));
  };

  const handleCopyPrompt = async (question: string, id: string) => {
    await navigator.clipboard.writeText(question);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Section>
      <SectionTitle>{t('ki_antworten.title')}</SectionTitle>
      <SectionDescription>{t('ki_antworten.description')}</SectionDescription>

      <QASection>
        {questions.map((q) => {
          const isOpen = openQuestions[q.id] || false;
          const selectedProvider = selectedProviders[q.id] || 'chatgpt';

          return (
            <QuestionCard key={q.id}>
              <QuestionHeader
                onClick={() => toggleQuestion(q.id)}
                aria-expanded={isOpen}
              >
                <QuestionText>{q.question}</QuestionText>
                <ChevronIcon $isOpen={isOpen}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </ChevronIcon>
              </QuestionHeader>

              <AnswersContainer $isOpen={isOpen}>
                <AnswersInner>
                  <AnswersContent>
                    <ProviderRow>
                      <ProviderTabs>
                        {providers.map((provider) => (
                          <ProviderTab
                            key={provider}
                            $isActive={selectedProvider === provider}
                            $color={providerColors[provider]}
                            onClick={() => selectProvider(q.id, provider)}
                          >
                            {t(`ki_antworten.providers.${provider}`)}
                          </ProviderTab>
                        ))}
                      </ProviderTabs>
                      <CopyPromptButton
                        $copied={copiedId === q.id}
                        onClick={() => handleCopyPrompt(q.question, q.id)}
                      >
                        {copiedId === q.id
                          ? t('ki_antworten.copied')
                          : t('ki_antworten.copy_prompt')}
                      </CopyPromptButton>
                    </ProviderRow>

                    <AnswerContent>
                      <AnswerText>{q.answers[selectedProvider]}</AnswerText>
                    </AnswerContent>
                  </AnswersContent>
                </AnswersInner>
              </AnswersContainer>
            </QuestionCard>
          );
        })}
      </QASection>

      <SeeMoreWrapper>
        <SeeMoreLink href="/ki-prompts">
          {t('ki_antworten.see_more')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </SeeMoreLink>
      </SeeMoreWrapper>
    </Section>
  );
}
