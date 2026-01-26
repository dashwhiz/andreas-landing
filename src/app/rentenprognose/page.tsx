'use client';

import { useState, useMemo } from 'react';
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
  padding: 10px 32px 10px 12px;
  border-radius: 12px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${AppColors.white};
  color: ${AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:focus {
    outline: none;
    border-color: ${AppColors.brand.blue[50]};
  }
`;

const ResetButton = styled.button`
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid ${AppColors.brand.blue[70]};
  background: ${AppColors.brand.blue[90]};
  color: ${AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${AppColors.brand.blue[80]};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
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

const SubTitle = styled.h3`
  font-size: ${AppFontSizes.sm};
  font-weight: 700;
  color: ${AppColors.brand.neutral[40]};
  margin: 20px 0 12px 0;
  letter-spacing: 0.2px;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 16px;
  align-items: end;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 20px;
    align-items: stretch;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Standalone fields (not inside TwoCol) need margin */
  & + & {
    margin-top: 20px;
  }
`;

const StandaloneField = styled(Field)`
  margin-bottom: 20px;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const Label = styled.label`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[40]};
  line-height: 1.3;
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${AppColors.white};
  color: ${AppColors.brand.neutral[40]};
  font-weight: 700;
  font-size: 11px;
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

  width: 280px;
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
  z-index: 100;
  white-space: normal;

  @media (max-width: 720px) {
    left: auto;
    right: 0;
    width: calc(100vw - 48px);
    max-width: 280px;
  }
`;

const Callout = styled.div`
  background: ${AppColors.brand.blue[90]};
  border: 2px solid ${AppColors.brand.blue[80]};
  border-radius: 20px;
  padding: 16px;
  margin-top: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid ${AppColors.brand.neutral[80]};
  background: ${AppColors.white};

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
    background: ${AppColors.brand.neutral[100]};
    border-bottom: 1px solid ${AppColors.brand.neutral[80]};
    font-weight: 700;
  }
