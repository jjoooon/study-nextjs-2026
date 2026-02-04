# useDataPipeline

RTK Query와 일반 함수를 하나의 파이프라인으로 관리할 수 있는 React Hook입니다.

## 특징

- 🔗 **Query + Mutation + Function 통합**: RTK Query와 순수 함수를 하나의 파이프라인에서 관리
- ⚡ **동적 스텝 관리**: 실행 중에 스텝 추가/제거/재정렬 가능
- 🎯 **조건부 실행**: 특정 조건에 따라 스텝 실행 여부 결정
- 🔄 **순차 실행**: 스텝 간 의존성 관리 및 데이터 전달
- 🛠️ **에러 처리**: 각 스텝별 에러 핸들링
- 📊 **상태 추적**: 파이프라인 진행 상황 및 통계 제공

## 기본 사용법

```tsx
import { useDataPipeline } from '@/shared/hooks/useDataPipeline';

function MyComponent() {
  const pipeline = useDataPipeline([
    {
      type: 'query',
      query: () => useGetUserQuery(userId),
      label: 'Fetch User',
    },
    {
      type: 'function',
      fn: async (results) => {
        const [user] = results;
        const response = await fetch(`/api/analytics/${user.id}`);
        return response.json();
      },
      label: 'Load Analytics',
    },
    {
      type: 'mutation',
      mutation: () => useCreateOrderMutation(),
      execute: false, // 수동 실행
      label: 'Create Order',
    }
  ]);

  if (!pipeline.isComplete) {
    return <Loading />;
  }

  const [user, analytics] = pipeline.results;
  return <Dashboard user={user} analytics={analytics} />;
}
```

## API 레퍼런스

### PipelineStep 타입

```typescript
type PipelineStep<T = any, R = any> = {
  id?: string;                              // 고유 ID
  type: 'query' | 'mutation' | 'function';  // 스텝 타입

  // Query용
  query?: () => UseQueryReturn<T>;

  // Mutation용
  mutation?: () => UseMutationReturn<T, any>;
  mutationArgs?: any;
  execute?: boolean;                        // false면 자동 실행 안 함

  // Function용
  fn?: (prevResults: any[], context: any) => T | Promise<T>;
  fnArgs?: any;

  // 공통
  waitForPrev?: boolean;
  condition?: (prevResults: any[], context: any) => boolean;
  onSuccess?: (data: R, allResults: any[], context: any) => void | Promise<void>;
  onError?: (error: any) => void;
  transform?: (data: T) => R;
  context?: Record<string, any>;

  // 메타데이터
  label?: string;
  description?: string;
};
```

### 반환값

```typescript
{
  // 상태
  steps: PipelineStep[];           // 모든 스텝
  results: any[];                  // 실행 결과들
  errors: any[];                   // 에러들
  context: Record<string, any>;    // 공유 컨텍스트
  isComplete: boolean;             // 완료 여부
  currentStep: number;             // 현재 스텝 인덱스
  stats: {                         // 통계
    totalSteps: number;
    completedSteps: number;
    querySteps: number;
    mutationSteps: number;
    functionSteps: number;
    hasErrors: boolean;
  };

  // 조작 메서드
  addStep(step, options?: { at?: number; executeImmediately?: boolean }): string;
  addSteps(steps, options?): string[];
  removeStep(id: string | number): void;
  removeStepsInRange(start: number, end: number): void;
  replaceStep(id: string | number, step: PipelineStep): void;
  moveStep(from: number, to: number): void;
  filterSteps(predicate): void;
  clearSteps(keepInitial?: boolean): void;
  findStep(predicate): PipelineStep | undefined;

  // 실행 메서드
  executeMutation(id: string | number, args?: any): void;
  executeFunction(id: string | number, args?: any): void;
  resetExecution(fromIndex?: number): void;
  reset(): void;
}
```

## 사용 예시

### 1. Query만 사용

```tsx
const pipeline = useDataPipeline([
  {
    type: 'query',
    query: () => useGetUserQuery(userId),
    onSuccess: (user) => console.log('User loaded:', user),
  },
  {
    type: 'query',
    query: () => useGetPostsQuery(),
    transform: (posts) => posts.filter(p => p.published),
  }
]);
```

### 2. Mutation 체인

```tsx
const pipeline = useDataPipeline([
  {
    type: 'mutation',
    mutation: () => useCreateUserMutation(),
    execute: false,  // 수동 실행
    onSuccess: (user) => toast.success('User created!'),
  },
  {
    type: 'mutation',
    mutation: () => useSendWelcomeEmailMutation(),
    execute: false,
  }
]);

// 실행
pipeline.executeMutation(0, userData);
```

### 3. Query + 함수 혼합

