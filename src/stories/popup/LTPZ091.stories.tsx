/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import Ltpz091 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz091';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz091> = {
  title: 'app/ispl/isplBsnsSupt/components/popups/Ltpz091',
  component: Ltpz091,
  args: {
    isAdmin: true,
  },
  argTypes: {
    isAdmin: {
      control: 'boolean',
      description: '어드민 사용자 여부 (true: 어드민, false: 일반 사용자)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Ltpz091>;

export const Default: Story = {
  render: (args) => (
    <LayoutDoc>
      <Ltpz091 {...args} />
    </LayoutDoc>
  ),
  args: {
    isAdmin: true,
  },
};

export const AdminUser: Story = {
  name: '어드민 사용자 (기본)',
  render: (args) => (
    <LayoutDoc>
      <Ltpz091 {...args} />
    </LayoutDoc>
  ),
  args: {
    isAdmin: true,
  },
};

export const GeneralUser: Story = {
  name: '일반 사용자',
  render: (args) => (
    <LayoutDoc>
      <Ltpz091 {...args} />
    </LayoutDoc>
  ),
  args: {
    isAdmin: false,
  },
};
