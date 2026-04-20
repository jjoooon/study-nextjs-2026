'use client';

import { Gcol, Grow, Typo, Grid } from '@atoms';
import { PlusIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';

import AIChatBot from './AIChatBot';

type AsideFootDataTotal = {
  insGen: number | boolean;
  paymentAmount: number;
  point: number;
};

type AsideFootProps = {
  dataTotal?: AsideFootDataTotal;
  viewKey?: string;
};

const DEFAULT_DATA_TOTAL: AsideFootDataTotal = {
  insGen: false,
  paymentAmount: 0,
  point: 0,
};

export function AsideFoot({ dataTotal, viewKey }: AsideFootProps) {
  const resolvedDataTotal = dataTotal ?? DEFAULT_DATA_TOTAL;
  const paymentAmountText = resolvedDataTotal.paymentAmount.toLocaleString('ko-KR');
  const pointText = resolvedDataTotal.point.toLocaleString('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Gcol className="w-full pb-1.5 relative">
      {viewKey !== 'view3' && viewKey !== 'view4' && viewKey !== 'view5' && (
        <Grow
          placement={'bwc'}
          className="rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] py-2 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)] absolute bottom-[calc(100%+0.4rem)] left-0 bg-[var(--color-gray-0)]"
        >
          <Checkbox variant={'button'}>4세대</Checkbox>
          <Grow>
            <Button variant={'none'}>
              <Typo variant={'amount-md'}>{resolvedDataTotal.insGen}</Typo>
              <Typo variant={'heading-md'}>원</Typo>
            </Button>
          </Grow>
        </Grow>
      )}

      <Gcol className="w-full rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] py-2 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)] bg-[var(--color-gray-0)]">
        <Grow placement={'bwc'}>
          <Typo variant={'body-sm'} weight={'bold'}>
            납입보험료
          </Typo>
          <Grow>
            <Button variant={'none'}>
              <Typo variant={'amount-md'} color={'primary'}>
                {paymentAmountText}
              </Typo>
              <Typo variant={'heading-md'}>원</Typo>
            </Button>
          </Grow>
        </Grow>
        <Grow placement={'bwc'}>
          <Typo variant={'heading-xs'} color={'gray-light'}>
            청약포인트
          </Typo>
          <Grow>
            <Button variant={'none'}>
              <Typo variant={'amount-xs'} color={'information'}>
                {pointText}
              </Typo>
              <Typo variant={'heading-xs'}>P</Typo>
            </Button>
          </Grow>
        </Grow>
      </Gcol>
      <Grow className="[&>button]:flex-1 [&>button]:w-full" placement={'bwc'}>
        {/* M1. color={'gray'} 수정, className삭제 */}
        <Button variant={'outlined'} color={'gray'} size={'lg'} >
          제안서
          <PlusIcon color={'var(--color-secondary-50)'} />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            {/* M1. color={'gray'} 수정, className삭제 */}
            <Button variant={'outlined'} color={'gray'} size={'lg'} >
              출력
              <PlusIcon color={'var(--color-secondary-50)'} />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
            <Grid className="w-full grid-cols-[1fr] gap-1">
              <Button variant={'outlined'} color={'gray'} size={'lg'}>
                출력물 공통팝업
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'lg'}>
                설계요약서
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'lg'}>
                가입제안서
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'lg'}>
                상품설명서
              </Button>
            </Grid>
          </PopoverContent>
        </Popover>

        <AIChatBot />
      </Grow>
    </Gcol>
  );
}
