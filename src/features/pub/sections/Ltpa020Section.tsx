'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { RecommendCard } from '@common/RecommendCard';
import { AdderIcon2, AiIcon, CalendarIcon, ChevronDownIcon, FileItemIcon, ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import * as React from 'react';
import { PageID } from '@/shared/components/features/PageID';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';
import { LayoutTemplate } from '@/shared/components/layout/LayoutTemplate';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { useCallback, useState } from 'react';
import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@/shared/components/agGridUtils/AgGridUtils';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridReact } from 'ag-grid-react';
import { Badge } from '@/shared/components/uiux/Badge';
import {
  dummyData,
  dummyData2,
  dummyData3,
  type DummyDataType,
  type DummyDataType2,
  type DummyDataType3,
} from '@/features/pub/data/ltpa020Data';

const productCategoryOptions = [
  { value: 'all', label: '전체' },
  { value: 'comprehensive', label: '종합건강' },
  { value: 'simple', label: '간편' },
  { value: 'female', label: '여성' },
  { value: 'cancer', label: '암/간병' },
  { value: 'childDental', label: '자녀/치아' },
  { value: 'accident', label: '상해' },
  { value: 'medical', label: '의료비' },
  { value: 'property', label: '재물' },
  { value: 'annuity', label: '연금/저축' },
];

const productFeatureOptions = [
  { value: 'all', label: '전체' },
  { value: 'simple', label: '간편' },
  { value: 'noRefund', label: '무해지' },
  { value: 'shortTerm', label: '세만기' },
  { value: 'longTerm', label: '연만기' },
];

const recentCustomerTags = [
  { id: 1, label: '홍길동 42세(남)' },
  { id: 2, label: '반짝반짝빛... 42세(남)' },
  { id: 3, label: '김한화 55세(남)' },
  { id: 4, label: '피보험자 63세(여)' },
];

const newCustomerTags = [
  { id: 1, label: '32세(여) 1급', selected: true },
  { id: 2, label: '42세(남) 1급', selected: false },
  { id: 3, label: '28세(여) 1급', selected: false },
  { id: 4, label: '55세(남) 1급', selected: false },
  { id: 5, label: '63세(여) 1급', selected: false },
];

const searchDropdownOptions = ['홍길순', '홍길동', '반짝반짝빛...', '김한화', '피보험자', '홍길자'];

type Ltpa020TabItem = {
  label: string;
  value: 'product' | 'recommend';
};

const ltpa020Tabs: Ltpa020TabItem[] = [
  {
    label: '상품선택',
    value: 'product',
  },
  {
    label: '추천설계',
    value: 'recommend',
  },
];

const recommendReasonTexts = [
  '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다.',
  '목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
  '담보별 권장 보장금액 기준 설계도 함께 확인해보실 수 있습니다.',
];

const detailTableRows: Array<{ id: number; name: string; amount: string; premium: string }> = [
  { id: 1, name: '보통약관(상해사망)', amount: '100', premium: '10' },
  { id: 2, name: '한화 더 경증 간편건강보험', amount: '100', premium: '100' },
  { id: 3, name: '보장보험료50%납입지원Ⅱ', amount: '50', premium: '494' },
  { id: 4, name: '상해사망(체증형)', amount: '100', premium: '100' },
  { id: 5, name: '상해사망추가', amount: '100', premium: '100' },
  { id: 6, name: '상해후유장해(3-100%)(갱신형)', amount: '100', premium: '100' },
  { id: 7, name: '질병사망', amount: '100', premium: '100' },
  { id: 8, name: '4대유사암진단비', amount: '100', premium: '100' },
  { id: 9, name: '...', amount: '100', premium: '100' },
];

export default function Ltpa020Section() {
  const [activeTab, setActiveTab] = React.useState<Ltpa020TabItem['value']>(ltpa020Tabs[0]?.value ?? 'product');
  const [customerType, setCustomerType] = React.useState('recent');
  const [searchValue, setSearchValue] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [gender, setGender] = React.useState('female');
  const [jobGrade, setJobGrade] = React.useState('1');
  const [productCategory, setProductCategory] = React.useState<string[]>(['comprehensive', 'female']);
  const [productFeature, setProductFeature] = React.useState<string[]>(['simple', 'shortTerm']);
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [analysisScore, setAnalysisScore] = React.useState<number | null>(null);
  const [historyScore, setHistoryScore] = React.useState<number | null>(null);
  const [selectedTagId, setSelectedTagId] = React.useState<number>(1);
  const [tabSearchValue, setTabSearchValue] = React.useState('');

  React.useEffect(() => {
    if (!ltpa020Tabs.some((tab) => tab.value === activeTab)) {
      setActiveTab(ltpa020Tabs[0]?.value ?? 'product');
    }
  }, [activeTab]);

  const recommendData = [
    {
      id: 1,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 2,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 3,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 4,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 5,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 6,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 7,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 8,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 9,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
    {
      id: 10,
      title: '한화 시그니처 여성 간편건강보험 4.0',
      plan: '납입면제형 · 기본형 · 3N5간편고지형',
      term: '20년늩/100세만기',
      detail: '9형(올인원플랜)(15~89세)...',
    },
  ];




  // 상품선택
  const [checkedMap, setCheckedMap] = React.useState({ selected: true, unselected: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const [coverageName, setCoverageName] = useState('');
  const handleActionButtonClick = useCallback(() => {}, []);
  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };


  const importanceCellRenderer =  (params: ICellRendererParams<DummyDataType>) => {
    return <Grow className='w-full' placement='bwc'>
      <Grow>
        <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="favorite">중요</Checkbox>{params.data?.field2 ?? ''}
      </Grow>
      <Grow>
        {params.data?.badge && (
            <Grow className="shrink-0">
              {params.data.badge.includes('무해지') && (
                <Badge color={'green'} className="w-[3rem]">
                  무해지
                </Badge>
              )}
              {params.data.badge.includes('간편') && (
                <Badge color={'blue'} className="w-[3rem]">
                  간편
                </Badge>
              )}
              {params.data.badge.includes('할증') && (
                <Badge color={'red'} className="w-[3rem]">
                  할증
                </Badge>
              )}
              {params.data.badge.includes('여성') && (
                <Badge color={'purple'} className="w-[3rem]">
                  여성
                </Badge>
              )}
            </Grow>
          )}
      </Grow>
    </Grow>;
  };
  


  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '상품분류', 
      field: 'field1',
      cellClass: 'text-center',
      width: 100,
    },
    {
      headerName: '상품명',
      flex: 1,
      field: 'field2',
      cellClass: 'text-left',
      cellRenderer: importanceCellRenderer,
    },
    {
      headerName: '상품분류', 
      field: 'field3',
      cellClass: 'text-center',
      width: 100,
    },
  ];

  const designCellRenderer = (params: ICellRendererParams<DummyDataType2>) => {
    return (
      <Grow className="h-full w-full">
        <Grow className="border-r border-[#ddddde] h-full aspect-auto w-[4rem] flex items-center justify-center shrink-0 pr-[1rem] pl-[0.4rem]">
          {params.data?.field1}
        </Grow>
        <Grow className="flex-1 justify-start">
          {params.data?.field2}
        </Grow>
        <Grow>
          {params.data?.btn && (
            <Button
              color="gray"
              onClick={() => {}}
              only="default"
              size="sm"
              variant="contained"
            >
              납면
            </Button>
            )}
        </Grow>
      </Grow>
    );
  };
  const moreCellRenderer = (params: ICellRendererParams<DummyDataType2>) => {
    return (
      <Grow className="h-full w-full">
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          보기
        </Button>
      </Grow>
    )
  };  


  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '종구분', 
      field: 'field1',
      flex: 1,
      cellClass: 'text-center',
      cellRenderer: designCellRenderer,
    },
     {
      headerName: '알릴사항', 
      cellClass: 'text-center',
      width: 60,
      cellRenderer: moreCellRenderer,
    },
  ];
  


  const columnDefs3: ColDef<DummyDataType3>[] = [
    {
      headerName: '플랜명', 
      field: 'field1',
      flex: 1,
    },
    {
      headerName: '담보보기', 
      width: 60,
      cellRenderer: moreCellRenderer,
    },
  ];

  type Ltpz032TabType = {
    name: string;
    value: string;
    label: string;
  };

  const DATA_TABS: Ltpz032TabType[] = [
    {
      name: '회사플랜',
      value: 'tab1',
      label: '회사플랜(6)',
    },
    {
      name: '기관플랜',
      value: 'tab2',
      label: '기관플랜(6)',
    },
    {
      name: '나만의플랜',
      value: 'tab3',
      label: '나만의플랜(6)',
    },
  ];

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '상품플랜설계', pageId: 'LTPA020' }} />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Gcol className='w-full' gap={0}>
            <Gcol
              className="w-full"
              gap={4}
            >
              <TabPager
                active={activeTab}
                data={ltpa020Tabs}
                getValue={(tab) => tab.value}
                onRemove={() => {}}
                renderTab={(tab) => (
                  <Grow
                    className={`rounded-[0.4rem] px-[1.8rem] py-[0.4rem] ${
                      activeTab === tab.value
                        ? 'bg-[linear-gradient(358deg,#FF5C2E_9.4%,#FF8D02_97.24%)] text-white'
                        : 'text-[#453C38]'
                    }`}
                    gap={0.4}
                    placement="sc"
                  >
                    {tab.value === 'product' ? (
                      <FileItemIcon color={activeTab === tab.value ? '#FFFFFF' : '#777777'} size={18} />
                    ) : (
                      <AiIcon
                        className="scale-[0.72]"
                        color={activeTab === tab.value ? '#FFE7C2' : '#F4E7D0'}
                        color2={activeTab === tab.value ? '#FFFFFF' : '#777777'}
                      />
                    )}
                    <Typo tag="span" variant="body-sm" weight="bold" className="whitespace-nowrap">
                      {tab.label}
                    </Typo>
                  </Grow>
                )}
                setActive={(value) => {
                  if (value === 'product' || value === 'recommend') {
                    setActiveTab(value);
                  }
                }}
                variant="box"
                visibleCount={4}
              >
                <Grow className="flex w-full" placement='ss'>
                  <div className={`w-full ${activeTab === 'product' ? 'block' : 'hidden'}`}>
                    <Grow className='w-full' placement='ss' gap={5}>
                      <TableFold>
                        <TableFoldHead title="상품정보"></TableFoldHead>
                        <TableFoldBody className="w-full">
                          <div className="ag-theme-alpine w-full h-[50rem]!">
                            <AgGridReact<DummyDataType>
                              getRowId={(params) => String(params.data.id)}
                              noRowsOverlayComponent={AgGridEmptyComponent}
                              rowData={dummyData}
                              columnDefs={columnDefs}
                              defaultColDef={{
                                sortable: false,
                                resizable: false,
                              }}
                              headerHeight={30}
                              rowHeight={30}
                              domLayout="normal"
                            />
                          </div>
                        </TableFoldBody>
                      </TableFold>
                      <Gcol className='max-w-[42.5rem]'>
                        <TableFold>
                          <TableFoldHead title="한화 3N5 더간편건강보험(세만기형)2601종 정보"></TableFoldHead>
                          <TableFoldBody>
                            <Gcol className='w-full' gap={5}>
                              <Gcol className='w-full'>
                                  <div className="ag-theme-alpine w-full h-60!">
                                  <AgGridReact<DummyDataType2>
                                    getRowId={(params) => String(params.data.id)}
                                    noRowsOverlayComponent={AgGridEmptyComponent}
                                    rowData={dummyData2}
                                    columnDefs={columnDefs2}
                                    defaultColDef={{
                                      sortable: false,
                                      resizable: false,
                                    }}
                                    headerHeight={30}
                                    rowHeight={30}
                                    domLayout="normal"
                                  />
                                </div>
                              </Gcol>
                              <Gcol className='w-full'>
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
                                    getValue={(tab) => String(tab.value)}
                                    renderTab={(tab) => <span>{tab.label}</span>}
                                    renderDropdownItem={false}
                                  >
                                  <div className="ag-theme-alpine w-full h-[30rem]! ag-border-t">
                                    <AgGridReact<DummyDataType3>
                                      getRowId={(params) => String(params.data.id)}
                                      noRowsOverlayComponent={AgGridEmptyComponent}
                                      rowData={dummyData3}
                                      columnDefs={columnDefs3}
                                      defaultColDef={{
                                        sortable: false,
                                        resizable: false,
                                      }}
                                      headerHeight={30}
                                      rowHeight={30}
                                      domLayout="normal"
                                    />
                                  </div>
                                </TabPager>
                              </Gcol>
                            </Gcol>  
                          </TableFoldBody>
                        </TableFold>
                      </Gcol>
                    </Grow>
                  </div>
                </Grow>
              </TabPager>
            </Gcol>


            {/* 추천설계 */}
            <Gcol className={`w-full ${activeTab === 'recommend' ? 'block' : 'hidden'}`} gap={0}>
              <Grow className="w-full bg-white px-[1rem] py-[0.4rem] border-b border-[#E5E5E5]" placement="bwe">
                <Grow gap={0.5} placement="sc">
                  <Input
                    aria-label="설계번호 검색"
                    width="14rem"
                    value={tabSearchValue}
                    onChange={(e) => setTabSearchValue(e.target.value)}
                    placeholder="설계번호 검색"
                  />
                  <Button only="icon" size="md" variant="outlined" color="gray-light" aria-label="검색">
                    <SearchIcon size={14} color="var(--color-primary-50)" />
                  </Button>
                </Grow>
              </Grow>
              <Gcol className="w-full p-[1rem]" gap={1} placement="ss">
                {/* 고객정보 박스 (294:27700) */}
                <Gcol
                  className={`w-full rounded-[0.8rem] bg-[#e4e7ec] px-[1rem] py-[1rem]${customerType === 'new' ? ' ring-2 ring-[#ff5c2e] ring-inset' : ''}`}
                  gap={1}
                  placement="ss"
                >
                  {/* Row1: 고객정보 label + 라디오 + 정보 */}
                  <Grow className="w-full" gap={1.5} placement="sc">
                    <Typo
                      tag="span"
                      variant="body-sm"
                      weight="bold"
                      className="whitespace-nowrap shrink-0 text-[#4b5563]"
                    >
                      고객정보
                    </Typo>
                    <RadioGroup value={customerType} onValueChange={setCustomerType} className="gap-[0.4rem]">
                      <RadioGroupItem value="recent" variant="button" size="md">
                        최근등록고객
                      </RadioGroupItem>
                      <RadioGroupItem value="new" variant="button" size="md">
                        미등록고객
                      </RadioGroupItem>
                    </RadioGroup>
                    {customerType === 'recent' && (
                      <Grow gap={1.5} placement="sc" className="flex-1 min-w-0 flex-wrap">
                        {/* 검색 입력 */}
                        <div className="relative shrink-0">
                          <Grow gap={0.5} placement="sc">
                            <Input
                              aria-label="고객 검색"
                              value={searchValue}
                              onChange={(e) => {
                                setSearchValue(e.target.value);
                                setShowDropdown(e.target.value.length > 0);
                              }}
                              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                              width="11.6rem"
                            />
                            <Button
                              only="icon"
                              size="md"
                              variant="outlined"
                              color="gray-light"
                              onClick={() => setShowDropdown((v) => !v)}
                              aria-label="검색"
                            >
                              <SearchIcon size={14} color="var(--color-primary-50)" />
                            </Button>
                          </Grow>
                          {showDropdown && (
                            <div className="absolute left-0 top-full z-10 mt-[0.2rem] min-w-48 rounded-[0.4rem] border border-[#d8d8d8] bg-white py-[0.4rem] shadow-md">
                              {searchDropdownOptions.map((name) => (
                                <button
                                  key={name}
                                  type="button"
                                  className="w-full px-[1rem] py-[0.6rem] text-left text-[1.3rem] hover:bg-[#f5f5f5]"
                                  onMouseDown={() => {
                                    setSearchValue(name);
                                    setShowDropdown(false);
                                  }}
                                >
                                  {name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* divider */}
                        <div className="h-[1rem] w-px shrink-0 bg-[#ccc]" />
                        {/* 직업 */}
                        <Grow gap={0.5} placement="sc" className="shrink-0">
                          <Typo tag="span" variant="body-sm" className="whitespace-nowrap shrink-0 text-[#414141]">
                            직업
                          </Typo>
                          <Typo tag="span" variant="body-sm" weight="bold" className="whitespace-nowrap text-black">
                            (1급)회사 사무직 종사자
                          </Typo>
                        </Grow>
                        {/* divider */}
                        <div className="h-[1rem] w-px shrink-0 bg-[#ccc]" />
                        {/* 보장분석 */}
                        <Grow gap={0.5} placement="sc" className="shrink-0">
                          <Typo tag="span" variant="body-sm" className="whitespace-nowrap shrink-0 text-[#414141]">
                            보장분석
                          </Typo>
                          <Typo tag="span" variant="body-sm" weight="bold" className="whitespace-nowrap text-black">
                            2026-01-01
                          </Typo>
                          <button
                            type="button"
                            className="h-[2.2rem] rounded-[0.3rem] bg-[#6b7280] px-[0.6rem] py-[0.4rem] text-[1.2rem] font-bold leading-none text-white whitespace-nowrap"
                            onClick={() => setAnalysisScore(280)}
                          >
                            조회
                          </button>
                          {analysisScore !== null && (
                            <span className="inline-flex h-[2.2rem] min-w-[3rem] items-center justify-center rounded-full bg-[#ff5c2e] px-[0.6rem] text-[1.2rem] font-bold text-white">
                              {analysisScore}
                            </span>
                          )}
                        </Grow>
                        {/* divider */}
                        <div className="h-[1rem] w-px shrink-0 bg-[#ccc]" />
                        {/* 보험금지급 이력정보 */}
                        <Grow gap={0.5} placement="sc" className="shrink-0">
                          <Typo tag="span" variant="body-sm" className="whitespace-nowrap shrink-0 text-[#414141]">
                            보험금지급 이력정보
                          </Typo>
                          <Typo tag="span" variant="body-sm" weight="bold" className="whitespace-nowrap text-black">
                            2026-01-01
                          </Typo>
                          <button
                            type="button"
                            className="h-[2.2rem] rounded-[0.3rem] bg-[#6b7280] px-[0.6rem] py-[0.4rem] text-[1.2rem] font-bold leading-none text-white whitespace-nowrap"
                            onClick={() => setHistoryScore(190)}
                          >
                            조회
                          </button>
                          {historyScore !== null && (
                            <span className="inline-flex h-[2.2rem] min-w-[3rem] items-center justify-center rounded-full bg-[#e43939] px-[0.6rem] text-[1.2rem] font-bold text-white">
                              {historyScore}
                            </span>
                          )}
                        </Grow>
                      </Grow>
                    )}
                    {customerType === 'new' && (
                      <Grow gap={1.5} placement="sc" className="flex-wrap">
                        <Grow gap={0.5} placement="sc">
                          <Typo tag="span" variant="body-sm" className="whitespace-nowrap shrink-0 text-[#414141]">
                            나이
                          </Typo>
                          <Input aria-label="나이" width="4rem" value="32세" readOnly />
                        </Grow>
                        <Grow gap={0.5} placement="sc">
                          <Input aria-label="생년월일" width="11rem" value="1994 - 02 - 12" />
                          <Button only="icon" size="md" variant="outlined" color="gray-light" onClick={() => {}}>
                            <CalendarIcon size={14} />
                          </Button>
                        </Grow>
                        <Grow gap={0.5} placement="sc">
                          <Typo tag="span" variant="body-sm" className="whitespace-nowrap shrink-0 text-[#414141]">
                            성별
                          </Typo>
                          <RadioGroup value={gender} onValueChange={setGender} className="gap-[0.4rem]">
                            <RadioGroupItem value="male" variant="button" size="md">
                              남
                            </RadioGroupItem>
                            <RadioGroupItem value="female" variant="button" size="md">
                              여
                            </RadioGroupItem>
                          </RadioGroup>
                        </Grow>
                        <Grow gap={0.5} placement="sc">
                          <Typo tag="span" variant="body-sm" className="whitespace-nowrap shrink-0 text-[#414141]">
                            직업
                          </Typo>
                          <RadioGroup value={jobGrade} onValueChange={setJobGrade} className="gap-[0.4rem]">
                            <RadioGroupItem value="1" variant="button" size="md">
                              1급
                            </RadioGroupItem>
                            <RadioGroupItem value="2" variant="button" size="md">
                              2급
                            </RadioGroupItem>
                            <RadioGroupItem value="3" variant="button" size="md">
                              3급
                            </RadioGroupItem>
                          </RadioGroup>
                        </Grow>
                        <Button variant="contained" size="md" color="primary" onClick={() => {}}>
                          고객등록 +
                        </Button>
                      </Grow>
                    )}
                  </Grow>
                  {/* Row2: 고객 태그 */}
                  <Grow gap={1} placement="sc" className="w-full flex-wrap">
                    {customerType === 'recent'
                      ? recentCustomerTags.map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            className={`flex items-center gap-[0.2rem] rounded-full px-[0.8rem] py-[0.4rem] text-[1.3rem] whitespace-nowrap${tag.id === selectedTagId ? ' bg-[#ff5c2e] text-white' : ' border border-[#d8d8d8] bg-white text-[#4b5563]'}`}
                            onClick={() => setSelectedTagId(tag.id)}
                          >
                            <span className="font-bold">#</span>
                            <span className="font-bold">{tag.label.split(' ')[0]}</span>
                            <span>{tag.label.split(' ').slice(1).join(' ')}</span>
                          </button>
                        ))
                      : newCustomerTags.map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            className={`flex items-center gap-[0.2rem] rounded-full px-[0.8rem] py-[0.4rem] text-[1.3rem] whitespace-nowrap${tag.selected ? ' bg-[#ff5c2e] text-white' : ' border border-[#d8d8d8] bg-white text-[#4b5563]'}`}
                          >
                            <span className="font-bold">#</span>
                            <span>{tag.label}</span>
                          </button>
                        ))}
                    {customerType === 'new' && (
                      <Button variant="outlined" size="sm" color="gray-light" onClick={() => {}}>
                        # 편집
                      </Button>
                    )}
                  </Grow>
                </Gcol>

                {/* 상품 필터 박스 (294:27742) */}
                <div className="w-full rounded-[0.8rem] bg-[#f3f4f6] px-[1rem] py-[1rem]">
                  <Grow className="w-full" placement="bwe" gap={1}>
                    <Gcol gap={1} placement="ss">
                      {/* 상품분류 */}
                      <Grow gap={1} placement="sc" className="flex-wrap">
                        <Typo
                          tag="span"
                          variant="body-sm"
                          weight="bold"
                          className="whitespace-nowrap shrink-0 text-[#6b7280]"
                        >
                          상품분류
                        </Typo>
                        <CheckboxGroup
                          value={productCategory}
                          onValueChange={setProductCategory}
                          variant="button"
                          size="md"
                          className="gap-[0.4rem] flex-wrap"
                        >
                          {productCategoryOptions.map((opt) => (
                            <CheckboxGroupItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </CheckboxGroupItem>
                          ))}
                        </CheckboxGroup>
                      </Grow>
                      {/* 상품특징 */}
                      <Grow gap={1} placement="sc" className="flex-wrap">
                        <Typo
                          tag="span"
                          variant="body-sm"
                          weight="bold"
                          className="whitespace-nowrap shrink-0 text-[#6b7280]"
                        >
                          상품특징
                        </Typo>
                        <CheckboxGroup
                          value={productFeature}
                          onValueChange={setProductFeature}
                          variant="button"
                          size="md"
                          className="gap-[0.4rem] flex-wrap"
                        >
                          {productFeatureOptions.map((opt) => (
                            <CheckboxGroupItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </CheckboxGroupItem>
                          ))}
                        </CheckboxGroup>
                      </Grow>
                    </Gcol>
                    {/* 초기화 버튼 */}
                    <Button
                      only="icon"
                      size="md"
                      variant="outlined"
                      color="gray"
                      className="shrink-0"
                      onClick={() => {
                        setProductCategory(['all']);
                        setProductFeature(['all']);
                      }}
                      aria-label="초기화"
                    >
                      <ResetIcon size={16} />
                    </Button>
                  </Grow>
                </div>
                <Grow className="w-full items-start" gap={1.2}>
                  <Gcol className="flex-1 min-w-0" gap={0}>
                    <div className="relative">
                      <div className="grid grid-cols-3 gap-[1.2rem] w-full">
                        {recommendData.slice(0, visibleCount).map((item) => (
                          <RecommendCard
                            key={item.id}
                            variant="checkbox"
                            title={item.title}
                            plan={item.plan}
                            term={item.term}
                            detail={item.detail}
                          />
                        ))}
                      </div>
                      {visibleCount < recommendData.length && (
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[4rem] pointer-events-none"
                          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))' }}
                        />
                      )}
                    </div>
                    {visibleCount < recommendData.length && (
                      <Grow placement="cc" className="w-full pt-[0.8rem]">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((v) => v + 6)}
                          className="flex items-center gap-[0.6rem] rounded-[100px] bg-[#FEF4D4] px-[0.8rem] py-[0.4rem]"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path
                              d="M1 1.5L5 5.5L9 1.5"
                              stroke="#FF5C2E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1 4.5L5 8.5L9 4.5"
                              stroke="#FF5C2E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <Typo
                            tag="span"
                            variant="body-xs"
                            weight="bold"
                            className="whitespace-nowrap text-(--color-primary-50)"
                          >
                            추천설계 더보기
                          </Typo>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path
                              d="M1 1.5L5 5.5L9 1.5"
                              stroke="#FF5C2E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1 4.5L5 8.5L9 4.5"
                              stroke="#FF5C2E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </Grow>
                    )}
                  </Gcol>
                  <Gcol className="shrink-0 w-[26.2rem] rounded-[1rem] border border-[#FF5C2E] bg-white shadow-[0_2px_2px_0_rgba(255,92,46,0.2)] overflow-hidden">
                    <Gcol
                      className="relative px-[1.6rem] py-[1rem] gap-[0.2rem]"
                      style={{
                        backgroundImage:
                          "linear-gradient(358deg, #FF5C2E 9.4%, #FF8D02 97.24%), url('/images/Ltpa020/cand_on_bg.png')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'left top, right top',
                      }}
                    >
                      <Typo tag="p" variant="body-md" weight="bold" className="text-white">
                        한화 시그니처 여성 간편건강보험4.0
                      </Typo>
                      <Typo tag="p" variant="body-sm" className="text-white">
                        납입면제형 · 기본형 · 3N5간편고지형
                      </Typo>
                      <Grow className="w-full" placement="ec" gap={0.4}>
                        <AdderIcon2 size={14} />
                        <Typo tag="p" variant="body-xs" className="text-white">
                          예상보험료
                        </Typo>
                        <Typo tag="p" variant="body-xs" weight="bold" className="text-white">
                          70,000원
                        </Typo>
                      </Grow>
                    </Gcol>

                    <Gcol className="px-[1rem] pb-[1rem] pt-[0.8rem]" gap={0.8}>
                      <Gcol className="w-full rounded-[0.8rem] bg-[#E0EFFF] p-[0.8rem]" gap={0.8}>
                        <Grow
                          className="w-full rounded-[999px] border border-[#006FF2] bg-white px-[0.8rem] py-[0.6rem]"
                          placement="bwe"
                        >
                          <Grow gap={0.2} placement="sc">
                            <AiIcon />
                            <Typo tag="p" variant="body-xs" weight="bold" className="text-[#006FF2]">
                              AI 추천이유
                            </Typo>
                          </Grow>
                          <ChevronDownIcon size={12} className="rotate-180 text-[#006FF2]" />
                        </Grow>

                        <Gcol className="max-h-[8.8rem] overflow-y-auto pr-[0.2rem]" gap={0.4}>
                          {recommendReasonTexts.map((text) => (
                            <Typo key={text} tag="p" variant="body-xs" className="text-black">
                              {text}
                            </Typo>
                          ))}
                        </Gcol>
                      </Gcol>

                      <div className="w-full overflow-hidden border border-[#E5E5E5] border-t-2 border-t-[#1E2124]">
                        <div className="grid grid-cols-[1.58fr_0.72fr_0.7fr] bg-[#F4F4F4]">
                          <div className="border-r border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] text-center">
                            <Typo tag="p" variant="body-md" weight="bold" className="text-black">
                              담보명
                            </Typo>
                          </div>
                          <div className="border-r border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] text-center">
                            <Typo tag="p" variant="body-md" weight="bold" className="text-black leading-[1.4]">
                              가입금액
                            </Typo>
                            <Typo tag="p" variant="body-md" weight="bold" className="text-black leading-[1.2]">
                              (만원)
                            </Typo>
                          </div>
                          <div className="border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] text-center">
                            <Typo tag="p" variant="body-md" weight="bold" className="text-black leading-[1.4]">
                              보험료
                            </Typo>
                            <Typo tag="p" variant="body-md" weight="bold" className="text-black leading-[1.2]">
                              (원)
                            </Typo>
                          </div>
                        </div>

                        <div className="max-h-108 overflow-y-auto">
                          {detailTableRows.map((row) => (
                            <div key={row.id} className="grid grid-cols-[1.58fr_0.72fr_0.7fr]">
                              <div className="border-r border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] min-h-[3rem] flex items-center">
                                <Typo tag="p" variant="body-md" className="text-black truncate w-full">
                                  {row.name}
                                </Typo>
                              </div>
                              <div className="border-r border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] min-h-[3rem] flex items-center justify-center">
                                <Typo tag="p" variant="body-md" className="text-black">
                                  {row.amount}
                                </Typo>
                              </div>
                              <div className="border-b border-[#E5E5E5] px-[0.6rem] py-[0.4rem] min-h-[3rem] flex items-center justify-center">
                                <Typo tag="p" variant="body-md" className="text-black">
                                  {row.premium}
                                </Typo>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Gcol>
                  </Gcol>
                </Grow>
              </Gcol>
            </Gcol>
          </Gcol>
        }
      ></LayoutTemplate>
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
