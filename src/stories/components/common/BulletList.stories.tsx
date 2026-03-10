import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

type BulletListStoryProps = React.ComponentProps<typeof BulletList> & {
  type?: React.ComponentProps<typeof BulletListItem>['type'];
  size?: React.ComponentProps<typeof BulletListItem>['size'];
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
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                BulletList는 안내 문구, 약관 요약, 참조형 문구 등을 목록 형태로 표현할 때 사용하는 컴포넌트입니다.<br />
                목록 배치 방향(column/row)과 아이템 bullet 스타일(dot/dash/square/hash/ref)을 조합해 다양한 문서형 UI를 구성할 수 있습니다.
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
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';

<BulletList position="col" className="gap-1">
  <BulletListItem type="dot" size="md">목록 아이템 1</BulletListItem>
  <BulletListItem type="dot" size="md">목록 아이템 2</BulletListItem>
</BulletList>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>BulletList 및 BulletListItem 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            
            <h3>BulletList</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>position</td><td>'col' | 'row'</td><td>목록 배치 방향 (기본값: 'col')</td></tr>
                <tr><td>children</td><td>ReactNode</td><td>BulletListItem 요소들</td></tr>
                <tr><td>className</td><td>string</td><td>추가 스타일 클래스</td></tr>
              </tbody>
            </table>

            <h3>BulletListItem</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>type</td><td>'dot' | 'hash' | 'ref'</td><td>불릿 마커 스타일 (기본값: 'dot')</td></tr>
                <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>텍스트 크기 (기본값: 'md')</td></tr>
                <tr><td>children</td><td>ReactNode</td><td>아이템 내용</td></tr>
              </tbody>
            </table>

            <h2>Position</h2>
            <p>BulletList의 position 속성을 통해 목록을 수직(col) 또는 수평(row)으로 배치할 수 있습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={4} className="w-full items-start">
                  <div className="flex-1">
                    <h4 className="mb-2 font-bold">Column (Default)</h4>
                    <BulletList position="col">
                      <BulletListItem>아이템 1</BulletListItem>
                      <BulletListItem>아이템 2</BulletListItem>
                    </BulletList>
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 font-bold">Row</h4>
                    <BulletList position="row" className="gap-4">
                      <BulletListItem type="hash">태그1</BulletListItem>
                      <BulletListItem type="hash">태그2</BulletListItem>
                      <BulletListItem type="hash">태그3</BulletListItem>
                    </BulletList>
                  </div>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Type</h2>
            <p>BulletListItem의 type 속성을 통해 다양한 불릿 스타일을 적용할 수 있습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <BulletList className="gap-2">
                  <BulletListItem type="dot">dot (기본)</BulletListItem>
                  <BulletListItem type="ref">ref (참조)</BulletListItem>
                  <BulletListItem type="hash">hash (해시태그)</BulletListItem>
                </BulletList>
              </Gcol>
            </Unstyled>

            <h2>Size</h2>
            <p>BulletListItem의 size 속성을 통해 텍스트 크기를 조절할 수 있습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <BulletList className="gap-2">
                  <BulletListItem size="sm">Small (sm)</BulletListItem>
                  <BulletListItem size="md">Medium (md)</BulletListItem>
                  <BulletListItem size="lg">Large (lg)</BulletListItem>
                </BulletList>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['col', 'row'],
      description: '목록 배치 방향',
      table: {
        category: 'Appearance',
        type: { summary: 'col | row' },
      },
    },
    type: {
      control: 'select',
      options: ['dot', 'hash', 'ref'],
      description: '아이템 마커 스타일',
      table: {
        category: 'Appearance',
        type: { summary: 'dot | hash | ref' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '아이템 텍스트 크기',
      table: {
        category: 'Appearance',
        type: { summary: 'sm | md | lg' },
      },
    },
    itemText: {
      control: 'text',
      description: '샘플 아이템 텍스트',
      table: { category: 'Content' },
    },
    children: { table: { disable: true } },
  },
  args: {
    position: 'col',
    type: 'dot',
    size: 'md',
    itemText: '안내 문구입니다.',
  },
};

export default meta;
type Story = StoryObj<BulletListStoryProps>;

export const Default: Story = {
  render: (args) => {
    const { type = 'dot', size = 'md', itemText = '안내 문구입니다.', ...listArgs } = args;

    return (
      <BulletList {...listArgs}>
        <BulletListItem type={type} size={size} className="whitespace-nowrap">
          {itemText}
        </BulletListItem>
        <BulletListItem type={type} size={size} className="whitespace-nowrap">
          두 번째 문구입니다.
        </BulletListItem>
        <BulletListItem type={type} size={size} className="whitespace-nowrap">
          세 번째 문구입니다.
        </BulletListItem>
      </BulletList>
    );
  },
};

export const Row: Story = {
  args: {
    position: 'row',
    className: 'gap-2',
    type: 'hash',
    size: 'md',
  },
  render: (args) => {
    const { type = 'hash', size = 'md', ...listArgs } = args;

    return (
      <BulletList {...listArgs}>
        <BulletListItem type={type} size={size} >
          자동차
        </BulletListItem>
        <BulletListItem type={type} size={size} >
          운전자
        </BulletListItem>
        <BulletListItem type={type} size={size} >
          건강
        </BulletListItem>
      </BulletList>
    );
  },
};

export const Types: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-3">
        <BulletList className="gap-[0.2rem]">
          <BulletListItem type="dot">dot bullet</BulletListItem>
          <BulletListItem type="ref">ref bullet</BulletListItem>
        </BulletList>
        <BulletList position="row" className="gap-2">
          <BulletListItem type="hash">hash</BulletListItem>
          <BulletListItem type="hash">list</BulletListItem>
          <BulletListItem type="hash">sample</BulletListItem>
        </BulletList>
      </div>
    );
  },
};
