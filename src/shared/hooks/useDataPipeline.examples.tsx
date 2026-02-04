/**
 * useDataPipeline 사용 예시
 *
 * 이 파일은 useDataPipeline Hook의 다양한 사용 사례를 보여줍니다.
 */

import { useDataPipeline } from './useDataPipeline';

// ============================================
// 예시 1: Query만 사용 (자동 실행)
// ============================================

function Example1_OnlyQueries() {
  const pipeline = useDataPipeline([
    {
      type: 'query',
      query: () => {
        // RTK Query 예시: useGetUserQuery(userId)
        return {
          data: { id: 1, name: 'John', email: 'john@example.com' },
          isLoading: false,
          isError: false,
        };
      },
      label: 'Fetch User',
      onSuccess: (user) => console.log('User loaded:', user),
    },
    {
      type: 'query',
      query: () => {
        // RTK Query 예시: useGetUserPostsQuery(userId)
        return {
          data: [
            { id: 1, title: 'Post 1', published: true },
            { id: 2, title: 'Post 2', published: false },
          ],
          isLoading: false,
          isError: false,
        };
      },
      label: 'Fetch Posts',
      transform: (posts) => (posts as { published: boolean }[]).filter((p) => p.published),
    },
  ]);

  if (!pipeline.isComplete) {
    return <div>Loading... Step: {pipeline.currentStep}</div>;
  }

  const [user, posts] = pipeline.results as [{ name: string }, { length: number }];
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{posts.length} published posts</p>
    </div>
  );
}

// ============================================
// 예시 2: Mutation 체인 (수동 실행)
// ============================================

function Example2_MutationChain() {
  const [formData] = useState({ name: 'John', email: 'john@example.com' });

  const pipeline = useDataPipeline([
    {
      type: 'mutation',
      mutation: () => {
        // RTK Mutation 예시: useCreateUserMutation()
        return [
          (_args: unknown) => ({
            unwrap: async () => ({ id: 1 }),
          }),
          { isLoading: false, isError: false },
        ];
      },
      execute: false, // 수동 실행
      label: 'Create User',
      onSuccess: (user) => console.log('User created:', (user as { id: number }).id),
    },
    {
      type: 'mutation',
      mutation: () => {
        // RTK Mutation 예시: useSendWelcomeEmailMutation()
        return [
          (_args: unknown) => ({
            unwrap: async () => ({ sent: true }),
          }),
          { isLoading: false, isError: false },
        ];
      },
      execute: false,
      label: 'Send Welcome Email',
      onSuccess: () => console.log('Welcome email sent'),
    },
  ]);

  const handleSubmit = async () => {
    // 첫 번째 mutation 실행
    pipeline.executeMutation(0, formData);
  };

  return (
    <form>
      <input name="name" value={formData.name} />
      <input name="email" value={formData.email} />
      <button type="button" onClick={handleSubmit}>
        Register
      </button>
      {pipeline.results.length > 0 && <div>Registered! Steps: {pipeline.results.length}</div>}
    </form>
  );
}

// ============================================
// 예시 3: Query + 일반 함수 혼합
// ============================================

function Example3_QueryAndFunction() {
  const pipeline = useDataPipeline([
    // 1. RTK Query
    {
      type: 'query',
      query: () => ({
        data: { id: 1, name: 'John', score: 75 },
        isLoading: false,
        isError: false,
      }),
      label: 'Fetch User',
    },
    // 2. 일반 비동기 함수
    {
      type: 'function',
      fn: async (results) => {
        const [user] = results as [{ id: number }];
        // 외부 API 호출 예시
        const response = await fetch(`/api/analytics/${user.id}`);
        return response.json();
      },
      label: 'Load Analytics',
      onSuccess: (analytics) => console.log('Analytics loaded:', analytics),
    },
    // 3. 일반 동기 함수
    {
      type: 'function',
      fn: (results) => {
        const [user, analytics] = results as [{ score: number; name: string }, { score: number }];
        return {
          ...user,
          score: user.score * 1.5,
          level: analytics.score > 100 ? 'Premium' : 'Basic',
        };
      },
      label: 'Enrich User Data',
    },
  ]);

  if (!pipeline.isComplete) {
    return <div>Loading... Step: {pipeline.currentStep}</div>;
  }

  const [, , enrichedUser] = pipeline.results;
  return (
    <div>
      <h1>{(enrichedUser as { name: string; level: string; score: number }).name}</h1>
      <p>Level: {(enrichedUser as { name: string; level: string; score: number }).level}</p>
      <p>Score: {(enrichedUser as { name: string; level: string; score: number }).score}</p>
    </div>
  );
}

