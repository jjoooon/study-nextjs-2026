import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@icons';

const iconList = Object.entries(Icons).filter(([name, Comp]) => typeof Comp === 'function');

const meta: Meta = {
  title: 'Components/Common/Icons',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllIcons: Story = {
  args: {
    size: 32,
    color: '#333',
  },
  argTypes: {
    size: {
      control: { type: 'number' },
      description: '아이콘 크기(px)',
    },
    color: {
      control: { type: 'color' },
      description: '아이콘 색상',
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, background: '#f5f5f5', padding: 32, borderRadius: 12 }}>
      {iconList.map(([name, Icon]) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80, color: (args as any).color || '#333' }}>
          {/* @ts-ignore */}
          <Icon size={args.size} />
          <span style={{ fontSize: 12, marginTop: 8 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
