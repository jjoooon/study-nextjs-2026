import type { Meta, StoryObj } from '@storybook/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Containers/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Resizable은 패널 간 경계를 드래그하여 영역 크기를 조절할 수 있는 레이아웃 컴포넌트이다.
복수의 패널을 가로/세로 방향으로 구성하고, 핸들을 통해 사용자가 직접 크기를 변경할 수 있다.

- **ResizablePanelGroup**: 패널 그룹 컨테이너(orientation 지정)
- **ResizablePanel**: 크기 조절 대상 패널
- **ResizableHandle**: 패널 사이 드래그 핸들

<br>
#### **기본 Resizable: Usage**
\`\`\`tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={30}>Left</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={70}>Right</ResizablePanel>
</ResizablePanelGroup>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => (
    <div className="w-240 h-96 border rounded-md p-2">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={30}>
          <div className="h-full flex items-center justify-center bg-gray-300">Left</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="h-full flex items-center justify-center bg-gray-300">Right</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
