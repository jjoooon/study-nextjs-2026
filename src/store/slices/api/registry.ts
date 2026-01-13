/**
 * Centralized API Registry
 *
 * 모든 RTK Query API 슬라이스를 중앙 관리하여
 * store/index.ts 수정 없이 API 추가 가능
 *
 * @architecture
 * - config.ts: API 상수 목록 정의
 * - registry.ts: API 등록 헬퍼 함수
 *
 * @usage
 * 1. 새 API 슬라이스를 config.ts에 import
 * 2. API_REGISTRY 배열에 추가
 * 3. store/index.ts는 자동으로 모든 API를 로드
 */

import type { Reducer } from '@reduxjs/toolkit';

import { API_REGISTRY, REGISTERED_API_NAMES } from './config';

// ============================================================================
// REDUCER REGISTRY INTERFACE
// ============================================================================

/**
 * 리듀서 레지스트리 인터페이스
 */
export interface ReducerRegistry {
  register: (name: string, reducer: Reducer, priority?: number) => void;
}

// ============================================================================
// API REGISTRATION HELPERS
// ============================================================================

/**
 * 모든 API 슬라이스의 reducer를 등록
 *
 * @param registry - Reducer registry
 */
export const registerAllApiReducers = (registry: ReducerRegistry) => {
  API_REGISTRY.forEach(({ api, priority }) => {
    registry.register(api.reducerPath, api.reducer, priority);
  });
};

/**
 * 모든 API 슬라이스의 middleware를 반환
 *
 * @returns Middleware 배열 (우선순위 정렬됨)
 */
export const getAllApiMiddleware = () => {
  return API_REGISTRY.sort((a, b) => a.priority - b.priority).map(({ api }) => api.middleware);
};

/**
 * 등록된 모든 API 이름 반환
 *
 * @returns API 이름 배열
 */
export const getRegisteredApiNames = () => {
  return REGISTERED_API_NAMES;
};

// ============================================================================
// RE-EXPORTS
// ============================================================================

export { API_REGISTRY, REGISTERED_API_NAMES } from './registry';
export type { ApiRegistration } from './registry';
