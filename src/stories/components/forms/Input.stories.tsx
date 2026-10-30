/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Grow, Gcol } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

const testMsg = 'top left\n 에러';

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

            <h2 className="mt-8">Overflow Tooltip (말줄임 시 툴팁 자동 생성)</h2>
            <p>
              readOnly 또는 disabled 상태에서 텍스트가 인풋 너비를 초과해 잘리면(말줄임 발생) 마우스 오버 시 전체 내용을
              볼 수 있는 툴팁이 자동으로 생성됩니다.
            </p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <div className="flex flex-col gap-2 w-[20rem]">
                  <span className="text-[1.2rem] font-bold text-gray-800">readOnly 말줄임 (툴팁 생성)</span>
                  <Input readOnly value="한화손해보험 장기보험 계약관리시스템 차세대 프로젝트" width="full" />
                </div>
                <div className="flex flex-col gap-2 w-[20rem]">
                  <span className="text-[1.2rem] font-bold text-gray-800">disabled 말줄임 (툴팁 생성)</span>
                  <Input disabled value="비활성화 상태에서도 텍스트가 잘리면 툴팁이 정상 동작합니다" width="full" />
                </div>
                <div className="flex flex-col gap-2 w-[20rem]">
                  <span className="text-[1.2rem] font-bold text-gray-800">말줄임 없음 (툴팁 미생성)</span>
                  <Input readOnly value="짧은 텍스트" width="full" />
                </div>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Error</h2>
            <p>에러 메시지 위치 옵션 예시입니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Input error errorPs="tl" errorMsg={testMsg} placeholder="tl" />
                <Input error errorPs="tc" errorMsg="top center 에러" placeholder="tc" />
                <Input error errorPs="tr" errorMsg="top right 에러" placeholder="tr" />
              </Grow>
              <Grow gap={8} className="mt-2">
                <Input error errorPs="bl" errorMsg="bottom left 에러" placeholder="bl" />
                <Input error errorPs="bc" errorMsg="bottom center 에러 bottom center 에러" placeholder="bc" />
                <Input error errorPs="br" errorMsg="bottom right 에러" placeholder="br" />
              </Grow>
            </Gcol>

            <h2 className="mt-8">Masking (개인정보 및 비밀번호 마스킹)</h2>
            <p>
              masking prop을 전달하면 우측에 눈 아이콘 버튼이 노출되며, 버튼 클릭 시 onMaskToggle 콜백을 통해 비동기로
              원본 정보(API 조회)를 받아와 갱신하거나 다시 원래 마스킹 상태로 전환할 수 있습니다.
            </p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <MaskingDocExample />
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
    masking: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '마스킹 토글 버튼(눈 아이콘) 표시 여부',
    },
    isMasked: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '외부 제어용 마스킹 상태 (true: 숨김, false: 표시)',
    },
    defaultMasked: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '비제어 초기 마스킹 상태 여부 (기본: true)',
    },
    isMaskLoading: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '마스킹 데이터 조회/갱신 중 로딩 상태 표시 여부',
    },
    onMaskToggle: {
      table: { disable: true },
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
    showTooltipOnReadOnly: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: 'readOnly 상태일 때 텍스트 말줄임 시 툴팁 노출 여부 (기본: true)',
    },
    showTooltipOnDisabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: 'disabled 상태일 때 텍스트 말줄임 시 툴팁 노출 여부 (기본: true)',
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
    dateColor: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
      description: '날짜 요일별 텍스트 색상 자동 적용 (토: 파랑, 일: 빨강)',
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
    masking: false,
    defaultMasked: true,
    dateColor: false,
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

