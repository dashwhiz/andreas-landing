'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import PageLayout from '@/components/PageLayout';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';
import { formatThousands, parseDeNumber } from '@/utils/formatting';

const MOBILE_BREAKPOINT = 768;

const EUR_FIELDS = new Set<string>(['income', 'pensionMonthly']);

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
  margin: 0 0 32px 0;
  max-width: 900px;
`;

const TopBar = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 24px;
`;

const Select = styled.select`
  padding: 12px 36px 12px 14px;
  border-radius: 14px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${AppColors.white};
  color: ${AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};
  font-weight: 800;
  cursor: pointer;
  min-width: 200px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:focus {
    outline: none;
    border-color: ${AppColors.brand.blue[50]};
    box-shadow: 0 0 0 4px ${AppColors.brand.blue[90]};
  }
`;

const ResetButton = styled.button`
  padding: 12px 18px;
  border-radius: 14px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${AppColors.white};
  color: ${AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: ${AppColors.brand.neutral[100]};
  }

  &:focus {
    outline: none;
    border-color: ${AppColors.brand.blue[50]};
    box-shadow: 0 0 0 4px ${AppColors.brand.blue[90]};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Card = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 16px;
  padding: 16px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${AppFontSizes.base};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 10px 0;
`;

const SubTitle = styled.h3`
  font-size: 13px;
  font-weight: 900;
  color: ${AppColors.brand.neutral[40]};
  margin: 14px 0 10px 0;
  letter-spacing: 0.2px;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
  align-items: end;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 10px;
    align-items: stretch;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FieldRow = styled.div`
  margin-bottom: 16px;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 13px;
  color: ${AppColors.brand.neutral[40]};
  line-height: 1.2;
  flex: 1;
`;

const Input = styled.input<{ $disabled?: boolean }>`
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${(props) =>
    props.$disabled ? AppColors.brand.neutral[100] : AppColors.white};
  color: ${(props) =>
    props.$disabled
      ? AppColors.brand.neutral[40]
      : AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.base};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

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

const InfoButton = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${AppColors.white};
  color: ${AppColors.brand.neutral[40]};
  font-weight: 900;
  font-size: 12px;
  cursor: help;
  flex-shrink: 0;

  &:hover > span,
  &:active > span {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 260px;
  max-height: 200px;
  overflow: auto;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid ${AppColors.brand.neutral[80]};
  background: ${AppColors.white};
  color: ${AppColors.brand.neutral[10]};
  font-size: 12px;
  font-weight: 400;
  line-height: 1.45;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 9999;
  white-space: normal;

  @media (max-width: 720px) {
    width: 220px;
    right: -10px;
  }
`;

const Callout = styled.div`
  background: #def1ff;
  border-radius: 22px;
  padding: 16px;
  margin-top: 16px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 12px;
    border-radius: 16px;
  }
`;

const TableWrap = styled.div`
  border-radius: 14px;
  background: ${AppColors.white};
  overflow: visible;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  background: transparent;
  border: none;
  border-radius: 14px;

  @media (max-width: 720px) {
    display: none;
  }
`;

const Thead = styled.thead`
  th {
    text-align: left;
    font-size: 12px;
    color: ${AppColors.brand.neutral[40]};
    padding: 10px 12px;
    background: rgba(13, 15, 22, 0.02);
    border-bottom: 1px solid rgba(17, 24, 39, 0.08);
    font-weight: 900;
    vertical-align: middle;
  }

  th:first-child {
    border-top-left-radius: 14px;
  }

  th:last-child {
    border-top-right-radius: 14px;
  }
