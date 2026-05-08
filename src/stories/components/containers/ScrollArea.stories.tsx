/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@uiux/ScrollArea';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Containers/ScrollArea',
  component: ScrollArea,
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
                ScrollArea는 고정된 영역 안에서 overflow 콘텐츠를 스크롤할 수 있게 해주는 컴포넌트입니다.
                <br />
                세로/가로 스크롤 모두 지원하며, 커스텀 스크롤바를 통해 일관된 UI를 제공합니다.
              </p>
              <ul>
                <li>
                  <b>className</b>으로 높이/너비를 지정해 스크롤 영역을 정의합니다.
                </li>
                <li>
                  내부 콘텐츠 길이에 따라 스크롤바가 자동으로 표시됩니다.
                </li>
              </ul>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>ScrollArea 컴포넌트는 다음과 같은 구조로 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { ScrollArea } from '@uiux/ScrollArea';

<ScrollArea className="h-72 w-lg rounded-md border p-4">
  <div className="space-y-2">
    {Array.from({ length: 30 }).map((_, i) => (
      <div key={i} className="text-sm">항목 {i + 1}</div>
    ))}
  </div>
</ScrollArea>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>ScrollArea 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>className</td>
                  <td>string</td>
                  <td>루트 컨테이너 클래스 (높이/너비 지정 필수)</td>
                </tr>
                <tr>
                  <td>children</td>
                  <td>ReactNode</td>
                  <td>스크롤 영역 내부 콘텐츠</td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: '스크롤 영역의 크기와 스타일을 지정하는 클래스',
      table: { category: 'Appearance' },
    },
    children: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-lg rounded-md border p-4">
      <div className="space-y-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="text-sm">항목 {i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  ),
};
