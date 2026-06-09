/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Gcol, Grow } from '@atoms';
import { SearchIcon } from '@icons';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uiux/Button';
import Link from 'next/link';

const meta: Meta<typeof Button> = {
  title: 'Components/Forms/Button',
  component: Button,
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
                Button 컴포넌트는 사용자 액션을 실행하는 핵심 인터랙션 요소입니다.
                <br />
                variant, color, size, only 조합으로 일반 버튼과 아이콘 버튼을 일관된 규칙으로 구성할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Button 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 버튼</li>
              <li>아이콘 전용 버튼 (only=&quot;icon&quot;)</li>
              <li>asChild 기반 링크 버튼</li>
              <li>비활성 상태 버튼</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import Link from 'next/link';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';

<Button
  variant={'contained' | 'outlined' | 'text' | 'none' | 'banner' | 'state' | 'rounded'}
  color={'primary' | 'secondary' | 'gray' | 'gray-light' | 'coolgray' | 'coolgray-light' | 'success' | 'link' | 'transparent'}
  size={'xl' | 'lg' | 'md' | 'sm' | 'xs'}
  only={'default' | 'icon'}
>
  버튼
</Button>

<Button only="icon" aria-label="검색">
  <SearchIcon />
</Button>

<Button asChild>
  <Link href="/login">로그인</Link>
</Button>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Button 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
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
                  <td>variant</td>
                  <td>'contained' | 'outlined' | 'text' | 'none' | 'banner' | 'state' | 'rounded'</td>
                  <td>버튼 스타일</td>
                </tr>
                <tr>
                  <td>color</td>
                  <td>
                    'primary' | 'secondary' | 'gray' | 'gray-light' | 'coolgray' | 'coolgray-light' | 'success' | 'link'
                    | 'transparent'
                  </td>
                  <td>버튼 색상</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>'xl' | 'lg' | 'md' | 'sm' | 'xs'</td>
                  <td>버튼 크기</td>
                </tr>
                <tr>
                  <td>only</td>
                  <td>'default' | 'icon'</td>
                  <td>일반/아이콘 전용 모드</td>
                </tr>
                <tr>
                  <td>asChild</td>
                  <td>boolean</td>
                  <td>자식 요소로 렌더링</td>
                </tr>
                <tr>
                  <td>disabled</td>
                  <td>boolean</td>
                  <td>비활성 상태</td>
                </tr>
              </tbody>
            </table>

            <h2>Variant</h2>
            <p>Button 컴포넌트에서 사용할 수 있는 variant 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={2} className="flex-wrap">
                  <Button variant="contained">contained</Button>
                  <Button variant="outlined">outlined</Button>
                  <Button variant="rounded">rounded</Button>
                  <Button variant="text">text</Button>
                  <Button variant="none">none</Button>
                  <Button variant="banner" size="md" className="w-[16rem]">
                    banner
                  </Button>
                  <Button variant="state" size="md" className="w-[16rem]">
                    state
                  </Button>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Color</h2>
            <p>Button 컴포넌트에서 사용할 수 있는 color 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={2} className="flex-wrap">
                  <Button color="primary">primary</Button>
                  <Button color="secondary">secondary</Button>
                  <Button color="gray">gray</Button>
                  <Button color="gray-light">gray-light</Button>
                  <Button color="coolgray">coolgray</Button>
                  <Button color="coolgray-light">coolgray-light</Button>
                  <Button color="success">success</Button>
                  <Button color="link">link</Button>
                  <Button color="transparent">transparent</Button>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Coolgray Tone</h2>
            <p>Button.tsx에 추가된 coolgray 계열 스타일 차이는 아래 예시로 확인할 수 있습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={2} className="flex-wrap">
                  <Button variant="contained" color="coolgray">
                    contained coolgray
                  </Button>
                  <Button variant="contained" color="coolgray-light">
                    contained coolgray-light
                  </Button>
                </Grow>
                <Grow gap={2} className="flex-wrap">
                  <Button variant="outlined" color="coolgray">
                    outlined coolgray
                  </Button>
                  <Button variant="outlined" color="coolgray-light">
                    outlined coolgray-light
                  </Button>
                </Grow>
                <Grow gap={2} className="flex-wrap">
                  <Button variant="text" color="coolgray">
                    text coolgray
                  </Button>
                  <Button variant="text" color="coolgray-light">
                    text coolgray-light
                  </Button>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Size</h2>
            <p>Button 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={2} placement="ec">
                  <Button size="xl">xl</Button>
                  <Button size="lg">lg</Button>
                  <Button size="md">md</Button>
                  <Button size="sm">sm</Button>
                  <Button size="xs">xs</Button>
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Icon / AsChild / Disabled</h2>
            <p>아이콘 버튼, 링크 버튼, 비활성 버튼 사용 예시는 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={2} className="flex-wrap">
                  <Button only="icon" aria-label="검색">
                    <SearchIcon />
                  </Button>
                  <Button asChild variant="outlined" color="link">
                    <Link href="/login">로그인 링크</Link>
                  </Button>
                  <Button disabled>disabled</Button>
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      table: { category: '이벤트 props' },
    },
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text', 'none', 'banner', 'state', 'rounded'],
      table: { category: '스타일 props' },
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'gray',
        'gray-light',
        'coolgray',
        'coolgray-light',
        'success',
        'link',
        'transparent',
      ],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['xl', 'lg', 'md', 'sm', 'xs'],
      table: { category: '스타일 props' },
    },
    only: {
      control: { type: 'select' },
      options: ['default', 'icon'],
      table: { category: '스타일 props' },
    },

    disabled: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    children: {
      control: { type: 'text' },
      table: { category: '설정 props' },
    },
    className: {
      table: { disable: true },
    },
    type: {
      table: { disable: true },
    },
    asChild: {
      control: { type: 'boolean' },
      table: { disable: true },
    },
  },
  args: {
    children: '버튼',
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    only: 'default',
    asChild: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args}>{args.children}</Button>,
};
