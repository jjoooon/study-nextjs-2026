import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

import { LniPl020Data } from '@/features/pub/proto/data/LniPl020Data';
import { InfoContract } from '@/shared/components/features/InfoContract';

const meta: Meta<typeof InfoContract> = {
  title: 'Components/Features/Aside/계약정보(InfoContract)',
  component: InfoContract,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title /><br /><br />
          <h2>Overview</h2>
          <div>
            <p>
              InfoContract 컴포넌트는 보험 계약의 주요 정보를 Aside 영역에 표시하는 UI 요소입니다.<br />
              설계중, 보험시기, 계약자/피보험자, 유효기간 등 다양한 정보를 시각적으로 제공합니다.
            </p>
          </div>
          <Primary />
          <Controls />
          <Markdown>
            {`
#### InfoContract 주요 Props
- data: LniPl020DataType['aside'] (계약정보 데이터)

#### 예시
\`\`\`tsx
import { InfoContract } from '@/shared/components/features/InfoContract';
import { LniPl020Data } from '@/features/pub/proto/data/LniPl020Data';

<InfoContract data={LniPl020Data.aside.simpleContractInfo} />
\`\`\`
            `}
          </Markdown>
        </>
      ),
    },
  },
  argTypes: {
    data: {
      description: '계약정보 데이터 (LniPl020DataType[\'aside\'])',
      control: { type: 'object' },
      table: { category: 'Data' },
    },
  },
  args: {
    data: LniPl020Data.aside.simpleContractInfo,
  },
};

export default meta;

type Story = StoryObj<typeof InfoContract>;

export const Default: Story = {
  args: {
    data: LniPl020Data.aside.simpleContractInfo,
  },
};
