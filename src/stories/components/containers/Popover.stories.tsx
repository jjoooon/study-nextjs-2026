/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Canvas,
  Source,
  Markdown,
  Unstyled,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { PlusIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';

type PopoverContentProps = React.ComponentProps<typeof PopoverContent>;

const meta: Meta<PopoverContentProps> = {
  title: 'Components/Containers/Popover',
  component: PopoverContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />
            <h2>History</h2>
            <ul>
              <li>2026.03.30</li>
            </ul>
            <h2>Overview</h2>
            <div>
              <p>
                Popover 컴포넌트는 다양한 트리거와 컨텐츠, 애니메이션, 커스텀 스타일을 지원하는 오버레이 UI입니다.
                <br />
                <b>PopoverContent</b>의 props를 통해 다양한 동작과 스타일을 제어할 수 있습니다.
              </p>
            </div>
            <Primary />
            <Controls />
            <h2>Usage</h2>
            <Markdown>
              {`
  import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';

  <Popover>
    <PopoverTrigger asChild>
      <Button>트리거</Button>
    </PopoverTrigger>
    <PopoverContent motion="fade" closeButton align="start">
      Popover 내용
    </PopoverContent>
  </Popover>
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
                <tr>
                  <td>motion</td>
                  <td>&apos;fade&apos; | &apos;scale&apos; | &apos;none&apos;</td>
                  <td>애니메이션 효과</td>
                </tr>
                <tr>
                  <td>variant</td>
                  <td>&apos;default&apos; 등</td>
                  <td>스타일 variant</td>
                </tr>
                <tr>
                  <td>closeButton</td>
                  <td>boolean</td>
                  <td>닫기 버튼 표시</td>
                </tr>
                <tr>
                  <td>align</td>
                  <td>&apos;start&apos; | &apos;center&apos; | &apos;end&apos;</td>
                  <td>정렬</td>
                </tr>
                <tr>
                  <td>side</td>
                  <td>&apos;top&apos; | &apos;right&apos; | &apos;bottom&apos; | &apos;left&apos;</td>
                  <td>위치</td>
                </tr>
                <tr>
                  <td>className</td>
                  <td>string</td>
                  <td>커스텀 클래스</td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    },
  },
  argTypes: {
    motion: {
      control: { type: 'select' },
      options: ['fade', 'scale', 'none'],
      description: '애니메이션 모션',
      table: { category: 'PopoverContent' },
    },
    variant: {
      control: { type: 'select' },
      options: ['default'],
      description: 'PopoverContent variant',
      table: { category: 'PopoverContent' },
    },
    closeButton: {
      control: { type: 'boolean' },
      description: '닫기 버튼 표시',
      table: { category: 'PopoverContent' },
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: '정렬',
      table: { category: 'PopoverContent' },
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: '위치',
      table: { category: 'PopoverContent' },
    },

    children: { table: { disable: true } },
    portalContainer: { table: { disable: true } },
    classWrap: { table: { disable: true } },
    variantStyles: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    motion: 'fade',
    variant: 'default',
    closeButton: true,
    align: 'center',
    side: 'bottom',
    className: '',
    children: 'Popover 내용',
  },
};

export default meta;
type Story = StoryObj<PopoverContentProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Grow>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outlined'} color={'coolgray'}>
              기본 Popover
              <PlusIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent {...args}>
            <Gcol className="w-[11rem]">
              <Button variant={'outlined'} color={'coolgray'} className='w-full'>
                옵션 1
              </Button>
              <Button variant={'outlined'} color={'coolgray'} className='w-full'>
                옵션 2
              </Button>
            </Gcol>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'text'} color={'link'}>
              기본 Popover
            </Button>
          </PopoverTrigger>
          <PopoverContent {...args}>
            <Gcol className="w-[11rem]">
              <Grow className='w-full'>
                <Typo variant={'body-xl'}>안면부창상봉합술치료발생금(1일1회,급여)(CLA09217)</Typo>
              </Grow>
              <Gcol>
                <Typo variant={'body-sm'}>
                  질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여
                  “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)
                </Typo>
              </Gcol>
            </Gcol>
          </PopoverContent>
        </Popover>
      </Grow>
    );
  },
};
