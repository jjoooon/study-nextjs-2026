import type { Meta, StoryObj } from '@storybook/react';
import { Title, Subtitle, Primary, Controls, Canvas, Markdown } from '@storybook/addon-docs/blocks';
import { Gcol } from '@atoms';
import { DesignStart, DesignGeneration, LTPA350Step1, LTPA350Step2 } from '@features/MainFoot';

const meta: Meta<typeof DesignStart> = {
  title: 'Components/Features/MainFoot',
  component: DesignStart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>Overview</h2>
          <div>
            <p>
              MainFoot 컴포넌트는 페이지 하단의 주요 정보 및 안내, 저작권, 링크 등을 표시하는 영역입니다.<br />
              레이아웃의 일관성을 위해 사용합니다.
            </p>
          </div>
          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>페이지 하단에 고정적으로 노출되는 정보, 안내, 저작권, 링크 등을 표현할 때 사용합니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import { MainFoot } from '@features/MainFoot';

<DesignStart/>
<DesignGeneration />
<LTPA350Step1 />
<LTPA350Step2 />
\`\`\`
            `}
          </Markdown>
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof DesignStart>;

export const Default: Story = {
  render: () => (
    <Gcol gap="4">
      <DesignStart />
      <DesignGeneration />
      <LTPA350Step1 />
      <LTPA350Step2 />
    </Gcol>
  ),
  args: {},
};
