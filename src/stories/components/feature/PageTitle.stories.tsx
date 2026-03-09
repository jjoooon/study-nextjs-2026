import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle, PageTitleProduct } from '@/shared/components/features/PageTitle';
import { Title, Subtitle, Description, Primary, Controls, Canvas, Source, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof PageTitleProduct> = {
  title: 'components/feature/PageTitle',
  component: PageTitleProduct,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>Overview</h2>
          <div>
            <p>
              PageTitle, PageTitleProduct 컴포넌트는 보험/상품 설계 화면의 타이틀 및 주요 정보 영역을 담당합니다.<br />
              <b>PageTitleProduct</b>는 상품 설계에 특화된 확장형, <b>PageTitle</b>은 기본형입니다.
            </p>
          </div>
          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>아래와 같이 다양한 형태로 사용할 수 있습니다.</p>
          <ul>
            <li>상품 설계(확장형): PageTitleProduct</li>
            <li>일반 타이틀(기본형): PageTitle</li>
            <li>props 조합에 따라 다양한 정보 표현</li>
          </ul>
          <Markdown>
            {`
\`\`\`tsx
import { PageTitle, PageTitleProduct } from '@/shared/components/features/PageTitle';

<PageTitleProduct data={...} />
<PageTitle data={...} />
\`\`\`
            `}
          </Markdown>

          <h2>Props</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입/옵션</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>title</td><td>string</td><td>타이틀 텍스트</td></tr>
              <tr><td>simpleMode</td><td>boolean</td><td>간소화 모드</td></tr>
              <tr><td>options</td><td>string[]</td><td>옵션 목록</td></tr>
              <tr><td>planNumber</td><td>string[]</td><td>설계번호</td></tr>
              <tr><td>contractHolder</td><td>string</td><td>계약자명</td></tr>
              <tr><td>planNumberList</td><td>object[]</td><td>설계번호 상세 리스트</td></tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageTitleProduct>;

const Template = (args: any) => (
  <div style={args.style}>
    <PageTitleProduct {...args} />
    <div style={{ margin: '32px 0' }} />
    <PageTitle data={args.data} />
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    data: {
      simpleMode: true,
      title: '한화 시그니처 여성 건강보험 3.0 2504',
      options: ['납입면제 강화형', '기본형'],
      planNumber: ['LA20234472050000', '2'],
      contractHolder: '6012345 박하늘별님달',
      planNumberList: [
        { label: 'LA20234472050000', value: 'LA20234472050000', name: '김은빈', amount: '23,000', state: '설계중' },
        { label: 'LA23234472050001', value: 'LA23234472050001', name: '박하늘', amount: '45,500', state: '계약완료' },
        { label: 'LA20234472050002', value: 'LA20234472050002', name: '이도현', amount: '12,300', state: '심사중' },
        { label: 'LA20234472050003', value: 'LA20234472050003', name: '최수영', amount: '99,900', state: '청약완료' },
        { label: 'LA20234472050004', value: 'LA20234472050004', name: '한지민', amount: '77,700', state: '설계중' },
      ],
    },
  },
};
