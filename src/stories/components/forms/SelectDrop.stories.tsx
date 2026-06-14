/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol, Grow } from '@atoms';
import { Button } from '@uiux/Button';
import { SelectDrop } from '@common/SelectDrop';
import type { SelectDropProps } from '@common/SelectDrop';

type DemoValue =
  | '사망장해'
  | '진단비'
  | '입원/통원'
  | '수술/치료'
  | '골절/화상'
  | '검사/지원'
  | '운전/비용'
  | '재물/배상'
  | '기타';

type PriceValue = '5만원이하' | '6-9만원' | '10~14만원' | '15만원 이상';

type SelectDropStoryProps = SelectDropProps<string>;

const demoOptions: ReadonlyArray<{ label: string; value: DemoValue }> = [
  { label: '사망장해', value: '사망장해' },
  { label: '진단비', value: '진단비' },
  { label: '입원/통원', value: '입원/통원' },
  { label: '수술/치료', value: '수술/치료' },
  { label: '골절/화상', value: '골절/화상' },
  { label: '검사/지원', value: '검사/지원' },
  { label: '운전/비용', value: '운전/비용' },
  { label: '재물/배상', value: '재물/배상' },
  { label: '기타', value: '기타' },
] as const;

const priceOptions: ReadonlyArray<{ label: string; value: PriceValue }> = [
  { label: '5만원이하', value: '5만원이하' },
  { label: '6-9만원', value: '6-9만원' },
  { label: '10~14만원', value: '10~14만원' },
  { label: '15만원 이상', value: '15만원 이상' },
] as const;

