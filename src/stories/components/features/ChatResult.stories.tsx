/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { ChatResult, type ChatResultItem } from '@/shared/components/features/ChatResult';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Gcol } from '@atoms';

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
        <StoryDocTemplate
          title="ChatResult"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화',
          ]}
          overview={`심사 요청과 심사 결과 대화를 카드 형태로 보여주는 컴포넌트입니다.
내부적으로 페이지 네비게이션과 스무스 스크롤을 탑재하여 긴 심사 이력도 페이지 단위로 쉽게 탐색할 수 있습니다.`}
          usageCode={`import { ChatResult } from '@/shared/components/features/ChatResult';

<ChatResult chatData={chatData} />`}
          apiReference={[
            {
              prop: 'chatData',
              type: 'ChatResultItem[]',
              description: '대화 목록 데이터 (심사 요청 및 결과 연계)',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    chatData: {
      control: 'object',
      description: '대화 목록 데이터 (ChatResultItem[])',
      table: { category: 'Data' },
    },
  },
  args: {
    chatData: sampleChatData,
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
