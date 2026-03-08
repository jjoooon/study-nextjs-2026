import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ConfirmDialog } from '@common/ConfirmDialog';
import { Button } from '@uiux/Button';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';

type ConfirmDialogStoryProps = React.ComponentProps<typeof ConfirmDialog>;

const meta: Meta<ConfirmDialogStoryProps> = {
  title: 'Components/Common/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ConfirmDialog는 AlertDialog를 기반으로 확인/취소 흐름을 단순화한 공통 다이얼로그 컴포넌트이다.
파괴적 동작(danger), 일반 확인(info), 알림 전용(alertMode) 케이스를 동일 API로 처리한다.

- **trigger**로 다이얼로그 오픈 트리거를 직접 전달할 수 있다.
- **tone**으로 확인 버튼 톤(info/danger)을 제어한다.
- **alertMode**가 true면 취소 버튼이 숨겨진다.
- **onConfirm**이 Promise를 반환하면 처리 중 상태를 표시한다.

---

<br>
#### **기본 ConfirmDialog: Usage**
\`\`\`tsx
import { ConfirmDialog } from '@common/ConfirmDialog';
import { Button } from '@uiux/Button';

<ConfirmDialog
  title="정말 삭제하시겠습니까?"
  description="삭제 후에는 복구할 수 없습니다."
  confirmLabel="삭제"
  cancelLabel="취소"
  tone="danger"
  trigger={<Button variant="contained">삭제 요청</Button>}
/>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '다이얼로그 열림 상태(제어형)',
      table: { category: 'State' },
    },
    defaultOpen: {
      control: 'boolean',
      description: '다이얼로그 기본 열림 상태(비제어형)',
      table: { category: 'State' },
    },
    onOpenChange: {
      action: 'open changed',
      description: '열림 상태 변경 이벤트',
      table: { category: 'Events' },
    },
    title: {
      control: 'text',
      description: '다이얼로그 제목',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: '다이얼로그 설명',
      table: { category: 'Content' },
    },
    confirmLabel: {
      control: 'text',
      description: '확인 버튼 라벨',
      table: { category: 'Content' },
    },
    cancelLabel: {
      control: 'text',
      description: '취소 버튼 라벨',
      table: { category: 'Content' },
    },
    tone: {
      control: 'select',
      options: ['info', 'danger'],
      description: '확인 버튼 톤',
      table: { category: 'Appearance' },
    },
    alertMode: {
      control: 'boolean',
      description: '알림 모드(취소 버튼 숨김)',
      table: { category: 'Behavior' },
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 이벤트',
      table: { category: 'Events' },
    },
    onCancel: {
      action: 'canceled',
      description: '취소 버튼 클릭 이벤트',
      table: { category: 'Events' },
    },
    trigger: { table: { disable: true } },
    resolve: { table: { disable: true } },
  },
  args: {
    defaultOpen: false,
    title: '알림',
    description: '작업을 계속 진행할까요?',
    confirmLabel: '확인',
    cancelLabel: '취소',
    tone: 'info',
    alertMode: false,
  },
};

export default meta;
type Story = StoryObj<ConfirmDialogStoryProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <ConfirmDialog
            {...args}
            title="변경사항을 저장할까요?"
            description="작성 중인 내용이 저장되지 않으면 사라질 수 있습니다."
            confirmLabel="저장"
            cancelLabel="닫기"
            tone="info"
            trigger={
              <Button variant="contained" size="lg">
                기본 열기
              </Button>
            }
          />
        </StoryBox>

        <StoryBox>
          <ConfirmDialog
            {...args}
            title="입력 데이터를 삭제할까요?"
            description="삭제 후에는 복구할 수 없습니다."
            confirmLabel="삭제"
            cancelLabel="취소"
            tone="danger"
            trigger={
              <Button variant="outlined" color="secondary" size="lg">
                위험 작업 열기
              </Button>
            }
          />
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);
      args.onOpenChange?.(nextOpen);
    };

    return (
      <div className="flex items-center justify-center">
        <Button variant="contained" onClick={() => setOpen(true)}>
          Controlled Open
        </Button>

        <ConfirmDialog
          {...args}
          open={open}
          onOpenChange={handleOpenChange}
          title="제어형 ConfirmDialog"
          description="open / onOpenChange로 외부 상태를 직접 제어하는 예시입니다."
          confirmLabel="확인"
          cancelLabel="취소"
        />
      </div>
    );
  },
};

export const AlertMode: Story = {
  render: (args) => {
    return (
      <ConfirmDialog
        {...args}
        alertMode
        title="처리가 완료되었습니다"
        description="다음 단계로 이동해 주세요."
        confirmLabel="확인"
        cancelLabel=""
        trigger={
          <Button variant="outlined" color="gray">
            Alert Mode
          </Button>
        }
      />
    );
  },
};

export const AsyncConfirm: Story = {
  render: (args) => {
    return (
      <ConfirmDialog
        {...args}
        title="비동기 처리 확인"
        description="확인을 누르면 1.2초 동안 비동기 작업을 수행합니다."
        confirmLabel="실행"
        cancelLabel="취소"
        onConfirm={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1200));
        }}
        trigger={
          <Button variant="contained" color="secondary">
            Async Confirm
          </Button>
        }
      />
    );
  },
};
