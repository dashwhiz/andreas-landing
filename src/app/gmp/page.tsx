'use client';

import { useState } from 'react';
import styled from 'styled-components';
import PageLayout from '@/components/PageLayout';
import MarktportfolioSection from '@/components/MarktportfolioSection';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

const PromptCard = styled.div`
  width: 100%;
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

export default function GmpPage() {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(t('gmp_page.prompt_text'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageLayout>
      <CenteredWrapper>
        <MarktportfolioSection />

        <PromptCard>
          <PromptHeader onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
            <PromptTitle>{t('gmp_page.prompt_title')}</PromptTitle>
            <ChevronIcon $isOpen={isOpen}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </ChevronIcon>
          </PromptHeader>

          <ContentContainer $isOpen={isOpen}>
            <ContentInner>
              <ContentBody>
                <PromptText>{t('gmp_page.prompt_text')}</PromptText>
                <CopyButton $copied={copied} onClick={handleCopy}>
                  {copied ? t('gmp_page.copied') : t('gmp_page.copy_button')}
                </CopyButton>
              </ContentBody>
            </ContentInner>
          </ContentContainer>
        </PromptCard>
      </CenteredWrapper>
    </PageLayout>
  );
}
