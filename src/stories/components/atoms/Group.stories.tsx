import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Typo, Gcol, Grow } from '@atoms';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

const placementOptions = [
  'ss', 'sc', 'se',
  'cs', 'cc', 'ce',
  'es', 'ec', 'ee',
  'bws', 'bwc', 'bwe',
  'ars', 'arc', 'are',
  'evs', 'evc', 'eve',
] as const;

const variantOptions = ['default', 'box', 'box-line', 'box-info', 'box-warning', 'box-detail', 'box-round'] as const;

const meta: Meta<typeof Gcol> = {
  title: 'Components/Atoms/Group',
  component: Gcol,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>History</h2>
            <ul>
              <li>2026.03.30</li>
            </ul>
            
            <h2>Overview</h2>
            <div>
              <p>
                Group 컴포넌트는 Flexbox 기반의 레이아웃 유틸리티 컴포넌트 모음입니다.
                Gcol(세로)과 Grow(가로)를 조합해 빠르게 정렬/간격을 구성할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>대표적인 사용 예시는 아래와 같습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { Gcol, Grow } from '@atoms';

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

// 박스+둥근 모서리
<Gcol variant="box-round" placement="cc">
  <p>Styled Box Round</p>
</Gcol>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Group 컴포넌트에서 사용할 수 있는 주요 prop 옵션입니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>placement</td><td>LayoutPlacement</td><td>정렬 옵션 (justify-content + align-items)</td></tr>
                <tr><td>variant</td><td>'default' | 'box' | 'box-line' | 'box-round'</td><td>시각적 스타일 변형<br />box-round: box + 둥근 모서리</td></tr>
                <tr><td>gap</td><td>number</td><td>아이템 간격 (gap)</td></tr>
                <tr><td>className</td><td>string</td><td>추가 클래스</td></tr>
                <tr><td>style</td><td>CSSProperties</td><td>인라인 스타일</td></tr>
              </tbody>
            </table>

            <h2>Placement & Variant</h2>
            <p>대표 정렬/스타일 예시는 다음과 같습니다.</p>
            <Unstyled>
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
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
    placement: {
      control: 'inline-radio',
      options: placementOptions,
      description: '정렬 옵션 (justify-content + align-items)',
      table: {
        type: { summary: 'LayoutPlacement' },
      },
    },
    variant: {
      control: 'inline-radio',
      options: variantOptions,
      description: '시각적 스타일 변형',
      table: {
        type: { summary: 'Variant' },
      },
    },
    gap: {
      table: { disable: true },
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
