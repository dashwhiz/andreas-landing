'use client';

import { useState, useEffect } from 'react';
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

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const InputSection = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 16px;
  padding: 24px;
`;

const ResultsSection = styled.div`
  background: ${AppColors.brand.green[90]};
  border-radius: 16px;
  padding: 24px;
`;

const SectionTitle = styled.h2`
  font-size: ${AppFontSizes.lg};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 24px 0;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[30]};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  border-radius: 12px;
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral.neutralBlack};
  background: ${AppColors.white};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${AppColors.brand.green[50]};
    box-shadow: 0 0 0 4px ${AppColors.brand.green[90]};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ResultItem = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ResultLabel = styled.div`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.green[20]};
  margin-bottom: 4px;
`;

const ResultValue = styled.div`
  font-size: ${AppFontSizes['2xl']};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
`;

const ExplanationSection = styled.section`
  margin-top: 60px;
  padding: 32px;
  background: ${AppColors.brand.neutral[100]};
  border-radius: 16px;
`;

const ExplanationTitle = styled.h2`
  font-size: ${AppFontSizes.xl};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 16px 0;
`;

const ExplanationText = styled.p`
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral[20]};
  line-height: 1.7;
  margin: 0;
`;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ZinseszinsPage() {
  const { t } = useTranslations();

  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [interestRate, setInterestRate] = useState(7);
  const [duration, setDuration] = useState(20);

  const [results, setResults] = useState({
    finalAmount: 0,
    totalContributions: 0,
    totalInterest: 0,
  });

  useEffect(() => {
    const calculateCompoundInterest = () => {
      const monthlyRate = interestRate / 100 / 12;
      const months = duration * 12;

      // Future value of initial amount
      const fvInitial = initialAmount * Math.pow(1 + monthlyRate, months);

      // Future value of monthly contributions (annuity)
      let fvContributions = 0;
      if (monthlyRate > 0) {
        fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      } else {
        fvContributions = monthlyContribution * months;
      }

      const finalAmount = fvInitial + fvContributions;
      const totalContributions = initialAmount + (monthlyContribution * months);
      const totalInterest = finalAmount - totalContributions;

      setResults({
        finalAmount: Math.round(finalAmount),
        totalContributions: Math.round(totalContributions),
        totalInterest: Math.round(totalInterest),
      });
    };

    calculateCompoundInterest();
  }, [initialAmount, monthlyContribution, interestRate, duration]);

  return (
    <PageLayout>
      <PageTitle>{t('zinseszins.title')}</PageTitle>
      <PageDescription>{t('zinseszins.description')}</PageDescription>

      <CalculatorGrid>
        <InputSection>
          <SectionTitle>{t('zinseszins.sections.inputs')}</SectionTitle>

          <InputGroup>
            <Label>{t('zinseszins.inputs.initial_amount')}</Label>
            <Input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              min={0}
              step={100}
            />
          </InputGroup>

          <InputGroup>
            <Label>{t('zinseszins.inputs.monthly_contribution')}</Label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              min={0}
              step={50}
            />
          </InputGroup>

          <InputGroup>
            <Label>{t('zinseszins.inputs.interest_rate')}</Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min={0}
              max={100}
              step={0.5}
            />
          </InputGroup>

          <InputGroup>
            <Label>{t('zinseszins.inputs.duration')}</Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min={1}
              max={100}
              step={1}
            />
          </InputGroup>
        </InputSection>

        <ResultsSection>
          <SectionTitle>{t('zinseszins.sections.results')}</SectionTitle>

          <ResultItem>
            <ResultLabel>{t('zinseszins.results.final_amount')}</ResultLabel>
            <ResultValue>{formatCurrency(results.finalAmount)}</ResultValue>
          </ResultItem>

          <ResultItem>
            <ResultLabel>{t('zinseszins.results.total_contributions')}</ResultLabel>
            <ResultValue>{formatCurrency(results.totalContributions)}</ResultValue>
          </ResultItem>

          <ResultItem>
            <ResultLabel>{t('zinseszins.results.total_interest')}</ResultLabel>
            <ResultValue>{formatCurrency(results.totalInterest)}</ResultValue>
          </ResultItem>
        </ResultsSection>
      </CalculatorGrid>

      <ExplanationSection>
        <ExplanationTitle>{t('zinseszins.explanation_title')}</ExplanationTitle>
        <ExplanationText>{t('zinseszins.explanation')}</ExplanationText>
      </ExplanationSection>
    </PageLayout>
  );
}
