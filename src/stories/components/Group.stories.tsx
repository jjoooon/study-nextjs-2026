import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ButtonGroup, FormItem, Gcol, Grid, Grow, Separator, Typo } from '@/shared/components/common';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';

const PLACEMENT_OPTIONS = [
  'ss',
  'sc',
  'se',
  'cs',
  'cc',
  'ce',
  'es',
  'ec',
  'ee',
  'bws',
  'bwc',
  'bwe',
  'ars',
  'arc',
  'are',
  'evs',
  'evc',
  'eve',
] as const;

const VARIANT_OPTIONS = [
  'default',
  'title',
  'bg-gray-round',
  'th',
  'td',
  'tr',
  'table-header',
  'form-table',
  'form',
  'box',
  'box-line',
] as const;

const meta: Meta<typeof Grow> = {
  title: 'Components/Common/Group',
  component: Grow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Group는 레이아웃 정렬을 일관되게 구성하기 위한 공통 컴포넌트 묶음이다.
Grow(가로), Gcol(세로), Grid, FormItem, ButtonGroup, Separator를 제공한다.

- placement로 정렬을 제어하고, variant로 공통 스타일을 적용한다.

---

<br>
#### **Grow / Gcol: Usage**
\`\`\`tsx
import { Grow, Gcol } from '@/shared/components/common';

<Grow placement="bwc" variant="default">...</Grow>
<Gcol placement="sc" variant="box">...</Gcol>
\`\`\`

<br>
#### **Grid / FormItem / ButtonGroup: Usage**
\`\`\`tsx
import { Grid, FormItem, ButtonGroup, Separator } from '@/shared/components/common';

<Grid className="grid-cols-2 gap-2">...</Grid>
<FormItem placement="sc">...</FormItem>
<ButtonGroup placement="ec">...</ButtonGroup>
<Separator>...</Separator>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    // 1. Appearance
    placement: {
      control: 'select',
      options: PLACEMENT_OPTIONS,
      description: '정렬 위치 프리셋',
      table: {
        category: 'Appearance',
        type: { summary: PLACEMENT_OPTIONS.join(' | ') },
      },
    },
    variant: {
      control: 'select',
      options: VARIANT_OPTIONS,
      description: '레이아웃 스타일 프리셋',
      table: {
        category: 'Appearance',
        type: { summary: VARIANT_OPTIONS.join(' | ') },
      },
    },

    // 2. Content
    children: {
      control: 'text',
      description: '내부 콘텐츠',
      table: { category: 'Content' },
    },

    className: { table: { disable: true } },
  },
  args: {
    placement: 'cc',
    variant: 'default',
    children: 'Group Item',
  },
};

export default meta;
type Story = StoryObj<typeof Grow>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryWrap className="flex-row">
        <StoryBox className="w-2xl">
          <div className="h-28 w-full border border-[#E5E5E5] rounded-DEFAULT p-3">
            <Grow placement={args.placement} variant={args.variant} className="gap-2 h-full">
              <Typo variant="body-sm" className="px-2 py-1 rounded-DEFAULT bg-(--color-gray-10)">
                {args.children}
              </Typo>
              <Typo variant="body-sm" className="px-2 py-1 rounded-DEFAULT bg-(--color-gray-10)">
                Item 2
              </Typo>
            </Grow>
          </div>
        </StoryBox>

        <StoryBox className="w-2xl">
          <div className="h-28 w-full border border-[#E5E5E5] rounded-DEFAULT p-3">
            <Gcol placement="cc" variant="box" className="gap-2 h-full">
              <Typo variant="body-sm">Gcol Sample 1</Typo>
              <Typo variant="body-sm">Gcol Sample 2</Typo>
            </Gcol>
          </div>
        </StoryBox>
      </StoryWrap>
    );
  },
};