// ============================================
// 예시 4: 동적 스텝 추가
// ============================================

function Example4_DynamicSteps() {
  const pipeline = useDataPipeline([
    {
      type: 'query',
      query: () => ({
        data: { id: 1, name: 'John' },
        isLoading: false,
        isError: false,
      }),
      label: 'Load User',
    },
  ]);

  const handleAddValidationStep = () => {
    pipeline.addStep({
      type: 'function',
      label: 'Validate Email',
      fn: (results) => {
        const [user] = results as [{ email: string }];
        if (!user.email.includes('@')) {
          throw new Error('Invalid email');
        }
        return { valid: true };
      },
    });
  };

  const handleAddLoggingStep = () => {
    pipeline.addStep({
      type: 'function',
      label: 'Log Results',
      fn: (results) => {
        console.log('Pipeline results:', results);
        return results;
      },
    });
  };

  return (
    <div>
      <h3>Steps: {pipeline.stats.totalSteps}</h3>
      <div>Completed: {pipeline.stats.completedSteps}</div>
      <div>Queries: {pipeline.stats.querySteps}</div>
      <div>Functions: {pipeline.stats.functionSteps}</div>

      <button onClick={handleAddValidationStep}>Add Validation</button>
      <button onClick={handleAddLoggingStep}>Add Logging</button>

      <ul>
        {pipeline.steps.map((step, idx) => (
          <li key={step.id}>
            {step.label || `Step ${idx}`} ({step.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// 예시 5: 조건부 실행
// ============================================

function Example5_ConditionalExecution() {
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');

  const pipeline = useDataPipeline([
    {
      type: 'query',
      query: () => ({
        data: { id: 1, name: 'John', role: userRole },
        isLoading: false,
        isError: false,
      }),
      label: 'Load User',
    },
    {
      type: 'query',
      query: () => ({
        data: { stats: { views: 100, clicks: 50 } },
        isLoading: false,
        isError: false,
      }),
      label: 'Load Analytics',
      condition: ([user]) => (user as { role: string }).role === 'admin', // admin만 실행
    },
  ]);

  if (!pipeline.isComplete) {
    return <div>Loading...</div>;
  }

  const [user, analytics] = pipeline.results as [
    { name: string; role: string },
    { stats: { views: number } } | undefined,
  ];
  return (
    <div>
      <h1>
        {user.name} ({user.role})
      </h1>
      {analytics && <p>Views: {analytics.stats.views}</p>}
      <button onClick={() => setUserRole(userRole === 'user' ? 'admin' : 'user')}>Toggle Role</button>
    </div>
  );
}

// ============================================
// 예시 6: 에러 처리
// ============================================

function Example6_ErrorHandling() {
  const pipeline = useDataPipeline([
    {
      type: 'function',
      fn: () => {
        throw new Error('Something went wrong');
      },
      label: 'Risky Operation',
      onError: (error) => console.error('Caught error:', (error as Error).message),
    },
    {
      type: 'function',
      fn: () => ({ success: true }),
      label: 'Next Operation',
    },
  ]);

  return (
    <div>
      {pipeline.stats.hasErrors && <div>Error occurred!</div>}
      <div>Errors: {pipeline.errors.length}</div>
      <div>
        Completed: {pipeline.stats.completedSteps}/{pipeline.stats.totalSteps}
      </div>
    </div>
  );
}

// ============================================
// 예시 7: 스텝 관리 (Add/Remove/Move)
// ============================================

function Example7_StepManagement() {
  const pipeline = useDataPipeline([
    {
      type: 'function',
      label: 'Step 1: Initialize',
      fn: () => ({ initialized: true }),
    },
    {
      type: 'function',
      label: 'Step 2: Validate',
      fn: () => ({ validated: true }),
    },
    {
      type: 'function',
      label: 'Step 3: Transform',
      fn: () => ({ transformed: true }),
    },
  ]);

  const moveUp = (index: number) => {
    if (index > 0) {
      pipeline.moveStep(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < pipeline.steps.length - 1) {
      pipeline.moveStep(index, index + 1);
    }
  };

  return (
    <div>
      <h3>Reorderable Steps</h3>
      {pipeline.steps.map((step, index) => (
        <div key={step.id} style={{ display: 'flex', gap: '10px', margin: '5px 0' }}>
          <span>
            {index + 1}. {step.label}
          </span>
          <button onClick={() => moveUp(index)}>↑</button>
          <button onClick={() => moveDown(index)}>↓</button>
          <button onClick={() => pipeline.removeStep(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => pipeline.clearSteps()}>Clear All</button>
    </div>
  );
}

// ============================================
// 예시 8: 컨텍스트 공유
// ============================================

function Example8_ContextSharing() {
  const [startTime] = useState(() => Date.now());

  const pipeline = useDataPipeline([
    {
      type: 'function',
      fn: () => ({ timestamp: Date.now() }),
      label: 'Start Timer',
      context: { startTime }, // 컨텍스트 저장
    },
    {
      type: 'function',
      fn: (_results, context) => {
        const elapsed = Date.now() - (context.startTime as number);
        return { elapsed };
      },
      label: 'Calculate Elapsed',
    },
  ]);

  if (!pipeline.isComplete) {
    return <div>Calculating...</div>;
  }

  const [, timing] = pipeline.results;
  return (
    <div>
      <p>Elapsed time: {(timing as { elapsed: number }).elapsed}ms</p>
      <p>Start time: {pipeline.context.startTime as number}</p>
    </div>
  );
}

// ============================================
// 예시 9: 복잡한 실전 시나리오 - 파일 업로드
// ============================================

function Example9_FileUploadWorkflow() {
  const pipeline = useDataPipeline([
    {
      type: 'query',
      query: () => ({
        data: { maxFileSize: 10 * 1024 * 1024, allowedTypes: ['jpg', 'png'] },
        isLoading: false,
        isError: false,
      }),
      label: 'Load Upload Config',
    },
  ]);

  const handleFileSelect = async (file: File) => {
    // 동적 스텝 추가
    pipeline.addSteps([
      {
        type: 'function',
        label: 'Validate File',
        fn: (results) => {
          const [config] = results;
          const configData = config as { maxFileSize: number; allowedTypes: string[] };
          if (file.size > configData.maxFileSize) {
            throw new Error('File too large');
          }
          if (!configData.allowedTypes.includes(file.type.split('/')[1])) {
            throw new Error('File type not allowed');
          }
          return { valid: true, file };
        },
      },
      {
        type: 'function',
        label: 'Create Preview',
        fn: async () => {
          // 프리뷰 생성 로직
          return { preview: `data:image/jpeg;base64,...` };
        },
      },
      {
        type: 'mutation',
        mutation: () => [
          (_args: unknown) => ({
            unwrap: async () => ({ id: 1, url: 'https://example.com/file.jpg' }),
          }),
          { isLoading: false, isError: false },
        ],
        execute: false, // 수동 실행
        label: 'Upload File',
      },
    ]);
  };

  const handleUpload = () => {
    const fileResult = pipeline.results.find((r) => r && typeof r === 'object' && 'file' in r) as
      | { file: File }
      | undefined;
    const file = fileResult?.file;
    pipeline.executeMutation(3, { file });
  };

  return (
    <div>
      <input type="file" onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])} />

      {pipeline.steps.length > 1 && (
        <div>
          <h4>Upload Pipeline:</h4>
          {pipeline.steps.map((step, idx) => (
            <div key={step.id}>
              {idx + 1}. {step.label} {pipeline.results[idx] ? '✓' : pipeline.currentStep === idx ? '⏳' : '○'}
            </div>
          ))}
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

// Helper 함수 (예시용)
function useState<T>(initial: T): [T, (value: T) => void] {
  return [initial, () => {}];
}

export {
  Example1_OnlyQueries,
  Example2_MutationChain,
  Example3_QueryAndFunction,
  Example4_DynamicSteps,
  Example5_ConditionalExecution,
  Example6_ErrorHandling,
  Example7_StepManagement,
  Example8_ContextSharing,
  Example9_FileUploadWorkflow,
};
