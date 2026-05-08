/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow } from '@atoms';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

type RadioGroupStoryProps = React.ComponentProps<typeof RadioGroup> &
  // RadioGroupItem props를 Storybook controls에서 함께 제어
  Pick<React.ComponentProps<typeof RadioGroupItem>, 'variant' | 'size' | 'color'>;

const meta: Meta<RadioGroupStoryProps> = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />
            <h2>History</h2>
            <ul>
              <li>2026.03.29</li>
            </ul>
            <h2>Overview</h2>
            <div>
              <p>
                RadioGroup 컴포넌트는 여러 옵션 중 단 하나를 선택할 때 사용하는 선택 UI입니다.
                <br />
                기본 원형 스타일과 버튼형 스타일을 제공하며, 필수/에러/비활성화 상태를 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>RadioGroup 컴포넌트는 다양한 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 라디오 그룹(default)</li>
              <li>버튼형 라디오 그룹(button)</li>
              <li>size, color 스타일 제어</li>
              <li>disabled, required, error 상태 제어</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { useState } from 'react';

const [value, setValue] = useState('option1');

<RadioGroup
  value={value}
  onValueChange={setValue}
  width={'full' | 'auto'}
  required={false | true}
  disabled={false | true}
  error={false | true}
  errorMsg={'하나를 선택해주세요.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'}
>
  <RadioGroupItem
    variant={'default' | 'button'}
    size={'defalut' | 'sm'}
    color={'primary' | 'info'}
    value="option1"
    id="r1"
  >
    Option 1
  </RadioGroupItem>
