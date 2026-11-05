/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import type { TooltipFetchParams } from '@/shared/components/grid/CellRenderers';

/**
 * 툴팁 데이터 맵 타입
 * - key: 기준 담보 ID (예: 4, 3, 7) 또는 그룹 경로 문자열 (예: 'set-46')
 * - value: 문자열(단일 메시지) 또는 자식 담보 ID/경우별 메시지 매핑 객체
 */
export type TooltipDataMap = Record<string | number, string | Record<string | number, string>>;

/**
 * [외부 데이터 샘플] 기준담보 및 자식 담보별 툴팁 메시지 데이터
 * - 클릭한 자식 행(세부 담보) 및 상황에 따라 서로 다른 안내 문구를 동적으로 적용합니다.
 */
export const sampleTooltipData: TooltipDataMap = {
  // 1) 4대유사암 그룹 (Ltpa35002a - 기준담보 id: 4)
  4: {
    default: '4대유사암 가입금액을 변경하세요.',
    5: '기타피부암은 4대유사암 기준금액의 20% 이내로만 설정할 수 있습니다.', // id: 5 (기타피부암) 클릭 시
    6: '제자리암 보장 한도는 4대유사암 가입금액에 연동되어 변경됩니다.', // id: 6 (제자리암) 클릭 시
    7: '경계성종양은 4대유사암 기준금액을 먼저 증액해야 합니다.', // id: 7 (경계성종양) 클릭 시
    8: '갑상선암 가입금액은 4대유사암 기준금액을 초과할 수 없습니다.', // id: 8 (갑상선암) 클릭 시
  },

  // 2) 유방암 그룹 (Ltpa35002b - 기준담보 id: 3)
  3: {
    default: '유방암 기준담보 금액을 먼저 확인해 주세요.',
    4: '유방암 A타입은 기준담보 금액과 1:1로 동일하게 연동됩니다.', // id: 4 (A타입) 클릭 시
    5: '유방암 B타입은 기준담보 금액 범위 내에서만 선택 가능합니다.', // id: 5 (B타입) 클릭 시
  },

  // 3) 주요순환계질환 그룹 (Ltpa35002b - 기준담보 id: 7)
  7: {
    default: '주요순환계질환 기준금액을 변경하세요.',
    8: '혈전제거술 담보는 수술 기준담보의 가입금액에 연동됩니다.', // id: 8 클릭 시
  },
};

/**
 * [조건부 툴팁 리졸버 함수 샘플]
 * - 외부에서 특정 로직(금액, 권한, 상태 등)에 따라 동적으로 메시지를 결정할 때 사용
 */
export function sampleTooltipResolver<
  TClicked extends { id?: number | string; title?: unknown },
  TTarget extends { id?: number | string; isStandard?: { msg?: string } },
>(clickedRow: TClicked, targetRow: TTarget, tooltipMap: TooltipDataMap = sampleTooltipData): string | undefined {
  const targetId = targetRow.id;
  const clickedId = clickedRow.id;

  if (targetId !== undefined && tooltipMap[targetId]) {
    const item = tooltipMap[targetId];
    if (typeof item === 'string') {
      return item;
    }
    if (typeof item === 'object') {
      if (clickedId !== undefined && item[clickedId]) {
        return item[clickedId];
      }
      if (typeof clickedRow.title === 'string' && item[clickedRow.title]) {
        return item[clickedRow.title];
      }
      return item.default;
    }
  }

  return targetRow.isStandard?.msg;
}

/**
 * [비동기 서버 API 시뮬레이션 콜백 샘플]
 * - 이벤트(클릭) 발생 시 서버로 클릭한 행, 기준 담보 등의 정보를 보내 실시간으로 문구를 받아오는 상황
 * - 개발자가 업무 로직/API 명세에 맞게 비동기(Promise) 또는 동기 조건 분기를 작성할 수 있습니다.
 */
export async function fetchTooltipMessageFromServer<
  T extends { id?: number | string; title?: unknown; isStandard?: { msg?: string } },
>({ clickedRow, targetRow }: TooltipFetchParams<T>): Promise<string | undefined> {
  // 실제 환경 예시:
  // const res = await axios.get('/api/tooltip', { params: { clickedId: clickedRow.id, targetId: targetRow.id } });
  // return res.data.message;

  // 비동기 네트워크 지연(150ms) 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 150));

  // 1) 특정 기준 담보(targetRow) 및 클릭한 하위 담보(clickedRow) 조건에 따른 분기
  const targetId = targetRow.id;
  const clickedId = clickedRow.id;

  if (targetId === 4) {
    // 4대유사암 그룹
    if (clickedId === 5) {
      return '[서버 실시간 조회] 기타피부암은 4대유사암 기준금액의 20% 이내로만 설정할 수 있습니다.';
    }
    if (clickedId === 6) {
      return '[서버 실시간 조회] 제자리암 보장 한도는 4대유사암 가입금액에 연동되어 변경됩니다.';
    }
    if (clickedId === 7) {
      return '[서버 실시간 조회] 경계성종양은 4대유사암 기준금액을 먼저 증액해야 합니다.';
    }
    if (clickedId === 8) {
      return '[서버 실시간 조회] 갑상선암 가입금액은 4대유사암 기준금액을 초과할 수 없습니다.';
    }
    return '[서버 실시간 조회] 4대유사암 가입금액을 변경하세요.';
  }

  if (targetId === 3) {
    // 유방암 그룹
    return `[서버 실시간 조회] ${String(clickedRow.title ?? '')}은(는) 유방암 기준담보 금액과 연동됩니다.`;
  }

  // 2) 등록된 맵 데이터가 있으면 리턴
  const localMsg = sampleTooltipResolver(clickedRow, targetRow);
  if (localMsg) {
    return `[서버 실시간 조회] ${localMsg}`;
  }

  return targetRow.isStandard?.msg ?? '기준 담보 가입금액을 확인해 주세요.';
}