const meta: Meta<SelectDropStoryProps> = {
  title: 'Components/Forms/SelectDrop',
  component: SelectDrop,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`SelectDrop 컴포넌트는 Popover 기반의 선택 UI입니다.
체크박스 다중 선택, 라디오 단일 선택, 직접입력, 필수/읽기 전용/에러 상태와 에러 메시지 위치 제어를 지원합니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import { SelectDrop } from '@common/SelectDrop';

<SelectDrop
  typeMode="checkbox"
  options={[
    { label: '사망장해', value: '사망장해' },
    { label: '진단비', value: '진단비' },
  ]}
  width="md"
  placeholder="선택해주세요."
/>
            `}
          >
            <h2>Selection Mode</h2>
            <p>checkbox(다중 선택), radio(단일 선택), custom(커스텀 UI) 세 가지 모드를 지원합니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Checkbox Mode (다중 선택)</p>
                  <SelectDrop
                    typeMode="checkbox"
                    width="md"
                    options={demoOptions}
                    defaultValue={['수술/치료', '재물/배상']}
                  />
                </Gcol>
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Radio Mode (단일 및 직접입력)</p>
                  <SelectDrop
                    typeMode="radio"
                    width="md"
                    options={priceOptions}
                    defaultValue={['6-9만원']}
                    allowCustomInput={true}
                    customInputLabel="직접입력"
                  />
                </Gcol>
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">
                    Custom Mode (레이어 UI 직접 구현)
                  </p>
                  <SelectDrop typeMode="custom" width="md" placeholder="커스텀 모드">
                    <Gcol className="w-full p-[0.2rem]">
                      <Button variant="outlined" size="md" className="w-full">
                        나만의설계저장
                      </Button>
                    </Gcol>
                  </SelectDrop>
                </Gcol>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Size</h2>
            <p>SelectDrop 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Grow
              gap={4}
              className="flex-wrap p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <SelectDrop typeMode="checkbox" width="md" size="lg" options={demoOptions} placeholder="lg: 28 (기본)" />
              <SelectDrop typeMode="checkbox" width="md" size="md" options={demoOptions} placeholder="md: 25" />
            </Grow>

            <h2 className="mt-8">Width</h2>
            <p>SelectDrop 컴포넌트에서 사용할 수 있는 width 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={2}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-[60rem]"
            >
              <SelectDrop width="full" options={demoOptions} placeholder="full" />
              <SelectDrop width="auto" options={demoOptions} placeholder="auto" />
              <SelectDrop width="2xs" options={demoOptions} placeholder="2xs" />
              <SelectDrop width="xs" options={demoOptions} placeholder="xs" />
              <SelectDrop width="sm" options={demoOptions} placeholder="sm" />
              <SelectDrop width="md" options={demoOptions} placeholder="md" />
              <SelectDrop width="lg" options={demoOptions} placeholder="lg" />
            </Gcol>

            <h2 className="mt-8">Required</h2>
            <p>required 옵션이 활성화되면 강조 스타일로 표시됩니다.</p>
            <Grow
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <SelectDrop width="md" required options={demoOptions} defaultValue={['진단비']} />
            </Grow>

            <h2 className="mt-8">ReadOnly</h2>
            <p>readOnly 옵션이 활성화되면 사용자 드롭다운 클릭이 차단됩니다.</p>
            <Grow
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <SelectDrop width="md" readOnly options={demoOptions} defaultValue={['진단비']} />
            </Grow>

            <h2 className="mt-8">Error</h2>
            <p>error 옵션이 활성화되면 에러 스타일과 메시지가 함께 표시됩니다.</p>
            <Gcol
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <SelectDrop width="lg" options={demoOptions} error errorPs="tl" errorMsg="top left" />
                <SelectDrop width="lg" options={demoOptions} error errorPs="tr" errorMsg="top right" />
              </Grow>
              <Grow gap={8}>
                <SelectDrop width="lg" options={demoOptions} error errorPs="bl" errorMsg="bottom left" />
                <SelectDrop width="lg" options={demoOptions} error errorPs="br" errorMsg="bottom right" />
              </Grow>
            </Gcol>
          </StoryDocTemplate>
        );
      },
    },
  },
  argTypes: {
    typeMode: {
      control: { type: 'inline-radio' },
      options: ['checkbox', 'radio', 'custom'],
      table: { category: '스타일 props' },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['default'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md'],
      table: { category: '스타일 props' },
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'auto', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: { category: '스타일 props' },
    },
    placeholder: {
      control: { type: 'text' },
      table: { category: '내용 props' },
    },
    required: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    readOnly: {
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
    minCount: {
      control: { type: 'number' },
      table: { category: '에러 props' },
    },
    side: {
      table: { disable: true },
    },
    align: {
      table: { disable: true },
    },
    sideOffset: {
      table: { disable: true },
    },
    options: {
      table: { disable: true },
    },
    defaultValue: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    onValueChange: {
      table: { disable: true },
    },
    allowCustomInput: {
      table: { disable: true },
    },
    customInputLabel: {
      table: { disable: true },
    },
    customInputValue: {
      table: { disable: true },
    },
    defaultCustomInputValue: {
      table: { disable: true },
    },
    onCustomInputValueChange: {
      table: { disable: true },
    },
    triggerClassName: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    typeMode: 'checkbox',
    variant: 'default',
    size: 'lg',
    width: 'md',
    placeholder: '선택해주세요.',
    required: false,
    readOnly: false,
    error: false,
    errorMsg: '선택은 필수입니다.',
    errorPs: 'bl',
    minCount: 1,
  },
};

export default meta;

type Story = StoryObj<SelectDropStoryProps>;

export const Default: Story = {
  render: (args) => {
    let mappedArgs: SelectDropStoryProps;
    if (args.typeMode === 'radio') {
      mappedArgs = {
        ...args,
        typeMode: 'radio',
        options: priceOptions,
        allowCustomInput: true,
        customInputLabel: '직접입력',
        defaultValue: undefined,
      };
    } else if (args.typeMode === 'checkbox') {
      mappedArgs = {
        ...args,
        typeMode: 'checkbox',
        options: demoOptions,
        defaultValue: undefined,
      };
    } else {
      mappedArgs = {
        ...args,
        typeMode: 'custom',
        options: undefined,
        defaultValue: undefined,
      };
    }
    if (args.typeMode === 'custom') {
      return (
        <SelectDrop {...mappedArgs}>
          <Gcol className="w-full p-[0.2rem]">
            <Button variant="outlined" size="md" className="w-full">
              나만의설계저장
            </Button>
          </Gcol>
        </SelectDrop>
      );
    }
    return <SelectDrop {...mappedArgs} />;
  },
};

export const CustomModeSample: Story = {
  name: 'Custom 모드 샘플',
  render: () => (
    <div>
      <SelectDrop typeMode="custom" width="md" placeholder="커스텀 모드 (옵션 UI 직접 구현)" />
      <div
        style={{ border: '1px dashed #aaa', padding: 12, marginTop: 8, borderRadius: 6, color: '#888', fontSize: 15 }}
      >
        <b>Custom 모드 샘플:</b> <br />
        이 영역에 원하는 커스텀 옵션 UI를 직접 구현할 수 있습니다.
        <br />
        <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
          <li>트리거(버튼)는 SelectDrop이 제공</li>
          <li>옵션 레이어 내부 UI는 직접 구현</li>
          <li>options/value 등은 무시됨</li>
        </ul>
      </div>
    </div>
  ),
};
