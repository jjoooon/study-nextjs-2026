import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
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
            <h2>Overview</h2>
            <div>
              <p>
                Checkbox 컴포넌트는 사용자가 단일 또는 복수 옵션을 선택할 때 사용하는 폼 입력 UI입니다.
                <br />
                디자인 시스템에 맞춘 variant, 크기, 색상, 상태(checked/indeterminate/disabled)를 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Checkbox 컴포넌트는 다양한 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 체크박스(default)</li>
              <li>아이콘형 favorite, 텍스트형 text, 라벨 미노출 noneText</li>
              <li>토글 버튼형 button</li>
              <li>indeterminate(부분 선택) 및 disabled 상태</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { Checkbox } from '@uiux/Checkbox';
import { useState } from 'react';

const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
// 단일선택
<Checkbox
  checked={checked}
  onCheckedChange={setChecked}

  variant={'default' | 'favorite' | 'noneText' | 'button' | 'text'}
  size={'lg' | 'md'}
  color={'primary' | 'info'}

  required={false | true}
  disabled={false | true}

  error={false | true}
  errorMsg={'선택은 필수입니다.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'}
>
  Label
</Checkbox>

// 그룹선택
<CheckboxGroup
  value={values}
  onValueChange={handleGroupChange}

  variant={'default' | 'favorite' | 'noneText' | 'button' | 'text'}
  size={'lg' | 'md'}
  color={'primary' | 'info'}

  minSelected={0 | 1 | 2 | 3 ...}
  required={false | true}

  error={false | true}
  errorMsg={'2개 이상 선택은 필수입니다.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'}
>
  <CheckboxGroupItem value="a">옵션 A</CheckboxGroupItem>
  <CheckboxGroupItem value="b">옵션 B</CheckboxGroupItem>
  <CheckboxGroupItem value="c">옵션 C</CheckboxGroupItem>
