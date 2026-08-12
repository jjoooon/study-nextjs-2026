/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Button } from '@uiux/Button';
import { Toaster, toast } from '@uiux/Sonner';

type ToasterProps = React.ComponentProps<typeof Toaster>;

const meta: Meta<ToasterProps> = {
  title: 'Components/Common/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <h2>Overview</h2>
          <div>
            <p>
              Sonner는 전역 Toast 알림을 위한 UI 컴포넌트입니다.
              <br />
              next-themes와 연동하여 테마에 따라 스타일이 자동 적용됩니다.
            </p>
            <ul>
              <li>theme prop으로 라이트/다크/시스템 테마를 제어할 수 있습니다.</li>
              <li>toastOptions로 알림 스타일을 커스터마이즈할 수 있습니다.</li>
            </ul>
          </div>
          <Primary />
          <Controls />
          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
import { Toaster } from '@uiux/Sonner';
import { toast } from 'sonner';

<>
  <Toaster />
  <button onClick={() => toast('알림 메시지!')}>Show Toast</button>
</>
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
                <td>theme</td>
                <td>&apos;light&apos; | &apos;dark&apos; | &apos;system&apos;</td>
                <td>테마 모드</td>
              </tr>
              <tr>
                <td>toastOptions</td>
                <td>object</td>
                <td>Toast 스타일/동작 커스터마이즈</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: '테마 모드',
      table: { category: 'Appearance' },
    },
    toastOptions: {
      control: 'object',
      description: 'Toast 스타일/동작 커스터마이즈',
      table: { category: 'Behavior' },
    },
    duration: {
      control: { type: 'number', min: 1000, max: 20000, step: 500 },
      description: '토스트 표시 시간(ms)',
      table: { category: 'Behavior' },
      defaultValue: 5000,
    },
  },
  args: {
    theme: 'system',
    toastOptions: {},
    duration: 3000,
  },
};

export default meta;
type Story = StoryObj<ToasterProps>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="h-[50vh] w-[100%] flex items-center justify-center">
        <Toaster {...args} />
        <Button
          variant={'outlined'}
          onClick={() =>
            toast.info(
              '테스트 알림! 테스트 알림!테스트 알림! 테스트 알림!테스트 알림! 테스트 알림!테스트 알림! 테스트 알림!테스트 알림! 테스트 알림!',
              { position: 'top-center', duration: args.duration }
            )
          }
        >
          Show Toast
        </Button>
      </div>
    );
  },
};
