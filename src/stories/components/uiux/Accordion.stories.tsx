/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Accordion } from '@uiux/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Containers/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="Accordion"
          history={[
            '2025.11.18 - 컴포넌트 커스텀 변형 추가 (default, box, line, minimal)',
            '2025.12.17 - tableHead 스타일 추가 및 트리거 헤더 마크업 개선',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화',
          ]}
          overview={`Accordion 컴포넌트는 정보를 접고 펼쳐서 화면 공간을 절약하고 사용자 인지 부하를 줄여주는 UI 요소입니다.
shadcn/ui 및 Radix UI Accordion Primitive를 기반으로 복제/확장되었으며, 다양한 프로젝트 디자인 테마를 위한 스타일 변형(variant)을 지원합니다.`}
          usageCode={`import { Accordion } from '@uiux/Accordion';

<Accordion type="single" collapsible defaultValue="item-1" variant="box">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>섹션 1 제목</Accordion.Trigger>
    <Accordion.Content>
      <div className="p-4">섹션 1 내용 영역</div>
    </Accordion.Content>
  </Accordion.Item>
  
  <Accordion.Item value="item-2">
    <Accordion.Trigger>섹션 2 제목</Accordion.Trigger>
    <Accordion.Content>
      <div className="p-4">섹션 2 내용 영역</div>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
          apiReference={[
            {
              prop: 'variant',
              type: "'default' | 'box' | 'line' | 'minimal' | 'tableHead'",
              description: '아코디언 시각적 스타일 프리셋 변형 (@default "default")',
            },
            {
              prop: 'type',
              type: "'single' | 'multiple'",
              description: '아코디언 항목의 동시 펼침 모드 (필수)',
            },
            {
              prop: 'collapsible',
              type: 'boolean',
              description:
                "type이 'single'일 때, 펼쳐진 항목을 다시 클릭하여 접을 수 있게 허용할지 여부 (@default false)",
            },
            {
              prop: 'disabled',
              type: 'boolean',
              description: '전체 아코디언 요소 비활성화 여부 (@default false)',
            },
            {
              prop: 'value',
              type: 'string | string[]',
              description: '제어(Controlled) 상태의 열려있는 아이템 값',
            },
            {
              prop: 'defaultValue',
              type: 'string | string[]',
              description: '초기에 열려있을 기본 아이템 값',
            },
            {
              prop: 'onValueChange',
              type: '(value: string | string[]) => void',
              description: '열린 상태가 바뀔 때 호출되는 콜백 함수',
            },
            {
              prop: 'className',
              type: 'string',
              description: '추가적인 스타일 클래스명',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'box', 'line', 'minimal', 'tableHead'],
      description: '아코디언 시각적 스타일 변형 프리셋',
      table: {
        category: 'Appearance',
        type: { summary: 'VariantType' },
        defaultValue: { summary: 'default' },
      },
    },
    type: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description: '아코디언 항목의 동시 펼침 모드',
      table: {
        category: 'Behavior',
        type: { summary: "'single' | 'multiple'" },
      },
    },
    collapsible: {
      control: 'boolean',
      description: "type이 'single'일 때 열려있는 항목을 다시 클릭해 닫을 수 있는지 여부",
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '아코디언 상호작용 비활성화 여부',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: '열려 있는 섹션의 값 (제어 상태)',
      table: {
        category: 'State',
        type: { summary: 'string | string[]' },
      },
    },
    defaultValue: {
      control: 'text',
      description: '기본으로 펼쳐져 있을 섹션의 값 (비제어 상태)',
      table: {
        category: 'State',
        type: { summary: 'string | string[]' },
      },
    },
    onValueChange: {
      action: 'onValueChange',
      description: '펼쳐진 상태가 변경될 때 실행되는 콜백',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    className: {
      control: 'text',
      description: '추가 스타일 클래스명',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    type: 'single',
    variant: 'default',
    collapsible: true,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args} className="w-[40rem]">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Section 1 (기본 타이틀)</Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">
            여기는 첫 번째 아코디언 색션의 본문 텍스트가 표시되는 공간입니다.
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Section 2 (추가 타이틀)</Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">
            여기는 두 번째 아코디언 섹션의 상세 내용이 들어가는 공간입니다.
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Box: Story = {
  render: (args) => (
    <Accordion {...args} variant="box" className="w-[40rem]">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Box 1 (회색 배경 라운드 박스 스타일)</Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">Box Content 1</div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Box 2 (개별 카드 형태)</Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">Box Content 2</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Line: Story = {
  render: (args) => (
    <Accordion {...args} variant="line" className="w-[40rem]">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Line 1 (좌측 블루 보더 강조)</Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">Line Content 1</div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Line 2</Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">Line Content 2</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Minimal: Story = {
  render: (args) => (
    <Accordion {...args} variant="minimal" className="w-[40rem]">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Minimal 1 (여백 및 패딩 최소화)</Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">Minimal Content 1</div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Minimal 2</Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">Minimal Content 2</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const TableHead: Story = {
  render: (args) => (
    <Accordion {...args} variant="tableHead" className="w-[40rem]">
      <Accordion.Item value="item-1">
        <Accordion.Trigger title="Table Head Title 1">
          <span className="text-[1.1rem] text-[var(--color-primary-50)]">기타 정보</span>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="p-4 text-[1.3rem] text-[var(--color-gray-70)]">Table Head Content 1</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
