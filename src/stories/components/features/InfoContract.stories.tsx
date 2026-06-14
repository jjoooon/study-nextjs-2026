/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { InfoContract } from '@common/InfoContract';

// Mock data matching InfoContractBaseData shape
const mockInfoContractData = {
  aside: {
    simpleContractInfo: {
      date: '2024-05-08',
      polName: '김한화',
      insName: '김한화',
      insAge: '32',
      insGender: '여',
      insGrade: '1급',
      info: [],
      quoteExpiryDate: '2026-06-30',
      insuranceAgeDate: '2026-08-16',
      consentEndDate: '2026-06-30',
      note: '알릴사항 대상',
    },
  },
};

// types
type LTPA350ProcessStep = number;
type LTPA350ProcessItem = {
  step: LTPA350ProcessStep;
  label: string;
};
type LTPA350ProcessState = {
  complete: LTPA350ProcessStep[];
  active: LTPA350ProcessStep;
};
type LTPA350TaskStateItem = {
  id: number;
  status: '정상' | '경고' | '중지';
  label: string;
  sum: number;
};
interface LTPA350DataType {
  head: {
    pageID: {
      pageName: string;
      pageId: string;
    };
    pageTitle: {
      simpleMode: boolean;
      title: string;
      options: string[];
      planNumber: string[];
      contractHolder: string;
      planNumberList: Array<{
        label: string;
        value: string;
        name: string;
        amount: string;
        state: string;
      }>;
    };
  };
  process: {
    list: LTPA350ProcessItem[];
    state: LTPA350ProcessState;
  };
  aside: {
    taskState: LTPA350TaskStateItem[];
    simpleContractInfo: {
      date: string;
      polName: string;
      insName: string;
      insAge: string;
      insGender: string;
      insGrade: string;
      info: string[];
      quoteExpiryDate: string;
      insuranceAgeDate: string;
      consentEndDate: string;
      note: string;
    };
  };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data: LTPA350DataType = {
  head: {
    pageID: {
      pageName: '가입설계',
      pageId: 'LTPA350',
    },
    pageTitle: {
      simpleMode: true,
      title: '한화 시그니처 여성 건강보험 3.0 2504',
      options: ['납입면제 강화형', '기본형'],
      planNumber: ['LA20234472050000', '2'],
      contractHolder: '6012345 박하늘별님달',
      planNumberList: [
        { label: 'LA20234472050000', value: 'LA20234472050000', name: '김은빈', amount: '23,000', state: '설계중' },
        { label: 'LA23234472050001', value: 'LA23234472050001', name: '박하늘', amount: '45,500', state: '계약완료' },
        { label: 'LA20234472050002', value: 'LA20234472050002', name: '이도현', amount: '12,300', state: '심사중' },
        { label: 'LA20234472050003', value: 'LA20234472050003', name: '최수영', amount: '99,900', state: '청약완료' },
        { label: 'LA20234472050004', value: 'LA20234472050004', name: '한지민', amount: '77,700', state: '설계중' },
      ],
    },
  },
  process: {
    list: [
      { step: 1, label: '계약사항' },
      { step: 2, label: '담보설계' },
      { step: 3, label: '알릴사항' },
      { step: 4, label: '심사요청' },
      { step: 5, label: '추가사항' },
      { step: 6, label: '수납' },
    ],
    state: {
      complete: [1],
      active: 2,
    },
  },
  aside: {
    taskState: [
      { id: 1, status: '정상', label: '누적', sum: 24 },
      { id: 2, status: '경고', label: '중복', sum: 1 },
      { id: 3, status: '중지', label: '직업', sum: 0 },
      { id: 4, status: '정상', label: '기타', sum: 99 },
    ],
    simpleContractInfo: {
      date: '2024-05-08',
      polName: '홍길동',
      insName: '홍길동',
      insAge: '32',
      insGender: '남',
      insGrade: '1급',
      info: ['100세만기', '20년납입', '월납', '20년갱신', '1형(일반고지형)'],
      quoteExpiryDate: '2024-06-30',
      insuranceAgeDate: '2024-05-08',
      consentEndDate: '2024-06-30',
      note: '알릴사항 비대상',
    },
  },
};

const meta: Meta<typeof InfoContract> = {
  title: 'Components/Features/Aside/계약정보(InfoContract)',
  component: InfoContract,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="InfoContract"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화 (extraContent 렌더 시연 추가)',
          ]}
          overview={`InfoContract 컴포넌트는 보험 계약의 주요 정보를 Aside 영역에 표시하는 UI 요소입니다.
설계중, 보험시기, 계약자/피보험자, 유효기간 등 다양한 정보를 시각적으로 제공합니다.`}
          usageCode={`import { InfoContract } from '@/shared/components/common/InfoContract';

<InfoContract data={contractData} />`}
          apiReference={[
            {
              prop: 'data',
              type: 'InfoContractBaseData | null',
              description: '표시할 계약 정보 데이터 (null일 경우 빈 보드 표시)',
            },
            {
              prop: 'extraContent',
              type: 'ReactNode',
              description: '우측에 심사진행현황 및 인수/심사공지를 렌더링하는 추가 영역',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    data: {
      description: '계약정보 데이터',
      control: { type: 'object' },
      table: { category: 'Data' },
    },
    extraContent: {
      description: '추가 컨텐츠 영역',
      control: 'text',
      table: { category: 'Content' },
    },
  },
  args: {
    data: mockInfoContractData.aside.simpleContractInfo,
    extraContent: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof InfoContract>;

export const Default: Story = {
  render: (args) => <InfoContract {...args} />,
  args: {
    data: mockInfoContractData.aside.simpleContractInfo,
  },
};

export const WithExtraContent: Story = {
  render: (args) => <InfoContract {...args} />,
  args: {
    data: mockInfoContractData.aside.simpleContractInfo,
    extraContent: <div>추가 컨텐츠 시연</div>,
  },
};