`;

const Tbody = styled.tbody`
  td {
    padding: 10px 12px;
    border-bottom: 1px solid rgba(17, 24, 39, 0.06);
    vertical-align: middle;
    background: ${AppColors.white};
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const TotalRow = styled.tr`
  td {
    border-top: 2px solid rgba(17, 24, 39, 0.14);
    background: rgba(13, 15, 22, 0.01);
    font-weight: 900;
  }

  td:first-child {
    border-bottom-left-radius: 14px;
  }

  td:last-child {
    border-bottom-right-radius: 14px;
  }
`;

const RowTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-weight: 800;
  font-size: 13px;
  color: rgba(13, 15, 22, 0.88);
  width: 100%;
`;

const TableInput = styled.input<{ $disabled?: boolean }>`
  display: block;
  width: 100%;
  max-width: 120px;
  margin: 0 auto;
  text-align: center;
  padding: 9px 10px;
  border-radius: 14px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${(props) =>
    props.$disabled ? 'rgba(17,24,39,.04)' : AppColors.white};
  color: ${(props) =>
    props.$disabled
      ? 'rgba(17,24,39,.70)'
      : AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};

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

// Mobile card layout for wealth items
const MobileWealthCards = styled.div`
  display: none;

  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const MobileWealthCard = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 12px;
  padding: 12px;
`;

const MobileWealthHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 14px;
  color: ${AppColors.brand.neutral[10]};
`;

const MobileWealthFields = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  align-items: end;
`;

const MobileWealthField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MobileFieldLabel = styled.span`
  font-size: 10px;
  color: ${AppColors.brand.neutral[40]};
  font-weight: 600;
  min-height: 28px;
  display: flex;
  align-items: flex-end;
  line-height: 1.2;
`;

const ResultsCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResultBlock = styled.div<{ $variant?: 'expect' | 'worst' }>`
  border-radius: 16px;

  padding: 14px;
  background: ${(props) =>
    props.$variant === 'expect'
      ? '#e9fbf2'
      : props.$variant === 'worst'
        ? '#ffecec'
        : AppColors.white};

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 12px;
  }
`;

const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
  font-weight: 900;
`;

const BlockTitle = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MiniKpi = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(17, 24, 39, 0.12);
  background: rgba(255, 255, 255, 0.65);
  padding: 10px 12px;
  margin-top: 10px;
`;

const KpiLabel = styled.div`
  font-size: 12px;
  color: ${AppColors.brand.neutral[40]};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const KpiValue = styled.div`
  margin-top: 6px;
  font-size: 22px;
  font-weight: 900;
`;

const MiniField = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MiniInput = styled.input`
  border-radius: 12px;
  padding: 10px 12px;
  text-align: left;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${AppColors.white};
  font-size: ${AppFontSizes.base};
  -moz-appearance: textfield;

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

const StatusLine = styled.div<{ $isError?: boolean }>`
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(17, 24, 39, 0.1);
  background: rgba(13, 15, 22, 0.031);
  color: ${(props) => (props.$isError ? '#b91c1c' : 'rgba(13,15,22,.70)')};
  font-size: 12px;
  line-height: 1.45;
`;

const ExplanationCard = styled.section`
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

// Types
interface State {
  r: number;
  g: number;
  ageNow: number;
  ageRet: number;
  ageLife: number;
  income: number;
  s: number;
  tax: number;
  pensionMonthly: number;
  badMuPct: number;
  bankK: number;
  pensionAssetK: number;
  secK: number;
  immoK: number;
  debtK: number;
  reBank: number;
  rePensionAsset: number;
  reSec: number;
  reImmo: number;
  reDebt: number;
  rePvSave: number;
  rePvPens: number;
  rpBank: number;
  rpPensionAsset: number;
  rpSec: number;
  rpImmo: number;
  rpDebt: number;
  rpPvSave: number;
  rpPvPens: number;
}

// Default profiles from Bilanz.html
const USER_DEFAULTS: State = {
  r: 2,
  g: 2,
  ageNow: 40,
  ageRet: 67,
  ageLife: 90,
  income: 2200,
  s: 8,
  tax: 20,
  pensionMonthly: 1262,
  badMuPct: 0,
  bankK: 15,
  reBank: 0,
  rpBank: 0,
  pensionAssetK: 10,
  rePensionAsset: 1,
  rpPensionAsset: 1,
  secK: 20,
  reSec: 3,
  rpSec: 3,
  immoK: 0,
  reImmo: 0,
  rpImmo: 0,
  debtK: 0,
  reDebt: 0,
  rpDebt: 0,
  rePvSave: 2,
  rpPvSave: 2,
  rePvPens: 1,
  rpPvPens: 1,
};

const EXAMPLES: Record<string, State> = {
  user: USER_DEFAULTS,
  frida: {
    ...USER_DEFAULTS,
    ageNow: 45,
    ageRet: 70,
    income: 950,
    s: -100,
    bankK: 50,
    pensionAssetK: 0,
    secK: 220,
    immoK: 300,
    debtK: 0,
    reSec: 3.5,
    reImmo: 2,
    rePvSave: 0,
    rpPvSave: 0,
    rePvPens: 1,
    rpPvPens: 1,
  },
  jana: {
    ...USER_DEFAULTS,
    g: 3,
    ageNow: 35,
    ageLife: 95,
    income: 2800,
    s: 10,
    pensionMonthly: 2200,
    bankK: 15,
    pensionAssetK: 25,
    secK: 20,
    debtK: -10,
    rePensionAsset: 2,
    reSec: 4,
    rePvSave: 1,
    rpPvSave: 4,
  },
  fred: {
    ...USER_DEFAULTS,
    ageNow: 50,
    ageRet: 70,
    income: 3800,
    s: 10,
    tax: 30,
    pensionMonthly: 1562,
    bankK: 90,
    pensionAssetK: 120,
    secK: 280,
    immoK: 800,
    debtK: -150,
    rePensionAsset: 2,
    reSec: 4,
    reImmo: 3,
    rePvSave: 3,
    rpPvSave: 3,
  },
  karin: {
    ...USER_DEFAULTS,
    ageNow: 30,
    ageLife: 95,
    income: 1800,
    s: 5,
    pensionMonthly: 1908,
    bankK: 5,
    pensionAssetK: 0,
    secK: 0,
    immoK: 0,
    debtK: 0,
    rePvSave: 1,
    rpPvSave: 2,
  },
  armin: {
    ...USER_DEFAULTS,
    income: 6400,
    s: 25,
    tax: 35,
    pensionMonthly: 3925,
    bankK: 125,
    pensionAssetK: 40,
    secK: 140,
    rePensionAsset: 2,
    reSec: 4,
    rePvSave: 2,
    rpPvSave: 3.5,
    rePvPens: 1.5,
  },
  benno: {
    ...USER_DEFAULTS,
    ageNow: 55,
    ageRet: 64,
    income: 58333.3333,
    s: 30,
    tax: 40,
    pensionMonthly: 3150,
    bankK: 200,
    pensionAssetK: 220,
    secK: 2500,
    immoK: 5500,
    debtK: -2000,
    rePensionAsset: 2,
    reSec: 7,
    reImmo: 2.5,
    rePvSave: 1,
    rpPvSave: 4,
  },
  frank: {
    ...USER_DEFAULTS,
    ageNow: 60,
    income: 6200,
    s: 12,
    tax: 35,
    pensionMonthly: 8309,
    bankK: 210,
    pensionAssetK: 0,
    secK: 0,
    immoK: 0,
    debtK: 0,
    rePvSave: 0.5,
    rpPvSave: 0,
    rePvPens: 0.5,
    rpPvPens: 0.5,
  },
};

// Helper functions
function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741;
  const a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

function normSDist(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function sigmaFromRE(re: number): number {
  const sig = Math.max(0, re) / 27;
  return Math.min(0.6, sig);
}

function probPoorScenario(
  mu: number,
  sigma: number,
  rf: number,
  tYears: number,
): number {
  const t = Math.max(1e-9, tYears);
  const sig = Math.max(0, sigma);
  if (sig < 1e-12) {
    return rf >= mu ? 1 : 0;
  }
  const z = (rf - mu) / (sig / Math.sqrt(t));
  return normSDist(z);
}

function formatEuro(x: number): string {
  if (!isFinite(x)) return '—';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(x);
}

function formatInt(x: number): string {
  if (!isFinite(x)) return '—';
  return Math.round(x).toString();
}

function formatOneDec(x: number): string {
  if (!isFinite(x)) return '—';
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(x);
}

function formatTwoDec(x: number): string {
  if (!isFinite(x)) return '—';
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(x);
}

export default function RentenprognosePage() {
  const { t } = useTranslations();
  const [state, setState] = useState<State>(USER_DEFAULTS);
  const [editingFields, setEditingFields] = useState<Record<string, string>>(
    {},
  );

  const updateField = (field: keyof State, rawValue: string) => {
    setEditingFields((prev) => ({ ...prev, [field]: rawValue }));
    const value = EUR_FIELDS.has(field)
      ? parseDeNumber(rawValue)
      : rawValue === '' ? 0 : parseFloat(rawValue);
    if (!isNaN(value)) {
      setState((prev) => ({ ...prev, [field]: value }));
    }
  };

  const getDisplayValue = (field: keyof State) => {
    if (field in editingFields) {
      return editingFields[field];
    }
    if (EUR_FIELDS.has(field)) {
      return formatThousands(state[field]);
    }
    return state[field];
  };

  const handleBlur = (field: keyof State) => {
    setEditingFields((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const { results, errors } = useMemo(() => {
    const nWork = state.ageRet - state.ageNow;
    const nRet = state.ageLife - state.ageRet;

    const newErrors: string[] = [];
    if (nWork <= 0) newErrors.push(t('rentenprognose.status.error_age'));
    if (nRet <= 0) newErrors.push(t('rentenprognose.status.error_life'));
    if (!isFinite(state.tax) || state.tax < 0 || state.tax > 100)
      newErrors.push(t('rentenprognose.status.error_tax'));

    if (newErrors.length > 0) {
      return { results: null, errors: newErrors };
    }

    const r = state.r / 100;
    const g = state.g / 100;
    const s = state.s / 100;
    const tax = state.tax / 100;

    // PV Future Savings
    const g_m = Math.pow(1 + g, 1 / 12) - 1;
    const d_m = Math.pow(1 + r + state.rpPvSave / 100, 1 / 12) - 1;
    let pvSave: number;
    if (Math.abs(d_m - g_m) < 1e-15) {
      pvSave = (state.income * s * (nWork * 12)) / 1000;
    } else {
      pvSave =
        (state.income * s * (1 - Math.pow((1 + g_m) / (1 + d_m), nWork * 12))) /
        (d_m - g_m) /
        1000;
    }

    // PV Pension
    const pvPens =
      (state.pensionMonthly * (nRet * 12)) /
      Math.pow(1 + r + state.rpPvPens / 100, nWork) /
      1000;

    // Total today
    const totalToday =
      state.bankK +
      state.pensionAssetK +
      state.secK +
      state.immoK +
      state.debtK +
      pvSave +
      pvPens;

    // RE Today (weighted average)
    const reToday =
      totalToday !== 0
        ? (state.bankK * state.reBank +
            state.pensionAssetK * state.rePensionAsset +
            state.secK * state.reSec +
            state.immoK * state.reImmo +
            state.debtK * state.reDebt +
            pvSave * state.rePvSave +
            pvPens * state.rePvPens) /
          totalToday
        : 0;

    // RP Weighted
    const rpWeighted =
      totalToday !== 0
        ? (state.bankK * (state.rpBank / 100) +
            state.pensionAssetK * (state.rpPensionAsset / 100) +
            state.secK * (state.rpSec / 100) +
            state.immoK * (state.rpImmo / 100) +
            state.debtK * (state.rpDebt / 100) +
            pvSave * (state.rpPvSave / 100) +
            pvPens * (state.rpPvPens / 100)) /
          totalToday
        : 0;

    // Expected return
    const muMid = r + rpWeighted;

    // Wealth at retirement (mid scenario)
    const wealthAtRetMid = totalToday * Math.pow(1 + muMid, nWork);
    const grossMidMonthly = 1000 * (wealthAtRetMid / (nRet * 12));
    const netMid = ((1 - tax) * grossMidMonthly) / Math.pow(1 + r, nWork);

    // Bad scenario
    const rfBad = state.badMuPct / 100;
    const wealthAtRetBad = totalToday * Math.pow(1 + rfBad, nWork);
    const grossBadMonthly = 1000 * (wealthAtRetBad / (nRet * 12));
    const netBad = ((1 - tax) * grossBadMonthly) / Math.pow(1 + r, nWork);

    // Coverage
    const expensesToday = state.income * (1 - s);
    const coverMid = expensesToday !== 0 ? (netMid / expensesToday) * 100 : NaN;
    const coverBad = expensesToday !== 0 ? (netBad / expensesToday) * 100 : NaN;

    // Probability of bad scenario
    const sigma = sigmaFromRE(reToday);
    const probBad = probPoorScenario(muMid, sigma, rfBad, nWork) * 100;

    return {
      results: {
        pvSave,
        pvPens,
        totalToday,
        reToday,
        rpWeighted: rpWeighted * 100,
        muMid: muMid * 100,
        netMid,
        coverMid,
        netBad,
        coverBad,
        probBad,
      },
      errors: [],
    };
  }, [state, t]);

  const [selectedProfile, setSelectedProfile] = useState<string>('');

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    if (key && EXAMPLES[key]) {
      setState(EXAMPLES[key]);
      setSelectedProfile(key);
      setEditingFields({});
    }
  };

  const handleReset = () => {
    setState(USER_DEFAULTS);
    setSelectedProfile('');
    setEditingFields({});
  };

  // Wealth items for rendering
  const wealthItems = [
    {
      key: 'bank',
      label: 'bank_accounts',
      kField: 'bankK',
      reField: 'reBank',
      rpField: 'rpBank',
    },
    {
      key: 'pension',
      label: 'pension_assets',
      kField: 'pensionAssetK',
      reField: 'rePensionAsset',
      rpField: 'rpPensionAsset',
    },
    {
      key: 'sec',
      label: 'securities',
      kField: 'secK',
      reField: 'reSec',
      rpField: 'rpSec',
    },
    {
      key: 'immo',
      label: 'real_estate',
      kField: 'immoK',
      reField: 'reImmo',
      rpField: 'rpImmo',
    },
    {
      key: 'debt',
      label: 'debt',
      kField: 'debtK',
      reField: 'reDebt',
      rpField: 'rpDebt',
    },
  ] as const;

  return (
    <PageLayout>
      <PageTitle>{t('rentenprognose.title')}</PageTitle>
      <PageDescription>{t('rentenprognose.description')}</PageDescription>

      <TopBar>
        <Select value={selectedProfile} onChange={handleProfileChange}>
          <option value=''>{t('rentenprognose.profiles.load')}</option>
          <option value='frida'>Frida</option>
          <option value='jana'>Jana</option>
          <option value='fred'>Fred</option>
          <option value='karin'>Karin</option>
          <option value='armin'>Armin</option>
          <option value='benno'>Benno</option>
          <option value='frank'>Frank</option>
        </Select>
        <ResetButton onClick={handleReset}>
          {t('rentenprognose.profiles.reset')}
        </ResetButton>
      </TopBar>

      <Grid>
        <Card>
          <SectionTitle>{t('rentenprognose.sections.inputs')}</SectionTitle>

          <SubTitle>{t('rentenprognose.sections.base_data')}</SubTitle>
          <TwoCol>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.safe_interest')}</Label>
                <InfoButton>
                  i
                  <Tooltip>
                    {t('rentenprognose.tooltips.safe_interest')}
                  </Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='0.1'
                value={getDisplayValue('r')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('r')}
                onChange={(e) => updateField('r', e.target.value)}
              />
            </Field>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.income_growth')}</Label>
                <InfoButton>
                  i
                  <Tooltip>
                    {t('rentenprognose.tooltips.income_growth')}
                  </Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='0.1'
                value={getDisplayValue('g')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('g')}
                onChange={(e) => updateField('g', e.target.value)}
              />
            </Field>
          </TwoCol>

          <TwoCol>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.age_now')}</Label>
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.age_now')}</Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='1'
                value={getDisplayValue('ageNow')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('ageNow')}
                onChange={(e) => updateField('ageNow', e.target.value)}
              />
            </Field>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.age_retirement')}</Label>
                <InfoButton>
                  i
                  <Tooltip>
                    {t('rentenprognose.tooltips.age_retirement')}
                  </Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='1'
                value={getDisplayValue('ageRet')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('ageRet')}
                onChange={(e) => updateField('ageRet', e.target.value)}
              />
            </Field>
          </TwoCol>

          <FieldRow>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.life_expectancy')}</Label>
                <InfoButton>
                  i
                  <Tooltip>
                    {t('rentenprognose.tooltips.life_expectancy')}
                  </Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='1'
                value={getDisplayValue('ageLife')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('ageLife')}
                onChange={(e) => updateField('ageLife', e.target.value)}
              />
            </Field>
          </FieldRow>

          <TwoCol>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.net_income')}</Label>
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.net_income')}</Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='text'
                inputMode='decimal'
                value={getDisplayValue('income')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('income')}
                onChange={(e) => updateField('income', e.target.value)}
              />
            </Field>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.savings_rate')}</Label>
                <InfoButton>
                  i
                  <Tooltip>{t('rentenprognose.tooltips.savings_rate')}</Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='0.5'
                value={getDisplayValue('s')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('s')}
                onChange={(e) => updateField('s', e.target.value)}
              />
            </Field>
          </TwoCol>

          <TwoCol>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.tax_rate')}</Label>
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.tax_rate')}</Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='0.5'
                value={getDisplayValue('tax')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('tax')}
                onChange={(e) => updateField('tax', e.target.value)}
              />
            </Field>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.pension_forecast')}</Label>
                <InfoButton>
                  i
                  <Tooltip>
                    {t('rentenprognose.tooltips.pension_forecast')}
                  </Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='text'
                inputMode='decimal'
                value={getDisplayValue('pensionMonthly')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('pensionMonthly')}
                onChange={(e) => updateField('pensionMonthly', e.target.value)}
              />
            </Field>
          </TwoCol>

          <SubTitle>{t('rentenprognose.sections.wealth_overview')}</SubTitle>
          <Callout>
            <TableWrap>
              <Table>
                <Thead>
                  <tr>
                    <th style={{ width: '44%' }}>
                      {t('rentenprognose.columns.position')}
                    </th>
                    <th style={{ width: '18%' }}>
                      {t('rentenprognose.columns.amount')}
                    </th>
                    <th style={{ width: '18%' }}>
                      {t('rentenprognose.columns.risk_units')}
                    </th>
                    <th style={{ width: '20%' }}>
                      {t('rentenprognose.columns.risk_premium')}
                    </th>
                  </tr>
                </Thead>
                <Tbody>
                  {wealthItems.map((item) => (
                    <tr key={item.key}>
                      <td>
                        <RowTitle>
                          <span>
                            {t(`rentenprognose.wealth_items.${item.label}`)}
                          </span>
                          <InfoButton>
                            i
                            <Tooltip>
                              {t(`rentenprognose.tooltips.${item.label}`)}
                            </Tooltip>
                          </InfoButton>
                        </RowTitle>
                      </td>
                      <td>
                        <TableInput
                          type='number'
                          step='5'
                          value={getDisplayValue(item.kField)}
                          onFocus={handleFocus}
                          onBlur={() => handleBlur(item.kField)}
                          onChange={(e) =>
                            updateField(item.kField, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <TableInput
                          type='number'
                          step='0.5'
                          value={getDisplayValue(item.reField)}
                          onFocus={handleFocus}
                          onBlur={() => handleBlur(item.reField)}
                          onChange={(e) =>
                            updateField(item.reField, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <TableInput
                          type='number'
                          step='0.5'
                          value={getDisplayValue(item.rpField)}
                          onFocus={handleFocus}
                          onBlur={() => handleBlur(item.rpField)}
                          onChange={(e) =>
                            updateField(item.rpField, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <RowTitle>
                        <span>
                          {t('rentenprognose.wealth_items.future_savings')}
                        </span>
                        <InfoButton>
                          i
                          <Tooltip>
                            {t('rentenprognose.tooltips.future_savings')}
                          </Tooltip>
                        </InfoButton>
                      </RowTitle>
                    </td>
                    <td>
                      <TableInput
                        type='text'
                        value={results ? formatInt(results.pvSave) : '0'}
                        disabled
                        $disabled
                      />
                    </td>
                    <td>
                      <TableInput
                        type='number'
                        step='0.5'
                        value={getDisplayValue('rePvSave')}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur('rePvSave')}
                        onChange={(e) =>
                          updateField('rePvSave', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <TableInput
                        type='number'
                        step='0.5'
                        value={getDisplayValue('rpPvSave')}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur('rpPvSave')}
                        onChange={(e) =>
                          updateField('rpPvSave', e.target.value)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <RowTitle>
                        <span>
                          {t('rentenprognose.wealth_items.statutory_pension')}
                        </span>
                        <InfoButton>
                          i
                          <Tooltip>
                            {t('rentenprognose.tooltips.statutory_pension')}
                          </Tooltip>
                        </InfoButton>
                      </RowTitle>
                    </td>
                    <td>
                      <TableInput
                        type='text'
                        value={results ? formatInt(results.pvPens) : '0'}
                        disabled
                        $disabled
                      />
                    </td>
                    <td>
                      <TableInput
                        type='number'
                        step='0.5'
                        value={getDisplayValue('rePvPens')}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur('rePvPens')}
                        onChange={(e) =>
                          updateField('rePvPens', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <TableInput
                        type='number'
                        step='0.5'
                        value={getDisplayValue('rpPvPens')}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur('rpPvPens')}
                        onChange={(e) =>
                          updateField('rpPvPens', e.target.value)
                        }
                      />
                    </td>
                  </tr>
                  <TotalRow>
                    <td>{t('rentenprognose.results_labels.total_wealth')}</td>
                    <td>
                      <TableInput
                        type='text'
                        value={results ? formatInt(results.totalToday) : '—'}
                        disabled
                        $disabled
                      />
                    </td>
                    <td>
                      <TableInput
                        type='text'
                        value={results ? formatOneDec(results.reToday) : '—'}
                        disabled
                        $disabled
                      />
                    </td>
                    <td>
                      <TableInput
                        type='text'
                        value={results ? formatOneDec(results.rpWeighted) : '—'}
                        disabled
                        $disabled
                      />
                    </td>
                  </TotalRow>
                </Tbody>
              </Table>
            </TableWrap>

            {/* Mobile card layout */}
            <MobileWealthCards>
              {wealthItems.map((item) => (
                <MobileWealthCard key={item.key}>
                  <MobileWealthHeader>
                    <span>
                      {t(`rentenprognose.wealth_items.${item.label}`)}
                    </span>
                    <InfoButton>
                      i
                      <Tooltip>
                        {t(`rentenprognose.tooltips.${item.label}`)}
                      </Tooltip>
                    </InfoButton>
                  </MobileWealthHeader>
                  <MobileWealthFields>
                    <MobileWealthField>
                      <MobileFieldLabel>
                        {t('rentenprognose.columns.amount')}
                      </MobileFieldLabel>
                      <TableInput
                        type='number'
                        step='5'
                        value={getDisplayValue(item.kField)}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur(item.kField)}
                        onChange={(e) =>
                          updateField(item.kField, e.target.value)
                        }
                      />
                    </MobileWealthField>
                    <MobileWealthField>
                      <MobileFieldLabel>
                        {t('rentenprognose.columns.risk_units')}
                      </MobileFieldLabel>
                      <TableInput
                        type='number'
                        step='0.5'
                        value={getDisplayValue(item.reField)}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur(item.reField)}
                        onChange={(e) =>
                          updateField(item.reField, e.target.value)
                        }
                      />
                    </MobileWealthField>
                    <MobileWealthField>
                      <MobileFieldLabel>
                        {t('rentenprognose.columns.risk_premium')}
                      </MobileFieldLabel>
                      <TableInput
                        type='number'
                        step='0.5'
                        value={getDisplayValue(item.rpField)}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur(item.rpField)}
                        onChange={(e) =>
                          updateField(item.rpField, e.target.value)
                        }
                      />
                    </MobileWealthField>
                  </MobileWealthFields>
                </MobileWealthCard>
              ))}

              <MobileWealthCard>
                <MobileWealthHeader>
                  <span>{t('rentenprognose.wealth_items.future_savings')}</span>
                  <InfoButton>
                    i
                    <Tooltip>
                      {t('rentenprognose.tooltips.future_savings')}
                    </Tooltip>
                  </InfoButton>
                </MobileWealthHeader>
                <MobileWealthFields>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.amount')}
                    </MobileFieldLabel>
                    <TableInput
                      type='text'
                      value={results ? formatInt(results.pvSave) : '0'}
                      disabled
                      $disabled
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_units')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rePvSave')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rePvSave')}
                      onChange={(e) => updateField('rePvSave', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_premium')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpPvSave')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpPvSave')}
                      onChange={(e) => updateField('rpPvSave', e.target.value)}
                    />
                  </MobileWealthField>
                </MobileWealthFields>
              </MobileWealthCard>

              <MobileWealthCard>
                <MobileWealthHeader>
                  <span>
                    {t('rentenprognose.wealth_items.statutory_pension')}
                  </span>
                  <InfoButton>
                    i
                    <Tooltip>
                      {t('rentenprognose.tooltips.statutory_pension')}
                    </Tooltip>
                  </InfoButton>
                </MobileWealthHeader>
                <MobileWealthFields>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.amount')}
                    </MobileFieldLabel>
                    <TableInput
                      type='text'
                      value={results ? formatInt(results.pvPens) : '0'}
                      disabled
                      $disabled
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_units')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rePvPens')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rePvPens')}
                      onChange={(e) => updateField('rePvPens', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_premium')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpPvPens')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpPvPens')}
                      onChange={(e) => updateField('rpPvPens', e.target.value)}
                    />
                  </MobileWealthField>
                </MobileWealthFields>
              </MobileWealthCard>
            </MobileWealthCards>
          </Callout>

          <StatusLine $isError={errors.length > 0}>
            {errors.length > 0
              ? errors.join(' ')
              : t('rentenprognose.status.ok')}
          </StatusLine>
        </Card>

        <ResultsCol>
          {/* Expected Scenario */}
          <ResultBlock $variant='expect'>
            <BlockHeader>
              <BlockTitle>
                {t('rentenprognose.results.mid_scenario')}
                <InfoButton>
                  i
                  <Tooltip>{t('rentenprognose.tooltips.mid_scenario')}</Tooltip>
                </InfoButton>
              </BlockTitle>
            </BlockHeader>

            <MiniKpi>
              <KpiLabel>
                {t('rentenprognose.results.return_on_wealth')}
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.return_mid')}</Tooltip>
                </InfoButton>
              </KpiLabel>
              <KpiValue>
                {results ? `${formatTwoDec(results.muMid)} %` : '—'}
              </KpiValue>
            </MiniKpi>

            <MiniKpi>
              <KpiLabel>
                {t('rentenprognose.results.monthly_net')}
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.net_mid')}</Tooltip>
                </InfoButton>
              </KpiLabel>
              <KpiValue>{results ? formatEuro(results.netMid) : '—'}</KpiValue>
            </MiniKpi>

            <MiniKpi>
              <KpiLabel>
                {t('rentenprognose.results.coverage')}
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.coverage')}</Tooltip>
                </InfoButton>
              </KpiLabel>
              <KpiValue>
                {results && isFinite(results.coverMid)
                  ? `${formatInt(results.coverMid)} %`
                  : '—'}
              </KpiValue>
            </MiniKpi>
          </ResultBlock>

          {/* Bad Scenario */}
          <ResultBlock $variant='worst'>
            <BlockHeader>
              <BlockTitle>
                {t('rentenprognose.results.bad_scenario')}
                <InfoButton>
                  i
                  <Tooltip>{t('rentenprognose.tooltips.bad_scenario')}</Tooltip>
                </InfoButton>
              </BlockTitle>
            </BlockHeader>

            <MiniField>
              <LabelRow>
                <Label>{t('rentenprognose.results.return_threshold')}</Label>
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.return_bad')}</Tooltip>
                </InfoButton>
              </LabelRow>
              <MiniInput
                type='number'
                step='0.01'
                value={getDisplayValue('badMuPct')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('badMuPct')}
                onChange={(e) => updateField('badMuPct', e.target.value)}
              />
            </MiniField>

            <MiniKpi>
              <KpiLabel>
                {t('rentenprognose.results.probability')}
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.probability')}</Tooltip>
                </InfoButton>
              </KpiLabel>
              <KpiValue>
                {results ? `${formatInt(results.probBad)} %` : '—'}
              </KpiValue>
            </MiniKpi>

            <MiniKpi>
              <KpiLabel>
                {t('rentenprognose.results.monthly_net')}
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.net_bad')}</Tooltip>
                </InfoButton>
              </KpiLabel>
              <KpiValue>{results ? formatEuro(results.netBad) : '—'}</KpiValue>
            </MiniKpi>

            <MiniKpi>
              <KpiLabel>
                {t('rentenprognose.results.coverage')}
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.coverage')}</Tooltip>
                </InfoButton>
              </KpiLabel>
              <KpiValue>
                {results && isFinite(results.coverBad)
                  ? `${formatInt(results.coverBad)} %`
                  : '—'}
              </KpiValue>
            </MiniKpi>
          </ResultBlock>
        </ResultsCol>
      </Grid>

      <ExplanationCard>
        <ExplanationTitle>
          {t('rentenprognose.explanation_title')}
        </ExplanationTitle>
        <ExplanationText>{t('rentenprognose.explanation')}</ExplanationText>
      </ExplanationCard>
    </PageLayout>
  );
}
