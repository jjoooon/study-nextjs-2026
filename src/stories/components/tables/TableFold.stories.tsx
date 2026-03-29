import type { Meta, StoryObj } from '@storybook/react';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { Grow } from '@atoms';
import { Button } from '@uiux/Button';
import { FileExportIcon, FileImportIcon } from '@icons';

const meta: Meta<typeof TableFold> = {
  title: 'Components/Tables/TableFold',
  component: TableFold,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TableFold 컴포넌트는 아코디언 형태의 테이블 헤더 UI를 제공합니다.'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof TableFold>;

export const Default: Story = {
  render: () => {
    return (
      <div style={{ width: '80rem' }}>
        <TableFold>
          <TableFoldHead title={'모바일 판매 불가 상품'}>
            <Grow >
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
      </div>
    );
  },
};