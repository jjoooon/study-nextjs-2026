import type { Meta, StoryObj } from '@storybook/react';
import Ltpz092 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz092';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz092> = {
  title: 'app/popup/LTPZ092',
  component: Ltpz092,
  argTypes: {
    showDownloadButton: {
      control: 'boolean',
      description: '다운로드 버튼 노출 여부',
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Ltpz092>;

export const Default: Story = {
  args: {
    showDownloadButton: true,
  },
  render: (args) => {
    return (
      <LayoutDoc>
        <Ltpz092 {...args} />
      </LayoutDoc>
    );
  },
};
