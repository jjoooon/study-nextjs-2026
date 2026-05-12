/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import type { Meta, StoryObj } from '@storybook/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Containers/Resizable',
  component: ResizablePanelGroup,
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
            <h2>Overview</h2>
            <div>
              <p>
                Resizable은 패널 간 경계를 드래그하여 영역 크기를 조절할 수 있는 레이아웃 컴포넌트입니다.
                <br />
                복수의 패널을 가로/세로 방향으로 구성하고, 핸들을 통해 사용자가 직접 크기를 변경할 수 있습니다.
              </p>
              <ul>
                <li>
                  <b>ResizablePanelGroup</b>: 패널 그룹 컨테이너 (orientation 지정)
                </li>
                <li>
                  <b>ResizablePanel</b>: 크기 조절 대상 패널
                </li>
                <li>
                  <b>ResizableHandle</b>: 패널 사이 드래그 핸들
                </li>
              </ul>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Resizable 컴포넌트는 다음과 같은 구조로 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

<ResizablePanelGroup
  orientation="horizontal"
  className="max-w-md rounded-lg border"
>
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Two</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Resizable 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>컴포넌트</th>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={2}>ResizablePanelGroup</td>
                  <td>orientation</td>
                  <td>'horizontal' | 'vertical'</td>
                  <td>패널 배치 방향</td>
                </tr>
                <tr>
                  <td>direction</td>
                  <td>'ltr' | 'rtl'</td>
                  <td>레이아웃 방향</td>
                </tr>
                <tr>
                  <td rowSpan={3}>ResizablePanel</td>
                  <td>defaultSize</td>
                  <td>number</td>
                  <td>패널 기본 크기 (백분율)</td>
                </tr>
                <tr>
                  <td>minSize</td>
                  <td>number</td>
                  <td>패널 최소 크기 (백분율)</td>
                </tr>
                <tr>
                  <td>maxSize</td>
                  <td>number</td>
                  <td>패널 최대 크기 (백분율)</td>
                </tr>
                <tr>
                  <td>ResizableHandle</td>
                  <td>withHandle</td>
                  <td>boolean</td>
                  <td>핸들 중앙에 시각적 핸들 아이콘 표시 여부</td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-full h-screen p-12">
      <ResizablePanelGroup {...args}>
        <ResizablePanel defaultSize={30}>
          <div className="h-full flex items-center justify-center bg-gray-300">Panel 1</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <div className="h-full flex items-center justify-center bg-gray-300">Panel 2</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
