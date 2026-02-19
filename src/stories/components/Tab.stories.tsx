import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Link from "next/link"
import { useTabs } from '@/shared/hooks/useTabs';
// useState는 아래에서 React.useState로 사용하므로 별도 import 필요 없음
import type { TabDataType } from '@/features/pub/proto/types/LTRA350Data.types';
import { Grow, Typo, BulletList, BulletListItem } from '@/shared/components/common';
import { ArrowLightIcon, ListIcon } from '@/shared/components/icons';
import {
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  TabsPanel, 
  TabsLine,
} from '@/shared/components/uiux';
import { useTabsPagination } from '@/shared/hooks/useTabsPagination';
import { TabHead } from '@/shared/components/common/TabHead';

const meta: Meta<typeof Tabs> = {
  title: 'Components/UIUX/Tabs',
  component: Tabs,
  tags: ['autodocs'],
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
const TABS = [
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
const TABS2 = [
  { value: 'tab1', label: '상품/플랜 설계' },
  { value: 'tab2', label: '담보 설계' },
];
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => {
    const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(TABS);
    return (
      <Grow placement="sc" className='gap-3 rounded-[.8rem] border-1 border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6'>
        <Tabs 
          variant={args.variant}
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
      </Grow>
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
    const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(TABS);
    return (
      <Grow placement="sc" className='gap-3 rounded-[.8rem] border-1 border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6'>
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
      </Grow>
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
    const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(TABS);
    return (
      <Grow placement="sc" className='gap-3 rounded-[.8rem] border-1 border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6'>
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
      </Grow>
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
    const { tabs, active, setActive, handleRemove, visibleTabs } = useTabs(TABS2);
    return (
      <Grow placement="sc" className='gap-3 rounded-[.8rem] border-1 border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6'>
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
      </Grow>
    );
  },
};
export const TabsPagination: Story = {
  render: (args) => {
    const visibleCount = 5; //탭 최대 노출 갯수
    const data = [
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
    const [active, setActive] = React.useState('tab1');
    
    // tab pagination 훅 사용
    const { visibleStart, end, handlePrev, handleNext, isLastPage, setVisibleStart } = useTabsPagination(
      data,
      visibleCount,
      active
    );
    return (
      <Grow placement="sc" className='gap-3 rounded-[.8rem] border-1 border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6'>
        <TabHead data={data} visibleCount={visibleCount} variant={args.variant}>내용</TabHead>
      </Grow>
    );
  },
};