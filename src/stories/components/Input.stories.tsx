import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo, FormTable, FormCell, FormItem, Separator, FormRow } from '@/shared/components/common';
import { SearchIcon } from '@/shared/components/icons';
import { Button, TableRow } from '@/shared/components/uiux';
import { Input } from '@/shared/components/uiux/Input';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

const meta: Meta<typeof Input> = {
  title: 'Components/UIUX/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Input은 사용자로부터 텍스트 기반의 데이터를 입력받기 위한 컴포넌트이다.
일관된 디자인 시스템을 유지하면서 다양한 입력 시나리오에 대응할 수 있도록 설계되었다.

- **기본 입력** 방식과 **포맷 입력** 두가지로 크게 나누어진다.
- 스타일로는 **default**가 있다.


<br>
#### **기본 입력: Usage**
\`\`\`tsx
import { Input } from '@/shared/components/uiux/Input';
import { useState } from 'react';

const [value, setValue] = useState('');

<Input
  variant="default"
  size={"lg | sm"}
  width={"full | max | 2xs | xs | sm | md | lg | xl | 2xl"}
  placeholder="텍스트를 입력하세요"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  disabled={true | false}
  readOnly={true | false}
  error={true | false}
  errorMsg="에러 메시지"
  clear={true | false}
  before="앞에 붙는 요소"
  after="뒤에 붙는 요소"
/>
\`\`\`

<br>
#### **포맷 입력: Usage**
\`\`\`tsx
import { Input } from '@/shared/components/uiux/Input';
import { useState } from 'react';

const [amount, setAmount] = useState('10000');

<Input
  formatType={"amount | number"}
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  after="원"
  className="text-right"
/>
\`\`\`

        `,
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
        type: { summary: 'lg | sm' },
      },
    },
    width: {
      control: 'select',
      options: ['full', 'max', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Input 너비',
      table: {
        category: 'Appearance',
        type: { summary: 'full | max | 2xs | xs | sm | md | lg | xl | 2xl' },
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
        type: { summary: 'amount | number' },
      },
    },
    clear: {
      control: 'boolean',
      description: '입력 초기화 버튼 표시 여부',
      table: { category: 'Behavior' },
    },

    // 4. Error Handling (에러 메시지 설정)
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
      table: { category: 'Error' },
    },
    errorMsg: {
      control: 'text',
      description: '에러 메시지 내용',
      table: { category: 'Error' },
    },
    errorPs: {
      control: 'select',
      options: ['tl', 'tr', 'bl', 'br'],
      description: '에러 메시지 위치',
      table: {
        category: 'Error',
        type: { summary: 'tl | tr | bl | br' },
      },
    },

    // 5. Events & Others
    onChange: {
      action: 'changed',
      description: '값 변경 시 발생하는 이벤트',
      table: { category: 'Events' },
    },

    // 테이블에서 숨길 항목들 (직접 컨트롤할 필요가 없는 props)
    // value: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    variant: 'default',
    size: 'lg',
    width: 'md',
    placeholder: 'placeholder',
    required: false,
    readOnly: false,
    error: false,
    disabled: false,
    clear: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
    before: '',
    after: '',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const { value: _, onChange, ...restArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <StoryWrap className='flex-row'>
        <StoryBox>
          <Input {...restArgs} value={value} onChange={handleChange} />
        </StoryBox>
        <StoryBox>
          <Grow placement="cc" className="gap-2">
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input width="sm" value="읽기전용" readOnly />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input width="sm" value="필수입력" required />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input width="sm" value="에러" error errorPs="bl" errorMsg="에러 메시지입니다." />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input width="sm" before="시간:" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input className="text-right" value="10000" width="sm" after="원" formatType="amount" />
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorMsg: '에러 메시지를 입력하세요.',
    errorPs: 'tl',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const { value: _, onChange, ...restArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <StoryWrap className='flex-row'>
        {/* center the input horizontally (and vertically if needed) */}
        <StoryBox>
          <Input {...restArgs} value={value} onChange={handleChange} />
        </StoryBox>
        <StoryBox>
          <Grow placement="cc" className="gap-2">
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input width="lg" value="에러" error errorPs="tl" errorMsg="top left" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input width="lg" value="에러" error errorPs="tr" errorMsg="top right" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input width="lg" value="에러" error errorPs="bl" errorMsg="bottom left" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Input width="lg" value="에러" error errorPs="br" errorMsg="bottom right" />
            </Gcol>
          </Grow>  
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Before: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    before: '시간',
    width: 'full',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const { value: _, onChange, ...restArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <Input {...restArgs} value={value} onChange={handleChange} />
    );
  }
            
};

export const After: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    after: '원',
    width: 'full',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const { value: _, onChange, ...restArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <Input {...restArgs} value={value} onChange={handleChange} />
    );
  }
};

export const Number: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    formatType: 'number',
    value: '10000',
    width: 'full',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const { value: _, onChange, ...restArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };
    
    return (
      <Input {...restArgs} value={value} onChange={handleChange} />
    );
  }
};

export const Amount: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    formatType: 'amount',
    value: '10000',
    after: '원',
    width: 'full',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const { value: _, onChange, ...restArgs } = args;
    
    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]); 
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <Input {...restArgs} value={value} onChange={handleChange} />
    );
  }  
};

export const Form: Story = {
  args: {
    required: true,
  },

  render: () => {
    // controlled example to avoid mixing value/defaultValue
    const [customerName, setCustomerName] = React.useState('');

    return (
      <StoryWrap>
        <FormTable variant="boxIn" caption="고객명" cols={['w-[10rem] min-w-[10rem]', '']}>
          <TableRow>
            <FormCell title="고객명">
              <FormItem className="w-max ml-2">
                <Input
                  type="text"
                  aria-label="고객명"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <Button aria-label="고객명 검색" variant="none" only="icon" size="md">
                  <SearchIcon />
                </Button>
              </FormItem>
            </FormCell>
          </TableRow>
        </FormTable>
      </StoryWrap>
    );
  },
};

export const Form2: Story = {
  render: () => {
    const [planNo1, setPlanNo1] = React.useState('');
    const [planNo2, setPlanNo2] = React.useState('');
    const [customer, setCustomer] = React.useState('');

    return (
      <StoryWrap>
        <FormTable variant="boxIn" caption="설계번호 입력 예시" cols={['w-[10rem] min-w-[10rem]', '']}>
          <TableRow>
            <FormCell title="설계번호">
              <Input
                type="text"
                aria-label="설계번호 앞자리"
                width="lg"
                value={planNo1}
                onChange={(e) => setPlanNo1(e.target.value)}
              />
              <Separator>-</Separator>
              <Input
                type="text"
                aria-label="설계번호 뒷자리"
                width="lg"
                value={planNo2}
                onChange={(e) => setPlanNo2(e.target.value)}
              />
              <FormItem className="w-max ml-2">
                <Input
                  type="text"
                  aria-label="고객 정보"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
                <Button aria-label="고객 검색" variant="none" only="icon" size="md">
                  <SearchIcon />
                </Button>
              </FormItem>
            </FormCell>
          </TableRow>
        </FormTable>
      </StoryWrap>
    );
  },
};
