import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Grow, Gcol, Typo, FormTable, FormCell, FormItem } from '@/shared/components/common';
import { Button, TableRow } from '@/shared/components/uiux';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/uiux/AlertDialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/UIUX/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
AlertDialog는 사용자의 주의가 필요한 작업(삭제, 취소, 되돌릴 수 없는 변경 등) 전에 확인을 받기 위한 컴포넌트이다.
명확한 제목, 설명, 확인/취소 액션으로 중요한 결정을 안전하게 유도한다.

- **Trigger**로 다이얼로그를 열고,
- **Action / Cancel**로 사용자의 최종 선택을 처리한다.
- 일반 케이스에서는 **AlertDialogContent**를 사용하면 내부에서 **Portal/Overlay**가 자동 적용된다.

---

<br>
#### **기본 AlertDialog: Usage**
\`\`\`tsx
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/shared/components/uiux/AlertDialog';
import { Button } from '@/shared/components/uiux';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="contained">다이얼로그 열기</Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
      <AlertDialogDescription>삭제 후에는 되돌릴 수 없습니다.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction>확인</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
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
  },
  args: {
    defaultOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

const BaseDialog = ({
  title,
  description,
  cancelText,
  actionText,
}: {
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{cancelText}</AlertDialogCancel>
        <AlertDialogAction>{actionText}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export const Default: Story = {
  render: (args) => {
    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <AlertDialog {...args}>
            <AlertDialogTrigger asChild>
              <Button variant="contained" size="lg">
                열기
              </Button>
            </AlertDialogTrigger>
            <BaseDialog
              title="정말 삭제하시겠습니까?"
              description="삭제 후에는 복구할 수 없습니다. 계속 진행하시려면 확인을 눌러주세요."
              cancelText="취소"
              actionText="삭제"
            />
          </AlertDialog>
        </StoryBox>

        <StoryBox>
          <Grow placement="cc" className="gap-4">
            <Gcol placement="ss" className="gap-[0.4rem]">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outlined" color="gray" size="lg">
                    열기
                  </Button>
                </AlertDialogTrigger>
                <BaseDialog
                  title="변경사항을 저장할까요?"
                  description="작성 중인 내용이 저장되지 않으면 사라질 수 있습니다."
                  cancelText="닫기"
                  actionText="저장"
                />
              </AlertDialog>
            </Gcol>
          </Grow>
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
      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <Button variant="contained">Controlled Open</Button>
        </AlertDialogTrigger>
        <BaseDialog
          title="제어형 다이얼로그"
          description="open / onOpenChange로 외부 상태를 직접 제어하는 예시입니다."
          cancelText="취소"
          actionText="확인"
        />
      </AlertDialog>
    );
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => {
    return (
      <AlertDialog defaultOpen={args.defaultOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outlined" color="gray">
            기본 열림
          </Button>
        </AlertDialogTrigger>
        <BaseDialog
          title="처음부터 열린 상태"
          description="defaultOpen이 true면 최초 렌더링 시 다이얼로그가 열린 상태로 시작합니다."
          cancelText="닫기"
          actionText="확인"
        />
      </AlertDialog>
    );
  },
};

export const Form: Story = {
  render: () => {
    return (
      <FormTable variant="boxIn" caption="중요 작업 확인" cols={['w-[10rem] min-w-[10rem]', '']}>
        <TableRow>
          <FormCell title="데이터 삭제">
            <FormItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="contained" color="secondary" size="sm">
                    삭제 요청
                  </Button>
                </AlertDialogTrigger>
                <BaseDialog
                  title="입력된 데이터를 삭제할까요?"
                  description="삭제 후에는 다시 복구할 수 없습니다. 정말 진행하시겠습니까?"
                  cancelText="취소"
                  actionText="삭제"
                />
              </AlertDialog>
            </FormItem>
          </FormCell>
        </TableRow>
      </FormTable>
    );
  },
};

export const PortalOverlay: Story = {
  render: () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outlined" color="gray">
            Portal / Overlay
          </Button>
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogPrimitive.Content className="bg-white fixed top-1/2 left-1/2 z-50 w-lg -translate-x-1/2 -translate-y-1/2 rounded-[1rem] p-4 shadow-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Portal/Overlay 명시 조합</AlertDialogTitle>
              <AlertDialogDescription>
                AlertDialogContent 대신 Portal과 Overlay를 직접 조합한 고급 케이스입니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogPrimitive.Content>
        </AlertDialogPortal>
      </AlertDialog>
    );
  },
};