function MaskingDocExample() {
  // 시나리오 1: 마스킹 해제 시 서버 API 등을 통해 원본 value를 받아와 갱신하고, 재마스킹 시 다시 원래 정보를 보여주는 콜백 패턴
  const maskedResidentNo = '900101-1******';
  const originalResidentNo = '900101-1234567';
  const [residentVal, setResidentVal] = React.useState(maskedResidentNo);
  const [isResidentLoading, setIsResidentLoading] = React.useState(false);

  const handleResidentMaskToggle = (nextMasked: boolean) => {
    setIsResidentLoading(true);
    // 모의 API 비동기 조회 (0.4초 후 데이터 갱신)
    setTimeout(() => {
      setIsResidentLoading(false);
      // nextMasked === false: 마스킹 해제 요청 -> 원본 정보 받아와서 표시
      // nextMasked === true: 마스킹 재적용 요청 -> 원래 마스킹 정보로 복구
      setResidentVal(nextMasked ? maskedResidentNo : originalResidentNo);
    }, 400);
  };

  // 시나리오 2: 일반 비밀번호 입력 필드 마스킹 토글 (type="password" + clear)
  const [passwordVal, setPasswordVal] = React.useState('123456!!!!!');

  return (
    <Grow gap={8} className="flex-wrap">
      <div className="flex flex-col gap-2 min-w-[24rem]">
        <span className="text-[1.2rem] font-bold text-gray-800">개인정보 API 재조회 콜백 연동 (onMaskToggle)</span>
        <Input
          masking
          isMaskLoading={isResidentLoading}
          value={residentVal}
          readOnly
          onMaskToggle={handleResidentMaskToggle}
          onChange={(e) => setResidentVal(e.target.value)}
          placeholder="주민등록번호"
          width="md"
        />
        <span className="text-[1.1rem] text-gray-500">
          * 눈 버튼 클릭 시 API 호출을 통해 원본/마스킹 value가 갱신됩니다.
        </span>
      </div>

      <div className="flex flex-col gap-2 min-w-[24rem]">
        <span className="text-[1.2rem] font-bold text-gray-800">비밀번호 입력 마스킹 (type="password" + clear)</span>
        <Input
          masking
          type="password"
          clear
          value={passwordVal}
          onChange={(e) => setPasswordVal(e.target.value)}
          placeholder="비밀번호 입력"
          width="md"
        />
        <span className="text-[1.1rem] text-gray-500">
          * type="password" 지정 시 텍스트/비밀번호 모드가 자동 토글됩니다.
        </span>
      </div>
    </Grow>
  );
}

export const Masking: Story = {
  name: '마스킹 토글 및 콜백 연동 (masking prop)',
  render: () => <MaskingDocExample />,
};

export const OverflowTooltip: Story = {
  name: '말줄임 자동 툴팁 (readOnly/disabled)',
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-2 w-[24rem]">
        <span className="text-[1.2rem] font-bold text-gray-800">1. readOnly 말줄임 툴팁</span>
        <Input readOnly value="한화손해보험 장기보험 계약관리시스템 차세대 프로젝트" width="full" />
      </div>
      <div className="flex flex-col gap-2 w-[24rem]">
        <span className="text-[1.2rem] font-bold text-gray-800">2. disabled 말줄임 툴팁</span>
        <Input
          disabled
          value="비활성화 상태에서도 텍스트가 잘리면 마우스 오버 시 툴팁이 정상 표시됩니다."
          width="full"
        />
      </div>
      <div className="flex flex-col gap-2 w-[24rem]">
        <span className="text-[1.2rem] font-bold text-gray-800">3. 말줄임 없는 경우 (툴팁 없음)</span>
        <Input readOnly value="한화손해보험" width="full" />
      </div>
      <div className="flex flex-col gap-2 w-[24rem]">
        <span className="text-[1.2rem] font-bold text-gray-800">
          4. 툴팁 비활성화 옵션 (showTooltipOnDisabled=false)
        </span>
        <Input
          disabled
          showTooltipOnDisabled={false}
          value="옵션으로 툴팁을 끈 비활성화 인풋 텍스트입니다."
          width="full"
        />
      </div>
    </div>
  ),
};
