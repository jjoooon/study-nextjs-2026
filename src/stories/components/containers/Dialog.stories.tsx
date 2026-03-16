'use client';

import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
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
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@uiux/Dialog';
import { Button } from '@uiux/Button';

<Dialog>
  <DialogTrigger asChild>
    <Button>다이얼로그 열기</Button>
  </DialogTrigger>
  <DialogContent
    showCloseButton
    resizable={false}
    size={{ width: '48rem', minHeight: '24rem' }}
  >
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>설명 텍스트</DialogDescription>
    </DialogHeader>
    <div className="px-[3.2rem]">본문 내용</div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outlined" color="gray">닫기</Button>
      </DialogClose>
      <Button variant="contained">확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`
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
                  <td>showCloseButton</td>
                  <td>boolean (default: true)</td>
                  <td>우측 상단 닫기(X) 버튼 표시 여부</td>
                </tr>
                <tr>
                  <td>resizable</td>
                  <td>boolean (default: false)</td>
                  <td>8방향 리사이즈 핸들 활성화 여부</td>
                </tr>
                <tr>
                  <td>defaultPosition</td>
                  <td>{`{ x: number; y: number }`}</td>
                  <td>다이얼로그 초기 위치 (중앙 기준 오프셋)</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>{`{ width?; height?; minWidth?; minHeight?; maxWidth?; maxHeight? }`}</td>
                  <td>다이얼로그 크기 관련 CSS 값을 지정 (number는 px로 처리)</td>
                </tr>
              </tbody>
            </table>

            <h2>Examples</h2>
            <Unstyled>
              <Gcol gap={4} className="w-full">
                <h3 className="font-bold">Basic</h3>
                <p className="text-sm">기본 다이얼로그 사용 예시입니다.</p>
                <Grow gap={4} variant="box-line" className="p-16">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="contained">기본 다이얼로그</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[48rem]">
                      <DialogHeader>
                        <DialogTitle>기본 다이얼로그</DialogTitle>
                        <DialogDescription>헤더 영역을 드래그하여 위치를 이동할 수 있습니다.</DialogDescription>
                      </DialogHeader>
                      <div className="px-[3.2rem]">다이얼로그 본문 내용이 여기에 들어갑니다.</div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outlined" color="gray">닫기</Button>
                        </DialogClose>
                        <Button variant="contained">확인</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Grow>

                <h3 className="font-bold mt-4">Resizable</h3>
                <p className="text-sm">resizable 속성을 true로 설정하면 8방향 리사이즈가 가능합니다.</p>
                <Grow gap={4} variant="box-line" className="p-16">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outlined" color="secondary">리사이즈 가능 다이얼로그</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[56rem]" resizable>
                      <DialogHeader>
                        <DialogTitle>리사이즈 다이얼로그</DialogTitle>
                        <DialogDescription>모서리와 가장자리를 드래그하여 크기를 조절할 수 있습니다.</DialogDescription>
                      </DialogHeader>
                      <div className="px-[3.2rem]">크기를 자유롭게 조절할 수 있는 다이얼로그입니다.</div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outlined" color="gray">닫기</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Grow>

                <h3 className="font-bold mt-4">Without Close Button</h3>
                <p className="text-sm">showCloseButton을 false로 설정하면 우측 상단 X 버튼이 숨겨집니다.</p>
                <Grow gap={4} variant="box-line" className="p-16">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outlined" color="gray">닫기 버튼 없음</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[40rem]" showCloseButton={false}>
                      <DialogHeader>
                        <DialogTitle>닫기 버튼 없는 다이얼로그</DialogTitle>
                      </DialogHeader>
                      <div className="px-[3.2rem]">푸터 버튼으로만 닫을 수 있습니다.</div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="contained">확인</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Grow>

                <h3 className="font-bold mt-4">Default Position</h3>
                <p className="text-sm">defaultPosition으로 다이얼로그 초기 위치를 화면 중앙 기준 오프셋으로 지정합니다.</p>
                <Grow gap={4} variant="box-line" className="p-16">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outlined" color="secondary">위치 지정 다이얼로그</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[48rem]" defaultPosition={{ x: 100, y: -80 }}>
                      <DialogHeader>
                        <DialogTitle>위치 지정 다이얼로그</DialogTitle>
                        <DialogDescription>x: 100, y: -80 오프셋으로 초기 위치가 설정됩니다.</DialogDescription>
                      </DialogHeader>
                      <div className="px-[3.2rem]">중앙에서 우측으로 100px, 위로 80px 이동된 위치에서 열립니다.</div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outlined" color="gray">닫기</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    showCloseButton: {
      control: 'boolean',
      description: '우측 상단 닫기(X) 버튼 표시 여부',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
    resizable: {
      control: 'boolean',
      description: '8방향 리사이즈 핸들 활성화 여부',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    defaultPosition: {
      control: 'object',
      description: '다이얼로그 초기 위치 (중앙 기준 오프셋 { x, y })',
      table: { category: 'Behavior', defaultValue: { summary: '{ x: 0, y: 0 }' } },
    },
    size: {
      control: 'object',
      description: '다이얼로그 크기 설정 ({ width, height, minWidth, minHeight, maxWidth, maxHeight })',
      table: { category: 'Layout' },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
      table: { category: 'Appearance' },
    },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
  },
  args: {
    showCloseButton: true,
    resizable: false,
    defaultPosition: { x: 0, y: 0 },
    size: { width: '48rem', minHeight: '24rem' },
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
              <Typo tag={'h2'} variant={'heading-lg'}>다이얼로그 제목</Typo>
              <Typo tag={'p'} variant={'body-lg'}>(LRTAA010)</Typo>
            </DialogTitle>
          </DialogHeader>

          <div className="px-6">
            다이얼로그 본문 내용이 여기에 들어갑니다.
          </div>
          
          <DialogFooter>
            <Gcol className="w-full" gap={0}>
              <Grow placement={'bwc'} gap={2} className="w-full pb-5 px-6">
                <Grow>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>버튼</Button>
                </Grow>
                <Grow>
                  <Button variant={'contained'} size={'xl'} onClick={() => setOpen(false)}>확인</Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>닫기</Button>
                  </DialogClose>
                </Grow>
              </Grow>
              <Grow variant={'box'} className="w-full py-1 px-2.5 border-t border-[var(--color-gray-20)]" placement={'bwc'}>
                <Typo variant={'body-xs'} color={'gray'}>자료가 조회되었습니다.</Typo>

              </Grow>
            </Gcol>
           </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
 
