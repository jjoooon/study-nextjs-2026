import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PageID from '@/shared/components/features/PageID';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const MOCK_DATA = {
  pageName: '장기 신규설계',
  pageId: 'LTRA350',
};

const meta: Meta<typeof PageID> = {
  title: 'Components/Features/PageID',
  component: PageID,
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
              PageID 컴포넌트는 화면 상단에 페이지의 이름과 ID를 표시하는 헤더 역할을 합니다.
              <br />
              화면 확대/축소 컨트롤(ZoomControl)과 닫기 버튼을 포함하고 있습니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>PageID 컴포넌트는 데이터 객체를 props로 받아 렌더링합니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import PageID from '@/shared/components/features/PageID';

const data = {
  pageName: '장기 신규설계',
  pageId: 'LTRA350',
};

<PageID data={data} />
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <p>주요 prop 옵션은 다음과 같습니다.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>data</td>
                <td>DefaultPageID</td>
                <td>페이지 정보 데이터 객체 (pageName, pageId 포함)</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: '페이지 정보 데이터',
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
    <div className="w-[80rem] border border-gray-200 bg-white p-4">
      <PageID {...args} />
    </div>
  ),
};