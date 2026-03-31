import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { Gcol, Grow } from '@atoms';
import { Button } from '@uiux/Button';
import { FileExportIcon, FileImportIcon } from '@icons';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

type TableFoldProps = React.ComponentProps<typeof TableFold>;

const meta: Meta<TableFoldProps> = {
  title: 'Components/Tables/TableFold',
  component: TableFold,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <h2>History</h2>
          <ul>
            <li>2026.03.31</li>
          </ul>
          <h2>Overview</h2>
          <div>
            <p>
              TableFold 컴포넌트는 아코디언 형태의 테이블 헤더 UI를 제공합니다.<br />
              TableWrap은 일반 테이블 헤더 UI를 제공합니다.
            </p>
            <ul>
              <li>title prop으로 헤더 제목을 지정합니다.</li>
              <li>헤더 우측에 버튼 등 커스텀 액션을 배치할 수 있습니다.</li>
            </ul>
          </div>
          <Primary />
          <Controls />
          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { Button } from '@uiux/Button';

<TableFold>
  <TableFoldHead title="헤더명">
    <Button>엑셀내보내기</Button>
  </TableFoldHead>
  <TableFoldBody>
    <div>table 영역</div>
  </TableFoldBody>
</TableFold>
\`\`\`
            `}
          </Markdown>
          <h2>API Reference</h2>
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
                <td>children</td>
                <td>ReactNode</td>
                <td>TableFold 내부 컨텐츠</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'accordion'],
      description: '테이블 폴드 변형',
    },
    children: { table: { disable: true } },
  },
  args: {
    variant: 'accordion',
  },
};

export default meta;
type Story = StoryObj<TableFoldProps>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Gcol gap={2} className="w-[60rem]">
      <TableFold variant={args.variant} {...args}>
        <TableFoldHead title={'모바일 판매 불가 상품'}>
          <Grow>
            <Button variant={'outlined'} color={'success'}>
              엑셀내보내기
              <FileExportIcon />
            </Button>
            <Button variant={'outlined'} color={'success'}>
              엑셀가져오기
              <FileImportIcon />
            </Button>
          </Grow>
        </TableFoldHead>
        <TableFoldBody>
          <div className="w-full p-10 border border-dashed flex items-center justify-center">
            table 영역
          </div>
        </TableFoldBody>
      </TableFold>
    </Gcol>
  ),
};