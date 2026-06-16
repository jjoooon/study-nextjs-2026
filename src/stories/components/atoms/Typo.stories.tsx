/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol, Grow, Typo } from '@atoms';

const VARIANT_OPTIONS = [
  'heading-xl',
  'heading-lg',
  'heading-md',
  'heading-sm',
  'heading-xs',

  'body-xl',
  'body-lg',
  'body-md',
  'body-sm',
  'body-xs',

  'button-lg',
  'button-md',
  'button-sm',
  'button-xs',

  'amount-md',
  'amount-xs',
] as const;

const WEIGHT_OPTIONS = ['normal', 'bold', 'semibold'] as const;
const COLOR_OPTIONS = [
  'default',
  'gray-light',
  'gray',
  'blueGray',
  'danger',
  'primary',
  'secondary',
  'information',
  'green',
] as const;
const TAG_OPTIONS = ['span', 'p', 'div', 'strong', 'label', 'h1', 'h2', 'h3'] as const;

const ICON_OPTIONS = [null, 'info', 'warning', 'detail', 'dot', 'dotBig', 'hash', 'dash', 'star'] as const;

const meta: Meta<typeof Typo> = {
  title: 'Components/Atoms/Typo',
  component: Typo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="Typo"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화 (heading-xl, blueGray 등 누락 토큰 반영)',
          ]}
          overview="Typo는 프로젝트의 텍스트 스타일을 일관되게 적용하기 위한 타이포그래피 컴포넌트입니다. variant, weight, color, tag 조합으로 제목/본문/버튼/금액 텍스트를 표현합니다."
          usageCode={`import { Typo } from '@atoms';

<Typo
  tag="span"
  variant="heading-lg"
  weight="semibold"
  color="primary"
>
  텍스트
</Typo>`}
          apiReference={[
            {
              prop: 'tag',
              type: 'span | p | div | strong | label | h1 | h2 | h3',
              description: '렌더링할 HTML 태그 (@default "span")',
            },
            {
              prop: 'variant',
              type: 'heading-xl | heading-lg | heading-md | heading-sm | heading-xs | body-xl | body-lg | body-md | body-sm | body-xs | button-lg | button-md | button-sm | button-xs | amount-md | amount-xs',
              description: '텍스트 스타일 유형 (@default "body-md")',
            },
            {
              prop: 'weight',
              type: 'normal | bold | semibold',
              description: '텍스트 굵기 토큰',
            },
            {
              prop: 'color',
              type: 'default | gray-light | gray | blueGray | danger | primary | secondary | information | green',
              description: '텍스트 색상 (@default "default")',
            },
            {
              prop: 'icon',
              type: 'info | warning | detail | dot | hash | ref | dash | star | dotBig',
              description: '텍스트 왼쪽에 아이콘 표시 및 정렬/들여쓰기 적용',
            },
            {
              prop: 'children',
              type: 'ReactNode',
              description: '표시할 텍스트 및 콘텐츠',
            },
            {
              prop: 'className',
              type: 'string',
              description: '추가 스타일 클래스명',
            },
            {
              prop: 'style',
              type: 'CSSProperties',
              description: '커스텀 인라인 스타일',
            },
          ]}
        >
          <h2>Variants</h2>
          <p>대표적인 타이포 스타일 예시는 아래와 같습니다.</p>
          <Unstyled>
            <Gcol gap="4" placement="cc">
              {VARIANT_OPTIONS.map((variant) => (
                <Grow
                  key={variant}
                  placement="bwc"
                  className="justify-between border-b border-[#E5E5E5] pb-[0.4rem] gap-[2rem] w-[40rem]"
                >
                  <Typo variant="body-sm" color="gray">
                    {variant}
                  </Typo>
                  <Typo variant={variant}>
                    {variant === 'amount-md' || variant === 'amount-xs' ? '123,456' : '샘플 텍스트 Sample Text 123'}
                  </Typo>
                </Grow>
              ))}
            </Gcol>
          </Unstyled>
        </StoryDocTemplate>
      ),
    },
    controls: { expanded: false },
  },
  argTypes: {
    tag: {
      control: 'select',
      options: TAG_OPTIONS,
      description: '렌더링 HTML 태그명',
      table: {
        category: 'Semantic',
        type: { summary: 'string' },
        defaultValue: { summary: 'span' },
      },
    },
    variant: {
      control: 'select',
      options: VARIANT_OPTIONS,
      description: '텍스트 크기/행간/스타일 유형',
      table: {
        category: 'Appearance',
        type: { summary: VARIANT_OPTIONS.join(' | ') },
        defaultValue: { summary: 'body-md' },
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
        defaultValue: { summary: 'default' },
      },
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: '텍스트 왼쪽에 아이콘 표시',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: '표시할 텍스트 콘텐츠',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: '추가 스타일 클래스명',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    style: {
      control: 'object',
      description: '인라인 CSS 스타일 객체',
      table: {
        category: 'Appearance',
        type: { summary: 'CSSProperties' },
      },
    },
  },
  args: {
    tag: 'span',
    variant: 'body-md',
    weight: 'normal',
    color: 'default',
    icon: undefined,
    children: '샘플용 Typography 0123\n샘플용 Typography 0123',
  },
};

export default meta;
type Story = StoryObj<typeof Typo>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <Typo {...args}>
          샘플용 Typography 0123
          <br />
          샘플용 Typography 0123
        </Typo>
      </>
    );
  },
};
