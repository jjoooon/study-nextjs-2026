import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow } from '@/shared/components/common';
import { SearchIcon } from '@/shared/components/icons';
import { Input } from '@/shared/components/uiux/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/UIUX/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {    
    docs: {
      argTypes: { expanded: false },
    },
    controls: { expanded: false },  
  },
  argTypes: {
    // 1. Appearance (외형 관련)
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Input 스타일 유형',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['lg', 'sm'],
      description: 'Input 크기',
      table: { category: 'Appearance' },
    },
    width: {
      control: 'select',
      options: ['full', 'max', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Input 너비',
      table: { category: 'Appearance' },
    },
    before: {
      control: { type: 'text' },
      description: 'Input 앞에 표시할 요소 (예: SearchIcon 입력)',
      table: { category: 'Appearance' },
    },
    after: {
      control: { type: 'text' },
      description: 'Input 뒤에 표시할 요소 (예: 단위 텍스트)',
      table: { category: 'Appearance' },
    },

    // 2. State (상태 관련)
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: { category: 'State' },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: { category: 'State' },
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 여부',
      table: { category: 'State' },
    },

    // 3. Behavior (동작 및 포맷)
    formatType: {
      control: 'select',
      options: ['amount', 'number'],
      description: '입력 포맷 유형 (금액, 숫자)',
      table: { category: 'Behavior' },
    },
    clear: {
      control: 'boolean',
      description: '입력 초기화 버튼 표시 여부',
      table: { category: 'Behavior' },
    },
    type: {
      control: 'text',
      description: 'HTML input type 속성',
      table: { category: 'Behavior' },
    },

    // 4. Error Handling (에러 메시지 설정)
    errorMsg: {
      control: 'text',
      description: '에러 메시지 내용',
      table: { category: 'Error Handling' },
    },
    errorPs: {
      control: 'select',
      options: ['tl', 'tr', 'bl', 'br'],
      description: '에러 메시지 위치 (Top-Left, Bottom-Right 등)',
      table: { category: 'Error Handling' },
    },

    // 5. Events & Others
    onChange: { 
      action: 'changed', 
      description: '값 변경 시 발생하는 이벤트',
      table: { category: 'Events' } 
    },
    
    // 테이블에서 숨길 항목들 (직접 컨트롤할 필요가 없는 props)
    value: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    variant: 'default',
    size: 'lg',
    width: 'full',
    placeholder: '내용을 입력하세요',
    required: false,
    readOnly: false,
    error: false,
    disabled: false,
    clear: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
    before: '',
    after: '',
    type: 'text',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    const mapNode = (val: any) => {
      if (val === 'SearchIcon') return <SearchIcon />;
      return val;
    };

    return (
      <Grow placement="sc" className="gap-3 flex-wrap bg-[var(--color-gray-5)] p-6">
        <div className="w-full">
          <dl className="flex flex-wrap text-xs font-sans bg-white border border-[var(--color-gray-4)] p-3 rounded gap-2">
            {Object.entries(args).map(([k, v], idx, arr) => (
              <div key={k} className="flex items-center space-x-1">
                <span className="font-semibold text-[var(--color-primary)]">{k}</span>
                <span className="text-[var(--color-gray-700)]">=</span>
                <span className="text-[var(--color-secondary)] whitespace-nowrap">
                  {typeof v === 'function' ? v.name || '<fn>' : String(v)}
                </span>
                {idx < arr.length - 1 && <span className="text-[var(--color-gray-400)]">,</span>}
              </div>
            ))}
          </dl>
        </div>
        <Input
          {...args}
          before={mapNode(args.before)}
          after={mapNode(args.after)}
          value={value}
          onChange={handleChange}
        />
      </Grow>
    );
  },
};

export const WithIcon: Story = {
  ...Default,
  args: {
    before: 'SearchIcon',
    placeholder: '검색어를 입력하세요',
  },
};

export const WithUnit: Story = {
  ...Default,
  args: {
    after: '원',
    formatType: 'amount',
    className: 'text-right',
    placeholder: '금액 입력',
    value: '1000000',
  },
};

export const AmountFormat: Story = {
  ...Default,
  args: {
    formatType: 'amount',
    className: 'text-right',
    placeholder: '금액만 입력',
    value: '1234567',
  },
};

export const NumberFormat: Story = {
  ...Default,
  args: {
    formatType: 'number',
    placeholder: '숫자만 입력',
    value: '12345',
  },
};