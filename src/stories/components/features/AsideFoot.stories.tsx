/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { AsideFoot } from '@features/AsideFoot';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof AsideFoot> = {
  title: 'Components/Features/Aside/납입보험료(AsideFoot)',
  component: AsideFoot,
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
              AsideFoot 컴포넌트는 화면 우측 사이드바의 푸터 영역을 담당합니다.
              <br />
              요약 정보(납입보험료, 청약포인트 등)와 제안서/출력 관련 액션 버튼을 포함합니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>AsideFoot 컴포넌트는 현재 props를 받지 않으며, 다음과 같이 간단하게 사용할 수 있습니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import AsideFoot from '@/shared/components/features/AsideFoot';

<AsideFoot />
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <p>이 컴포넌트는 현재 외부로부터 props를 받지 않습니다.</p>
        </>
      ),
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof AsideFoot>;

export const Default: Story = {
  render: () => (
    <div className="relative flex items-center justify-center" style={{ width: '20rem', height: '20rem' }}>
      <AsideFoot />
    </div>
  ),
};
