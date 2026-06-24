/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Grow, Gcol } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';

type DatePickerInputStoryProps = React.ComponentProps<typeof DatePickerInput>;
type Story = StoryObj<DatePickerInputStoryProps>;

const meta: Meta<DatePickerInputStoryProps> = {
  title: 'Components/Forms/DatePickerInput',
  component: DatePickerInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`DatePickerInput 컴포넌트는 입력 필드와 캘린더 팝오버를 결합한 날짜 입력 UI입니다.
single, multiple, range 모드를 지원하며, 에러 메시지와 크기/너비 설정을 일관된 방식으로 제공합니다.
기간(range) 모드에서는 퀵 옵션(options), 범위 고정 지정(autoRangeFix), 자동 캘린더 닫기(autoClose) 등의 고급 설정을 활용할 수 있습니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화', '2026.06.24 - 신규 Props(autoRangeFix, autoClose) 추가 및 명세 동기화']}
            usageCode={`
import { DatePickerInput } from '@common/DatePicker';
import { useState } from 'react';

const [value, setValue] = useState('');

<DatePickerInput
  mode="single"
  size="lg"
  width="sm"
  value={value}
  onChange={(date, formattedValue) => setValue(formattedValue)}
/>
            `}
          >
            <h2>Mode</h2>
            <p>single, multiple, range 모드를 지원합니다.</p>
            <Grow
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <DatePickerInput mode="single" width="sm" value="2026-03-07" onChange={() => undefined} />
              
              <DatePickerInput
                mode="range"
                width="lg"
                rangeValue={{ from: '2026-03-01', to: '2026-03-07' }}
                onChange={() => undefined}
              />

              <DatePickerInput
                mode="range"
                width="lg"
                autoRangeFix
                autoRangeDays={7}
                rangeValue={{ from: '2026-03-01', to: '2026-03-07' }}
                onChange={() => undefined}
              />
            </Grow>

            <h2 className="mt-8">Size</h2>
            <p>DatePickerInput 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Grow
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <DatePickerInput mode="single" width="sm" value="2026-03-07" onChange={() => undefined} />
              <DatePickerInput mode="single" size="md" width="sm" value="2026-03-07" onChange={() => undefined} />
            </Grow>
            <h2 className="mt-8">State</h2>
            <p>required, readOnly, disabled 상태를 지원합니다.</p>
            <Grow
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <DatePickerInput mode="single" width="sm" required value="2026-03-07" onChange={() => undefined} />
              <DatePickerInput mode="single" width="sm" readOnly value="2026-03-07" onChange={() => undefined} />
              <DatePickerInput mode="single" width="sm" disabled value="2026-03-07" onChange={() => undefined} />
            </Grow>

            <h2 className="mt-8">Error</h2>
            <p>DatePickerInput 컴포넌트에서 사용할 수 있는 에러 메시지 위치 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <DatePickerInput
                  width="lg"
                  value="2026-03-07"
                  error
                  errorPs="tl"
                  errorMsg="top left"
                  onChange={() => undefined}
                />
                <DatePickerInput
                  width="lg"
                  value="2026-03-07"
                  error
                  errorPs="tc"
                  errorMsg="top center"
                  onChange={() => undefined}
                />
                <DatePickerInput
                  width="lg"
                  value="2026-03-07"
                  error
                  errorPs="tr"
                  errorMsg="top right"
                  onChange={() => undefined}
                />
              </Grow>
              <Grow gap={8} className="mt-2">
                <DatePickerInput
                  width="lg"
                  value="2026-03-07"
                  error
                  errorPs="bl"
                  errorMsg="bottom left"
                  onChange={() => undefined}
                />
                <DatePickerInput
                  width="lg"
                  value="2026-03-07"
                  error
                  errorPs="bc"
                  errorMsg="bottom center"
                  onChange={() => undefined}
                />
                <DatePickerInput
                  width="lg"
                  value="2026-03-07"
                  error
                  errorPs="br"
                  errorMsg="bottom right"
                  onChange={() => undefined}
                />
              </Grow>
            </Gcol>
          </StoryDocTemplate>
        );
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
      table: { category: '설정 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md'],
      table: { category: '스타일 props' },
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'auto', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: { category: '스타일 props' },
    },
    required: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    readOnly: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    error: {
      control: { type: 'boolean' },
      table: { category: '에러 props' },
    },
    errorPs: {
      control: { type: 'select' },
      options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
      table: { category: '에러 props' },
    },
    errorMsg: {
      control: { type: 'text' },
      table: { category: '에러 props' },
    },
    monthOnly: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '월만 선택하는 모드',
    },
    onMonthSelect: {
      table: { disable: true },
    },
    options: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '퀵 기간 선택 옵션(당일, 1주일, 1개월, 3개월) 버튼 표시 여부',
    },
    autoRangeDays: {
      control: { type: 'number' },
      table: { category: '설정 props' },
      description: '시작일 선택 시 자동으로 계산할 종료일과의 간격 일수',
    },
    autoRangeFix: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '시작일 선택 시 종료일이 autoRangeDays 만큼 더해진 범위로 고정되어 선택되는지 여부',
    },
    autoClose: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '날짜를 선택했을 때 캘린더 팝업이 자동으로 닫히는지 여부 (range 모드 포함)',
    },
    id: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    rangeValue: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  args: {
    mode: 'single',
    size: 'lg',
    width: 'sm',
    required: false,
    readOnly: false,
    disabled: false,
    error: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
    monthOnly: false,
    options: false,
    autoRangeDays: 7,
    autoRangeFix: false,
    autoClose: false,
  },
};

export default meta;

export const Default: Story = {
  render: (args) => {
    const getToday = () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    const [value, setValue] = React.useState(args.value ?? getToday());
    const initialMultiple = React.useMemo(() => {
      if (args.value) {
        const arr = args.value
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean);
        return arr.length > 0 ? arr : [getToday()];
      }
      return [getToday()];
    }, [args.value]);
    const [multipleValue, setMultipleValue] = React.useState<string[]>(initialMultiple);
    const [rangeValue, setRangeValue] = React.useState<{ from?: string; to?: string }>({
      from: '2026-03-01',
      to: '2026-03-07',
    });

    React.useEffect(() => {
      setValue(args.value ?? getToday());
    }, [args.value]);

    React.useEffect(() => {
      if (args.mode === 'multiple') {
        if (args.value) {
          const arr = args.value
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);
          setMultipleValue(arr.length > 0 ? arr : [getToday()]);
        } else {
          setMultipleValue([getToday()]);
        }
      }
    }, [args.value, args.mode]);

    const effectiveMode = args.monthOnly ? 'single' : args.mode;

    if (effectiveMode === 'range') {
      return (
        <DatePickerInput
          {...args}
          mode={effectiveMode}
          rangeValue={rangeValue}
          onChange={(date, formattedValue) => {
            if (!formattedValue) {
              setRangeValue({ from: '', to: '' });
              args.onChange?.(date, formattedValue ?? '');
              return;
            }

            const parts = formattedValue.split('~').map((v) => v.trim());
            setRangeValue({ from: parts[0] || '', to: parts[1] || '' });
            args.onChange?.(date, formattedValue);
          }}
        />
      );
    }

    if (effectiveMode === 'multiple') {
      return (
        <DatePickerInput
          {...args}
          mode={effectiveMode}
          value={multipleValue.join(', ')}
          onChange={(_date, formattedValue) => {
            const arr = formattedValue
              ? formattedValue
                  .split(',')
                  .map((v) => v.trim())
                  .filter(Boolean)
              : [];
            setMultipleValue(arr);
            args.onChange?.(_date, formattedValue ?? '');
          }}
        />
      );
    }

    let displayValue = value;
    if (args.monthOnly && value) {
      const match = value.match(/^(\d{4})-(\d{2})/);
      if (match) {
        displayValue = `${match[1]}-${match[2]}`;
      }
    }
    return (
      <DatePickerInput
        {...args}
        mode={effectiveMode}
        value={displayValue}
        onChange={(date, formattedValue) => {
          setValue(formattedValue ?? '');
          args.onChange?.(date, formattedValue ?? '');
        }}
      />
    );
  },
};

export const RangeWithQuickOptions: Story = {
  args: {
    mode: 'range',
    options: true,
    autoRangeDays: 7,
  },
  render: (args) => {
    const [rangeValue, setRangeValue] = React.useState<{ from?: string; to?: string }>({
      from: '2026-06-01',
      to: '2026-06-08',
    });

    return (
      <DatePickerInput
        {...args}
        mode="range"
        rangeValue={rangeValue}
        onChange={(date, formattedValue) => {
          if (!formattedValue) {
            setRangeValue({ from: '', to: '' });
            return;
          }
          const parts = formattedValue.split('~').map((v) => v.trim());
          setRangeValue({ from: parts[0] || '', to: parts[1] || '' });
        }}
      />
    );
  },
};

export const RangeWithAutoFixAndClose: Story = {
  args: {
    mode: 'range',
    autoRangeFix: true,
    autoRangeDays: 10,
    autoClose: true,
  },
  render: (args) => {
    const [rangeValue, setRangeValue] = React.useState<{ from?: string; to?: string }>({
      from: '2026-06-01',
      to: '2026-06-11',
    });

    return (
      <DatePickerInput
        {...args}
        mode="range"
        rangeValue={rangeValue}
        onChange={(date, formattedValue) => {
          if (!formattedValue) {
            setRangeValue({ from: '', to: '' });
            return;
          }
          const parts = formattedValue.split('~').map((v) => v.trim());
          setRangeValue({ from: parts[0] || '', to: parts[1] || '' });
        }}
      />
    );
  },
};
