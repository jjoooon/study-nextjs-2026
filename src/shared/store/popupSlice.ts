import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * 팝업 콜백 타입
 */
export interface PopupCallbacks {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}

/**
 * 팝업 콜백 맵 (Redux state 외부에서 관리)
 *
 * @description
 * Redux state에는 직렬화 가능한 데이터만 저장하기 위해,
 * Promise resolve/reject 함수는 별도 Map으로 관리
 */
const popupCallbacksMap = new Map<string, PopupCallbacks>();

/**
 * 팝업 콜백 등록
 */
export function registerPopupCallbacks(id: string, callbacks: PopupCallbacks) {
  popupCallbacksMap.set(id, callbacks);
}

/**
 * 팝업 콜백 조회
 */
export function getPopupCallbacks(id: string): PopupCallbacks | undefined {
  return popupCallbacksMap.get(id);
}

/**
 * 팝업 콜백 제거
 */
export function removePopupCallbacks(id: string): boolean {
  return popupCallbacksMap.delete(id);
}
// ============================================================================

/**
 * 팝업 단일 인스턴스 상태
 *
 * @description
 * 열린 팝업 하나의 정보를 담고 있습니다
 * resolve/reject 함수는 Redux state에 저장하지 않고 별도 Map으로 관리
 *
 * @example
 * {
 *   id: 'popup-1737887123456',
 *   popupType: 'confirm',
 *   props: { title: '삭제 확인', message: '정말 삭제하시겠습니까?' },
 *   zIndex: 1000
 * }
 */
export interface PopupInstance {
  /** 고유 ID (timestamp + random) */
  id: string;

  /** 팝업 타입 (예: 'confirm', 'alert', 'products/detail') */
  popupType: string;

  /** 팝업 컴포넌트에 전달할 props */
  props: Record<string, unknown>;

  /** Z-Index (중첩 팝업 관리) */
  zIndex: number;
}

/**
 * 팝업 전체 상태
 *
 * @description
 * 현재 열린 모든 팝업의 배열을 관리합니다
 *
 * @example
 * {
 *   popups: [
 *     { id: '1', popupType: 'products/list', ... },
 *     { id: '2', popupType: 'products/detail', ... },
 *     { id: '3', popupType: 'confirm', ... }
 *   ]
 * }
 */
export interface PopupState {
  /** 현재 열린 팝업 목록 */
  popups: PopupInstance[];
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: PopupState = {
  popups: [],
};

// ============================================================================
// SLICE
// ============================================================================

/**
 * 팝업 관리 Redux Slice
 *
 * @description
 * - 팝업 열림/닫힘 상태 관리
 * - Promise-based 팝업 시스템 지원
 * - 중첩 팝업 지원 (Stack 구조)
 * - Z-Index 자동 관리
 *
 * @usage
 * // 팝업 열기
 * store.dispatch(addPopup({
 *   popupType: 'confirm',
 *   props: { title: '확인' },
 *   resolve: () => {},
 *   reject: () => {}
 * }));
 *
 * // 팝업 닫기
 * store.dispatch(removePopup({ popupId: 'popup-123' }));
 */
export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    /**
     * 팝업 추가
     *
     * @description
     * 새로운 팝업을 스택의 맨 위에 추가합니다
     * ID가 제공되지 않으면 자동 생성합니다
     */
    addPopup: (state, action: PayloadAction<Omit<PopupInstance, 'id' | 'zIndex'> & { id?: string }>) => {
      const id = action.payload.id || `popup-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const baseZIndex = 1000;
      const zIndex = baseZIndex + state.popups.length;

      state.popups.push({
        ...action.payload,
        id,
        zIndex,
      });
    },

    /**
     * 팝업 제거 (결과와 함께)
     *
     * @description
     * 팝업을 닫고 Promise를 resolve합니다
     *
     * @param payload.popupId - 닫을 팝업 ID
     * @param payload.result - 팝업에서 반환할 결과 값
     */
    removePopup: (state, action: PayloadAction<{ popupId: string; result?: unknown }>) => {
      const { popupId, result } = action.payload;
      const index = state.popups.findIndex((popup) => popup.id === popupId);

      if (index !== -1) {
        state.popups.splice(index, 1);

        // Z-Index 재계산 (중첩 팝업 유지)
        state.popups.forEach((p, i) => {
          p.zIndex = 1000 + i;
        });

        // Map에서 콜백 조회 후 실행
        const callbacks = getPopupCallbacks(popupId);
        if (callbacks) {
          // Promise resolve (비동기로 실행하여 Redux state 업데이트 방지)
          setTimeout(() => callbacks.resolve(result), 0);
          // Map에서 제거
          removePopupCallbacks(popupId);
        }
      }
    },

    /**
     * 팝업 제거 (에러와 함께)
     *
     * @description
     * 팝업을 닫고 Promise를 reject합니다
     *
     * @param payload.popupId - 닫을 팝업 ID
     * @param payload.error - 에러 객체
     */
    rejectPopup: (state, action: PayloadAction<{ popupId: string; error: unknown }>) => {
      const { popupId, error } = action.payload;
      const index = state.popups.findIndex((popup) => popup.id === popupId);

      if (index !== -1) {
        state.popups.splice(index, 1);

        // Z-Index 재계산
        state.popups.forEach((p, i) => {
          p.zIndex = 1000 + i;
        });

        // Map에서 콜백 조회 후 실행
        const callbacks = getPopupCallbacks(popupId);
        if (callbacks) {
          // Promise reject (비동기로 실행)
          setTimeout(() => callbacks.reject(error), 0);
          // Map에서 제거
          removePopupCallbacks(popupId);
        }
      }
    },

    /**
     * 모든 팝업 제거
     *
     * @description
     * 열린 모든 팝업을 닫습니다 (예: 로그아웃 시)
     */
    clearAllPopups: (state) => {
      // 모든 Promise를 reject로 처리
      state.popups.forEach((popup) => {
        const callbacks = getPopupCallbacks(popup.id);
        if (callbacks) {
          setTimeout(() => callbacks.reject(new Error('All popups cleared')), 0);
          removePopupCallbacks(popup.id);
        }
      });

      state.popups = [];
    },

    /**
     * 최상위 팝업 제거
     *
     * @description
     * 가장 최근에 열린 팝업을 닫습니다 (ESC 키, backdrop 클릭 등)
     */
    closeTopPopup: (state, action: PayloadAction<{ result?: unknown }>) => {
      if (state.popups.length === 0) return;

      const { result } = action.payload;
      const topPopup = state.popups[state.popups.length - 1];
      state.popups.pop();

      // Map에서 콜백 조회 후 실행
      const callbacks = getPopupCallbacks(topPopup.id);
      if (callbacks) {
        // Promise resolve
        setTimeout(() => callbacks.resolve(result), 0);
        // Map에서 제거
        removePopupCallbacks(topPopup.id);
      }
    },
  },
});

// ============================================================================
// ACTIONS
// ============================================================================

export const { addPopup, removePopup, rejectPopup, clearAllPopups, closeTopPopup } = popupSlice.actions;

// ============================================================================
// REDUCER
// ============================================================================

export default popupSlice.reducer;
