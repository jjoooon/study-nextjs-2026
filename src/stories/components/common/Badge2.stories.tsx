/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Title, Primary, Controls, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Gcol, Grow } from '@atoms';
import { Badge2 } from '@uiux/Badge2';

const meta: Meta<typeof Badge2> = {
  title: 'Components/Common/Badge2',
  component: Badge2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <br />
          <h2>History</h2>
          <ul>
            <li>2026.09.15 - UW 심사 결과 10종 Badge2 아이콘 및 색상 스펙 업데이트</li>
          </ul>

          <h2>Overview</h2>
          <div>
            <p>
              Badge2 컴포넌트는 UW(언더라이팅) 심사 결과 및 가입 가능 여부 상태를 알약형(19px height)으로 일관되게 표현하는 UI 요소입니다.
              <br />
              텍스트 내용(&apos;예상 : 인수&apos;, &apos;예상 : 거절&apos;, &apos;예상 : 연기&apos;, &apos;예상 : 심사&apos;, &apos;예상 : 조건부인수&apos; 등)에 따라 적절한 아이콘과 전용 컬러 스타일이 자동으로 매핑됩니다.
            </p>
          </div>

          <Primary />
          <Controls />

          <h2>UW Status List (10종)</h2>
          <p>이미지와 동일한 10가지 UW 예상결과 뱃지 샘플입니다.</p>
          <Unstyled>
            <Gcol gap={3} variant="box-line" className="p-16 w-[30rem]">
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 인수 (인수)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 거절 (거절)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 연기 (연기)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 심사 (인심사)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 심사 (서류보완)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 심사 (진단)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 심사 (적부)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 조건부인수 (할증)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 조건부인수 (부담보)</Badge2>
              </Grow>
              <Grow gap={2} placement="ec">
                <Badge2>예상 : 조건부인수 (감액)</Badge2>
              </Grow>
            </Gcol>
          </Unstyled>
        </>
      ),
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['green', 'red', 'gray', 'yellow', 'blue', 'dark', 'orange'],
      table: { category: '스타일 props' },
    },
    showIcon: {
      control: { type: 'boolean' },
      table: { category: '옵션 props' },
    },
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    children: '예상 : 인수 (인수)',
    showIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof Badge2>;

export const Default: Story = {
  render: (args) => <Badge2 {...args}>{args.children}</Badge2>,
};

export const UWStatusAll: Story = {
  render: () => (
    <Gcol gap={3} className="p-4">
      <Badge2>예상 : 인수 (인수)</Badge2>
      <Badge2>예상 : 거절 (거절)</Badge2>
      <Badge2>예상 : 연기 (연기)</Badge2>
      <Badge2>예상 : 심사 (인심사)</Badge2>
      <Badge2>예상 : 심사 (서류보완)</Badge2>
      <Badge2>예상 : 심사 (진단)</Badge2>
      <Badge2>예상 : 심사 (적부)</Badge2>
      <Badge2>예상 : 조건부인수 (할증)</Badge2>
      <Badge2>예상 : 조건부인수 (부담보)</Badge2>
      <Badge2>예상 : 조건부인수 (감액)</Badge2>
    </Gcol>
  ),
};
