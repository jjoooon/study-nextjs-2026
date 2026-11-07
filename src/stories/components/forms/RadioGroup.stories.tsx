/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol, Grow, Typo } from '@atoms';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

type RadioGroupStoryProps = React.ComponentProps<typeof RadioGroup> &
  Pick<React.ComponentProps<typeof RadioGroupItem>, 'variant' | 'size' | 'color'>;

const meta: Meta<RadioGroupStoryProps> = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`RadioGroup 컴포넌트는 여러 옵션 중 단 하나를 선택할 때 사용하는 폼 입력 UI입니다.
디자인 시스템에 맞춘 variant(default, button, noCheckButton, chipBox, tab, folderTab, tabBadge), 크기, 색상, 상태(checked/required/disabled/error)를 지원합니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { useState } from 'react';

const [value, setValue] = useState('option1');

<RadioGroup
  value={value}
  onValueChange={setValue}
  variant="default"
  size="lg"
  color="primary"
  width="auto"
  required={false}
  disabled={false}
  allowDeselect={false}
  error={false}
  errorMsg="하나를 선택해주세요."
  errorPs="bl"
>
  <RadioGroupItem value="option1" id="r1">
    옵션 1
  </RadioGroupItem>
  <RadioGroupItem value="option2" id="r2">
    옵션 2
  </RadioGroupItem>
</RadioGroup>
            `}
          >
            <h2>Variant</h2>
            <p>RadioGroup 및 RadioGroupItem 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  default
                </Typo>
                <RadioGroup defaultValue="1" variant="default" className="gap-4">
                  <RadioGroupItem value="1" id="v-def-1">
                    default 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="v-def-2">
                    default 2
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  button
                </Typo>
                <RadioGroup defaultValue="1" variant="button" className="gap-2">
                  <RadioGroupItem value="1" id="v-btn-1">
                    button 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="v-btn-2">
                    button 2
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  noCheckButton
                </Typo>
                <RadioGroup defaultValue="1" variant="noCheckButton" className="gap-2">
                  <RadioGroupItem value="1" id="v-ncbtn-1">
                    noCheckButton 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="v-ncbtn-2">
                    noCheckButton 2
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  chipBox
                </Typo>
                <RadioGroup defaultValue="1" variant="chipBox" className="gap-2">
                  <RadioGroupItem value="1" id="v-chip-1">
                    chipBox 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="v-chip-2">
                    chipBox 2
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  tab / folderTab
                </Typo>
                <div className="flex-1">
                  <RadioGroup defaultValue="1" variant="tab" width="full">
                    <RadioGroupItem value="1" id="v-tab-1">
                      상품옵션
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="v-tab-2">
                      상품선택
                    </RadioGroupItem>
                  </RadioGroup>
                </div>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  tabBadge
                </Typo>
                <RadioGroup defaultValue="1" variant="tabBadge" className="gap-2">
                  <RadioGroupItem value="1" id="v-tb-1" className="gap-2">
                    <span>전체</span>
                    <span className="count-badge">5</span>
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="v-tb-2" className="gap-2">
                    <Grow className="gap-1">
                      <span>청약완료불가</span>
                      <span className="sub-label">(업계누적)</span>
                    </Grow>
                    <span className="count-badge">2</span>
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Size</h2>
            <p>RadioGroup 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  default (lg / md)
                </Typo>
                <RadioGroup defaultValue="lg" variant="default" className="gap-6">
                  <RadioGroupItem size="lg" value="lg" id="s-def-lg">
                    lg: 20
                  </RadioGroupItem>
                  <RadioGroupItem size="md" value="md" id="s-def-md">
                    md: 14
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  button (xl / lg / md / sm)
                </Typo>
                <RadioGroup defaultValue="lg" variant="button" className="gap-2">
                  <RadioGroupItem size="xl" value="xl" id="s-btn-xl">
                    xl: 48
                  </RadioGroupItem>
                  <RadioGroupItem size="lg" value="lg" id="s-btn-lg">
                    lg: 28
                  </RadioGroupItem>
                  <RadioGroupItem size="md" value="md" id="s-btn-md">
                    md: 25
                  </RadioGroupItem>
                  <RadioGroupItem size="sm" value="sm" id="s-btn-sm">
                    sm: 22
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Color</h2>
            <p>RadioGroup 컴포넌트에서 사용할 수 있는 color 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  primary
                </Typo>
                <RadioGroup defaultValue="1" color="primary" className="gap-4">
                  <RadioGroupItem variant="default" value="1" id="c-pri-def">
                    default
                  </RadioGroupItem>
                  <RadioGroupItem variant="button" value="1" id="c-pri-btn">
                    button
                  </RadioGroupItem>
                  <RadioGroupItem variant="chipBox" value="1" id="c-pri-chip">
                    chipBox
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[12rem] tracking-normal">
                  info
                </Typo>
                <RadioGroup defaultValue="1" color="info" className="gap-4">
                  <RadioGroupItem variant="default" value="1" id="c-info-def">
                    default
                  </RadioGroupItem>
                  <RadioGroupItem variant="button" value="1" id="c-info-btn">
                    button
                  </RadioGroupItem>
                  <RadioGroupItem variant="chipBox" value="1" id="c-info-chip">
                    chipBox
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
            </Gcol>

            <h2 className="mt-8">State</h2>
            <p>unchecked, checked, required, disabled 상태를 지원합니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Typo tag="div" className="w-[15rem] tracking-normal">
                  unchecked
                </Typo>
                <RadioGroup value="" className="gap-4">
                  <RadioGroupItem variant="default" value="1" id="st-un-def">
                    default
                  </RadioGroupItem>
                  <RadioGroupItem variant="button" value="2" id="st-un-btn">
                    button
                  </RadioGroupItem>
                  <RadioGroupItem variant="noCheckButton" value="3" id="st-un-ncbtn">
                    noCheckButton
                  </RadioGroupItem>
                  <RadioGroupItem variant="chipBox" value="4" id="st-un-chip">
                    chipBox
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[15rem] tracking-normal">
                  checked
                </Typo>
                <RadioGroup value="1" className="gap-4">
                  <RadioGroupItem variant="default" value="1" id="st-ch-def">
                    default
                  </RadioGroupItem>
                  <RadioGroupItem variant="button" value="1" id="st-ch-btn">
                    button
                  </RadioGroupItem>
                  <RadioGroupItem variant="noCheckButton" value="1" id="st-ch-ncbtn">
                    noCheckButton
                  </RadioGroupItem>
                  <RadioGroupItem variant="chipBox" value="1" id="st-ch-chip">
                    chipBox
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[15rem] tracking-normal">
                  required
                </Typo>
                <RadioGroup value="" required className="gap-4">
                  <RadioGroupItem variant="default" value="1" id="st-req-def">
                    default
                  </RadioGroupItem>
                  <RadioGroupItem variant="button" value="2" id="st-req-btn">
                    button
                  </RadioGroupItem>
                  <RadioGroupItem variant="noCheckButton" value="3" id="st-req-ncbtn">
                    noCheckButton
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[15rem] tracking-normal">
                  disabled
                </Typo>
                <RadioGroup value="1" disabled className="gap-4">
                  <RadioGroupItem variant="default" value="1" id="st-dis-def">
                    default (checked)
                  </RadioGroupItem>
                  <RadioGroupItem variant="default" value="2" id="st-dis-def-2">
                    default
                  </RadioGroupItem>
                  <RadioGroupItem variant="button" value="1" id="st-dis-btn">
                    button
                  </RadioGroupItem>
                  <RadioGroupItem variant="chipBox" value="1" id="st-dis-chip">
                    chipBox
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Error</h2>
            <p>에러 메시지 위치 옵션 예시입니다 (선택된 값이 없을 때 에러가 표시됩니다).</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow className="gap-[8rem]">
                <RadioGroup defaultValue="" error errorMsg="선택은 필수입니다." errorPs="tl">
                  <RadioGroupItem value="1" id="err-tl-1">
                    tl 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="err-tl-2">
                    tl 2
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup defaultValue="" error errorMsg="선택은 필수입니다." errorPs="tc">
                  <RadioGroupItem value="1" id="err-tc-1">
                    tc 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="err-tc-2">
                    tc 2
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup defaultValue="" error errorMsg="선택은 필수입니다." errorPs="tr">
                  <RadioGroupItem value="1" id="err-tr-1">
                    tr 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="err-tr-2">
                    tr 2
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow className="gap-[8rem] mt-2">
                <RadioGroup defaultValue="" error errorMsg="선택은 필수입니다." errorPs="bl">
                  <RadioGroupItem value="1" id="err-bl-1">
                    bl 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="err-bl-2">
                    bl 2
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup defaultValue="" error errorMsg="선택은 필수입니다." errorPs="bc">
                  <RadioGroupItem value="1" id="err-bc-1">
                    bc 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="err-bc-2">
                    bc 2
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup defaultValue="" error errorMsg="선택은 필수입니다." errorPs="br">
                  <RadioGroupItem value="1" id="err-br-1">
                    br 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="err-br-2">
                    br 2
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
            </Gcol>
          </StoryDocTemplate>
        );
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'button', 'noCheckButton', 'chipBox', 'tab', 'folderTab', 'tabBadge', 'none'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['xl', 'lg', 'md', 'sm'],
      table: { category: '스타일 props' },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'info'],
      table: { category: '스타일 props' },
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'auto'],
      table: { category: '스타일 props' },
    },
    required: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    allowDeselect: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    clearable: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    error: {
      control: { type: 'boolean' },
      table: { category: '에러 props' },
    },
    errorMsg: {
      control: { type: 'text' },
      table: { category: '에러 props' },
    },
    errorPs: {
      control: { type: 'select' },
      options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
      table: { category: '에러 props' },
    },
    onValueChange: {
      action: 'valueChanged',
      table: { category: '이벤트 props' },
    },
    className: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    defaultValue: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    size: 'lg',
    color: 'primary',
    width: 'auto',
    required: false,
    disabled: false,
    allowDeselect: false,
    clearable: false,
    error: false,
    errorMsg: '선택은 필수입니다.',
    errorPs: 'bl',
  },
};

