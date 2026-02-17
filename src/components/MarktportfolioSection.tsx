'use client';

import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';
import { useTranslations } from '@/contexts/TranslationProvider';

const MOBILE_BREAKPOINT = 768;

const Section = styled.section`
  width: 100%;
  max-width: 900px;
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

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media (min-width: ${MOBILE_BREAKPOINT}px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const ChartWrapper = styled.div`
  width: 280px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 240px;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: ${AppColors.white};
  border-radius: 10px;
  min-width: 200px;
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background-color: ${props => props.$color};
  flex-shrink: 0;
`;

const LegendLabel = styled.span`
  font-size: ${AppFontSizes.sm};
  color: ${AppColors.brand.neutral[10]};
  flex: 1;
`;

const LegendValue = styled.span`
  font-size: ${AppFontSizes.sm};
  font-weight: 700;
  color: ${AppColors.brand.neutral.neutralBlack};
`;

const SourceText = styled.p`
  font-size: ${AppFontSizes.xs};
  color: ${AppColors.brand.neutral[50]};
  text-align: center;
  margin-top: 24px;
  font-style: italic;
`;

const COLORS = [
  AppColors.brand.blue[50],
  AppColors.brand.green[50],
  AppColors.brand.orange[60],
  AppColors.brand.violet[50],
  AppColors.brand.red[50],
];

const CHART_KEYS = ['aktien', 'anleihen', 'gold', 'private_equity', 'bitcoin'] as const;

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: AppColors.white,
        padding: '10px 14px',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        border: `1px solid ${AppColors.brand.neutral[80]}`,
      }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>{payload[0].name}</p>
        <p style={{ margin: '4px 0 0 0', color: AppColors.brand.neutral[40], fontSize: '14px' }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function MarktportfolioSection() {
  const { t } = useTranslations();

  const translatedData = CHART_KEYS.map(key => ({
    name: t(`marktportfolio.chart.${key}.label`),
    value: parseInt(t(`marktportfolio.chart.${key}.value`), 10) || 0,
  }));

  return (
    <Section>
      <SectionTitle>{t('marktportfolio.title')}</SectionTitle>
      <SectionDescription>{t('marktportfolio.description')}</SectionDescription>

      <ChartContainer>
        <ChartWrapper>
          <ResponsiveContainer width="100%" aspect={1}>
            <PieChart>
              <Pie
                data={translatedData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
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
    </Section>
  );
}
