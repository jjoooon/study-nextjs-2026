/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Grow, Gcol } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`Input 컴포넌트는 사용자로부터 텍스트 기반의 데이터를 입력받기 위한 UI 요소입니다.
일관된 디자인 시스템을 유지하며 다양한 입력 시나리오(마스킹 포맷터, 금액 콤마, 읽기 전용, 클리어 버튼 등)에 대응할 수 있도록 설계되었습니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import { Input } from '@uiux/Input';

<Input
  variant="default"
  size="lg"
  placeholder="이름을 입력하세요"
/>
            `}
          >
            <h2>Variant</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Input placeholder="default variant" />
                <Input variant="ghost" placeholder="ghost variant" />
              </Grow>
            </Gcol>

            <h2 className="mt-8">Size</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Grow
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Input size="lg" placeholder="lg: 2.8rem (기본)" />
              <Input size="sm" placeholder="sm: 2.5rem" />
            </Grow>

            <h2 className="mt-8">Width</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 width 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={2}
              className="w-[60rem] p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem]"
            >
              <Input width="full" placeholder="full (100%)" />
              <Input width="max" placeholder="max (최대 너비)" />
              <Input width="2xs" placeholder="2xs" />
              <Input width="xs" placeholder="xs" />
              <Input width="sm" placeholder="sm" />
              <Input width="md" placeholder="md" />
              <Input width="lg" placeholder="lg" />
              <Input width="xl" placeholder="xl" />
              <Input width="2xl" placeholder="2xl" />
            </Gcol>

            <h2 className="mt-8">State</h2>
            <p>required, readOnly, disabled 상태를 지원합니다.</p>
            <Grow
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Input required placeholder="required (필수 입력)" />
              <Input readOnly value="readOnly (읽기 전용)" />
              <Input disabled placeholder="disabled (비활성화)" />
            </Grow>

            <h2 className="mt-8">Error</h2>
            <p>에러 메시지 위치 옵션 예시입니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Input error errorPs="tl" errorMsg="top left 에러" placeholder="tl" />
                <Input error errorPs="tc" errorMsg="top center 에러" placeholder="tc" />
                <Input error errorPs="tr" errorMsg="top right 에러" placeholder="tr" />
              </Grow>
              <Grow gap={8} className="mt-2">
                <Input error errorPs="bl" errorMsg="bottom left 에러" placeholder="bl" />
                <Input error errorPs="bc" errorMsg="bottom center 에러" placeholder="bc" />
                <Input error errorPs="br" errorMsg="bottom right 에러" placeholder="br" />
              </Grow>
            </Gcol>

            <h2 className="mt-8">Focus Control (Ref)</h2>
            <p>버튼 클릭 시 ref.current.focus()를 호출하여 Input에 포커스를 부여할 수 있습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <FocusControlDocExample />
            </Gcol>

            <h2 className="mt-8">Declarative Focus (isFocused Prop)</h2>
            <p>ref 없이 isFocused={true} 상태값을 전달하여 상위 컴포넌트에서 선언적으로 포커스를 제어할 수 있습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <DeclarativeFocusDocExample />
            </Gcol>
          </StoryDocTemplate>
        );
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost', 'info'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md', 'sm', 'xs'],
      table: { category: '스타일 props' },
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'auto', 'quoteNo', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
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
    maxLength: {
      control: { type: 'number' },
      table: { category: '설정 props' },
    },
    minLength: {
      control: { type: 'number' },
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
    commaAmount: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    clear: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    formatter: {
      control: { type: 'text' },
      table: { category: '설정 props' },
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      table: { category: '스타일 props' },
    },
    restrictChars: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    forceFocused: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    isFocused: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    onErrorChange: {
      table: { disable: true },
    },
    before: {
      control: false,
      table: { category: '설정 props' },
    },
    after: {
      control: false,
      table: { category: '설정 props' },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    size: 'lg',
    width: 'sm',
    required: false,
    readOnly: false,
    disabled: false,
    maxLength: 10,
    minLength: 0,
    error: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
    commaAmount: false,
    clear: false,
    align: 'left',
    restrictChars: true,
    forceFocused: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange?.(e);
        }}
      />
    );
  },
};

function FocusControlDocExample() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <Grow gap={4} className="items-center">
      <Input ref={inputRef} placeholder="버튼 클릭 시 포커스가 이동합니다" width="md" />
      <Button onClick={handleFocus} color="primary" size="md">
        포커스 이동
      </Button>
    </Grow>
  );
}

export const FocusWithButton: Story = {
  name: '버튼 클릭 시 포커스 제어 (Ref)',
  render: () => <FocusControlDocExample />,
};

function DeclarativeFocusDocExample() {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Grow gap={4} className="items-center">
      <Input
        isFocused={isFocused}
        onBlur={() => setIsFocused(false)}
        placeholder="isFocused prop으로 제어되는 인풋"
        width="md"
      />
      <Button onClick={() => setIsFocused(true)} color="coolgray" size="md">
        isFocused={true} 변경
      </Button>
    </Grow>
  );
}

export const FocusWithProp: Story = {
  name: 'isFocused Prop으로 포커스 제어 (State)',
  render: () => <DeclarativeFocusDocExample />,
};
