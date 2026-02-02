'use client';

import { useState } from 'react';
import styled from 'styled-components';
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
  margin-bottom: 16px;
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
                  </AnswersContent>
                </AnswersInner>
              </AnswersContainer>
            </QuestionCard>
          );
        })}
      </QASection>
    </Section>
  );
}
