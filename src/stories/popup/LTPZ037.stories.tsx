/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Ltpz037 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz037';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz037> = {
  title: 'app/ispl/ncMtt/components/popups/Ltpz037',
  component: Ltpz037,
  argTypes: {
    type: {
      name: '동의 구분',
      options: ['customer', 'parent'],
      control: {
        type: 'inline-radio',
        labels: {
          customer: '고객 본인 동의',
          parent: '친권자 동의',
        },
      },
      description: '동의를 진행할 대상자를 선택합니다.',
    },
    diseaseAgree: {
      name: '질병제공동의 여부',
      options: ['Y', 'N'],
      control: {
        type: 'inline-radio',
        labels: {
          Y: 'FP질병제공동의 Y',
          N: 'FP질병제공동의 N',
        },
      },
      description: 'FP질병제공동의 여부를 선택합니다.',
    },
  },
  args: {
    type: 'customer',
    diseaseAgree: 'Y',
  },
};

export default meta;
type Story = StoryObj<typeof Ltpz037>;

export const Default: Story = {
  render: (args) => {
    return (
      <LayoutDoc>
        <Ltpz037 {...args} />
      </LayoutDoc>
    );
  },
};

export const CustomerCase: Story = {
  render: (args) => {
    return (
      <LayoutDoc>
        <Ltpz037 {...args} type="customer" />
      </LayoutDoc>
    );
  },
  name: '고객명, 휴대폰번호, 인증번호 케이스',
};

export const ParentCase: Story = {
  render: (args) => {
    return (
      <LayoutDoc>
        <Ltpz037 {...args} type="parent" />
      </LayoutDoc>
    );
  },
  name: '고객명, 친권자명, 친권자 휴대폰번호, 인증번호 케이스',
};
