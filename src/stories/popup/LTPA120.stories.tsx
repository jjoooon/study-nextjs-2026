/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Ltpa120, Ltpa120Props } from '@/shared/components/features/Ltpa120';
import { Button } from '@uiux/Button';
import { LayoutDoc } from '@layout/BaseLayout';

const IMAGE_PRESETS = ['/images/AI_01_b2.svg', '/images/AI_02_b2.svg', '/images/AI_03_b2.svg'];

const meta: Meta<typeof Ltpa120> = {
  title: 'app/popup/LTPA120',
  component: Ltpa120,
  argTypes: {
    buttonImageSrc: {
      control: 'select',
      options: IMAGE_PRESETS,
      description: '버튼에 표시될 이미지 경로 (3가지 프리셋 선택 가능)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/images/AI_01_b2.svg' },
      },
    },
    isButton: {
      control: 'boolean',
      description: '버튼 형태로 렌더링할지 여부',
      defaultValue: true,
    },
    borderWidth: {
      control: 'radio',
      options: [1, 2],
      description: '콘텐츠 영역(하단 챗봇 박스)의 테두리 두께 (1px 또는 2px)',
      table: {
        type: { summary: '1 | 2' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    buttonImageSrc: '/images/AI_01_b2.svg',
    isButton: true,
    borderWidth: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Ltpa120>;

export const Default: Story = {
  render: (args: Ltpa120Props) => {
    return (
      <LayoutDoc>
        <div className="flex flex-col items-center justify-center min-h-[50rem] gap-6 p-8">
          <div className="text-center">
            <h2 className="text-[1.8rem] font-bold mb-2">LTPA120 (AI 챗봇 백프로)</h2>
            <p className="text-[1.4rem] text-[var(--color-gray-60)]">
              스토리북 우측/하단 <b>Controls</b> 패널에서 <b>buttonImageSrc</b>를 변경하여 3가지 이미지를 교체해 보세요.
            </p>
          </div>

          <div className="p-8 border border-dashed border-[var(--color-gray-30)] rounded-xl flex items-center justify-center bg-[var(--color-gray-5)]">
            <Ltpa120 {...args} />
          </div>
        </div>
      </LayoutDoc>
    );
  },
};

export const DirectPopup: Story = {
  render: (args: Ltpa120Props) => {
    const [open, setOpen] = React.useState(true);
    return (
      <LayoutDoc>
        <div className="flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto">
          <Button variant={'contained'} onClick={() => setOpen(true)}>
            Ltpa120 열기
          </Button>
        </div>

        <Ltpa120 {...args} open={open} setOpen={setOpen} isButton={false} />
      </LayoutDoc>
    );
  },
};
