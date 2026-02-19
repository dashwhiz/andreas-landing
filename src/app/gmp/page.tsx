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

const QuestionText = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[10]};
  line-height: 1.6;
  margin: 0 0 16px 0;
  font-weight: 500;
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

const AnswerText = styled.div`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[10]};
  line-height: 1.7;
  white-space: pre-wrap;

  b, strong { font-weight: 700; }
`;

const CopyIconButton = styled.button<{ $copied: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid ${(props) =>
    props.$copied ? AppColors.brand.green[50] : AppColors.brand.neutral[70]};
  background: ${(props) =>
    props.$copied ? AppColors.brand.green[90] : AppColors.white};
  color: ${(props) =>
    props.$copied ? AppColors.brand.green[30] : AppColors.brand.neutral[30]};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${(props) =>
      props.$copied ? AppColors.brand.green[90] : AppColors.brand.neutral[100]};
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
  }
`;

type Provider = 'chatgpt' | 'gemini';

const providerColors: Record<Provider, string> = {
  chatgpt: '#10a37f',
  gemini: '#4285f4',
};

const PROVIDERS: Provider[] = ['chatgpt', 'gemini'];

export default function GmpPage() {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState<Provider>('chatgpt');
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
                <QuestionText>{t('gmp_page.prompt_text')}</QuestionText>
                <ProviderRow>
                  <ProviderTabs>
                    {PROVIDERS.map((p) => (
                      <ProviderTab
                        key={p}
                        $isActive={provider === p}
                        $color={providerColors[p]}
                        onClick={() => setProvider(p)}
                      >
                        {p === 'chatgpt' ? 'ChatGPT' : 'Gemini'}
                      </ProviderTab>
                    ))}
                  </ProviderTabs>
                  <CopyIconButton
                    $copied={copied}
                    onClick={handleCopy}
                    title={copied ? t('gmp_page.copied') : t('gmp_page.copy_tooltip')}
                  >
                    {copied ? (
                      <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </CopyIconButton>
                </ProviderRow>
                <AnswerContent>
                  <AnswerText dangerouslySetInnerHTML={{ __html: t(`gmp_page.answers.${provider}`) }} />
                </AnswerContent>
              </ContentBody>
            </ContentInner>
          </ContentContainer>
        </PromptCard>
      </CenteredWrapper>
    </PageLayout>
  );
}
