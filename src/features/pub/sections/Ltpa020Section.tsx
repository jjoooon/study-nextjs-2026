'use client';

import { Gcol, Grow, Typo, Divider, Grid } from '@atoms';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { BottomBar } from '@common/BottomBar';
import { RecommendCard } from '@common/RecommendCard';
import { AdderIcon, AdderIcon2, AiIcon, SearchIcon, ZoomInIcon, ArrowNext, SelectDropIcon, ResetIcon, PaperIcon } from '@icons';
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
import { AgGridEmptyComponent } from '@aggrid';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridReact } from 'ag-grid-react';
import { Badge } from '@uiux/Badge';
import { KeyValueItem } from '@common/KeyValueList';
import { InputCombo } from '@common/InputCombo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { DatePickerInput } from '@common/DatePicker';
import { BulletList, BulletListItem, BulletItem } from '@common/BulletList';

import {
  dummyData,
  dummyData2,
  dummyData3Tab,
  dummyData3,
  dummyData3b,
  dummyData3c,
  dummyData4List,
  type DummyData4ListType,
  type DummyDataType,
  type DummyDataType2,
  type DummyDataType3,
} from '@/features/pub/data/ltpa020Data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';

ModuleRegistry.registerModules([AllCommunityModule]);





export default function Ltpa020Section() {
  const [customerType, setCustomerType] = React.useState('recent');
  const [productCategory, setProductCategory] = React.useState<string[]>(['comprehensive', 'female']);
  const [productFeature, setProductFeature] = React.useState<string[]>(['simple', 'shortTerm']);
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [analysisScore, setAnalysisScore] = React.useState<number | null>(null);
  const [historyScore, setHistoryScore] = React.useState<number | null>(null);


  // 상품선택 AG-Grid 컬럼 정의
  const importanceCellRenderer =  (params: ICellRendererParams<DummyDataType>) => {
    const badgeText = params.data?.badge ?? '';
    return (
      <Grow className='w-full' placement='bwc'>
        <Grow className="overflow-hidden -tracking-[0.03rem]">
          <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="favorite">중요</Checkbox>
          <div className="truncate">{params.data?.field2 ?? ''}</div>
        </Grow>
        <Grow>
          {badgeText && (
            <Grow className="shrink-0">
              {([
                { label: '무해지', color: 'green' },
                { label: '간편', color: 'blue' },
                { label: '할증', color: 'red' },
                { label: '여성', color: 'purple' },
              ] as const).map((badge) =>
                badgeText.includes(badge.label) ? (
                  <Badge key={badge.label} color={badge.color} className="w-[3rem]">
                    {badge.label}
                  </Badge>
                ) : null
              )}
            </Grow>
          )}
        </Grow>
      </Grow>
    );  
  };
  const designCellRenderer = (params: ICellRendererParams<DummyDataType2>) => {
    return (
      <Grow className="h-full w-full">
        <Grow className="border-r border-[var(--color-gray-10)] h-full aspect-auto w-[4rem] flex items-center justify-center shrink-0 pr-[1rem] pl-[0.4rem]">
          {params.data?.field1}
        </Grow>
        <Grow className="flex-1 truncate block text-left">
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
      <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
        보기
      </Button>
    )
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
      cellClass: 'text-center',
      width: 60,
      cellRenderer: moreCellRenderer,
    },
  ];

  const { tabs, active, setActive } = useTabs(dummyData3Tab);
  const planRowDataMap: Record<string, DummyDataType3[]> = {
    tab1: dummyData3,
    tab2: dummyData3b,
    tab3: dummyData3c,
  };
  const selectedPlanRowData = planRowDataMap[active] ?? dummyData3;

  const [tabSelectValue, setTabSelectValue] = useState('tabPage2');
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

  const columnDefs4: ColDef<DummyData4ListType>[] = [
    {
      headerName: '담보명',
      valueGetter: (params) => params.data?.detail?.[0]?.field1 ?? '',
      flex: 1,
    },
    {
      headerName: '가입금액(원)',
      valueGetter: (params) => params.data?.detail?.[0]?.field2 ?? '',
      width: 70,
      cellClass: 'text-right',
    },
    {
      headerName: '보험료(원)',
      valueGetter: (params) => params.data?.detail?.[0]?.field3 ?? '',
      width: 70,
      cellClass: 'text-right',
    },
  ];

  const [listSelected] = useState<number | null>(dummyData4List[0]?.id ?? null);

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '상품플랜설계', pageId: 'LTPA020' }} />
        <Grow placement={'bwc'} gap={3} className="w-full pt-1 pb-2">
          <RadioGroup
            value={tabSelectValue}
            onValueChange={(value) => setTabSelectValue(value)}>
            <RadioGroupItem variant={'button'} value="tabPage1">상품선택</RadioGroupItem>
            <RadioGroupItem variant={'button'} value="tabPage2">추천설계</RadioGroupItem>
          </RadioGroup>
          <Grow className="gap-1 shrink-0" placement={'ec'}>
            <Input
              aria-label="계약자명 입력"
              type="text"
              value={'6012345 박하늘별님달'}
              width={'full'}
            />
            <Button variant={'outlined'} color={'gray-light'} aria-label="계약자 추가" only={'icon'} size={'lg'}>
              <SearchIcon color="var(--color-primary-50)" />
            </Button>
          </Grow>
        </Grow>
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className='w-full h-full grid-rows-[auto_1fr]' gap={4} placement='ss'>
            {/* 검색 */}
            <Gcol gap={1.5}>
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
              
              {tabSelectValue === 'tabPage1' ? (
                <Grow variant={'box-round'} className="w-full" placement='bwe'>
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
                  <Button variant="outlined" color="gray" only="icon">
                    <ResetIcon />
                  </Button>
                </Grow>
              ) :(
                <></>
              )}
            </Gcol>

            {tabSelectValue === 'tabPage1' ? (
              <Grow className='w-full overflow-hidden' placement='ss' gap={5}>
                <TableFold className="h-full">
                  <TableFoldHead title="상품정보" variant="default" />
                  <TableFoldBody className="w-full h-full">
                    <div className="ag-theme-alpine w-full h-full min-h-0">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={dummyData}
                        columnDefs={columnDefs}
                        domLayout="normal"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>

                <Grid className='max-w-[42.5rem] w-[42.5rem] shrink-0 h-full grid-rows-[40%_1fr]' gap={5}>
                  <TableFold className="">
                    <TableFoldHead title="한화 3N5 더간편건강보험(세만기형)2601종 정보"  variant="default" />
                    <TableFoldBody className="w-full h-full">
                      <div className="ag-theme-alpine w-full h-full min-h-0">
                        <AgGridReact<DummyDataType2>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={dummyData2}
                          columnDefs={columnDefs2}
                          domLayout="normal"
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                  <TabPager
                    data={tabs}
                    active={active}
                    setActive={setActive}
                    hasTableBelow={true}
                    getValue={(tab) => String(tab.value)}
                    renderTab={(tab) => {
                      return (
                        <>
                          <span>{tab.label}</span>
                          <span>({tab.count})</span>
                        </>
                      );
                    }}
                    renderDropdownItem={false}
                  >
                    <div className="ag-theme-alpine w-full ag-border-t h-full">
                      <AgGridReact<DummyDataType3>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={selectedPlanRowData}
                        columnDefs={columnDefs3}
                        domLayout="normal"
                      />
                    </div>
                  </TabPager>
                  
                </Grid>
              </Grow>
            ) : (
              <Grid className="w-full h-full grid-cols-[1fr_auto] gap-4 items-start overflow-hidden" gap={1.2}>
                <Grid className="grid-cols-3 gap-[1.2rem] w-full">
                  {dummyData4List.slice(0, visibleCount).map((item) => (
                    <Gcol
                      className={`group bg-[var(--color-secondary-40)] rounded-[1rem] after:content-[''] after:rounded-[1rem] after:absolute after:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] after:w-full after:h-full after:pointer-events-none after:top-0 after:left-0 shadow-[0_0.2rem_0.2rem_0_rgba(0,0,0,0.1)] overflow-hidden relative ${listSelected === item.id ? 'card-selected' : ''}`}
                      key={item.id}
                    >
                      <div className="absolute top-[1rem] right-[1rem] z-10">
                        <Checkbox size="xl"></Checkbox>
                      </div>
                      <Gcol className="bg-[#fff] group-[.card-selected]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] rounded-b-[1rem] p-[1rem] gap-2 w-full px-[1.6rem] pt-[2rem] pb-[1rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)] group-[.card-selected]:text-white">
                        <h3 className="truncate w-[calc(100%-2.4rem)] text-[1.5rem] font-bold">
                          {item.field1}
                        </h3>
                        <ul className='w-full flex gap-1 text-[1.1rem] text-[var(--color-gray-70)] group-[.card-selected]:text-white'>
                          {item.field2.map((text, index) => (
                            <li key={index}>{text}</li>
                          ))}
                        </ul>
                        <Grow placement='bwc'>
                          <ul className='flex gap-1 text-[1.1rem] text-[var(--color-gray-70)] group-[.card-selected]:text-white'>
                            {item.field3.map((text, index) => (
                              <li key={index}>{text}</li>
                            ))}
                          </ul>
                          <Grow>
                            <AdderIcon />
                            <strong className="text-[1.5rem] font-bold text-[var(--color-primary-50)] group-[.card-selected]:text-white">{item.field5.toLocaleString()}원</strong>
                          </Grow>
                        </Grow>
                        <Gcol variant={'box-round'} className="w-full h-fit gap-1 px-[1rem] py-[0.8rem] min-h-[5.4rem]" placement='ss'>
                          <BulletList className="w-full">
                            {item.field4.map((text, index) => (
                              <BulletListItem key={index} size="xs" className='leading-[1.2] text-[var(--color-gray-70)]'>
                                <div className="truncate w-[calc(100%-0.6rem)]">{text}</div>
                              </BulletListItem>
                            ))}
                          </BulletList>
                        </Gcol>
                      </Gcol>
                      <Grow>
                        <Button variant={'none'} className='text-[#fff] font-bold pt-[0.8rem] pb-[1rem] h-[auto] text-[1.3rem]'>
                          <PaperIcon size={16} color={'var(--color-white)'} />
                           보장내용 확인
                        </Button>
                      </Grow>
                    </Gcol>
                  ))}
                </Grid>





                <Grid className="shrink-0 w-[29.4rem] h-full rounded-[1rem] border border-[#FF5C2E] bg-white shadow-[0_2px_2px_0_rgba(255,92,46,0.2)] overflow-hidden">
                  
                  <Gcol
                    className="relative px-[1.6rem] py-[1rem] gap-[0.2rem] bg-[url(/images/Ltpa020/cand_on_bg.png),linear-gradient(358deg,#FF5C2E_9.4%,#FF8D02_97.24%)] [background-repeat:no-repeat] [background-position:right_top,left_top] rounded-b-[1rem]"
                    placement='ss'
                  >
                    <Typo tag="strong" variant="body-md" weight="bold" className="text-white">
                      한화 시그니처 여성 간편건강보험4.0
                    </Typo>
                    <Typo tag="p" variant="body-sm" className="text-white">
                      납입면제형 · 기본형 · 3N5간편고지형
                    </Typo>
                    <Grow className="w-full" placement="ec" gap={1}>
                      <AdderIcon2 size={14} />
                      <Typo tag="p" variant="body-xs" weight={'normal'} className="text-white">
                        예상보험료
                      </Typo>
                      <Typo tag="p" variant="body-xs" weight={'bold'} className="text-white">
                        70,000원
                      </Typo>
                    </Grow>
                  </Gcol>
                  <Gcol className="px-[1rem] pb-[1rem] pt-[0.8rem] flex gap-[0.8rem]">
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full bg-[#E0EFFF] px-[0.8rem] py-[1rem] rounded-[1rem]">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="group w-full rounded-[1rem]">
                          <Grow
                            className="w-full rounded-[999px] border border-[#006FF2] bg-white px-[0.8rem] py-[0.6rem]"
                            placement="bwe"
                          >
                            <Grow gap={0.2} placement="sc">
                              <AiIcon size={10} color='#006FF2' />
                              <Typo tag="p" variant="body-xs" weight="bold" className="text-[#006FF2]">
                                AI 추천이유
                              </Typo>
                            </Grow>
                            <SelectDropIcon
                              className="text-[#006FF2] transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0"
                            />
                          </Grow>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Gcol className="max-h-[8.8rem] overflow-y-auto mt-[0.8rem] pr-[0.2rem]" gap={0.4}>
                            {[
                              '고객님의 보장 내용을 분석해 보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로 확인됩니다.',
                              '목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다. 현재 조건에서 보장과 보험료 균형을 고려한 추천 설계입니다.',
                              '담보별 권장 보장금액 기준 설계도 함께 확인해보실 수 있습니다.',
                            ].map((text) => (
                              <Typo key={text} tag="p" variant="body-xs" className="text-black">
                                {text}
                              </Typo>
                            ))}
                          </Gcol>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div className='ag-theme-alpine'>
                      <AgGridReact<DummyData4ListType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={dummyData4List}
                        columnDefs={columnDefs4}
                        defaultColDef={{
                          suppressMovable: true,
                          sortable: false,
                          resizable: false,
                        }}
                        domLayout="autoHeight"
                      />
                    </div>
                  </Gcol>
                </Grid>
              </Grid>
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
