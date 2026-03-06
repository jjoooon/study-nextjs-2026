import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { InputCombo } from '@common/InputCombo';

const meta: Meta<typeof InputCombo> = {
  title: 'Components/Common/InputCombo',
  component: InputCombo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `\
InputCombo는 input과 popover 리스트(datalist) 기능을 결합한 컴포넌트입니다.\
입력값에 따라 옵션이 필터링되고, 리스트에서 선택 시 input에 값이 입력됩니다.\
        `,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof InputCombo>;

const sampleOptions = [
  { value: 'LA25094848895', label: <div className="type--design-number"><div>LA25094848895</div><div>박은빈</div><div>72,300</div><div>설계중</div></div> },
  { value: 'LA24094848896', label: <div className="type--design-number"><div>LA24094848896</div><div>김민지</div><div>55,000</div><div>청약완료</div></div> },
  { value: 'LA25094848897', label: <div className="type--design-number"><div>LA25094848897</div><div>이도현</div><div>120,000</div><div>심사중</div></div> },
  { value: 'LA25094848898', label: <div className="type--design-number"><div>LA25094848898</div><div>최수영</div><div>88,800</div><div>설계중</div></div> },
  { value: 'LA25094848899', label: <div className="type--design-number"><div>LA25094848899</div><div>박보검</div><div>99,900</div><div>계약완료</div></div> },
  { value: 'LA25094848900', label: <div className="type--design-number"><div>LA25094848900</div><div>한지민</div><div>77,700</div><div>설계중</div></div> },
];

export const Default: Story = {
  render: (args) => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    return (
      <div style={{ width: 320 }}>
        <InputCombo
          options={sampleOptions}
          value={value1}
          onChange={setValue1}
          placeholder="과일을 입력하세요"
        />
        <InputCombo
          options={sampleOptions}
          value={value2}
          onChange={setValue2}
          placeholder="과일을 입력하세요"
        />
        <div style={{ marginTop: 16, fontSize: 14, color: '#888' }}>
          현재 값1: <b>{value1}</b> <br />
          현재 값2: <b>{value2}</b>
        </div>
      </div>
    );
  },
};
