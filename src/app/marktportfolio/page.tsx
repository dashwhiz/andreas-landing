'use client';

import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
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

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  margin-bottom: 40px;

  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const ChartWrapper = styled.div`
  width: 400px;
  height: 400px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 300px;
    height: 300px;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: ${AppColors.brand.neutral[100]};
  border-radius: 12px;
  min-width: 240px;
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${props => props.$color};
  flex-shrink: 0;
`;

const LegendLabel = styled.span`
  font-size: ${AppFontSizes.base};
  color: ${AppColors.brand.neutral[10]};
  flex: 1;
`;

const LegendValue = styled.span`
  font-size: ${AppFontSizes.base};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
`;

const SourceText = styled.p`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[40]};
  text-align: center;
  margin-top: 32px;
  font-style: italic;
`;

const COLORS = [
  AppColors.brand.blue[50],
  AppColors.brand.green[50],
  AppColors.brand.orange[60],
  AppColors.brand.violet[50],
  AppColors.brand.red[50],
];

interface ChartDataItem {
  name: string;
  value: number;
  labelKey: string;
}

const chartData: ChartDataItem[] = [
  { name: 'Aktien', value: 53, labelKey: 'chart.aktien' },
  { name: 'Anleihen', value: 37, labelKey: 'chart.anleihen' },
  { name: 'Gold', value: 6, labelKey: 'chart.gold' },
  { name: 'Private Equity', value: 2, labelKey: 'chart.private_equity' },
  { name: 'Bitcoin', value: 2, labelKey: 'chart.bitcoin' },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: AppColors.white,
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        border: `1px solid ${AppColors.brand.neutral[80]}`,
      }}>
        <p style={{ margin: 0, fontWeight: 600 }}>{payload[0].name}</p>
        <p style={{ margin: '4px 0 0 0', color: AppColors.brand.neutral[40] }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function MarktportfolioPage() {
  const { t } = useTranslations();

  const translatedData = chartData.map(item => ({
    ...item,
    name: t(`marktportfolio.${item.labelKey}`),
  }));

  return (
    <PageLayout>
      <PageTitle>{t('marktportfolio.title')}</PageTitle>
      <PageDescription>{t('marktportfolio.description')}</PageDescription>

      <ChartContainer>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={translatedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {translatedData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <Legend>
          {translatedData.map((item, index) => (
            <LegendItem key={index}>
              <LegendColor $color={COLORS[index]} />
              <LegendLabel>{item.name}</LegendLabel>
              <LegendValue>{item.value}%</LegendValue>
            </LegendItem>
          ))}
        </Legend>
      </ChartContainer>

      <SourceText>{t('marktportfolio.source')}</SourceText>
    </PageLayout>
  );
}
