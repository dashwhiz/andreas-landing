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
  max-width: 700px;
`;

const QASection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const QuestionCard = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 16px;
  overflow: hidden;
`;

const QuestionHeader = styled.button`
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${AppColors.white};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const QuestionText = styled.span`
  font-size: ${AppFontSizes.lg};
  font-weight: 600;
  color: ${AppColors.brand.neutral.neutralBlack};
  text-align: left;
`;

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 20px;
  color: ${AppColors.brand.neutral[40]};
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$isOpen ? '180deg' : '0deg')});
`;

const AnswersContainer = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  padding: 0 24px 24px 24px;
`;

const ProviderTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ProviderTab = styled.button<{ $isActive: boolean; $color: string }>`
  padding: 10px 16px;
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
  border-radius: 12px;
  padding: 20px;
`;

const AnswerText = styled.p`
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral[10]};
  line-height: 1.7;
  margin: 0;
  white-space: pre-wrap;
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
  chatgpt: AppColors.brand.green[30],
  gemini: AppColors.brand.blue[30],
  perplexity: AppColors.brand.violet[30],
};

export default function KIAntwortenPage() {
  const { t, tObject } = useTranslations();
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedProviders, setSelectedProviders] = useState<
    Record<string, Provider>
  >({});

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

  return (
    <PageLayout>
      <PageTitle>{t('ki_antworten.title')}</PageTitle>
      <PageDescription>{t('ki_antworten.description')}</PageDescription>

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
                <ChevronIcon $isOpen={isOpen}>▼</ChevronIcon>
              </QuestionHeader>

              <AnswersContainer $isOpen={isOpen}>
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

                <AnswerContent>
                  <AnswerText>{q.answers[selectedProvider]}</AnswerText>
                </AnswerContent>
              </AnswersContainer>
            </QuestionCard>
          );
        })}
      </QASection>
    </PageLayout>
  );
}
