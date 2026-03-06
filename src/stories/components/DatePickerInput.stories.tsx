import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';

type DatePickerInputStoryProps = React.ComponentProps<typeof DatePickerInput>;

const meta: Meta<DatePickerInputStoryProps> = {
  title: 'Components/Common/DatePickerInput',
  component: DatePickerInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DatePickerInput은 캘린더 팝오버와 입력 필드를 함께 제공하는 날짜 입력 컴포넌트이다.
단일(single), 다중(multiple), 범위(range) 선택 모드를 지원하며 폼 에러 표시와 너비/사이즈 제어가 가능하다.

- **mode**로 날짜 선택 방식을 설정한다.
- **width / size**로 입력 필드 크기를 제어한다.
- **disabled**로 입력 비활성화를 제어한다.
- **error / errorMsg / errorPs**로 검증 메시지를 표시한다.

---

<br>
#### **기본 DatePickerInput: Usage**
\`\`\`tsx
import { DatePickerInput } from '@/shared/components/common/DatePicker';
import { useState } from 'react';

const [value, setValue] = useState('');

<DatePickerInput
  value={value}
  mode="single"
  width="sm"
  onChange={(date, formattedValue) => setValue(formattedValue ?? '')}
/>
\`\`\`

<br>
#### **FormCell 예시: Usage**
\`\`\`tsx
<FormCell title="연령증가일">
  <DatePickerInput
    value={ageIncreaseDate}
    mode="single"
    width="sm"
    error={testError}
    errorMsg="연령증가일은 필수입니다."
    errorPs="bl"
    onChange={(date, formattedValue) => {
      setAgeIncreaseDate(formattedValue ?? '');
    }}
  />
</FormCell>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: '날짜 선택 모드',
      table: { category: 'Behavior' },
    },
    size: {
      control: 'select',
      options: ['lg', 'sm'],
      description: '입력 크기',
      table: { category: 'Appearance' },
    },
    width: {
      control: 'select',
      options: ['full', 'max', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: '입력 너비',
      table: { category: 'Appearance' },
    },
    required: {
      control: 'boolean',
      description: '필수 여부',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { category: 'State' },
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
      table: { category: 'Error' },
    },
    errorMsg: {
      control: 'text',
      description: '에러 메시지',
      table: { category: 'Error' },
    },
    errorPs: {
      control: 'select',
      options: ['tl', 'tr', 'bl', 'br'],
      description: '에러 메시지 위치',
      table: { category: 'Error' },
    },
    value: {
      control: 'text',
      description: '단일/다중 모드 입력 값 (YYYY-MM-DD)',
      table: { category: 'Value' },
    },
    rangeValue: { table: { disable: true } },
    onChange: {
      action: 'changed',
      description: '날짜 변경 이벤트 (date, formattedValue)',
      table: { category: 'Events' },
    },
    id: { table: { disable: true } },
  },
  args: {
    mode: 'single',
    size: 'lg',
    width: 'sm',
    required: false,
    disabled: false,
    error: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
    value: '',
  },
};

export default meta;
type Story = StoryObj<DatePickerInputStoryProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <DatePickerInput
            {...args}
            mode="single"
            value={value}
            onChange={(date, formattedValue) => {
              setValue(formattedValue ?? '');
              args.onChange?.(date, formattedValue);
            }}
          />
        </StoryBox>
        <StoryBox>
          <Grow placement="cc" className="gap-4">
            <Gcol placement="ss" className="gap-[0.4rem]">
              <DatePickerInput mode="single" width="sm" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.4rem]">
              <DatePickerInput mode="range" width="lg" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.4rem]">
              <DatePickerInput mode="single" width="sm" error errorMsg="연령증가일은 필수입니다." errorPs="bl" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.4rem]">
              <DatePickerInput mode="single" width="sm" value="2026-02-26" disabled />
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [rangeValue, setRangeValue] = React.useState<{ from?: string; to?: string }>({
      from: '2026-02-01',
      to: '2026-02-15',
    });

    return (
      <DatePickerInput
        mode="range"
        width="lg"
        rangeValue={rangeValue}
        onChange={(_, formattedValue) => {
          if (!formattedValue) {
            setRangeValue({ from: '', to: '' });
            return;
          }

          const parts = formattedValue.split('~').map((v) => v.trim());
          setRangeValue({
            from: parts[0] || '',
            to: parts[1] || '',
          });
        }}
      />
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = React.useState('2026-02-26');

    return (
      <DatePickerInput
        mode="multiple"
        value={value}
        width="sm"
        onChange={(_, formattedValue) => {
          setValue(formattedValue ?? '');
        }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    mode: 'single',
    width: 'sm',
    value: '2026-02-26',
    disabled: true,
  },
  render: (args) => <DatePickerInput {...args} />,
};

export const DisabledRange: Story = {
  args: {
    mode: 'range',
    width: 'lg',
    rangeValue: {
      from: '2026-02-01',
      to: '2026-02-15',
    },
    disabled: true,
  },
  render: (args) => <DatePickerInput {...args} />,
};

export const Error: Story = {
  args: {
    mode: 'single',
    width: 'lg',
    error: true,
    errorMsg: '에러 메시지를 입력하세요.',
    errorPs: 'tl',
    value: '',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const { value: _, onChange, ...restArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <DatePickerInput
            {...restArgs}
            value={value}
            onChange={(date, formattedValue) => {
              setValue(formattedValue ?? '');
              args.onChange?.(date, formattedValue);
            }}
          />
        </StoryBox>
        <StoryBox>
          <Grow placement="cc" className="gap-2">
            <Gcol placement="ss" className="gap-[0.2rem]">
              <DatePickerInput width="lg" value="2026-02-26" error errorPs="tl" errorMsg="top left" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <DatePickerInput width="lg" value="2026-02-26" error errorPs="tr" errorMsg="top right" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <DatePickerInput width="lg" value="2026-02-26" error errorPs="bl" errorMsg="bottom left" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <DatePickerInput width="lg" value="2026-02-26" error errorPs="br" errorMsg="bottom right" />
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};
