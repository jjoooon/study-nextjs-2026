import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { Gcol, Grow } from '@atoms';
import { Calendar } from '@/shared/components/uiux/Calendar';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

function ModesPreview() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date());
  const [multipleDates, setMultipleDates] = React.useState<Date[] | undefined>([]);
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 2, 8),
    to: new Date(2026, 2, 12),
  });

  return (
    <Grow className="gap-4 items-start">
      <Gcol className="gap-2">
        <h3 className="font-bold text-center mb-2">Single</h3>
        <Calendar mode="single" selected={singleDate} onSelect={setSingleDate} />
      </Gcol>
      <Gcol className="gap-2">
        <h3 className="font-bold text-center mb-2">Multiple</h3>
        <Calendar mode="multiple" selected={multipleDates} onSelect={setMultipleDates} />
      </Gcol>
      <Gcol className="gap-2">
        <h3 className="font-bold text-center mb-2">Range</h3>
        <Calendar mode="range" selected={range} onSelect={setRange} />
      </Gcol>
    </Grow>
  );
}

const meta: Meta<typeof Calendar> = {
  title: 'Components/UIUX/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <Markdown>
            {`
Calendar는 날짜를 선택하기 위한 컴포넌트이다.
단일 날짜, 범위 선택 등 다양한 날짜 입력 UX의 기본 레이어로 사용된다.
`}
          </Markdown>
          <Primary />
          <Controls />
          <Markdown>
            {`
### 기본 Calendar: Usage
\`\`\`tsx
import { Calendar } from '@/shared/components/uiux/Calendar';
import { useState } from 'react';

const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar mode="single" selected={date} onSelect={setDate} />
\`\`\`
`}
          </Markdown>
          <h2>Modes</h2>
          <Unstyled>
            <StoryWrap>
              <StoryBox>
                <ModesPreview />
              </StoryBox>
            </StoryWrap>
          </Unstyled>
        </>
      ),
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range', 'default'],
      description: '날짜 선택 모드',
    },
    selected: {
      control: 'date',
      description: '선택된 날짜 (Date, Date[], DateRange)',
    },
    numberOfMonths: {
      control: 'number',
      description: '표시할 월 개수',
    },
    showOutsideDays: {
      control: 'boolean',
      description: '다른 월의 날짜 표시 여부',
    },
    disabled: {
      control: 'object',
      description: '비활성화할 날짜',
    },
    // 내부 구현 prop 숨기기
    classNames: { table: { disable: true } },
    components: { table: { disable: true } },
    formatters: { table: { disable: true } },
    captionLayout: { table: { disable: true } },
    buttonVariant: { table: { disable: true } },
  },
  args: {
    mode: 'single',
    numberOfMonths: 1,
    showOutsideDays: true,
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar {...args} mode="single" selected={date} onSelect={setDate} />;
  },
};

export const Modes: Story = {
  parameters: { controls: { hideNoControlsWarning: true, exclude: /.*/ } },
  render: () => <ModesPreview />,
};

export const MultipleMonths: Story = {
  args: {
    numberOfMonths: 2,
  },
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar {...args} mode="single" selected={date} onSelect={setDate} />;
  },
};
