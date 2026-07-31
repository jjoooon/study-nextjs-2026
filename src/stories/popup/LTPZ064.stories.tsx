/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LTPZ064 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz064';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof LTPZ064> = {
  title: 'app/ispl/isplBsnsSupt/components/popups/LTPZ064',
  component: LTPZ064,
  argTypes: {
    addressType: {
      control: {
        type: 'select',
        labels: {
          road: '도로명 주소',
          general: '일반 번지 주소',
          san: '산 번지 주소',
          block: '블럭 번지 주소',
        },
      },
      options: ['road', 'general', 'san', 'block'],
      description: '직장주소 형태 선택',
    },
  },
  args: {
    addressType: 'road',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 스토리 (--default ID 매칭용) */
export const Default: Story = {
  name: '1. 도로명 주소 (1개만 노출)',
  args: {
    addressType: 'road',
  },
  render: (args) => (
    <LayoutDoc>
      <LTPZ064 {...args} />
    </LayoutDoc>
  ),
};

/** 1개만 표시: 2. 일반 번지 타입 */
export const GeneralBunjiAddress: Story = {
  name: '2. 일반 번지 주소 (1개만 노출)',
  args: {
    addressType: 'general',
  },
  render: (args) => (
    <LayoutDoc>
      <LTPZ064 {...args} />
    </LayoutDoc>
  ),
};

/** 1개만 표시: 3. 산 번지 타입 */
export const SanBunjiAddress: Story = {
  name: '3. 산 번지 타입',
  args: {
    addressType: 'san',
  },
  render: (args) => (
    <LayoutDoc>
      <LTPZ064 {...args} />
    </LayoutDoc>
  ),
};

/** 1개만 표시: 4. 블럭 번지 타입 */
export const BlockBunjiAddress: Story = {
  name: '4. 블럭 번지 타입',
  args: {
    addressType: 'block',
  },
  render: (args) => (
    <LayoutDoc>
      <LTPZ064 {...args} />
    </LayoutDoc>
  ),
};
