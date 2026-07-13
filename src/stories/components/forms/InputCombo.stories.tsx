/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol } from '@atoms';
import { InputCombo } from '@common/InputCombo';

const meta: Meta<typeof InputCombo> = {
  title: 'Components/Forms/InputCombo',
  component: InputCombo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`InputCombo 컴포넌트는 Input과 Popover 리스트 기능을 결합한 컴포넌트입니다.
입력값에 따라 옵션을 필터링하고, 리스트 항목 선택 시 입력값을 간편하게 변경할 수 있습니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import { InputCombo } from '@common/InputCombo';
import { useState } from 'react';

const options = [
  { value: 'LA25094848895', label: 'LA25094848895' },
  { value: 'LA24094848896', label: 'LA24094848896' },
];

const [value, setValue] = useState('');

<InputCombo
  options={options}
  value={value}
  onChange={setValue}
  placeholder="증권번호를 입력하세요"
/>
            `}
          >
            <h2>Default</h2>
            <p>기본 테이블 그리드 목록형 콤보박스 예시입니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-[40rem]"
            >
              <InputCombo
                options={['LA25094848895', 'LA24094848896', 'LA23094848897']}
                value=""
                onChange={() => {}}
                placeholder="증권번호 입력/선택"
              />
            </Gcol>

            <h2 className="mt-8">Recommend Variant</h2>
            <p>둥근 칩 형태의 팝오버 목록형 콤보박스 예시입니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-[40rem]"
            >
              <InputCombo
                variant="recommend"
                options={[
                  { value: '1', label: '추천 옵션 A' },
                  { value: '2', label: '추천 옵션 B' },
                  { value: '3', label: '추천 옵션 C' },
                ]}
                value=""
                onChange={() => {}}
                placeholder="추천 항목 선택"
              />
            </Gcol>
          </StoryDocTemplate>
        );
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: '자동완성 옵션 목록',
      table: { category: '데이터 props' },
    },
    value: {
      control: 'text',
      description: '현재 입력값',
      table: { category: '데이터 props' },
    },
    onChange: {
      action: 'changed',
      table: { category: '이벤트 props' },
    },
    inputId: {
      control: 'text',
      table: { category: '설정 props' },
    },
    clear: {
      control: 'boolean',
      table: { category: '설정 props' },
    },
    placeholder: {
      control: 'text',
      table: { category: 'Input' },
    },
    readOnly: {
      control: 'boolean',
      table: { category: 'Input' },
    },
    required: {
      control: 'boolean',
      table: { category: 'Input' },
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'recommend'],
      table: { category: '스타일 props' },
    },
    size: {
      control: 'inline-radio',
      options: ['lg', 'md'],
      table: { category: 'Input' },
    },
    width: {
      control: 'text',
      table: { category: 'Input' },
    },
    col: {
      control: 'number',
      table: { category: '스타일 props' },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    options: [
      { value: 'LA25094848895', label: <td>LA25094848895 (활성)</td> },
      { value: 'LA24094848896', label: <td>LA24094848896 (해지)</td> },
      { value: 'LA23094848897', label: <td>LA23094848897 (실효)</td> },
    ],
    value: '',
    placeholder: '증권번호를 입력하세요',
    variant: 'default',
    size: 'lg',
    col: 1,
    clear: true,
    required: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof InputCombo>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string>((args.value as string) ?? '');
    React.useEffect(() => {
      setValue((args.value as string) ?? '');
    }, [args.value]);

    return (
      <InputCombo
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val as string);
          args.onChange?.(val);
        }}
      />
    );
  },
};
