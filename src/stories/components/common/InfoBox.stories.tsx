import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import { Gcol, Grow } from '@atoms';
import { InfoBox } from '@/shared/components/common/InfoBox';

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

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof InfoBox> = {
  title: 'Components/Common/InfoBox',
  component: InfoBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>Overview</h2>
          <p>
            InfoBox 컴포넌트는 안내/주의/상세 정보를 시각적으로 강조하여 표시하는 UI 요소입니다.<br />
            variant로 info(파란색), warning(빨간색), detail(베이지)을 선택할 수 있으며,<br />
            info/warning은 아이템별 highlight로 개별 항목을 강조할 수 있습니다.
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
  title="타이틀"
  items={[
    { text: '텍스트 목록' },
    { text: '텍스트 목록', highlight: true },
  ]}
/>

{/* warning */}
<InfoBox
  variant="warning"
  title="타이틀"
  items={[
    { text: '텍스트 목록' },
    { text: '텍스트 목록', highlight: true },
  ]}
/>

{/* detail — 타이틀 없음, ※ 아이콘 */}
<InfoBox
  variant="detail"
  items={[
    { text: '텍스트 목록' },
    { text: '텍스트 목록' },
  ]}
/>
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
              <tr><td>title</td><td>string</td><td>-</td><td>타이틀 텍스트 (detail은 미사용)</td></tr>
              <tr><td>items</td><td>InfoListItem[]</td><td>-</td><td>목록 아이템 배열</td></tr>
              <tr><td>items[].text</td><td>string</td><td>-</td><td>아이템 텍스트</td></tr>
              <tr><td>items[].highlight</td><td>boolean</td><td>false</td><td>variant 색상으로 강조 (info/warning만)</td></tr>
              <tr><td>className</td><td>string</td><td>-</td><td>추가 클래스</td></tr>
            </tbody>
          </table>

          <h2>Info</h2>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16 w-[40rem]">
              <Grow gap={16} placement="ss">
                <InfoBox variant="info" title="타이틀" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single / 타이틀 있음</span>
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
            </Gcol>
          </Unstyled>

          <h2>Warning</h2>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16 w-[40rem]">
              <Grow gap={16} placement="ss">
                <InfoBox variant="warning" title="타이틀" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single / 타이틀 있음</span>
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
            </Gcol>
          </Unstyled>

          <h2>Detail</h2>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16 w-[40rem]">
              <Grow gap={16} placement="ss">
                <InfoBox variant="detail" items={[{ text: '텍스트 목록' }]} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>single</span>
              </Grow>
              <Grow gap={16} placement="ss">
                <InfoBox variant="detail" items={DETAIL_ITEMS} />
                <span style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>group</span>
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
    title: {
      control: { type: 'text' },
      table: { category: '설정 props' },
    },
    items: {
      control: { type: 'object' },
      table: { category: '설정 props' },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'info',
    title: '타이틀',
    items: INFO_ITEMS,
  },
};

export default meta;
type Story = StoryObj<typeof InfoBox>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const InfoSingleWithTitle: Story = {
  name: 'Info / single · 타이틀 있음',
  args: { variant: 'info', title: '타이틀', items: [{ text: '텍스트 목록' }] },
};

export const InfoSingleNoTitle: Story = {
  name: 'Info / single · 타이틀 없음',
  args: { variant: 'info', title: undefined, items: [{ text: '텍스트 목록' }] },
};

export const InfoGroupNoHighlight: Story = {
  name: 'Info / group · highlight 없음',
  args: { variant: 'info', title: '타이틀', items: PLAIN_ITEMS },
};

export const InfoGroupWithHighlight: Story = {
  name: 'Info / group · highlight 있음',
  args: { variant: 'info', title: '타이틀', items: INFO_ITEMS },
};

export const WarningSingleWithTitle: Story = {
  name: 'Warning / single · 타이틀 있음',
  args: { variant: 'warning', title: '타이틀', items: [{ text: '텍스트 목록' }] },
};

export const WarningSingleNoTitle: Story = {
  name: 'Warning / single · 타이틀 없음',
  args: { variant: 'warning', title: undefined, items: [{ text: '텍스트 목록' }] },
};

export const WarningGroupNoHighlight: Story = {
  name: 'Warning / group · highlight 없음',
  args: { variant: 'warning', title: '타이틀', items: PLAIN_ITEMS },
};

export const WarningGroupWithHighlight: Story = {
  name: 'Warning / group · highlight 있음',
  args: { variant: 'warning', title: '타이틀', items: WARNING_ITEMS },
};

export const DetailSingle: Story = {
  name: 'Detail / single',
  args: { variant: 'detail', title: undefined, items: [{ text: '텍스트 목록' }] },
};

export const DetailGroup: Story = {
  name: 'Detail / group',
  args: { variant: 'detail', title: undefined, items: DETAIL_ITEMS },
};