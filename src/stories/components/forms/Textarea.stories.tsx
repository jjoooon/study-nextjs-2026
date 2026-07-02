/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Grow, Gcol } from '@atoms';
import { Textarea } from '@uiux/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`Textarea 컴포넌트는 여러 줄 텍스트 입력을 위한 폼 UI 요소입니다.
기본 스타일과 outline 스타일을 지원하며, 리사이즈 제어, 최대 글자 수 표시, 에러 상태와 메시지 위치를 제어할 수 있습니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import { Textarea } from '@uiux/Textarea';

<Textarea
  variant="default"
  placeholder="내용을 입력하세요"
  readOnly={false}
  disabled={false}
  error={false}
  errorMsg="입력은 필수입니다."
  errorPs="bl"
  maxLength={100}
/>
            `}
          >
            <h2>Variant</h2>
            <p>Textarea 컴포넌트에서 제공하는 variant는 default와 outline이 있습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <Gcol gap={1} className="w-[30rem]">
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Default (기본 스타일)</p>
                  <Textarea variant="default" placeholder="기본 스타일 텍스트박스" />
                </Gcol>
                <Gcol gap={1} className="w-[30rem]">
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Outline (아웃라인 테두리)</p>
                  <Textarea variant="outline" placeholder="아웃라인 테두리 스타일 텍스트박스" />
                </Gcol>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Resize & MaxLength</h2>
            <p>리사이즈 가능 방향 설정 및 글자 수 카운터 기능을 제공합니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <Gcol gap={1} className="w-[30rem]">
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">
                    세로 방향 리사이즈만 허용 & 글자수 제한(50B)
                  </p>
                  <Textarea resize="y" maxLength={50} placeholder="resize='y' maxLength={50}" />
                </Gcol>
                <Gcol gap={1} className="w-[30rem]">
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">리사이즈 차단 & 기본 입력</p>
                  <Textarea resize="" maxLength={50} placeholder="resize=''" />
                </Gcol>
              </Grow>
            </Gcol>

            <h2 className="mt-8">State</h2>
            <p>readOnly(읽기 전용)와 disabled(비활성) 상태를 지원합니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8} className="flex-wrap">
                <Gcol gap={1} className="w-[30rem]">
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">ReadOnly (읽기 전용)</p>
                  <Textarea readOnly defaultValue="이 텍스트는 수정할 수 없는 읽기 전용 상태입니다." />
                </Gcol>
                <Gcol gap={1} className="w-[30rem]">
                  <p className="text-[1.2rem] font-bold text-[var(--color-text-sub)]">Disabled (비활성)</p>
                  <Textarea disabled placeholder="비활성화되어 입력을 할 수 없습니다." />
                </Gcol>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Error</h2>
            <p>error 옵션이 활성화되면 에러 스타일과 에러 메시지가 함께 노출됩니다.</p>
            <Gcol
              gap={8}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={8}>
                <Textarea error errorPs="tl" errorMsg="top left" placeholder="에러 노출 영역" />
                <Textarea error errorPs="tr" errorMsg="top right" placeholder="에러 노출 영역" />
              </Grow>
              <Grow gap={8}>
                <Textarea error errorPs="bl" errorMsg="bottom left" placeholder="에러 노출 영역" />
                <Textarea error errorPs="br" errorMsg="bottom right" placeholder="에러 노출 영역" />
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
      options: ['default', 'outline'],
      table: { category: '스타일 props' },
    },
    resize: {
      control: { type: 'select' },
      options: [true, 'y', ''],
      table: { category: '스타일 props' },
    },
    maxLength: {
      control: { type: 'number' },
      table: { category: '설정 props' },
    },
    restrictChars: {
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
    placeholder: {
      control: { type: 'text' },
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
    minLength: { table: { disable: true } },
    className: { table: { disable: true } },
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  args: {
    placeholder: '내용을 입력하세요',
    variant: 'default',
    readOnly: false,
    disabled: false,
    error: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
    resize: true,
    maxLength: 0,
    restrictChars: true,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => <Textarea {...args} />,
};