export default meta;
type Story = StoryObj<RadioGroupStoryProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>(args.value ?? '');
    const { value: _, ...restArgs } = args;

    React.useEffect(() => {
      if (args.value !== undefined) {
        setValue(args.value ?? '');
      }
    }, [args.value]);

    const handleValueChange = (nextValue: string) => {
      setValue(nextValue);
      args.onValueChange?.(nextValue);
    };

    return (
      <RadioGroup {...restArgs} value={value} onValueChange={handleValueChange}>
        <RadioGroupItem value="option1" id="d1">
          {args.variant === 'tabBadge' ? (
            <>
              <span>옵션 A</span>
              <span className="count-badge">3</span>
            </>
          ) : (
            '옵션 A'
          )}
        </RadioGroupItem>
        <RadioGroupItem value="option2" id="d2">
          {args.variant === 'tabBadge' ? (
            <>
              <span>옵션 B</span>
              <span className="count-badge">1</span>
            </>
          ) : (
            '옵션 B'
          )}
        </RadioGroupItem>
        <RadioGroupItem value="option3" id="d3" disabled>
          {args.variant === 'tabBadge' ? (
            <>
              <span>옵션 C (비활성)</span>
              <span className="count-badge">0</span>
            </>
          ) : (
            '옵션 C (비활성)'
          )}
        </RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const WithTooltip: Story = {
  name: 'With Tooltip (툴팁 연동 예시)',
  render: () => {
    const [value, setValue] = React.useState('option1');

    return (
      <Gcol gap={4} className="p-8 border border-dashed border-[var(--color-gray-20)] rounded-[1rem] w-[50rem]">
        <Typo tag="p" className="text-[1.4rem] font-bold text-[var(--color-gray-90)] mb-2">
          라디오 항목 및 텍스트 영역 마우스 오버 툴팁 샘플
        </Typo>

        <RadioGroup value={value} onValueChange={setValue} width="auto" className="gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex">
                <RadioGroupItem value="option1" id="rg-tt-1">
                  옵션 1 (전체 툴팁)
                </RadioGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              옵션 1 선택 시 제공되는 혜택 및 상세 안내입니다.
            </TooltipContent>
          </Tooltip>

          <RadioGroupItem value="option2" id="rg-tt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted underline-offset-4 cursor-help">옵션 2 (텍스트 툴팁)</span>
              </TooltipTrigger>
              <TooltipContent side="top" variant="dark">
                텍스트 영역에 마우스 오버 시 표시되는 다크 툴팁입니다.
              </TooltipContent>
            </Tooltip>
          </RadioGroupItem>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex">
                <RadioGroupItem variant="button" value="option3" id="rg-tt-3">
                  버튼 옵션 3
                </RadioGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" variant="danger">
              주의: 이 항목은 추가 승인이 필요할 수 있습니다.
            </TooltipContent>
          </Tooltip>
        </RadioGroup>
      </Gcol>
    );
  },
};

