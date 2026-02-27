import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@/shared/components/common';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';

const VARIANT_OPTIONS = [
  'heading-lg',
  'heading-md',
  'heading-sm',
  'heading-xs',
  'body-lg',
  'body-md',
  'body-sm',
  'button-lg',
  'button-md',
  'button-sm',
  'amount-md',
  'amount-xs',
] as const;

const WEIGHT_OPTIONS = ['normal', 'bold', 'semibold'] as const;
const COLOR_OPTIONS = ['default', 'gray-light', 'gray', 'danger', 'primary', 'secondary', 'information'] as const;
const TAG_OPTIONS = ['span', 'p', 'div', 'strong', 'label', 'h1', 'h2', 'h3'] as const;

const meta: Meta<typeof Typo> = {
  title: 'Components/Common/Typo',
  component: Typo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Typo는 프로젝트의 텍스트 스타일을 일관되게 적용하기 위한 타이포그래피 컴포넌트이다.
variant, weight, color, tag 조합으로 제목/본문/버튼/금액 텍스트를 표현한다.

- - -

<br>
#### **Typo: Usage**
\`\`\`tsx
import { Typo } from '@/shared/components/common';

<Typo
  tag={"span"}
  variant={"heading-lg | body-md | button-sm | amount-md"}
  weight={"normal | semibold | bold"}
  color={"default | primary | danger"}
>
  텍스트
</Typo>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANT_OPTIONS,
      description: '텍스트 크기/행간/스타일 유형',
      table: {
        category: 'Appearance',
        type: { summary: VARIANT_OPTIONS.join(' | ') },
      },
    },
    weight: {
      control: 'select',
      options: WEIGHT_OPTIONS,
      description: '텍스트 굵기',
      table: {
        category: 'Appearance',
        type: { summary: WEIGHT_OPTIONS.join(' | ') },
      },
    },
    color: {
      control: 'select',
      options: COLOR_OPTIONS,
      description: '텍스트 색상',
      table: {
        category: 'Appearance',
        type: { summary: COLOR_OPTIONS.join(' | ') },
      },
    },
    tag: {
      control: 'select',
      description: '렌더링 HTML 태그',
      table: {
        category: 'Semantic',
      },
    },
    children: {
      control: 'text',
      description: '표시할 텍스트',
      table: { category: 'Content' },
    },
    className: { table: { disable: true } },
  },
  args: {
    tag: 'span',
    variant: 'body-md',
    weight: 'normal',
    color: 'default',
    children: 'Typo Sample Text',
  },
};

export default meta;
type Story = StoryObj<typeof Typo>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryWrap>
        <StoryBox className="w-2xl">
          <Grow placement="sc">
            <Typo {...args}>{args.children}</Typo>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const VariantGuide: Story = {
  render: () => {
    return (
      <StoryWrap>
        <StoryBox className="w-240">
          <Gcol className="gap-[0.8rem]">
            {VARIANT_OPTIONS.map((variant) => (
              <Grow key={variant} placement="bwc" className="justify-between border-b border-[#E5E5E5] pb-[0.4rem] gap-[2rem]">
                <Typo variant="body-sm" color="gray">
                  {variant}
                </Typo>
                <Typo variant={variant}>샘플 텍스트 Sample Text 123</Typo>
              </Grow>
            ))}
          </Gcol>
        </StoryBox>
      </StoryWrap>
    );
  },
};
