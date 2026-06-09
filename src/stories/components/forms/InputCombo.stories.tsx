/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Gcol } from '@atoms';
import { InputCombo } from '@common/InputCombo';
import { useFormFields } from '@hooks/useFormFields';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ar } from 'date-fns/locale';
import * as React from 'react';

const meta: Meta<typeof InputCombo> = {
  title: 'Components/Forms/InputCombo',
  component: InputCombo,
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
                InputCombo는 Input과 Popover 리스트 기능을 결합한 컴포넌트입니다. 입력값에 따라 옵션을 필터링하고,
                리스트 항목 선택 시 입력값을 변경합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>기본 사용 예시는 아래와 같습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { InputCombo } from '@common/InputCombo';

const options = [
  { value: 'LA25094848895', label: 'LA25094848895' },
  { value: 'LA24094848896', label: 'LA24094848896' },
];

function Example() {
  const [value, setValue] = React.useState('');
  return (
    <InputCombo
      options={options}
      value={value}
      onChange={setValue}
      placeholder="증권번호를 입력하세요"
      popoverPlacement="bottom"
    />
  );
}
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>스토리에서 자주 사용하는 주요 prop입니다.</p>
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
                  <td>string</td>
                  <td>현재 입력값</td>
                </tr>
                <tr>
                  <td>onChange</td>
                  <td>(value: string) =&gt; void</td>
                  <td>입력값 변경 핸들러</td>
                </tr>
                <tr>
                  <td>options</td>
                  <td>Array&lt;string | {`{ value, label }`}&gt;</td>
                  <td>자동완성 목록</td>
                </tr>
                <tr>
                  <td>popoverPlacement</td>
                  <td>'bottom' | 'top'</td>
                  <td>목록 표시 위치</td>
                </tr>
                <tr>
                  <td>clear</td>
                  <td>boolean</td>
                  <td>입력값 클리어 버튼 표시</td>
                </tr>
                <tr>
                  <td>placeholder</td>
                  <td>string</td>
                  <td>플레이스홀더</td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    inputId: { table: { disable: true } },
    clear: { table: { disable: true } },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
      table: { category: 'Input' },
    },
    readOnly: {
      control: 'boolean',
      table: { category: 'Input' },
    },
    required: {
      control: 'boolean',
      table: { category: 'Input' },
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'ghost'],
      table: { category: 'Input' },
    },
    size: {
      control: 'inline-radio',
      options: ['lg', 'md'],
      table: { category: 'Input' },
    },
    width: {
      control: 'inline-radio',
      options: ['full', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: { category: 'Input' },
    },
    col: {
      control: 'inline-radio',
      options: [1, 2, 3, 4],
      table: { category: 'Input' },
    },
    className: { table: { disable: true } },
    forceFocused: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
  args: {
    clear: true,
    placeholder: '증권번호를 입력하세요',
    variant: 'default',
    size: 'lg',
    width: 'full',
    readOnly: false,
    required: false,
    col: 1,
  },
};
export default meta;
type Story = StoryObj<typeof InputCombo>;

const sampleOptions = [
  {
    value: 'LA25094848895',
    label: (
      <>
        <td>LA25094848895</td>
        <td>박은빈</td>
        <td>72,300</td>
        <td>설계중</td>
      </>
    ),
  },
  {
    value: 'LA24094848896',
    label: (
      <>
        <td>LA24094848896</td>
        <td>김민지</td>
        <td>55,000</td>
        <td>청약완료</td>
      </>
    ),
  },
  {
    value: 'LA25094848897',
    label: (
      <>
        <td>LA25094848897</td>
        <td>이도현</td>
        <td>120,000</td>
        <td>심사중</td>
      </>
    ),
  },
  // { value: 'LA25094848898', label: <><td>LA25094848898</td><td>최수영</td><td>88,800</td><td>설계중</td></> },
  // { value: 'LA25094848899', label: <><td>LA25094848899</td><td>박보검</td><td>99,900</td><td>계약완료</td></> },
  // { value: 'LA25094848900', label: <><td>LA25094848900</td><td>한지민</td><td>77,700</td><td>설계중</td></> },
];

const sampleOptions2 = [
  { value: '김민수', label: <td>김민수</td> },
  { value: '이수진', label: <td>이수진</td> },
  { value: '박지훈', label: <td>박지훈</td> },
  { value: '최유리', label: <td>최유리</td> },
  { value: '정해인', label: <td>정해인</td> },
  { value: '오세훈', label: <td>오세훈</td> },
];

export const Default: Story = {
  render: (args) => {
    const [form, setFormField] = useFormFields({ combo1: '', combo2: '' });

    return (
      <Gcol>
        <InputCombo
          {...args}
          options={sampleOptions}
          col={1}
          clear={true}
          value={form.combo1}
          onChange={(value) => setFormField('combo1', value)}
        />
        <InputCombo
          {...args}
          options={sampleOptions2}
          value={form.combo2}
          clear={true}
          onChange={(value) => setFormField('combo2', value)}
          col={args.col}
        />
      </Gcol>
    );
  },
};
