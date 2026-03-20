import type { Meta, StoryObj } from '@storybook/react';
import { Gcol, Grow } from '@atoms';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import { QuestionMark } from '@icons';

const meta: Meta<typeof TooltipContent> = {
  title: 'Components/Common/Tooltip',
  component: TooltipContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                Tooltip 컴포넌트는 사용자 액션(hover, focus) 시 보조 설명을 표시하는 UI 요소입니다.<br />
                variant, side, sideOffset 조합으로 표현 스타일과 위치를 조정할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Tooltip 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 안내 텍스트 표시</li>
              <li>variant 스타일 변경 (default, dark, light)</li>
              <li>표시 위치 변경 (top, right, bottom, left)</li>
              <li>표시 오프셋 조정 (sideOffset)</li>
              <li>정렬 방향 변경 (align)</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="contained" color="primary" size="md">툴팁 보기</Button>
      <QuestionMark color="#61554F" />
    </Button>
  </TooltipTrigger>
  <TooltipContent variant="default" side="top" align="center" sideOffset={8}>
    안내 메시지
  </TooltipContent>
</Tooltip>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>TooltipContent 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>variant</td><td>'default' | 'dark' | 'light'</td><td>툴팁 색상 스타일</td></tr>
                <tr><td>side</td><td>'top' | 'right' | 'bottom' | 'left'</td><td>트리거 기준 표시 위치</td></tr>
                <tr><td>align</td><td>'start' | 'center' | 'end'</td><td>트리거 기준 정렬 방향</td></tr>
                <tr><td>sideOffset</td><td>number</td><td>트리거와의 간격</td></tr>
                <tr><td>children</td><td>ReactNode</td><td>툴팁 내용</td></tr>
              </tbody>
            </table>

            <h2>Variant</h2>
            <p>Tooltip 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={6} placement="cc">
                  <Tooltip defaultOpen>
                    <TooltipTrigger asChild>
                      <Button variant={'none'}  size={'md'} only={'icon'}>
                        <QuestionMark color="#61554F" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent variant="dark" side="top" sideOffset={8}>Default Tooltip</TooltipContent>
                  </Tooltip>

                  <Tooltip defaultOpen>
                    <TooltipTrigger asChild>
                      <Button variant={'none'}  size={'md'} only={'icon'}>
                        <QuestionMark color="#61554F" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent variant="dark" side="top" sideOffset={8}>Dark Tooltip</TooltipContent>
                  </Tooltip>

                  <Tooltip defaultOpen>
                    <TooltipTrigger asChild>
                      <Button variant={'none'}  size={'md'} only={'icon'}>
                        <QuestionMark color="#61554F" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent variant="dark" side="top" sideOffset={8}>Light Tooltip</TooltipContent>
                  </Tooltip>
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'light'],
      table: { category: '스타일 props' },
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
      table: { category: '위치 props' },
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      table: { category: '위치 props' },
    },
    children: {
        control: { type: 'text' },
        table: { category: '설정 props' },
    },
    sideOffset: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    asChild: {
      table: { disable: true },
    },
    forceMount: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    side: 'top',
    align: 'center',
    sideOffset: 0,
    children: '문서서명/IM은 청약서상 고객이 청약서로<br> [전자적 방법의 안내동의여부]에 기재한 내용을<br> 화면에서 선택하시면 됩니다.<br> 전자서명/전자청약은 전자적 안내동의가<br> 필수사항입니다.',
  },
};

export default meta;
type Story = StoryObj<typeof TooltipContent>;

export const Default: Story = {
  render: (args) => {
    return (
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant={'none'} size={'md'} only={'icon'}>
            <QuestionMark color="#61554F" />
          </Button>
        </TooltipTrigger>
        <TooltipContent {...args}>{args.children}</TooltipContent>
      </Tooltip>
    );
  },
};