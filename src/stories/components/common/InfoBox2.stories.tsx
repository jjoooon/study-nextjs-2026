import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import { Gcol, Grow } from '@atoms';
import { InfoBox } from '@/shared/components/common/InfoBox';

// ─── Types ────────────────────────────────────────────────────────────────────

type InfoBoxArgs = React.ComponentProps<typeof InfoBox> & {
  showTitle: boolean;
  showSubTitle: boolean;
  showHighlight: boolean;
  useChildren: boolean;
  childrenHTML: string;
};

// ─── Sample Data ──────────────────────────────────────────────────────────────

const INFO_ITEMS = [
  { text: '텍스트 목록' },
  { text: '텍스트 목록', highlight: true },
  { text: '텍스트 목록', highlight: true },
  { text: '텍스트 목록' },
  { text: '텍스트 목록' },
];

const WARNING_ITEMS = [
  { text: '텍스트 목록' },
  { text: '텍스트 목록', highlight: true },
  { text: '텍스트 목록', highlight: true },
  { text: '텍스트 목록' },
  { text: '텍스트 목록' },
];

const DETAIL_ITEMS = [
  { text: '텍스트 목록' },
  { text: '텍스트 목록' },
];

const PLAIN_ITEMS = [
  { text: '텍스트 목록' },
  { text: '텍스트 목록' },
  { text: '텍스트 목록' },
];

