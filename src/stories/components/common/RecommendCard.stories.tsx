import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';

import { Grow, Typo } from '@atoms';
import { RecommendCard } from '@common/RecommendCard';
import { CircleCheckIcon, ChevronDownIcon } from '@icons';
import { Button } from '@uiux/Button';

const comparisonRows: Array<{ id: number; coverage: string; amount: string; premium: string }> = [
  { id: 1, coverage: '보통약관(상해80%이상후유장해)', amount: '3,000', premium: '3,000' },
  { id: 2, coverage: '보험료납입면제대상보장(5대유사)', amount: '10', premium: '10' },
  { id: 3, coverage: '상해사망(간편)', amount: '15,000', premium: '15,000' },
  { id: 4, coverage: '상해후유장해(3-100%)', amount: '10,000', premium: '10,000' },
  { id: 5, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 6, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 7, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 8, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 9, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
  { id: 10, coverage: '질병사망(간편)', amount: '10,000', premium: '10,000' },
];

const meta: Meta<typeof RecommendCard> = {
  title: 'Components/Common/RecommendCard',
  component: RecommendCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <br />
          <h2>History</h2>
          <ul>
            <li>2026.04.09</li>
          </ul>

          <h2>Overview</h2>
          <p>
            RecommendCard는 AI 추천 상품 카드 컴포넌트입니다.
            <br />
            <code>variant=&apos;normal&apos;</code>: 상품명/플랜/기간/상세 정보와 AI 추천이유 버튼을 표시합니다.
            <br />
            <code>variant=&apos;checkbox&apos;</code>: 기본형 레이아웃에 체크박스를 함께 표시합니다.
            <br />
            <code>variant=&apos;free&apos;</code>: 흰 영역(<code>children</code>)과 하단 버튼 영역(
            <code>footer</code>)을 자유롭게 구성할 수 있습니다.
          </p>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
// normal variant
<RecommendCard
  variant={'normal'}
  title="한화 시그니처 여성 간편건강보험4.0"
  plan="납입면제형 · 기본형 · 3N5간편고지형"
  term="20년납/100세만기"
  detail="9형(355간편고지형(고혈압및당뇨추가고지))..."
/>

// free variant
<RecommendCard
  variant={'free'}
  footer={
    <Button color="primary" onClick={() => {}} only="default" size="lg" variant="none">
      확인
    </Button>
  }
>
  <Typo tag={'strong'} variant={'body-xl'}>
    내 커스텀 내용
  </Typo>
</RecommendCard>
\`\`\`
`}
          </Markdown>
        </>
      ),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '40rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecommendCard>;

export const Normal: Story = {
  name: 'Normal',
  args: {
    variant: 'normal',
    title: '한화 시그니처 여성 간편건강보험4.0',
    plan: ['납입면제형', '기본형', '3N5간편고지형'],
  },
};

export const NormalWithCheckbox: Story = {
  name: 'Checkbox',
  args: {
    variant: 'checkbox',
    title: '한화 시그니처 여성 간편건강보험4.0',
    plan: ['납입면제형', '기본형', '3N5간편고지형'],
  },
};

export const Free: Story = {
  name: 'Free — 자유 구성',
  render: () => (
    <RecommendCard
      variant={'free'}
      footer={
        <Button color="primary" onClick={() => {}} only="default" size="lg" variant="none">
          확인
        </Button>
      }
    >
      <Typo tag={'strong'} variant={'body-xl'}>
        내 커스텀 내용
      </Typo>
    </RecommendCard>
  ),
};

export const FreeWithMultipleChildren: Story = {
  name: 'Free — 다중 컨텐츠',
  render: () => (
    <RecommendCard
      variant={'free'}
      footer={
        <Button color="primary" onClick={() => {}} only="default" size="lg" variant="none">
          AI 추천이유
        </Button>
      }
    >
      <Typo tag={'strong'} variant={'body-xl'}>
        한화 시그니처 여성 간편건강보험4.0
      </Typo>
      <Typo tag={'p'} variant={'body-xs'} className="text-[#414141]">
        납입면제형 · 기본형 · 3N5간편고지형
      </Typo>
      <Typo tag={'p'} variant={'body-xs'} className="text-[#414141]">
        20년납/100세만기
      </Typo>
    </RecommendCard>
  ),
};

