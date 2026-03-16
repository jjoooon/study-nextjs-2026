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
    size="md"
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
                  <td>{`'sm' | 'md' | 'lg' | 'full' | { width?; height?; minWidth?; minHeight?; maxWidth?; maxHeight? }`}</td>
                  <td>
                    preset 또는 직접 크기 지정. height 미지정 시 내용 높이 기반 + max-height 제약 적용.
                  </td>
                </tr>
                <tr>
                  <td>zIndex</td>
                  <td>number</td>
                  <td>다이얼로그 레이어 우선순위. 기본값은 overlay보다 1 높은 값.</td>
                </tr>
                <tr>
                  <td>showOverlay</td>
                  <td>boolean (default: true)</td>
                  <td>암막(overlay) 표시 여부</td>
                </tr>
                <tr>
                  <td>overlayClassName</td>
                  <td>string</td>
                  <td>암막 스타일 커스터마이즈 클래스</td>
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

                <h3 className="font-bold mt-4">Size Preset (sm / md / lg / full)</h3>
                <p className="text-sm">프리셋 크기와 full 고정 크기를 확인할 수 있습니다.</p>
                <Grow gap={4} variant="box-line" className="p-16 flex-wrap">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outlined" color="gray">size: sm</Button>
                    </DialogTrigger>
                    <DialogContent size="sm">
                      <DialogHeader>
                        <DialogTitle>Small Dialog</DialogTitle>
                      </DialogHeader>
                      <div className="px-[3.2rem]">가로 37rem, 높이 자동(max-height 제한)</div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outlined" color="gray">size: full</Button>
                    </DialogTrigger>
                    <DialogContent size="full">
                      <DialogHeader>
                        <DialogTitle>Full Dialog</DialogTitle>
                      </DialogHeader>
                      <div className="px-[3.2rem]">가로/세로 viewport 기준 고정 크기</div>
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
      description: '크기 설정: sm/md/lg/full 또는 { width, height, minWidth, minHeight, maxWidth, maxHeight }',
      table: { category: 'Layout' },
    },
    zIndex: {
      control: 'number',
      description: '다이얼로그 z-index (기본값: overlay보다 1 높음)',
      table: { category: 'Layout' },
    },
    
    showOverlay: {
      control: 'boolean',
      description: '오버레이 표시 여부',
      table: { category: 'Overlay props', defaultValue: { summary: 'true' } },
    },
    overlayClassName: {
      control: 'text',
      description: '오버레이에 추가할 CSS 클래스',
      table: { category: 'Overlay props' },
    },
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
              <DialogBottomInfo />
            </Gcol>
           </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
 
