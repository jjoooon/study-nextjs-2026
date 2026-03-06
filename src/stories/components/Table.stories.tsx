import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

const meta: Meta<typeof Table> = {
  title: 'Components/UIUX/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <div className="w-[56rem]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>홍길동</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>활성</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>김영희</TableCell>
            <TableCell>User</TableCell>
            <TableCell>대기</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
