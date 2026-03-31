import { Controls, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { LTPZ011P } from '@/features/pub/proto/popup/LTPZ011';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof LTPZ011P> = {
  title: 'popup/LTPZ011',
  component: LTPZ011P,
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
      <LTPZ011P />
    </LayoutDoc>
  ),
};
