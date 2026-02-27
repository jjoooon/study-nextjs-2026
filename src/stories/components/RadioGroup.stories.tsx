import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow,} from '@/shared/components/common';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';

type RadioGroupStoryProps = React.ComponentProps<typeof RadioGroup> &
  // RadioGroupItem의 props를 Storybook controls에서 사용하기 위해 추가
  Pick<React.ComponentProps<typeof RadioGroupItem>, 'variant' | 'size' | 'color'>;

const meta: Meta<RadioGroupStoryProps> = {
  title: 'Components/UIUX/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
RadioGroup은 사용자가 여러 옵션 중에서 단 하나의 값만 선택할 때 사용하는 컴포넌트이다.
일관된 디자인 시스템을 유지하면서 다양한 선택 시나리오에 대응할 수 있도록 설계되었다.

- **기본 라디오 그룹**과 **버튼 라디오 그룹** 두 가지 스타일을 제공한다.
- **default** variant는 원형 라디오 버튼 형태이다.
- **button** variant는 버튼 형태의 라디오 버튼이다.

---

<br>
#### **기본 라디오 그룹: Usage**
\`\`\`tsx
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { useState } from 'react';

const [value, setValue] = useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="option1" id="r1">Option 1</RadioGroupItem>
  <RadioGroupItem value="option2" id="r2">Option 2</RadioGroupItem>
  <RadioGroupItem value="option3" id="r3">Option 3</RadioGroupItem>
</RadioGroup>
\`\`\`

<br>
#### **버튼 라디오 그룹: Usage**
\`\`\`tsx
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { useState } from 'react';

const [value, setValue] = useState('option1');

<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem variant="button" value="option1" id="b1">Option 1</RadioGroupItem>
  <RadioGroupItem variant="button" value="option2" id="b2">Option 2</RadioGroupItem>
  <RadioGroupItem variant="button" value="option3" id="b3">Option 3</RadioGroupItem>
</RadioGroup>
\`\`\`
        `,
      },
    },
    controls: { expanded: false },
  },
  argTypes: {
    // RadioGroup Props
    disabled: {
      control: 'boolean',
      description: '모든 라디오 아이템 비활성화 여부',
      table: { category: 'State' },
    },
    required: {
      control: 'boolean',
      description: '필수 선택 여부',
      table: { category: 'State' },
    },
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
      table: { category: 'Error' },
    },
    onValueChange: {
      action: 'value changed',
      description: '값 변경 시 발생하는 이벤트',
      table: { category: 'Events' },
    },
    // RadioGroupItem Props (Story에서 제어하기 위해 argTypes에 추가)
    variant: {
      control: 'select',
      options: ['default', 'button'],
      description: '라디오 아이템 스타일 유형',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: '라디오 아이템 크기',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: ['primary', 'information'],
      description: '라디오 아이템 색상 (hover/checked 상태)',
      table: { category: 'Appearance' },
    },
    className: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
  },
  args: {
    disabled: false,
    required: false,
    error: false,
    errorMsg: '하나를 선택해주세요.',
    errorPs: 'bl',
    variant: 'default',
    size: 'large',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<RadioGroupStoryProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('option1');
    const { variant, size, color, ...groupArgs } = args;

    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <RadioGroup {...groupArgs} value={value} onValueChange={setValue} className="gap-2">
            <RadioGroupItem variant={variant} size={size} color={color} value="option1" id="d1">
              {variant === 'button' ? 'Button Option 1' : 'Option 1'}
            </RadioGroupItem>
            <RadioGroupItem variant={variant} size={size} color={color} value="option2" id="d2">
              {variant === 'button' ? 'Button Option 2' : 'Option 2'}
            </RadioGroupItem>
            <RadioGroupItem variant={variant} size={size} color={color} value="option3" id="d3" disabled>
              {variant === 'button' ? 'Disabled Option 3' : 'Disabled Option 3'}
            </RadioGroupItem>
          </RadioGroup>
        </StoryBox>
        <StoryBox>
          <Grow placement="cc" className="gap-2">
            <Gcol placement="ss" className="gap-[0.2rem]">
              <RadioGroup defaultValue="1" className="gap-2">
                <RadioGroupItem value="1" id="s1">
                  Default 1
                </RadioGroupItem>
                <RadioGroupItem value="2" id="s2">
                  Default 2
                </RadioGroupItem>
              </RadioGroup>
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <RadioGroup defaultValue="1" className="gap-2">
                <RadioGroupItem variant="button" value="1" id="sb1">
                  Button 1
                </RadioGroupItem>
                <RadioGroupItem variant="button" value="2" id="sb2">
                  Button 2
                </RadioGroupItem>
              </RadioGroup>
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <RadioGroup defaultValue="1" disabled className="gap-2">
                <RadioGroupItem value="1" id="sd1">
                  Disabled 1
                </RadioGroupItem>
                <RadioGroupItem value="2" id="sd2">
                  Disabled 2
                </RadioGroupItem>
              </RadioGroup>
            </Gcol>
            <Gcol placement="ss" className="gap-[0.2rem]">
              <RadioGroup defaultValue="1" error errorMsg="에러!" className="gap-2">
                <RadioGroupItem value="1" id="se1">
                  Error 1
                </RadioGroupItem>
                <RadioGroupItem value="2" id="se2">
                  Error 2
                </RadioGroupItem>
              </RadioGroup>
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Button: Story = {
  args: {
    variant: 'button',
  },
  render: (args) => {
    const [value, setValue] = React.useState('1');
    const { variant, size, color, ...groupArgs } = args;
    return (
      <RadioGroup {...groupArgs} value={value} onValueChange={setValue} className="gap-2">
        <RadioGroupItem variant={variant} size={size} color={color} value="1" id="b1">
          Button 1
        </RadioGroupItem>
        <RadioGroupItem variant={variant} size={size} color={color} value="2" id="b2">
          Button 2
        </RadioGroupItem>
        <RadioGroupItem variant={variant} size={size} color={color} value="3" id="b3">
          Button 3
        </RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = React.useState('1');
    return (
      <div className="flex flex-col items-start gap-4">
        <RadioGroup value={value} onValueChange={setValue} className="gap-2">
          <RadioGroupItem size="large" value="1" id="l1">
            Large
          </RadioGroupItem>
          <RadioGroupItem size="large" value="2" id="l2">
            Large
          </RadioGroupItem>
        </RadioGroup>
        <RadioGroup value={value} onValueChange={setValue} className="gap-2">
          <RadioGroupItem size="small" value="1" id="s1">
            Small
          </RadioGroupItem>
          <RadioGroupItem size="small" value="2" id="s2">
            Small
          </RadioGroupItem>
        </RadioGroup>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return (
      <RadioGroup defaultValue="1" {...args} className="gap-2">
        <RadioGroupItem value="1" id="dis1">
          Option 1
        </RadioGroupItem>
        <RadioGroupItem value="2" id="dis2">
          Option 2
        </RadioGroupItem>
      </RadioGroup>
    );
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorMsg: 'This field is required.',
    errorPs: 'bl',
  },
  render: (args) => {
    return (
      <RadioGroup {...args} className="gap-2">
        <RadioGroupItem value="1" id="err1">
          Option 1
        </RadioGroupItem>
        <RadioGroupItem value="2" id="err2">
          Option 2
        </RadioGroupItem>
      </RadioGroup>
    );
  },
};
