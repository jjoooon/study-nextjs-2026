import { Controls, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { LTPZ021P } from '@/features/pub/proto/popup/LTPZ021';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof LTPZ021P> = {
  title: 'popup/LTPZ021',
  component: LTPZ021P,
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
      <LTPZ021P />
    </LayoutDoc>
  ),
};
