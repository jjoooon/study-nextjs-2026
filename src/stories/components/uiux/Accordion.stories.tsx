import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@/shared/components/uiux/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/UIUX/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '커스텀 Accordion 컴포넌트입니다.',
          'shadcn/ui 기반, variant별 스타일 지원 (default, box, line, minimal, tableHead)',
          'Root/Item/Trigger/Content 구조, props는 Radix Accordion과 유사하게 동작',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Section 1</Accordion.Trigger>
        <Accordion.Content>Section 1 Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Section 2</Accordion.Trigger>
        <Accordion.Content>Section 2 Content</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  args: {
    variant: 'default',
  },
};

export const Box: Story = {
  render: (args) => (
    <Accordion {...args} variant="box">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Box 1</Accordion.Trigger>
        <Accordion.Content>Box 1 Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Box 2</Accordion.Trigger>
        <Accordion.Content>Box 2 Content</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Line: Story = {
  render: (args) => (
    <Accordion {...args} variant="line">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Line 1</Accordion.Trigger>
        <Accordion.Content>Line 1 Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Line 2</Accordion.Trigger>
        <Accordion.Content>Line 2 Content</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Minimal: Story = {
  render: (args) => (
    <Accordion {...args} variant="minimal">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Minimal 1</Accordion.Trigger>
        <Accordion.Content>Minimal 1 Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Minimal 2</Accordion.Trigger>
        <Accordion.Content>Minimal 2 Content</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const TableHead: Story = {
  render: (args) => (
    <Accordion {...args} variant="tableHead">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>TableHead 1</Accordion.Trigger>
        <Accordion.Content>TableHead 1 Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>TableHead 2</Accordion.Trigger>
        <Accordion.Content>TableHead 2 Content</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
