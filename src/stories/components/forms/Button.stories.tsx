/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Link from 'next/link';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol, Grow } from '@atoms';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Forms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <StoryDocTemplate
            overview={`Button 컴포넌트는 사용자 액션을 실행하는 핵심 인터랙션 요소입니다.
variant, color, size, only 조합으로 일반 버튼과 아이콘 버튼을 일관된 규칙으로 구성할 수 있습니다.`}
            history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
            usageCode={`
import Link from 'next/link';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';

<Button
  variant="contained"
  color="primary"
  size="md"
>
  버튼
</Button>

<Button only="icon" aria-label="검색">
  <SearchIcon />
</Button>

<Button asChild>
  <Link href="/login">로그인</Link>
</Button>
            `}
          >
            <h2>Variant</h2>
            <p>Button 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Grow
              gap={2}
              className="flex-wrap p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Button variant="contained">contained</Button>
              <Button variant="outlined">outlined</Button>
              <Button variant="rounded">rounded</Button>
              <Button variant="text">text</Button>
              <Button variant="none">none</Button>
              <Button variant="banner" size="md" className="w-[16rem]">
                banner
              </Button>
              <Button variant="state" size="md" className="w-[16rem]">
                state
              </Button>
            </Grow>

            <h2 className="mt-8">Color</h2>
            <p>Button 컴포넌트에서 사용할 수 있는 color 옵션은 다음과 같습니다.</p>
            <Grow
              gap={2}
              className="flex-wrap p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Button color="primary">primary</Button>
              <Button color="secondary">secondary</Button>
              <Button color="gray">gray</Button>
              <Button color="gray-light">gray-light</Button>
              <Button color="coolgray">coolgray</Button>
              <Button color="coolgray-light">coolgray-light</Button>
              <Button color="success">success</Button>
              <Button color="link">link</Button>
              <Button color="transparent">transparent</Button>
            </Grow>

            <h2 className="mt-8">Coolgray Tone</h2>
            <p>coolgray 계열 스타일 차이는 아래 예시로 확인할 수 있습니다.</p>
            <Gcol
              gap={4}
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Grow gap={2} className="flex-wrap">
                <Button variant="contained" color="coolgray">
                  contained coolgray
                </Button>
                <Button variant="contained" color="coolgray-light">
                  contained coolgray-light
                </Button>
              </Grow>
              <Grow gap={2} className="flex-wrap">
                <Button variant="outlined" color="coolgray">
                  outlined coolgray
                </Button>
                <Button variant="outlined" color="coolgray-light">
                  outlined coolgray-light
                </Button>
              </Grow>
              <Grow gap={2} className="flex-wrap">
                <Button variant="text" color="coolgray">
                  text coolgray
                </Button>
                <Button variant="text" color="coolgray-light">
                  text coolgray-light
                </Button>
              </Grow>
            </Gcol>

            <h2 className="mt-8">Size</h2>
            <p>Button 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Grow
              gap={2}
              placement="ec"
              className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Button size="xl">xl</Button>
              <Button size="lg">lg</Button>
              <Button size="md">md</Button>
              <Button size="sm">sm</Button>
              <Button size="xs">xs</Button>
            </Grow>

            <h2 className="mt-8">Icon / AsChild / Disabled</h2>
            <p>아이콘 버튼, 링크 버튼, 비활성 버튼 사용 예시는 다음과 같습니다.</p>
            <Grow
              gap={2}
              className="flex-wrap p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
            >
              <Button only="icon" aria-label="검색">
                <SearchIcon />
              </Button>
              <Button asChild variant="outlined" color="link">
                <Link href="/login">로그인 링크</Link>
              </Button>
              <Button disabled>disabled</Button>
            </Grow>
          </StoryDocTemplate>
        );
      },
    },
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      table: { category: '이벤트 props' },
    },
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text', 'none', 'banner', 'state', 'rounded'],
      table: { category: '스타일 props' },
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'gray',
        'gray-light',
        'coolgray',
        'coolgray-light',
        'success',
        'link',
        'transparent',
      ],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['xl', 'lg', 'md', 'sm', 'xs'],
      table: { category: '스타일 props' },
    },
    only: {
      control: { type: 'select' },
      options: ['default', 'icon'],
      table: { category: '스타일 props' },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    children: {
      control: { type: 'text' },
      table: { category: '설정 props' },
    },
    effect: {
      control: { type: 'select' },
      options: [null, 'flash'],
      table: { category: '설정 props' },
    },
    className: {
      table: { disable: true },
    },
    type: {
      table: { disable: true },
    },
    asChild: {
      control: { type: 'boolean' },
      table: { disable: true },
    },
  },
  args: {
    children: '버튼',
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    only: 'default',
    asChild: false,
    disabled: false,
    effect: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args}>{args.children}</Button>,
};
