import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { KeyValueList } from '@common/KeyValueList';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

type KeyValueListStoryProps = React.ComponentProps<typeof KeyValueList>;

const SAMPLE_DATA = [
  { key: '총 보험료', value: '125,000원' },
  { key: '납입주기', value: '월납' },
  { key: '계약상태', value: '정상' },
] as const;

const LONG_DATA = [
  { key: '총 보험료', value: '125,000원' },
  { key: '납입주기', value: '월납' },
  { key: '계약상태', value: '정상' },
  { key: '보장시작일', value: '2026-01-01' },
  { key: '보장종료일', value: '2056-12-31' },
  { key: '상품코드', value: 'HW-PROTECT-001' },
  { key: '담당자', value: '홍길동' },
] as const;

const meta: Meta<typeof KeyValueList> = {
  title: 'Components/Common/KeyValueList',
  component: KeyValueList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
KeyValueList는 key-value 형태의 정보를 가로 목록으로 표시하는 컴포넌트이다.
항목 사이 구분자(|)를 자동으로 넣어 요약 정보 영역에 적합하다.

---

<br>
#### **KeyValueList: Usage**
\`\`\`tsx
import { KeyValueList } from '@common/KeyValueList';

const data = [
  { key: '총 보험료', value: '125,000원' },
  { key: '납입주기', value: '월납' },
];

<KeyValueList data={data} className="w-full" />
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    // 1. Content
    data: {
      control: 'object',
      description: '표시할 key-value 데이터 배열',
      table: {
        category: 'Content',
        type: { summary: '{ key: string; value: string | number; className?: string }[]' },
      },
    },

    // 2. Appearance
    className: {
      control: 'text',
      description: '루트 ul에 적용할 클래스',
      table: { category: 'Appearance' },
    },
  },
  args: {
    data: [...SAMPLE_DATA],
    className: 'w-full',
  },
};

export default meta;
type Story = StoryObj<typeof KeyValueList>;

export const Default: Story = {
  render: (args: KeyValueListStoryProps) => {
    return (
      <StoryWrap>
        <StoryBox className="w-2xl">
          <KeyValueList {...args} />
        </StoryBox>
      </StoryWrap>
    );
  },
};
