import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { Gcol, Grow } from '@atoms';
import { Calendar } from '@/shared/components/uiux/Calendar';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

function ModesPreview() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date());
  const [singleMonth, setSingleMonth] = React.useState<Date>(new Date());
  const [multipleDates, setMultipleDates] = React.useState<Date[] | undefined>([]);
  const [multipleMonth, setMultipleMonth] = React.useState<Date>(new Date());
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 2, 8),
    to: new Date(2026, 2, 12),
  });
  const [rangeMonth, setRangeMonth] = React.useState<Date>(new Date(2026, 2, 1));

  return (
    <Grow className="gap-4 items-start">
      <Gcol className="gap-2">
        <h3 className="font-bold text-center mb-2">Single</h3>
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={singleDate}
          month={singleMonth}
          onSelect={setSingleDate}
          onMonthChange={setSingleMonth}
        />
      </Gcol>
      <Gcol className="gap-2">
        <h3 className="font-bold text-center mb-2">Multiple</h3>
        <Calendar
          mode="multiple"
          captionLayout="dropdown"
          selected={multipleDates}
          month={multipleMonth}
          onSelect={setMultipleDates}
          onMonthChange={setMultipleMonth}
        />
      </Gcol>
      <Gcol className="gap-2">
        <h3 className="font-bold text-center mb-2">Range</h3>
        <Calendar
          mode="range"
          captionLayout="dropdown"
          selected={range}
          month={rangeMonth}
          onSelect={setRange}
          onMonthChange={setRangeMonth}
        />
      </Gcol>
    </Grow>
  );
}

const meta: Meta<typeof Calendar> = {
  title: 'Components/Common/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                Calendar는 날짜를 선택하기 위한 컴포넌트입니다.<br />
                단일 날짜, 다중 날짜, 범위 선택 등 다양한 날짜 입력 모드를 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Calendar 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>단일 날짜 선택 (single)</li>
              <li>다중 날짜 선택 (multiple)</li>
              <li>기간 범위 선택 (range)</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { Calendar } from '@/shared/components/uiux/Calendar';
import { useState } from 'react';

const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  captionLayout="dropdown"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Calendar 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>mode</td><td>'single' | 'multiple' | 'range' | 'default'</td><td>날짜 선택 모드</td></tr>
                <tr><td>selected</td><td>Date | Date[] | DateRange</td><td>선택된 날짜 값</td></tr>
                <tr><td>onSelect</td><td>(date) ={'>'} void</td><td>날짜 선택 시 호출되는 핸들러</td></tr>
                <tr><td>numberOfMonths</td><td>number</td><td>표시할 월의 개수</td></tr>
                <tr><td>showOutsideDays</td><td>boolean</td><td>이전/다음 달의 날짜 표시 여부</td></tr>
                <tr><td>disabled</td><td>Matcher | Matcher[]</td><td>비활성화할 날짜 조건</td></tr>
              </tbody>
            </table>

            <h2>Modes</h2>
            <p>Calendar 컴포넌트에서 사용할 수 있는 mode 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <ModesPreview />
            </Unstyled>
          </>
        );
      },
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
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: '캡션 표시 방식 (dropdown 선택 시 년/월 select)',
    },
    buttonVariant: { table: { disable: true } },
  },
  args: {
    mode: 'single',
    captionLayout: 'dropdown',
    numberOfMonths: 1,
    showOutsideDays: true,
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [month, setMonth] = React.useState<Date>(new Date());
    return (
      <Calendar
        {...args}
        mode="single"
        captionLayout={args.captionLayout ?? 'dropdown'}
        selected={date}
        month={month}
        onSelect={setDate}
        onMonthChange={setMonth}
      />
    );
  },
};

export const Modes: Story = {
  parameters: { controls: { hideNoControlsWarning: true, exclude: /.*/ } },
  render: () => <ModesPreview />,
};

export const MultipleMonths: Story = {
  args: {
    numberOfMonths: 2,
    captionLayout: 'dropdown',
  },
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [month, setMonth] = React.useState<Date>(new Date());
    return (
      <Calendar
        {...args}
        mode="single"
        captionLayout={args.captionLayout ?? 'dropdown'}
        selected={date}
        month={month}
        onSelect={setDate}
        onMonthChange={setMonth}
      />
    );
  },
};
