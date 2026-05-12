/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import type { Meta, StoryObj } from '@storybook/react';
import { Gcol, Grow } from '@atoms';
import { Badge } from '@uiux/Badge';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof Badge> = {
  title: 'Components/Common/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>History</h2>
            <ul>
              <li>2026.03.30</li>
            </ul>
            
            <h2>Overview</h2>
            <div>
              <p>
                Badge 컴포넌트는 상태, 카테고리, 중요 정보를 짧게 강조해 표시하는 UI 요소입니다.<br />
                variant, color, size 조합으로 같은 의미를 일관된 시각 스타일로 표현할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Badge 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 상태 표시</li>
              <li>variant + color 조합</li>
              <li>크기 변경 (sm, md, lg)</li>
              <li>asChild를 통한 링크/버튼 형태</li> 
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { Badge } from '@uiux/Badge';

<Badge
  variant={'contained' | 'soft' | 'outlined' | 'ghost'}
  color={'blue' | 'red' | 'green' | 'primary' | 'gray' | 'bluegray' | 'secondary'}
  size={'sm' | 'md' | 'lg'}
>
  D-31
</Badge>

<Badge asChild>
  <a href="#">연결</a>
</Badge>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Badge 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>variant</td><td>'contained' | 'soft' | 'outlined' | 'ghost'</td><td>배지 스타일</td></tr>
                <tr><td>color</td><td>'blue' | 'red' | 'green' | 'primary' | 'gray' | 'bluegray' | 'secondary'</td><td>배지 색상</td></tr>
                <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>배지 크기</td></tr>
                <tr><td>asChild</td><td>boolean</td><td>자식 요소로 렌더링</td></tr>
                <tr><td>children</td><td>ReactNode</td><td>배지 라벨</td></tr>
              </tbody>
            </table>

            <h2>Variant</h2>
            <p>Badge 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={2}>
                  <Badge variant="contained" color="red">contained</Badge>
                  <Badge variant="soft" color="red">soft</Badge>
                  <Badge variant="outlined" color="red">outlined</Badge>
                  <Badge variant="ghost" color="red">ghost</Badge>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Color</h2>
            <p>Badge 컴포넌트에서 사용할 수 있는 color 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={2}>
                  <Badge color="blue">blue</Badge>
                  <Badge color="red">red</Badge>
                  <Badge color="green">green</Badge>
                  <Badge color="primary">primary</Badge>
                  <Badge color="gray">gray</Badge>
                  <Badge color="bluegray">bluegray</Badge>
                  <Badge color="secondary">secondary</Badge>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Size</h2>
            <p>Badge 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={2} placement="ec">
                  <Badge size="sm">sm</Badge>
                  <Badge size="md">md</Badge>
                  <Badge size="lg">lg</Badge>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>AsChild</h2>
            <p>asChild를 사용하면 링크 등의 요소를 Badge 스타일로 렌더링할 수 있습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Badge asChild variant="outlined" color="blue">
                  <a href="#">연결 배지</a>
                </Badge>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['contained', 'soft', 'outlined', 'ghost', 'rounded'],
      table: { category: '스타일 props' },
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['blue', 'red', 'green', 'primary', 'gray', 'bluegray', 'secondary'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      table: { category: '스타일 props' },
    },
    asChild: {
      control: false,
      table: { disable: true },
    },
    children: {
      control: false,
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    children: 'D-31',
    variant: 'contained',
    color: 'red',
    size: 'md',
    asChild: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => <Badge {...args}>{args.children}</Badge>,
};