import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@uiux/ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/UIUX/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ScrollArea는 고정된 영역 안에서 overflow 콘텐츠를 스크롤할 수 있게 해주는 컴포넌트이다.
세로/가로 스크롤 모두 지원하며, 커스텀 스크롤바를 통해 일관된 UI를 제공한다.

- **className**으로 높이/너비를 지정해 스크롤 영역을 정의한다.
- 내부 콘텐츠 길이에 따라 스크롤바가 자동으로 표시된다.

<br>
#### **기본 ScrollArea: Usage**
\`\`\`tsx
import { ScrollArea } from '@uiux/ScrollArea';

<ScrollArea className="h-72 w-lg rounded-md border p-4">
  <div className="space-y-2">
    {Array.from({ length: 30 }).map((_, i) => (
      <div key={i}>항목 {i + 1}</div>
    ))}
  </div>
</ScrollArea>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-lg rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="text-sm">항목 {i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  ),
};
