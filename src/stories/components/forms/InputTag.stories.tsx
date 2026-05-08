/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

import { InputTag } from "@common/InputTag";

const meta: Meta<typeof InputTag> = {
  title: "Components/Forms/InputTag",
  component: InputTag,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
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
              InputTag 컴포넌트는 태그 입력을 위한 폼 UI 요소입니다.<br />
              최대 입력 개수와 플레이스홀더를 설정할 수 있으며, 현재 입력된 태그를 표시할 수 있습니다.
            </p>
          </div>
          <Primary />
          <Controls />
          <Markdown>
            {`
\`\`\`tsx
import { InputTag } from '@common/InputTag';

<InputTag value={['예시']} onChange={console.log} placeholder="태그 입력" maxTags={3} />
\`\`\`
            `}
          </Markdown>
        </>
      ),
    },
    controls: { expanded: false },
  },
  argTypes: {
    value: {table: { disable: true },},
    onChange:{table: { disable: true },},
    variant : {
      control: { type: 'inline-radio' },
      options: ['default', 'box-line'],
      description: 'Input 스타일 variant',
    },
    placeholder: {
      control: 'text',
      description: '입력창 placeholder',
      table: { type: { summary: 'string' } },
    },
    maxTags: {
      control: { type: 'number', min: 1, max: 10 },
      description: '최대 입력 가능한 태그 개수',
      table: { type: { summary: 'number' } },
    },
    disabled:{table: { disable: true },},

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
    className: {table: { disable: true },},
  },
   args: {
    variant: 'default',
    value: [],
    placeholder: '태그를 입력하세요',
    maxTags: 10,
    disabled: false,
    error: false,
    errorMsg: '선택은 필수입니다.',
    errorPs: 'bl',
   }
};
export default meta;

type Story = StoryObj<typeof InputTag>;

export const Default: Story = {
  render: (args) => {
    const [tags, setTags] = React.useState<string[]>([]);
    return (
      <div style={{ maxWidth: 400 }}>
        <InputTag
          {...args}
          value={tags}
          onChange={setTags}
          placeholder="태그를 입력하세요"
          maxTags={3}
        />
        <div style={{ marginTop: 12, fontSize: 14, color: '#888' }}>
          현재 태그: {tags.length === 0 ? '없음' : tags.join(', ')}
        </div>
      </div>
    );
  },
};

