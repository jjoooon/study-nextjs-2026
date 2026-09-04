/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol, Grow } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

const meta: Meta<typeof NativeSelect> = {
  title: 'Components/Forms/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`NativeSelect 컴포넌트는 브라우저의 기본 <select> 요소를 디자인 시스템에 맞게 스타일링한 폼 선택 UI입니다.
일관된 크기/너비/상태 표현과 에러 메시지 위치 제어를 지원합니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

<NativeSelect
  variant="default"
  size="lg"
  width="full"
  required={false}
  readOnly={false}
  error={false}
  errorMsg="선택은 필수입니다."
  errorPs="bl"
>
  <NativeSelectOption value="">선택하세요</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
</NativeSelect>
            `}
          >
            <h2>Variant</h2>
            <p>드롭다운 스타일 또는 읽기 전용 텍스트 스타일을 제공합니다.</p>
            <Grow
              gap={4}
              className="flex-wrap p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <NativeSelect width="md" variant="default" defaultValue="apple">
                <NativeSelectOption value="apple">default</NativeSelectOption>
                <NativeSelectOption value="banana">banana</NativeSelectOption>
              </NativeSelect>
              <NativeSelect width="md" variant="text" defaultValue="apple">
                <NativeSelectOption value="apple">text (읽기전용 텍스트)</NativeSelectOption>
                <NativeSelectOption value="banana">banana</NativeSelectOption>
              </NativeSelect>
            </Grow>

            <h2 className="mt-8">Size</h2>
            <p>NativeSelect 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Grow
              gap={4}
              className="flex-wrap p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <NativeSelect width="md" size="lg" defaultValue="apple">
                <NativeSelectOption value="apple">lg: 28 (기본)</NativeSelectOption>
              </NativeSelect>
              <NativeSelect width="md" size="md" defaultValue="apple">
                <NativeSelectOption value="apple">md: 25</NativeSelectOption>
              </NativeSelect>
            </Grow>

            <h2 className="mt-8">Width</h2>
            <p>NativeSelect 컴포넌트에서 사용할 수 있는 width 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={2}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-[60rem]"
            >
              <NativeSelect width="full" defaultValue="apple">
                <NativeSelectOption value="apple">full</NativeSelectOption>
              </NativeSelect>
              <NativeSelect width="auto" defaultValue="apple">
                <NativeSelectOption value="apple">auto</NativeSelectOption>
              </NativeSelect>
              <NativeSelect width="2xs" defaultValue="apple">
                <NativeSelectOption value="apple">2xs</NativeSelectOption>
              </NativeSelect>
              <NativeSelect width="xs" defaultValue="apple">
                <NativeSelectOption value="apple">xs</NativeSelectOption>
              </NativeSelect>
              <NativeSelect width="sm" defaultValue="apple">
                <NativeSelectOption value="apple">sm</NativeSelectOption>
              </NativeSelect>
              <NativeSelect width="md" defaultValue="apple">
                <NativeSelectOption value="apple">md</NativeSelectOption>
              </NativeSelect>
              <NativeSelect width="lg" defaultValue="apple">
                <NativeSelectOption value="apple">lg</NativeSelectOption>
              </NativeSelect>
            </Gcol>

            <h2 className="mt-8">Required</h2>
            <p>required 옵션이 활성화되면 필수 선택을 위한 스타일이 적용됩니다.</p>
            <Grow
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <NativeSelect width="md" required defaultValue="apple">
                <NativeSelectOption value="apple">필수 선택</NativeSelectOption>
                <NativeSelectOption value="banana">banana</NativeSelectOption>
              </NativeSelect>
            </Grow>

            <h2 className="mt-8">ReadOnly</h2>
            <p>
              readOnly 옵션이 활성화되면 사용자 입력이 차단되며, 기본적으로 호버 시 툴팁으로 전체 텍스트가 표시됩니다
              (showTooltipOnReadOnly=true).
            </p>
            <Grow
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <NativeSelect width="md" readOnly defaultValue="apple">
                <NativeSelectOption value="apple">readOnly 툴팁 표시 옵션 선택 텍스트가 매우 길 때</NativeSelectOption>
                <NativeSelectOption value="banana">banana</NativeSelectOption>
              </NativeSelect>
            </Grow>

            <h2 className="mt-8">Disabled</h2>
            <p>disabled 옵션이 활성화되면 비활성화 스타일이 적용됩니다.</p>
            <Grow
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <NativeSelect width="md" disabled defaultValue="apple">
                <NativeSelectOption value="apple">disabled</NativeSelectOption>
                <NativeSelectOption value="banana">banana</NativeSelectOption>
              </NativeSelect>
            </Grow>

            <h2 className="mt-8">Error</h2>
            <p>error 옵션이 활성화되면 에러 스타일과 메시지가 함께 표시됩니다.</p>
            <Gcol
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <NativeSelect width="lg" defaultValue="" error errorPs="tl" errorMsg="top left">
                  <NativeSelectOption value="">error</NativeSelectOption>
                </NativeSelect>
                <NativeSelect width="lg" defaultValue="" error errorPs="tr" errorMsg="top right">
                  <NativeSelectOption value="">error</NativeSelectOption>
                </NativeSelect>
              </Grow>
              <Grow gap={8}>
                <NativeSelect width="lg" defaultValue="" error errorPs="bl" errorMsg="bottom left">
                  <NativeSelectOption value="">error</NativeSelectOption>
                </NativeSelect>
                <NativeSelect width="lg" defaultValue="" error errorPs="br" errorMsg="bottom right">
                  <NativeSelectOption value="">error</NativeSelectOption>
                </NativeSelect>
              </Grow>
            </Gcol>
          </StoryDocTemplate>
        );
      },
    },
    controls: { expanded: false },
  },
  argTypes: {
    onChange: {
      action: 'changed',
      table: { category: '이벤트 props' },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'text'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md'],
      table: { category: '스타일 props' },
    },
    width: {
      control: { type: 'text' },
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
    showTooltipOnReadOnly: {
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
    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    className: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    size: 'lg',
    width: 'full',
    disabled: false,
    required: false,
    readOnly: false,
    error: false,
    errorMsg: '선택은 필수입니다.',
    errorPs: 'bl',
  },
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

export const Default: Story = {
  render: (args) => {
    const { value: initialValue, ...restArgs } = args;
    const [value, setValue] = React.useState(initialValue ?? '');

    React.useEffect(() => {
      setValue(initialValue ?? '');
    }, [initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <NativeSelect {...restArgs} value={value} onChange={handleChange}>
        <NativeSelectOption value="">선택하세요</NativeSelectOption>
        {options.map((o) => (
          <NativeSelectOption key={o.value} value={o.value}>
            {o.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    );
  },
};
