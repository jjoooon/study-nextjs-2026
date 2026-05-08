/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Gcol } from '@atoms';
import { ProductCard } from '@/shared/components/features/ProductCard';

import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

import type { ProductCardProps } from '@/shared/components/features/ProductCard';

const meta: Meta<ProductCardProps> = {
  title: 'Components/Features/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <h2>Overview</h2>
          <p>
            보험 상품 목록에서 사용되는 카드 아이템 컴포넌트입니다.
            <br />
            오른쪽 상단 <code>FlagCheckDoutoneIcon</code>에 순위 번호를 표시하고,
            인수가능/불가 배지, 체크박스, 상품 특징 불릿 리스트, 추천화법 버튼을 제공합니다.
          </p>
          <Primary />
          <Controls />
          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
import { InsuranceProductCard } from '@features/InsuranceProductCard';

<ProductCard
  rank={1}
  title="한화 시그니처 여성 3N5간편건강보험3.0 2504"
  subtitle={"2종. 납입면제 강화형.\\n납입후 50% 해약환급금지급형"}
  features={[
    '12형(365간편고지형) (올인원랜) (5-12형)',
    '30년납/100세만기/10년',
    '건강고지형Ⅱ(6년)',
    '암/뇌/심장/수술/치료비',
  ]}
  status="accept"
  onChatClick={() => console.log('추천화법 클릭')}
/>
\`\`\`
            `}
          </Markdown>
          <h2>API Reference</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입/옵션</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>rank</td><td>number</td><td>오른쪽 상단 플래그에 표시할 순위 (01, 02…)</td></tr>
              <tr><td>title</td><td>string</td><td>상품명</td></tr>
              <tr><td>subtitle</td><td>string</td><td>납입 유형 등 부제목 설명</td></tr>
              <tr><td>features</td><td>string[]</td><td>상품 특징 불릿 리스트 항목</td></tr>
              <tr><td>status</td><td>{'\'accept\' | \'reject\''}</td><td>인수 가능 여부</td></tr>
              <tr><td>checked</td><td>boolean</td><td>체크박스 선택 상태</td></tr>
              <tr><td>onCheckedChange</td><td>{'(checked: boolean) => void'}</td><td>체크박스 변경 핸들러</td></tr>
              <tr><td>onChatClick</td><td>{'() => void'}</td><td>추천화법 버튼 클릭 핸들러</td></tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
  argTypes: {
    rank: { control: { type: 'number', min: 1, max: 99 }, description: '순위 번호' },
    title: { control: 'text', description: '상품명' },
    subtitle: { control: 'text', description: '부제목' },
    status: {
      control: 'select',
      options: ['accept', 'reject'],
      description: '인수 가능 여부',
    },
    checked: { control: 'boolean', description: '체크박스 상태' },
    features: { table: { disable: true } },
    onCheckedChange: { action: 'checkedChange' },
    onChatClick: { action: 'chatClicked' },
  },
  args: {
    rank: 1,
    title: '한화 시그니처 여성 3N5간편건강보험3.0 2504',
    subtitle: '2종. 납입면제 강화형.\n납입후 50% 해약환급금지급형',
    features: [
      '12형(365간편고지형) (올인원랜) (5-12형)',
      '30년납/100세만기/10년',
      '건강고지형Ⅱ(6년)',
      '암/뇌/심장/수술/치료비',
    ],
    status: 'accept',
    checked: false,
  },
};

export default meta;
type Story = StoryObj<ProductCardProps>;

// ─── Default ──────────────────────────────────────────────────
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked ?? false);

    React.useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    return (
      <Gcol className="w-lg">
        <ProductCard
          {...args}
          checked={checked}
          onCheckedChange={(val) => {
            setChecked(val);
            args.onCheckedChange?.(val);
          }}
        />
      </Gcol>
    );
  },
};

// ─── 인수불가 상태 ─────────────────────────────────────────────
export const Rejected: Story = {
  name: '인수가능마크',
  render: (args) => (
    <Gcol className="w-lg">
      <ProductCard {...args} />
    </Gcol>
  ),
  args: {
    rank: 2,
    status: 'reject',
    title: '한화 생명 실버케어 간편보험 2504',
    subtitle: '1종. 기본형.\n납입후 0% 해약환급금지급형',
    features: [
      '10형(간편고지형)',
      '20년납/80세만기',
      '암/뇌/심장',
    ],
  },
};

// ─── 순위 없는 카드 ────────────────────────────────────────────
export const NoRank: Story = {
  name: '순위 배지 없음',
  render: (args) => (
    <Gcol className="w-lg">
      <ProductCard {...args} />
    </Gcol>
  ),
  args: {
    rank: undefined,
    title: '한화 건강플러스 종합보험',
    subtitle: '표준형.',
    features: ['암/뇌/심장/수술/치료비', '30년납/100세만기'],
  },
};

// ─── 목록 형태 ─────────────────────────────────────────────────
export const List: Story = {
  name: '목록 (여러 카드)',
  render: () => {
    const items: ProductCardProps[] = [
      {
        rank: 1,
        title: '한화 시그니처 여성 3N5간편건강보험3.0 2504',
        subtitle: '2종. 납입면제 강화형.\n납입후 50% 해약환급금지급형',
        features: [
          '12형(365간편고지형) (올인원랜) (5-12형)',
          '30년납/100세만기/10년',
          '건강고지형Ⅱ(6년)',
          '암/뇌/심장/수술/치료비',
        ],
        status: 'accept',
      },
      {
        rank: 2,
        title: '한화 생명 실버케어 간편보험 2504',
        subtitle: '1종. 기본형.\n납입후 0% 해약환급금지급형',
        features: ['10형(간편고지형)', '20년납/80세만기', '암/뇌/심장'],
        status: 'accept',
      },
      {
        rank: 3,
        title: '한화 퍼펙트케어 플러스 2503',
        subtitle: '3종. 납입면제 강화형.',
        features: ['15형', '20년납/90세만기/15년', '암/수술/치료비'],
        status: 'reject',
      },
    ];

    const [checkedSet, setCheckedSet] = React.useState<Set<number>>(new Set());

    const toggle = (idx: number) => {
      setCheckedSet((prev) => {
        const next = new Set(prev);
        next.has(idx) ? next.delete(idx) : next.add(idx);
        return next;
      });
    };

    return (
      <Gcol className="w-lg gap-4">
        {items.map((item, idx) => (
          <ProductCard
            key={idx}
            {...item}
            checked={checkedSet.has(idx)}
            onCheckedChange={() => toggle(idx)}
          />
        ))}
      </Gcol>
    );
  },
};
