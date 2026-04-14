'use client';

import { Gcol, Grow, Typo, Divider, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { RecommendCard } from '@common/RecommendCard';
import { AdderIcon2, AiIcon, ChevronDownIcon, SearchIcon, ZoomInIcon, ArrowNext } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import * as React from 'react';
import { PageID } from '@features/PageID';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { useCallback, useState } from 'react';
import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridReact } from 'ag-grid-react';
import { Badge } from '@uiux/Badge';
import { KeyValueItem } from '@common/KeyValueList';
import { InputCombo } from '@common/InputCombo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { MainBottom, MainBottomItem } from '@features/MainFoot';

import {
  dummyData,
  dummyData2,
  dummyData3,
  type DummyDataType,
  type DummyDataType2,
  type DummyDataType3,
} from '@/features/pub/data/ltpa020Data';
import { DatePickerInput } from '@/shared/components/common/DatePicker';
import { Arrow } from '@radix-ui/react-tooltip';


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




  const [tabSelectValue, setTabSelectValue] = useState('tab1');
  type ComboFieldKey = 'policyNumber';
  const [comboValues, setComboValues] = useState<Record<ComboFieldKey, string>>({
    policyNumber: '',
  });
  const handleComboValueChange = useCallback(
    <TField extends ComboFieldKey>(field: TField) =>
      (nextValue: string) => {
        setComboValues((prev) => ({
          ...prev,
          [field]: nextValue,
        }));
      },
    []
  );

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '상품플랜설계', pageId: 'LTPA020' }} />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className='w-full h-full grid-rows-[auto_auto_auto_1fr]' gap={1.5} placement='ss'>
            <Grow>
              <RadioGroup
                value={tabSelectValue}
                onValueChange={(value) => setTabSelectValue(value)}>
                <RadioGroupItem variant={'button'} value="tab1">상품선택</RadioGroupItem>
                <RadioGroupItem variant={'button'} value="tab2">추천설계</RadioGroupItem>
              </RadioGroup>
            </Grow>

            <Gcol variant="box-round" placement="ss" className='bg-[var(--color-blue-gray-15)]'>
              <FormTable caption="" cols={['w-[6rem]', 'w-auto']} variant={'none'}>
                <FormRow className='items-start!'>
                  <FormCell title={'고객정보'} className='align-top [&>span]:block [&>span]:pt-1'>
                    <Grow placement='ss' gap={5}>
                      <RadioGroup value={customerType} onValueChange={setCustomerType} className="gap-[0.4rem] shrink-0 flex-nowrap">
                        <RadioGroupItem value="recent" variant="button" size="md">
                          최근등록고객
                        </RadioGroupItem>
                        <RadioGroupItem value="new" variant="button" size="md">
                          미등록고객
                        </RadioGroupItem>
                      </RadioGroup>
    
                      <Gcol placement='ss' gap={2}>
                        {customerType === 'recent' && (
                          <Grow placement="sc" className="flex-1 min-w-0 flex-wrap gap-x-5 gap-y-1">
                            <Grow placement='sc'>
                              <InputCombo
                                aria-label="고객 검색"
                                width={110}
                                col={2}
                                options={[
                                    { value: '홍길순 32세(여)', label: <td>홍길순</td> },
                                    { value: '홍길동 32세(여)', label: <td>홍길동</td> },
                                    { value: '김한화 32세(여)', label: <td>김한화</td> },
                                  ]}
                                value={comboValues.policyNumber}
                                onChange={handleComboValueChange('policyNumber')}
                                placeholder="고객 검색"
                              />
                              <Button variant={'outlined'} color={'gray-light'} size={'lg'} only="icon">
                                <SearchIcon size={14} color="var(--color-primary-50)" />
                              </Button>
                            </Grow>

                            <Grow placement='sc' gap={3}>
                              <KeyValueItem label={'직업'} variant="info">
                                (1급)회사 사무직 종사자
                              </KeyValueItem>
                              <Divider />

                              <KeyValueItem label={'보장분석'} variant="info" className="gap-2">
                                2026-01-01 
                                <Button 
                                  variant={'contained'}
                                  size={'sm'}
                                  color={'coolgray-light'}
                                  onClick={() => setAnalysisScore(280)}
                                >
                                  조회
                                </Button>
                                {analysisScore !== null && (
                                  <span className="inline-flex h-[2.2rem] min-w-[3rem] items-center justify-center rounded-full bg-[#ff5c2e] px-[0.6rem] text-[1.2rem] font-bold text-white">
                                    {analysisScore}
                                  </span>
                                )}
                              </KeyValueItem>
                              <Divider />
                              
                              <KeyValueItem label={'보험금지급 이력정보'} variant="info" className="gap-2">
                                2026-01-01 
                                <Button 
                                  variant={'contained'}
                                  size={'sm'}
                                  color={'coolgray-light'}
                                  onClick={() => setHistoryScore(190)}
                                >
                                  조회
                                </Button>
                                {historyScore !== null && (
                                <span className="inline-flex h-[2.2rem] min-w-[3rem] items-center justify-center rounded-full bg-[#e43939] px-[0.6rem] text-[1.2rem] font-bold text-white">
                                  {historyScore}
                                </span>
                              )}
                              </KeyValueItem>
                            </Grow>
                          </Grow>
                        )}
                        {customerType === 'new' && (
                          <Grow placement='sc' gap={3}>
                            <KeyValueItem label={'나이'} variant="info">
                              <Input size="sm" value={'42세'} width={48} />
                              <DatePickerInput value='1994-05-10' />
                            </KeyValueItem>
                            <Divider />

                            <KeyValueItem label={'성별'} variant="info">
                              <RadioGroup className='gap-1' defaultValue='남'>
                                {[
                                  { value:'남', label: '남' },
                                  { value:'여', label: '여' },
                                ].map((tag) => (
                                  <RadioGroupItem value={tag.value}>{tag.label}</RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </KeyValueItem>
                            <Divider />

                            <KeyValueItem label={'직업'} variant="info">
                              <RadioGroup className='gap-1' defaultValue='1급'>
                                {[
                                  { value:'1급', label: '1급' },
                                  { value:'2급', label: '2급' },
                                  { value:'3급', label: '3급' },
                                ].map((tag) => (
                                  <RadioGroupItem value={tag.value}>{tag.label}</RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </KeyValueItem>

                            <Button variant="contained" size="md" color="gray" className='gap-1' onClick={() => {}}>
                              고객등록
                              <ZoomInIcon size={16}   />
                            </Button>
                          </Grow>
                        )}

                        {/* Row2: 고객 태그 */}
                        <Grow>
                          {customerType === 'recent' ? (
                            <RadioGroup className='gap-1' defaultValue='홍길동'>
                              {[
                                { value: '홍길동', age: 42, level: 1, gender: '남', name: '홍길동' },
                                { value: '반짝반짝빛반짝반짝빛', age: 42, level: 2, gender: '남', name: '반짝반짝빛반짝반짝빛' },
                                { value: '김한화', age: 55, level: 3, gender: '남', name: '김한화' },
                                { value: '피보험자', age: 63, level: 4, gender: '여', name: '피보험자' },
                              ].map((tag) => (
                                <RadioGroupItem value={tag.value} variant="chipBox" size="md" className="flex items-center">
                                  <b>#</b>
                                  <b className="max-w-[7rem] truncate block">{tag.name}</b> 
                                  {tag.age}세 ({tag.gender})
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          ) : (
                            <RadioGroup className='gap-1' defaultValue='홍길동'>
                              {[
                                { value: '홍길동', age: 42, level: 1, gender: '남', name: '홍길동' },
                                { value: '반짝반짝빛반짝반짝빛', age: 42, level: 2, gender: '남', name: '반짝반짝빛반짝반짝빛' },
                                { value: '김한화', age: 55, level: 3, gender: '남', name: '김한화' },
                                { value: '피보험자', age: 63, level: 4, gender: '여', name: '피보험자' },
                              ].map((tag) => (
                                <RadioGroupItem value={tag.value} variant="chipBox" size="md">
                                  <b>#</b>
                                  <b>{tag.name}</b> 
                                  {tag.level}급
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          )}
                          {customerType === 'new' && (
                            <Button variant="outlined" size="sm" color="gray-light" onClick={() => {}}>
                              # 편집
                            </Button>
                          )}
                        </Grow>
                      </Gcol>
                    </Grow>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Gcol>

            {tabSelectValue === 'tab1' ? (
              <>
                <Grow variant={'box-round'} className="w-full">
                  <FormTable caption="" cols={['w-[6rem]', 'w-auto']} variant={'none'}>
                    <FormRow className='items-start!'>
                      <FormCell title={'상품분류'}>
                        <CheckboxGroup
                          value={productCategory}
                          onValueChange={setProductCategory}
                          variant="button"
                          size="md"
                          className="gap-[0.4rem] flex-wrap"
                        >
                          {[
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
                          ].map((opt) => (
                            <CheckboxGroupItem key={opt.value} value={opt.value} selectAll={opt.value === 'all'}>
                              {opt.label}
                            </CheckboxGroupItem>
                          ))}
                        </CheckboxGroup>
                      </FormCell>
                    </FormRow>
                    <FormRow className='items-start!'>
                      <FormCell title={'상품특징'}>
                        <CheckboxGroup
                          value={productFeature}
                          onValueChange={setProductFeature}
                          variant="button"
                          size="md"
                          className="gap-[0.4rem] flex-wrap"
                        >
                          {[
                            { value: 'all', label: '전체' },
                            { value: 'simple', label: '간편' },
                            { value: 'noRefund', label: '무해지' },
                            { value: 'shortTerm', label: '세만기' },
                            { value: 'longTerm', label: '연만기' },
                          ].map((opt) => (
                            <CheckboxGroupItem key={opt.value} value={opt.value} selectAll={opt.value === 'all'}>
                              {opt.label}
                            </CheckboxGroupItem>
                          ))}
                        </CheckboxGroup>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>

                <Grow className='w-full overflow-hidden' placement='ss' gap={5}>
                  <TableFold className="h-full">
                    <TableFoldHead title="상품정보" variant="default" />
                    <TableFoldBody className="w-full h-full">
                      <div className="ag-theme-alpine w-full h-full absolute">
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

                  <Grid className='max-w-[42.5rem] w-[42.5rem] shrink-0 h-full grid-rows-[40%_60%]' gap={5}>
                    <TableFold className="">
                      <TableFoldHead title="한화 3N5 더간편건강보험(세만기형)2601종 정보"  variant="default" />
                      <TableFoldBody className="w-full h-full">
                        <div className="ag-theme-alpine w-full h-full absolute">
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
                      </TableFoldBody>
                    </TableFold>
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
                      <div className="ag-theme-alpine w-full ag-border-t">
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
                   
                  </Grid>
                </Grow>
              </>
            ) : (
              <Gcol>
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
            )}

          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              
              <Grow gap={1}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  <AiIcon size={22} color={'var(--color-secondary-90)'} color2={'var(--color-secondary-90)'} />
                  추천설계
                </Button>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  설계시작
                  <ArrowNext size={16} />
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      ></LayoutTemplate>
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
