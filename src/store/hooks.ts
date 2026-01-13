import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '@/store';

// Core typed hooks
// - 재정의된 useAppSelector - 타입 자동 추론
export const useAppDispatch = () => useDispatch<AppDispatch>();
// - 재정의된 useAppDispatch - thunk/액션 타입 자동 완성
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
