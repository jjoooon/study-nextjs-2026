/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { PageID } from '@/shared/components/features/PageID';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';

const MOCK_DATA = { pageName: '장기 신규설계', pageId: 'LniPl020' };

const meta: Meta<typeof PageID> = {
  title: 'Components/Features/header/화면아이디(PageID)',
  component: PageID,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="PageID"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화',
          ]}
          overview={`PageID 컴포넌트는 화면 상단에 페이지의 이름과 ID를 표시하는 헤더 역할을 합니다.
화면 확대/축소 컨트롤(ZoomControl)과 닫기 버튼을 포함하고 있습니다.`}
          usageCode={`import { PageID } from '@/shared/components/features/PageID';

const data = {
  pageName: '장기 신규설계',
  pageId: 'LniPl020',
};

<PageID data={data} />`}
          apiReference={[
            {
              prop: 'data',
              type: 'DefaultPageID',
              description: '페이지 정보 데이터 객체 (pageName, pageId 포함)',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: '페이지 정보 데이터',
      table: { category: 'Data' },
    },
  },
  args: {
    data: MOCK_DATA,
  },
};

export default meta;
type Story = StoryObj<typeof PageID>;

export const Default: Story = {
  render: (args) => (
    <div className="p-8">
      <PageID {...args} />
    </div>
  ),
};
