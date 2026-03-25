import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { InputCombo } from '@common/InputCombo';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import { useFormFields } from '@hooks/useFormFields';

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
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                InputCombo는 Input과 Popover 리스트 기능을 결합한 컴포넌트입니다.
                입력값에 따라 옵션을 필터링하고, 리스트 항목 선택 시 입력값을 변경합니다.
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
                <tr><td>value</td><td>string</td><td>현재 입력값</td></tr>
                <tr><td>onChange</td><td>(value: string) =&gt; void</td><td>입력값 변경 핸들러</td></tr>
                <tr><td>options</td><td>Array&lt;string | {`{ value, label }`}&gt;</td><td>자동완성 목록</td></tr>
                <tr><td>popoverPlacement</td><td>'bottom' | 'top'</td><td>목록 표시 위치</td></tr>
                <tr><td>clear</td><td>boolean</td><td>입력값 클리어 버튼 표시</td></tr>
                <tr><td>placeholder</td><td>string</td><td>플레이스홀더</td></tr>
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
    popoverPlacement: {
      control: 'select',
      options: ['bottom', 'top'],
      description: '목록 표시 위치',
      table: { category: 'InputCombo' },
    },
    clear: {
      control: 'boolean',
      description: '클리어 버튼 표시',
      table: { category: 'InputCombo' },
    },
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
      control: 'select',
      options: ['default', 'ghost'],
      table: { category: 'Input' },
    },
    size: {
      control: 'select',
      options: ['md', 'sm'],
      table: { category: 'Input' },
    },
    width: {
      control: 'select',
      options: ['full', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: { category: 'Input' },
    },
    className: { table: { disable: true } },
    forceFocused: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
  args: {
    popoverPlacement: 'bottom',
    clear: true,
    placeholder: '증권번호를 입력하세요',
    variant: 'default',
    size: 'md',
    width: 'full',
    readOnly: false,
    required: false,
  },
};
export default meta;
type Story = StoryObj<typeof InputCombo>;

const sampleOptions = [
  { value: 'LA25094848895', label: <div className="type--design-number"><div>LA25094848895</div><div>박은빈</div><div>72,300</div><div>설계중</div></div> },
  { value: 'LA24094848896', label: <div className="type--design-number"><div>LA24094848896</div><div>김민지</div><div>55,000</div><div>청약완료</div></div> },
  { value: 'LA25094848897', label: <div className="type--design-number"><div>LA25094848897</div><div>이도현</div><div>120,000</div><div>심사중</div></div> },
  // { value: 'LA25094848898', label: <div className="type--design-number"><div>LA25094848898</div><div>최수영</div><div>88,800</div><div>설계중</div></div> },
  // { value: 'LA25094848899', label: <div className="type--design-number"><div>LA25094848899</div><div>박보검</div><div>99,900</div><div>계약완료</div></div> },
  // { value: 'LA25094848900', label: <div className="type--design-number"><div>LA25094848900</div><div>한지민</div><div>77,700</div><div>설계중</div></div> },
];

const sampleOptions2 = [
  { value: '한기성', label: <div className="type--design-number">한기성</div> },
  { value: '한기성', label: <div className="type--design-number">한기성</div> },
  { value: '한기성', label: <div className="type--design-number">한기성</div> },
  { value: '한기성', label: <div className="type--design-number">한기성</div> },
  { value: '한기성', label: <div className="type--design-number">한기성</div> },
  { value: '한기성', label: <div className="type--design-number">한기성</div> },
];

export const Default: Story = {
  render: (args) => {
    const [form, setFormField] = useFormFields({ combo1: '', combo2: '' });

    return (
      <div style={{ width: 360 }}>
        <InputCombo
          {...args}
          options={sampleOptions}
          value={form.combo1}
          onChange={(value) => setFormField('combo1', value)}
        />
         <InputCombo
          {...args}
          options={sampleOptions}
          value={form.combo2}
          onChange={(value) => setFormField('combo2', value)}
        />
      </div>
    );
  },
};
