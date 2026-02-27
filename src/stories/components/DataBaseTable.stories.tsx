import type { Meta, StoryObj } from '@storybook/react';
import DataBaseTable from '@/shared/components/common/DataBaseTable';
import { Gcol, Typo } from '@/shared/components/common';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';

type DataBaseTableStoryProps = React.ComponentProps<typeof DataBaseTable>;

const SAMPLE_ROWS: DataBaseTableStoryProps['tbodyData'] = [
  {
    target: '계약자',
    underwritingLimit: '일반심사',
    violationContent: '직업 고지 누락',
    violationType: '필수확인',
  },
  {
    target: '계약자',
    underwritingLimit: '일반심사',
    violationContent: '최근 병력 고지 누락',
    violationType: '필수확인',
  },
  {
    target: '피보험자',
    underwritingLimit: '특별심사',
    violationContent: '가입 한도 초과',
    violationType: '한도초과',
  },
  {
    target: '피보험자',
    underwritingLimit: '특별심사',
    violationContent: '기왕증 확인 필요',
    violationType: '추가서류',
  },
  {
    target: '수익자',
    underwritingLimit: '일반심사',
    violationContent: '관계 확인 필요',
    violationType: '확인요청',
  },
];

const DENSE_ROWS: DataBaseTableStoryProps['tbodyData'] = [
  ...SAMPLE_ROWS,
  {
    target: '수익자',
    underwritingLimit: '일반심사',
    violationContent: '연락처 정보 불일치',
    violationType: '확인요청',
  },
  {
    target: '수익자',
    underwritingLimit: '일반심사',
    violationContent: '계약서 서명 누락',
    violationType: '필수확인',
  },
  {
    target: '계약자',
    underwritingLimit: '일반심사',
    violationContent: '신분증 사본 만료',
    violationType: '추가서류',
  },
];

const meta: Meta<DataBaseTableStoryProps> = {
  title: 'Components/Common/DataBaseTable',
  component: DataBaseTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DataBaseTable은 대상/인수제한/위배내용/위배유형 정보를 표 형태로 보여주는 컴포넌트이다.
동일한 target, underwritingLimit 값은 rowSpan으로 병합되어 가독성을 높인다.
옵션으로 체크박스 컬럼(showCheckbox)을 활성화할 수 있다.

---

<br>
#### **기본 DataBaseTable: Usage**
\`\`\`tsx
import DataBaseTable from '@/shared/components/common/DataBaseTable';

<DataBaseTable
  caption="지침확인결과"
  showCheckbox={true}
  tbodyData={[
    {
      target: '계약자',
      underwritingLimit: '일반심사',
      violationContent: '직업 고지 누락',
      violationType: '필수확인',
    },
  ]}
/>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    caption: {
      control: 'text',
      description: '테이블 캡션 텍스트',
      table: { category: 'Content' },
    },
    tbodyData: {
      control: 'object',
      description: '테이블 본문 데이터',
      table: {
        category: 'Content',
        type: {
          summary:
            '{ target: string; underwritingLimit: string; violationContent: string; violationType: string }[]',
        },
      },
    },
    stickyHeader: {
      control: 'boolean',
      description: '헤더 sticky 동작 사용 여부',
      table: { category: 'Behavior' },
    },
    showCheckbox: {
      control: 'boolean',
      description: '체크박스 선택 컬럼 표시 여부',
      table: { category: 'Behavior' },
    },
    checkedRowIndexes: { table: { disable: true } },
    onCheckedRowIndexesChange: { table: { disable: true } },
  },
  args: {
    caption: '지침확인결과',
    tbodyData: SAMPLE_ROWS,
    stickyHeader: true,
    showCheckbox: false,
  },
};

export default meta;
type Story = StoryObj<DataBaseTableStoryProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryWrap>
        <StoryBox className="w-344 h-128">
            <Gcol className="gap-2 h-full w-full">
                <DataBaseTable {...args} />
            </Gcol>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const DenseRows: Story = {
  args: {
    tbodyData: DENSE_ROWS,
  },
  render: (args) => {
    return (
      <StoryWrap>
        <StoryBox className="w-344 h-128">
          <Gcol className="gap-2 h-full w-full">
            <Typo variant="body-sm" color="gray">
              rowSpan 병합과 스크롤 동작 확인용 데이터 케이스
            </Typo>
            <div className="flex-1 min-h-0">
              <DataBaseTable {...args} />
            </div>
          </Gcol>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const WithCheckbox: Story = {
  args: {
    showCheckbox: true,
  },
  render: (args) => {
    return (
      <StoryWrap>
        <StoryBox className="w-344 h-128">
          <Gcol className="gap-2 h-full w-full">
            <Typo variant="body-sm" color="gray">
              체크박스 컬럼 포함 케이스 (개별/전체 선택)
            </Typo>
            <div className="flex-1 min-h-0">
              <DataBaseTable {...args} />
            </div>
          </Gcol>
        </StoryBox>
      </StoryWrap>
    );
  },
};
