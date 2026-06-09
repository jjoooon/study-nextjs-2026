/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Grow, Gcol } from '@atoms';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
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
          <>
            <Title />
            <br />
            <br />
            <h2>History</h2>
            <ul>
              <li>2026.03.30</li>
            </ul>
            <h2>Overview</h2>
            <div>
              <p>
                Textarea 컴포넌트는 여러 줄 텍스트 입력을 위한 폼 UI 요소입니다.
                <br />
                기본 스타일과 outline 스타일을 지원하며, 에러 상태와 메시지 위치를 제어할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Textarea 컴포넌트는 다양한 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 입력(default)</li>
              <li>outline 스타일</li>
              <li>읽기 전용/비활성화 상태</li>
              <li>에러 메시지 및 위치 제어</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { Textarea } from '@uiux/Textarea';

<Textarea
  variant={'default' | 'outline'}
  placeholder={'내용을 입력하세요'}
  readOnly={false | true}
  disabled={false | true}

  error={false | true}
  errorMsg={'입력은 필수입니다.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'}

  minLength={10}
  showMinLengthCount={false | true}
/>
\`\`\`
              `}
            </Markdown>
          </>
        );
      },
    },
    controls: { expanded: false },
  },
  argTypes: {
    variant: { table: { disable: true } },

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
      control: { type: 'inline-radio' },
      options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
      table: { category: '에러 props' },
    },
    minLength: { table: { disable: true } },
    showMinLengthCount: { table: { disable: true } },
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
    showMinLengthCount: true,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => <Textarea {...args} />,
};
