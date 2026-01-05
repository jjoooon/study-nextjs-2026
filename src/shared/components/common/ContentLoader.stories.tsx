import type { Meta, StoryObj } from '@storybook/react';
import { ContentLoader, PageLoader, CardLoader, AsyncContent } from './ContentLoader';

const meta = {
  title: 'Shared/ContentLoader',
  component: ContentLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'skeleton', 'dots'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof ContentLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: {
    type: 'spinner',
    size: 'md',
  },
};

export const Skeleton: Story = {
  args: {
    type: 'skeleton',
  },
};

export const Dots: Story = {
  args: {
    type: 'dots',
  },
};

export const Small: Story = {
  args: {
    type: 'spinner',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    type: 'spinner',
    size: 'lg',
  },
};
