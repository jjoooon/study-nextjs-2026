import type { Meta, StoryObj } from '@storybook/react';
import { Typo, Gcol, Grow, Grid, FormItem, ButtonGroup, Separator } from '@atoms';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

const placementOptions = [
  'ss', 'sc', 'se',
  'cs', 'cc', 'ce',
  'es', 'ec', 'ee',
  'bws', 'bwc', 'bwe',
  'ars', 'arc', 'are',
  'evs', 'evc', 'eve',
] as const;

const variantOptions = ['default', 'box', 'box-line'] as const;

const meta: Meta<typeof Gcol> = {
  title: 'Components/Atoms/Group',
  component: Gcol,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Flexbox 기반의 레이아웃 유틸리티 컴포넌트 모음입니다.

**주요 컴포넌트:**
- **Gcol**: 세로(Column) 방향 Flex 컨테이너
- **Grow**: 가로(Row) 방향 Flex 컨테이너
- **Grid**: CSS Grid 컨테이너
- **FormItem**: 폼 아이템용 Row 컨테이너
- **ButtonGroup**: 버튼 그룹용 Row 컨테이너
- **Separator**: 구분선 컴포넌트

**Placement 옵션 (정렬):**
- \`ss/sc/se\`: start-start, start-center, start-end
- \`cs/cc/ce\`: center-start, center-center, center-end
- \`es/ec/ee\`: end-start, end-center, end-end
- \`bws/bwc/bwe\`: between (양쪽 정렬)
- \`ars/arc/are\`: around (둘레 정렬)
- \`evs/evc/eve\`: evenly (균등 정렬)

**Variant 옵션:**
- \`default\`: 기본 스타일
- \`box\`: 패딩 + 배경색
- \`box-line\`: 테두리 + 그림자

<br>
#### **Usage**
\`\`\`tsx
import { Gcol, Grow } from "@/shared/components/atoms/Group"

// 세로 배치 (중앙 정렬)
<Gcol placement="cc">
  <div>Item 1</div>
  <div>Item 2</div>
</Gcol>

// 가로 배치 (양쪽 정렬)
<Grow placement="bwc">
  <span>Left</span>
  <span>Right</span>
</Grow>

// 박스 스타일 적용
<Gcol variant="box" placement="cc">
  <p>Styled Box</p>
</Gcol>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
    placement: {
      control: 'select',
      options: placementOptions,
      description: '정렬 옵션 (justify-content + align-items)',
      table: {
        type: { summary: 'LayoutPlacement' },
      },
    },
    variant: {
      control: 'select',
      options: variantOptions,
      description: '시각적 스타일 변형',
      table: {
        type: { summary: 'Variant' },
      },
    },
    gap: {
      control: { type: 'number', min: 0, max: 12, step: 0.5 },
      description: '아이템 간격 (gap)',
      table: {
        type: { summary: 'number' },
      },
    },
    className: {
      table: { disable: true },
    },
    style: {
      table: { disable: true },
    },
  },
  args: {
    placement: 'cc',
    variant: 'default',
    gap: 1,
  },
};

const DemoBox = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center bg-blue-100 border border-blue-300 h-[2rem] aspect-square rounded-[.8rem] leading-0 ${className}`}>
    {children}
  </div>
);

export default meta;
type Story = StoryObj<typeof Gcol>;

export const Default: Story = {
  render: (args) => (
    <Grow className="gap-2 p-2 border border-[var(--color-gray-20)] rounded-[.8rem]">
      <Grow {...args} className="w-[20rem] h-[20rem] p-2">
        <DemoBox>A</DemoBox>
        <DemoBox>B</DemoBox>
      </Grow>
      <hr className="w-[1px] bg-[var(--color-gray-5)] h-[18rem] border-0"/>
      <Gcol {...args} className="w-[20rem] h-[20rem] p-2">
        <DemoBox>A</DemoBox>
        <DemoBox>B</DemoBox>
      </Gcol>
    </Grow>
  ),
};

