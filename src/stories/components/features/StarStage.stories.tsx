/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StarStage } from '@/shared/components/features/StarStage';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol } from '@atoms';

const meta: Meta<typeof StarStage> = {
  title: 'Components/Features/StarStage',
  component: StarStage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="StarStage"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화 (StoryDocTemplate 적용)',
          ]}
          overview={`수익성 단계에 따라 별 아이콘과 상태 문구를 함께 표시하는 컴포넌트입니다.
전달받은 텍스트를 바탕으로 별 개수를 지능적으로 판별하여 활성화 상태를 제어할 수 있습니다.`}
          usageCode={`import { StarStage } from '@/shared/components/features/StarStage';

// 수익성 단계 4개 시각화
<StarStage star={4} profitabilityText="수익성 우량" />`}
          apiReference={[
            {
              prop: 'star',
              type: 'number',
              description: '별 활성화 개수 (0 ~ 5)',
            },
            {
              prop: 'profitabilityText',
              type: 'string',
              description: "수익성 안내 문구 ('저조'/'우량' 포함 시 별 활성 개수 매핑)",
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    star: {
      control: { type: 'number', min: 0, max: 5, step: 1 },
      description: '기본 별 활성화 개수. profitabilityText가 기본 문구가 아닐 때 적용됩니다.',
      table: { category: 'State' },
    },
    profitabilityText: {
      control: 'text',
      description: '텍스트 직접 입력 가능. 수익성 저조/수익성 우량이면 별 활성화도 함께 바뀝니다.',
      table: { category: 'Content' },
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
