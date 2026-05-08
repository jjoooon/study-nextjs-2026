/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { ZoomControl } from '@common/ZoomControl';
import { Gcol } from '@atoms';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof ZoomControl> = {
  title: 'Components/Common/ZoomControl',
  component: ZoomControl,
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
            <h2>Overview</h2>
            <div>
              <p>
                ZoomControl은 화면 확대/축소와 초기화를 제어하는 컴포넌트입니다.
                <br />
                사용자의 가독성을 위해 루트 폰트 크기와 scale 값을 함께 조정합니다.
              </p>
              <ul>
                <li>
                  <b>Zoom Out</b>: 글자 크기/스케일 축소
                </li>
                <li>
                  <b>Zoom In</b>: 글자 크기/스케일 확대
                </li>
                <li>
                  <b>초기화</b>: 기본 배율(100%)로 복원
                </li>
              </ul>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>ZoomControl 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { ZoomControl } from '@common/ZoomControl';

<ZoomControl />
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>ZoomControl 컴포넌트는 별도의 props를 받지 않습니다.</p>
          </>
        );
      },
    },
  },
  argTypes: {
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ZoomControl>;

export const Default: Story = {
  render: () => {
    return (
      <Gcol className="items-center gap-4">
        <ZoomControl />
        <div className="text-sm">확대/축소 버튼으로 비율을 조정해 보세요.</div>
      </Gcol>
    );
  },
};
