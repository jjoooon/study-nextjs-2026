'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { ZoomInIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';

import AIChatBot from './AIChatBot';

type AsideFootDataTotal = {
  insGen: number | boolean;
  paymentAmount: number;
  point: number;
};

type AsideFootProps = {
  dataTotal?: AsideFootDataTotal;
};

const DEFAULT_DATA_TOTAL: AsideFootDataTotal = {
  insGen: false,
  paymentAmount: 0,
  point: 0,
};

export function AsideFoot({ dataTotal }: AsideFootProps) {
  const resolvedDataTotal = dataTotal ?? DEFAULT_DATA_TOTAL;
  const paymentAmountText = resolvedDataTotal.paymentAmount.toLocaleString('ko-KR');
  const pointText = resolvedDataTotal.point.toLocaleString('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Gcol className="w-full pb-1.5 relative">
      {resolvedDataTotal.insGen !== false && (
        <Grow
          placement={'bwc'}
          className="rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] py-2 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)] absolute bottom-[calc(100%+0.4rem)] left-0 bg-[var(--color-gray-0)]"
        >
          <Checkbox variant={'button'}>4세대</Checkbox>
          <Grow className="gap-[0.2rem]">
            <Typo variant={'amount-md'} color={'primary'}>
              {resolvedDataTotal.insGen}
            </Typo>
            <Typo variant={'heading-md'}>원</Typo>
          </Grow>
        </Grow>
      )}

      <Gcol className="w-full rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] py-2 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)] bg-[var(--color-gray-0)]">
        <Grow placement={'bwc'}>
          <Typo variant={'heading-md'}>납입보험료</Typo>
          <Grow className="gap-[0.2rem]">
            <Typo variant={'amount-md'} color={'primary'}>
              {paymentAmountText}
            </Typo>
            <Typo variant={'heading-md'}>원</Typo>
          </Grow>
        </Grow>
        <Grow placement={'bwc'}>
          <Typo variant={'heading-xs'} color={'gray-light'}>
            청약포인트
          </Typo>
          <Grow className="gap-[0.2rem]">
            <Typo variant={'amount-xs'} color={'information'}>
              {pointText}
            </Typo>
            <Typo variant={'heading-xs'}>P</Typo>
          </Grow>
        </Grow>
      </Gcol>
      <Grow className="[&>button]:flex-1 [&>button]:w-full" placement={'bwc'}>
        <Button variant={'outlined'} color={'secondary'} size={'lg'} className="flex-1 justify-between!">
          제안서
          <ZoomInIcon color={'var(--color-secondary-50)'} />
        </Button>
        <Button variant={'outlined'} color={'secondary'} size={'lg'} className="flex-1 justify-between!">
          출력
          <ZoomInIcon color={'var(--color-secondary-50)'} />
        </Button>
        <AIChatBot />
      </Grow>
    </Gcol>
  );
}
