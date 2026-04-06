import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Gcol } from '@atoms';
import { SuggestionCard } from '@/shared/components/common/SuggestionCard';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { SuggestionCardProps } from '@/shared/components/common/SuggestionCard';

const meta: Meta<SuggestionCardProps> = {
  title: 'Components/Features/SuggestionCard',
  component: SuggestionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <h2>Overview</h2>
          <p>
            보험 상품 목록 상단에 위치하여 추천 그룹의 제목을 표시하는 카드 컴포넌트입니다.
          </p>
          <Primary />
          <Controls />
          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
import { SuggestionCard } from '@features/SuggestionCard';

<SuggestionCard
  title="회사추천 TOP3"
  type="type1"
  showAiIcon={true}
/>
\`\`\`
            `}
          </Markdown>
          <h2>API Reference</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입/옵션</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>title</td><td>string</td><td>영역 상단 텍스트</td></tr>
              <tr><td>type</td><td>'type1' | 'type2' | 'type3'</td><td>카드 타입 (아이콘 및 배경색)</td></tr>
              <tr><td>showAiIcon</td><td>boolean</td><td>우측 AI 아이콘 노출 여부</td></tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
  argTypes: {
    // title: {
    //   control: 'text',
    //   description: '상단 텍스트',
    // },
    type: {
      control: 'select',
      options: ['type1', 'type2', 'type3'],
      description: '카드 타입',
    },
    showAiIcon: {
      control: 'boolean',
      description: 'AI 아이콘 노출 여부',
    },
  },
};

export default meta;

type Story = StoryObj<SuggestionCardProps>;

export const Default: Story = {
  name: '기본 (Type1)',
  render: (args) => (
    <Gcol className="w-[28rem]">
      <SuggestionCard {...args} />
    </Gcol>
  ),
  args: {
    title: '회사추전 TOP3',
    type: 'type1',
    showAiIcon: false,
  },
};

export const Type2: Story = {
  name: 'Type2',
  render: (args) => (
    <Gcol className="w-[28rem]">
      <SuggestionCard {...args} />
    </Gcol>
  ),
  args: {
    title: '담보추전 TOP3',
    type: 'type2',
    showAiIcon: true,
  },
};

export const Type3: Story = {
  name: 'Type3',
  render: (args) => (
    <Gcol className="w-[28rem]">
      <SuggestionCard {...args} />
    </Gcol>
  ),
  args: {
    title: '보장추전 TOP3',
    type: 'type3',
    showAiIcon: false,
  },
};