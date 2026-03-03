import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Calendar } from '@/shared/components/uiux/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/UIUX/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Calendar는 날짜를 선택하기 위한 컴포넌트이다.
단일 날짜, 범위 선택 등 다양한 날짜 입력 UX의 기본 레이어로 사용된다.

- **mode**를 통해 선택 방식(single, multiple, range)을 제어할 수 있다.
- **selected / onSelect**를 통해 외부 상태와 연동한다.

<br>
#### **기본 Calendar: Usage**
\`\`\`tsx
import { Calendar } from '@/shared/components/uiux/Calendar';
import { useState } from 'react';

const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar mode="single" selected={date} onSelect={setDate} />
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};