const SAMPLE_CHILDREN = (
  <div className="flex flex-col gap-1">
    <span className="text-[1.3rem] leading-[150%] text-[#414141]">커스텀 children 영역입니다.</span>
    <span className="text-[1.3rem] leading-[150%] text-[#414141]">직접 컴포넌트나 HTML을 넣을 수 있습니다.</span>
  </div>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<InfoBoxArgs> = {
  title: 'Components/Common/InfoBox2',
  component: InfoBox2,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>Overview</h2>
          <p>
            InfoBox 컴포넌트는 안내/주의/상세 정보를 시각적으로 강조하여 표시하는 UI 요소입니다.<br />
            variant로 info(파란색), warning(빨간색), detail(베이지)을 선택할 수 있으며,<br />
            info/warning은 아이템별 highlight로 개별 항목을 강조할 수 있습니다.<br />
            bg로 배경색 표시 여부(true/false)를 제어할 수 있습니다.<br />
            items 대신 children으로 커스텀 컴포넌트나 HTML을 직접 넣을 수도 있습니다.
          </p>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
import { InfoBox } from '@common/InfoBox';

{/* info */}
<InfoBox
  variant="info"
  bg={true}
  title="타이틀"
  subTitle="서브타이틀"
  items={[
    { text: '텍스트 목록' },
    { text: '텍스트 목록', highlight: true },
  ]}
/>

{/* warning */}
<InfoBox
  variant="warning"
  bg={true}
  title="타이틀"
  items={[
    { text: '텍스트 목록' },
    { text: '텍스트 목록', highlight: true },
  ]}
/>

{/* detail — 타이틀 없음, ※ 아이콘 */}
<InfoBox
  variant="detail"
  bg={true}
  items={[
    { text: '텍스트 목록' },
    { text: '텍스트 목록' },
  ]}
/>

{/* children — 커스텀 컴포넌트 직접 삽입 */}
<InfoBox variant="info" title="타이틀">
  <p>직접 넣은 내용</p>
  <a href="#">링크</a>
</InfoBox>

{/* bg off */}
<InfoBox variant="info" bg={false} title="타이틀" items={[{ text: '텍스트 목록' }]} />
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>variant</td><td>'info' | 'warning' | 'detail'</td><td>'info'</td><td>색상/아이콘 스타일</td></tr>
              <tr><td>bg</td><td>boolean</td><td>true</td><td>배경색 표시 여부</td></tr>
              <tr><td>title</td><td>string</td><td>-</td><td>타이틀 텍스트</td></tr>
              <tr><td>subTitle</td><td>string</td><td>-</td><td>서브타이틀 텍스트</td></tr>
              <tr><td>items</td><td>InfoListItem[]</td><td>-</td><td>목록 아이템 배열 (children 없을 때 렌더링)</td></tr>
              <tr><td>items[].text</td><td>string</td><td>-</td><td>아이템 텍스트</td></tr>
              <tr><td>items[].highlight</td><td>boolean</td><td>false</td><td>variant 색상으로 강조 (info/warning만)</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>-</td><td>커스텀 콘텐츠 (items보다 우선 렌더링)</td></tr>
              <tr><td>className</td><td>string</td><td>-</td><td>추가 클래스</td></tr>
            </tbody>
          </table>

          <h2>Info</h2>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16 w-160">
              <Grow gap={16} placement="ss">
                <InfoBox variant="info" title="타이틀" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single / 타이틀 있음</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="info" title="타이틀" subTitle="서브타이틀" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single / 타이틀 + 서브타이틀</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="info" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single / 타이틀 없음</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="info" title="타이틀" items={PLAIN_ITEMS} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>group / highlight 없음</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="info" title="타이틀" items={INFO_ITEMS} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>group / highlight 있음</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="info" title="타이틀">{SAMPLE_CHILDREN}</InfoBox>
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>children</span>
              </Grow>
            </Gcol>
          </Unstyled>

          <h2>Warning</h2>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16 w-160">
              <Grow gap={16} placement="ss">
                <InfoBox variant="warning" title="타이틀" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single / 타이틀 있음</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="warning" title="타이틀" subTitle="서브타이틀" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single / 타이틀 + 서브타이틀</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="warning" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single / 타이틀 없음</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="warning" title="타이틀" items={PLAIN_ITEMS} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>group / highlight 없음</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="warning" title="타이틀" items={WARNING_ITEMS} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>group / highlight 있음</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="warning" title="타이틀">{SAMPLE_CHILDREN}</InfoBox>
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>children</span>
              </Grow>
            </Gcol>
          </Unstyled>

          <h2>Detail</h2>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16 w-160">
              <Grow gap={16} placement="ss">
                <InfoBox variant="detail" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="detail" items={DETAIL_ITEMS} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>group</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="detail">{SAMPLE_CHILDREN}</InfoBox>
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>children</span>
              </Grow>
            </Gcol>
          </Unstyled>
        </>
      ),
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'warning', 'detail'],
      table: { category: '스타일 props' },
    },
    bg: {
      control: { type: 'boolean' },
      description: '배경색 사용 여부',
      table: { category: '스타일 props', defaultValue: { summary: 'true' } },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: '타이틀 사용 여부',
      table: { category: '설정 props', defaultValue: { summary: 'true' } },
    },
    title: {
      control: { type: 'text' },
      table: { category: '설정 props' },
      if: { arg: 'showTitle', truthy: true },
    },
    showSubTitle: {
      control: { type: 'boolean' },
      description: '서브타이틀 사용 여부',
      table: { category: '설정 props', defaultValue: { summary: 'false' } },
    },
    subTitle: {
      control: { type: 'text' },
      table: { category: '설정 props' },
      if: { arg: 'showSubTitle', truthy: true },
    },
    showHighlight: {
      control: { type: 'boolean' },
      description: 'items highlight 사용 여부 (info / warning만 적용)',
      table: { category: '설정 props', defaultValue: { summary: 'false' } },
      if: { arg: 'variant', neq: 'detail' },
    },
    useChildren: {
      control: { type: 'boolean' },
      description: 'children 사용 여부 (true 시 items 대신 HTML 직접 입력)',
      table: { category: '설정 props', defaultValue: { summary: 'false' } },
    },
    childrenHTML: {
      control: { type: 'text' },
      description: 'children HTML 직접 입력 (예: <p>텍스트</p><a href="#">링크</a>)',
      table: { category: '설정 props', defaultValue: { summary: '' } },
      if: { arg: 'useChildren', truthy: true },
    },
    items: {
      control: { type: 'object' },
      table: { category: '설정 props' },
      if: { arg: 'useChildren', truthy: false },
    },
    children: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'info',
    bg: true,
    showTitle: true,
    title: '타이틀',
    showSubTitle: true,
    subTitle: '서브타이틀',
    showHighlight: true,
    useChildren: false,
    childrenHTML: '<p>텍스트 목록</p>',
    items: INFO_ITEMS,
  },
  render: ({ showTitle, title, showSubTitle, subTitle, showHighlight, useChildren, childrenHTML, items, ...args }) => (
    <div className='p-4'>
      <InfoBox
        {...args}
        title={showTitle ? title : undefined}
        subTitle={showSubTitle ? subTitle : undefined}
        items={useChildren ? undefined : items?.map(item => ({
          ...item,
          highlight: showHighlight ? item.highlight : false,
        }))}
      >
        {useChildren ? (
          <div dangerouslySetInnerHTML={{ __html: childrenHTML }} />
        ) : undefined}
      </InfoBox>
    </div>
  ),
};

