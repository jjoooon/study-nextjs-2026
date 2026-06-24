/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Gcol, Grow } from '@atoms';
import { Button } from '@uiux/Button';
import { ConfirmDialog } from '@common/ConfirmDialog';

type ConfirmDialogStoryProps = React.ComponentProps<typeof ConfirmDialog>;

const meta: Meta<ConfirmDialogStoryProps> = {
  title: 'Components/Containers/ConfirmDialog',
  component: ConfirmDialog,
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
              <li>2026.03.27 수정</li>
            </ul>

            <h2>Overview</h2>
            <div>
              <p>
                ConfirmDialog는 AlertDialog를 기반으로 확인/취소 흐름을 단순화한 공통 다이얼로그 컴포넌트입니다.
                <br />
                파괴적 동작(danger), 일반 확인(info), 알림 전용(alertMode) 케이스를 동일 API로 처리합니다.
              </p>
              <ul>
                <li>
                  <b>trigger</b>로 다이얼로그 오픈 트리거를 직접 전달할 수 있습니다.
                </li>
                <li>
                  <b>tone</b>으로 확인 버튼 톤(info/danger)을 제어합니다.
                </li>
                <li>
                  <b>alertMode</b>가 true면 취소 버튼이 숨겨집니다.
                </li>
                <li>
                  <b>onConfirm</b>이 Promise를 반환하면 처리 중 상태를 표시합니다.
                </li>
              </ul>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>ConfirmDialog 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { ConfirmDialog } from '@common/ConfirmDialog';
import { Button } from '@uiux/Button';

<ConfirmDialog
  defaultOpen={false}
  title="정말 삭제하시겠습니까?"
  description="삭제 후에는 복구할 수 없습니다."
  confirmLabel="삭제"
  cancelLabel="취소"
  tone="danger"
  trigger={<Button>삭제 요청</Button>}
/>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>ConfirmDialog 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
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
                  <td>title</td>
                  <td>ReactNode</td>
                  <td>다이얼로그 제목</td>
                </tr>
                <tr>
                  <td>description</td>
                  <td>ReactNode</td>
                  <td>다이얼로그 설명</td>
                </tr>
                <tr>
                  <td>confirmLabel</td>
                  <td>string</td>
                  <td>확인 버튼 라벨</td>
                </tr>
                <tr>
                  <td>cancelLabel</td>
                  <td>string</td>
                  <td>취소 버튼 라벨</td>
                </tr>
                <tr>
                  <td>tone</td>
                  <td>&apos;info&apos; | &apos;danger&apos;</td>
                  <td>확인 버튼 톤</td>
                </tr>
                <tr>
                  <td>alertMode</td>
                  <td>boolean</td>
                  <td>알림 모드 (취소 버튼 숨김)</td>
                </tr>
                <tr>
                  <td>onConfirm</td>
                  <td>{`() => void | Promise<void>`}</td>
                  <td>확인 버튼 클릭 이벤트</td>
                </tr>
                <tr>
                  <td>trigger</td>
                  <td>ReactElement</td>
                  <td>다이얼로그를 여는 트리거 요소</td>
                </tr>
              </tbody>
            </table>

            <h2>Examples</h2>
            <Unstyled>
              <Gcol gap={4} className="w-full">
                <h3 className="font-bold">Tone</h3>
                <p className="text-sm">
                  tone 속성을 사용하여 확인 버튼의 스타일을 &apos;info&apos;(기본) 또는 &apos;danger&apos;(파괴적
                  동작)로 설정할 수 있습니다.
                </p>
                <Grow gap={4} variant="box-line" className="p-16">
                  <ConfirmDialog
                    defaultOpen={false}
                    title="변경사항 저장"
                    description="작성 중인 내용을 저장하시겠습니까?"
                    confirmLabel="저장"
                    cancelLabel="닫기"
                    tone="info"
                    trigger={<Button variant="contained">Info (Default)</Button>}
                  />
                  <ConfirmDialog
                    defaultOpen={false}
                    title="데이터 삭제"
                    description="삭제된 데이터는 복구할 수 없습니다."
                    confirmLabel="삭제"
                    cancelLabel="취소"
                    tone="danger"
                    trigger={
                      <Button variant="outlined" color="secondary">
                        Danger
                      </Button>
                    }
                  />
                </Grow>

                <h3 className="font-bold mt-4">Alert Mode</h3>
                <p className="text-sm">
                  alertMode를 true로 설정하면 취소 버튼이 사라지고, 확인 버튼만 있는 알림 형태의 다이얼로그가 됩니다.
                </p>
                <Grow gap={4} variant="box-line" className="p-16">
                  <ConfirmDialog
                    defaultOpen={false}
                    alertMode
                    title="처리가 완료되었습니다"
                    description="다음 단계로 이동해 주세요."
                    confirmLabel="확인"
                    trigger={
                      <Button variant="outlined" color="gray">
                        Alert Mode
                      </Button>
                    }
                  />
                </Grow>

                <h3 className="font-bold mt-4">Async Confirm</h3>
                <p className="text-sm">
                  onConfirm 핸들러가 Promise를 반환하면, Promise가 resolve될 때까지 확인 버튼에 로딩 상태가 표시됩니다.
                </p>
                <Grow gap={4} variant="box-line" className="p-16">
                  <ConfirmDialog
                    defaultOpen={false}
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
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
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
    description:
      '시스템의 중요한 상태 변화, 처리 결과, <br />또는 즉각적인 주의가 필요한 정보를 사용자에게 전달합니다.',
    confirmLabel: '확인',
    cancelLabel: '취소',
    tone: 'info',
    alertMode: false,
  },
};

export default meta;
type Story = StoryObj<ConfirmDialogStoryProps>;

export const Default: Story = {
  args: {
    open: false,
    defaultOpen: false,
  },
  render: ({ open: _open, defaultOpen: _defaultOpen, onOpenChange: _onOpenChange, ...args }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex gap-4 items-center">
        <ConfirmDialog {...args} open={open} onOpenChange={setOpen} trigger={<Button>open</Button>} />
        <Button onClick={() => setOpen(true)}>open2</Button>
      </div>
    );
  },
};
