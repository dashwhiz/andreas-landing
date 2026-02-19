'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import PageLayout from '@/components/PageLayout';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import { formatThousands, parseDeNumber } from '@/utils/formatting';

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

const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 16px;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: ${AppFontSizes.base};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 16px 0;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[40]};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  border-radius: 12px;
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral.neutralBlack};
  background: ${AppColors.white};
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${AppColors.brand.blue[50]};
    box-shadow: 0 0 0 4px ${AppColors.brand.blue[90]};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ResultBox = styled.div`
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid ${AppColors.brand.blue[80]};
  background: ${AppColors.brand.blue[90]};
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.blue[10]};

  strong {
    color: ${AppColors.brand.blue[0]};
  }
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
  if (!isFinite(value)) return '—';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

// Fields that should display with thousand separators
const EURO_FIELDS = new Set(['pv', 'fv', 'pmt']);

// Effective monthly rate from annual percentage
function effMonthlyRate(annualPct: number): number {
  const i = annualPct / 100;
  return Math.pow(1 + i, 1 / 12) - 1;
}

export default function ZinseszinsPage() {
  const { t } = useTranslations();

  // Calculator I: Future value of lump sum
  const [ci1, setCi1] = useState({ pv: 10000, i: 5, n: 20 });
  // Calculator II: Present value of future payment
  const [ci2, setCi2] = useState({ fv: 50000, i: 5, n: 20 });
  // Calculator III: Future value of monthly payments
  const [ci3, setCi3] = useState({ pmt: 200, i: 5, n: 20, g: 2 });
  // Calculator IV: Monthly payment to reach target
  const [ci4, setCi4] = useState({ fv: 100000, i: 5, n: 20, g: 2 });
  // Calculator V: Present value of monthly payments
  const [ci5, setCi5] = useState({ pmt: 200, i: 5, n: 20, g: 2 });

  // Track which fields are being edited (to allow empty display)
  const [editingFields, setEditingFields] = useState<Record<string, string>>({});

  // Helper to update a calculator field
  const updateCalc = (
    calcNum: 1 | 2 | 3 | 4 | 5,
    field: string,
    rawValue: string,
  ) => {
    const key = `ci${calcNum}.${field}`;
    setEditingFields((prev) => ({ ...prev, [key]: rawValue }));
    const value = EURO_FIELDS.has(field) ? parseDeNumber(rawValue) : (rawValue === '' ? 0 : parseFloat(rawValue));
    if (!isNaN(value)) {
      if (calcNum === 1) setCi1((prev) => ({ ...prev, [field]: value }));
      if (calcNum === 2) setCi2((prev) => ({ ...prev, [field]: value }));
      if (calcNum === 3) setCi3((prev) => ({ ...prev, [field]: value }));
      if (calcNum === 4) setCi4((prev) => ({ ...prev, [field]: value }));
      if (calcNum === 5) setCi5((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Get display value - show editing value if active, otherwise numeric state
  const getDisplayValue = (
    calcNum: 1 | 2 | 3 | 4 | 5,
    field: string,
    numericValue: number,
  ) => {
    const key = `ci${calcNum}.${field}`;
    if (key in editingFields) {
      return editingFields[key];
    }
    if (EURO_FIELDS.has(field)) {
      return formatThousands(numericValue);
    }
    return numericValue;
  };

  // On blur, clear editing state to show formatted number
  const handleBlur = (calcNum: 1 | 2 | 3 | 4 | 5, field: string) => {
    const key = `ci${calcNum}.${field}`;
    setEditingFields((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // Auto-select input content on focus for better UX
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  // Calculate results
  const results = useMemo(() => {
    // I: Endwert Einmalanlage
    const i1m = effMonthlyRate(Math.max(0, ci1.i));
    const n1 = Math.max(0, Math.round(ci1.n)) * 12;
    const fv1 = Math.max(0, ci1.pv) * Math.pow(1 + i1m, n1);

    // II: Gegenwartswert Einmalanlage
    const i2m = effMonthlyRate(Math.max(0, ci2.i));
    const n2 = Math.max(0, Math.round(ci2.n)) * 12;
    const pv2 = n2 === 0 ? ci2.fv : Math.max(0, ci2.fv) / Math.pow(1 + i2m, n2);

    // III: Endwert Zahlungsreihe
    const pmt3 = Math.max(0, ci3.pmt);
    const i3m = effMonthlyRate(Math.max(0, ci3.i));
    const g3m = effMonthlyRate(Math.max(0, ci3.g));
    const n3 = Math.max(0, Math.round(ci3.n)) * 12;
    let fv3 = 0;
    if (n3 > 0) {
      if (Math.abs(i3m - g3m) < 1e-15) {
        fv3 = pmt3 * n3 * Math.pow(1 + i3m, n3 - 1);
      } else {
        fv3 =
          (pmt3 * (Math.pow(1 + i3m, n3) - Math.pow(1 + g3m, n3))) / (i3m - g3m);
      }
    }

    // IV: Monatliche Zahlung
    const i4m = effMonthlyRate(Math.max(0, ci4.i));
    const g4m = effMonthlyRate(Math.max(0, ci4.g));
    const n4 = Math.max(0, Math.round(ci4.n)) * 12;
    let pmt4 = 0;
    if (n4 > 0) {
      const denom =
        Math.abs(i4m - g4m) < 1e-15
          ? n4 * Math.pow(1 + i4m, n4 - 1)
          : (Math.pow(1 + i4m, n4) - Math.pow(1 + g4m, n4)) / (i4m - g4m);
      pmt4 = Math.max(0, ci4.fv) / denom;
    }

    // V: Gegenwartswert Zahlungsreihe
    const pmt5 = Math.max(0, ci5.pmt);
    const i5m = effMonthlyRate(Math.max(0, ci5.i));
    const g5m = effMonthlyRate(Math.max(0, ci5.g));
    const n5 = Math.max(0, Math.round(ci5.n)) * 12;
    let pv5 = 0;
    if (n5 > 0) {
      const fv5Temp =
        Math.abs(i5m - g5m) < 1e-15
          ? pmt5 * n5 * Math.pow(1 + i5m, n5 - 1)
          : (pmt5 * (Math.pow(1 + i5m, n5) - Math.pow(1 + g5m, n5))) /
            (i5m - g5m);
      pv5 = fv5Temp / Math.pow(1 + i5m, n5);
    }

    return { fv1, pv2, fv3, pmt4, pv5 };
  }, [ci1, ci2, ci3, ci4, ci5]);

  return (
    <PageLayout>
      <PageTitle>{t('zinseszins.title')}</PageTitle>
      <PageDescription>{t('zinseszins.description')}</PageDescription>

      <CalculatorGrid>
        {/* Calculator I */}
        <Card>
          <SectionTitle>{t('zinseszins.calc1.title')}</SectionTitle>
          <TwoCol>
            <InputGroup>
              <Label>{t('zinseszins.calc1.pv')}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(1, 'pv', ci1.pv)}
                onChange={(e) => updateCalc(1, 'pv', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(1, 'pv')}
              />
            </InputGroup>
            <InputGroup>
              <Label>{t('zinseszins.calc1.rate')}</Label>
              <Input
                type="number"
                value={getDisplayValue(1, 'i', ci1.i)}
                onChange={(e) => updateCalc(1, 'i', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(1, 'i')}
                min={0}
                step={0.5}
              />
            </InputGroup>
          </TwoCol>
          <InputGroup>
            <Label>{t('zinseszins.calc1.years')}</Label>
            <Input
              type="number"
              value={getDisplayValue(1, 'n', ci1.n)}
              onChange={(e) => updateCalc(1, 'n', e.target.value)}
              onFocus={handleFocus}
              onBlur={() => handleBlur(1, 'n')}
              min={0}
              step={1}
            />
          </InputGroup>
          <ResultBox>
            <strong>{t('zinseszins.calc1.result')}:</strong>{' '}
            {formatCurrency(results.fv1)}
          </ResultBox>
        </Card>

        {/* Calculator II */}
        <Card>
          <SectionTitle>{t('zinseszins.calc2.title')}</SectionTitle>
          <TwoCol>
            <InputGroup>
              <Label>{t('zinseszins.calc2.fv')}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(2, 'fv', ci2.fv)}
                onChange={(e) => updateCalc(2, 'fv', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(2, 'fv')}
              />
            </InputGroup>
            <InputGroup>
              <Label>{t('zinseszins.calc2.rate')}</Label>
              <Input
                type="number"
                value={getDisplayValue(2, 'i', ci2.i)}
                onChange={(e) => updateCalc(2, 'i', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(2, 'i')}
                min={0}
                step={0.5}
              />
            </InputGroup>
          </TwoCol>
          <InputGroup>
            <Label>{t('zinseszins.calc2.years')}</Label>
            <Input
              type="number"
              value={getDisplayValue(2, 'n', ci2.n)}
              onChange={(e) => updateCalc(2, 'n', e.target.value)}
              onFocus={handleFocus}
              onBlur={() => handleBlur(2, 'n')}
              min={0}
              step={1}
            />
          </InputGroup>
          <ResultBox>
            <strong>{t('zinseszins.calc2.result')}:</strong>{' '}
            {formatCurrency(results.pv2)}
          </ResultBox>
        </Card>

        {/* Calculator III */}
        <Card>
          <SectionTitle>{t('zinseszins.calc3.title')}</SectionTitle>
          <TwoCol>
            <InputGroup>
              <Label>{t('zinseszins.calc3.pmt')}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(3, 'pmt', ci3.pmt)}
                onChange={(e) => updateCalc(3, 'pmt', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(3, 'pmt')}
              />
            </InputGroup>
            <InputGroup>
              <Label>{t('zinseszins.calc3.rate')}</Label>
              <Input
                type="number"
                value={getDisplayValue(3, 'i', ci3.i)}
                onChange={(e) => updateCalc(3, 'i', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(3, 'i')}
                min={0}
                step={0.5}
              />
            </InputGroup>
          </TwoCol>
          <TwoCol>
            <InputGroup>
              <Label>{t('zinseszins.calc3.years')}</Label>
              <Input
                type="number"
                value={getDisplayValue(3, 'n', ci3.n)}
                onChange={(e) => updateCalc(3, 'n', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(3, 'n')}
                min={0}
                step={1}
              />
            </InputGroup>
            <InputGroup>
              <Label>{t('zinseszins.calc3.growth')}</Label>
              <Input
                type="number"
                value={getDisplayValue(3, 'g', ci3.g)}
                onChange={(e) => updateCalc(3, 'g', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(3, 'g')}
                min={0}
                step={0.5}
              />
            </InputGroup>
          </TwoCol>
          <ResultBox>
            <strong>{t('zinseszins.calc3.result')}:</strong>{' '}
            {formatCurrency(results.fv3)}
          </ResultBox>
        </Card>

        {/* Calculator IV */}
        <Card>
          <SectionTitle>{t('zinseszins.calc4.title')}</SectionTitle>
          <TwoCol>
            <InputGroup>
              <Label>{t('zinseszins.calc4.fv')}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(4, 'fv', ci4.fv)}
                onChange={(e) => updateCalc(4, 'fv', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(4, 'fv')}
              />
            </InputGroup>
            <InputGroup>
              <Label>{t('zinseszins.calc4.rate')}</Label>
              <Input
                type="number"
                value={getDisplayValue(4, 'i', ci4.i)}
                onChange={(e) => updateCalc(4, 'i', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(4, 'i')}
                min={0}
                step={0.5}
              />
            </InputGroup>
          </TwoCol>
          <TwoCol>
            <InputGroup>
              <Label>{t('zinseszins.calc4.years')}</Label>
              <Input
                type="number"
                value={getDisplayValue(4, 'n', ci4.n)}
                onChange={(e) => updateCalc(4, 'n', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(4, 'n')}
                min={0}
                step={1}
              />
            </InputGroup>
            <InputGroup>
              <Label>{t('zinseszins.calc4.growth')}</Label>
              <Input
                type="number"
                value={getDisplayValue(4, 'g', ci4.g)}
                onChange={(e) => updateCalc(4, 'g', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(4, 'g')}
                min={0}
                step={0.5}
              />
            </InputGroup>
          </TwoCol>
          <ResultBox>
            <strong>{t('zinseszins.calc4.result')}:</strong>{' '}
            {formatCurrency(results.pmt4)}
          </ResultBox>
        </Card>

        {/* Calculator V */}
        <Card>
          <SectionTitle>{t('zinseszins.calc5.title')}</SectionTitle>
          <TwoCol>
            <InputGroup>
              <Label>{t('zinseszins.calc5.pmt')}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={getDisplayValue(5, 'pmt', ci5.pmt)}
                onChange={(e) => updateCalc(5, 'pmt', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(5, 'pmt')}
              />
            </InputGroup>
            <InputGroup>
              <Label>{t('zinseszins.calc5.rate')}</Label>
              <Input
                type="number"
                value={getDisplayValue(5, 'i', ci5.i)}
                onChange={(e) => updateCalc(5, 'i', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(5, 'i')}
                min={0}
                step={0.5}
              />
            </InputGroup>
          </TwoCol>
          <TwoCol>
            <InputGroup>
              <Label>{t('zinseszins.calc5.years')}</Label>
              <Input
                type="number"
                value={getDisplayValue(5, 'n', ci5.n)}
                onChange={(e) => updateCalc(5, 'n', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(5, 'n')}
                min={0}
                step={1}
              />
            </InputGroup>
            <InputGroup>
              <Label>{t('zinseszins.calc5.growth')}</Label>
              <Input
                type="number"
                value={getDisplayValue(5, 'g', ci5.g)}
                onChange={(e) => updateCalc(5, 'g', e.target.value)}
                onFocus={handleFocus}
                onBlur={() => handleBlur(5, 'g')}
                min={0}
                step={0.5}
              />
            </InputGroup>
          </TwoCol>
          <ResultBox>
            <strong>{t('zinseszins.calc5.result')}:</strong>{' '}
            {formatCurrency(results.pv5)}
          </ResultBox>
        </Card>
      </CalculatorGrid>

      <ExplanationSection>
        <ExplanationTitle>{t('zinseszins.explanation_title')}</ExplanationTitle>
        <ExplanationText>{t('zinseszins.explanation')}</ExplanationText>
      </ExplanationSection>
    </PageLayout>
  );
}
