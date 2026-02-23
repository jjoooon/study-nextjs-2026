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
    docs: {
      description: {
        component: `**Input** 컴포넌트는 사용자로부터 텍스트 기반의 데이터를 입력받기 위한 핵심 UI 요소입니다.
일관된 디자인 시스템을 유지하면서 다양한 입력 시나리오에 대응할 수 있도록 설계되었습니다.

- **다양한 상태**: \`default\`, \`error\`, \`disabled\`, \`readOnly\` 등 명확한 시각적 피드백을 제공합니다.
- **유연한 스타일링**: \`size\`, \`width\` prop을 통해 레이아웃에 유연하게 통합될 수 있습니다.
- **확장성**: \`before\`, \`after\` prop을 사용하여 아이콘이나 단위 등을 쉽게 추가할 수 있습니다.
- **사용자 편의성**: \`clear\` (초기화) 버튼, \`formatType\` 등 편의 기능을 지원합니다.

\`\`\`tsx
import { Input } from '@/shared/components/uiux/Input';

// 기본 사용
<Input type="text" aria-label="text" defaultValue="text" />

// size
<Input size="lg" placeholder="text" />
<Input size="sm" placeholder="text" />

// width
<Input width="full" placeholder="text" />
<Input width="md" placeholder="text" />

// states
<Input disabled value="Disabled" />
<Input readOnly value="Read Only" />

// error
<Input width="sm" error errorPs='bl' errorMsg="에러 메시지입니다." />

// before, after
<Input before="시간:" placeholder="text" />
<Input after="원" className="text-right" />

// formatType
<Input formatType="amount" value="10000" />
<Input formatType="number" value="10000" />
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
      table: { category: 'State' },
    },
    errorMsg: {
      control: 'text',
      description: '에러 메시지 내용',
      table: { category: 'Error Handling' },
    },
    errorPs: {
      control: 'select',
      options: ['tl', 'tr', 'bl', 'br'],
      description: '에러 메시지 위치',
      table: {
        category: 'Error Handling',
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
      <StoryWrap>
        <StoryBox>
          <Grow>
            <Input {...restArgs} value={value} onChange={handleChange} />
          </Grow>
        </StoryBox>
        <StoryBox>
          <Grow placement="cc" className="gap-2">
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Typo variant="body-sm">읽기전용</Typo>
              <Input width="sm" value="Read" readOnly />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Typo variant="body-sm">필수입력</Typo>
              <Input width="sm" required />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Typo variant="body-sm">에러</Typo>
              <Input width="sm" error errorPs="bl" errorMsg="에러 메시지입니다." />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Typo variant="body-sm">before</Typo>
              <Input width="sm" before="시간:" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Typo variant="body-sm">after + amount</Typo>
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
      <StoryWrap>
        <StoryBox>
          <Input {...restArgs} value={value} onChange={handleChange} />
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Before: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    before: '시간',
  },
};

export const After: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    after: '원',
  },
};

export const Number: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    formatType: 'number',
    value: '10000',
  },
};

export const Amount: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    formatType: 'amount',
    value: '10000',
    after: '원',
  },
};

export const Form: Story = {
  args: {
    required: true,
  },

  render: () => (
    <StoryWrap>
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
    </StoryWrap>
  ),
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
                <Button aria-label="고객 검색" variant="none" size="icon-md">
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

export const Form3: Story = {
  render: () => {
    const [planNumber, setPlanNumber] = React.useState(['', '']);

    const handlePlanNumberChange = (index: number, value: string) => {
      const newPlanNumber = [...planNumber];
      newPlanNumber[index] = value;
      setPlanNumber(newPlanNumber);
    };

    const [contractHolder, setContractHolder] = React.useState('');

    return (
      <StoryWrap>
        <FormTable caption="계약자 관련 정보 입력하세요." cols={['w-[6rem]', '']} variant="none">
          <FormRow>
            <FormCell title="설계번호">
              <Input
                aria-label="설계번호 입력"
                type="text"
                value={planNumber[0]}
                width="lg"
                onChange={(e) => handlePlanNumberChange(0, e.target.value)}
              />
              <Separator>-</Separator>
              <Input
                aria-label="설계번호 입력"
                type="text"
                value={planNumber[1]}
                width="sm"
                onChange={(e) => handlePlanNumberChange(1, e.target.value)}
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
      </StoryWrap>
    );
  },
};
