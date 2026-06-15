/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol, Grow, Typo } from '@atoms';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`Checkbox 컴포넌트는 사용자가 단일 또는 복수 옵션을 선택할 때 사용하는 폼 입력 UI입니다.
디자인 시스템에 맞춘 variant, 크기, 색상, 상태(checked/indeterminate/disabled)를 지원합니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { useState } from 'react';

// 단일 선택
const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
<Checkbox checked={checked} onCheckedChange={setChecked}>라벨</Checkbox>

// 그룹 선택
const [values, setValues] = useState<string[]>([]);
<CheckboxGroup value={values} onValueChange={setValues} minSelected={2}>
  <CheckboxGroupItem value="all" selectAll>전체</CheckboxGroupItem>
  <CheckboxGroupItem value="a">옵션 A</CheckboxGroupItem>
  <CheckboxGroupItem value="b">옵션 B</CheckboxGroupItem>
</CheckboxGroup>
            `}
          >
            <h2>Variant</h2>
            <p>Checkbox 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Typo tag="div" className="w-[9rem] tracking-normal">
                  default
                </Typo>
                <Grow className="w-[12rem]">
                  <Checkbox variant="default">default</Checkbox>
                </Grow>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[9rem] tracking-normal">
                  favorite
                </Typo>
                <Grow className="w-[12rem]">
                  <Checkbox variant="favorite" />
                </Grow>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[9rem] tracking-normal">
                  noneText
                </Typo>
                <Grow className="w-[12rem]">
                  <Checkbox variant="noneText">noneText</Checkbox>
                </Grow>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[9rem] tracking-normal">
                  button
                </Typo>
                <Grow className="w-[12rem]">
                  <Checkbox variant="button">button</Checkbox>
                </Grow>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[9rem] tracking-normal">
                  text
                </Typo>
                <Grow className="w-[12rem]">
                  <Checkbox variant="text">text</Checkbox>
                </Grow>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[9rem] tracking-normal">
                  chipBox
                </Typo>
                <Grow className="w-[12rem]">
                  <Checkbox variant="chipBox">
                    text<span>text</span>
                  </Checkbox>
                </Grow>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Size</h2>
            <p>Checkbox 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Grow
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Checkbox>lg: 20</Checkbox>
              <Checkbox size="md">md: 14</Checkbox>
            </Grow>

            <h2 className="mt-8">Color</h2>
            <p>Checkbox 컴포넌트에서 사용할 수 있는 color 옵션은 다음과 같습니다.</p>
            <Grow
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Checkbox color="primary" checked>
                primary
              </Checkbox>
              <Checkbox color="info" checked>
                info
              </Checkbox>
            </Grow>

            <h2 className="mt-8">State</h2>
            <p>checked, indeterminate, disabled 상태를 지원합니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Typo tag="div" className="w-[15rem] tracking-normal">
                  unchecked
                </Typo>
                <Checkbox variant="default">default</Checkbox>
                <Checkbox variant="favorite" />
                <Checkbox variant="noneText">noneText</Checkbox>
                <Checkbox variant="button">button</Checkbox>
                <Checkbox variant="text">text</Checkbox>
                <Checkbox variant="chipBox">
                  text<span>text</span>
                </Checkbox>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[15rem] tracking-normal">
                  checked
                </Typo>
                <Checkbox checked variant="default">
                  default
                </Checkbox>
                <Checkbox checked variant="favorite" />
                <Checkbox checked variant="noneText">
                  noneText
                </Checkbox>
                <Checkbox checked variant="button">
                  button
                </Checkbox>
                <Checkbox checked variant="text">
                  text
                </Checkbox>
                <Checkbox checked variant="chipBox">
                  text<span>text</span>
                </Checkbox>
              </Grow>
              <Grow gap={8}>
                <Typo tag="div" className="w-[15rem] tracking-normal">
                  disabled
                </Typo>
                <Checkbox disabled variant="default">
                  default
                </Checkbox>
                <Checkbox disabled variant="favorite" />
                <Checkbox disabled variant="noneText">
                  noneText
                </Checkbox>
                <Checkbox disabled variant="button">
                  button
                </Checkbox>
                <Checkbox disabled variant="text">
                  text
                </Checkbox>
                <Checkbox disabled variant="chipBox">
                  text<span>text</span>
                </Checkbox>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Error</h2>
            <p>에러 메시지 위치 옵션 예시입니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow className="gap-[8rem]">
                <Checkbox error errorMsg="입력은 필수입니다." errorPs="tl">
                  tl
                </Checkbox>
                <Checkbox error errorMsg="입력은 필수입니다." errorPs="tc">
                  tc
                </Checkbox>
                <Checkbox error errorMsg="입력은 필수입니다." errorPs="tr">
                  tr
                </Checkbox>
              </Grow>
              <Grow className="gap-[8rem] mt-2">
                <Checkbox error errorMsg="입력은 필수입니다." errorPs="bl">
                  bl
                </Checkbox>
                <Checkbox error errorMsg="입력은 필수입니다." errorPs="bc">
                  bc
                </Checkbox>
                <Checkbox error errorMsg="입력은 필수입니다." errorPs="br">
                  br
                </Checkbox>
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
      options: ['default', 'favorite', 'noneText', 'button', 'text', 'chipBox'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md', 'xl', 'sm'],
      table: { category: '스타일 props' },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'info', 'secondary'],
      table: { category: '스타일 props' },
    },
    checked: {
      control: { type: 'select' },
      options: [false, true, 'indeterminate'],
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
    required: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    showErrorMsg: {
      control: { type: 'boolean' },
      table: { category: '에러 props' },
    },
    children: {
      control: { type: 'text' },
      table: { category: '설정 props' },
    },
    onCheckedChange: {
      action: 'checkedChanged',
      table: { category: '이벤트 props' },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    size: 'lg',
    color: 'primary',
    required: false,
    error: false,
    errorMsg: '선택은 필수입니다.',
    errorPs: 'bl',
    checked: false,
    disabled: false,
    showErrorMsg: true,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(args.checked ?? false);
    const { checked: _, ...restArgs } = args;
    const [values, setValues] = React.useState<string[]>([]);
    const minSelected = 2;

    React.useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    const groupSize = args.size === 'sm' ? 'md' : args.size === 'xl' ? 'lg' : args.size;

    const handleCheckedChange = (value: boolean | 'indeterminate') => {
      setChecked(value);
      args.onCheckedChange?.(value);
    };

    const handleGroupChange = (nextValues: string[]) => {
      setValues(nextValues);
    };

    return (
      <Gcol gap={8}>
        <Checkbox {...restArgs} checked={checked} onCheckedChange={handleCheckedChange}>
          {args.variant === 'chipBox' ? (
            <>
              단일<span>체크</span>
            </>
          ) : (
            '단일'
          )}
        </Checkbox>

        <Grow gap={2}>
          <Typo tag={'div'} className="w-[8rem]">
            그룹체크
          </Typo>
          <CheckboxGroup
            value={values}
            onValueChange={handleGroupChange}
            variant={args.variant}
            size={groupSize}
            color={args.color}
            disabled={args.disabled}
            minSelected={minSelected}
            required={args.required}
            error={args.error}
            errorPs={args.errorPs}
            errorMsg={`${minSelected}개 이상 선택해 주세요.`}
            className="gap-3"
          >
            <CheckboxGroupItem value="all" selectAll>
              {args.variant === 'chipBox' ? (
                <>
                  <strong>전체</strong>
                  <span>선택</span>
                </>
              ) : (
                '전체'
              )}
            </CheckboxGroupItem>
            <CheckboxGroupItem value="a">
              {args.variant === 'chipBox' ? (
                <>
                  <strong>옵션</strong>
                  <span>A</span>
                </>
              ) : (
                '옵션 A'
              )}
            </CheckboxGroupItem>
            <CheckboxGroupItem value="b">
              {args.variant === 'chipBox' ? (
                <>
                  <strong>옵션</strong>
                  <span>B</span>
                </>
              ) : (
                '옵션 B'
              )}
            </CheckboxGroupItem>
          </CheckboxGroup>
        </Grow>
      </Gcol>
    );
  },
};
