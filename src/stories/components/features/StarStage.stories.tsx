/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Gcol } from '@atoms';
import { Controls, Markdown, Primary, Title } from '@storybook/addon-docs/blocks';
import { StarStage } from '@/shared/components/features/StarStage';

const meta: Meta<typeof StarStage> = {
  title: 'Components/Features/StarStage',
  component: StarStage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <h2>Overview</h2>
          <p>수익성 단계에 따라 별 아이콘과 상태 문구를 함께 표시하는 컴포넌트입니다.</p>
          <Primary />
          <Controls />
          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
import { StarStage } from '@/shared/components/features/StarStage';

<StarStage star={4} profitabilityText="수익성 우량" />
\`\`\`
            `}
          </Markdown>
          <p>
            profitabilityText에 <b>수익성 저조</b>, <b>수익성 우량</b>을 입력하면 텍스트에 맞춰 별 활성화가 함께 변경됩니다.
            그 외 텍스트를 입력하면 별 개수는 star 값을 따릅니다.
          </p>
          <h2>API Reference</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>star</td><td>number</td><td>활성화할 별 개수입니다.</td></tr>
              <tr><td>profitabilityText</td><td>string</td><td>텍스트를 직접 입력할 수 있고, 기본 문구를 쓰면 별 상태도 함께 바뀝니다.</td></tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
  argTypes: {
    star: {
      control: { type: 'number', min: 0, max: 5, step: 1 },
      description: '기본 별 활성화 개수. profitabilityText가 기본 문구가 아닐 때 적용됩니다.',
    },
    profitabilityText: {
      control: 'text',
      description: '텍스트 직접 입력 가능. 수익성 저조/수익성 우량이면 별 활성화도 함께 바뀝니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof StarStage>;

export const Default: Story = {
  name: '기본',
  render: (args) => (
    <Gcol className="w-[24rem] border border-[var(--color-gray-20)] rounded-md p-4">
      <StarStage {...args} />
    </Gcol>
  ),
  args: {
    star: 4,
    profitabilityText: '수익성 우량',
  },
};

export const LowProfitability: Story = {
  name: '수익성 저조',
  render: (args) => (
    <Gcol className="w-[24rem] border border-[var(--color-gray-20)] rounded-md p-4">
      <StarStage {...args} />
    </Gcol>
  ),
  args: {
    star: 2,
    profitabilityText: '수익성 저조',
  },
};