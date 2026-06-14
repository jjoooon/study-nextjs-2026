/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Gcol, Grid, ConTit, ConTitName } from '@atoms';
import { BtnPlusIcon } from '@icons';
import { createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Table, TableBody, TableRow, TableCell } from '@uiux/Table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { LayoutScrollItem, LayoutScrollWrap } from '@common/LayoutScroll';
import { TabPager } from '@common/TabPager';
import { ChatResult } from '@features/ChatResult';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';

import '@/shared/lib/agGridPub';

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
    field03:
      '[후유합계(80%)(2107)[전체누적][인수한도: 3000만]][후유합계(80%)(2107)[전체누적][인수한도: 3000만]][후유합계(80%)(2107)[전체누적][인수한도: 3000만]]',
  },
  {
    id: 6,
    field01: '6',
    field02: '인수기준',
    field03: '100',
  },
];

export function Ltpa35004() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [isHeightExpanded] = useState(false);
  const [gridKey] = useState(0);

  // 2) Tabs/rowData 분기
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);

  // 3) Grid data
  const [rowData] = useState<AgGridRow[]>(DummyData);

  // 첫번째 agGrid 컬럼
  const columnDefs = useMemo<ColDef<AgGridRow>[]>(
    () => [
      {
        headerName: '순번',
        field: 'id',
        flex: 1,
        minWidth: attributeColumnWidth(40),
        cellClass: 'text-center',
        autoHeight: true,
      },
      {
        headerName: '심사구분',
        field: 'field02',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        autoHeight: true,
        cellClass: 'text-center',
        cellStyle: (params) => (params.value === '인수기준' ? { color: 'var(--color-danger-50)' } : undefined),
      },
      {
        headerName: '세부내용',
        field: 'field03',
        flex: 10,
        minWidth: attributeColumnWidth(200),
        autoHeight: true,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<AgGridRow>({ field: 'field03' }),
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <LayoutTemplateLTPA350MainBody
      mainBody={
        <LayoutMain className="grid grid-rows-[auto_1fr_auto] gap-[1rem] w-full h-full">
          <TabPager
            data={Tabs}
            active={TabActive}
            setActive={TabSetActive}
            visibleCount={5}
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
            <Gcol variant={'box-round-b'} placement={'ss'} className={`${!isHeightExpanded ? '' : 'hidden'}`}>
              <FormTable caption="취급자 정보" variant={'head'}>
                <FormRow className="w-full [&>div]:w-full">
                  <FormCell
                    title={'동시설계'}
                    className="min-w-[6.4rem]"
                    tdStyle={{ width: '100%' }}
                    tdClassName="justify-between w-full"
                  >
                    <RadioGroup className="gap-2" errorMsg="하나를 선택해주세요." errorPs="bl" onValueChange={() => {}}>
                      <RadioGroupItem color="primary" id="radio1" size="md" value="LA260112297637" variant="button">
                        LA260112297637
                      </RadioGroupItem>
                      <RadioGroupItem color="primary" id="radio2" size="md" value="LA260112297660" variant="button">
                        LA260112297660
                      </RadioGroupItem>
                    </RadioGroup>

                    <Grow className="flex items-center gap-1">
                      <Button variant={'outlined'} color={'gray'} size={'md'}>
                        진단결과
                      </Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>
                        적부결과
                      </Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>
                        누적위험
                      </Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>
                        위험체크리스트
                      </Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>
                        공장업종확인
                      </Button>
                      <Button variant={'outlined'} color={'gray'} size={'md'}>
                        재물실사보고서
                      </Button>
                    </Grow>
                  </FormCell>
                </FormRow>

                {/* M3. size md 삭제 */}
                <FormRow>
                  <FormCell
                    title={'심사구분'}
                    className="min-w-[6.4rem]"
                    tdStyle={{ width: '100%' }}
                    tdClassName="w-full"
                  >
                    <Grid className="w-full grid-cols-[11.3rem_15rem_23.7rem_minmax(19.4rem,1fr)_9.8rem] gap-1">
                      <Input aria-label="심사구분1" width={'full'} value={'신계약'} size={'md'} readOnly />
                      <NativeSelect aria-label="심사구분2" width={'full'}>
                        {[
                          { label: '설계심사', value: '설계심사' },
                          { label: '설계심사2', value: '설계심사2' },
                          { label: '설계심사3', value: '설계심사3' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Input aria-label="심사구분3" width={'full'} value={'심사요청불가'} readOnly />
                      <Input aria-label="심사구분4" width={'full'} value={''} readOnly />
                      <Checkbox>사후적부 대체</Checkbox>
                    </Grid>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'심사처리자'} className="min-w-[6.4rem]" tdStyle={{ flex: 1 }} tdClassName="w-full">
                    <Grid className="w-full grid-cols-[15rem_15rem_15rem_auto] gap-1">
                      <Input aria-label="심사처리자1" width={'full'} value={''} readOnly />
                      <Input aria-label="심사처리자2" width={'full'} value={''} readOnly />
                      <Input aria-label="심사처리자3" width={'full'} value={''} readOnly />
                    </Grid>
                  </FormCell>
                  <FormCell title={'심사상태'} className="w-full" tdStyle={{ flex: 1 }} tdClassName="w-full">
                    <Grid className="w-full grid-cols-[minmax(15.4rem,1fr)_9.8rem] gap-1">
                      <Input aria-label="심사상태" width={'full'} value={''} readOnly />
                      <Checkbox>심사자배정</Checkbox>
                    </Grid>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Gcol>
          </TabPager>

          <LayoutMainBody>
            <LayoutScrollWrap>
              <LayoutScrollItem>
                <Grid className="w-full h-full grid-cols-[1fr_30.7rem] overflow-x-hidden" gap={3}>
                  <Grid className="h-full grid-rows-[1fr_auto] gap-3">
                    <Gcol className="h-full">
                      <ConTit>
                        <ConTitName>지침세부내용</ConTitName>
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          지침확인
                        </Button>
                      </ConTit>
                      <div className="ag-theme-alpine">
                        <AgGridReact<AgGridRow>
                          key={gridKey}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          getRowId={(params) => String(params.data.id)}
                          singleClickEdit={true}
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
                          domLayout="normal"
                        />
                      </div>
                    </Gcol>

                    <Gcol className="h-full">
                      <ConTit>
                        <ConTitName>조건부 특약 가입</ConTitName>
                        <Grow>
                          <Button variant={'outlined'} color={'gray'} size={'md'}>
                            상세
                          </Button>
                          <Button variant={'outlined'} color={'gray'} size={'md'}>
                            무담보이력
                          </Button>
                        </Grow>
                      </ConTit>

                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="w-[3rem] text-center">
                              <Checkbox size="md" disabled />
                            </TableCell>
                            <TableCell>특정 신체부위 질병 보장제한부 인수 특별약관</TableCell>
                          </TableRow>
                          <TableRow className="bg-[var(--color-gray-5)]">
                            <TableCell className="w-[3rem] text-center">
                              <Checkbox size="md" disabled checked />
                            </TableCell>
                            <TableCell>특정조건부(표준하체보험표할증) 특별약관</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Gcol>
                  </Grid>

                  {/* 심사결과안내 */}
                  <ChatResult
                    chatData={[
                      {
                        name: '심부산GA지점 박하늘별(6012345)',
                        title: '심사완료',
                        content: '고지보완 중 당뇨는 정상수치로 돌아와 이상없습니다',
                        date: '2024-06-28 14:30',
                        uw_name: 'UW심사팀 이한화(6020236)',
                        uw_title: '결제완료 / 특별인수조건부인수',
                        uw_content:
                          '고지유형:1형(일반고지형)<br /> ▶조건부인수<br /> ○부담보심사[갑상선 (11개월) 유방(유선 포함)(11개월)]<br /> ○표준하체(할증)',
                        uw_info: '계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다.',
                        uw_state: ['감역', '할증'],
                        uw_date: '2024-06-28 14:30',
                        uw_detail: '상세보기 경로주소',
                      },
                      {
                        name: '2심부산GA지점 박하늘별(6012345)',
                        title: '심사완료',
                        content: '고지보완 중 당뇨는 정상수치로 돌아와 이상없습니다',
                        date: '2024-06-28 14:30',
                        uw_name: 'UW심사팀 이한화(6020236)',
                        uw_title: '결제완료 / 특별인수조건부인수',
                        uw_content:
                          '고지유형:1형(일반고지형)<br /> ▶조건부인수<br /> ○부담보심사[갑상선 (11개월) 유방(유선 포함)(11개월)]<br /> ○표준하체(할증)',
                        uw_info: '계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다.',
                        uw_state: ['감역', '할증'],
                        uw_date: '2024-06-28 14:30',
                        uw_detail: '상세보기 경로주소',
                      },
                      {
                        name: '3심부산GA지점 박하늘별(6012345)',
                        title: '심사완료',
                        content: '고지보완 중 당뇨는 정상수치로 돌아와 이상없습니다',
                        date: '2024-06-28 14:30',
                        uw_name: 'UW심사팀 이한화(6020236)',
                        uw_title: '결제완료 / 특별인수조건부인수',
                        uw_content:
                          '고지유형:1형(일반고지형)<br /> ▶조건부인수<br /> ○부담보심사[갑상선 (11개월) 유방(유선 포함)(11개월)]<br /> ○표준하체(할증)',
                        uw_info: '계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다.',
                        uw_state: ['감역', '할증'],
                        uw_date: '2024-06-28 14:30',
                        uw_detail: '상세보기 경로주소',
                      },
                    ]}
                  />
                </Grid>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>

          <LayoutMainFoot>
            <MainBottom variant="box">
              <MainBottomItem>
                <Grow className="gap-1 relative">
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={'outlined'} color={'gray'} size={'xl'} only="icon">
                        <BtnPlusIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" align="end" className="max-w-[42.5rem]" closeButton={true}>
                      <Grid className="w-full grid-cols-[1fr] gap-1">
                        <Button variant={'outlined'} color={'gray'} size={'xl'}>
                          진단/적부이력
                        </Button>
                        <Button variant={'outlined'} color={'gray'} size={'xl'}>
                          외부심사결과지요청
                        </Button>
                        <Button variant={'outlined'} color={'gray'} size={'xl'}>
                          진단적부예외
                        </Button>
                      </Grid>
                    </PopoverContent>
                  </Popover>
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
      }
    />
  );
}
