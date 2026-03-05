import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow} from '@/shared/components/common';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';

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
      description: {
        component: `
BulletList는 안내 문구, 약관 요약, 참조형 문구 등을 목록 형태로 표현할 때 사용하는 컴포넌트이다.
목록 배치 방향(column/row)과 아이템 bullet 스타일(dot/dash/square/hash/ref)을 조합해 다양한 문서형 UI를 구성할 수 있다.

- **position**으로 목록 배치 방향을 설정한다.
- **BulletListItem type/size**로 아이템의 마커 형태와 텍스트 크기를 제어한다.

---

<br>
#### **Ref BulletList: Usage**
\`\`\`tsx
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';

<BulletList position="col">
  <BulletListItem type="ref" size="md">약관을 확인하세요.</BulletListItem>
  <BulletListItem type="ref" size="md">청약 전 상품설명서를 읽어주세요.</BulletListItem>
</BulletList>
\`\`\`

<br>
#### **Tag BulletList: Usage**
\`\`\`tsx
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';

<BulletList position="row">
  <BulletListItem type="tag" size="md"}>보험</BulletListItem>
  <BulletListItem type="tag" size="md">자동차</BulletListItem>
</BulletList>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
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
      options: ['dot', 'dash', 'square', 'hash', 'ref'],
      description: '아이템 마커 스타일',
      table: {
        category: 'Appearance',
        type: { summary: 'dot | dash | square | hash | ref' },
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
      <StoryWrap className="flex-row">
        <StoryBox>
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
        </StoryBox>

        <StoryBox>
          <Grow placement="ss" className="gap-4">
            <Gcol placement="ss" className="gap-[0.4rem]">
              <div className="w-full rounded-md border p-3">
                <div className="text-[1.2rem] font-semibold">Type</div>
                <BulletList position={args.position} className="mt-2 gap-[0.2rem]">
                  <BulletListItem type="dot" className="pt-0">dot</BulletListItem>
                  <BulletListItem type="hash" className="pt-0">hash</BulletListItem>
                  <BulletListItem type="ref" className="pt-0">ref</BulletListItem>
                </BulletList>
              </div>
            </Gcol>

            <Gcol placement="ss" className="gap-[0.4rem]">
              <div className="w-full rounded-md border p-3">
                <div className="text-[1.2rem] font-semibold">Size</div>
                <BulletList position={args.position} className="mt-2 gap-[0.2rem]">
                  <BulletListItem type="dot" className='pt-0' size="sm">
                    sm
                  </BulletListItem>
                  <BulletListItem type="dot" className='pt-0' size="md">
                    md
                  </BulletListItem>
                  <BulletListItem type="dot" className='pt-0' size="lg">
                    lg
                  </BulletListItem>
                </BulletList>
              </div>
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
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
          <BulletListItem type="dash">dash bullet</BulletListItem>
          <BulletListItem type="square">square bullet</BulletListItem>
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
