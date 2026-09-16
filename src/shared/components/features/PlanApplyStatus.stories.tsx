/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { PlanApplyStatus, PlanApplyItem, PlanApplyStatusType } from './PlanApplyStatus';
import { Button } from '@uiux/Button';

const meta: Meta<typeof PlanApplyStatus> = {
  title: 'Shared/Features/PlanApplyStatus',
  component: PlanApplyStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PlanApplyStatus>;

/**
 * 1. [인터랙티브 실시간 샘플] 두 개 항목 (알릴사항 + 담보감액)
 * - '진행' 클릭 시 1.5초 간격으로 상태가 실시간 업데이트되며 2단계로 진행되는 샘플입니다.
 */
export const LiveSimulation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<PlanApplyItem[]>([
      {
        id: 'notice',
        title: '알릴사항',
        description: '보험금 지급을 기준으로 일부 항목을 자동으로 반영합니다.',
        warningNotice:
          '조회정보를 기준으로 추정입력되며 (예: 완치여부) 실제 사실관계와 다를 수 있으므로 반드시 고객에게 확인바랍니다.',
        status: 'idle',
      },
      {
        id: 'reduction',
        title: '담보감액',
        description: '심사결과 가입불가한 담보를 조정하며, 동시가입조건의 담보도 함께 조정합니다.',
        warningNotice: '추가확인 또는 입력이 필요한 경우 해당 입력화면으로 이동합니다.',
        status: 'idle',
      },
    ]);

    // 실시간 진행 시뮬레이션
    const handleStart = () => {
      // 1. 알릴사항 반영중 시작
      setItems((prev) =>
        prev.map((item) => (item.id === 'notice' ? { ...item, status: 'processing' } : item))
      );

      // 2. 1.5초 후 알릴사항 완료 및 담보감액 반영중 시작
      setTimeout(() => {
        setItems((prev) =>
          prev.map((item) =>
            item.id === 'notice'
              ? { ...item, status: 'success' }
              : item.id === 'reduction'
              ? { ...item, status: 'processing' }
              : item
          )
        );
      }, 1500);

      // 3. 3초 후 담보감액 완료 (전체 완료)
      setTimeout(() => {
        setItems((prev) =>
          prev.map((item) => (item.id === 'reduction' ? { ...item, status: 'success' } : item))
        );
      }, 3000);
    };

    const handleReset = () => {
      setItems([
        {
          id: 'notice',
          title: '알릴사항',
          description: '보험금 지급을 기준으로 일부 항목을 자동으로 반영합니다.',
          warningNotice:
            '조회정보를 기준으로 추정입력되며 (예: 완치여부) 실제 사실관계와 다를 수 있으므로 반드시 고객에게 확인바랍니다.',
          status: 'idle',
        },
        {
          id: 'reduction',
          title: '담보감액',
          description: '심사결과 가입불가한 담보를 조정하며, 동시가입조건의 담보도 함께 조정합니다.',
          warningNotice: '추가확인 또는 입력이 필요한 경우 해당 입력화면으로 이동합니다.',
          status: 'idle',
        },
      ]);
      setOpen(true);
    };

    return (
      <div className="flex flex-col gap-4 items-center justify-center p-8 bg-slate-50 rounded-xl">
        <Button variant="contained" size="xl" onClick={handleReset}>
          설계반영 팝업 열기 (실시간 진행 시뮬레이션)
        </Button>

        <PlanApplyStatus
          open={open}
          onOpenChange={setOpen}
          items={items}
          onStart={handleStart}
          onConfirm={() => alert('설계반영이 최종 완료되었습니다.')}
          onNavigate={(item) => alert(`${item?.title || '입력'} 화면으로 이동합니다.`)}
        />
      </div>
    );
  },
};

/**
 * 2. [오류 발생 케이스] 추가확인 필요 시 화면이동 버튼 활성화
 */
export const ErrorOccurred: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<PlanApplyItem[]>([
      {
        id: 'notice',
        title: '알릴사항',
        status: 'idle',
      },
      {
        id: 'reduction',
        title: '담보감액',
        status: 'idle',
      },
    ]);

    const handleStart = () => {
      // 알릴사항 반영중
      setItems((prev) =>
        prev.map((item) => (item.id === 'notice' ? { ...item, status: 'processing' } : item))
      );

      // 1.5초 후 알릴사항에 오류 발생
      setTimeout(() => {
        setItems((prev) =>
          prev.map((item) => (item.id === 'notice' ? { ...item, status: 'error' } : item))
        );
      }, 1500);
    };

    const handleOpen = () => {
      setItems([
        { id: 'notice', title: '알릴사항', status: 'idle' },
        { id: 'reduction', title: '담보감액', status: 'idle' },
      ]);
      setOpen(true);
    };

    return (
      <div className="flex flex-col gap-4 items-center justify-center p-8 bg-slate-50 rounded-xl">
        <Button variant="contained" size="xl" onClick={handleOpen}>
          오류 발생 케이스 팝업 열기
        </Button>

        <PlanApplyStatus
          open={open}
          onOpenChange={setOpen}
          items={items}
          onStart={handleStart}
          onNavigate={(item) => alert(`${item?.title || '해당'} 입력 화면으로 이동합니다.`)}
        />
      </div>
    );
  },
};

/**
 * 3. [단일 항목 케이스] 알릴사항 1개만 나올 때
 */
export const SingleItemNotice: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<PlanApplyItem[]>([
      {
        id: 'notice',
        title: '알릴사항',
        description: '보험금 지급을 기준으로 일부 항목을 자동으로 반영합니다.',
        warningNotice:
          '조회정보를 기준으로 추정입력되며 (예: 완치여부) 실제 사실관계와 다를 수 있으므로 반드시 고객에게 확인바랍니다.',
        status: 'idle',
      },
    ]);

    const handleStart = () => {
      setItems([{ ...items[0], status: 'processing' }]);
      setTimeout(() => {
        setItems([{ ...items[0], status: 'success' }]);
      }, 2000);
    };

    return (
      <div className="flex flex-col gap-4 items-center justify-center p-8 bg-slate-50 rounded-xl">
        <Button variant="outlined" size="xl" onClick={() => setOpen(true)}>
          알릴사항 단일 팝업 열기
        </Button>

        <PlanApplyStatus
          open={open}
          onOpenChange={setOpen}
          items={items}
          onStart={handleStart}
          onConfirm={() => alert('완료되었습니다.')}
        />
      </div>
    );
  },
};

/**
 * 4. [단일 항목 케이스] 담보감액 1개만 나올 때
 */
export const SingleItemReduction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<PlanApplyItem[]>([
      {
        id: 'reduction',
        title: '담보감액',
        description: '심사결과 가입불가한 담보를 조정하며, 동시가입조건의 담보도 함께 조정합니다.',
        warningNotice: '추가확인 또는 입력이 필요한 경우 해당 입력화면으로 이동합니다.',
        status: 'idle',
      },
    ]);

    const handleStart = () => {
      setItems([{ ...items[0], status: 'processing' }]);
      setTimeout(() => {
        setItems([{ ...items[0], status: 'success' }]);
      }, 2000);
    };

    return (
      <div className="flex flex-col gap-4 items-center justify-center p-8 bg-slate-50 rounded-xl">
        <Button variant="outlined" size="xl" onClick={() => setOpen(true)}>
          담보감액 단일 팝업 열기
        </Button>

        <PlanApplyStatus
          open={open}
          onOpenChange={setOpen}
          items={items}
          onStart={handleStart}
          onConfirm={() => alert('완료되었습니다.')}
        />
      </div>
    );
  },
};
