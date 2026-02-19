import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow,FormTable,FormRow,FormCell  } from '@/shared/components/common';
import { Input } from '@/shared/components/uiux/Input';
import Link from "next/link"

const meta: Meta<typeof Input> = {
  title: 'Components/UIUX/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Input 스타일 유형',
    },
    size: {
      control: 'select',
      options: ['lg', 'sm'],
      description: 'Input 크기',
    },
    width: {
      control: 'select',
      options: ['full', 'max', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Input 너비',
    },
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 여부',
    },
    formatType: {
      control: 'select',
      options: ['amount', 'number'],
      description: '입력 포맷 유형 (금액, 숫자)',
    },
    clear: {
      control: 'boolean',
      description: '입력 초기화 버튼 표시 여부',
    },
    errorMsg: {
      control: 'text',
      description: '에러 메시지 내용',
    },
    errorPs: {
      control: 'select',
      options: ['tl', 'tr', 'bl', 'br'],
      description: '에러 메시지 위치',
    },
  },
  args: {
    variant: 'default',
    size: 'lg',
    width: 'full',
    placeholder: '내용을 입력하세요',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    // `useArgs`를 사용하지 않고 React의 `useState`와 `useEffect`를 사용하는 방법입니다.
    // Storybook의 Controls와 컴포넌트의 상태를 동기화하기 위해 `useState`와 `useEffect`를 함께 사용합니다.
    const [value, setValue] = React.useState(args.value ?? '');

    // Storybook Controls에서 args.value가 변경될 때 컴포넌트의 상태를 업데이트합니다.
    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value); // 내부 상태를 업데이트합니다.
      args.onChange?.(e);
    };
    return (
      <Grow placement="sc" className="gap-3 flex-wrap bg-[var(--color-gray-5)] p-6">
        <Input {...args} value={value} onChange={handleChange} />
      </Grow>
    );
  },
};

export const Amount: Story = {
  args: {
    formatType: 'amount',
    value: '1000000',
    placeholder: '금액을 입력하세요',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };
    return (
      <Grow placement="sc" className="gap-3 flex-wrap bg-[var(--color-gray-5)] p-6">
        <Input {...args} value={value} onChange={handleChange} />
      </Grow>
    );
  },
};
