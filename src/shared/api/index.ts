/**
 * Shared API - 통합 내보내기
 *
 * @description
 * 애플리케이션의 모든 API 관련 설정의 중앙 집중식 내보내기
 *
 * @usage
 * import { axiosBaseQuery, axiosInstance } from '@/shared/api';
 */

// Axios 인스턴스
export { axiosInstance, default as axios } from './axiosInstance';

// Axios BaseQuery for RTK Query
export { axiosBaseQuery, baseQuery } from './axiosBaseQuery';
export type { AxiosBaseQueryArgs, AxiosBaseQueryResult, AxiosBaseQueryMeta } from './axiosBaseQuery';
