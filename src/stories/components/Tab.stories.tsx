import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// useState는 아래에서 React.useState로 사용하므로 별도 import 필요 없음
import { Grow, BulletList, BulletListItem } from '@/shared/components/common';
import { TabHead } from '@/shared/components/common/TabHead';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  TabsPanel, 
  TabsLine, 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger, 
  Button,
} from '@/shared/components/uiux';

import { useTabs } from '@/shared/hooks/useTabs';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

const meta: Meta<typeof Tabs> = {
  title: 'Components/UIUX/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
탭은 버튼을 눌러 상호배타적인 여러 개의 콘텐츠 섹션을 전환할 수 있는 컴포넌트이다.    
콘텐츠 섹션은 동일한 영역 내에서 전환되기 때문에 정보를 탐색하는 맥락을 유지할 수 있고 작은 공간에 많은 양의 콘텐츠를 효과적으로 표현할 수 있다.

- **기본 탭** 방식과 **페이징 탭** 두가지로 크게 나누어진다. 
- 스타일로는 **default**, **sub**, **box**가 있다.

        `,
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
  { value: 'tab6', label: '담보 설계' },
  { value: 'tab7', label: '추천 설계' },
  { value: 'tab8', label: '보장분석 설계' },
  { value: 'tab9', label: '상품/플랜 설계' },
  { value: 'tab10', label: '담보 설계' },
  { value: 'tab11', label: '추천 설계' },
  { value: 'tab12', label: '보장분석 설계' },
];
const DATA_TABS_2 = [
  { value: 'tab1', label: '상품/플랜 설계' },
  { value: 'tab2', label: '담보 설계' },
];
const DATA_TABS_3 = [
  {
    name: '반짝빛나리반짝빛나리',
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
  {
    name: '반짝빛나리반짝빛나리',
    age: '4',
    gender: '남',
    value: 'tab4',
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
      tabs: tabs1,
      active: active1,
      setActive: setActive1,
      handleRemove: handleRemove1,
      visibleTabs: visibleTabs1,
    } = useTabs(DATA_TABS_1);

    const {
      tabs: tabs3,
      active: active3,
      setActive: setActive3,
      handleRemove: handleRemove3,
      visibleTabs: visibleTabs3,
    } = useTabs(DATA_TABS_3);
    return (
      <StoryWrap>
        <StoryBox>
          <Tabs
            variant={args.variant}
            removable={args.removable}
            onRemove={handleRemove1}
            value={active1}
            onValueChange={setActive1}
            className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]"
          >
            <TabsLine>
              <TabsList>
                {visibleTabs1.map((tab) => (
                  <TabsTrigger value={tab.value} key={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </TabsLine>
            {visibleTabs1.map((tab) => (
              <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative">
                {tab.label}
              </TabsContent>
            ))}
          </Tabs>
        </StoryBox>
        <StoryBox>
          <TabHead 
            data={visibleTabs3}
            active={active3}
            setActive={setActive3}
            removable={args.removable}
            onRemove={handleRemove3}
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
        </StoryBox>
      </StoryWrap>
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
    const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(DATA_TABS_1);
    return (
      <Tabs
        variant="default"
        removable={args.removable}
        onRemove={handleRemove}
        value={active}
        onValueChange={setActive}
        className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]"
      >
        <TabsLine>
          <TabsList>
            {visibleTabs.map((tab) => (
              <TabsTrigger value={tab.value} key={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </TabsLine>
        {visibleTabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative">
            {tab.label}
          </TabsContent>
        ))}
      </Tabs>
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
    const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(DATA_TABS_1);
    return (
      <Tabs
        variant="sub"
        removable={args.removable}
        onRemove={handleRemove}
        value={active}
        onValueChange={setActive}
        className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]"
      >
        <TabsLine>
          <TabsList>
            {visibleTabs.map((tab) => (
              <TabsTrigger value={tab.value} key={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </TabsLine>
        {visibleTabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative">
            {tab.label}
          </TabsContent>
        ))}
      </Tabs>
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
    const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(DATA_TABS_2);
    return (
        <Tabs
          variant="box"
          removable={args.removable}
          onRemove={handleRemove}
          value={active}
          onValueChange={setActive}
          className="grid grid-rows-[auto_1fr] w-full h-full gap-[1rem]"
        >
          <TabsLine>
            <TabsList>
              {visibleTabs.map((tab) => (
                <TabsTrigger value={tab.value} key={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </TabsLine>
          {visibleTabs.map((tab) => (
            <TabsContent value={tab.value} key={tab.value} className="w-full h-full relative">
              {tab.label}
            </TabsContent>
          ))}
        </Tabs>
    );
  },
};

export const TabsPagination: Story = {
  render: (args) => {
    const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(DATA_TABS_3);

    return (
      <TabHead 
        data={visibleTabs}
        active={active}
        setActive={setActive}
        removable={args.removable}
        onRemove={handleRemove}
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
    );
  },
};
