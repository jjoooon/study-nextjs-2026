/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol, Grow } from '@atoms';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Tooltip, TooltipTrigger, TooltipContent } from '@uiux/Tooltip';

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
            overview={`RadioGroup 컴포넌트는 여러 옵션 중 단 하나를 선택할 때 사용하는 선택 UI입니다.
기본 원형 스타일, 버튼형 스타일, 칩 스타일을 제공하며, 필수/에러/비활성화 상태를 지원합니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { useState } from 'react';

const [value, setValue] = useState('option1');

<RadioGroup
  value={value}
  onValueChange={setValue}
  width="auto"
  required={false}
  disabled={false}
  error={false}
  errorMsg="하나를 선택해주세요."
  errorPs="bl"
>
  <RadioGroupItem variant="default" value="option1" id="r1">
    Option 1
  </RadioGroupItem>
  <RadioGroupItem variant="default" value="option2" id="r2">
    Option 2
  </RadioGroupItem>
</RadioGroup>
            `}
          >
            <h2>Variant</h2>
            <p>RadioGroupItem의 variant 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Default (기본 라디오)</p>
                  <RadioGroup defaultValue="1" width="auto" className="gap-2">
                    <RadioGroupItem variant="default" value="1" id="doc-v-1">
                      Default 1
                    </RadioGroupItem>
                    <RadioGroupItem variant="default" value="2" id="doc-v-2">
                      Default 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Button (버튼 타입)</p>
                  <RadioGroup defaultValue="1" width="auto" className="gap-2">
                    <RadioGroupItem variant="button" value="1" id="doc-b-1">
                      Button 1
                    </RadioGroupItem>
                    <RadioGroupItem variant="button" value="2" id="doc-b-2">
                      Button 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">ChipBox (칩 타입)</p>
                  <RadioGroup defaultValue="1" width="auto" className="gap-2">
                    <RadioGroupItem variant="chipBox" value="1" id="doc-chip-1">
                      ChipBox 1
                    </RadioGroupItem>
                    <RadioGroupItem variant="chipBox" value="2" id="doc-chip-2">
                      ChipBox 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Size</h2>
            <p>RadioGroupItem의 size 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Large (기본)</p>
                  <RadioGroup defaultValue="1" width="auto" className="gap-2">
                    <RadioGroupItem size="lg" value="1" id="doc-s-lg-1">
                      Large
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Medium</p>
                  <RadioGroup defaultValue="1" width="auto" className="gap-2">
                    <RadioGroupItem size="md" value="1" id="doc-s-md-1">
                      Medium
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Small (Button 전용)</p>
                  <RadioGroup defaultValue="1" width="auto" className="gap-2">
                    <RadioGroupItem variant="button" size="sm" value="1" id="doc-s-sm-1">
                      Small Button
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Color</h2>
            <p>RadioGroupItem의 color 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Primary (주황색 테마)</p>
                  <RadioGroup defaultValue="1" width="auto" className="gap-2">
                    <RadioGroupItem color="primary" value="1" id="doc-c-p-1">
                      primary
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Info (파란색 테마)</p>
                  <RadioGroup defaultValue="1" width="auto" className="gap-2">
                    <RadioGroupItem color="info" value="1" id="doc-c-i-1">
                      info
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
              </Grow>
            </Gcol>

            <h2 className="mt-8">State</h2>
            <p>required(필수), disabled(비활성) 상태를 지원합니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Required (필수 배경 강조)</p>
                  <RadioGroup defaultValue="1" required width="auto" className="gap-2">
                    <RadioGroupItem value="1" id="doc-r-1">
                      Required 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-r-2">
                      Required 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
                <Gcol gap={1}>
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Disabled (비활성화)</p>
                  <RadioGroup defaultValue="1" disabled width="auto" className="gap-2">
                    <RadioGroupItem value="1" id="doc-d-1">
                      Disabled 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-d-2">
                      Disabled 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Gcol>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Error</h2>
            <p>RadioGroup의 에러 메시지 위치 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <RadioGroup defaultValue="" error errorMsg="top left" errorPs="tl" width="auto" className="gap-2">
                  <RadioGroupItem value="1" id="doc-e-tl-1">
                    Error 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="doc-e-tl-2">
                    Error 2
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup defaultValue="" error errorMsg="top center" errorPs="tc" width="auto" className="gap-2">
                  <RadioGroupItem value="1" id="doc-e-tc-1">
                    Error 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="doc-e-tc-2">
                    Error 2
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup defaultValue="" error errorMsg="top right" errorPs="tr" width="auto" className="gap-2">
                  <RadioGroupItem value="1" id="doc-e-tr-1">
                    Error 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="doc-e-tr-2">
                    Error 2
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
              <Grow gap={8} className="flex-wrap mt-4">
                <RadioGroup defaultValue="" error errorMsg="bottom left" errorPs="bl" width="auto" className="gap-2">
                  <RadioGroupItem value="1" id="doc-e-bl-1">
                    Error 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="doc-e-bl-2">
                    Error 2
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup defaultValue="" error errorMsg="bottom center" errorPs="bc" width="auto" className="gap-2">
                  <RadioGroupItem value="1" id="doc-e-bc-1">
                    Error 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="doc-e-bc-2">
                    Error 2
                  </RadioGroupItem>
                </RadioGroup>
                <RadioGroup defaultValue="" error errorMsg="bottom right" errorPs="br" width="auto" className="gap-2">
                  <RadioGroupItem value="1" id="doc-e-br-1">
                    Error 1
                  </RadioGroupItem>
                  <RadioGroupItem value="2" id="doc-e-br-2">
                    Error 2
                  </RadioGroupItem>
                </RadioGroup>
              </Grow>
            </Gcol>
          </StoryDocTemplate>
        );
      },
    },
    controls: { expanded: false },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'button', 'chipBox'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md', 'sm'],
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
    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    required: {
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
      table: { disable: true },
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
    value: undefined,
    width: 'auto',
    disabled: false,
    required: false,
    error: false,
    errorMsg: '하나를 선택해주세요.',
    errorPs: 'bl',
    variant: 'default',
    size: 'lg',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<RadioGroupStoryProps>;

export const Default: Story = {
  render: (args) => {
    const initialValue = args.value ?? undefined;
    const [value, setValue] = React.useState<string | undefined>(initialValue);
    const { variant, size, color, value: _, ...groupArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? undefined);
    }, [args.value]);

    return (
      <RadioGroup {...groupArgs} value={value} onValueChange={setValue} className="gap-2">
        <RadioGroupItem variant={variant} size={size} color={color} value="option1" id="d1">
          Option 1
        </RadioGroupItem>
        <RadioGroupItem variant={variant} size={size} color={color} value="option2" id="d2">
          Option 2
        </RadioGroupItem>
        <RadioGroupItem variant={variant} size={size} color={color} value="option3" id="d3" disabled>
          Option 3 (Disabled)
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
        <p className="text-[1.4rem] font-bold text-[var(--color-gray-90)] mb-2">
          라디오 항목 및 텍스트 영역 마우스 오버 툴팁 샘플
        </p>

        <RadioGroup value={value} onValueChange={setValue} width="auto" className="gap-6">
          {/* 1. 라디오 아이템 전체에 툴팁 적용 (Default 스타일) */}
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

          {/* 2. 텍스트 영역에만 툴팁 적용 */}
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

          {/* 3. 버튼 타입 라디오에 툴팁 적용 */}
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
