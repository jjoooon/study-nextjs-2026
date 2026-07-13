/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LoadingBar } from '@/shared/components/common/LoadingBar';

const meta: Meta<typeof LoadingBar> = {
  title: 'Components/Common/LoadingBar',
  component: LoadingBar,
  tags: ['autodocs'],
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
            </ul>

            <h2>Overview</h2>
            <div>
              <p>
                LoadingBar 컴포넌트는 페이지 전환이나 데이터 로딩 중에 사용자에게 대기 상태를 알리는 화면 전체(Full
                Screen) 로딩 인디케이터입니다.
                <br />
                Tailwind CSS의 모션 애니메이션을 사용해 부드럽고 유동적인 로딩 효과를 제공합니다.
              </p>
            </div>

            <Primary />

            <h2>Usage</h2>
            <p>LoadingBar 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { LoadingBar } from '@/shared/components/common/LoadingBar';

// 컴포넌트 렌더링
<LoadingBar />
\`\`\`
              `}
            </Markdown>

            <h2>Design Specifications</h2>
            <ul>
              <li>중앙 메인 원: Amber-400 색상</li>
              <li>
                주변 모여드는 원들: Rose-300, Rose-400, Orange-300 색상이 순차적으로 딜레이를 두고 회전/수축
                효과(animate-ping-gather) 작동
              </li>
              <li>배경색: Gray-900 (화면 전체 영역)</li>
            </ul>
          </>
        );
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingBar>;

export const Default: Story = {
  render: () => <LoadingBar />,
};
