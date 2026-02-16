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
  margin: 0 0 40px 0;
  max-width: 900px;
`;

const PromptList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PromptCard = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 14px;
  overflow: hidden;
`;

const PromptHeader = styled.button`
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

const PromptTitle = styled.span`
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
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${(props) =>
    props.$copied ? AppColors.brand.green[50] : AppColors.brand.neutral[70]};
  background: ${(props) =>
    props.$copied ? AppColors.brand.green[90] : AppColors.white};
  color: ${(props) =>
    props.$copied ? AppColors.brand.green[30] : AppColors.brand.neutral[20]};
  font-size: ${AppFontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${(props) =>
      props.$copied ? AppColors.brand.green[90] : AppColors.brand.neutral[100]};
  }
`;

interface Prompt {
  id: string;
  title: string;
  prompt: string;
}

export default function KIPromptsPage() {
  const { t, tObject } = useTranslations();
  const [openPrompts, setOpenPrompts] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts = tObject<Prompt[]>('ki_prompts.prompts');

  const togglePrompt = (id: string) => {
    setOpenPrompts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <PageLayout>
      <PageTitle>{t('ki_prompts.title')}</PageTitle>
      <PageDescription>{t('ki_prompts.description')}</PageDescription>

      <PromptList>
        {prompts.map((item) => {
          const isOpen = openPrompts[item.id] || false;

          return (
            <PromptCard key={item.id}>
              <PromptHeader
                onClick={() => togglePrompt(item.id)}
                aria-expanded={isOpen}
              >
                <PromptTitle>{item.title}</PromptTitle>
                <ChevronIcon $isOpen={isOpen}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </ChevronIcon>
              </PromptHeader>

              <ContentContainer $isOpen={isOpen}>
                <ContentInner>
                  <ContentBody>
                    <PromptText>{item.prompt}</PromptText>
                    <CopyButton
                      $copied={copiedId === item.id}
                      onClick={() => handleCopy(item.prompt, item.id)}
                    >
                      {copiedId === item.id
                        ? t('ki_prompts.copied')
                        : t('ki_prompts.copy_button')}
                    </CopyButton>
                  </ContentBody>
                </ContentInner>
              </ContentContainer>
            </PromptCard>
          );
        })}
      </PromptList>
    </PageLayout>
  );
}
