'use client';

import styled from 'styled-components';
import Link from 'next/link';
import AppColors from '@/constants/AppColors';
import AppFontSizes from '@/constants/AppFontSizes';

const ChipLink = styled(Link)<{ $color: string; $bgColor: string; $hoverBg: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 12px;
  background: ${props => props.$bgColor};
  color: ${props => props.$color};
  font-size: ${AppFontSizes.base};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    background: ${props => props.$hoverBg};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

interface NavigationChipProps {
  href: string;
  label: string;
  variant?: 'blue' | 'green' | 'orange' | 'violet';
}

const colorVariants = {
  blue: {
    color: AppColors.brand.neutral[0],
    bgColor: AppColors.brand.blue[90],
    hoverBg: AppColors.brand.blue[80],
  },
  green: {
    color: AppColors.brand.neutral[0],
    bgColor: AppColors.brand.green[90],
    hoverBg: AppColors.brand.green[80],
  },
  orange: {
    color: AppColors.brand.neutral[0],
    bgColor: AppColors.brand.orange[90],
    hoverBg: AppColors.brand.orange[80],
  },
  violet: {
    color: AppColors.brand.neutral[0],
    bgColor: AppColors.brand.violet[90],
    hoverBg: AppColors.brand.violet[80],
  },
};

export default function NavigationChip({ href, label, variant = 'blue' }: NavigationChipProps) {
  const colors = colorVariants[variant];

  return (
    <ChipLink
      href={href}
      $color={colors.color}
      $bgColor={colors.bgColor}
      $hoverBg={colors.hoverBg}
    >
      {label}
    </ChipLink>
  );
}
