import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

const VARIANT_OPTIONS = [
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
const COLOR_OPTIONS = ['default', 'gray-light', 'gray', 'danger', 'primary', 'secondary', 'information', 'green'] as const;
const TAG_OPTIONS = ['span', 'p', 'div', 'strong', 'label', 'h1', 'h2', 'h3'] as const;

const ICON_OPTIONS = [null, 'info', 'warning', 'detail', 'dot', 'dotBig', 'hash', 'dash', 'star'] as const;

const meta: Meta<typeof Typo> = {
  title: 'Components/Atoms/Typo',
  component: Typo,
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
                Typo는 프로젝트의 텍스트 스타일을 일관되게 적용하기 위한 타이포그래피 컴포넌트입니다.
                `variant`, `weight`, `color`, `tag` 조합으로 제목/본문/버튼/금액 텍스트를 표현합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>기본 사용 예시는 아래와 같습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { Typo } from '@atoms';

<Typo
  tag="span"
  variant="heading-lg"
  weight="semibold"
  color="primary"
>
  텍스트
</Typo>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Typo 컴포넌트에서 사용할 수 있는 주요 prop 옵션입니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>tag</td><td>{TAG_OPTIONS.join(' | ')}</td><td>렌더링 HTML 태그</td></tr>
                <tr><td>variant</td><td>{VARIANT_OPTIONS.join(' | ')}</td><td>텍스트 스타일 유형</td></tr>
                <tr><td>weight</td><td>{WEIGHT_OPTIONS.join(' | ')}</td><td>텍스트 굵기</td></tr>
                <tr><td>color</td><td>{COLOR_OPTIONS.join(' | ')}</td><td>텍스트 색상</td></tr>
                <tr><td>icon</td><td>{ICON_OPTIONS.join(' | ')}</td><td>텍스트 왼쪽에 아이콘 표시</td></tr>
                <tr><td>children</td><td>ReactNode</td><td>표시할 텍스트</td></tr>
              </tbody>
            </table>

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
          </>
        );
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    icon: {
      control: 'inline-radio',
      options: ICON_OPTIONS,
      description: '텍스트 왼쪽에 아이콘 표시',
      table: {
        category: 'Appearance',
        type: { summary: ICON_OPTIONS.join(' | ') },
      },
    },
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
      control: 'text',
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
    style: { table: { disable: true } },
  },
  args: {
    tag: 'span',
    variant: 'body-md',
    weight: 'normal',
    color: 'default', // green도 선택 가능
    icon: undefined,
    children: '샘플용 Typography 0123<br/>샘플용 Typography 0123',
  },
};

export default meta;
type Story = StoryObj<typeof Typo>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <Typo {...args}>샘플용 Typography 0123<br/>샘플용 Typography 0123</Typo>
      </>
      
    );
  },
};
