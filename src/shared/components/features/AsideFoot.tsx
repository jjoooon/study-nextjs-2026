/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grid, Grow, Typo } from '@atoms';
import { PlusIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import Ltpa120 from '@features/Ltpa120';

/**
 * 사이드 하단 요약 영역에서 사용하는 집계 데이터 타입.
 *
 * - `insGen`: 4세대 관련 금액/표시값
 *   - number: 금액으로 렌더링
 *   - boolean: 값 존재 여부(백엔드/상위 로직 표현값) 그대로 전달
 * - `paymentAmount`: 납입보험료(원)
 * - `point`: 청약포인트(P)
 */
export type AsideFootDataTotal = {
  insGen: number | boolean;
  paymentAmount: number;
  point: number;
};

/**
 * AsideFoot 컴포넌트 입력 props.
 *
 * - `dataTotal`: 하단 요약 카드에 표시할 집계 데이터
 * - `viewKey`: 화면 모드 키(일부 모드에서 상단 4세대 영역을 숨김)
 */
export type AsideFootProps = {
  dataTotal?: AsideFootDataTotal;
  viewKey?: string;
};

/**
 * `dataTotal` 미전달 시 사용되는 안전한 기본값.
 * 숫자 포맷팅/연산 시 `undefined` 접근을 방지한다.
 */
const DEFAULT_DATA_TOTAL: AsideFootDataTotal = {
  insGen: false,
  paymentAmount: 0,
  point: 0,
};

export function AsideFoot({ dataTotal, viewKey }: AsideFootProps) {
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
    // 전체 하단 영역 컨테이너
    <Gcol className="w-full pb-1.5 relative">
      {/*
        4세대 표시 영역
        - 특정 뷰(`view3`, `view4`, `view5`)에서는 요구사항에 따라 숨김 처리
        - 하단 요약 카드 상단에 absolute 배치
      */}
      {viewKey !== 'view3' && viewKey !== 'view4' && viewKey !== 'view5' && (
        <Grow
          placement={'bwc'}
          className="rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] min-h-[4.1rem] shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)] absolute bottom-[calc(100%+0.4rem)] left-0 bg-[var(--color-gray-0)]"
        >
          <Checkbox variant={'button'}>4세대</Checkbox>
          <Grow>
            <Button variant={'none'} className="px-0">
              <Typo variant={'amount-md'}>{insGenText}</Typo>
              <Typo variant={'heading-md'}>원</Typo>
            </Button>
          </Grow>
        </Grow>
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

      {/*
        액션 버튼 영역
        - 제안서 버튼
        - 출력 버튼(팝오버 메뉴 포함)
        - Ltpa120 팝업 트리거 컴포넌트
      */}
      <Grow className="[&>button]:flex-1 [&>button]:w-full" placement={'bwc'}>
        <Button variant={'outlined'} color={'gray'} size={'lg'}>
          제안서
          <PlusIcon />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outlined'} color={'gray'} size={'lg'}>
              출력
              <PlusIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
            <Grid className="w-full grid-cols-[1fr] gap-1">
              <Button variant={'outlined'} color={'gray'} size={'lg'}>
                출력물 공통팝업
              </Button>
              {/* 아래 버튼들은 출력물 종류 선택 항목 */}
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

        <Ltpa120 />
      </Grow>
    </Gcol>
  );
}