export const GroupPlacements: Story = {
  render: () => (
    <Grow className="gap-6 w-full" placement="cs">
      <Gcol className="gap-2" placement="ss">
        <Typo tag="h2" className="text-[1.6rem] font-bold w-full">Grow</Typo>
        <Gcol className="gap-2 w-full" placement="ss">
          <Typo tag="h3" className="text-[1.3rem] font-semibold text-[var(--color-gray-50)]">Start Alignments (ss, sc, se)</Typo>
          <Grow className="gap-4 w-full">
            <Grow placement="ss" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
            <Grow placement="sc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
            <Grow placement="se" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
          </Grow>
        </Gcol>

        <Gcol className="gap-2 w-full" placement="ss">
          <Typo tag="h3" className="text-[1.3rem] font-semibold text-[var(--color-gray-50)]">Center Alignments (cs, cc, ce)</Typo>
          <Grow className="gap-4 w-full">
            <Grow placement="cs" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
            <Grow placement="cc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
            <Grow placement="ce" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
          </Grow>
        </Gcol>

        <Gcol className="gap-2 w-full" placement="ss">
          <Typo tag="h3" className="text-[1.3rem] font-semibold text-[var(--color-gray-50)]">End Alignments (es, ec, ee)</Typo>
          <Grow className="gap-4 w-full">
            <Grow placement="es" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
            <Grow placement="ec" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
            <Grow placement="ee" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
          </Grow>
        </Gcol>

        <Gcol className="gap-2 w-full" placement="ss">
          <Typo tag="h3" className="text-[1.3rem] font-semibold text-[var(--color-gray-50)]">Space Distributions (bwc, arc, evc)</Typo>
          <Grow className="gap-4 w-full">
            <Grow placement="bwc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
            <Grow placement="arc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
            <Grow placement="evc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Grow>
          </Grow>
        </Gcol>
      </Gcol>
      <Gcol className="gap-2" placement="ss">
        <Typo tag="h2" className="text-[1.6rem] font-bold w-full">Gcol</Typo>
        <Gcol className="gap-2 w-full" placement="ss">
          <Typo tag="h3" className="text-[1.3rem] font-semibold text-[var(--color-gray-50)]">Start Alignments (ss, sc, se)</Typo>
          <Grow className="gap-4 w-full">
            <Gcol placement="ss" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
            <Gcol placement="sc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
            <Gcol placement="se" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
          </Grow>
        </Gcol>

        <Gcol className="gap-2 w-full" placement="ss">
          <Typo tag="h3" className="text-[1.3rem] font-semibold text-[var(--color-gray-50)]">Center Alignments (cs, cc, ce)</Typo>
          <Grow className="gap-4 w-full">
            <Gcol placement="cs" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
            <Gcol placement="cc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
            <Gcol placement="ce" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
          </Grow>
        </Gcol>

        <Gcol className="gap-2 w-full" placement="ss">
          <Typo tag="h3" className="text-[1.3rem] font-semibold text-[var(--color-gray-50)]">End Alignments (es, ec, ee)</Typo>
          <Grow className="gap-4 w-full">
            <Gcol placement="es" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
            <Gcol placement="ec" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
            <Gcol placement="ee" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
          </Grow>
        </Gcol>

        <Gcol className="gap-2 w-full" placement="ss">
          <Typo tag="h3" className="text-[1.3rem] font-semibold text-[var(--color-gray-50)]">Space Distributions (bwc, arc, evc)</Typo>
          <Grow className="gap-4 w-full">
            <Gcol placement="bwc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
            <Gcol placement="arc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
            <Gcol placement="evc" className="flex-1 w-full aspect-square h-[10rem] gap-1 bg-[var(--color-gray-5)] rounded-[.8rem] p-2">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
            </Gcol>
          </Grow>
        </Gcol>
      </Gcol>
    </Grow>
  ),
};
