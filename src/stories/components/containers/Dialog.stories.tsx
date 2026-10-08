/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogSection,
  DialogFooterArea,
} from '@uiux/Dialog';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@uiux/AlertDialog';

type DialogContentProps = React.ComponentProps<typeof DialogContent>;

const meta: Meta<DialogContentProps> = {
  title: 'Components/Containers/Dialog',
  component: DialogContent,
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
                Dialog는 Radix UI의 <code>@radix-ui/react-dialog</code>를 기반으로 만들어진 모달 다이얼로그
                컴포넌트입니다.
                <br />
                드래그 이동, 리사이즈, 전체화면, 화면분할(우측 35%) 등 고급 기능을 지원합니다.
              </p>
              <ul>
                <li>
                  <b>DialogHeader</b> 영역을 드래그하여 다이얼로그를 이동할 수 있습니다.
                </li>
                <li>
                  <b>showFullscreenButton</b> 또는 <b>fullscreen</b> prop으로 전체화면 토글 버튼을 제공할 수 있습니다.
                </li>
                <li>
                  <b>showSplitButton</b> 또는 <b>split</b> prop으로 화면분할(우측 35% 위치 차지, BODY padding-right:35% 공간 생성, 이동 방지) 토글 버튼을 제공할 수 있습니다.
                </li>
                <li>
                  <b>resizable</b> prop을 true로 설정하면 8방향 리사이즈 핸들이 노출됩니다.
                </li>
                <li>
                  <b>defaultPosition</b>으로 초기 위치를 지정할 수 있습니다.
                </li>
                <li>
                  <b>size</b>는 <b>sm/md/lg/full</b> preset 또는 width/height 객체를 지원합니다.
                </li>
                <li>
                  <b>showCloseButton</b>으로 우측 상단 닫기 버튼 표시 여부를 제어합니다.
                </li>
              </ul>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <Markdown>
              {`
\`\`\`tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogSection,
  DialogFooterArea,
} from '@uiux/Dialog';
import { Button } from '@uiux/Button';

<Dialog>
  <DialogTrigger asChild>
    <Button>다이얼로그 열기</Button>
  </DialogTrigger>
  <DialogContent
    showCloseButton
    resizable={false}
    size="md"
  >
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>설명 텍스트</DialogDescription>
    </DialogHeader>

    <DialogSection>
      <div>대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다. 대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다.</div>
      <div>대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다. 대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다.</div>
    </DialogSection>
    
    <DialogFooter>
      <DialogFooterArea>
        <Grow>
            <Button variant={'outlined'} size={'xl'} color={'gray'}>버튼</Button>
            <Button variant={'outlined'} size={'xl'} color={'gray'}>버튼</Button>
          </Grow>
          <Grow>
            <Button variant={'outlined'} size={'xl'} color={'gray'}>버튼</Button>
            <Button variant={'contained'} size={'xl'} onClick={() => setOpen(false)}>확인</Button>
            <DialogClose asChild>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                닫기
              </Button>
            </DialogClose>
          </Grow>
        </DialogFooterArea>
        <DialogBottomInfo />
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`
              `}
            </Markdown>
          </>
        );
      },
    },
  },
  argTypes: {
    showFullscreenButton: {
      control: 'boolean',
      description: '우측 상단 전체화면 버튼 표시 여부',
      table: { category: 'prop', defaultValue: { summary: 'false' } },
    },
    showSplitButton: {
      control: 'boolean',
      description: '우측 상단 화면분할(우측 35%) 버튼 표시 여부',
      table: { category: 'prop', defaultValue: { summary: 'false' } },
    },
    resizable: {
      control: 'boolean',
      description: '8방향 리사이즈 핸들 활성화 여부',
      table: { category: 'prop', defaultValue: { summary: 'false' } },
    },
    defaultPosition: {
      control: 'object',
      description: '다이얼로그 초기 위치 (중앙 기준 오프셋 { x, y })',
      table: { category: 'prop', defaultValue: { summary: '{ x: 0, y: 0 }' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: '크기 설정: sm/md/lg/full 또는 { width, height, minWidth, minHeight, maxWidth, maxHeight }',
      table: { category: 'prop' },
    },
    showOverlay: {
      control: 'boolean',
      description: '오버레이 표시 여부',
      table: { category: 'prop', defaultValue: { summary: 'true' } },
    },
    dim: {
      control: 'radio',
      options: ['dark', 'transparent', 'none'],
      description:
        '어두운 백드롭 딤 오버레이 타입 (dark: 반투명 검정, transparent: 클릭 차단용 투명, none: 오버레이 없음)',
      table: { category: 'prop', defaultValue: { summary: "'dark'" } },
    },
    zIndex: { table: { disable: true } },
    overlayClassName: { table: { disable: true } },
    showCloseButton: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  args: {
    showOverlay: true,
    dim: 'dark',
    showCloseButton: true,
    showFullscreenButton: true,
    showSplitButton: true,
    resizable: true,
    defaultPosition: { x: 0, y: 0 },
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<DialogContentProps>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'contained'}>다이얼로그 열기</Button>
        </DialogTrigger>

        <DialogContent {...args}>
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                다이얼로그 제목
              </Typo>
              <Typo tag={'p'} variant={'body-xl'}>
                (LRTAA010)
              </Typo>
            </DialogTitle>
          </DialogHeader>

          <DialogSection>
            <div>
              대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수
              있습니다. 대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을
              포함할 수 있습니다.
            </div>
            <div>
              대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수
              있습니다. 대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을
              포함할 수 있습니다.
            </div>
          </DialogSection>

          <DialogFooter>
            <DialogFooterArea>
              <Grow>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  버튼
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  버튼
                </Button>
              </Grow>
              <Grow>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  버튼
                </Button>
                <Button variant={'contained'} size={'xl'} onClick={() => setOpen(false)}>
                  확인
                </Button>
                <DialogClose asChild>
                  <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                    닫기
                  </Button>
                </DialogClose>
              </Grow>
            </DialogFooterArea>
            <DialogBottomInfo />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const SharedZIndexOverlayTest: Story = {
  name: 'z-index 교차 중첩 테스트 (Alert -> Dialog -> Alert -> Dialog)',
  render: () => {
    const [alert1Open, setAlert1Open] = React.useState(false);
    const [dialog1Open, setDialog1Open] = React.useState(false);
    const [alert2Open, setAlert2Open] = React.useState(false);
    const [dialog2Open, setDialog2Open] = React.useState(false);

    return (
      <div className="flex flex-col gap-4 items-center justify-center p-10">
        <Typo tag="h3" variant="heading-lg">
          z-index 공유 레지스트리 교차 순서 테스트
        </Typo>
        <p className="text-sm text-gray-600 max-w-lg text-center">
          Alert(100) ➔ Dialog(101) ➔ Alert(102) ➔ Dialog(103) 순서대로 교차하여 열릴 때 z-index가 1씩 증가하며
          상위 레이어에 순차적으로 떠서 클릭이 정상 조작되는지 검증합니다.
        </p>

        <Button variant="contained" size="xl" onClick={() => setAlert1Open(true)}>
          1단계: Alert 1 열기 (예상 z-index: 100)
        </Button>

        {/* 1단계: Alert 1 */}
        <AlertDialog open={alert1Open} onOpenChange={setAlert1Open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>1단계: Alert 1 (z-index: 100)</AlertDialogTitle>
              <AlertDialogDescription>
                첫 번째 Alert 창입니다. (닫히지 않고 열린 채로 유지됩니다)
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlert1Open(false)}>Alert 1 닫기</AlertDialogCancel>
              <Button variant="contained" size="xl" onClick={() => setDialog1Open(true)}>
                2단계: Dialog 1 열기 (Alert 1 열린 채 z-index: 101)
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 2단계: Dialog 1 */}
        <Dialog open={dialog1Open} onOpenChange={setDialog1Open}>
          <DialogContent title="2단계: Dialog 1" scrid="DLG01" size="sm">
            <DialogHeader>
              <DialogTitle>2단계: Dialog 1 (z-index: 101)</DialogTitle>
            </DialogHeader>
            <DialogSection className="py-4">
              <p>두 번째로 열린 Dialog 1 팝업입니다.</p>
              <p className="text-xs text-gray-500 mt-2">
                Alert 1(100) 위에 Dialog 1(101)이 정상적으로 겹쳐서 표시되고 있습니다.
              </p>
            </DialogSection>
            <DialogFooter>
              <DialogFooterArea>
                <Grow>
                  <Button variant="outlined" color="gray-light" onClick={() => setDialog1Open(false)}>
                    Dialog 1 닫기
                  </Button>
                </Grow>
                <Grow>
                  <Button variant="contained" color="primary" onClick={() => setAlert2Open(true)}>
                    3단계: Alert 2 열기 (Dialog 1 열린 채 z-index: 102)
                  </Button>
                </Grow>
              </DialogFooterArea>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 3단계: Alert 2 */}
        <AlertDialog open={alert2Open} onOpenChange={setAlert2Open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>3단계: Alert 2 (z-index: 102)</AlertDialogTitle>
              <AlertDialogDescription>
                세 번째로 열린 Alert 2 창입니다. (Dialog 1과 Alert 1 위로 중첩되어 열린 채 유지됩니다)
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlert2Open(false)}>Alert 2 닫기</AlertDialogCancel>
              <Button variant="contained" size="xl" onClick={() => setDialog2Open(true)}>
                4단계: Dialog 2 열기 (Alert 2 열린 채 z-index: 103)
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 4단계: Dialog 2 */}
        <Dialog open={dialog2Open} onOpenChange={setDialog2Open}>
          <DialogContent title="4단계: Dialog 2" scrid="DLG02" size="sm">
            <DialogHeader>
              <DialogTitle>4단계: Dialog 2 (z-index: 103)</DialogTitle>
            </DialogHeader>
            <DialogSection className="py-4">
              <p className="font-bold text-green-600">최상위 4단계 Dialog 2 팝업입니다.</p>
              <p className="text-xs text-gray-500 mt-2">
                Alert 1(100) ➔ Dialog 1(101) ➔ Alert 2(102) ➔ Dialog 2(103) 모두 닫히지 않고 차곡차곡 중첩되어
                성공적으로 유지되고 있습니다!
              </p>
            </DialogSection>
            <DialogFooter>
              <DialogFooterArea>
                <Grow>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setDialog2Open(false);
                      setAlert2Open(false);
                      setDialog1Open(false);
                      setAlert1Open(false);
                    }}
                  >
                    모든 창 한번에 닫기
                  </Button>
                </Grow>
              </DialogFooterArea>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