```tsx
const pipeline = useDataPipeline([
  {
    type: 'query',
    query: () => useGetUserQuery(userId),
  },
  {
    type: 'function',
    fn: async (results) => {
      const [user] = results;
      const response = await fetch(`/api/analytics/${user.id}`);
      return response.json();
    },
  },
  {
    type: 'function',
    fn: (results) => {
      const [user, analytics] = results;
      return { ...user, score: analytics.score * 1.5 };
    },
  }
]);
```

### 4. 동적 스텝 추가

```tsx
const pipeline = useDataPipeline();

// 스텝 추가
pipeline.addStep({
  type: 'function',
  label: 'Validate',
  fn: () => ({ valid: true }),
});

// 여러 스텝 추가
pipeline.addSteps([
  { type: 'function', fn: () => ({ step1: true }) },
  { type: 'function', fn: () => ({ step2: true }) },
], { at: 0 });  // 특정 위치에 삽입
```

### 5. 조건부 실행

```tsx
const pipeline = useDataPipeline([
  {
    type: 'query',
    query: () => useGetUserQuery(),
  },
  {
    type: 'query',
    query: () => useGetAdminDataQuery(),
    condition: ([user]) => user.role === 'admin',  // admin만 실행
  }
]);
```

### 6. 스텝 관리

```tsx
// 제거
pipeline.removeStep(0);
pipeline.removeStepsInRange(0, 2);

// 교체
pipeline.replaceStep(0, newStep);

// 이동
pipeline.moveStep(0, 2);

// 필터링
pipeline.filterSteps((step) => step.type !== 'mutation');

// 전체 초기화
pipeline.clearSteps();
pipeline.clearSteps(true);  // 초기 스텝 유지
```

## 주요 메서드

### addStep

단일 스텝을 추가합니다.

```tsx
pipeline.addStep({
  type: 'function',
  fn: async (results) => { /* ... */ },
}, {
  at: 2,                      // 2번 위치에 삽입
  executeImmediately: true,   // 즉시 실행
});
```

### removeStep

특정 스텝을 제거합니다.

```tsx
pipeline.removeStep(0);           // 인덱스로 제거
pipeline.removeStep('step-123');  // ID로 제거
```

### executeMutation / executeFunction

Mutation이나 함수를 수동으로 실행합니다.

```tsx
pipeline.executeMutation(0, { arg1: 'value' });
pipeline.executeFunction('step-123', { data: 'value' });
```

### resetExecution

특정 위치부터 다시 실행합니다.

```tsx
pipeline.resetExecution();     // 처음부터 재실행
pipeline.resetExecution(2);    // 2번 스텝부터 재실행
```

## 패턴 모음

### 컨텍스트 공유

```tsx
const pipeline = useDataPipeline([
  {
    type: 'function',
    fn: () => ({ timestamp: Date.now() }),
    context: { startTime: Date.now() },  // 컨텍스트 저장
  },
  {
    type: 'function',
    fn: (results, context) => {
      const elapsed = Date.now() - context.startTime;
      return { elapsed };
    },
  }
]);

// 접근
console.log(pipeline.context.startTime);
```

### 에러 처리

```tsx
const pipeline = useDataPipeline([
  {
    type: 'function',
    fn: () => { /* ... */ },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Operation failed');
    },
  }
]);

// 에러 체크
if (pipeline.stats.hasErrors) {
  return <ErrorMessage errors={pipeline.errors} />;
}
```

### 플러그인 시스템

```tsx
function DynamicPipeline() {
  const pipeline = useDataPipeline();

  const enablePlugin = () => {
    pipeline.addStep({
      type: 'function',
      label: 'Plugin Logic',
      fn: async (results) => {
        // 플러그인 로직
      },
    });
  };

  return <button onClick={enablePlugin}>Enable Plugin</button>;
}
```

## TypeScript 지원

완전한 TypeScript 타입 지원이 포함되어 있습니다.

```tsx
import { useDataPipeline, type PipelineStep } from '@/shared/hooks/useDataPipeline';

interface User {
  id: number;
  name: string;
}

const step: PipelineStep<User> = {
  type: 'query',
  query: () => useGetUserQuery(),
  transform: (user: User) => ({
    ...user,
    displayName: user.name.toUpperCase(),
  }),
};
```

## 주의사항

1. **Hook 규칙**: React Hook 규칙을 준수해야 합니다 (조건부/루프 내에서 호출 금지)
2. **무한 루프**: `condition` 함수가 항상 `false`를 반환하면 무한 루프에 빠질 수 있습니다
3. **메모리**: 대량의 스텝을 실행하는 경우 `results` 배열의 크기에 주의하세요

## 라이선스

MIT
