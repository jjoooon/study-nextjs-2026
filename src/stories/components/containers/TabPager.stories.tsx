/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ // useState는 아래에서 React.useState로 사용하므로 별도 import 필요 없음
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Gcol, Grow } from '@atoms';
import { Button } from '@uiux/Button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@uiux/HoverCard';
import { BulletList, BulletListItem } from '@common/BulletList';
import { ErrorMsg } from '@common/ErrorMsg';
import { TabPager } from '@common/TabPager';
// import { Tabs, TabsList, TabsTrigger, TabsContent, TabsPanel, TabsLine } from '@uiux/Tabs';


const DATA_TABS_4 = [
  {
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
  {
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    info: [
      '추가정보1',
      '추가정보2',
      '추가정보3',
      '추가정보4',
      '추가정보5',
      '추가정보6',
      '추가정보7',
      '추가정보8',
      '추가정보9',
    ],
  },
];

const DATA_TABS_3 = null;

const meta: Meta<typeof TabPager> = {
  title: 'Components/Containers/Tabs',
  component: TabPager,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />
            <h2>History</h2>
            <ul>
              <li>2026.03.29</li>
            </ul>
            <h2>Overview</h2>
            <div>
              <p>
                <b>Tab</b>는 많은 탭을 한 화면에 효율적으로 보여주기 위해 페이징, 드롭다운, 네비게이션, 에러 메시지 등
                다양한 기능을 제공하는 고급 탭 컴포넌트입니다.
                <br />
                <code>variant</code>, <code>hasTableBelow</code>, <code>removable</code>, <code>visibleCount</code>,{' '}
                <code>error</code>, <code>errorMsg</code>, <code>getValue</code>, <code>renderTab</code>,{' '}
                <code>renderDropdownItem</code> 등 다양한 props를 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>TabPager의 주요 props 예시입니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { TabPager } from '@common/TabPager';
import { useTabs } from '@/shared/hooks/useTabs';

const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

<TabPager
  data={tabs}
  active={active}
  setActive={setActive}
  removable={false}
  onRemove={handleRemove}
  visibleCount={4}
  variant="default"
  hasTableBelow={true}
  error={false}
  errorMsg="에러 메시지 예시"
  getValue={tab => String(tab.value)}
  renderTab={tab => <span>{tab.label}</span>}
  renderDropdownItem={false}
>
  탭 컨텐츠
</TabPager>


### 동적 탭 추가 가이드 (Dynamic Tabs Integration Guide)

TabPager를 사용하여 동적으로 탭을 추가하고 삭제하는 권장 방식은 **부모 컴포넌트의 React State(상태)를 기반**으로 제어하는 것입니다.

#### 1. 상태 및 제어 핸들러 구현
탭의 데이터 배열(\`tabs\`)과 현재 활성화된 탭 식별자(\`active\`)를 선언합니다.

const [tabs, setTabs] = React.useState([
  { name: '홍길동', value: 'tab1', ... },
  { name: '김철수', value: 'tab2', ... }
]);
const [active, setActive] = React.useState('tab1');

#### 2. 동적 추가 (Add Tab)
새로운 고유 식별자(\`value\`)를 갖는 객체를 만들어 배열 상태에 결합하고, 해당 식별자를 활성화 상태(\`active\`)에 주입하여 새로 추가된 탭으로 즉시 화면이 전환되도록 제어합니다.

const handleAddTab = () => {
  const newId = \`tab-\${Date.now()}\`; // 고유 키 생성
  const newTab = {
    name: '새설계서',
    value: newId,
  };
  setTabs([...tabs, newTab]); // 상태 업데이트
  setActive(newId); // 신규 탭 활성화 포커스 이동
};

#### 3. 동적 제거 (Remove Tab)
\`removable={true}\` 옵션을 주어 개별 탭 버튼에 삭제(X) 아이콘 버튼을 노출시킵니다. \`onRemove\` 콜백을 통해 탭을 목록 상태에서 제외하고, 삭제된 탭이 활성화 상태였을 경우 인접한 남아있는 다른 탭으로 활성화 포커스를 안전하게 이전시킵니다.

const handleRemoveTab = (value: string) => {
  const updated = tabs.filter((t) => t.value !== value);
  setTabs(updated);
  if (active === value && updated.length > 0) {
    setActive(updated[updated.length - 1].value);
  }
};
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>TabPager의 주요 prop과 타입, 설명입니다.</p>
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
                  <td>&apos;default&apos; | &apos;sub&apos; | &apos;outlined&apos; | &apos;box&apos;</td>
                  <td>탭 스타일</td>
                </tr>
                <tr>
                  <td>hasTableBelow</td>
                  <td>boolean</td>
                  <td>default variant에서 하단에 테이블이 있는 경우 라인 두께를 0.2rem로 사용</td>
                </tr>
                <tr>
                  <td>removable</td>
                  <td>boolean</td>
                  <td>탭 제거 가능 여부</td>
                </tr>
                <tr>
                  <td>active</td>
                  <td>string</td>
                  <td>현재 활성 탭 값</td>
                </tr>
                <tr>
                  <td>setActive</td>
                  <td>(value: string) =&gt; void</td>
                  <td>활성 탭 변경 핸들러</td>
                </tr>
                <tr>
                  <td>onRemove</td>
                  <td>(value: string) =&gt; void</td>
                  <td>탭 삭제 핸들러</td>
                </tr>
                <tr>
                  <td>visibleCount</td>
                  <td>number</td>
                  <td>한 번에 보여줄 탭 개수</td>
                </tr>
                <tr>
                  <td>error</td>
                  <td>boolean</td>
                  <td>에러 상태 표시</td>
                </tr>
                <tr>
                  <td>errorMsg</td>
                  <td>string</td>
                  <td>에러 메시지</td>
                </tr>
                <tr>
                  <td>getValue</td>
                  <td>(tab: T) =&gt; string</td>
                  <td>탭의 고유값 추출 함수</td>
                </tr>
                <tr>
                  <td>renderTab</td>
                  <td>(tab: T) =&gt; ReactNode</td>
                  <td>탭 렌더 함수</td>
                </tr>
                <tr>
                  <td>renderDropdownItem</td>
                  <td>false | (args) =&gt; ReactNode</td>
                  <td>드롭다운 아이템 렌더 함수 또는 비활성화</td>
                </tr>
                <tr>
                  <td>renderButtons</td>
                  <td>ReactNode</td>
                  <td>오른쪽 버튼 영역</td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
      argTypes: { expanded: false },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'box'],
      description: '탭 버튼 스타일',
      table: { category: '스타일 props' },
    },
    hasTableBelow: {
      control: 'boolean',
      description: 'default variant에서 하단 테이블 유무에 따른 라인 두께 제어',
      table: { category: '스타일 props' },
    },
    removable: {
      control: 'boolean',
      description: '탭 제거 가능 여부',
      table: { category: '설정 props' },
    },
    visibleCount: {
      control: 'number',
      description: '한 번에 보여줄 탭 개수',
      table: { category: '설정 props' },
    },
    error: {
      control: 'boolean',
      description: '에러 상태 표시',
      table: { category: '에러 props' },
    },
    errorMsg: {
      control: 'text',
      table: { category: '에러 props' },
    },
    getValue: {
      table: { disable: true },
    },
    setActive: {
      table: { disable: true },
    },
    renderTab: {
      table: { disable: true },
    },
    renderButtons: {
      table: { disable: true },
    },
    onRemove: {
      table: { disable: true },
    },
    renderDropdownItem: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
    data: {
      table: { disable: true },
    },
    active: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    hasTableBelow: false,
    removable: false,
    error: false,
    visibleCount: 4,
  },
};

export default meta;
type Story = StoryObj<typeof TabPager>;

export const Default: Story = {
  render: (args) => {
    const { tabs, active, setActive, handleRemove } = useTabs<{
      name?: string;
      age?: string;
      gender?: string;
      info?: string[];
      value: string;
    }>(DATA_TABS_3);
    const {
      tabs: tabs2,
      active: active2,
      setActive: setActive2,
      handleRemove: handleRemove2,
    } = useTabs<(typeof DATA_TABS_4)[0]>(DATA_TABS_4);

    return (
      <Gcol gap={4} className="w-full p-8">
        <TabPager
          data={tabs2}
          active={active2}
          setActive={setActive2}
          removable={args.removable}
          onRemove={handleRemove2}
          visibleCount={args.visibleCount}
          variant={args.variant}
          hasTableBelow={args.hasTableBelow}
          error={args.error}
          getValue={(tab) => String(tab.value)}
          renderButtons={false}
          renderTab={(tab) => (
            <span className="flex items-center">
              <span className="max-w-20 truncate block">{tab.name}</span>
              <span className="block">{`${tab.age}세(${tab.gender})`}</span>
            </span>
          )}
          renderDropdownItem={false}
        >
          <div className="w-full p-10 bg-[var(--color-gray-5)] flex items-center justify-center">내용{active2}</div>
        </TabPager>

        <TabPager
          data={tabs}
          active={active}
          setActive={setActive}
          removable={args.removable}
          onRemove={handleRemove}
          visibleCount={args.visibleCount}
          variant={args.variant}
          hasTableBelow={args.hasTableBelow}
          error={args.error}
          errorMsg="입력하세요."
          getValue={(tab) => String(tab.value)}
          renderButtons={
            <Grow gap={2.5}>
              <Grow>
                <Button variant="outlined" color="gray" size="md">
                  버튼1
                </Button>
                <Button variant="outlined" color="gray" size="md">
                  버튼2
                </Button>
              </Grow>
              <Grow>
                <Button variant="outlined" color="gray" size="md">
                  버튼1
                </Button>
                <Button variant="outlined" color="gray" size="md">
                  버튼2
                </Button>
              </Grow>
            </Grow>
          }
          renderTab={(tab) => (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="flex items-center">
                  <span className="max-w-20 truncate block">{tab.name}</span>
                  <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                </span>
              </HoverCardTrigger>
              <HoverCardContent>
                <BulletList>
                  {tab.info?.map((info, index) => (
                    <BulletListItem key={index} type="dot">
                      {info}
                    </BulletListItem>
                  ))}
                </BulletList>
              </HoverCardContent>
            </HoverCard>
          )}
          renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
            <Button
              variant="text"
              color="gray"
              key={String(tab.value)}
              onClick={() => {
                setActive(String(tab.value));
                const idx = data.findIndex((t) => String(t.value) === String(tab.value));
                if (idx !== -1) {
                  const page = Math.floor(idx / visibleCount);
                  setVisibleStart(page * visibleCount);
                }
              }}
            >
              <span className="flex items-center gap-2">
                <span className="block">{tab.name}</span>
                <span className="block">{`${tab.age}세(${tab.gender})`}</span>
              </span>
            </Button>
          )}
        >
          <div className="w-full p-10 bg-[var(--color-gray-5)] flex items-center justify-center">테이블{active2}</div>
        </TabPager>
      </Gcol>
    );
  },
};

export const DynamicTabs: Story = {
  render: (args) => {
    const [tabs, setTabs] = React.useState([
      { name: '홍길동', age: '30', gender: '남', value: 'tab1', info: ['초기 탭 1'] },
    ]);
    const [active, setActive] = React.useState('tab1');

    const handleAddTab = () => {
      const newId = `tab-${Date.now()}`;
      const newTab = {
        name: `새설계서_${tabs.length + 1}`,
        age: String(20 + tabs.length),
        gender: tabs.length % 2 === 0 ? '여' : '남',
        value: newId,
        info: [`동적으로 생성된 탭 ${tabs.length + 1}의 정보`],
      };
      setTabs([...tabs, newTab]);
      setActive(newId);
    };

    const handleRemoveTab = (value: string) => {
      const updated = tabs.filter((t) => t.value !== value);
      setTabs(updated);
      if (active === value && updated.length > 0) {
        setActive(updated[updated.length - 1].value);
      }
    };

    return (
      <Gcol gap={4} className="w-full p-8">
        <Grow gap={2} className="mb-2">
          <Button variant="contained" color="primary" onClick={handleAddTab}>
            가상 탭 추가 버튼 (+ 탭 추가)
          </Button>
        </Grow>
        <TabPager
          data={tabs}
          active={active}
          setActive={setActive}
          removable={true}
          onRemove={handleRemoveTab}
          visibleCount={args.visibleCount}
          variant={args.variant}
          hasTableBelow={args.hasTableBelow}
          error={args.error}
          getValue={(tab) => String(tab.value)}
          renderButtons={false}
          renderTab={(tab) => (
            <span className="flex items-center">
              <span className="max-w-20 truncate block">{tab.name}</span>
              <span className="block">{`${tab.age}세(${tab.gender})`}</span>
            </span>
          )}
          renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
            <Button
              variant="text"
              color="gray"
              key={String(tab.value)}
              onClick={() => {
                setActive(String(tab.value));
                const idx = data.findIndex((t) => String(t.value) === String(tab.value));
                if (idx !== -1) {
                  const page = Math.floor(idx / visibleCount);
                  setVisibleStart(page * visibleCount);
                }
              }}
            >
              <span className="flex items-center gap-2">
                <span className="block">{tab.name}</span>
                <span className="block">{`${tab.age}세(${tab.gender})`}</span>
              </span>
            </Button>
          )}
        >
          <div className="w-full p-10 bg-[var(--color-gray-5)] flex flex-col items-center justify-center gap-2">
            <h4 className="text-[1.6rem] font-bold">활성화된 탭 ID: {active}</h4>
            <p className="text-[1.4rem]">{tabs.find((t) => t.value === active)?.info[0]}</p>
          </div>
        </TabPager>
      </Gcol>
    );
  },
};

export const EffectActivation: Story = {
  render: (args) => {
    const [tabs, setTabs] = React.useState([
      { name: '1단계: 기본 정보', value: 'step1', disabled: false },
      { name: '2단계: 건강 고지', value: 'step2', disabled: true },
    ]);
    const [active, setActive] = React.useState('step1');
    const [isStep1Completed, setIsStep1Completed] = React.useState(false);

    React.useEffect(() => {
      if (isStep1Completed) {
        setTabs((prevTabs) => prevTabs.map((tab) => (tab.value === 'step2' ? { ...tab, disabled: false } : tab)));
      } else {
        setTabs((prevTabs) => prevTabs.map((tab) => (tab.value === 'step2' ? { ...tab, disabled: true } : tab)));
        if (active === 'step2') {
          setActive('step1');
        }
      }
    }, [isStep1Completed]);

    return (
      <Gcol gap={4} className="w-full p-8">
        <Grow gap={2} className="mb-2 items-center">
          <Button
            variant="contained"
            color={isStep1Completed ? 'gray' : 'primary'}
            onClick={() => setIsStep1Completed(!isStep1Completed)}
          >
            {isStep1Completed ? '1단계 완료 취소 (탭 비활성화)' : '1단계 검증 완료 (탭 활성화)'}
          </Button>
          <span className="text-[1.3rem] text-[var(--color-gray-60)] ml-2">
            현재 상태: {isStep1Completed ? '1단계 검증 완료 (2단계 활성화됨)' : '1단계 미완료 (2단계 클릭 불가)'}
          </span>
        </Grow>
        <TabPager
          data={tabs}
          active={active}
          setActive={setActive}
          getValue={(tab) => tab.value}
          renderTab={(tab) => <span className="text-[1.3rem] font-bold">{tab.name}</span>}
          visibleCount={args.visibleCount}
          variant={args.variant}
        >
          <div className="w-full p-10 bg-[var(--color-gray-5)] flex flex-col items-center justify-center gap-2">
            <h4 className="text-[1.6rem] font-bold">
              현재 보고 있는 탭: {active === 'step1' ? '1단계 기본 정보' : '2단계 건강 고지'}
            </h4>
            <p className="text-[1.4rem]">
              {active === 'step1'
                ? '기본 정보 입력 화면입니다. 상단의 검증 완료 버튼을 누르시면 2단계 탭이 활성화됩니다.'
                : '축하합니다! 비활성화되었던 2단계 건강 고지 탭에 진입하셨습니다.'}
            </p>
          </div>
        </TabPager>
      </Gcol>
    );
  },
};

export const HandlerActivation: Story = {
  render: (args) => {
    const [tabs, setTabs] = React.useState([
      { name: '1단계: 약관 동의', value: 'step1', disabled: false },
      { name: '2단계: 상품 가입', value: 'step2', disabled: true },
    ]);
    const [active, setActive] = React.useState('step1');

    const handleAgreeAndNext = () => {
      setTabs((prevTabs) => prevTabs.map((tab) => (tab.value === 'step2' ? { ...tab, disabled: false } : tab)));
      setActive('step2');
    };

    const handleReset = () => {
      setTabs((prevTabs) => prevTabs.map((tab) => (tab.value === 'step2' ? { ...tab, disabled: true } : tab)));
      setActive('step1');
    };

    return (
      <Gcol gap={4} className="w-full p-8">
        <Grow gap={2} className="mb-2">
          {tabs.find((t) => t.value === 'step2')?.disabled ? (
            <Button variant="contained" color="primary" onClick={handleAgreeAndNext}>
              동의하고 다음단계 이동 (이벤트 핸들러에서 즉시 활성화 + 탭이동)
            </Button>
          ) : (
            <Button variant="outlined" color="gray" onClick={handleReset}>
              초기화 (탭 다시 비활성화)
            </Button>
          )}
        </Grow>
        <TabPager
          data={tabs}
          active={active}
          setActive={setActive}
          getValue={(tab) => tab.value}
          renderTab={(tab) => <span className="text-[1.3rem] font-bold">{tab.name}</span>}
          visibleCount={args.visibleCount}
          variant={args.variant}
        >
          <div className="w-full p-10 bg-[var(--color-gray-5)] flex flex-col items-center justify-center gap-2">
            <h4 className="text-[1.6rem] font-bold">
              현재 보고 있는 탭: {active === 'step1' ? '1단계 약관 동의' : '2단계 상품 가입'}
            </h4>
            <p className="text-[1.4rem]">
              {active === 'step1'
                ? '약관 내용을 확인하시고 상단 버튼을 클릭하시면 2단계 가입 탭 활성화와 동시에 탭이 자동으로 전환됩니다.'
                : '가입서 작성 화면입니다.'}
            </p>
          </div>
        </TabPager>
      </Gcol>
    );
  },
};