</CheckboxGroup>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Checkbox 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
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
                  <td>'default', 'favorite', 'noneText', 'button', 'text'</td>
                  <td>체크박스 스타일</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>'default', 'sm'</td>
                  <td>체크박스 크기</td>
                </tr>
                <tr>
                  <td>color</td>
                  <td>'primary', 'info'</td>
                  <td>체크박스 색상 테마</td>
                </tr>
                <tr>
                  <td>checked</td>
                  <td>boolean | 'indeterminate'</td>
                  <td>체크 상태</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td>boolean</td>
                  <td>필수 선택 상태 스타일</td>
                </tr>
                <tr>
                  <td>error</td>
                  <td>boolean</td>
                  <td>에러 상태 여부</td>
                </tr>
                <tr>
                  <td>errorMsg</td>
                  <td>ReactNode</td>
                  <td>에러 메시지 내용</td>
                </tr>
                <tr>
                  <td>errorPs</td>
                  <td>'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'</td>
                  <td>에러 메시지 위치</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>boolean</td>
                  <td>비활성화 상태</td>
                </tr>
                <tr>
                  <td>children</td>
                  <td>ReactNode</td>
                  <td>라벨 텍스트</td>
                </tr>
                <tr>
                  <td>onCheckedChange</td>
                  <td>(checked) =&gt; void</td>
                  <td>체크 상태 변경 이벤트</td>
                </tr>
              </tbody>
            </table>

            <h2>Variant</h2>
            <p>Checkbox 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <Typo tag="div" className="w-[9rem] tracking-normal">default</Typo>
                  <Grow className="w-[12rem]">
                    <Checkbox variant="default">default</Checkbox>
                  </Grow>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[9rem] tracking-normal">favorite</Typo>
                  <Grow className="w-[12rem]">
                    <Checkbox variant="favorite" />
                  </Grow>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[9rem] tracking-normal">noneText</Typo>
                  <Grow className="w-[12rem]">
                    <Checkbox variant="noneText">noneText</Checkbox>
                  </Grow>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[9rem] tracking-normal">button</Typo>
                  <Grow className="w-[12rem]">
                    <Checkbox variant="button">button</Checkbox>
                  </Grow>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[9rem] tracking-normal">text</Typo>
                  <Grow className="w-[12rem]">
                    <Checkbox variant="text">text</Checkbox>
                  </Grow>
                </Grow>
                
              </Gcol>
            </Unstyled>

            <h2>Size</h2>
            <p>Checkbox 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <Checkbox>lg: 20</Checkbox>
                  <Checkbox size="md">md: 14</Checkbox>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Color</h2>
            <p>Checkbox 컴포넌트에서 사용할 수 있는 color 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <Checkbox color="primary" checked>
                    primary
                  </Checkbox>
                  <Checkbox color="info" checked>
                    info
                  </Checkbox>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>State</h2>
            <p>checked, indeterminate, disabled 상태를 지원합니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <Typo tag="div" className="w-[15rem] tracking-normal">unchecked</Typo>
                  <Checkbox variant="default">default</Checkbox>
                  <Checkbox variant="favorite" />
                  <Checkbox variant="noneText">noneText</Checkbox>
                  <Checkbox variant="button">button</Checkbox>
                  <Checkbox variant="text">
                    text
                  </Checkbox>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[15rem] tracking-normal">hover</Typo>
                  <Checkbox variant="default" className="border-[var(--color-border-primary)]">default</Checkbox>
                  <Checkbox variant="favorite" className="border-[var(--color-border-primary)]" />
                  <Checkbox variant="noneText" className="border-[var(--color-border-primary)]">noneText</Checkbox>
                  <Checkbox variant="button" className="border-[var(--color-border-primary)]">button</Checkbox>
                  <Checkbox variant="text" className="underline underline-offset-4 font-bold!">
                    text
                  </Checkbox>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[15rem] tracking-normal">checked</Typo>
                  <Checkbox checked variant="default">default</Checkbox>
                  <Checkbox checked variant="favorite" />
                  <Checkbox checked variant="noneText">noneText</Checkbox>
                  <Checkbox checked variant="button">button</Checkbox>
                  <Checkbox checked variant="text">
                    text
                  </Checkbox>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[15rem] tracking-normal">disabled</Typo>
                  <Checkbox disabled variant="default">default</Checkbox>
                  <Checkbox disabled variant="favorite" />
                  <Checkbox disabled variant="noneText">noneText</Checkbox>
                  <Checkbox disabled variant="button">button</Checkbox>
                  <Checkbox disabled variant="text">
                    text
                  </Checkbox>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[15rem] tracking-normal">checked+disabled</Typo>
                  <Checkbox checked disabled variant="default">default</Checkbox>
                  <Checkbox checked disabled variant="favorite" />
                  <Checkbox checked disabled variant="noneText">noneText</Checkbox>
                  <Checkbox checked disabled variant="button">button</Checkbox>
                  <Checkbox checked disabled variant="text">
                    text
                  </Checkbox>
                </Grow>
                <Grow gap={8}>
                  <Typo tag="div" className="w-[15rem] tracking-normal">required</Typo>
                  <Checkbox required variant="default">default</Checkbox>
                  <Checkbox required variant="favorite" />
                  <Checkbox required variant="noneText">noneText</Checkbox>
                  <Checkbox required variant="button">button</Checkbox>
                  <Checkbox required variant="text">
                    text
                  </Checkbox>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Error</h2>
            <p>Checkbox 컴포넌트에서 사용할 수 있는 에러 메시지 위치 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Grow className="gap-[8rem]">
                  <Checkbox error errorMsg="입력은 필수입니다." errorPs="tl">default</Checkbox>
                  <Checkbox error errorMsg="입력은 필수입니다." errorPs="tc">default</Checkbox>
                  <Checkbox error errorMsg="입력은 필수입니다." errorPs="tr">default</Checkbox>
                </Grow>
                <Grow className="gap-[8rem]">
                  <Checkbox error errorMsg="입력은 필수입니다." errorPs="bl">default</Checkbox>
                  <Checkbox error errorMsg="입력은 필수입니다." errorPs="bc">default</Checkbox>
                  <Checkbox error errorMsg="입력은 필수입니다." errorPs="br">default</Checkbox>
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'favorite', 'noneText', 'button', 'text'],
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

    checked: {
      control: { type: 'select' },
      options: [false, true, 'indeterminate'],
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
      control: { type: 'select' },
      options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
      table: { category: '에러 props' },
    },
    required: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },

    showErrorMsg: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
    onCheckedChange: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    size: 'lg',
    color: 'primary',
    required: false,
    error: false,
    errorMsg: '선택은 필수입니다.',
    errorPs: 'bl',
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(args.checked ?? false);
    const { checked: _, ...restArgs } = args;
    const [values, setValues] = React.useState<string[]>([]);

    const [groupError, setGroupError] = React.useState(false);
    const minSelected = 2;

    React.useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    const handleCheckedChange = (value: boolean | 'indeterminate') => {
      setChecked(value);
      args.onCheckedChange?.(value);
    };

    const handleGroupChange = (nextValues: string[]) => {
      setValues(nextValues);
      if (groupError && nextValues.length >= minSelected) {
        setGroupError(false);
      }
    };

    return (
      <>
        <Gcol gap={8}>
          <Checkbox {...restArgs} checked={checked} onCheckedChange={handleCheckedChange}>
            단일체크
          </Checkbox>

          <Grow gap={2}>
            <Typo tag={'div'} className="w-[8rem]">그룹체크</Typo>
            <CheckboxGroup
              value={values}
              onValueChange={handleGroupChange}
              
              variant={args.variant}
              size={args.size}
              color={args.color}
              disabled={args.disabled}

              minSelected={minSelected}
              required={args.required}

              error={args.error}
              errorPs={args.errorPs}
              errorMsg={`${minSelected}개 이상 선택해 주세요.`}

              className="gap-3"
            >
              <CheckboxGroupItem value="a">옵션 A</CheckboxGroupItem>
              <CheckboxGroupItem value="b">옵션 B</CheckboxGroupItem>
              <CheckboxGroupItem value="c">옵션 C</CheckboxGroupItem>
            </CheckboxGroup>
          </Grow>
        </Gcol>
      </>
    );
  },
};
 