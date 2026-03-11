import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Gcol } from '@atoms';
import { AmountUnitInput } from '@features/AmountUnitInput';

import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof AmountUnitInput> = {
  title: 'Components/Forms/AmountUnitInput',
  component: AmountUnitInput,
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
                AmountUnitInput은 AG Grid와 같은 테이블 환경에서 가입금액을 편리하게 입력하고 조정하기 위한 컴포넌트입니다.
                <br />
                Popover를 통해 상세 금액 조정 UI를 제공하며, 숫자 포맷팅, 증감 버튼, 최소/최대값 설정 기능을 포함합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>AmountUnitInput 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { AmountUnitInput } from '@features/AmountUnitInput';
import { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState('10000');

  return (
    <AmountUnitInput
      value={value}
      onChange={setValue}
      onEnter={() => console.log('Enter pressed')}
    />
  )
}
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>AmountUnitInput 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
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
                  <td>value</td>
                  <td>string | number</td>
                  <td>입력 필드의 현재 값</td>
                </tr>
                <tr>
                  <td>onChange</td>
                  <td>{`(value: string | number) => void`}</td>
                  <td>값이 변경될 때 호출되는 콜백 함수</td>
                </tr>
                <tr>
                  <td>onEnter</td>
                  <td>{`() => void`}</td>
                  <td>사용자가 Enter 키를 눌렀을 때 호출되는 콜백 함수</td>
                </tr>
                <tr>
                  <td>inputRef</td>
                  <td>{`(el: HTMLInputElement | null) => void`}</td>
                  <td>input 요소의 ref를 전달받는 콜백 함수</td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    value: { control: 'text', description: '입력 값' },
    onChange: { action: 'changed', description: '값 변경 이벤트' },
    onEnter: { action: 'entered', description: 'Enter 키 입력 이벤트' },
    inputRef: { table: { disable: true } },
  },
  args: {
    value: '10000',
  },
};

export default meta;
type Story = StoryObj<typeof AmountUnitInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    const handleChange = (newValue: string | number) => {
      setValue(String(newValue));
      args.onChange(newValue);
    };

    return (
      <Gcol className="w-48 h-12">
        <AmountUnitInput {...args} value={value} onChange={handleChange} />
      </Gcol>
    );
  },
};
