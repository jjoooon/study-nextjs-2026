● 📊 Persist(지속성 레이어) 리팩토링 분석 보고서

  ---
  🔴 심각한 보안 이슈 (Critical Security Issues)

  1. 인증 토큰 localStorage 저장 ⚠️ CRITICAL

  현황:
  - src/features/auth/store/authSlice.ts:13 - token: string | null
  - src/store/index.ts:77 - whitelist: ['auth', 'ui']
  - 인증 토큰이 localStorage에 평문으로 저장됨

  문제점:
  - XSS 취약점: 악성 스크립트가 localStorage에 접근 가능
  - CSRF 공격 위험: 토큰 탈취 후 세션 하이재킹
  - 보안 표준 위반: OWASP, GDPR 등에서 민감한 데이터의 localStorage 저장 권장하지 않음

  영향도: 🔴 심각 - 사용자 계정 탈취 가능

  ---
  2. 민감한 사용자 정보 저장

  현황:
  - src/features/auth/store/authSlice.ts:3-8 - AuthUser 인터페이스
  - 사용자의 email, name, role 등이 localStorage에 저장됨

  문제점:
  - PII(개인정보) 노출: 이메일, 이름 등 개인 식별 정보 저장
  - 데이터 최소화 원칙 위반: 불필요한 데이터 지속 저장

  영향도: 🟡 중간 - 프라이버시 우려

  ---
  🟡 성능 및 설계 이슈 (Performance & Design Issues)

  3. 불필요한 UI 상태 지속

  현황:
  - src/features/ui/store/uiSlice.ts:14-21 - UI 상태 구조
  - modal, toast 등 일시적인 상태가 저장됨

  문제점:
  - storage 낭비: modal.isOpen, toast 등은 페이지 새로고침 후 불필요
  - 초기화 오동작: 새로고침 후 모달/토스트가 복원되는 것은 사용자 경험 저하
  - 불필요한 hydration: 저장 공간과 복원 시간 낭비

  영향도: 🟢 낮음 - 성능 저하 미미하지만 설계 오류

  ---
  4. Migration/Versioning 전략 부재

  현황:
  - src/store/index.ts:73-80 - persistConfig
  - 버전 관리, 마이그레이션 로직 없음

  문제점:
  - state 구조 변경 시 데이터 호환성 문제
  - 기존 사용자 데이터 손실 위험
  - 롤백 불가능

  영향도: 🟡 중간 - 장기적 유지보수 문제

  ---
  5. Storage 관리 전략 부재

  현황:
  - localStorage 만료 정책 없음
  - 용량 제한(5-10MB) 고려 없음

  문제점:
  - 무한정 데이터 누적
  - storage quota 초과 위험
  - 만료된 토큰 정리 불가

  영향도: 🟡 중간 - 장기적 사용 시 문제

  ---
  🟢 개선 제안 (Improvement Opportunities)

  6. REHYDRATE 핸들러 없음

  현황:
  - src/features/auth/store/authSlice.ts - REHYDRATE 액션 핸들러 없음
  - src/features/ui/store/uiSlice.ts - REHYDRATE 액션 핸들러 없음

  개선 가능:
  - hydration 후 데이터 검증
  - 토큰 만료 확인
  - UI 상태 초기화 로직

  영향도: 🟢 낮음 - 최적화 사항

  ---
  7. persist 로딩 상태 UI 미사용

  현황:
  - src/app/providers.tsx:86 - loading={null}

  개선 가능:
  - hydration 중 스피너/셸프레임워크 표시
  - 깜빡임(FOUC) 방지
  - 사용자 경험 개선

  영향도: 🟢 낮음 - UX 개선

  ---
  🔧 리팩토링 우선순위 추천

  Phase 1: 긴급 보안 조치 (Critical)

  1. ✅ 토큰 저장 방식 변경
    - localStorage → httpOnly 쿠키 또는 sessionStorage
    - 또는 Redux Persist의 Secure Storage 사용

  Phase 2: 데이터 저장 최적화 (High)

  2. ✅ UI state 지속 범위 축소
  // 변경 제안
  whitelist: ['auth'] // auth만 지속, ui는 제외
  // 또는 세분화
  whitelist: ['auth', 'ui.theme', 'ui.sidebar'] // 특정 필드만
  3. ✅ 민감한 데이터 마스킹/제거
  // auth state 변환
  transforms: [
    createTransform(
      (inboundState, key) => {
        if (key === 'auth') {
          // 토큰 저장 안 함
          return { ...inboundState, token: null };
        }
        return inboundState;
      },
      (outboundState, key) => outboundState
    )
  ]

  Phase 3: 안정성 강화 (Medium)

  4. ✅ 버전 관리 및 마이그레이션 추가
  const persistConfig = {
    key: 'root',
    version: 1, // 추가
    storage,
    migrate: createMigrate({ // 추가
      1: (state) => {
        return { ...state, /* migration logic */ };
      },
    }),
    whitelist: ['auth', 'ui'],
  };
  5. ✅ 만료 정책 구현
    - 토큰 만료 시간 저장
    - hydration 시 자동 갱신/로그아웃

  Phase 4: 사용자 경험 개선 (Low)

  6. ✅ REHYDRATE 핸들러 추가
  7. ✅ 로딩 UI 개선

  ---
  📋 권장 리팩토링 코드 예시

  옵션 1: httpOnly 쿠키 사용 (권장)

  // auth/apiSlice.ts 수정
  // 로그인 시 쿠키에 토큰 저장 (서버에서 Set-Cookie)
  // Redux state에는 토큰 저장하지 않음

  interface AuthState {
    isAuthenticated: boolean;
    user: AuthUser;
    // token: string | null; // 제거
    isLoading: boolean;
  }

  옵션 2: sessionStorage 사용

  // store/index.ts 수정
  import { createWrapper } from 'next-redux-wrapper';
  import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

  const createNoopStorage = () => ({
    getItem(): Promise<string | null> { return Promise.resolve(null); },
    setItem(_: string, value: string): Promise<void> { return Promise.resolve(); },
    removeItem(): Promise<void> { return Promise.resolve(); },
  });

  const storage = typeof window !== 'undefined'
    ? createWebStorage('session') // sessionStorage 사용
    : createNoopStorage();

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'ui.theme', 'ui.sidebar'], // 세분화
  };

  옵션 3: Transform으로 민감 데이터 제거

  import { createTransform } from 'redux-persist';

  // auth state 변환: 토큰 제외하고 저장
  const authTransform = createTransform(
    (inboundState) => {
      // 저장 시 토큰 제거
      const { token, ...rest } = inboundState as AuthState;
      return rest;
    },
    (outboundState) => {
      // 복원 시 빈 토큰
      return { ...outboundState, token: null };
    },
    { whitelist: ['auth'] }
  );

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'ui'],
    transforms: [authTransform],
  };

  ---

● 📊 요약 및 다음 단계

  핵심 이슈:

  1. 🔴 CRITICAL: 인증 토큰 localStorage 저장 (XSS 공격 위험)
  2. 🟡 MEDIUM: UI 불필요한 상태 지속 (modal, toast)
  3. 🟡 MEDIUM: 버전 관리/마이그레이션 부재
  4. 🟢 LOW: REHYDRATE 핸들러 없음

  즉시 조치 필요:

  - 토큰 저장 방식 변경: httpOnly 쿠키 또는 sessionStorage로 이동
  - UI state 저장 범위 축소: theme, sidebar 등 필수 정보만 저장

  이 보안 이슈들은 실제 프로덕션 환경에서 계정 탈취, 데이터 유출 등 심각한 사고로 이어질 수 있으므로, 최우선으로 개선하는 것을 강력히 권장합니다.