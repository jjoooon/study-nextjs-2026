/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol } from '@atoms';
import { AsideFootButtonGroup } from './AsideFootButtonGroup';
import { AsideFootSummary } from './AsideFootSummary';

/**
 * 사이드 하단 영역 컴포넌트.
 *
 * @props
 * `dataTotal` - AsideFootSummary에 전달할 집계 데이터
 * `viewKey` - 화면 모드 키(AsideFootSummary가 일부 모드에서 4세대 영역을 숨김)
 */
export type AsideFootProps = {
  dataTotal?: AsideFootDataTotal;
  viewKey?: string;
};

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

export function AsideFoot({ dataTotal, viewKey }: AsideFootProps) {
  return (
    // 전체 하단 영역 컨테이너
    <Gcol className="w-full pb-1.5 relative">
      {/*
        4세대 표시 영역
        - 특정 뷰(`view3`, `view4`, `view5`)에서는 요구사항에 따라 숨김 처리
        - 하단 요약 카드 상단에 absolute 배치
      */}
      <AsideFootSummary dataTotal={dataTotal} viewKey={viewKey} />

      {/*
        액션 버튼 영역
        - 제안서 버튼
        - 출력 버튼(팝오버 메뉴 포함)
        - Ltpa120 팝업 트리거 컴포넌트
      */}
      <AsideFootButtonGroup />
    </Gcol>
  );
}
