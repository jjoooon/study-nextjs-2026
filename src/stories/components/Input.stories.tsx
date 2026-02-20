import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, FormTable, FormCell, FormItem, Separator, FormRow } from '@/shared/components/common';
import { SearchIcon } from '@/shared/components/icons';
import { Button, TableRow } from '@/shared/components/uiux';
import { Input } from '@/shared/components/uiux/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/UIUX/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {    
    docs: {
      description: {
        component: ``,
      },
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
      table: { 
        category: 'Appearance',
        type: { summary: 'lg | sm' }
      },
    },
    width: {
      control: 'select',
      options: ['full', 'max', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Input 너비',
      table: { 
        category: 'Appearance',
        type: { summary: 'full | max | 2xs | xs | sm | md | lg | xl | 2xl' }
      },
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
      table: { 
        category: 'Behavior',
        type: { summary: 'amount | number' }
      },
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
      description: "에러 메시지 위치",
      table: { 
        category: 'Error Handling', 
        type: { summary: 'tl | tr | bl | br' }
      },
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
    const { outline, ...restArgs } = args as any;

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
        <Input
          {...restArgs}
          style={outline ? { outline: '1px solid red' } : undefined}
          before={mapNode(args.before)}
          after={mapNode(args.after)}
          value={value}
          onChange={handleChange}
        />
        
      </Grow>
    );
  },
};

export const All: Story = {
  render: () => (
    <Grow placement="sc" className="gap-6 flex-wrap bg-[var(--color-gray-5)] p-6 flex-col items-start w-full">
      <section className="w-full space-y-3">
        <h3 className="text-lg font-bold">Sizes</h3>
        <div className="flex gap-4">
          <Input size="lg" placeholder="Size lg (Default)" />
          <Input size="sm" placeholder="Size sm" />
        </div>
      </section>

      <section className="w-full space-y-3">
        <h3 className="text-lg font-bold">States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Default" />
          <Input placeholder="Required" required />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Read Only" readOnly value="Read Only Value" />
          <Input placeholder="Error State" error errorMsg="에러 메시지입니다." />
          <Input placeholder="Clearable Input" clear />
        </div>
      </section>

      <section className="w-full space-y-3">
        <h3 className="text-lg font-bold">Widths</h3>
        <div className="space-y-2">
          <Input width="full" placeholder="Width Full" />
          <div className="flex flex-wrap gap-2">
            <Input width="2xl" placeholder="Width 2xl" />
            <Input width="xl" placeholder="Width xl" />
            <Input width="lg" placeholder="Width lg" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Input width="md" placeholder="Width md" />
            <Input width="sm" placeholder="Width sm" />
            <Input width="xs" placeholder="Width xs" />
            <Input width="2xs" placeholder="Width 2xs" />
          </div>
        </div>
      </section>

      <section className="w-full space-y-3">
        <h3 className="text-lg font-bold">Adornments & Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input before={<SearchIcon />} placeholder="With Icon (Before)" />
          <Input after="원" placeholder="With Unit (After)" className="text-right" />
          <Input formatType="amount" placeholder="Amount Format (콤마 자동)" />
          <Input formatType="number" placeholder="Number Format (숫자만)" />
        </div>
      </section>
    </Grow>
  ),
};

export const Error: Story = {
  ...Default,
  args: {
    error: true,
    errorMsg: '에러 메시지를 입력하세요.',
    errorPs: 'tl',//'tl' | 'tr' | 'bl' | 'br';
  },
};

export const Before: Story = {
  ...Default,
  args: {
    placeholder: '내용을 입력하세요',
    before: 'text',
  },
};

export const After: Story = {
  ...Default,
  args: {
    placeholder: '내용을 입력하세요',
    after: 'text',
  },
};

export const Number: Story = {
  ...Default,
  args: {
    placeholder: '내용을 입력하세요',
    formatType: 'number',
  },
};

export const Amount: Story = {
  ...Default,
  args: {
    placeholder: '내용을 입력하세요',
    formatType: 'amount',
  },
};


export const Form: Story = {
  render: () => (
    <Grow placement="sc" className="w-full bg-[var(--color-gray-5)] p-6">
      <FormTable variant="boxIn" caption="고객명" cols={['w-[10rem] min-w-[10rem]', '']}>
        <TableRow>
          <FormCell title="고객명">
            <FormItem className="w-max ml-2">
              <Input type="text" aria-label="고객명" defaultValue="김한화" />
              <Button aria-label="고객명 검색" variant="none" size="icon-md">
                <SearchIcon />
              </Button>
            </FormItem>
          </FormCell>
        </TableRow>
      </FormTable>
    </Grow>
  ),
};

export const Form2: Story = {
  render: () => (
    <Grow placement="sc" className="w-full bg-[var(--color-gray-5)] p-6">
      <FormTable variant="boxIn" caption="설계번호 입력 예시" cols={['w-[10rem] min-w-[10rem]', '']}>
        <TableRow>
          <FormCell title="설계번호">
            <Input type="text" aria-label="설계번호 앞자리" width="lg" />
            <Separator>-</Separator>
            <Input type="text" aria-label="설계번호 뒷자리" width="lg" />
            <FormItem className="w-max ml-2">
              <Input type="text" aria-label="라벨명모름" defaultValue="880101-1 김한화" />
              <Button aria-label="계약자 추가" variant="none" size="icon-md">
                <SearchIcon />
              </Button>
            </FormItem>
          </FormCell>
        </TableRow>
      </FormTable>
    </Grow>
  ),
};



export const Form3: Story = {
  render: () => {
    const [planNumber, setPlanNumber] = React.useState(['', '']);
    const [contractHolder, setContractHolder] = React.useState('');

    return (
      <Grow placement="sc" className="w-full bg-[var(--color-gray-5)] p-6">
        <FormTable caption="계약자 관련 정보 입력하세요." cols={['w-[6rem]', '']} variant="none">
          <FormRow>
            <FormCell title="설계번호">
              <Input
                aria-label="설계번호 입력"
                type="text"
                value={planNumber[0]}
                width="lg"
                onChange={(e) => setPlanNumber([e.target.value, planNumber[1]])}
              />
              <Separator>-</Separator>
              <Input
                aria-label="설계번호 입력"
                type="text"
                value={planNumber[1]}
                width="2xs"
                onChange={(e) => setPlanNumber([planNumber[0], e.target.value])}
              />

              <FormItem className="w-auto ml-3">
                <Input
                  aria-label="계약자명 입력"
                  type="text"
                  value={contractHolder}
                  width="lg"
                  onChange={(e) => setContractHolder(e.target.value)}
                />
                <Button variant="outlined" color="gray-light" aria-label="계약자 추가" size="icon-lg">
                  <SearchIcon color="var(--color-primary-50)" />
                </Button>
              </FormItem>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
    );
  },
};