import { Controls, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { LTPZ010P } from '@/features/pub/proto/popup/LTPZ010';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof LTPZ010P> = {
  title: 'popup/LTPZ010',
  component: LTPZ010P,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <Primary />
            <Controls />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <LayoutDoc>
      <LTPZ010P />
    </LayoutDoc>
  ),
};
