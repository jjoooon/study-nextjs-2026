import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { SortableButton } from '@common/SortableButton';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

type SortOrder = 'asc' | 'desc' | 'none';

type SortableButtonStoryProps = React.ComponentProps<typeof SortableButton>;

const SORT_ORDER_OPTIONS: SortOrder[] = ['asc', 'desc', 'none'];

const meta: Meta<SortableButtonStoryProps> = {
  title: 'Components/Common/SortableButton',
  component: SortableButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SortableButton은 컬럼 정렬 상태를 표시하고 정렬 변경 이벤트를 발생시키는 버튼 컴포넌트이다.
현재 정렬 컬럼과 정렬 방향(asc/desc/none)에 따라 아이콘이 자동으로 바뀐다.

---

<br>
#### **SortableButton: Usage**
\`\`\`tsx
import { SortableButton } from '@/shared/components/common';

<SortableButton
  label="보험료"
  columnKey="premium"
  currentSortColumn={"premium"}
  currentSortOrder={"asc | desc | none"}
  onSort={(columnKey) => console.log(columnKey)}
/>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    // 1. Content
    label: {
      control: 'text',
      description: '버튼 라벨 텍스트',
      table: { category: 'Content' },
    },
    columnKey: {
      control: 'text',
      description: '정렬 대상 컬럼 키',
      table: { category: 'Content' },
    },

    // 2. State
    currentSortColumn: {
      control: 'text',
      description: '현재 정렬된 컬럼 키',
      table: { category: 'State' },
    },
    currentSortOrder: {
      control: 'select',
      options: SORT_ORDER_OPTIONS,
      description: '현재 정렬 방향',
      table: {
        category: 'State',
        type: { summary: SORT_ORDER_OPTIONS.join(' | ') },
      },
    },

    // 3. Events
    onSort: {
      action: 'sorted',
      description: '버튼 클릭 시 호출되는 정렬 이벤트',
      table: { category: 'Events' },
    },
  },
  args: {
    label: '보험료',
    columnKey: 'premium',
    currentSortColumn: 'premium',
    currentSortOrder: 'none',
  },
};

export default meta;
type Story = StoryObj<SortableButtonStoryProps>;

export const Default: Story = {
  render: (args) => {
    const [currentSortColumn, setCurrentSortColumn] = React.useState<string | null>(args.currentSortColumn ?? null);
    const [currentSortOrder, setCurrentSortOrder] = React.useState<SortOrder>(args.currentSortOrder ?? 'none');

    React.useEffect(() => {
      setCurrentSortColumn(args.currentSortColumn ?? null);
    }, [args.currentSortColumn]);

    React.useEffect(() => {
      setCurrentSortOrder(args.currentSortOrder ?? 'none');
    }, [args.currentSortOrder]);

    const handleSort = (columnKey: string) => {
      const nextOrder: SortOrder =
        currentSortColumn !== columnKey ? 'asc' : currentSortOrder === 'asc' ? 'desc' : currentSortOrder === 'desc' ? 'none' : 'asc';

      setCurrentSortColumn(columnKey);
      setCurrentSortOrder(nextOrder);
      args.onSort?.(columnKey);
    };

    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <Grow placement="sc">
            <SortableButton
              label={args.label}
              columnKey={args.columnKey}
              currentSortColumn={currentSortColumn}
              currentSortOrder={currentSortOrder}
              onSort={handleSort}
            />
          </Grow>
        </StoryBox>

        <StoryBox>
          <Gcol className="gap-2">
            <Typo variant="body-sm" color="gray">
              currentSortOrder: {currentSortOrder}
            </Typo>
          </Gcol>
        </StoryBox>
      </StoryWrap>
    );
  },
};
