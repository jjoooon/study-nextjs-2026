'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import type { CellClassParams, ColDef, GridApi, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Accordion } from '@/shared/components/uiux/Accordion';
import { useTabs } from '@/shared/hooks/useTabs';
import {
  amountUnitInputCellRenderer,
  CoveragePopover,
  createCellClickSelectionToggleHandler,
  createCellErrorClassRules,
  createEditableCallback,
  createInsertCopiedRowButtonCellRenderer,
  createSelectionChangedHandler,
  createTooltipValueGetter,
  editableSelectCellRenderer,
  numberValueFormatter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Divider, Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { KeyValueList } from '@common/KeyValueList';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { SelectDrop } from '@common/SelectDrop';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { ChevronDownIcon, InfoBoxInfoIcon, PaperIcon, ResetIcon, SaveIcon, SearchIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { QuestionRadioCard, QuestionRadioCardContents, QuestionRadioCardHeader, QuestionRadioCardHeaderTitle } from '@/shared/components/common/QuestionRadioCard';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';

ModuleRegistry.registerModules([AllCommunityModule]);

interface TabDataType {
  id: string | number;
  name?: string;
  age?: string | number;
  gender?: string;
  value: string;
  error?: boolean;
  info: string[];
}
const TabData: TabDataType[] = [
  {
    id: 1,
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 2,
    name: '목적물',
    age: '1',
    gender: '',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 3,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 4,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 5,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 6,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 7,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 8,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 9,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 10,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 11,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 12,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 13,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 14,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 15,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 16,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 17,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 18,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 19,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 20,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 21,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
];

interface DummyDataType {
  id: number;
  isChecked?: boolean;
  field1?: string | number | boolean;
  field2?: string | number | boolean;
  field3?: string | number | boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;
  field9?: string | number | boolean;
  field10?: {
    title: string;
    description: string;
    info: string[];
  };
  locked?: boolean;
  isHighlighted?: boolean;
  badge?: string[];
  [key: string]: unknown;
}
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1:
      '무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험',
    field2: true,
    field3: 500,
    field3Required: true, // 필수 여부 설정
    field4: 450,
    field5: '80세',
    field6: '20년',
    field7: 100,
    field8: '인수',
    field9: true,
    field10: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: true,
    isHighlighted: true,
    badge: ['독립', '갱신'],
  },
  {
    id: 2,
    field1: '무배당 KB손해보험 암보험',
    field2: true,
    field3: 300,
    field3Required: false,
    field4: 280,
    field5: '100세',
    field6: '30년',
    field7: 80,
    field8: '인수',
    field9: true,
    field10: {
      title: '담보명 1특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['갱신'],
  },
  {
    id: 3,
    field1: '무배당 현대해상 3대질병보험',
    field2: false,
    field3: 400,
    field3Required: false,
    field4: 380,
    field5: '90세',
    field6: '25년',
    field7: 120,
    field8: '인수',
    field9: true,
    field10: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    isHighlighted: false,
    badge: ['독립'],
  },
];

type PlanAccordionItem = {
  value: string;
  trigger: string;
  content: string[];
};
const planAccordionItems: PlanAccordionItem[] = [
  {
    value: 'item-1',
    trigger: '기관플랜(5)',
    content: [
      '(지점)올인원플랜(15~40세)',
      '(지점)올인원플랜(15~40세)',
      '(지점)올인원플랜(15~40세)',
      '(지점)올인원플랜(15~40세)',
    ],
  },
  {
    value: 'item-2',
    trigger: '기관플랜(0)',
    content: ['(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)'],
  },
  {
    value: 'item-3',
    trigger: '모집자플랜(0)',
    content: ['(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)', '(지점)올인원플랜(15~40세)'],
  },
];

type ViewKey = 'view1' | 'view2' | 'view3' | 'view4' | 'view5';
type AgGridRow = DummyDataType & {
  isDuplicate?: boolean;
  displayNo?: number;
  badge?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
};

interface Ltpa350Step3Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
  viewKey: ViewKey;
}

export function Ltpa350Step3({ onSelectPlan, isWidthExpanded = false, setIsWidthExpanded }: Ltpa350Step3Props) {
  // 1) INLINED STATE (default)
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const handleActionButtonClick = useCallback(() => {}, []);

  // 2) Tabs/rowData 분기
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);

  
  const [testError, setTestError] = useState(false);

  return (
    <LayoutMainBody>
      <form
        id="page3-MainForm"
        className="w-full h-full"
        onSubmit={(event) => {
          event.preventDefault();
          setTestError(!testError);
        }}
        noValidate
      >
        <LayoutMain className="grid grid-rows-[auto_1fr_auto] h-full">
          <TabPager
            data={Tabs}
            active={TabActive}
            setActive={TabSetActive}
            visibleCount={5}
            error={testError}
            errorMsg="입력하세요."
            getValue={(tab) => String(tab.id)}
            renderTab={(tab) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <span className="max-w-20 truncate block">{tab.name}</span>
                    <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  <BulletList className="gap-[0.5rem]">
                    {tab.info.map((info: string, index: number) => (
                      <BulletListItem key={index} type="dot">
                        {info}
                      </BulletListItem>
                    ))}
                  </BulletList>
                </TooltipContent>
              </Tooltip>
            )}
            renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
              <Button
                variant={'none'}
                key={String(tab.id)}
                onClick={() => {
                  setActive(String(tab.id));
                  const idx = data.findIndex((t) => String(t.id) === String(tab.id));
                  if (idx !== -1) {
                    const page = Math.floor(idx / visibleCount);
                    setVisibleStart(page * visibleCount);
                  }
                }}
              >
                <span className="flex items-start gap-2 w-full">
                  <span className="block">{tab.name}</span>
                  <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                </span>
              </Button>
            )}
          />
        
          <LayoutMainBody>
            <LayoutScrollWrap className="grid-cols-[1fr_auto]">
              <LayoutScrollItem className="w-full h-full" >
                <Gcol gap={2}>
                  <Grow variant={'box-round-b'} placement={'se'} className={'w-full'}>
                    <Gcol placement='ss'>
                      <Typo variant={'body-sm'} icon={'warning'} color={'danger'} weight={'bold'}>
                        [홍길순 Self고지중] Self고지 완료(또는 취소)처리시 알릴사항 입력 가능
                      </Typo>
                      <Typo variant={'body-lg'} weight={'bold'}>다음 각 항목의 질문에 사실대로 답변 하시기 바랍니 다.</Typo>
                    </Gcol> 
                    <Grow gap={1}>
                      <NativeSelect aria-label="알릴사항" width={124} readOnly>
                        {[
                          { label: '알릴사항(설계)', value: 'value1' },
                          { label: '알릴사항', value: 'value2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Button color="primary" onClick={() => {}} size="lg" variant="outlined">모두 아니오</Button>
                    </Grow>
                  </Grow>
                  <Gcol variant={'box-round'} placement={'ss'} className='w-full'>
                    <Typo variant={'body-sm'} weight={'bold'}>
                      ■ 이 청 약서에서 ‘최근 3개월 1년, 5년 이내’는 청약일의 3개월, 1년, 5년 전일부터 청약일가지를 의미합니다. (예를 들어 청약일이 4월 1일 인 경우 ‘최근 3개월 1년, 5년 이내’는 1월 1일부터 4월 1일까지) 
                    </Typo>
                  </Gcol>
                  <QuestionRadioCard>
                    <QuestionRadioCardHeader>
                      <QuestionRadioCardHeaderTitle badgeLabel="1">
                        최근 3개월 이내에 의사로부터 진찰 또는 검사(건강검진 포함)를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?
                      </QuestionRadioCardHeaderTitle>
                      <RadioGroup
                        className={'gap-[1.2rem] w-[11rem]'}
                        width="auto"
                        >{[
                          { value: '예', label: '예' },
                          { value: '아니오', label: '아니오'},
                        ].map((option) => (
                          <RadioGroupItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </QuestionRadioCardHeader>
                    <QuestionRadioCardContents>
                      <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          질병확정진단
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          질병의심소견
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          치료
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          입원
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          수술(제왕절개포함)
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          투약
                        </Checkbox>
                      </Grid>
                      <Gcol className="w-full" placement="ss" variant="box-detail">
                        <Typo icon="detail" variant="body-sm">
                          <b>질병의심소견</b>이란 의사가 진단서나 소견서 또는 진료의뢰서 등을 포함하여 서면(전자문서 포함)으로
                          교부한 경우를 말합니다.
                        </Typo>
                        <Typo icon="detail" variant="body-sm">
                          <b>투약이란</b> 의사가 환자에게 약을 처방하는 행위를 말하는 것으로 실제로 약을 구입하지 않았어도
                           기재해야 합니다.
                        </Typo>
                      </Gcol>
                    </QuestionRadioCardContents>
                  </QuestionRadioCard>
                  <QuestionRadioCard isRadio={true} isValue="Y">
                    <QuestionRadioCardHeader>
                      <QuestionRadioCardHeaderTitle badgeLabel="2">
                        최근 3개월 이내에 마약을 사용하거나 혈압강하제, 신경안정제, 수면제, 각성제(흥분제), 진통제 등 약물을 상시 복용한 사실이 있습니까?
                      </QuestionRadioCardHeaderTitle>
                    </QuestionRadioCardHeader>
                    <QuestionRadioCardContents>
                      <Gcol className="w-full" placement="ss" variant="box-detail">
                        <Typo icon="detail" variant="body-sm">
                          <b>혈압강하제</b>란 혈압을 내리게 하는 의약품을 말하며, 각성제란 신경계를 흥분시켜 잠이 오는 것을
                          억제하는 의약품을 말합니다.
                        </Typo>
                      </Gcol>
                    </QuestionRadioCardContents>
                  </QuestionRadioCard>
                  <QuestionRadioCard isRadio={true} isValue="Y">
                    <QuestionRadioCardHeader>
                      <QuestionRadioCardHeaderTitle badgeLabel="3">
                        최근 1년 이내에 의사로부터 진찰 또는 검사를 받고, 이를 통하여 추가검사(재검사)를 받은 사실이 있습니까?
                      </QuestionRadioCardHeaderTitle>
                    </QuestionRadioCardHeader>
                    <QuestionRadioCardContents>
                      <Gcol className="w-full" placement="ss" variant="box-detail">
                        <Typo icon="detail" variant="body-sm">
                          <b>추가검사(재검사)</b>란 검사 결과 이상 소견이 확인되어 보다 정확한 진단을 위해 시행한 검사를
                          의미하며, 병증에 대한 치료 필요 없이 유지되는 상태에서 시행하는 정기검사 또는 추적관찰은 포함하지
                          않습니다.
                        </Typo>
                      </Gcol>
                    </QuestionRadioCardContents>
                  </QuestionRadioCard>
                  <QuestionRadioCard>
                    <QuestionRadioCardHeader>
                      <QuestionRadioCardHeaderTitle badgeLabel={'4'}>
                        최근 5년 이내에 의사로부터 진찰 또는 검사를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?
                      </QuestionRadioCardHeaderTitle>
                    </QuestionRadioCardHeader>
                    <QuestionRadioCardContents>
                      <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          입원
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          수술(제왕제갤포함)
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          계속하여 7일이상 치료
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          계속하여 30일이상 투약
                        </Checkbox>
                      </Grid>
                       <Gcol className="w-full" placement="ss" variant="box-detail">
                        <Typo icon="detail" variant="body-sm">
                          여기서 <b>‘계속하여’</b>란 같은 원인으로 치료 시작 후 완료일까지 실제 치료, 투약 받은 일수를 말합니다.
                        </Typo>
                       </Gcol>
                    </QuestionRadioCardContents>
                  </QuestionRadioCard>
                  <QuestionRadioCard isRadio={true} isValue="Y">
                    <QuestionRadioCardHeader>
                      <QuestionRadioCardHeaderTitle badgeLabel={'5'}>
                        최근 5년 이내에 아래의 질병으로 의사로부터 진찰 또는 검사를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?
                      </QuestionRadioCardHeaderTitle>
                    </QuestionRadioCardHeader>
                    <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        암
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        백혈병
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        고혈압
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        협심증
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        심근경색
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        심장판막
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        간경화증
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        뇌졸중증(뇌출혈, 뇌경색)
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        당뇨병
                      </Checkbox>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                      >
                        에이즈(AIDS) 및 HIV보균
                      </Checkbox>
                    </Grid>
                    <Gcol placement='ss'>
                      <Gcol className="w-[18.1rem]" placement="ss" variant="box-detail">
                        <Typo icon="detail" variant="body-sm">
                          <b>실손의료보험</b> 가입시에만 체크
                        </Typo>
                      </Gcol>
                      <Checkbox
                        color="primary"
                        errorMsg="선택은 필수입니다."
                        errorPs="bl"
                        onCheckedChange={() => {}}
                        size="lg"
                        variant="default"
                        className='ml-2.5'
                      >
                        직장 또는 항문 관련 질환(치질, 치루(누공), 치열(찢어짐), 항문 농양(고름집), 직장 또는 항문탈출, 항문출혈, 항문궤양)
                      </Checkbox>
                      <FormTable caption="FormTable 예시" className="border-t border-solid border-[#D8D8D8] pt-2.5" cols={[ 'w-[5.4rem]', 'w-auto']} lineTop variant="none">
                        <FormRow>
                          <FormCell
                            className=""
                            title={<b className='text-[#000] pl -2.5'>의료행위</b>}
                            variant="default"
                          >
                            <CheckboxGroup color="primary" onValueChange={() => {}} size="lg" variant="default" className='grid grid-cols-5'>
                              <CheckboxGroupItem value="a">
                                질병확정진단
                              </CheckboxGroupItem>
                              <CheckboxGroupItem value="b">
                                치료 
                              </CheckboxGroupItem>
                              <CheckboxGroupItem value="c">
                                입원
                              </CheckboxGroupItem>
                              <CheckboxGroupItem value="d"> 
                                수술
                              </CheckboxGroupItem>
                              <CheckboxGroupItem value="e">
                                투약
                              </CheckboxGroupItem>
                            </CheckboxGroup>
                          </FormCell>
                        </FormRow>
                      </FormTable>  
                    </Gcol>
                  </QuestionRadioCard>
                  <QuestionRadioCard
                    icon={<InfoBoxInfoIcon />}
                    question="최근 5년 이내에 아래의 질병으로 의사로부터 진찰 또는 검사를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?"
                    isRadio={false}
                    isValue="Y"
                    bg={'#EFF8FF'}
                  > 
                  </QuestionRadioCard>
                  <QuestionRadioCard badgeLabel="1" question="최근 3개월 이내에 의사로부터 진찰 또는 검사(건강검진 포함)를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?">
                    <QuestionRadioCardHeader>
                      <QuestionRadioCardHeaderTitle badgeLabel="4">최근 5년 이내에 의사로부터 진찰 또는 검사를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?</QuestionRadioCardHeaderTitle>
                    </QuestionRadioCardHeader>
                    <QuestionRadioCardContents>
                      <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          입원
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          수술(제왕제갤포함)
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          계속하여 7일이상 치료
                        </Checkbox>
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          계속하여 30일이상 투약
                        </Checkbox>
                      </Grid>
                      <Gcol className="w-full" placement="ss" variant="box-detail">
                        <Typo icon="detail" variant="body-sm">
                          여기서 <b>‘계속하여’</b>란 같은 원인으로 치료 시작 후 완료일까지 실제 치료, 투약 받은 일수를 말합니다.
                        </Typo>
                      </Gcol>
                    </QuestionRadioCardContents>
                  </QuestionRadioCard>
                </Gcol>
              </LayoutScrollItem>
              <LayoutScrollItem className="w-full h-full">
                <div className='h-[120vh] bg-amber-100'>adfasdf</div>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>

          <LayoutMainFoot>            
            <MainBottom variant="box">
              <MainBottomItem className="py-0">
                <FormTable
                  className="w-full! [&_tr]:justify-between"
                  lineTop={false}
                  variant={'bottom'}
                  cols={[
                    'min-w-[9rem]',
                    'w-[36%]',
                    'min-w-[8rem]',
                    'w-[30%]',
                    'min-w-[8rem]',
                    'w-[30%]',
                    'min-w-[8rem]',
                    'min-w-[15rem]',
                  ]}
                >
                  <FormRow>
                    <FormCell title="만기금(환급률)" style={{ borderBottom: '0.1rem solid #ccc' }}>
                      <Button variant={'outlined'} color={'gray'} size={'sm'}>
                        예상
                      </Button>
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        size={'md'}
                        width={'full'}
                        readOnly={true}
                        className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input
                            type="text"
                            commaAmount={true}
                            value={39.4}
                            size={'md'}
                            width={60}
                            className="[&_input]:text-right shrink-0 cursor-pointer"
                          />
                        </PopoverTrigger>
                        <PopoverContent side="top" align="end" className="max-w-170" closeButton={true}>
                          <KeyValueList
                            direction="col"
                            variant="amount"
                            data={[
                              { key: '총압입보험료', value: '000,000,000원' },
                              { key: '중도환급금', value: '0원' },
                              { key: '만기환급금', value: '000,000,000원' },
                            ]}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                      %
                    </FormCell>
                    <FormCell title="보장보험료">
                      <Popover>
                        <PopoverTrigger className="w-full">
                          <span className="block w-full rounded-[0.4rem] h-[2.5rem] bg-[--color-gray-10] px-2 text-[1.4rem] border box-border tracking-[0] leading-[2.5rem] appearance-none truncate text-right cursor-pointer" style={{ borderWidth: '0.1rem', borderColor: 'var(--color-gray-20)' }}>
                            {Number(100000).toLocaleString()}
                          </span>
                        </PopoverTrigger>
                        <PopoverContent side="top" align="end" className="max-w-170" closeButton={true}>
                          <KeyValueList
                            direction="col"
                            variant="amount"
                            data={[{ key: '일시납보험료', value: '000,000,000원' }]}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormCell>
                    <FormCell title="적립보험료">
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        width={'full'}
                        size={'md'}
                        readOnly={true}
                        className="text-right"
                      />
                    </FormCell>

                    <FormCell title="합계보험료">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input
                            type="tel"
                            commaAmount={true}
                            value={0}
                            clear={true}
                            width={'full'}
                            size={'md'}
                            required={true}
                            error={testError}
                            errorMsg={'계약자 입력은 필수입니다.'}
                            errorPs={'tr'}
                            className="text-right font-bold"
                          />
                        </PopoverTrigger>
                        <PopoverContent side="top" align="end" className="max-w-170" closeButton={true}>
                          <KeyValueList
                            direction="col"
                            variant="amount"
                            data={[
                              { key: '최소 보험료', value: '000,000,000원' },
                              { key: '최대 보험료', value: '000,000,000원' },
                            ]}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </MainBottomItem>
              <MainBottomItem>
                <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                  고지유형별보험료비교
                </Button>
                <Grow className="gap-1">
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                    상품비교설계
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                    동일상품복사
                  </Button>
                  <Button
                    type="submit"
                    form={'page2-MainForm'}
                    variant={'contained'}
                    color={'primary'}
                    size={'xl'}
                    // onClick={onCalcGuidelineClick}
                  >
                    보험료계산(지침)
                  </Button>
                </Grow>
              </MainBottomItem>
            </MainBottom>
          </LayoutMainFoot>
        </LayoutMain>
      </form>
    </LayoutMainBody>
  );
}
