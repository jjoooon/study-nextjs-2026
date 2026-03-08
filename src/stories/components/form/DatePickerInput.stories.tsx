import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

type DatePickerInputStoryProps = React.ComponentProps<typeof DatePickerInput>;

const meta: Meta<DatePickerInputStoryProps> = {
  title: 'Components/Form/DatePickerInput',
  component: DatePickerInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
                DatePickerInput 컴포넌트는 입력 필드와 캘린더 팝오버를 결합한 날짜 입력 UI입니다.
                <br />
                single, multiple, range 모드를 지원하며, 에러 메시지와 크기/너비 설정을 일관된 방식으로 제공합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>DatePickerInput 컴포넌트는 아래와 같은 시나리오에 사용할 수 있습니다.</p>
            <ul>
              <li>단일 날짜 선택(single)</li>
              <li>다중 날짜 선택(multiple)</li>
              <li>기간 선택(range)</li>
              <li>필수/비활성화/에러 상태 표시</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { DatePickerInput } from '@common/DatePicker';
import { useState } from 'react';

const [value, setValue] = useState('');

<DatePickerInput
  mode={'single' | 'multiple' | 'range'}
  size={'lg' | 'sm'}
  width={'full' | 'auto' | 'max' | 'min' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '??rem' | '??px'}

  required={false | true}
  readOnly={false | true}
  disabled={false | true}

  error={false | true}
  errorMsg={'입력은 필수입니다.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'}

  value={value}
  onChange={(date, formattedValue) => setValue(formattedValue ?? '')}
/>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>DatePickerInput 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>mode</td>
                  <td>'single', 'multiple', 'range'</td>
                  <td>날짜 선택 모드</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>'lg', 'sm'</td>
                  <td>입력 크기</td>
                </tr>
                <tr>
                  <td>width</td>
                  <td>'full', 'auto', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '??rem', '??px'</td>
                  <td>입력 너비</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td>boolean</td>
                  <td>필수 여부</td>
                </tr>
                <tr>
                  <td>readOnly</td>
                  <td>boolean</td>
                  <td>읽기 전용 상태</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>boolean</td>
                  <td>비활성화 여부</td>
                </tr>
                <tr>
                  <td>error</td>
                  <td>boolean</td>
                  <td>에러 상태</td>
                </tr>
                <tr>
                  <td>errorMsg</td>
                  <td>ReactNode</td>
                  <td>에러 메시지</td>
                </tr>
                <tr>
                  <td>errorPs</td>
                  <td>'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'</td>
                  <td>에러 메시지 위치</td>
                </tr>
              </tbody>
            </table>

            <h2>Mode</h2>
            <p>single, multiple, range 모드를 지원합니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <DatePickerInput mode="single" width="sm" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="multiple" width="sm" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput
                    mode="range"
                    width="lg"
                    rangeValue={{ from: '2026-03-01', to: '2026-03-07' }}
                    onChange={() => undefined}
                  />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Size</h2>
            <p>DatePickerInput 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <DatePickerInput mode="single" width="sm" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" size="sm" width="sm" value="2026-03-07" onChange={() => undefined} />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Width</h2>
            <p>DatePickerInput 컴포넌트에서 사용할 수 있는 width 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-8">
                <Gcol gap={2} className="w-[60rem] p-2">
                  <DatePickerInput mode="single" width="full" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="max" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="2xs" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="xs" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="sm" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="md" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="lg" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="xl" value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="2xl" value="2026-03-07" onChange={() => undefined} />
                </Gcol>
              </Gcol>
            </Unstyled>

            <h2>State</h2>
            <p>required, readOnly, disabled 상태를 지원합니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <DatePickerInput mode="single" width="sm" required value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="sm" readOnly value="2026-03-07" onChange={() => undefined} />
                  <DatePickerInput mode="single" width="sm" disabled value="2026-03-07" onChange={() => undefined} />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Error</h2>
            <p>DatePickerInput 컴포넌트에서 사용할 수 있는 에러 메시지 위치 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <DatePickerInput width="lg" value="2026-03-07" error errorPs="tl" errorMsg="top left" onChange={() => undefined} />
                  <DatePickerInput width="lg" value="2026-03-07" error errorPs="tc" errorMsg="top center" onChange={() => undefined} />
                  <DatePickerInput width="lg" value="2026-03-07" error errorPs="tr" errorMsg="top right" onChange={() => undefined} />
                </Grow>
                <Grow gap={8}>
                  <DatePickerInput width="lg" value="2026-03-07" error errorPs="bl" errorMsg="bottom left" onChange={() => undefined} />
                  <DatePickerInput width="lg" value="2026-03-07" error errorPs="bc" errorMsg="bottom center" onChange={() => undefined} />
                  <DatePickerInput width="lg" value="2026-03-07" error errorPs="br" errorMsg="bottom right" onChange={() => undefined} />
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
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
    size: 'default',
    width: 'sm',
    required: false,
    readOnly: false,
    disabled: false,
    error: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
  },
};

export default meta;
type Story = StoryObj<DatePickerInputStoryProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const [rangeValue, setRangeValue] = React.useState<{ from?: string; to?: string }>({
      from: '2026-03-01',
      to: '2026-03-07',
    });

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    if (args.mode === 'range') {
      return (
        <DatePickerInput
          {...args}
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

    return (
      <DatePickerInput
        {...args}
        value={value}
        onChange={(date, formattedValue) => {
          setValue(formattedValue ?? '');
          args.onChange?.(date, formattedValue ?? '');
        }}
      />
    );
  },
};
 