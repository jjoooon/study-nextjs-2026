import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@/shared/components/uiux/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/UIUX/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Textarea는 여러 줄의 텍스트를 입력받기 위한 컴포넌트이다.
메모, 상세 설명, 사유 입력 등 긴 텍스트를 다루는 폼에서 사용한다.

- **variant**로 입력 필드 스타일을 제어한다.
- **placeholder / disabled / aria-invalid** 등 표준 속성을 그대로 사용할 수 있다.

<br>
#### **기본 Textarea: Usage**
\`\`\`tsx
import { Textarea } from '@/shared/components/uiux/Textarea';

<Textarea
  variant="default"
  placeholder="내용을 입력하세요"
/>
\`\`\`

<br>
#### **Outline Textarea: Usage**
\`\`\`tsx
import { Textarea } from '@/shared/components/uiux/Textarea';

<Textarea
  variant="outline"
  placeholder="상세 내용을 입력하세요"
/>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  args: {
    placeholder: '내용을 입력하세요',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => <Textarea {...args} className="w-lg min-h-40" />,
};
