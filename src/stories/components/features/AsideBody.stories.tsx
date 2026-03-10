import type { Meta, StoryObj } from '@storybook/react';
import AsideBody from '@/shared/components/features/AsideBody';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';

const simpleContractInfo: LTRA350DataType['aside']['simpleContractInfo'] = {
  date: '2024.03.15',
  info: ['신규', '일반', '비갱신'],
  polName: '홍길동',
  insName: '김철수',
  insAge: '35',
  insGender: '남',
  insGrade: '1급',
  quoteExpiryDate: '2024.04.15',
  insuranceAgeDate: '2024.05.20',
  consentEndDate: '2024.06.30',
  note: '특이사항 메모입니다.',
};

const asideData: LTRA350DataType['aside'] = {
  simpleContractInfo,
};

const meta: Meta<typeof AsideBody> = {
  title: 'Components/Features/AsideBody',
  component: AsideBody,
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
                AsideBody 컴포넌트는 우측 사이드 패널의 계약 요약 본문을 렌더링합니다.<br />
                `simpleContractInfo`를 기반으로 계약자/피보험자 정보, 주요 기준일, 상태 배지, 메모와 QuickLinks를 제공합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>AsideBody는 `data` prop 하나로 렌더링되며, 내부적으로 `data.simpleContractInfo`를 사용합니다.</p>
            <ul>
              <li>보험시기 및 계약 상태 정보 표시</li>
              <li>계약자/피보험자 기본 식별 정보 표시</li>
              <li>설계유효기간/상령일/동의종료일 및 메모 표시</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import AsideBody from '@/shared/components/features/AsideBody';

const simpleContractInfo = {
  date: '2024.03.15',
  info: ['신규', '일반', '비갱신'],
  polName: '홍길동',
  insName: '김철수',
  insAge: '35',
  insGender: '남',
  insGrade: '1급',
  quoteExpiryDate: '2024.04.15',
  insuranceAgeDate: '2024.05.20',
  consentEndDate: '2024.06.30',
  note: '특이사항 메모입니다.',
};

const data = { simpleContractInfo };

<AsideBody data={data} />
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>AsideBody 컴포넌트에서 사용하는 주요 prop/data 필드는 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>data</td><td>LTRA350DataType['aside']</td><td>AsideBody 입력 데이터</td></tr>
                <tr><td>data.simpleContractInfo.date</td><td>string</td><td>보험시기</td></tr>
                <tr><td>data.simpleContractInfo.info</td><td>string[]</td><td>계약 상태 정보(신규/일반/비갱신 등)</td></tr>
                <tr><td>data.simpleContractInfo.polName</td><td>string</td><td>계약자명</td></tr>
                <tr><td>data.simpleContractInfo.insName</td><td>string</td><td>피보험자명</td></tr>
                <tr><td>data.simpleContractInfo.quoteExpiryDate</td><td>string</td><td>설계유효기간</td></tr>
                <tr><td>data.simpleContractInfo.note</td><td>string</td><td>특이사항 메모</td></tr>
              </tbody>
            </table>

            <h2>Preview</h2>
            <p>실제 사용 컨텍스트에 맞춰 고정 사이드 패널 영역에서 렌더링한 예시입니다.</p>
            <Unstyled>
              <div
                className="border border-gray-200 bg-white relative flex flex-col overflow-hidden"
                style={{ width: '30rem', height: '60rem' }}
              >
                <AsideBody data={asideData} />
              </div>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'AsideBody 렌더링에 사용할 aside 데이터',
    },
  },
  args: {
    data: asideData,
  },
};

export default meta;
type Story = StoryObj<typeof AsideBody>;

export const Default: Story = {
  render: (args) => (
    <div
      className="border border-gray-200 bg-white relative flex flex-col overflow-hidden"
      style={{ width: '30rem', height: '60rem' }}
    >
      <AsideBody {...args} />
    </div>
  ),
};