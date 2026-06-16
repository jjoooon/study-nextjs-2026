/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { InputTag } from '@common/InputTag';

const meta: Meta<typeof InputTag> = {
  title: 'Components/Forms/InputTag',
  component: InputTag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          overview={`InputTag 컴포넌트는 태그 입력을 위한 폼 UI 요소입니다.
최대 입력 개수와 플레이스홀더를 설정할 수 있으며, 현재 입력된 태그를 뱃지 형식으로 표시하고 삭제할 수 있습니다.`}
          history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
          usageCode={`
import { InputTag } from '@common/InputTag';
import { useState } from 'react';

const [tags, setTags] = useState<string[]>([]);

<InputTag
  value={tags}
  onChange={setTags}
  placeholder="태그 입력 후 Enter"
  maxTags={5}
/>
          `}
        >
          <h2>Default</h2>
          <p>태그 입력 필드의 기본 렌더링 예시입니다.</p>
          <div
            style={{ width: '400px' }}
            className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem]"
          >
            <InputTag value={['태그1', '태그2']} onChange={() => {}} placeholder="태그를 입력하세요" />
          </div>

          <h2 className="mt-8">Error State</h2>
          <p>error=true 상태 시 빨간색 테두리와 에러 메시지가 표시됩니다.</p>
          <div
            style={{ width: '400px' }}
            className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem]"
          >
            <InputTag value={['오류태그']} error errorMsg="필수 입력값입니다." errorPs="bl" onChange={() => {}} />
          </div>
        </StoryDocTemplate>
      ),
    },
    controls: { expanded: false },
  },
  argTypes: {
    value: {
      control: 'object',
      description: '등록된 태그 목록 배열',
      table: { category: '데이터 props' },
    },
    onChange: {
      action: 'changed',
      table: { category: '이벤트 props' },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'box-line'],
      description: 'Input 스타일 variant',
      table: { category: '스타일 props' },
    },
    placeholder: {
      control: 'text',
      description: '입력창 placeholder',
      table: { category: '설정 props' },
    },
    maxTags: {
      control: { type: 'number', min: 1, max: 10 },
      description: '최대 입력 가능한 태그 개수',
      table: { category: '설정 props' },
    },
    disabled: {
      control: 'boolean',
      table: { category: '설정 props' },
    },
    error: {
      control: { type: 'boolean' },
      table: { category: '에러 props' },
    },
    errorMsg: {
      control: { type: 'text' },
      table: { category: '에러 props' },
    },
    errorPs: {
      control: { type: 'select' },
      options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
      table: { category: '에러 props' },
    },
    className: { table: { disable: true } },
  },
  args: {
    variant: 'default',
    value: [],
    placeholder: '태그를 입력하세요',
    maxTags: 10,
    disabled: false,
    error: false,
    errorMsg: '선택은 필수입니다.',
    errorPs: 'bl',
  },
};

export default meta;
type Story = StoryObj<typeof InputTag>;

export const Default: Story = {
  render: (args) => {
    const [tags, setTags] = React.useState<string[]>([]);
    return (
      <div style={{ width: 400 }}>
        <InputTag {...args} value={tags} onChange={setTags} />
        <div style={{ marginTop: 12, fontSize: 14, color: '#888' }}>
          현재 태그: {tags.length === 0 ? '없음' : tags.join(', ')}
        </div>
      </div>
    );
  },
};
