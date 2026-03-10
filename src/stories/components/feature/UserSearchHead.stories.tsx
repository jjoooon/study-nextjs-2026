import type { Meta, StoryObj } from '@storybook/react';
import { Gcol, Grow, Typo } from '@atoms';
import UserSearchHead  from '@/shared/components/features/UserSearchHead';
import { Title, Primary, Controls, Canvas, Markdown } from '@storybook/addon-docs/blocks';


interface User {
  id: string;
  name?: string;
  age: number;
  gender: string;
  date?: string; // For unregistered customers: date info
  grade?: string; // For unregistered customers: grade info
  jab?: string; // For registered customers: job info
  history?: string; // For registered customers: medical history
  plan?: string; // For registered customers: plan progress info
  product?: string; // For registered customers: product recommendation info
}
type DummyDataType = {
  [key: string]: {
    id: string;
    tabName: string;
    data: User[];
  };
};
const DummyData: DummyDataType = {
  registeredCustomers : {
    id : '1',
    tabName: '최근등록고객',
    data : [
      { id: '1', name: '홍길동', age: 31, gender: '남', product:'20년 종신보험', jab:'IT 개발자', history: '고혈압 진단(2024)', plan: '2026.03.01 완료' },
      { id: '2', name: '김철수', age: 29, gender: '여', product:'실손보험', jab:'초등학교 교사', history: '무병력', plan: '2026.02.20 진행중' },
      { id: '3', name: '이영희', age: 36, gender: '여', product:'암보험', jab:'프리랜서 디자이너', history: '갑상선 수술(2022)', plan: '2026.01.15 완료' },
      { id: '4', name: '박하늘', age: 27, gender: '남', product:'연금보험', jab:'은행원', history: '무병력', plan: '2026.03.05 진행중' },
      { id: '5', name: '최수영', age: 34, gender: '여', product:'치아보험', jab:'요양보호사', history: '치아 치료(2025)', plan: '2026.02.28 완료' },
      { id: '6', name: '한지민', age: 25, gender: '남', product:'운전자보험', jab:'택시기사', history: '교통사고 입원(2023)', plan: '2026.03.10 진행중' },
    ],
  },
  unregisteredCustomers : {
    id : '2',
    tabName: '미등록고객',
    data : [
      { id: '1', date: '206.03.04', age: 30, gender: '남', grade: '1', },
      { id: '2', date: '206.03.04', age: 30, gender: '여', grade: '1', },
      { id: '3', date: '206.03.04', age: 25, gender: '여', grade: '2', },

    ]
  }
}


const meta: Meta<typeof UserSearchHead> = {
  title: 'Components/Features/UserSearchHead',
  component: UserSearchHead,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>Overview</h2>
          <div>
            <p>
              UserSearchHead 컴포넌트는 사용자 검색 및 탭 전환 등 상단 검색/필터 UI를 제공합니다.<br />
              검색 조건, 탭, 버튼 등 다양한 조합이 가능합니다.
            </p>
          </div>
          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>사용자 검색, 필터, 탭 전환 등 상단 영역에 활용합니다.</p>
          <Markdown>
            {`
\`\`\`tsx
import { UserSearchHead } from '@/shared/components/features/UserSearchHead';

<UserSearchHead />
\`\`\`
            `}
          </Markdown>
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof UserSearchHead>;

export const Default: Story = {
  render: (args) => {
    return (
      <Grow className="p-8">
        <UserSearchHead
          data={DummyData} />
      </Grow>
    );
  },
};

