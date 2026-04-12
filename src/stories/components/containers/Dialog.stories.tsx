'use client';

import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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
                Dialog는 Radix UI의 <code>@radix-ui/react-dialog</code>를 기반으로 만들어진 모달 다이얼로그 컴포넌트입니다.
                <br />
                드래그 이동, 리사이즈, 기본 위치 지정 등 고급 기능을 지원합니다.
              </p>
              <ul>
                <li>
                  <b>DialogHeader</b> 영역을 드래그하여 다이얼로그를 이동할 수 있습니다.
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
    // showCloseButton: {
    //   control: 'boolean',
    //   description: '우측 상단 닫기(X) 버튼 표시 여부',
    //   table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    // },
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
    // zIndex: {
    //   control: 'number',
    //   description: '다이얼로그 z-index (기본값: overlay보다 1 높음)',
    //   table: { category: 'prop' },
    // },
    
    showOverlay: {
      control: 'boolean',
      description: '오버레이 표시 여부',
      table: { category: 'prop', defaultValue: { summary: 'true' } },
    },
    // overlayClassName: {
    //   control: 'text',
    //   description: '오버레이에 추가할 CSS 클래스',
    //   table: { category: 'Overlay props' },
    // },
    zIndex: { table: { disable: true } },
    overlayClassName: { table: { disable: true } },
    showCloseButton: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  args: {
    showOverlay: true,
    showCloseButton: true,
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
          <Button variant={'contained'} >다이얼로그 열기</Button>
        </DialogTrigger>
        
        <DialogContent {...args}>
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>다이얼로그 제목</Typo>
              <Typo tag={'p'} variant={'body-xl'}>(LRTAA010)</Typo>
            </DialogTitle>
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
    );
  },
};