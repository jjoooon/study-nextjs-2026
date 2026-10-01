/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { ArrowIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import type { AsideFootDataTotal, AsideFootProps } from './AsideFoot';

/**
 * `dataTotal` 미전달 시 사용되는 안전한 기본값.
 * 숫자 포맷팅/연산 시 `undefined` 접근을 방지한다.
 */
const DEFAULT_DATA_TOTAL: AsideFootDataTotal = {
  insGen: false,
  paymentAmount: 0,
  point: 0,
};

export function AsideFootSummary({ dataTotal, viewKey }: AsideFootProps) {
  // 상위에서 집계 데이터가 내려오지 않더라도 UI가 깨지지 않도록 기본값으로 정규화한다.
  const resolvedDataTotal = dataTotal ?? DEFAULT_DATA_TOTAL;

  // 납입보험료는 한국 로케일 기준 천 단위 구분기호를 적용해 가독성을 높인다.
  const paymentAmountText = resolvedDataTotal.paymentAmount.toLocaleString('ko-KR');

  // 청약포인트는 소수점 2자리 고정 포맷으로 표시한다(예: 12.30).
  const pointText = resolvedDataTotal.point.toLocaleString('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // `insGen`은 number | boolean 유니온 타입이므로 분기 처리한다.
  // - number: 금액 형식으로 변환
  // - boolean: 원본 값을 그대로 표시(기존 동작 유지)
  const insGenText =
    typeof resolvedDataTotal.insGen === 'number'
      ? resolvedDataTotal.insGen.toLocaleString('ko-KR')
      : resolvedDataTotal.insGen;

  return (
    <>
      {/*
        4세대 표시 영역
        - 특정 뷰(`view3`, `view4`, `view5`)에서는 요구사항에 따라 숨김 처리
        - 하단 요약 카드 상단에 absolute 배치
      */}
      {viewKey !== 'view3' && viewKey !== 'view4' && viewKey !== 'view5' && (
        <>
          <Gcol
            placement={'bwc'}
            className="rounded-[0.8rem] h-auto border border-[var(--color-gray-15)] px-[1rem] py-[0.8rem] min-h-[4.1rem] shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)] absolute bottom-[calc(100%+0.4rem)] left-0 bg-[var(--color-gray-0)]"
          >
            <Grow className="w-full" placement="bwc">
              <Checkbox variant={'button'} size="sm">
                <b>실손</b>(<span className="text-[1.1rem] truncate max-w-[4.8rem]">김박한화</span>)
              </Checkbox>
              <Grow>
                <Button variant={'none'} className="px-0">
                  <Typo variant={'amount-sm'}>900,000</Typo>
                  <Typo variant={'body-xs'}>원</Typo>
                </Button>
              </Grow>
            </Grow>

            <Grow className="text-[1.1rem]" placement="bwc">
              <Checkbox variant={'button'} size="sm">
                <b>간편실손</b>(<span className="text-[1.1rem] truncate max-w-[4.8rem]">김박한화김박한화김박한화</span>)
              </Checkbox>
              <Grow>
                <Button variant={'none'} className="px-0">
                  <Typo variant={'amount-sm'}>900,000</Typo>
                  <Typo variant={'body-xs'}>원</Typo>
                </Button>
              </Grow>
            </Grow>

            <Grow className="w-full" placement="bwc">
              <Button variant={'none'} className="px-0">
                변경연계설정(실손전환)
                <ArrowIcon color="var(--color-gray-60)" size={12} className="translate-y-[0.1rem] rotate-180" />
              </Button>
            </Grow>
          </Gcol>
        </>
      )}

      {/* 납입보험료 + 청약포인트 요약 카드 */}
      <Gcol
        className="w-full rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)] bg-[var(--color-gray-0)] min-h-[5.6rem]"
        gap={0}
        placement="cs"
      >
        <Grow placement={'bwc'}>
          <Typo variant={'body-sm'} weight={'bold'}>
            납입보험료
          </Typo>
          <Button variant={'none'} className="px-0">
            <Typo variant={'amount-md'} color={'primary'}>
              {paymentAmountText}
            </Typo>
            <Typo variant={'heading-md'}>원</Typo>
          </Button>
        </Grow>
        <Grow placement={'bwc'}>
          <Typo variant={'heading-xs'} color={'gray-light'}>
            청약포인트
          </Typo>
          <Button variant={'none'} className="px-0">
            <Typo variant={'amount-xs'} color={'information'}>
              {pointText}
            </Typo>
            <Typo variant={'heading-xs'}>P</Typo>
          </Button>
        </Grow>
      </Gcol>
    </>
  );
}
