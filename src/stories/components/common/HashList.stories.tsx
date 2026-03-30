import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import { HashList } from '@common/HashList';

const LONG_HASH_DATA = ['암', '뇌', '심', '수술', '특정','암', '뇌', '심', '수술', '특정', '암', '뇌', '심', '수술', '특정','암', '뇌', '심', '수술', '특정', '암', '뇌', '심', '수술', '특정','암', '뇌', '심', '수술', '특정'];

const meta: Meta<typeof HashList> = {
  title: 'Components/Common/HashList',
  component: HashList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                HashList 컴포넌트는 해시 형태의 키워드 목록을 가로로 표시하고, 공간이 부족할 때
                <br />
                더보기 드롭다운으로 나머지 항목을 확인할 수 있게 해주는 목록 UI입니다.
              </p>
            </div>

            <Primary />
            {/* <Controls /> */}

            <h2>Usage</h2>
            <p>HashList는 문자열 배열(`data`)을 전달해 사용합니다.</p>
            <ul>
              <li>가로 영역에 맞는 해시 목록 표시</li>
              <li>항목이 넘칠 경우 더보기 버튼 자동 노출</li>
              <li>더보기 드롭다운에서 전체 목록 확인</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { HashList } from '@common/HashList';

const hashList = ['암', '뇌', '심', '수술', '특정', '표적', '치료'];

<HashList data={hashList} />
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>HashList 컴포넌트에서 사용하는 주요 prop은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>data</td><td>string[]</td><td>해시 목록 데이터</td></tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    data: {
      table: { disable: true },
    },
  },
  args: {
    data: LONG_HASH_DATA,
  },
};

export default meta;
type Story = StoryObj<typeof HashList>;

export const Default: Story = {
  render: (args) => (
    <div>
      <HashList {...args} />
    </div>
  ),
};
