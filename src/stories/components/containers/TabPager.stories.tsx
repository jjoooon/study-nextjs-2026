import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// useState는 아래에서 React.useState로 사용하므로 별도 import 필요 없음
import { Gcol, Grow } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { TabPager } from '@common/TabPager';
import { ErrorMsg } from '@common/ErrorMsg';
// import { Tabs, TabsList, TabsTrigger, TabsContent, TabsPanel, TabsLine } from '@uiux/Tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@uiux/HoverCard';
import { Button } from '@uiux/Button';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

import { useTabs } from '@/shared/hooks/useTabs';

const DATA_TABS_3 = [
 {
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    error: true,
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '4',
    gender: '남',
    value: 'tab4',
    error: false,
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '5',
    gender: '여',
    error: false,
    value: 'tab5',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '6',
    gender: '여',
    error: false,
    value: 'tab6',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '7',
    gender: '남',
    error: false,
    value: 'tab7',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '8',
    gender: '남',
    error: false,
    value: 'tab8',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '9',
    gender: '여',
    error: false,
    value: 'tab9',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '10',
    gender: '남',
    error: false,
    value: 'tab10',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '11',
    gender: '여',
    error: true,
    value: 'tab11',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '12',
    gender: '남',
    error: false,
    value: 'tab12',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '13',
    gender: '남',
    error: false,
    value: 'tab13',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '14',
    gender: '여',
    error: false,
    value: 'tab14',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '15',
    gender: '남',
    error: false,
    value: 'tab15',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
];
const DATA_TABS_4 = [
 {
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
];

const meta: Meta<typeof TabPager> = {
  title: 'Components/Containers/Tabs',
  component: TabPager,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                <b>TabPager</b>는 많은 탭을 한 화면에 효율적으로 보여주기 위해 페이징, 드롭다운, 네비게이션, 에러 메시지 등 다양한 기능을 제공하는 고급 탭 컴포넌트입니다.<br />
                <code>variant</code>, <code>hasTableBelow</code>, <code>removable</code>, <code>visibleCount</code>, <code>error</code>, <code>errorMsg</code>, <code>getValue</code>, <code>renderTab</code>, <code>renderDropdownItem</code> 등 다양한 props를 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>TabPager의 주요 props 예시입니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { TabPager } from '@common/TabPager';
import { useTabs } from '@/shared/hooks/useTabs';

const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

<TabPager
  data={tabs}
  active={active}
  setActive={setActive}
  removable={false}
  onRemove={handleRemove}
  visibleCount={4}
  variant="default"
  hasTableBelow={true}
  error={false}
  errorMsg="에러 메시지 예시"
  getValue={tab => String(tab.value)}
  renderTab={tab => <span>{tab.label}</span>}
  renderDropdownItem={false}
>
  탭 컨텐츠
</TabPager>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>TabPager의 주요 prop과 타입, 설명입니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>variant</td><td>'default' | 'sub' | 'outlined' | 'box'</td><td>탭 스타일</td></tr>
                <tr><td>hasTableBelow</td><td>boolean</td><td>default variant에서 하단에 테이블이 있는 경우 라인 두께를 0.2rem로 사용</td></tr>
                <tr><td>removable</td><td>boolean</td><td>탭 제거 가능 여부</td></tr>
                <tr><td>active</td><td>string</td><td>현재 활성 탭 값</td></tr>
                <tr><td>setActive</td><td>(value: string) =&gt; void</td><td>활성 탭 변경 핸들러</td></tr>
                <tr><td>onRemove</td><td>(value: string) =&gt; void</td><td>탭 삭제 핸들러</td></tr>
                <tr><td>visibleCount</td><td>number</td><td>한 번에 보여줄 탭 개수</td></tr>
                <tr><td>error</td><td>boolean</td><td>에러 상태 표시</td></tr>
                <tr><td>errorMsg</td><td>string</td><td>에러 메시지</td></tr>
                <tr><td>getValue</td><td>(tab: T) =&gt; string</td><td>탭의 고유값 추출 함수</td></tr>
                <tr><td>renderTab</td><td>(tab: T) =&gt; ReactNode</td><td>탭 렌더 함수</td></tr>
                <tr><td>renderDropdownItem</td><td>false | (args) =&gt; ReactNode</td><td>드롭다운 아이템 렌더 함수 또는 비활성화</td></tr>
                <tr><td>renderButtons</td><td>ReactNode</td><td>오른쪽 버튼 영역</td></tr>
              </tbody>
            </table>
          </>
        );
      },
      argTypes: { expanded: false },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'box'],
      description: '탭 버튼 스타일',
      table: { category: '스타일 props' },
    },
    hasTableBelow: {
      control: 'boolean',
      description: 'default variant에서 하단 테이블 유무에 따른 라인 두께 제어',
      table: { category: '스타일 props' },
    },
    removable: {
      control: 'boolean',
      description: '탭 제거 가능 여부',
      table: { category: '설정 props' },
    },
    visibleCount: {
      control: 'number',
      description: '한 번에 보여줄 탭 개수',
      table: { category: '설정 props' },
    },
    error: {
      control: 'boolean',
      description: '에러 상태 표시',
      table: { category: '에러 props' },
    },
    errorMsg: {
      control: 'text',
      table: { category: '에러 props' },
    },
    getValue: {
      table: { disable: true },
    },
    setActive: {
      table: { disable: true },
    },
    renderTab: {
      table: { disable: true },
    },
    renderButtons: {
      table: { disable: true },
    },
    onRemove: {
      table: { disable: true },
    },
    renderDropdownItem: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
    data: {
      table: { disable: true },
    },
    active: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    hasTableBelow: false,
    removable: false,
    error: false,
    visibleCount: 4,
  },
};