export default meta;
type Story = StoryObj<InfoBoxArgs>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const InfoSingleWithTitle: Story = {
  name: 'Info / single · 타이틀 있음',
  args: { variant: 'info', showTitle: true, title: '타이틀', showSubTitle: false, showHighlight: false, useChildren: false, items: [{ text: '텍스트 목록' }] },
};

export const InfoSingleWithSubTitle: Story = {
  name: 'Info / single · 타이틀 + 서브타이틀',
  args: { variant: 'info', showTitle: true, title: '타이틀', showSubTitle: true, subTitle: '서브타이틀', showHighlight: false, useChildren: false, items: [{ text: '텍스트 목록' }] },
};

export const InfoSingleNoTitle: Story = {
  name: 'Info / single · 타이틀 없음',
  args: { variant: 'info', showTitle: false, showSubTitle: false, showHighlight: false, useChildren: false, items: [{ text: '텍스트 목록' }] },
};

export const InfoGroupNoHighlight: Story = {
  name: 'Info / group · highlight 없음',
  args: { variant: 'info', showTitle: true, title: '타이틀', showSubTitle: false, showHighlight: false, useChildren: false, items: PLAIN_ITEMS },
};

export const InfoGroupWithHighlight: Story = {
  name: 'Info / group · highlight 있음',
  args: { variant: 'info', showTitle: true, title: '타이틀', showSubTitle: false, showHighlight: true, useChildren: false, items: INFO_ITEMS },
};

export const InfoWithChildren: Story = {
  name: 'Info / children',
  args: { variant: 'info', showTitle: true, title: '타이틀', showSubTitle: false, showHighlight: false, useChildren: true, childrenHTML: '<p>텍스트 목록</p>' },
};

export const WarningSingleWithTitle: Story = {
  name: 'Warning / single · 타이틀 있음',
  args: { variant: 'warning', showTitle: true, title: '타이틀', showSubTitle: false, showHighlight: false, useChildren: false, items: [{ text: '텍스트 목록' }] },
};

export const WarningSingleWithSubTitle: Story = {
  name: 'Warning / single · 타이틀 + 서브타이틀',
  args: { variant: 'warning', showTitle: true, title: '타이틀', showSubTitle: true, subTitle: '서브타이틀', showHighlight: false, useChildren: false, items: [{ text: '텍스트 목록' }] },
};

export const WarningSingleNoTitle: Story = {
  name: 'Warning / single · 타이틀 없음',
  args: { variant: 'warning', showTitle: false, showSubTitle: false, showHighlight: false, useChildren: false, items: [{ text: '텍스트 목록' }] },
};

export const WarningGroupNoHighlight: Story = {
  name: 'Warning / group · highlight 없음',
  args: { variant: 'warning', showTitle: true, title: '타이틀', showSubTitle: false, showHighlight: false, useChildren: false, items: PLAIN_ITEMS },
};

export const WarningGroupWithHighlight: Story = {
  name: 'Warning / group · highlight 있음',
  args: { variant: 'warning', showTitle: true, title: '타이틀', showSubTitle: false, showHighlight: true, useChildren: false, items: WARNING_ITEMS },
};

export const WarningWithChildren: Story = {
  name: 'Warning / children',
  args: { variant: 'warning', showTitle: true, title: '타이틀', showSubTitle: false, showHighlight: false, useChildren: true, childrenHTML: '<p>텍스트 목록</p>' },
};

export const DetailSingle: Story = {
  name: 'Detail / single',
  args: { variant: 'detail', showTitle: false, showSubTitle: false, showHighlight: false, useChildren: false, items: [{ text: '텍스트 목록' }] },
};

export const DetailGroup: Story = {
  name: 'Detail / group',
  args: { variant: 'detail', showTitle: false, showSubTitle: false, showHighlight: false, useChildren: false, items: DETAIL_ITEMS },
};

export const DetailWithChildren: Story = {
  name: 'Detail / children',
  args: { variant: 'detail', showTitle: false, showSubTitle: false, showHighlight: false, useChildren: true, childrenHTML: '<p>텍스트 목록</p>' },
};