`;

const Tbody = styled.tbody`
  td {
    padding: 10px 12px;
    border-bottom: 1px solid ${AppColors.brand.neutral[90]};
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const RowTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-weight: 600;
  font-size: 13px;
  color: ${AppColors.brand.neutral[10]};
`;

// Mobile card layout for wealth items
const MobileWealthCards = styled.div`
  display: none;

  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const MobileWealthCard = styled.div`
  background: ${AppColors.white};
  border: 1px solid ${AppColors.brand.neutral[80]};
  border-radius: 12px;
  padding: 16px;
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

const TableInput = styled.input<{ $disabled?: boolean }>`
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid ${AppColors.brand.neutral[70]};
  background: ${(props) =>
    props.$disabled ? AppColors.brand.neutral[100] : AppColors.white};
  color: ${(props) =>
    props.$disabled
      ? AppColors.brand.neutral[40]
      : AppColors.brand.neutral.neutralBlack};
  font-size: ${AppFontSizes.sm};

  &:focus {
    outline: none;
    border-color: ${AppColors.brand.blue[50]};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const KPI = styled.div`
  border-radius: 14px;
  border: 1px solid ${AppColors.brand.neutral[80]};
  background: ${AppColors.white};
  padding: 14px;
  margin-bottom: 12px;
`;

const KPILabel = styled.div`
  font-size: 12px;
  color: ${AppColors.brand.neutral[40]};
`;

const KPIValue = styled.div`
  margin-top: 6px;
  font-size: ${AppFontSizes.xl};
  font-weight: 700;
  letter-spacing: 0.2px;
  color: ${AppColors.brand.neutral.neutralBlack};
`;

const StatusLine = styled.div<{ $isError?: boolean }>`
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid ${AppColors.brand.neutral[80]};
  background: ${AppColors.brand.neutral[100]};
  color: ${(props) =>
    props.$isError
      ? AppColors.semantic.error[60]
      : AppColors.semantic.success[40]};
  font-size: ${AppFontSizes.sm};
  line-height: 1.45;
`;

const ExplanationSection = styled.section`
  margin-top: 40px;
  padding: 24px;
  background: ${AppColors.brand.neutral[100]};
  border-radius: 16px;
`;

const ExplanationTitle = styled.h2`
  font-size: ${AppFontSizes.lg};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
  margin: 0 0 12px 0;
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
  zBad: number;
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

// Default profiles
const USER_DEFAULTS: State = {
  r: 2,
  g: 2,
  ageNow: 45,
  ageRet: 67,
  ageLife: 90,
  income: 950,
  s: 10,
  tax: 25,
  pensionMonthly: 1262,
  zBad: -1.04,
  bankK: 50,
  reBank: 0,
  rpBank: 0,
  pensionAssetK: 0,
  rePensionAsset: 0,
  rpPensionAsset: 0,
  secK: 220,
  reSec: 3.5,
  rpSec: 2,
  immoK: 300,
  reImmo: 2,
  rpImmo: 2,
  debtK: 0,
  reDebt: 0,
  rpDebt: 0,
  rePvSave: 1,
  rpPvSave: 0,
  rePvPens: 1,
  rpPvPens: 1,
};

const EXAMPLES: Record<string, State> = {
  user: USER_DEFAULTS,
  frida: { ...USER_DEFAULTS, ageRet: 70, s: -100 },
  jana: {
    r: 2,
    g: 3,
    ageNow: 35,
    ageRet: 67,
    ageLife: 95,
    income: 2800,
    s: 10,
    tax: 20,
    pensionMonthly: 2200,
    zBad: -1.555,
    bankK: 15,
    reBank: 0,
    rpBank: 0,
    pensionAssetK: 25,
    rePensionAsset: 2,
    rpPensionAsset: 1,
    secK: 20,
    reSec: 4,
    rpSec: 4,
    immoK: 0,
    reImmo: 0,
    rpImmo: 0,
    debtK: -10,
    reDebt: 0,
    rpDebt: 1,
    rePvSave: 1,
    rpPvSave: 4,
    rePvPens: 1,
    rpPvPens: 1,
  },
  fred: {
    r: 2,
    g: 2,
    ageNow: 50,
    ageRet: 70,
    ageLife: 90,
    income: 3800,
    s: 10,
    tax: 30,
    pensionMonthly: 1562,
    zBad: -0.739,
    bankK: 90,
    reBank: 0,
    rpBank: 0,
    pensionAssetK: 120,
    rePensionAsset: 2,
    rpPensionAsset: 2,
    secK: 280,
    reSec: 4,
    rpSec: 3,
    immoK: 800,
    reImmo: 3,
    rpImmo: 2,
    debtK: -150,
    reDebt: 0,
    rpDebt: 3,
    rePvSave: 3,
    rpPvSave: 3,
    rePvPens: 1,
    rpPvPens: 1,
  },
  karin: {
    r: 2,
    g: 2,
    ageNow: 30,
    ageRet: 67,
    ageLife: 95,
    income: 1800,
    s: 5,
    tax: 20,
    pensionMonthly: 1908,
    zBad: -1.645,
    bankK: 5,
    reBank: 0,
    rpBank: 0,
    pensionAssetK: 0,
    rePensionAsset: 0,
    rpPensionAsset: 0,
    secK: 0,
    reSec: 0,
    rpSec: 0,
    immoK: 0,
    reImmo: 0,
    rpImmo: 0,
    debtK: 0,
    reDebt: 0,
    rpDebt: 0,
    rePvSave: 1,
    rpPvSave: 2,
    rePvPens: 1,
    rpPvPens: 1,
  },
  armin: {
    r: 2,
    g: 2,
    ageNow: 40,
    ageRet: 67,
    ageLife: 90,
    income: 6400,
    s: 25,
    tax: 35,
    pensionMonthly: 3925,
    zBad: -1.405,
    bankK: 125,
    reBank: 0,
    rpBank: 0,
    pensionAssetK: 40,
    rePensionAsset: 2,
    rpPensionAsset: 1,
    secK: 140,
    reSec: 4,
    rpSec: 3.5,
    immoK: 0,
    reImmo: 0,
    rpImmo: 0,
    debtK: 0,
    reDebt: 0,
    rpDebt: 0,
    rePvSave: 2,
    rpPvSave: 3.5,
    rePvPens: 1.5,
    rpPvPens: 1,
  },
  benno: {
    r: 2,
    g: 2,
    ageNow: 55,
    ageRet: 64,
    ageLife: 90,
    income: 58333.3333,
    s: 30,
    tax: 40,
    pensionMonthly: 3150,
    zBad: -0.706,
    bankK: 200,
    reBank: 0,
    rpBank: 0,
    pensionAssetK: 220,
    rePensionAsset: 2,
    rpPensionAsset: 1,
    secK: 2500,
    reSec: 7,
    rpSec: 4,
    immoK: 5500,
    reImmo: 2.5,
    rpImmo: 3,
    debtK: -2000,
    reDebt: 0,
    rpDebt: 1.5,
    rePvSave: 1,
    rpPvSave: 4,
    rePvPens: 1,
    rpPvPens: 1,
  },
  frank: {
    r: 2,
    g: 2,
    ageNow: 60,
    ageRet: 67,
    ageLife: 90,
    income: 6200,
    s: 12,
    tax: 35,
    pensionMonthly: 8309,
    zBad: -0.706,
    bankK: 210,
    reBank: 0,
    rpBank: 0,
    pensionAssetK: 0,
    rePensionAsset: 0,
    rpPensionAsset: 0,
    secK: 0,
    reSec: 0,
    rpSec: 0,
    immoK: 0,
    reImmo: 0,
    rpImmo: 0,
    debtK: 0,
    reDebt: 0,
    rpDebt: 0,
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
  return x.toFixed(1);
}

export default function RentenprognosePage() {
  const { t } = useTranslations();
  const [state, setState] = useState<State>(USER_DEFAULTS);
  // Track which fields are being edited (to allow empty display)
  const [editingFields, setEditingFields] = useState<Record<string, string>>(
    {},
  );

  const updateField = (field: keyof State, rawValue: string) => {
    // Store raw value for display during editing
    setEditingFields((prev) => ({ ...prev, [field]: rawValue }));
    // Parse for calculations (empty = 0)
    const value = rawValue === '' ? 0 : parseFloat(rawValue);
    if (!isNaN(value)) {
      setState((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Get display value - show editing value if active, otherwise numeric state
  const getDisplayValue = (field: keyof State) => {
    if (field in editingFields) {
      return editingFields[field];
    }
    return state[field];
  };

  // On blur, clear editing state to show formatted number
  const handleBlur = (field: keyof State) => {
    setEditingFields((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // Auto-select input content on focus for better UX
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const { results, errors } = useMemo(() => {
    const nWork = state.ageRet - state.ageNow;
    const nRet = state.ageLife - state.ageRet;

    const newErrors: string[] = [];
    if (nWork <= 0) newErrors.push(t('rentenprognose.status.error_age'));
    if (nRet <= 0) newErrors.push(t('rentenprognose.status.error_life'));
    if (!isFinite(state.tax / 100) || state.tax < 0 || state.tax > 100)
      newErrors.push(t('rentenprognose.status.error_tax'));
    if (!isFinite(state.zBad))
      newErrors.push(t('rentenprognose.status.error_z'));

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

    // Wealth at retirement
    const wealthAtRet = totalToday * Math.pow(1 + r + rpWeighted, nWork);
    const grossRetMonthly = 1000 * (wealthAtRet / (nRet * 12));

    // Net calculations
    const netMid = ((1 - tax) * grossRetMonthly) / Math.pow(1 + r, nWork);
    const netBad = 1000 * (1 - tax) * (totalToday / nRet / 12);

    const expensesToday = state.income * (1 - s);
    const netMidPct =
      expensesToday !== 0 ? (netMid / expensesToday) * 100 : NaN;
    const netBadPct =
      expensesToday !== 0 ? (netBad / expensesToday) * 100 : NaN;

    const probBad = normSDist(state.zBad) * 100;

    return {
      results: {
        pvSave,
        pvPens,
        totalToday,
        reToday,
        rpWeighted: rpWeighted * 100,
        netMid,
        netMidPct,
        netBad,
        netBadPct,
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
                step='0.5'
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
                step='0.5'
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

          <StandaloneField>
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
          </StandaloneField>

          <TwoCol>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.net_income')}</Label>
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.net_income')}</Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='50'
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
                type='number'
                step='50'
                value={getDisplayValue('pensionMonthly')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('pensionMonthly')}
                onChange={(e) => updateField('pensionMonthly', e.target.value)}
              />
            </Field>
          </TwoCol>

          <TwoCol>
            <Field>
              <LabelRow>
                <Label>{t('rentenprognose.inputs.z_value')}</Label>
                <InfoButton>
                  i<Tooltip>{t('rentenprognose.tooltips.z_value')}</Tooltip>
                </InfoButton>
              </LabelRow>
              <Input
                type='number'
                step='0.01'
                value={getDisplayValue('zBad')}
                onFocus={handleFocus}
                onBlur={() => handleBlur('zBad')}
                onChange={(e) => updateField('zBad', e.target.value)}
              />
            </Field>
          </TwoCol>

          <SubTitle>{t('rentenprognose.sections.wealth_overview')}</SubTitle>
          <Callout>
            <Table>
              <Thead>
                <tr>
                  <th style={{ width: '40%' }}>
                    {t('rentenprognose.columns.position')}
                  </th>
                  <th style={{ width: '20%' }}>
                    {t('rentenprognose.columns.amount')}
                  </th>
                  <th style={{ width: '20%' }}>
                    {t('rentenprognose.columns.risk_units')}
                  </th>
                  <th style={{ width: '20%' }}>
                    {t('rentenprognose.columns.risk_premium')}
                  </th>
                </tr>
              </Thead>
              <Tbody>
                <tr>
                  <td>
                    <RowTitle>
                      <span>
                        {t('rentenprognose.wealth_items.bank_accounts')}
                      </span>
                      <InfoButton>
                        i
                        <Tooltip>
                          {t('rentenprognose.tooltips.bank_accounts')}
                        </Tooltip>
                      </InfoButton>
                    </RowTitle>
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='5'
                      value={getDisplayValue('bankK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('bankK')}
                      onChange={(e) => updateField('bankK', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('reBank')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('reBank')}
                      onChange={(e) => updateField('reBank', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpBank')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpBank')}
                      onChange={(e) => updateField('rpBank', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <RowTitle>
                      <span>
                        {t('rentenprognose.wealth_items.pension_assets')}
                      </span>
                      <InfoButton>
                        i
                        <Tooltip>
                          {t('rentenprognose.tooltips.pension_assets')}
                        </Tooltip>
                      </InfoButton>
                    </RowTitle>
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='5'
                      value={getDisplayValue('pensionAssetK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('pensionAssetK')}
                      onChange={(e) =>
                        updateField('pensionAssetK', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rePensionAsset')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rePensionAsset')}
                      onChange={(e) =>
                        updateField('rePensionAsset', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpPensionAsset')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpPensionAsset')}
                      onChange={(e) =>
                        updateField('rpPensionAsset', e.target.value)
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <RowTitle>
                      <span>{t('rentenprognose.wealth_items.securities')}</span>
                      <InfoButton>
                        i
                        <Tooltip>
                          {t('rentenprognose.tooltips.securities')}
                        </Tooltip>
                      </InfoButton>
                    </RowTitle>
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='5'
                      value={getDisplayValue('secK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('secK')}
                      onChange={(e) => updateField('secK', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('reSec')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('reSec')}
                      onChange={(e) => updateField('reSec', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpSec')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpSec')}
                      onChange={(e) => updateField('rpSec', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <RowTitle>
                      <span>
                        {t('rentenprognose.wealth_items.real_estate')}
                      </span>
                      <InfoButton>
                        i
                        <Tooltip>
                          {t('rentenprognose.tooltips.real_estate')}
                        </Tooltip>
                      </InfoButton>
                    </RowTitle>
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='5'
                      value={getDisplayValue('immoK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('immoK')}
                      onChange={(e) => updateField('immoK', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('reImmo')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('reImmo')}
                      onChange={(e) => updateField('reImmo', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpImmo')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpImmo')}
                      onChange={(e) => updateField('rpImmo', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <RowTitle>
                      <span>{t('rentenprognose.wealth_items.debt')}</span>
                      <InfoButton>
                        i<Tooltip>{t('rentenprognose.tooltips.debt')}</Tooltip>
                      </InfoButton>
                    </RowTitle>
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='5'
                      value={getDisplayValue('debtK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('debtK')}
                      onChange={(e) => updateField('debtK', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('reDebt')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('reDebt')}
                      onChange={(e) => updateField('reDebt', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpDebt')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpDebt')}
                      onChange={(e) => updateField('rpDebt', e.target.value)}
                    />
                  </td>
                </tr>
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
                      type='number'
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
                      onChange={(e) => updateField('rePvSave', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpPvSave')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpPvSave')}
                      onChange={(e) => updateField('rpPvSave', e.target.value)}
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
                      type='number'
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
                      onChange={(e) => updateField('rePvPens', e.target.value)}
                    />
                  </td>
                  <td>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpPvPens')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpPvPens')}
                      onChange={(e) => updateField('rpPvPens', e.target.value)}
                    />
                  </td>
                </tr>
              </Tbody>
            </Table>

            {/* Mobile card layout */}
            <MobileWealthCards>
              <MobileWealthCard>
                <MobileWealthHeader>
                  <span>{t('rentenprognose.wealth_items.bank_accounts')}</span>
                  <InfoButton>
                    i
                    <Tooltip>
                      {t('rentenprognose.tooltips.bank_accounts')}
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
                      value={getDisplayValue('bankK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('bankK')}
                      onChange={(e) => updateField('bankK', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_units')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('reBank')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('reBank')}
                      onChange={(e) => updateField('reBank', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_premium')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpBank')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpBank')}
                      onChange={(e) => updateField('rpBank', e.target.value)}
                    />
                  </MobileWealthField>
                </MobileWealthFields>
              </MobileWealthCard>

              <MobileWealthCard>
                <MobileWealthHeader>
                  <span>{t('rentenprognose.wealth_items.pension_assets')}</span>
                  <InfoButton>
                    i
                    <Tooltip>
                      {t('rentenprognose.tooltips.pension_assets')}
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
                      value={getDisplayValue('pensionAssetK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('pensionAssetK')}
                      onChange={(e) =>
                        updateField('pensionAssetK', e.target.value)
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
                      value={getDisplayValue('rePensionAsset')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rePensionAsset')}
                      onChange={(e) =>
                        updateField('rePensionAsset', e.target.value)
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
                      value={getDisplayValue('rpPensionAsset')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpPensionAsset')}
                      onChange={(e) =>
                        updateField('rpPensionAsset', e.target.value)
                      }
                    />
                  </MobileWealthField>
                </MobileWealthFields>
              </MobileWealthCard>

              <MobileWealthCard>
                <MobileWealthHeader>
                  <span>{t('rentenprognose.wealth_items.securities')}</span>
                  <InfoButton>
                    i
                    <Tooltip>{t('rentenprognose.tooltips.securities')}</Tooltip>
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
                      value={getDisplayValue('secK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('secK')}
                      onChange={(e) => updateField('secK', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_units')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('reSec')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('reSec')}
                      onChange={(e) => updateField('reSec', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_premium')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpSec')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpSec')}
                      onChange={(e) => updateField('rpSec', e.target.value)}
                    />
                  </MobileWealthField>
                </MobileWealthFields>
              </MobileWealthCard>

              <MobileWealthCard>
                <MobileWealthHeader>
                  <span>{t('rentenprognose.wealth_items.real_estate')}</span>
                  <InfoButton>
                    i
                    <Tooltip>
                      {t('rentenprognose.tooltips.real_estate')}
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
                      value={getDisplayValue('immoK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('immoK')}
                      onChange={(e) => updateField('immoK', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_units')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('reImmo')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('reImmo')}
                      onChange={(e) => updateField('reImmo', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_premium')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpImmo')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpImmo')}
                      onChange={(e) => updateField('rpImmo', e.target.value)}
                    />
                  </MobileWealthField>
                </MobileWealthFields>
              </MobileWealthCard>

              <MobileWealthCard>
                <MobileWealthHeader>
                  <span>{t('rentenprognose.wealth_items.debt')}</span>
                  <InfoButton>
                    i<Tooltip>{t('rentenprognose.tooltips.debt')}</Tooltip>
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
                      value={getDisplayValue('debtK')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('debtK')}
                      onChange={(e) => updateField('debtK', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_units')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('reDebt')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('reDebt')}
                      onChange={(e) => updateField('reDebt', e.target.value)}
                    />
                  </MobileWealthField>
                  <MobileWealthField>
                    <MobileFieldLabel>
                      {t('rentenprognose.columns.risk_premium')}
                    </MobileFieldLabel>
                    <TableInput
                      type='number'
                      step='0.5'
                      value={getDisplayValue('rpDebt')}
                      onFocus={handleFocus}
                      onBlur={() => handleBlur('rpDebt')}
                      onChange={(e) => updateField('rpDebt', e.target.value)}
                    />
                  </MobileWealthField>
                </MobileWealthFields>
              </MobileWealthCard>

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
                      type='number'
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
                      type='number'
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

        <Card>
          <SectionTitle>{t('rentenprognose.sections.results')}</SectionTitle>

          <KPI>
            <KPILabel>
              {t('rentenprognose.results_labels.total_wealth')}
            </KPILabel>
            <KPIValue>{results ? formatInt(results.totalToday) : '—'}</KPIValue>
          </KPI>

          <KPI>
            <KPILabel>{t('rentenprognose.results_labels.risk_units')}</KPILabel>
            <KPIValue>{results ? formatOneDec(results.reToday) : '—'}</KPIValue>
          </KPI>

          <KPI>
            <KPILabel>
              {t('rentenprognose.results_labels.risk_premium')}
            </KPILabel>
            <KPIValue>
              {results ? `${formatOneDec(results.rpWeighted)} %` : '—'}
            </KPIValue>
          </KPI>

          <KPI>
            <KPILabel>{t('rentenprognose.results_labels.net_mid')}</KPILabel>
            <KPIValue>{results ? formatEuro(results.netMid) : '—'}</KPIValue>
          </KPI>

          <KPI>
            <KPILabel>
              {t('rentenprognose.results_labels.net_mid_pct')}
            </KPILabel>
            <KPIValue>
              {results && isFinite(results.netMidPct)
                ? `${formatOneDec(results.netMidPct)} %`
                : '—'}
            </KPIValue>
          </KPI>

          <KPI>
            <KPILabel>{t('rentenprognose.results_labels.net_bad')}</KPILabel>
            <KPIValue>{results ? formatEuro(results.netBad) : '—'}</KPIValue>
          </KPI>

          <KPI>
            <KPILabel>
              {t('rentenprognose.results_labels.net_bad_pct')}
            </KPILabel>
            <KPIValue>
              {results && isFinite(results.netBadPct)
                ? `${formatOneDec(results.netBadPct)} %`
                : '—'}
            </KPIValue>
          </KPI>

          <KPI>
            <KPILabel>
              {t('rentenprognose.results_labels.probability_bad')}
            </KPILabel>
            <KPIValue>
              {results ? `${formatOneDec(results.probBad)} %` : '—'}
            </KPIValue>
          </KPI>
        </Card>
      </Grid>

      <ExplanationSection>
        <ExplanationTitle>
          {t('rentenprognose.explanation_title')}
        </ExplanationTitle>
        <ExplanationText>{t('rentenprognose.explanation')}</ExplanationText>
      </ExplanationSection>
    </PageLayout>
  );
}
