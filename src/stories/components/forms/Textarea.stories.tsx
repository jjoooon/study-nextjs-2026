import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Textarea } from '@uiux/Textarea';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
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
                Textarea 컴포넌트는 여러 줄 텍스트 입력을 위한 폼 UI 요소입니다.
                <br />
                기본 스타일과 outline 스타일을 지원하며, 에러 상태와 메시지 위치를 제어할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Textarea 컴포넌트는 다양한 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 입력(default)</li>
              <li>outline 스타일</li>
              <li>읽기 전용/비활성화 상태</li>
              <li>에러 메시지 및 위치 제어</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { Textarea } from '@uiux/Textarea';

<Textarea
  variant={'default' | 'outline'}
  placeholder={'내용을 입력하세요'}
  readOnly={false | true}
  disabled={false | true}

  error={false | true}
  errorMsg={'입력은 필수입니다.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'}

  minLength={10}
  showMinLengthCount={false | true}
/>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Textarea 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
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
                  <td>'default', 'outline'</td>
                  <td>Textarea 스타일</td>
                </tr>
                <tr>
                  <td>placeholder</td>
                  <td>string</td>
                  <td>플레이스홀더 텍스트</td>
                </tr>
                <tr>
                  <td>readOnly</td>
                  <td>boolean</td>
                  <td>읽기 전용 여부</td>
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
                <tr>
                  <td>minLength</td>
                  <td>number</td>
                  <td>최소 글자 수 (조건 미달 시 에러 유지, 충족 시 에러 자동 해제)</td>
                </tr>
                <tr>
                  <td>showMinLengthCount</td>
                  <td>boolean</td>
                  <td>최소 글자 수 카운터 표시 여부 (minLength와 함께 사용)</td>
                </tr>
              </tbody>
            </table>

            <h2>Variant</h2>
            <p>Textarea 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <Textarea className="w-xs min-h-24" variant="default" value="default style" readOnly />
                  <Textarea className="w-xs min-h-24" variant="outline" value="outline style" readOnly />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>State</h2>
            <p>readOnly, disabled 상태를 지원합니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <Textarea className="w-xs min-h-24" value="읽기 전용" readOnly />
                  <Textarea className="w-xs min-h-24" value="비활성화" disabled />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>MinLength</h2>
            <p>minLength 설정 시 최소 글자 수 미달이면 에러가 유지되고, 충족하면 자동 해제됩니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Textarea className="w-xs min-h-24" error minLength={10} showMinLengthCount placeholder="10자 이상 입력하세요" />
              </Gcol>
            </Unstyled>

            <h2>Error</h2>
            <p>Textarea 컴포넌트에서 사용할 수 있는 에러 메시지 위치 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <Textarea className="w-xs min-h-24" value="에러" error errorPs="tl" errorMsg="top left" />
                  <Textarea className="w-xs min-h-24" value="에러" error errorPs="tc" errorMsg="top center" />
                  <Textarea className="w-xs min-h-24" value="에러" error errorPs="tr" errorMsg="top right" />
                </Grow>
                <Grow gap={8}>
                  <Textarea className="w-xs min-h-24" value="에러" error errorPs="bl" errorMsg="bottom left" />
                  <Textarea className="w-xs min-h-24" value="에러" error errorPs="bc" errorMsg="bottom center" />
                  <Textarea className="w-xs min-h-24" value="에러" error errorPs="br" errorMsg="bottom right" />
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
      control: { type: 'select' },
      options: ['default', 'outline'],
      table: { category: '스타일 props' },
    },

    readOnly: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    placeholder: {
      control: { type: 'text' },
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
    minLength: {
      control: { type: 'number' },
      table: { category: '에러 props' },
    },
    showMinLengthCount: {
      control: { type: 'boolean' },
      table: { category: '에러 props' },
    },

    className: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  args: {
    placeholder: '내용을 입력하세요',
    variant: 'default',
    readOnly: false,
    disabled: false,
    error: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
    showMinLengthCount: true,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? '');
    const { value: _, ...restArgs } = args;

    React.useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return <Textarea {...restArgs} value={value} onChange={handleChange} />;
  },
};
 