import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Input } from '@uiux/Input';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof Input> = {
  title: 'Components/Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div> 
              <p>
                Input 컴포넌트는 사용자로부터 텍스트 기반의 데이터를 입력받기 위한 UI 요소입니다.<br />
                일관된 디자인 시스템을 유지하며 다양한 입력 시나리오에 대응할 수 있도록 설계되었습니다.
              </p>
            </div>
            
            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Input 컴포넌트는 다양한 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 입력</li>
              <li>사전 정의된 스타일(variant, size, width)</li>
              <li>포맷팅(숫자/금액)</li>
              <li>에러 메시지, 읽기 전용, 클리어 버튼 등</li>
              <li>before/after로 커스텀 요소 추가</li>
            </ul>
            <Markdown>
            {`
\`\`\`tsx
import { Input } from '@uiux/Input';

<Input
  variant={'default' | 'ghost'}
  size={'md' | 'sm'}
  width={'full' | 'auto' | 'max' | 'min' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '??rem'}
  
  required={false | true}
  readOnly={false | true}
  clear={false | true}
  commaAmount={false | true}

  before={''}
  after={''}
 
  error={false | true}
  errorMsg={'입력은 필수입니다.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'} 
>
\`\`\`
            `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>variant</td><td>'default', 'ghost'</td><td>인풋 스타일</td></tr>
                <tr><td>size</td><td>'md', 'sm'</td><td>인풋 크기</td></tr>
                <tr><td>width</td><td>'full', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'</td><td>인풋 너비</td></tr>
                <tr><td>required</td><td>boolean</td><td>필수 입력 여부</td></tr>
                <tr><td>readOnly</td><td>boolean</td><td>읽기 전용</td></tr>
                <tr><td>error</td><td>boolean</td><td>에러 상태</td></tr>
                <tr><td>errorMsg</td><td>ReactNode</td><td>에러 메시지</td></tr>
                <tr><td>errorPs</td><td>'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'</td><td>에러 메시지 위치</td></tr>
                <tr><td>after</td><td>ReactNode</td><td>인풋 뒤에 붙는 요소</td></tr>
                <tr><td>before</td><td>ReactNode</td><td>인풋 앞에 붙는 요소</td></tr>
                <tr><td>commaAmount</td><td>boolean</td><td>입력값 콤마 자동 포맷팅</td></tr>
                <tr><td>clear</td><td>boolean</td><td>클리어 버튼 표시</td></tr>
              </tbody>
            </table>

            <h2>Variant</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Grow gap={8}>
                  <Input size="full" variant="default" value="default: 기본 라인,배경 스타일" />
                  <Input size="full" variant="ghost" value="ghost: 라인,배경색 없는 스타일"  />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Size</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Grow gap={8}>
                  <Input size="md" value="md: 28" />
                  <Input size="sm" value="sm: 25"  />
                </Grow>
              </Gcol>
            </Unstyled>


            <h2>Width</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 width 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-8" >
                <Gcol gap={2} className="w-[60rem] p-2">
                  <Input width="full" value="full" />
                  <Input width="max" value="max" />
                  <Input width="min" value="min" />
                  <Input width="2xs" value="2xs" />
                  <Input width="xs" value="xs" />
                  <Input width="sm" value="sm" />
                  <Input width="md" value="md" />
                  <Input width="lg" value="lg" />
                  <Input width="xl" value="xl" />
                  <Input width="2xl" value="2xl" />
                </Gcol>
              </Gcol>
            </Unstyled>

            <h2>commaAmount</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 금액에 자동으로 생성되는 콤마 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Input width="lg" commaAmount={true} value="9123814000" />
              </Gcol>
            </Unstyled>

            <h2>Clear</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 클리어 버튼 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Grow gap={8}>
                  <Input width="30rem" clear={true} value="포커스 + 입력값 = clear 버튼" />
                  <Input width="30rem" clear={true} size="sm" value="포커스 + 입력값 = clear 버튼" />
                </Grow>
              </Gcol>
            </Unstyled>

            
            <h2>Required</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 필수 입력 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Grow gap={8}>
                  <Input required placeholder="placeholder" />
                  <Input required value="입력된 값" />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>ReadOnly</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 읽기 전용 옵션은 다음과 같습니다. diabled 옵션은 사용하지 않습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Grow gap={8}>
                  <Input readOnly placeholder="placeholder" />
                  <Input readOnly value="입력된 값" />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Before/After</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 before/after 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Grow gap={8}>
                  <Input before="$" value="230" />
                  <Input after="만원" value="230" className="text-right" />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Error</h2>
            <p>Input 컴포넌트에서 사용할 수 있는 에러 메시지 위치 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16" >
                <Grow gap={8}>
                  <Input error errorMsg="입력은 필수입니다." errorPs="tl" />
                  <Input error errorMsg="입력은 필수입니다." errorPs="tc" />
                  <Input error errorMsg="입력은 필수입니다." errorPs="tr" />
                </Grow>
                <Grow gap={8}>
                  <Input error errorMsg="입력은 필수입니다." errorPs="bl" />
                  <Input error errorMsg="입력은 필수입니다." errorPs="bc" />
                  <Input error errorMsg="입력은 필수입니다." errorPs="br" />
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    disabled: {
      table: { disable: true },
    },
    forceFocused: {
      table: { disable: true },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['md', 'sm'],
      table: { category: '스타일 props' },
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: { category: '스타일 props' },
    },

    required: {
      control: { type: 'boolean' },
      table: { category: '설정 props',},
    },
    readOnly: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    clear: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },

    before: {
      table: { category: '설정 props' },
       control: { type: 'text' },
    },
    after: {
      table: { category: '설정 props' },
       control: { type: 'text' },
    },
     commaAmount: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },

    error: {
      control: { type: 'boolean' },
      table: { category: '에러 props' },
    },
    errorPs: {
      control: { type: 'select' },
      options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
      table: { category: '에러 props' },
    },
    errorMsg: {
      control: { type: 'text' },
      table: { category: '에러 props' },
    },
   
    // 숨기고 싶은 prop 예시
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    width: 'full',
    size: 'md',
    error: false,
    errorMsg: '입력은 필수입니다.',
    errorPs: 'bl',
    required: false,
    readOnly: false,
    clear: false,
    commaAmount: false,
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
    return <Input {...restArgs} value={value} onChange={handleChange} placeholder="입력해주세요." />;
  },
};

