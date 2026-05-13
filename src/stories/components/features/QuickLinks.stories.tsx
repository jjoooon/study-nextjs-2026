/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { QuickLinks } from '@/shared/components/features/QuickLinks';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof QuickLinks> = {
  title: 'Components/Features/Aside/바로가기(QuickLinks)',
  component: QuickLinks,
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
              QuickLinks 컴포넌트는 우측 사이드바(Aside) 영역에서 자주 사용하는 기능으로 빠르게 이동할 수 있는 바로가기 버튼 그룹을 제공합니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>QuickLinks 컴포넌트는 현재 props를 받지 않으며, 다음과 같이 간단하게 사용할 수 있습니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import { QuickLinks } from '@/shared/components/features/QuickLinks';

<QuickLinks />
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <p>이 컴포넌트는 현재 외부로부터 props를 받지 않습니다. 내부적으로 정의된 링크 목록을 렌더링합니다.</p>
        </>
      ),
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof QuickLinks>;

export const Default: Story = {
  render: () => (
    <QuickLinks />
  ),
};