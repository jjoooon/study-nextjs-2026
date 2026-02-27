import type { Meta, StoryObj } from '@storybook/react';
import { Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks';
import * as React from 'react';
import { FormCell, FormRow, FormTable, FormTableLine, Gcol, Grow, Typo } from '@/shared/components/common';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';

type FormTableLineStoryProps = React.ComponentProps<typeof FormTableLine>;

const meta: Meta<FormTableLineStoryProps> = {
  title: 'Components/Common/FormTableLine',
  component: FormTableLine,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Primary />
          <Stories includePrimary={false} />
        </>
      ),
      description: {
        component: `
FormTableLine은 폼 테이블 영역의 상단 구분선과 레이아웃 컨테이너 역할을 하는 컴포넌트이다.
일반적으로 FormTable과 함께 사용하며, 내부에 FormRow/FormCell 구조를 배치해 폼 섹션을 구성한다.

- 단독 컴포넌트보다는 **FormTable 문맥**에서 사용하는 것이 기본 패턴이다.
- 구분선 스타일은 컴포넌트 내부에서 일관되게 관리된다.

---

<br>
#### **기본 FormTableLine: Usage**
\`\`\`tsx
import { FormTableLine, FormTable, FormCell, FormRow } from '@/shared/components/common';

<FormTableLine>
  <FormTable caption="계약자 관련 정보 입력하세요." cols={['w-[15%]', 'w-[35%]', 'w-[15%]', 'w-[35%]']}>
    <FormRow>
      <FormCell title="계약자">...</FormCell>
      <FormCell title="개인정보취득경로">...</FormCell>
    </FormRow>
  </FormTable>
</FormTableLine>
\`\`\`

<br>
#### **colSpan/rowSpan 케이스: Usage**
\`\`\`tsx
import { FormTableLine, FormTable, FormCell, FormRow } from '@/shared/components/common';

<FormTableLine>
  <FormTable caption="행/열 병합 케이스" cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}>
    <FormRow>
      <FormCell title="colSpan 케이스" colSpan={3}>...</FormCell>
    </FormRow>
    <FormRow>
      <FormCell title="rowSpan 케이스" titleRowSpan={2} rowSpan={2}>...</FormCell>
      <FormCell title="우측 1행">...</FormCell>
    </FormRow>
    <FormRow>
      <FormCell title="우측 2행">...</FormCell>
    </FormRow>
  </FormTable>
</FormTableLine>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
  },
  args: {},
};

export default meta;
type Story = StoryObj<FormTableLineStoryProps>;

export const Default: Story = {
  render: () => {
    return (
      <StoryWrap>
        <StoryBox className="w-full">
          <Gcol className='gap-[1rem] w-full'>
            <FormTableLine>
              <FormTable
                caption="FormRow 행 구성 케이스"
                cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}
              >
                <FormRow>
                  <FormCell title={<b>기본</b>}>
                    TEXT
                  </FormCell>
                  <FormCell title="개인정보취득경로">
                    TEXT
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="colSpan 케이스" colSpan={3}>
                    전체 너비 확장 행
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="rowSpan 케이스" titleRowSpan={2} rowSpan={2}>
                    2행 병합
                  </FormCell>
                  <FormCell title="우측 1행">값 1</FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="우측 2행">값 2</FormCell>
                </FormRow>
              </FormTable>
            </FormTableLine>
          </Gcol>           
          <Gcol className='gap-[1rem] w-full'>
            <FormTable
                caption="계약자 관련 정보 입력하세요."
                cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}
              >
                <FormRow>
                  <FormCell title={<b>계약자</b>}>
                    TEXT
                  </FormCell>
                  <FormCell title="개인정보취득경로">
                    TEXT
                  </FormCell>
                </FormRow>

                <FormRow>
                  <FormCell title="발송지" colSpan={3}>
                    TEXT
                  </FormCell>
                </FormRow>
            </FormTable>
          </Gcol>
        </StoryBox>
      </StoryWrap>
    );
  },
};


export const FormTableBasic: Story = {
  render: () => {
    return (
      <StoryWrap>
        <StoryBox className="w-full">
          <Gcol className='gap-[1rem] w-full'>
            <FormTableLine >
              <FormTable
                caption="계약자 관련 정보 입력하세요."
                cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}
              >
                <FormRow>
                  <FormCell title={<b>계약자</b>} className="pr-3!">
                    TEXT
                  </FormCell>
                  <FormCell title="개인정보취득경로" className="pr-3!">
                    TEXT
                  </FormCell>
                </FormRow>

                <FormRow>
                  <FormCell title="발송지" className="pr-3!">
                    TEXT
                  </FormCell>
                  <FormCell title="제목" className="pr-3!">
                    TEXT
                  </FormCell>
                </FormRow>
              </FormTable>
            </FormTableLine>
          </Gcol>
        </StoryBox>
      </StoryWrap>
    );
  }    
}

export const FormTableNoLineCases: Story = {
  render: () => {
    return (
      <StoryWrap>
        <StoryBox className="w-full">
          <FormTable
              caption="계약자 관련 정보 입력하세요."
              cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}
            >
              <FormRow>
                <FormCell title={<b>계약자</b>} className="pr-3!">
                  TEXT
                </FormCell>
                <FormCell title="개인정보취득경로" className="pr-3!">
                  TEXT
                </FormCell>
              </FormRow>

              <FormRow>
                <FormCell title="발송지" colSpan={3}>
                  TEXT
                </FormCell>
              </FormRow>
            </FormTable>
        </StoryBox>
      </StoryWrap>
    );
  }
}


export const FormTableRowCol: Story = {
  render: () => {
    return (
      <StoryWrap>
        <StoryBox className="w-full">
          <FormTableLine>
            <FormTable
              caption="FormRow 행 구성 케이스"
              cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}
            >
              <FormRow>
                <FormCell title="colSpan 케이스" colSpan={3}>
                  전체 너비 확장 행
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title="rowSpan 케이스" titleRowSpan={2} rowSpan={2}>
                  2행 병합
                </FormCell>
                <FormCell title="우측 1행">값 1</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title="우측 2행">값 2</FormCell>
              </FormRow>
            </FormTable>
          </FormTableLine>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const FormTableSetting: Story = {
  render: () => {
    return (
      <StoryWrap>
        <StoryBox className="w-full">
          <FormTableLine>
            <FormTable
              variant="setting"
              caption="setting variant 케이스"
              cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}
            >
              <FormRow>
                <FormCell title={<b>계약자</b>}>TEXT</FormCell>
                <FormCell title="개인정보취득경로">TEXT</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title="발송지" colSpan={3}>
                  TEXT
                </FormCell>
              </FormRow>
            </FormTable>
          </FormTableLine>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const FormTableNone: Story = {
  render: () => {
    return (
      <StoryWrap>
        <StoryBox className="w-full">
          <FormTableLine>
            <FormTable
              variant="none"
              caption="none variant 케이스"
              cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}
            >
              <FormRow>
                <FormCell title={<b>계약자</b>}>TEXT</FormCell>
                <FormCell title="제목">TEXT</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title="발송지" colSpan={3}>
                  TEXT
                </FormCell>
              </FormRow>
            </FormTable>
          </FormTableLine>
        </StoryBox>
      </StoryWrap>
    );
  },
};
