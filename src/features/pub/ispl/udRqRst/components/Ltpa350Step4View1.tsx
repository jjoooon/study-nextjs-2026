'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import type { CellClassParams, ColDef, GridApi, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Accordion } from '@/shared/components/uiux/Accordion';
import { useTabs } from '@/shared/hooks/useTabs';

import { Divider, Gcol, Grow, Grid, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { KeyValueList } from '@common/KeyValueList';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { SelectDrop } from '@common/SelectDrop';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { ChevronDownIcon, PaperIcon, ResetIcon, SaveIcon, SearchIcon, SizeIcon, SizeOffIcon } from '@icons';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';

import '@/shared/lib/agGridPub';

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

// agGrid 
type AgGridRow = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
const DummyData: AgGridRow[] = [
  {
    id: 1,
    field01: '1',
    field02: '특인대상',
    field03: '담보 가입한도 조정대상: 척추염좌',
  },
  {
    id: 2,
    field01: '2',
    field02: '',
    field03: '',
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


interface Ltpa350Step4Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
  viewKey: ViewKey;
}

export function Ltpa350Step4View1({ onSelectPlan, isWidthExpanded = false, setIsWidthExpanded, viewKey }: Ltpa350Step4Props) {
  // 1) INLINED STATE (default)
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const handleActionButtonClick = useCallback(() => {}, []);
  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };

  // 2) Tabs/rowData 분기
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);

  // 3) Grid data
  const [rowData, setRowData] = useState<AgGridRow[]>(DummyData);

  // agGrid 컬럼 정의 useMemo 분리
  const columnDefs = useMemo<ColDef<AgGridRow>[]>(
    () => [
      {
        headerName: '순번',
        width: 80,
        field: 'id',
        cellClass: 'text-center px-0!',
        autoHeight: true,
      },
      {
        headerName: '심사구분',
        flex: 1,
        field: 'field02',
        autoHeight: true,
        cellClass: 'editable-cell text-center',
      },
      {
        headerName: '세부내용',
        flex: 1,
        field: 'field03',
        autoHeight: true,
        cellClass: 'editable-cell text-center',
      },
    ],
    []
  );

  // productNameHeader는 단순히 체크박스 UI만 반환
  const productNameHeader = useCallback(() => {
    return (
      <Grow className="w-full px-[0.6rem]" placement={'cc'} gap={4}>
        <Grow gap={1.5} placement={'sc'}>
          <Checkbox variant={'text'} checked={checkedMap.selected} onCheckedChange={handleCheckedChange('selected')}>
            선택 24건
          </Checkbox>
          <Divider />
          <Checkbox
            variant={'text'}
            checked={checkedMap.unselected}
            onCheckedChange={handleCheckedChange('unselected')}
          >
            미선택
          </Checkbox>
        </Grow>
      </Grow>
    );
  }, [checkedMap, handleCheckedChange]);


  const [testError, setTestError] = useState(false);

  return (
    <LayoutMainBody>
      <form
        id="page2-MainForm"
        className="w-full h-full"
        onSubmit={(event) => {
          event.preventDefault();
          setTestError(!testError);
        }}
        noValidate
      >
        <LayoutMain className="grid grid-rows-[auto_1fr_auto] gap-[1rem] h-full">
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
          >
            <Gcol variant={'box-round-b'} placement={'ss'} className={`w-full ${!isHeightExpanded ? '' : 'hidden'}`}>
              <FormTable caption="취급자 정보" variant={'head'}  cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}  className="w-full"> 
                <FormRow className="w-full">
                  <FormCell title={'동시설계'}  tdStyle={{ flex: 1 }} tdClassName="w-full justify-between gap-4">
                    <RadioGroup
                      className="gap-2"
                      errorMsg="하나를 선택해주세요."
                      errorPs="bl"
                      onValueChange={() => {}}
                    >
                      <RadioGroupItem
                        color="primary"
                        id="radio1"
                        size="md"
                        value="LA260112297637"
                        variant="button"
                        // checked={true}
                      >
                        LA260112297637
                      </RadioGroupItem>
                      <RadioGroupItem
                        color="primary"
                        id="radio2"
                        size="md"
                        value="LA260112297660"
                        variant="button"
                      >
                        LA260112297660
                      </RadioGroupItem>
                    </RadioGroup>
                    <Grow className="flex items-center gap-1">
                      <Button variant={'outlined'} color={'gray'} size={'md'}>보장패키지</Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>적부결과</Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>누적위험</Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>위험체크리스트</Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>공장업종확인</Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>재물실사보고서</Button>
                    </Grow>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'심사구분'} className="w-full">
                    <Input aria-label="신계약" width={70} value={'신계약'} size={'md'} readOnly />
                    <NativeSelect aria-label="설계심사" width={140} size={'md'} readOnly={false} required={false}>
                      {[
                        { label: '설계심사', value: 'planA' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input
                      aria-label="심사요청불가"
                      width={110}
                      size={'md'}
                      value={'심사요청불가'}
                      readOnly
                    />
                    <Input
                      aria-label=""
                      width={80}
                      size={'md'}
                      value={''}
                      readOnly
                    />
                    <Checkbox>사후적부 대체</Checkbox>
                  </FormCell>
                  <FormCell title={'심사처리자'} className="w-full">
                    <Input aria-label="" width={70} value={''} size={'md'} readOnly />
                    <Input aria-label="" width={70} value={''} size={'md'} readOnly />
                    <Input aria-label="" width={70} value={''} size={'md'} readOnly />
                  </FormCell>
                  <FormCell title={'심사상태'} className="w-full">
                    <Input aria-label="" width={70} value={''} size={'md'} readOnly />
                    <Checkbox>심사자배정</Checkbox>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Gcol>
          </TabPager>
                    
          <LayoutMainBody>
            <Grow className="w-full overflow-hidden " placement="ss" gap={5}>
              <Grid className="w-full h-full" gap={6}>
                <Gcol>
                  <LayoutScrollWrap className="grid-rows-[auto_1fr]">
                    <Grow placement={'bwc'} className="gap-1 w-full pb-1">
                      <Grow className="gap-1.5">
                        <Typo variant="heading-md">지침세부내용</Typo>
                        
                      </Grow>
                      <Grow className="gap-2.5">
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          지침확인
                        </Button>
                      </Grow>
                    </Grow>
                    <LayoutScrollItem className="w-full">
                      <div className="ag-theme-alpine">
                        <AgGridReact<AgGridRow>
                          key={gridKey}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          getRowId={(params) => String(params.data.id)}
                          singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                          rowSelection={{
                            mode: 'multiRow' as const,
                            checkboxes: true,
                            headerCheckbox: true,
                            enableClickSelection: false,
                            enableSelectionWithoutKeys: true,
                          }}
                          selectionColumnDef={{
                            width: 30,
                            // pinned: 'left',
                            cellClass: 'text-center p-0!',
                            cellClassRules: {
                              'pointer-events-none': (params) => !!params.data?.locked,
                            },
                          }}
                          suppressRowHoverHighlight={false}
                          tooltipShowDelay={showProductNameTooltip ? 0 : undefined}
                          tooltipHideDelay={showProductNameTooltip ? 9999 : undefined}
                          tooltipMouseTrack={showProductNameTooltip ? true : undefined}
                        />
                      </div>
                    </LayoutScrollItem>
                  </LayoutScrollWrap>
                </Gcol>
                <Gcol>
                  <LayoutScrollWrap className="grid-rows-[auto_1fr]">
                    <Grow placement={'bwc'} className="gap-1 w-full pb-1">
                      <Grow className="gap-1.5">
                        <Typo variant="heading-md">조건부 특약 가입</Typo>
                        
                      </Grow>
                      <Grow className="gap-2.5">
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          상세
                        </Button>
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          무담보이력
                        </Button>
                      </Grow>
                    </Grow>
                    <LayoutScrollItem className="w-full">
                      <div className="ag-theme-alpine">
                        <AgGridReact<AgGridRow>
                          key={gridKey}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          getRowId={(params) => String(params.data.id)}
                          singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                          rowSelection={{
                            mode: 'multiRow' as const,
                            checkboxes: true,
                            headerCheckbox: true,
                            enableClickSelection: false,
                            enableSelectionWithoutKeys: true,
                          }}
                          selectionColumnDef={{
                            width: 30,
                            // pinned: 'left',
                            cellClass: 'text-center p-0!',
                            cellClassRules: {
                              'pointer-events-none': (params) => !!params.data?.locked,
                            },
                          }}
                          suppressRowHoverHighlight={false}
                          tooltipShowDelay={showProductNameTooltip ? 0 : undefined}
                          tooltipHideDelay={showProductNameTooltip ? 9999 : undefined}
                          tooltipMouseTrack={showProductNameTooltip ? true : undefined}
                        />
                      </div>
                    </LayoutScrollItem>
                  </LayoutScrollWrap>
                </Gcol>
              </Grid>
              <Grow className="w-[29.8rem] h-full border-1 rounded-[0.8rem]">
                <>
                  <Grow>
                  </Grow>
                </>
              </Grow>
            </Grow>
          </LayoutMainBody>

          <LayoutMainFoot>
            <MainBottom variant="box">
              <MainBottomItem className="!py-0">
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
                        <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
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
                          <span className="block w-full rounded-[0.4rem] h-[2.5rem] bg-[var(--color-gray-10)] px-2 text-[1.4rem] border border-[0.1rem] border-[var(--color-gray-20)] box-border tracking-[0] leading-[2.5rem] appearance-none truncate text-right cursor-pointer">
                            {Number(100000).toLocaleString()}
                          </span>
                        </PopoverTrigger>
                        <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
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
                        <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
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
