import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// useState는 아래에서 React.useState로 사용하므로 별도 import 필요 없음
import { Gcol, Grow } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { TabHead } from '@common/TabHead';
import { ErrorMsg } from '@common/ErrorMsg';
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsPanel, TabsLine } from '@uiux/Tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@uiux/HoverCard';
import { Button } from '@uiux/Button';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

import { useTabs } from '@/shared/hooks/useTabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Containers/Tabs',
  component: Tabs,
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
                Tabs 컴포넌트는 상호 배타적인 여러 콘텐츠 영역을 하나의 화면에서 전환해 보여주는 UI입니다.
                <br />
                기본 탭(`Tabs`)과 페이징 탭(`TabHead`) 두 가지 패턴을 지원하며, `default`/`sub`/`box` 스타일을 제공합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>기본 탭과 페이징 탭은 아래와 같이 사용할 수 있습니다.</p>

            <h3>기본 탭</h3>
            <Markdown>
              {`
\`\`\`tsx
import { Tabs, TabsContent, TabsList, TabsLine, TabsTrigger } from '@uiux/Tabs';
import { useTabs } from '@/shared/hooks/useTabs';

const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS_1);

<Tabs
  variant={'default'}
  removable={false}
  onRemove={handleRemove}
  value={active}
  onValueChange={setActive}
>
  <TabsLine>
    <TabsList>
      {tabs.map((tab) => (
        <TabsTrigger value={tab.value} key={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  </TabsLine>
  {tabs.map((tab) => (
    <TabsContent value={tab.value} key={tab.value}>
      {tab.label}
    </TabsContent>
  ))}
</Tabs>
\`\`\`
              `}
            </Markdown>

            <h3>페이징 탭</h3>
            <Markdown>
              {`
\`\`\`tsx
import { TabHead } from '@common/TabHead';
import { useTabs } from '@/shared/hooks/useTabs';

const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS_3);

<TabHead
  data={tabs}
  active={active}
  setActive={setActive}
  removable={false}
  onRemove={handleRemove}
  visibleCount={4}
  variant={'default'}
  getValue={(tab) => String(tab.value)}
>
  내용
</TabHead>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>스토리에서 자주 사용하는 주요 prop은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>variant</td><td>'default' | 'sub' | 'box'</td><td>탭 스타일</td></tr>
                <tr><td>removable</td><td>boolean</td><td>탭 제거 가능 여부</td></tr>
                <tr><td>value</td><td>string</td><td>현재 활성 탭 값</td></tr>
                <tr><td>onValueChange</td><td>{'(value: string) => void'}</td><td>활성 탭 변경 핸들러</td></tr>
                <tr><td>onRemove</td><td>{'(value: string) => void'}</td><td>탭 삭제 핸들러</td></tr>
                <tr><td>visibleCount</td><td>number</td><td>페이징 탭의 노출 개수(`TabHead`)</td></tr>
              </tbody>
            </table>
          </>
        );
      },
      argTypes: { expanded: false },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: 'select',
      options: ['default', 'sub', 'box'],
      description: '탭 버튼 스타일',
    },
    removable: {
      control: 'boolean',
      description: '탭 제거 가능 여부',
    },
  },
  args: {
    variant: 'default',
    removable: false,
  },
};
const DATA_TABS_1 = [
  { value: 'tab1', label: '상품/플랜 설계' },
  { value: 'tab2', label: '담보 설계' },
  { value: 'tab3', label: '추천 설계' },
  { value: 'tab4', label: '보장분석 설계' },
  { value: 'tab5', label: '상품/플랜 설계' },

];
const DATA_TABS_2 = [
  { value: 'tab1', label: '상품/플랜 설계' },
  { value: 'tab2', label: '담보 설계' },
];
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

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => {
    const {
      tabs: default_tabs,
      active: default_active,
      setActive: default_setActive,
      handleRemove: default_handleRemove,
    } = useTabs(DATA_TABS_1);

    const {
      tabs: pagination_tabs,
      active: pagination_active,
      setActive: pagination_setActive,
      handleRemove: pagination_handleRemove,
    } = useTabs(DATA_TABS_3);
    return (
        <Gcol gap={4} className="w-full">
          <h3 className="font-bold">Default Tabs</h3>
          <Grow className="p-16">
            <Tabs
              variant={args.variant}
              removable={args.removable}
              onRemove={default_handleRemove}
              value={default_active}
              onValueChange={default_setActive}
              className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]"
            >
              <TabsLine>
                <TabsList>
                  {default_tabs.map((tab) => (
                    <TabsTrigger value={tab.value} key={tab.value}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </TabsLine>
              {default_tabs.map((tab) => (
                <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative">
                  {tab.label}
                </TabsContent>
              ))}
            </Tabs>
          </Grow>
          <h3 className="font-bold mt-4">Pagination Tabs</h3>
          <Grow className="p-16">
            <TabHead 
              data={pagination_tabs}
              active={pagination_active}
              setActive={pagination_setActive}
              removable={args.removable}
              onRemove={pagination_handleRemove}
              visibleCount={4}
              variant={args.variant}
              getValue={tab => String(tab.value)}
              renderButtons={
                <Grow className="gap-1">
                  <Button variant="outlined" color="gray" size="md">
                    버튼1 
                  </Button>
                  <Button variant="outlined" color="gray" size="md">
                    버튼2
                  </Button>
                </Grow>
              }
              renderTab={tab => (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div>
                      <span className="flex items-center">
                        <span className="max-w-20 truncate block">{tab.name}</span>
                        <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                      </span>
                      {tab.error && (
                        <ErrorMsg aria-live="polite" show={true} position="tl" id="test">
                          입력하세요.
                        </ErrorMsg>
                      )}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <BulletList>
                      {tab.info.map((info, index) => (
                        <BulletListItem key={index} type="dot">
                          {info}
                        </BulletListItem>
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
              내용
            </TabHead>
          </Grow>
        </Gcol>
    );
  },
};
export const TabsDefault: Story = {
  parameters: {
    controls: {
      exclude: ['variant'],
    },
  },
  render: (args) => {
    const {
      tabs: default_tabs,
      active: default_active,
      setActive: default_setActive,
      handleRemove: default_handleRemove,
    } = useTabs(DATA_TABS_1);
    return (
      <Gcol gap={4} className="w-full">
        <h3 className="font-bold">Tabs Default</h3>
        <Grow className="p-16">
          <Tabs
            variant="default"
            removable={args.removable}
            onRemove={default_handleRemove}
            value={default_active}
            onValueChange={default_setActive}
            className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]"
          >
            <TabsLine>
              <TabsList>
                {default_tabs.map((tab) => (
                  <TabsTrigger value={tab.value} key={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </TabsLine>
            {default_tabs.map((tab) => (
              <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative">
                {tab.label}
              </TabsContent>
            ))}
          </Tabs>
        </Grow>
      </Gcol>
    );
  },
};
export const TabsSub: Story = {
  parameters: {
    controls: {
      exclude: ['variant'],
    },
  },
  render: (args) => {
    // variant를 고정
    const {
      tabs: sub_tabs,
      active: sub_active,
      setActive: sub_setActive,
      handleRemove: sub_handleRemove,
    } = useTabs(DATA_TABS_1);
    return (
      <Gcol gap={4} className="w-full">
        <h3 className="font-bold">Tabs Sub</h3>
        <Grow className="p-16">
          <Tabs
            variant="sub"
            removable={args.removable}
            onRemove={sub_handleRemove}
            value={sub_active}
            onValueChange={sub_setActive}
            className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]"
          >
            <TabsLine>
              <TabsList>
                {sub_tabs.map((tab) => (
                  <TabsTrigger value={tab.value} key={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </TabsLine>
            {sub_tabs.map((tab) => (
              <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative">
                {tab.label}
              </TabsContent>
            ))}
          </Tabs>
        </Grow>
      </Gcol>
    );
  },
};
export const TabsBox: Story = {
  parameters: {
    controls: {
      exclude: ['variant'],
    },
  },
  render: (args) => {
    args.variant = 'box';
     const {
      tabs: box_tabs,
      active: box_active,
      setActive: box_setActive,
      handleRemove: box_handleRemove,
    } = useTabs(DATA_TABS_2);
    return (
      <Gcol gap={4} className="w-full">
        <h3 className="font-bold">Tabs Box</h3>
        <Grow className="p-16">
          <Tabs
            variant="box"
            removable={args.removable}
            onRemove={box_handleRemove}
            value={box_active}
            onValueChange={box_setActive}
            className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]"
          >
            <TabsLine>
              <TabsList>
                {box_tabs.map((tab) => (
                  <TabsTrigger value={tab.value} key={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </TabsLine>
            {box_tabs.map((tab) => (
              <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative">
                {tab.label}
              </TabsContent>
            ))}
          </Tabs>
        </Grow>
      </Gcol>
    );
  },
};

export const TabsPagination: Story = {
  render: (args) => {
    const {
      tabs: pagination_tabs,
      active: pagination_active,
      setActive: pagination_setActive,
      handleRemove: pagination_handleRemove,
    } = useTabs(DATA_TABS_3);

    return (
      <Gcol gap={4} className="w-full">
        <h3 className="font-bold">Tabs Pagination</h3>
        <Grow className="p-16">
          <TabHead 
            data={pagination_tabs}
            active={pagination_active}
            setActive={pagination_setActive}
            removable={args.removable}
            onRemove={pagination_handleRemove}
            visibleCount={4}
            variant={args.variant}
            getValue={tab => String(tab.value)}
            renderButtons={
              <Grow className="gap-1">
                <Button variant="outlined" color="gray" size="md">
                  버튼1 
                </Button>
                <Button variant="outlined" color="gray" size="md">
                  버튼2
                </Button>
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
                      <BulletListItem key={index} type="dot">
                        {info}
                      </BulletListItem>
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
            내용
          </TabHead>
        </Grow>
      </Gcol>
    );
  },
};
