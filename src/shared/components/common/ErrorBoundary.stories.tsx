import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ErrorBoundary } from './ErrorBoundary';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

const meta = {
  title: 'Shared/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Normal content without errors</div>,
  },
};

export const WithError: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
  },
};

export const WithCustomFallback: Story = {
  args: {
    children: <ThrowError shouldThrow={true} />,
    fallback: (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="text-lg font-semibold text-red-800">Custom Error UI</h3>
        <p className="text-red-600">Something went wrong!</p>
      </div>
    ),
  },
};
