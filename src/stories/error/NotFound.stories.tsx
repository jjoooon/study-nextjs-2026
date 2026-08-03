/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NotFound from '@/app/not-found';

const meta: Meta<typeof NotFound> = {
  title: 'app/system/NotFound',
  component: NotFound,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const Default: Story = {};
