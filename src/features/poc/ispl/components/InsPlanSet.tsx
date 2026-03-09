'use client';

import { FormCell, FormTable } from '@common/FormTable';
import { TableRow } from '@uiux/Table';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

interface InsPlanSetProps {
  selectedCategory: string;
  selectedAge: string;
  onCategoryChange: (value: string) => void;
  onAgeChange: (value: string) => void;
}

/**
 * 보험 플랜 설정 섹션
 */
export function InsPlanSet({ selectedCategory, selectedAge, onCategoryChange, onAgeChange }: InsPlanSetProps) {
  const productCategories = [
    { label: '전체', value: '0' },
    { label: '종합건강', value: '1' },
    { label: '간편', value: '2' },
    { label: '여성', value: '3' },
    { label: '암/간병', value: '4' },
    { label: '자녀/치아', value: '5' },
    { label: '상해', value: '6' },
    { label: '의료비', value: '7' },
    { label: '재물', value: '8' },
    { label: '연금/저축', value: '9' },
  ];
  const ageCategories = [
    { label: '전체', value: '전체' },
    { label: '0~14세', value: '0~14세' },
    { label: '15~24세', value: '15~24세' },
    { label: '25~59세', value: '25~59세' },
    { label: '60~65세', value: '60~65세' },
    { label: '66세 이상', value: '66세 이상' },
  ];

  return (
    <FormTable variant="setting" caption="상품,가입연령 검색테이블입니다." cols={['w-[10rem] min-w-[10rem]', '']}>
      <TableRow>
        <FormCell title="상품구분">
          <RadioGroup value={selectedCategory} onValueChange={onCategoryChange} className="gap-1">
            {productCategories.map((category) => (
              <RadioGroupItem key={category.value} variant="button" size="sm" value={category.value}>
                {category.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </FormCell>
      </TableRow>
      <TableRow>
        <FormCell title="가입연령">
          <RadioGroup value={selectedAge} onValueChange={onAgeChange} className="gap-1">
            {ageCategories.map((category) => (
              <RadioGroupItem key={category.value} variant="button" size="sm" value={category.value}>
                {category.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </FormCell>
      </TableRow>
    </FormTable>
  );
}
