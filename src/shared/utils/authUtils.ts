import { RootState } from '@/redux';
import log from '@/shared/utils/logger';
import { getStore } from './globalRegistry';

const logger = log.getLogger('AuthUtils');

// TODO: @YunJunmo 임시로 authSlice의 사번 사용; 추후 ncrm 연동 필요

/**
 * 인증 헤더 정보 타입
 *
 * @description
 * 시스템 간 통신에 필요한 인증 정보를 정의합니다.
 * 현재는 임시로 하드코딩된 값을 사용하지만,
 * 추후 세션 스토리지나 외부 인증 시스템과 연동할 예정입니다.
 */
interface Header {
  /** 트랜잭션 코드 */
  pfmTxCode: string;
  /** 글로벌 번호 */
  pfmGlobalNo: string;
  /** 직원 번호 */
  pfmStfno: string;
}

/**
 * 인증 헤더 값 조회
 *
 * @param key - 헤더 키
 * @returns 요청한 헤더 값
 */
export function getHeader(key: keyof Header): string {
  logger.debug('[AuthUtils] key: ', key);
  const store = getStore();
  const state = store.getState() as unknown as RootState;

  // TODO: @YunJunmo
  if (key === 'pfmStfno') {
    return state.auth.user?.employeeId ?? '';
  }

  return '';
}
