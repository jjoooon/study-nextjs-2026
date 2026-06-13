/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Gcol, Grow } from '@atoms';
import { BulletList, BulletListItem, BulletItem } from '@common/BulletList';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

type BulletListStoryProps = React.ComponentProps<typeof BulletList> & {
  type?: React.ComponentProps<typeof BulletListItem>['type'];
  size?: React.ComponentProps<typeof BulletListItem>['size'];
  color?: React.ComponentProps<typeof BulletListItem>['color'];
  itemText?: string;
};

const meta: Meta<BulletListStoryProps> = {
  title: 'Components/Common/BulletList',
  component: BulletList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />
            <h2>History</h2>
            <ul>
              <li>2026.03.30</li>
            </ul>

            <h2>Overview</h2>
            <div>
              <p>
                BulletList는 안내 문구, 약관 요약, 참조형 문구 등을 목록 형태로 표현할 때 사용하는 컴포넌트입니다.
                <br />
                목록 배치 방향(column/row)과 아이템 bullet 스타일(dot/dash/square/hash/ref)을 조합해 다양한 문서형 UI를
                구성할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>BulletList 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 목록 (dot, dash, square)</li>
              <li>참조 목록 (ref)</li>
              <li>태그형 목록 (hash)</li>
              <li>가로/세로 배치 (row/col)</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { BulletList, BulletListItem, BulletItem } from '@common/BulletList';

// 목록형태
<BulletList position="col" className="gap-1">
  <BulletListItem type="dot" size="md">목록 아이템 1</BulletListItem>
  <BulletListItem type="dot" size="md">목록 아이템 2</BulletListItem>
</BulletList>

// 단일형태
<BulletItem type="dot" size="md">목록 아이템 2</BulletItem>
\`\`\`
              `}
            </Markdown>
          </>
        );
      },
    },
  },
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['col', 'row'],
      description: '목록 배치 방향',
      table: {
        category: '설정 props',
        type: { summary: 'col | row' },
      },
    },
    type: {
      control: 'inline-radio',
      options: ['dot', 'dotBig', 'hash', 'ref', 'star', 'dash', 'symbols'],
      description: '아이템 마커 스타일',
      table: {
        category: '설정 props',
        type: { summary: 'dot | dotBig | hash | ref | star | dash | symbols' },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: '아이템 텍스트 크기',
      table: {
        category: '설정 props',
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    color: {
      control: 'inline-radio',
      options: ['default', 'info', 'detail', 'warning'],
      description: '텍스트 색상',
      table: {
        category: '설정 props',
        type: { summary: 'default | info | detail | warning' },
      },
    },
    itemText: { table: { disable: true } },
    className: { table: { disable: true } },
    before: { table: { disable: true } },
    onClick: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    position: 'col',
    type: 'dot',
    size: 'md',
    color: 'default',
    itemText: '안내 문구입니다.',
  },
};

export default meta;
type Story = StoryObj<BulletListStoryProps>;

export const Default: Story = {
  render: (args) => {
    const { type = 'dot', size = 'md', color = 'default', itemText = '안내 문구입니다.', ...listArgs } = args;

    return (
      <Grow gap={8} className="w-full items-start">
        <BulletList {...listArgs}>
          <BulletListItem type={type} before="1." size={size} color={color} className="whitespace-nowrap">
            두 번째 문구입니다.두 번째 문구입니다. <br />두 번째 문구입니다.두 번째 문구입니다.
          </BulletListItem>
          <BulletListItem type={type} before="①" size={size} color={color} className="whitespace-nowrap">
            두 번째 문구입니다.두 번째 문구입니다. <br />두 번째 문구입니다.두 번째 문구입니다.
          </BulletListItem>
          <BulletListItem
            type={type}
            before="㉠"
            size={size}
            color={color}
            className="whitespace-nowrap"
            onClick={() => alert('Clicked!')}
          >
            두 번째 문구입니다.두 번째 문구입니다. <br />두 번째 문구입니다.두 번째 문구입니다.
          </BulletListItem>
        </BulletList>

        <BulletItem
          type={type}
          size={size}
          color={color}
          before="ⓐ"
          className="whitespace-nowrap"
          onClick={() => alert('Clicked2!')}
        >
          {itemText}
        </BulletItem>
      </Grow>
    );
  },
};