</RadioGroup>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>RadioGroup/RadioGroupItem에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>variant</td>
                  <td>'default', 'button'</td>
                  <td>라디오 아이템 스타일</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>'defalut', 'sm'</td>
                  <td>라디오 아이템 크기</td>
                </tr>
                <tr>
                  <td>color</td>
                  <td>'primary', 'info'</td>
                  <td>라디오 아이템 색상</td>
                </tr>
                <tr>
                  <td>width</td>
                  <td>'full', 'auto'</td>
                  <td>그룹 너비</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td>boolean</td>
                  <td>필수 선택 여부</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>boolean</td>
                  <td>비활성화 여부</td>
                </tr>
                <tr>
                  <td>error</td>
                  <td>boolean</td>
                  <td>에러 상태</td>
                </tr>
                <tr>
                  <td>errorMsg</td>
                  <td>ReactNode</td>
                  <td>에러 메시지</td>
                </tr>
                <tr>
                  <td>errorPs</td>
                  <td>'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'</td>
                  <td>에러 메시지 위치</td>
                </tr>
              </tbody>
            </table>

            <h2>Variant</h2>
            <p>RadioGroupItem의 variant 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <RadioGroup defaultValue="1" className="gap-2" width="auto">
                    <RadioGroupItem variant="default" value="1" id="doc-v-1">
                      Default 1
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" className="gap-2" width="auto">
                    <RadioGroupItem variant="button" value="1" id="doc-b-1">
                      Button 1
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" className="gap-2" width="auto">
                    <RadioGroupItem variant="chipBox" value="1" id="doc-chip-1">
                      ChipBox 1
                    </RadioGroupItem>
                    <RadioGroupItem variant="chipBox" value="2" id="doc-chip-2">
                      ChipBox 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Size</h2>
            <p>RadioGroupItem의 size 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <RadioGroup defaultValue="1" className="gap-2" width="auto">
                    <RadioGroupItem size="lg" value="1" id="doc-s-default-1">
                      Large
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" className="gap-2" width="auto">
                    <RadioGroupItem size="md" value="1" id="doc-s-sm-1">
                      Small
                    </RadioGroupItem>
                  </RadioGroup>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Color</h2>
            <p>RadioGroupItem의 color 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <RadioGroup defaultValue="1" className="gap-2" width="auto">
                    <RadioGroupItem color="primary" value="1" id="doc-c-p-1">
                      primary
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" className="gap-2" width="auto">
                    <RadioGroupItem color="info" value="1" id="doc-c-i-1">
                      info
                    </RadioGroupItem>
                  </RadioGroup>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>State</h2>
            <p>disabled, required 상태를 지원합니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <RadioGroup defaultValue="1" required className="gap-2" width="auto">
                    <RadioGroupItem value="1" id="doc-r-1">
                      Required 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-r-2">
                      Required 2
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" disabled className="gap-2" width="auto">
                    <RadioGroupItem value="1" id="doc-d-1">
                      Disabled 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-d-2">
                      Disabled 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Error</h2>
            <p>RadioGroup의 에러 메시지 위치 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <RadioGroup defaultValue="1" error errorMsg="top left" errorPs="tl" className="gap-2" width="auto">
                    <RadioGroupItem value="1" id="doc-e-tl-1">
                      Error 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-e-tl-2">
                      Error 2
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" error errorMsg="top center" errorPs="tc" className="gap-2" width="auto">
                    <RadioGroupItem value="1" id="doc-e-tc-1">
                      Error 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-e-tc-2">
                      Error 2
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" error errorMsg="top right" errorPs="tr" className="gap-2" width="auto">
                    <RadioGroupItem value="1" id="doc-e-tr-1">
                      Error 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-e-tr-2">
                      Error 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Grow>
                <Grow gap={8}>
                  <RadioGroup defaultValue="1" error errorMsg="bottom left" errorPs="bl" className="gap-2" width="auto">
                    <RadioGroupItem value="1" id="doc-e-bl-1">
                      Error 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-e-bl-2">
                      Error 2
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" error errorMsg="bottom center" errorPs="bc" className="gap-2" width="auto">
                    <RadioGroupItem value="1" id="doc-e-bc-1">
                      Error 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-e-bc-2">
                      Error 2
                    </RadioGroupItem>
                  </RadioGroup>
                  <RadioGroup defaultValue="1" error errorMsg="bottom right" errorPs="br" className="gap-2" width="auto">
                    <RadioGroupItem value="1" id="doc-e-br-1">
                      Error 1
                    </RadioGroupItem>
                    <RadioGroupItem value="2" id="doc-e-br-2">
                      Error 2
                    </RadioGroupItem>
                  </RadioGroup>
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
    controls: { expanded: false },
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'button', 'chipBox'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['lg', 'md'],
      table: { category: '스타일 props' },
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['primary', 'info'],
      table: { category: '스타일 props' },
    },
    width: {
      control: { type: 'inline-radio' },
      options: ['full', 'auto'],
      table: { category: '스타일 props' },
    },

    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    required: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },

    error: {
      control: { type: 'boolean' },
      table: { category: '에러 props' },
    },
    errorMsg: {
      control: { type: 'text' },
      table: { category: '에러 props' },
    },
    errorPs: {
      control: { type: 'inline-radio' },
      options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
      table: { category: '에러 props' },
    },

    onValueChange: {
      table: { disable: true },
    },

    className: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    defaultValue: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    value: undefined,
    width: 'full',
    disabled: false,
    required: false,
    error: false,
    errorMsg: '하나를 선택해주세요.',
    errorPs: 'bl',
    variant: 'default',
    size: 'lg',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<RadioGroupStoryProps>;

export const Default: Story = {
  render: (args) => {
    const initialValue = args.value ?? undefined;
    const [value, setValue] = React.useState<string | undefined>(initialValue);
    const { variant, size, color, value: _, ...groupArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? undefined);
    }, [args.value]);

    return (
      <RadioGroup {...groupArgs} value={value} onValueChange={setValue} className="gap-2">
        <RadioGroupItem variant={variant} size={size} color={color} value="option1" id="d1">Option1</RadioGroupItem>
        <RadioGroupItem variant={variant} size={size} color={color} value="option2" id="d2">Option2</RadioGroupItem>
        <RadioGroupItem variant={variant} size={size} color={color} value="option3" id="d3" disabled>Option3</RadioGroupItem>
      </RadioGroup>
    );
  },
};
