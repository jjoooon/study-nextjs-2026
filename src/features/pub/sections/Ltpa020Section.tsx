'use client';

import { Gcol, Grow, Typo, Divider, Grid } from '@atoms';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { BottomBar } from '@common/BottomBar';
import { AdderIcon, AdderIcon2, AiIcon, SearchIcon, ZoomInIcon, ArrowNext, SelectDropIcon, ResetIcon, PaperIcon, ArrowDoubleIcon, ArrowIcon } from '@icons';
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
import { useCallback, useEffect, useRef, useState } from 'react';
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
import Image from 'next/image';

import {
  dummyData,
  dummyData2,
  dummyData3Tab,
  dummyData3,
  dummyData3b,
  dummyData3c,
  dummyData4List,
  type DummyData4ListDetailType,
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

  const columnDefs4: ColDef<DummyData4ListDetailType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 1,
    },
    {
      headerName: '가입금액(원)',
      field: 'field2',
      width: 70,
      cellClass: 'text-right',
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      width: 70,
      cellClass: 'text-right',
    },
  ];

  const [listSelected, setListSelected] = useState<number | null>(dummyData4List[0]?.id ?? null);
  const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>({});
  const [isAmountInputVisible, setIsAmountInputVisible] = useState<boolean>(false);
  const [amountValues, setAmountValues] = useState<Record<string, string>>({});
  const [isFilterOptionOpen, setIsFilterOptionOpen] = useState<boolean>(false);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(true);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState<boolean>(false);
  const [addPanelCheckedValues, setAddPanelCheckedValues] = useState<string[]>(['담보군', '상품특징', '보장분석']);
  const listScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollAnimRef = useRef<number | null>(null);

  const selectedRecommendPlan =
    dummyData4List.find((item) => item.id === listSelected) ?? dummyData4List[0];
  const selectedAiReasonLines = (selectedRecommendPlan?.ai ?? '')
    .split('<br />')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const updateMoreButtonVisibility = useCallback(() => {
    const container = listScrollRef.current;
    if (!container) {
      return;
    }

    const isAtEnd = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
    setShowMoreButton(!isAtEnd);
  }, []);

  const handleMoreRecommendClick = useCallback(() => {
    const container = listScrollRef.current;
    if (!container) {
      return;
    }

    const items = Array.from(
      container.querySelectorAll<HTMLElement>('.card-selected')
    );

    if (items.length === 0) {
      return;
    }

    const itemHeight = items[0]?.offsetHeight ?? 0;
    if (itemHeight <= 0) {
      return;
    }

    const viewportTop = container.scrollTop;
    const maxScrollTop = Math.max(container.scrollHeight - container.clientHeight, 0);
    const visibleItemCount = Math.max(1, Math.floor(container.clientHeight / itemHeight));
    const step = visibleItemCount * (itemHeight + 12);
    const targetTop = Math.min(viewportTop + step, maxScrollTop);

    if (scrollAnimRef.current !== null) {
      cancelAnimationFrame(scrollAnimRef.current);
    }

    const startTop = container.scrollTop;
    const distance = targetTop - startTop;
    const duration = 420;
    const startTime = performance.now();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      container.scrollTop = startTop + distance * eased;

      if (progress < 1) {
        scrollAnimRef.current = requestAnimationFrame(animate);
        return;
      }

      scrollAnimRef.current = null;
      updateMoreButtonVisibility();
    };

    scrollAnimRef.current = requestAnimationFrame(animate);
  }, [updateMoreButtonVisibility]);

  useEffect(() => {
    updateMoreButtonVisibility();
  }, [updateMoreButtonVisibility]);

  useEffect(() => {
    return () => {
      if (scrollAnimRef.current !== null) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    };
  }, []);

  // 담보군
  const coverageOptions = [
    { value: '사망/후유', label: '사망/후유' },
    { value: '진단비', label: '진단비' },
    { value: '입원/통원', label: '입원/통원' },
    { value: '수술/치료', label: '수술/치료' },
    { value: '골절/화상', label: '골절/화상' },
    { value: '검사/지원', label: '검사/지원' },
    { value: '운전/비용', label: '운전/비용' },
  ] as const;
  type CoverageOptionValue = (typeof coverageOptions)[number]['value'];
  const [selectedCoverageValues, setSelectedCoverageValues] = useState<CoverageOptionValue[]>([]);
  const selectedCoverageSummary =
    selectedCoverageValues.length === 0
      ? '선택'
      : selectedCoverageValues.length === 1
        ? selectedCoverageValues[0]
        : `${selectedCoverageValues[0]} 외 ${selectedCoverageValues.length - 1}개`;
  // 보장분석
  const AnalysisOptions = [
    { value: '보장분석 부족자금', label: '보장분석 부족자금' },
    { value: '기계약 누적해소', label: '기계약 누적해소' },
    { value: '기계약 유지', label: '기계약 유지' },
  ] as const;
  type AnalysisOptionValue = (typeof AnalysisOptions)[number]['value'];
  const [selectedAnalysisValues, setSelectedAnalysisValues] = useState<AnalysisOptionValue[]>([]);
  const selectedAnalysisSummary =
    selectedAnalysisValues.length === 0
      ? '선택'
      : selectedAnalysisValues.length === 1
        ? selectedAnalysisValues[0]
        : `${selectedAnalysisValues[0]} 외 ${selectedAnalysisValues.length - 1}개`;
  // 상품특징
  type ApplyOptionValue = '' | '적용' | '미적용';
  type MaturityOptionValue = '' | '세만기' | '연만기';
  const [noRefundValue, setNoRefundValue] = useState<ApplyOptionValue>('');
  const [premiumWaiverValue, setPremiumWaiverValue] = useState<ApplyOptionValue>('');
  const [maturityValue, setMaturityValue] = useState<MaturityOptionValue>('');
  const productFeatureSummaryValues = [
    noRefundValue === '적용' ? '무해지' : '',
    premiumWaiverValue === '적용' ? '납면' : '',
    maturityValue,
  ].filter((value) => value.length > 0);
  const selectedProductFeatureSummary =
    productFeatureSummaryValues.length > 0 ? productFeatureSummaryValues.join(', ') : '선택';
  // 고지유형
  const [dataNone, setDataNone] = useState<boolean>(true);
  const [isPdName, setIsPdName] = useState<boolean>(false);
  // 고지유형(간편/추가질병/입원수술) 상태
  const [simpleType, setSimpleType] = useState<string>(''); // '표준' | '간편' | ''
  const [additionalDiseases, setAdditionalDiseases] = useState<string[]>([]); // ['고혈압', ...]
  const [hospitalInputs, setHospitalInputs] = useState<string[]>(['', '', '', '', '']);

  // 고지유형 요약
  const hasHospitalInput = hospitalInputs.some((v) => v.trim() !== '');
  const selectedNoticeSummary = [
    simpleType,
    ...additionalDiseases,
    hasHospitalInput ? '입원수술' : '',
  ].filter(Boolean).join(', ') || '선택';

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '상품플랜설계', pageId: 'LTPA020' }} />
        <Grow placement={'bwc'} gap={3} className="w-full pt-1 pb-2">
          <RadioGroup
            value={tabSelectValue}
            onValueChange={(value) => setTabSelectValue(value)} className="p-[0.2rem] bg-[var(--color-warning-10)] gap-[0.2rem] rounded-[0.6rem]">
            <RadioGroupItem variant={'button'} value="tabPage1" className="[&>div]:hidden h-[3rem] bg-[transparent] border-0! flex items-center gap-1 text-[1.4rem] text-[var(--color-secondary-70)] font-bold data-[state=checked]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] data-[state=checked]:text-white px-[1.8rem]">
              <Image
                src={tabSelectValue === 'tabPage1' ? "/images/Ltpa020/planIcon1.svg" : "/images/Ltpa020/planIcon1_off.svg"}
                alt="설명"
                width={22}
                height={22}
              />
              상품선택
            </RadioGroupItem>
            <RadioGroupItem variant={'button'} value="tabPage2" className="[&>div]:hidden h-[3rem] bg-[transparent] border-0! flex items-center gap-1 text-[1.4rem] text-[var(--color-secondary-70)] font-bold data-[state=checked]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] data-[state=checked]:text-white px-[1.8rem]">
              <Image
                src={tabSelectValue === 'tabPage2' ? "/images/Ltpa020/planIcon2.svg" : "/images/Ltpa020/planIcon2_off.svg"}
                alt="설명"
                width={22}
                height={22}
              />
              추천설계
            </RadioGroupItem>
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
                                    <RadioGroupItem key={tag.value} value={tag.value}>{tag.label}</RadioGroupItem>
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
                                    <RadioGroupItem key={tag.value} value={tag.value}>{tag.label}</RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </KeyValueItem>

                              <Button variant="contained" size="md" color="gray" className='gap-1' onClick={() => {}}>
                                고객등록
                                <ZoomInIcon size={16}   />
                              </Button>
                            </Grow>
                          )}

                          <Grow>
                            {customerType === 'recent' ? (
                              <RadioGroup className='gap-1' defaultValue='홍길동'>
                                {[
                                  { value: '홍길동', age: 42, level: 1, gender: '남', name: '홍길동' },
                                  { value: '반짝반짝빛반짝반짝빛', age: 42, level: 2, gender: '남', name: '반짝반짝빛반짝반짝빛' },
                                  { value: '김한화', age: 55, level: 3, gender: '남', name: '김한화' },
                                  { value: '피보험자', age: 63, level: 4, gender: '여', name: '피보험자' },
                                  { value: '피보험자', age: 63, level: 4, gender: '여', name: '피보험자' },
                                ].map((tag) => (
                                  <RadioGroupItem key={tag.value} value={tag.value} variant="chipBox" size="md" className="flex items-center">
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
                                  { value: '피보험자', age: 63, level: 4, gender: '여', name: '피보험자' },
                                ].map((tag) => (
                                  <RadioGroupItem key={tag.value} value={tag.value} variant="chipBox" size="md">
                                    <b>#</b>
                                    <b>{tag.name}</b> 
                                    {tag.level}급
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            )}
                            {customerType === 'new' && (
                              <Button variant="outlined" size="md" color="gray-light" onClick={() => {}}>
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
                <Grow variant={'box-round'} className="w-full pl-[4.5rem] gap-[2rem] relative z-20" placement='bwc'>
                  {/* 추가설정 좌측 */}
                  <div className={`absolute top-[0.46rem] left-0 h-[3.6rem] bg-[var(--color-blue-gray-50)] rounded-r-full px-[0.2rem] gap-[0.2rem] flex items-center justify-start whitespace-nowrap text-[#fff] z-10 transition-transform duration-300 ease-out ${isAddPanelOpen ? 'translate-x-[0]' : '-translate-x-[calc(100%-4.2rem)]'}`}>
                    <Grow className='px-[1.6rem]'>
                      <CheckboxGroup 
                        className="gap-[1rem]" 
                        value={addPanelCheckedValues} 
                        onValueChange={(nextValues: string[]) => {
                          setAddPanelCheckedValues(nextValues);
                          setIsPdName(nextValues.includes('상품명'));
                        }}
                      >
                        {[
                          { check:true, disabled:true, value: '담보군', label: '담보군' },
                          { check:true, disabled:true, value: '상품특징', label: '상품특징' },
                          { check:true, disabled:true, value: '보장분석', label: '보장분석' },
                          { check:false, disabled:false, value: '상품명', label: '상품명' },
                        ].map((opt) => (
                          <CheckboxGroupItem key={opt.value} value={opt.value} size="lg" disabled={opt.disabled}>
                            {opt.label}
                          </CheckboxGroupItem>
                        ))}
                      </CheckboxGroup>
                    </Grow>
                    <button type="button" className="w-[3.7rem] flex items-center gap-[0.2rem]" onClick={() => setIsAddPanelOpen((prev) => !prev)}>
                     {isAddPanelOpen ? '닫기' : '추가'}
                     <ArrowIcon className={isAddPanelOpen ? '' : 'rotate-[180deg]'} size={12}  />
                    </button>
                  </div>
                  
                  {/* 기본 */}
                  <FormTable caption="" cols={
                    isPdName ? [
                    'w-[4rem]', 'w-[30%]', 
                    'w-[6rem]', 'w-[30%]',
                    'w-[6rem]', 'w-[30%]',
                    'w-[6rem]', 'w-[18rem] min-w-[18rem]'
                    ] : [
                    'w-[4rem]', 'w-[30%]', 
                    'w-[6rem]', 'w-[30%]',
                    'w-[6rem]', 'w-[30%]'
                    ]} variant={'none'}>
                    <FormRow className='items-start!'>
                      <FormCell title={'담보군'} className="items-center! min-h-[2.8rem]! pt-[0.6rem]">
                        <button
                          type="button"
                          className="w-full p-1 h-[2.8rem] border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                          onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                          aria-expanded={isFilterOptionOpen}
                        >
                          <span className="w-[100%] flex items-center font-normal">{selectedCoverageSummary}</span>
                          <SelectDropIcon color="var(--color-gray-50)" className="rotate-[180deg]" />
                        </button>
                      </FormCell>
                      <FormCell title={'상품특징'}>
                        <button
                          type="button"
                          className="w-full p-1 h-[2.8rem] border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                          onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                          aria-expanded={isFilterOptionOpen}
                        >
                          <span className="w-[100%] flex items-center font-normal">{selectedProductFeatureSummary}</span>
                          <SelectDropIcon color="var(--color-gray-50)" className="rotate-[180deg]" />
                        </button>
                      </FormCell>

                      {customerType === 'recent' ? (
                        <FormCell title={'보장분석'}>
                          <button
                            type="button"
                            className="w-full p-1 h-[2.8rem] border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                            onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                            aria-expanded={isFilterOptionOpen}
                          >
                            <span className="w-[100%] flex items-center font-normal">{selectedAnalysisSummary}</span>
                            <SelectDropIcon color="var(--color-gray-50)" className="rotate-[180deg]" />
                          </button>
                        </FormCell>
                      ) : (
                        <FormCell title={'고지유형'}>
                          <button
                            type="button"
                            className="w-full p-1 h-[2.8rem] border-b border-b-[var(--color-gray-30)] flex justify-between items-center gap-[0.6rem]"
                            onClick={() => setIsFilterOptionOpen((prev) => !prev)}
                            aria-expanded={isFilterOptionOpen}
                          >
                            <span className="w-[100%] flex items-center font-normal">{selectedNoticeSummary}</span>
                            <SelectDropIcon color="var(--color-gray-50)" className="rotate-[180deg]" />
                          </button>
                        </FormCell>
                      )}


                      {isPdName && (
                        <FormCell title={'상품명'}>
                          <Input
                            aria-label="상품명 입력"
                            type="text"
                            value={'한화 시그니처 여성 간편건강보험 4.0'}
                            width={'full'}
                          />
                          <Button variant={'outlined'} color={'gray-light'} aria-label="상품 검색" only={'icon'} size={'lg'}>
                            <SearchIcon color="var(--color-primary-50)" />
                          </Button>
                        </FormCell>
                      )}
                    </FormRow>
                  </FormTable>
                  <Grow>
                    <Button variant="contained" color="coolgray" size={'lg'}>
                      설계추천
                    </Button>
                    <Button variant="outlined" color="gray" size={'lg'} only="icon" aria-label="초기화">
                      <ResetIcon />
                    </Button>
                  </Grow>
                  
                  {isFilterOptionOpen && (
                    <Grow variant='box-round-b' className="absolute top-[calc(100%-.6rem)] left-0 w-full bg-[var(--color-blue-gray-10)] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)] px-4 py-2.5 gap-0 z-10 pl-[4.5rem]! justify-stretch! " placement='ss'>
                    {/* 담보군 */}
                    <Gcol className="gap-[0.4rem]" placement='ss'>
                      {coverageOptions.map((opt) => (
                        <Grow key={opt.value} className='w-full' placement='ss'>
                          <Checkbox 
                            value={opt.value} 
                            variant="button" 
                            className="w-[8rem]"
                            checked={selectedCoverageValues.includes(opt.value)}
                            onCheckedChange={(checked) => {
                              setSelectedCoverageValues((prev) => {
                                const nextChecked = checked === true;
                                if (nextChecked) {
                                  return prev.includes(opt.value) ? prev : [...prev, opt.value];
                                }
                                return prev.filter((value) => value !== opt.value);
                              });
                            }}
                          >
                            {opt.label}
                          </Checkbox>
                          {isAmountInputVisible && (
                            <Input
                              after="만원"
                              width={120}
                              placeholder='가입금액'
                              commaAmount
                              size={'md'}
                              value={amountValues[opt.value] ?? ''}
                              onChange={(e) =>
                                setAmountValues((prev) => ({
                                  ...prev,
                                  [opt.value]: e.target.value,
                                }))
                              }
                            />
                          )}
                        </Grow>
                      ))}
                      <Checkbox
                        checked={isAmountInputVisible}
                        onCheckedChange={(checked) => setIsAmountInputVisible(checked === true)}
                      >
                        금액입력
                      </Checkbox>
                    </Gcol>
                    <Divider className='self-stretch h-auto' />
                    {/* 상품특징 */}
                    <Gcol placement='ss' className='pl-[1.2rem]'>
                      <FormTable variant={'none'} lineTop={false} caption="" cols={['w-[6rem]', 'w-auto']}>
                        <FormRow>
                          <FormCell title={'무해지'}>
                             <RadioGroup value={noRefundValue} onValueChange={(value) => setNoRefundValue(value as ApplyOptionValue)}>
                              {[
                                { value: '적용', label: '적용' },
                                { value: '미적용', label: '미적용' },
                              ].map((opt) => (
                                <RadioGroupItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </RadioGroupItem>
                              ))}
                             </RadioGroup>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'납면'}>
                             <RadioGroup value={premiumWaiverValue} onValueChange={(value) => setPremiumWaiverValue(value as ApplyOptionValue)}>
                              {[
                                { value: '적용', label: '적용' },
                                { value: '미적용', label: '미적용' },
                              ].map((opt) => (
                                <RadioGroupItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </RadioGroupItem>
                              ))}
                             </RadioGroup>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'만기'}>
                             <RadioGroup value={maturityValue} onValueChange={(value) => setMaturityValue(value as MaturityOptionValue)}>
                              {[
                                { value: '세만기', label: '세만기' },
                                { value: '연만기', label: '연만기' },
                              ].map((opt) => (
                                <RadioGroupItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </RadioGroupItem>
                              ))}
                             </RadioGroup>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>
                    <Divider className='self-stretch h-auto' />
                    
                    {/* 보장분석 or 고지유형 */}
                    {customerType === 'recent' ? (
                      <Gcol placement='ss' className='pl-[1.2rem]'>
                        <CheckboxGroup className="gap-[0.4rem] flex-col items-start" value={[]} onValueChange={() => {}}>
                          {AnalysisOptions.map((opt) => (
                            <Checkbox 
                              key={opt.value} 
                              value={opt.value} 
                              variant="button"
                              className="w-[12.7rem]"
                              checked={selectedAnalysisValues.includes(opt.value)}
                              onCheckedChange={(checked) => {
                                setSelectedAnalysisValues((prev) => {
                                  const nextChecked = checked === true;
                                  if (nextChecked) {
                                    return prev.includes(opt.value) ? prev : [...prev, opt.value];
                                  }
                                  return prev.filter((value) => value !== opt.value);
                                });
                              }}
                            >{opt.label}</Checkbox>
                          ))}
                        </CheckboxGroup>
                      </Gcol>
                    ) : (
                      <Gcol placement='ss' className='pl-[1.2rem]'>
                        <FormTable variant={'none'} lineTop={false} caption="" cols={['w-[6rem]', 'w-auto']}>
                          <FormRow>
                            <FormCell title={'간편'}>
                              <RadioGroup
                                value={simpleType}
                                onValueChange={(value) => setSimpleType(value)}
                              >
                                {[
                                  { value: '표준', label: '표준' },
                                  { value: '간편', label: '간편' },
                                ].map((opt) => (
                                  <RadioGroupItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell
                              title={
                                <div>
                                  입원수술<br />
                                  <Button variant={'outlined'} size="sm" color="gray">예외질환조회</Button>
                                </div>
                              }
                              className='align-top! pt-[0.8rem]!'
                            >
                              <Gcol placement='ss'>
                                {[0, 1, 2, 3, 4].map((idx) => (
                                  <Grow placement='sc' key={idx}>
                                    <Input
                                      width={86}
                                      placeholder='질병명검색'
                                      value={hospitalInputs[idx]}
                                      onChange={(e) => {
                                        const next = [...hospitalInputs];
                                        next[idx] = e.target.value;
                                        setHospitalInputs(next);
                                      }}
                                    />
                                    <Button variant={'outlined'} color={'gray-light'} size={'lg'} only={'icon'} aria-label="질병 검색">
                                      <SearchIcon color="var(--color-primary-50)" />
                                    </Button>
                                    <Input width={80} placeholder='필수입력' />
                                  </Grow>
                                ))}
                              </Gcol>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title={'추가질병'}>
                              <CheckboxGroup
                                className="gap-3 items-start"
                                value={additionalDiseases}
                                onValueChange={(values) => setAdditionalDiseases(values)}
                              >
                                {[
                                  { value: '고혈압', label: '고혈압' },
                                  { value: '당뇨', label: '당뇨' },
                                ].map((opt) => (
                                  <CheckboxGroupItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </CheckboxGroupItem>
                                ))}
                              </CheckboxGroup>
                            </FormCell>
                          </FormRow>
                        </FormTable>
                      </Gcol>
                    )}
                    {isPdName ? (
                      <div className='w-[36rem] shrink-0'></div>
                    ) : <div className='w-[10rem] shrink-0'></div>}
                    </Grow>
                  )}
                </Grow>
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
              <Grid className="w-full h-full grid-cols-[1fr_auto] gap-4 items-stretch overflow-hidden" gap={1.2}>
                {dataNone ? (
                  <Gcol className='h-full gap-2.5 ' placement='cc'>
                    <div className='w-[24.8rem]'>
                      <Image
                        src="/images/Ltpa020/pro100.jpg"
                        alt="설명"
                        fill style={{ objectFit: 'cover' }} 
                        onClick={() => setDataNone(false)}
                        className='relative!'
                      />
                    </div>
                    <p className='text-center text-[1.3rem] font-bold text-[var(--color-secondary-70)]'>상품을 추천할 고객과 조건을 선택하고<br />
                    <b className='text-[var(--color-primary-50)]'>최적의 상품 플랜</b>을 확인하세요!</p>
                  </Gcol>
                ) : (
                  <>
                    {/* 리스트 */}
                    <div className="relative w-full h-full min-h-0">
                      <div className="h-full min-h-0 relative overflow-y-auto" ref={listScrollRef} onScroll={updateMoreButtonVisibility}>
                        <Grid className="grid-cols-3 gap-[1.2rem] w-full">
                          {dummyData4List.map((item) => (
                            <Gcol
                              data-recommend-item="true"
                              className={`group bg-[var(--color-secondary-40)] rounded-[1rem] after:content-[''] after:rounded-[1rem] after:absolute after:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] after:w-full after:h-full after:pointer-events-none after:top-0 after:left-0 shadow-[0_0.2rem_0.2rem_0_rgba(0,0,0,0.1)] overflow-hidden relative ${listSelected === item.id ? 'card-selected' : ''}`}
                              key={item.id}
                            >
                              <div className="absolute top-[1rem] right-[1rem] z-10">
                                <Checkbox
                                  size="xl"
                                  color='secondary'
                                  checked={checkedMap[item.id] ?? false}
                                  onCheckedChange={(checked) => {
                                    setCheckedMap((prev) => ({
                                      ...prev,
                                      [item.id]: checked === true,
                                    }));
                                  }}
                                ></Checkbox>
                              </div>
                              <Gcol className="bg-[#fff] group-[.card-selected]:bg-[url(/images/Ltpa020/cand_on_bg.png),linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] group-[.card-selected]:[background-repeat:no-repeat] group-[.card-selected]:[background-position:right_top,left_top]   rounded-b-[1rem] p-[1rem] gap-2 w-full px-[1.6rem] pt-[2rem] pb-[1rem] shadow-[0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)] group-[.card-selected]:text-white" placement='ss'>
                                <h3 className="truncate w-[calc(100%-2.4rem)] text-[1.5rem] font-bold">
                                  {item.field1}
                                </h3>
                                <div className='w-full flex gap-1 text-[1.1rem] text-[var(--color-gray-70)] group-[.card-selected]:text-white'>
                                  {item?.field2.join(' · ') ?? ''}
                                </div>
                                <Grow placement='bwc'>
                                  <div className='w-full flex gap-1 text-[1.1rem] text-[var(--color-gray-70)] group-[.card-selected]:text-white'>
                                    {item?.field3.join(' / ') ?? ''}
                                  </div>
                                
                                  <Grow className='shrink-0'>
                                    <AdderIcon 
                                    color={listSelected === item.id ? 'var(--color-primary-70)' : '#FFAC27'}
                                    color2={listSelected === item.id ? 'var(--color-primary-50)' : '#FFCF64'}
                                    color3={listSelected === item.id ? 'var(--color-primary-20)' : '#FFE8AE'} />
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
                                <Button
                                  variant={'none'}
                                  className='text-[#fff] font-bold pt-[0.8rem] pb-[1rem] h-[auto] text-[1.3rem]'
                                  onClick={() => setListSelected(item.id)}
                                >
                                  <PaperIcon size={16} color={'var(--color-white)'} />
                                  보장내용 확인
                                </Button>
                              </Grow>
                            </Gcol>
                          ))}
                        </Grid>
                      </div>
                      {showMoreButton && (
                        <div className="absolute bottom-0 right-0 z-10 w-full h-[2.7rem] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#fff_100%)] flex items-center justify-center">
                          <Button type="button" className='mb-2 bg-[var(--color-warning-10)] rounded-full text-[var(--color-primary-50)] gap1.5 h-[2.5rem] border-0 px-[0.6rem] hover:bg-[var(--color-warning-20)]' onClick={handleMoreRecommendClick}>
                            <ArrowDoubleIcon />
                            추천설계 더보기
                            <ArrowDoubleIcon />
                          </Button>
                        </div>
                      )}
                    </div>
                    {/* 상세 */}
                    <Grid className="shrink-0 w-[29.4rem] h-full rounded-[1rem] border border-[#FF5C2E] bg-white shadow-[0_2px_2px_0_rgba(255,92,46,0.2)] overflow-hidden grid-rows-[auto_1fr]" gap={0}>
                      <Gcol
                        className="relative px-[1.6rem] py-[1rem] gap-[0.2rem] bg-[url(/images/Ltpa020/cand_on_bg.png),linear-gradient(358deg,#FF5C2E_9.4%,#FF8D02_97.24%)] [background-repeat:no-repeat] [background-position:right_top,left_top] rounded-b-[1rem]"
                        placement='ss'
                      >
                        <Typo tag="strong" variant="body-md" weight="bold" className="text-white">
                          {selectedRecommendPlan?.field1 ?? ''}
                        </Typo>
                        <Typo tag="p" variant="body-sm" className="text-white">
                          {selectedRecommendPlan?.field2.join(' · ') ?? ''}
                        </Typo>

                        <Grow className="w-full" placement="ec" gap={1}>
                          <AdderIcon2 size={14} />
                          <Typo tag="p" variant="body-xs" weight={'normal'} className="text-white">
                            예상보험료
                          </Typo>
                          <Typo tag="p" variant="body-xs" weight={'bold'} className="text-white">
                            {selectedRecommendPlan?.field5.toLocaleString()}원
                          </Typo>
                        </Grow>
                      </Gcol>

                      <Grid className="px-[1rem] pb-[1rem] pt-[0.8rem] gap-[0.8rem] grid-rows-[auto_1fr]">
                        <Accordion type="single" collapsible defaultValue="item-1" className="w-full bg-[var(--color-information-10)] p-2.5 rounded-[1rem]">
                          <AccordionItem value="item-1" className="flex flex-col gap-2">
                            <AccordionTrigger className="group w-full rounded-[1rem]">
                              <Grow
                                className="w-full rounded-[1.2rem] border border-[var(--color-information-50)] bg-white px-[0.8rem] py-[0.2rem] h-[2.4rem]"
                                placement="bwe"
                              >
                                <Grow gap={0.2} placement="sc">
                                  <AiIcon size={10} color='var(--color-information-50)' />
                                  <Typo tag="p" variant="body-xs" weight="bold" className="text-[var(--color-information-50)]">
                                    AI 추천이유
                                  </Typo>
                                </Grow>
                                <SelectDropIcon
                                  className="text-[var(--color-information-50)] transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0 "
                                />
                              </Grow>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="max-h-[9.2rem] overflow-y-auto pr-[0.2rem] text-[1.1rem] leading-[1.5]">
                                {selectedAiReasonLines.map((text, index) => (
                                  <React.Fragment key={`${text}-${index}`}>
                                    {text}
                                    {index < selectedAiReasonLines.length - 1 && <br />}
                                  </React.Fragment>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <div className='ag-theme-alpine'>
                          <AgGridReact<DummyData4ListDetailType>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={selectedRecommendPlan?.detail ?? []}
                            columnDefs={columnDefs4}
                          
                            domLayout="normal"
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </>
                )}
                
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
