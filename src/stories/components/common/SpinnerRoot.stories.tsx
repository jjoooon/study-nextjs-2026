/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  SpinnerRoot,
  BaseSpinnerRoot,
  AiSpinner,
  DnaSpinnerRoot,
  HpSpinnerRoot,
  VerticalRollingSpinner,
} from '@/shared/components/common/SpinnerRoot';

// 스토리북용 Mock Redux Store 생성 도구
const createMockStore = (initialSpinnerState: any) => {
  const spinnerSlice = createSlice({
    name: 'spinner',
    initialState: initialSpinnerState,
    reducers: {},
  });

  return configureStore({
    reducer: {
      spinner: spinnerSlice.reducer,
    },
  });
};

const meta: Meta<typeof SpinnerRoot> = {
  title: 'Components/Common/SpinnerRoot',
  component: SpinnerRoot,
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      // args로부터 Redux mock state 생성
      const args = context.args as any;
      const mockState = {
        isVisible: args.isVisible ?? true,
        message: args.message ?? '로딩 중입니다...',
        transparentBackground: args.transparentBackground ?? false,
        hideLoadingIndicator: args.hideLoadingIndicator ?? false,
        count: 1,
        startTime: null,
        globalManual: false,
        disabled: false,
      };

      const store = createMockStore(mockState);

      return (
        <Provider store={store}>
          <div
            className="flex flex-col h-full w-full items-center justify-center"
            style={{ minHeight: '100dvh', position: 'relative' }}
          >
            <Story />
          </div>
        </Provider>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />
            <h2>History</h2>
            <ul>
              <li>2026.07.08 - 최초 생성</li>
              <li>2026.07.21 - DnaSpinnerRoot, HpSpinnerRoot 스피너 컴포넌트 추가</li>
              <li>2026.07.22 - VerticalRollingSpinner 세로 무한 롤링 스피너 컴포넌트 추가</li>
            </ul>

            <h2>Overview</h2>
            <div>
              <p>
                SpinnerRoot 컴포넌트는 Redux Store의 스피너 상태에 따라 화면 전체에 전역 로딩 오버레이를 렌더링하는
                컴포넌트입니다.
                <br />
                `createPortal`을 사용하여 DOM 계층 구조와 분리되어 렌더링되며, 투명 배경 및 로딩 이미지 숨김 모드를
                유연하게 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>SpinnerRoot 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { SpinnerRoot, DnaSpinnerRoot, HpSpinnerRoot, VerticalRollingSpinner } from '@/shared/components/common/SpinnerRoot';

// 1. 세로 무한 롤링 스피너 개별 사용
export function MyPage() {
  return (
    <div className="py-8">
      <VerticalRollingSpinner />
    </div>
  );
}

// 2. src/app/layout.tsx (전역 레이아웃)에 한번 등록하여 사용
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <HpSpinnerRoot />
      </body>
    </html>
  );
}

// 비즈니스 로직(컴포넌트 또는 Axios 인터셉터 등)에서 액션 디스패치
import { showSpinner, hideSpinner } from '@/shared/store/spinnerSlice';
import { useAppDispatch } from '@/redux';

const dispatch = useAppDispatch();
dispatch(showSpinner({ message: '데이터를 불러오는 중입니다...' }));
\`\`\`
              `}
            </Markdown>

            <h2>Redux States</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>타입</th>
                  <th>기본값</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>isVisible</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>스피너 활성화/표시 여부</td>
                </tr>
                <tr>
                  <td>message</td>
                  <td>string | null</td>
                  <td>null</td>
                  <td>오버레이 하단에 보여줄 로딩 텍스트</td>
                </tr>
                <tr>
                  <td>transparentBackground</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>배경을 투명하게(backdrop-filter 없음) 처리할지 여부</td>
                </tr>
                <tr>
                  <td>hideLoadingIndicator</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>원형 인디케이터(Loader2) 아이콘 자체를 숨길지 여부</td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'SpinnerRoot',
        'BaseSpinnerRoot',
        'AiSpinner',
        'DnaSpinnerRoot',
        'HpSpinnerRoot',
        'VerticalRollingSpinner',
      ],
      description: '렌더링할 스피너 컴포넌트 타입',
      table: { category: 'Spinner Type' },
    },
    isVisible: {
      control: { type: 'boolean' },
      description: '스피너 표시 여부 (Store 상태 모킹)',
      table: { category: 'Store Mock State' },
    },
    message: {
      control: { type: 'text' },
      description: '로딩 텍스트 메시지 (Store 상태 모킹)',
      table: { category: 'Store Mock State' },
    },
    transparentBackground: {
      control: { type: 'boolean' },
      description: '배경 투명도 여부 (Store 상태 모킹)',
      table: { category: 'Store Mock State' },
    },
    hideLoadingIndicator: {
      control: { type: 'boolean' },
      description: '로딩 인디케이터 숨김 여부 (Store 상태 모킹)',
      table: { category: 'Store Mock State' },
    },
    texts: {
      control: { type: 'object' },
      description: '순차적으로 교체/롤링되는 여러 텍스트 배열 (HTML 태그 지원)',
      table: { category: 'Props' },
    },
  },
  args: {
    type: 'SpinnerRoot',
    isVisible: true,
    message: 'AI가 <span style="color:var(--color-primary-50)">최적의 설계</span>를 찾고있어요!',
    transparentBackground: false,
    hideLoadingIndicator: false,
  },
};

export default meta;
type Story = StoryObj<typeof SpinnerRoot>;

export const Default: Story = {
  render: (args: any) => {
    if (!args.isVisible) return <></>;
    const effectiveTexts = args.texts ?? (args.message ? [args.message] : undefined);

    if (args.type === 'AiSpinner') {
      return <AiSpinner texts={effectiveTexts} />;
    }
    if (args.type === 'DnaSpinnerRoot') {
      return <DnaSpinnerRoot texts={effectiveTexts} />;
    }
    if (args.type === 'HpSpinnerRoot') {
      return <HpSpinnerRoot texts={effectiveTexts} />;
    }
    if (args.type === 'VerticalRollingSpinner') {
      return <VerticalRollingSpinner />;
    }
    return args.type === 'SpinnerRoot' ? (
      <SpinnerRoot texts={effectiveTexts} />
    ) : (
      <BaseSpinnerRoot texts={effectiveTexts} />
    );
  },
};

export const DnaSpinner: Story = {
  args: {
    type: 'DnaSpinnerRoot' as any,
    isVisible: true,
  },
  render: (args: any) => <DnaSpinnerRoot texts={args.texts ?? (args.message ? [args.message] : undefined)} />,
};

export const HpSpinner: Story = {
  args: {
    type: 'HpSpinnerRoot' as any,
    isVisible: true,
  },
  render: (args: any) => <HpSpinnerRoot texts={args.texts ?? (args.message ? [args.message] : undefined)} />,
};

export const VerticalRolling: Story = {
  args: {
    type: 'VerticalRollingSpinner' as any,
    isVisible: true,
  },
  render: (args: any) => <VerticalRollingSpinner />,
};
