/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol } from '@atoms';
import { DesignStart, DesignGeneration, LTPA350Step1, LTPA350Step2 } from '@features/MainFoot';

const meta: Meta<typeof DesignStart> = {
  title: 'Components/Features/MainFoot',
  component: DesignStart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="MainFoot"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화 (onCalcGuidelineClick 반영)',
          ]}
          overview={`MainFoot 컴포넌트는 페이지 하단의 액션 버튼 및 하단 정보(초기화, 설계시작, 설계생성 등)를 일원화하여 제공하는 영역입니다.
업무 단계에 맞춰 다양한 푸터 컴포넌트(DesignStart, DesignGeneration, LTPA350Step1, LTPA350Step2)를 조합하여 사용합니다.`}
          usageCode={`import { DesignStart, DesignGeneration, LTPA350Step1, LTPA350Step2 } from '@/shared/components/features/MainFoot';

// 설계 최초 시작 단계
<DesignStart />

// 설계 생성 단계
<DesignGeneration />

// LTPA350 업무 특화 푸터들
<LTPA350Step1 />
<LTPA350Step2 onCalcGuidelineClick={() => console.log('계산')} />`}
          apiReference={[
            {
              prop: 'onCalcGuidelineClick',
              type: '() => void',
              description: '보험료계산(지침) 버튼 클릭 시 호출되는 콜백 함수 (LTPA350Step2)',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    onCalcGuidelineClick: {
      action: 'calcGuidelineClicked',
      description: '보험료계산(지침) 버튼 클릭 콜백',
      table: { category: 'Events' },
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof DesignStart>;

export const Default: Story = {
  render: (args: unknown) => {
    const { onCalcGuidelineClick } = args as { onCalcGuidelineClick?: () => void };
    return (
      <Gcol gap="4" className="w-[1000px]">
        <DesignStart />
        <DesignGeneration />
        <LTPA350Step1 />
        <LTPA350Step2 onCalcGuidelineClick={onCalcGuidelineClick} />
      </Gcol>
    );
  },
  args: {},
};
