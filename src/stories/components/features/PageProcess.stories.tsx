import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

import PageProcess, { type PageProcessItem } from '@/shared/components/features/PageProcess';

const demoItems: PageProcessItem[] = [
  { step: 1, label: '계약사항' },
  { step: 2, label: '담보설계' },
  { step: 3, label: '알릴사항' },
  { step: 4, label: '심사요청' },
  { step: 5, label: '추가사항' },
  { step: 6, label: '수납' },
];

const meta: Meta<typeof PageProcess> = {
  title: 'Components/Features/PageProcess',
  component: PageProcess,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <br />
          <h2>Overview</h2>
          <div>
            <p>
              PageProcess 컴포넌트는 페이지의 주요 업무 단계를 시각적으로 보여주는 수직 프로세스 바입니다.
              <br />
              현재 활성화된 단계와 완료된 단계를 시각적으로 구분하여 사용자가 진행 상태를 쉽게 파악할 수 있도록 돕습니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>PageProcess 컴포넌트는 단계 목록/상태를 props로 전달받아 표시합니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import PageProcess from '@/shared/components/features/PageProcess';

const items = [
  { step: 1, label: '계약사항' },
  { step: 2, label: '담보설계' },
  { step: 3, label: '알릴사항' },
];

<PageProcess
  items={items}
  completeSteps={[1]}
  activeStep={2}
/>
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <p>
            필수 props는 <strong>items</strong>이며, 완료 단계는 <strong>completeSteps</strong>,
            현재 단계는 <strong>activeStep</strong> 또는 <strong>defaultActiveStep</strong>으로 제어합니다.
          </p>
        </>
      ),
    },
  },
  argTypes: {
    onStepChange: { action: 'step changed' },
  },
  args: {
    items: demoItems,
    completeSteps: [1],
    activeStep: 2,
  },
};

export default meta;
type Story = StoryObj<typeof PageProcess>;

export const Default: Story = {
  render: (args) => <PageProcess {...args} />,
};

export const WithDefaultActiveOnly: Story = {
  args: {
    items: demoItems,
    completeSteps: [1, 2],
    activeStep: undefined,
    defaultActiveStep: 3,
  },
};