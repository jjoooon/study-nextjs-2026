import { Controls, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { LTPZ020P } from '@/features/pub/proto/popup/LTPZ020';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof LTPZ020P> = {
  title: 'popup/LTPZ020',
  component: LTPZ020P,
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
      <LTPZ020P />
    </LayoutDoc>
  ),
};
