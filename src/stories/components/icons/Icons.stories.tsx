/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import type { JSX } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@icons';

type IconStoryArgs = {
  size: number;
  color: string;
};

type IconComponent = (props: { size?: number }) => JSX.Element;

const isIconComponent = (value: unknown): value is IconComponent => typeof value === 'function';

const iconList: Array<[string, IconComponent]> = Object.entries(Icons).filter(
  (entry): entry is [string, IconComponent] => isIconComponent(entry[1]),
);

const meta: Meta<IconStoryArgs> = {
  title: 'Components/Icons/SVGIcons',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<IconStoryArgs>;

export const AllIcons: Story = {
  args: {
    size: 16,
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
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80, color: args.color }}>
          <Icon size={args.size} />
          <span style={{ fontSize: 12, marginTop: 8 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
