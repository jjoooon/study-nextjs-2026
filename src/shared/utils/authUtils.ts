import { BUTTON_AUTH } from '../constants/auth';
import { getStore } from './globalRegistry';
import { RootState } from '@/redux';
import log from '@/shared/utils/logger';

const logger = log.getLogger('AuthUtils');

// TODO: @YunJunmo 임시로 authSlice의 사번 사용; 추후 ncrm 연동 필요

/**
 * 헤더 타입
 */
interface Header {
  pfmTxCode: string;
  pfmGlobalNo: string;
  stfno: string;
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
  if (key === 'stfno') {
    return state.auth.user?.employeeId ?? '';
  }

  return '';
}

export function getAuthList(): string[] {
  const authList = ['R'];

  return authList;
}

export function hasButtonAuth(id?: string) {
  if (!id) {
    return true;
  }

  const match = BUTTON_AUTH.ID_PATTERN.exec(id);
  if (!match) {
    return true;
  }

  return getAuthList().includes(match[1]);
}