export default meta;
type Story = StoryObj<typeof TabPager>;

export const Default: Story = {
  render: (args) => {
    const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS_3);
    const { tabs: tabs2, active: active2, setActive: setActive2, handleRemove: handleRemove2 } = useTabs<typeof DATA_TABS_4[0]>(DATA_TABS_4);
    
    return (
      <Gcol gap={4} className="w-full p-8">
        <TabPager
          data={tabs2}
          active={active2}
          setActive={setActive2}
          removable={args.removable}
          onRemove={handleRemove2}
          visibleCount={args.visibleCount}
          variant={args.variant}
          hasTableBelow={args.hasTableBelow}
          error={args.error}
          getValue={tab => String(tab.value)}
          renderButtons={false}
          renderTab={tab => (
            <span className="flex items-center">
              <span className="max-w-20 truncate block">{tab.name}</span>
              <span className="block">{`${tab.age}세(${tab.gender})`}</span>
            </span>
          )}
          renderDropdownItem={false}
        >
          내용{active2}
        </TabPager>

        <TabPager
          data={tabs}
          active={active}
          setActive={setActive}
          removable={args.removable}
          onRemove={handleRemove}
          visibleCount={args.visibleCount}
          variant={args.variant}
          hasTableBelow={args.hasTableBelow}
          error={args.error}
          errorMsg="입력하세요."
          getValue={tab => String(tab.value)}
          renderButtons={
            <Grow className="gap-2.5">
              <Button variant="outlined" color="gray" size="md">버튼1</Button>
              <Button variant="outlined" color="gray" size="md">버튼2</Button>
            </Grow>
          }
          renderTab={tab => (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="flex items-center">
                  <span className="max-w-20 truncate block">{tab.name}</span>
                  <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                </span>
              </HoverCardTrigger>
              <HoverCardContent>
                <BulletList>
                  {tab.info.map((info, index) => (
                    <BulletListItem key={index} type="dot">{info}</BulletListItem>
                  ))}
                </BulletList>
              </HoverCardContent>
            </HoverCard>
          )}
          renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (  
            <Button
              variant="text"
              key={String(tab.value)}
              onClick={() => {
                setActive(String(tab.value));
                const idx = data.findIndex((t) => String(t.value) === String(tab.value));
                if (idx !== -1) {
                  const page = Math.floor(idx / visibleCount);
                  setVisibleStart(page * visibleCount);
                }
              }}
            >
              <span className="flex items-center gap-2">
                <span className="block">{tab.name}</span>
                <span className="block">{`${tab.age}세(${tab.gender})`}</span>
              </span>
            </Button>
            )}
          >
          내용{active}
        </TabPager>
      </Gcol>
    );
  },
};
