import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';
import { Textarea } from '@uiux/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/UIUX/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Textarea는 여러 줄의 텍스트를 입력받기 위한 컴포넌트이다.
메모, 상세 설명, 사유 입력 등 긴 텍스트를 다루는 폼에서 사용한다.

- **variant**로 입력 필드 스타일을 제어한다.
- **error / errorMsg / errorPs**로 검증 메시지를 표시한다.
- **placeholder / disabled / aria-invalid** 등 표준 속성을 그대로 사용할 수 있다.

<br>
#### **기본 Textarea: Usage**
\`\`\`tsx
import { Textarea } from '@uiux/Textarea';

<Textarea
  variant="default"
  placeholder="내용을 입력하세요"
/>
\`\`\`

<br>
#### **Outline Textarea: Usage**
\`\`\`tsx
import { Textarea } from '@uiux/Textarea';

<Textarea
  variant="outline"
  placeholder="상세 내용을 입력하세요"
/>
\`\`\`

<br>
#### **Error Textarea: Usage**
\`\`\`tsx
import { Textarea } from '@uiux/Textarea';

<Textarea
  variant="default"
  error
  errorMsg="에러 메시지를 입력하세요."
  errorPs="bl"
  placeholder="내용을 입력하세요"
/>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Textarea 스타일 유형',
      table: { category: 'Appearance' },
    },
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
      table: { category: 'Error' },
    },
    errorMsg: {
      control: 'text',
      description: '에러 메시지',
      table: { category: 'Error' },
    },
    errorPs: {
      control: 'select',
      options: ['tl', 'tr', 'bl', 'br'],
      description: '에러 메시지 위치',
      table: { category: 'Error' },
    },
  },
  args: {
    placeholder: '내용을 입력하세요',
    variant: 'default',
    error: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState((args.value as string) ?? '');
    const { value: _, onChange, ...restArgs } = args;

    React.useEffect(() => {
      setValue((args.value as string) ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <Textarea {...restArgs} value={value} onChange={handleChange} className="w-xs min-h-40" />
        </StoryBox>
        <StoryBox>
          <Grow placement="cc" className="gap-2">
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Textarea className="w-xs min-h-24" variant="outline" value="outline Textarea" readOnly />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Textarea className="w-xs min-h-24" value="에러 Textarea" error errorMsg="에러 메시지입니다." errorPs="bl" />
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline'
  },
  render: (args) => <Textarea {...args} className="w-md min-h-40" />,
};



export const Error: Story = {
  args: {
    error: true,
    errorMsg: '에러 메시지를 입력하세요.',
    errorPs: 'tl',
  },
  render: (args) => {
    const [value, setValue] = React.useState((args.value as string) ?? '');
    const { value: _, onChange, ...restArgs } = args;

    React.useEffect(() => {
      setValue((args.value as string) ?? '');
    }, [args.value]);

  
    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <Grow placement="cc" className="gap-2">
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Textarea className="w-xs min-h-24" value="에러" error errorPs="tl" errorMsg="top left" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Textarea className="w-xs min-h-24" value="에러" error errorPs="tr" errorMsg="top right" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Textarea className="w-xs min-h-24" value="에러" error errorPs="bl" errorMsg="bottom left" />
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <Textarea className="w-xs min-h-24" value="에러" error errorPs="br" errorMsg="bottom right" />
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};
