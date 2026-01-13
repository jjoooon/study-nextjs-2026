import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useEffect } from 'react';

import { SuspenseBoundary } from './SuspenseBoundary';

const SlowComponent = ({ delay = 2000 }: { delay?: number }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!ready) {
    throw new Promise((resolve) => setTimeout(resolve, delay));
  }

  return <div className="p-4 bg-green-50 border border-green-200 rounded">Content loaded!</div>;
};

const meta = {
  title: 'Shared/SuspenseBoundary',
  component: SuspenseBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SuspenseBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <SlowComponent delay={1000} />,
  },
};

export const WithCustomFallback: Story = {
  args: {
    children: <SlowComponent delay={1000} />,
    fallback: (
      <div className="p-8 bg-blue-50 border border-blue-200 rounded">
        <p className="text-blue-600">Custom loading message...</p>
      </div>
    ),
  },
};