export const FreeFigma67931385: Story = {
  name: 'Free — Figma 679:31385',
  render: () => (
    <div style={{ width: '31.2rem' }}>
      <RecommendCard
        variant={'free'}
        className="[&>div]:bg-[#006FF2]!"
        footer={
          <Button color="primary" onClick={() => {}} only="default" size="lg" variant="none">
            확인
          </Button>
        }
      >
        <Grow className="w-full" placement="bwe">
          <div className="size-[2rem] rounded-[0.4rem] border border-[#D8D8D8] bg-white" />
          <Button variant="outlined" size="sm" color="gray-light" onClick={() => {}}>
            변경
          </Button>
        </Grow>

        <div className="w-full">
          <Grow className="w-full" placement="sc" gap={0.4}>
            <Typo tag={'p'} variant={'body-sm'} weight={'bold'} className="text-[#006FF2]">
              비교설계1
            </Typo>
            <Grow className="rounded-full bg-[#E0EFFF] px-[0.6rem] py-[0.2rem]" placement="sc" gap={0.2}>
              <CircleCheckIcon />
              <Typo tag={'span'} variant={'body-xs'} weight={'bold'} className="text-[#006FF2]">
                인수가능
              </Typo>
            </Grow>
          </Grow>
          <Typo tag={'strong'} variant={'body-xl'} className="mt-[0.4rem] block text-[#000]">
            한화 시그니처 여성 건강보험4.0 2504
          </Typo>
        </div>

        <div className="w-full rounded-[0.8rem] border border-[#CBE3FF] bg-[#EFF8FF] p-[1.2rem]">
          <div className="space-y-[0.4rem]">
            {[1, 2, 3].map((index) => (
              <button
                key={`select-row-${index}`}
                type="button"
                className="flex h-[2.5rem] w-full items-center justify-between rounded-[0.4rem] border border-[#CCC] bg-white px-[0.8rem]"
              >
                <Typo tag={'span'} variant={'body-md'} className="truncate text-[#000]">
                  {index === 1 && '납입면제 강화형, 납입후 50% 해약환급 금지급형'}
                  {index === 2 && '비대면진단심사플랜(20~40세)'}
                  {index === 3 && '1형(일반고지형)'}
                </Typo>
                <ChevronDownIcon size={12} className="text-[#666]" />
              </button>
            ))}
          </div>

          <div className="mt-[0.8rem] grid grid-cols-3 gap-[0.4rem]">
            {['20년납', '100세만기', '갱신 20년'].map((term) => (
              <button
                key={term}
                type="button"
                className="flex h-[2.5rem] items-center justify-between rounded-[0.4rem] border border-[#CCC] bg-white px-[0.8rem]"
              >
                <Typo tag={'span'} variant={'body-md'} className="truncate text-[#000]">
                  {term}
                </Typo>
                <ChevronDownIcon size={12} className="text-[#666]" />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden border border-[#E5E5E5] border-t-2 border-t-[#1E2124]">
          <div className="grid grid-cols-[1fr_8rem_8rem] bg-[#F4F4F4]">
            <div className="border-r border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] text-center">
              <Typo tag={'p'} variant={'body-md'} weight={'bold'}>
                담보명
              </Typo>
            </div>
            <div className="border-r border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] text-center">
              <Typo tag={'p'} variant={'body-md'} weight={'bold'}>
                가입금액(원)
              </Typo>
            </div>
            <div className="border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] text-center">
              <Typo tag={'p'} variant={'body-md'} weight={'bold'}>
                보험료(원)
              </Typo>
            </div>
          </div>

          <div className="max-h-120 overflow-y-auto">
            {comparisonRows.map((row, index) => (
              <div key={row.id} className={`grid grid-cols-[1fr_8rem_8rem] ${index % 2 === 1 ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
                <div className="border-r border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem]">
                  <Typo tag={'p'} variant={'body-md'} className="truncate text-[#000]">
                    {row.coverage}
                  </Typo>
                </div>
                <div className="border-r border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] text-right">
                  <Typo tag={'p'} variant={'body-md'} className="text-[#000]">
                    {row.amount}
                  </Typo>
                </div>
                <div className="border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] text-right">
                  <Typo tag={'p'} variant={'body-md'} className="text-[#000]">
                    {row.premium}
                  </Typo>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RecommendCard>
    </div>
  ),
};
