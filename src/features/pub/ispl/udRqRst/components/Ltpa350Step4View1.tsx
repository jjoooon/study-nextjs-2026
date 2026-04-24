'use client';

import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';

import { Gcol, Grow, Grid, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import {
  createTooltipValueGetter,
} from '@/shared/components/agGridUtils/AgGridUtils';

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

// 첫번째 agGrid 
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
    field02: '참고사항',
    field03: '5년이내 치료내용이 확인 되었습니다.(담당: 장기 U/W파트)',
  },
  {
    id: 3,
    field01: '3',
    field02: '인수기준',
    field03: '[후유합계(80%)(2107)[전체누적][인수한도: 3000만]]',
  },
  {
    id: 4,
    field01: '4',
    field02: '인수기준',
    field03: '100',
  },
  {
    id: 5,
    field01: '5',
    field02: '인수기준',
    field03: '[후유합계(80%)(2107)[전체누적][인수한도: 3000만]][후유합계(80%)(2107)[전체누적][인수한도: 3000만]][후유합계(80%)(2107)[전체누적][인수한도: 3000만]]',
  },
  {
    id: 6,
    field01: '6',
    field02: '인수기준',
    field03: '100',
  },
];

// 두번째 agGrid 
type AgGridRow2 = {
  id: number;
  field01: string;
};
const DummyData2: AgGridRow2[] = [
  {
    id: 1,
    field01: '보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편) 보통약관(상해80%이상후유장해)(간편)',
  },
  {
    id: 2,
    field01: '보험료납입면제대상보장(5대유사)(간편)',
  },
  {
    id: 3,
    field01: '상해사망(간편)',
  },
  {
    id: 4,
    field01: '상해후유장해(3-100%)',
  },
  {
    id: 5,
    field01: '질병사항(간편)',
  },
  {
    id: 6,
    field01: '질병사항(간편)',
  },
];

type ViewKey = 'view1' | 'view2';

interface Ltpa350Step4Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
  viewKey: ViewKey;
}

export function Ltpa350Step4View1({ onSelectPlan, isWidthExpanded = false, setIsWidthExpanded, viewKey }: Ltpa350Step4Props) {
  // 1) INLINED STATE (default)
  const [isHeightExpanded] = useState(false);
  const [gridKey] = useState(0);
  const [gridKey2] = useState(0);

  // 2) Tabs/rowData 분기
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);

  // 3) Grid data
  const [rowData] = useState<AgGridRow[]>(DummyData);
  const [rowData2] = useState<AgGridRow2[]>(DummyData2);

  // 첫번째 agGrid 컬럼 
  const columnDefs = useMemo<ColDef<AgGridRow>[]>(
    () => [
      {
        headerName: '순번',
        field: 'id',
        width: 60,
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '심사구분',
        field: 'field02',
        flex: 1,
        autoHeight: true,
        cellClass: 'editable-cell text-center',
        cellStyle: (params) =>
          params.value === '인수기준'
            ? { color: 'var(--color-danger-50)' }
            : undefined,
      },
      {
        headerName: '세부내용',
        field: 'field03',
        flex: 1,
        autoHeight: true,
        cellClass: 'editable-cell text-left',
        tooltipValueGetter: createTooltipValueGetter<AgGridRow>({ field: 'field03' }),
      },
    ],
    []
  );

  // 두번째 agGrid 컬럼 
  const columnDefs2 = useMemo<ColDef<AgGridRow2>[]>(
    () => [
      {
        headerName: '담보명',
        field: 'field01',
        flex: 1,
        cellClass: 'editable-cell text-left',
        autoHeight: true,
        tooltipValueGetter: createTooltipValueGetter<AgGridRow2>({ field: 'field01' }),
      },
    ],
    []
  );

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
                            checkboxes: false,
                            headerCheckbox: false,
                            enableClickSelection: false,
                            enableSelectionWithoutKeys: true,
                          }}
                          suppressRowHoverHighlight={false}
                          tooltipShowMode="whenTruncated"
                          tooltipShowDelay={0}
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
                      <Grow className="gap-1">
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
                        <AgGridReact<AgGridRow2>
                          key={gridKey2}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
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
                            width: 60,
                            cellClass: 'text-center p-0!',
                            cellClassRules: {
                              'pointer-events-none': (params) => !!params.data?.locked,
                            },
                          }}
                          suppressRowHoverHighlight={false}
                          tooltipShowMode="whenTruncated"
                          tooltipShowDelay={0}
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
              <MainBottomItem>
              <Grow className="gap-1">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  이미지스캔
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  건축물대장조회스캔
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  사진/서류 알림톡
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  체크리스트 알림톡 
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  진단/적부이력
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  외부심사결과지요청
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  진단적부예외
                </Button>
              </Grow>
                <Grow className="gap-1">
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    현장소통
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    조건부수용
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    긴급심사요청
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    청약후심사요청
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
