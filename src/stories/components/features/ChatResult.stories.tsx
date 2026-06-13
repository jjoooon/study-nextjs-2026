/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Gcol } from '@atoms';
import { Controls, Markdown, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatResult, type ChatResultItem } from '@/shared/components/features/ChatResult';

const sampleChatData: ChatResultItem[] = [
  {
    name: '심부산',
    title: '심사 요청 내용',
    content: '보험료 산출 결과와 고지 내용 기준으로 심사 검토를 요청드립니다.',
    date: '2026.05.08 10:30',
    uw_name: 'UW심사팀',
    uw_title: '심사 결과 안내',
    uw_content: '고지하신 병력을 기준으로 부담보 조건 검토가 필요합니다.<br />계약 전 알릴 의무 확인이 필요합니다.',
    uw_info: '최근 5년 이내 치료 이력 관련 추가 서류를 확인해주세요.<br />계약자 설명 후 진행 바랍니다.',
    uw_state: ['계약 전 알릴 의무 확인', '부담보 설정 범위 설명'],
    uw_date: '2026.05.08 11:00',
    uw_detail: '상세보기 예시',
  },
  {
    name: '심부산',
    title: '추가 심사 요청',
    content: '추가 담보 증액 여부를 포함하여 재심사를 요청드립니다.',
    date: '2026.05.08 13:20',
    uw_name: 'UW심사팀',
    uw_title: '재심사 결과',
    uw_content: '추가 담보는 조건부 인수가 가능합니다.<br />고객 안내 후 선택 여부를 확인해주세요.',
    uw_info: '보장 제한 범위 및 사유를 고객에게 충분히 설명해야 합니다.',
    uw_state: ['조건부 인수 가능', '고객 선택 확인 필요'],
    uw_date: '2026.05.08 14:10',
    uw_detail: '상세보기 예시',
  },
];

const meta: Meta<typeof ChatResult> = {
  title: 'Components/Features/ChatResult',
  component: ChatResult,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <h2>Overview</h2>
          <p>심사 요청과 심사 결과 대화를 카드 형태로 보여주는 컴포넌트입니다.</p>
          <Primary />
          <Controls />
          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
import { ChatResult } from '@/shared/components/features/ChatResult';

<ChatResult chatData={chatData} />
\`\`\`
            `}
          </Markdown>
          <h2>API Reference</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>chatData</td>
                <td>ChatResultItem[]</td>
                <td>대화 목록 데이터입니다.</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChatResult>;

export const Default: Story = {
  name: '기본',
  render: (args) => (
    <Gcol className="w-[40rem] h-[72rem] border border-[var(--color-gray-20)] rounded-lg overflow-hidden">
      <ChatResult {...args} />
    </Gcol>
  ),
  args: {
    chatData: sampleChatData,
  },
};
