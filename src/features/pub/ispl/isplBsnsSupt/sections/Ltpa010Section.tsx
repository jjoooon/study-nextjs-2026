/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import {
  AgGridEmptyComponent,
  createTooltipValueGetter,
  createCellValueChangedHandler,
  createFieldRenderer,
  useAgGridInfiniteAppend,
} from '@aggrid';
import { Grow, Gcol, Typo, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon, FileExportIcon, PenIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type Ltpa010DummyDataRow = {
  id: number;
  isCheck: boolean;
  isState: boolean; // 판매중지 상품 true
  field01: string | number;
  field02: string | number;
  field03: string | number;
  memo: boolean;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
  field11: string | number;
  field12: string | number;
  field13: string | number;
  field14: string | number;
  field15: string | number;
  field16: string | number;
  field17: string | number;
  field18: string | number;
  field19: string | number;
  nickname?: string;
};
const Ltpa010DummyData: Ltpa010DummyDataRow[] = [
  {
    id: 1,
    isCheck: true,
    isState: false,
    field01: 'LA2131234123',
    field02: '한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601 한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값 고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화김한화김한화',
    field06: '2009-01-01',
    field07: '9,999,999',
    field08: '2.1',
    field09: '설계중',
    field10: '설계중',
    field11: '',
    field12: '신부산GA지점/00팀00팀00팀00팀00팀',
    field13: '인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화14',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '최고설계메니져뚜루루',
  },
  {
    id: 2,
    isCheck: false,
    isState: false,
    field01: 'LA2131234123',
    field02: '한화실손의료보험(갱신형)2601',
    field03: '고지유형/플랜명/차량번호 값',
    memo: true,
    field05: '김한화',
    field06: '2009-01-01',
    field07: '9,999,999',
    field08: '2.1',
    field09: '설계중',
    field10: '설계중',
    field11: '',
    field12: '신부산GA지점/00팀',
    field13: '인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화(123123)',
    field16: '박한화15',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',
  },
  {
    id: 3,
    isCheck: true,
    isState: true,
    field01: 'LA2131234123',
    field02: '한화실손의료보헌갱신형2601',
    field03: '',
    memo: false,
    field05: '김한화',
    field06: '2009-01-01',
    field07: '9,999,999',
    field08: '2.1',
    field09: '설계중',
    field10: '설계중',
    field11: '',
    field12: '신부산GA지점/00팀',
    field13: '인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화(123123)',
    field16: '',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: '',
  },
  {
    id: 4,
    isCheck: true,
    isState: false,
    field01: 'LA2131234123',
    field02: '한화실손의료보헌갱신형2601',
    field03: '고지유형/플랜명/차량번호 값',
    memo: false,
    field05: '김한화',
    field06: '2009-01-01',
    field07: '9,999,999',
    field08: '2.1',
    field09: '설계중',
    field10: '설계중',
    field11: '',
    field12: '신부산GA지점/00팀',
    field13: '인카금융-다이렉트',
    field14: '박한화(123123)',
    field15: '박한화(123123)',
    field16: '',
    field17: '박한화(123123)',
    field18: '배서설계',
    field19: 'LA20143129023123912',
    nickname: 'AI설계메니져뚜루루',
  },
];

export default function Ltpa010Section() {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type07: '',
    type08: '',
    type09: '',
  });

  // AgGrid Column
  const columnDefs: (ColDef<Ltpa010DummyDataRow> | ColGroupDef<Ltpa010DummyDataRow>)[] = [
    // M5. 수정
    {
      headerName: '설계번호',
      flex: 1,
      cellClass: 'text-center px-0!',
      field: 'field01',
      autoHeight: true,
      cellRenderer: (params: { data?: Ltpa010DummyDataRow }) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field01}
        </Button>
      ),
    },
    // M5. 수정
    {
      headerName: '상품명/구분',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      children: [
        {
          flex: 2,
          headerName: '고지유형/플랜명',
          cellClass: 'text-left px-0! text-[1.3rem]',
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>('field02', (data?: Ltpa010DummyDataRow) => {
            const hasTooltip = data?.memo;
            const hasMemoButton = !data?.memo || hasTooltip;

            if (!hasMemoButton) {
              return null;
            }

            const memoButton = (
              <Button
                color={hasTooltip ? 'primary' : 'gray-light'}
                onClick={() => {
                  alert('메모장');
                }}
                only={data?.nickname && hasTooltip ? 'default' : 'icon'}
                size={'sm'}
                variant={'outlined'}
              >
                {hasTooltip ? (
                  data?.nickname ? (
                    <span>{data.nickname.slice(0, 5)}</span>
                  ) : (
                    <PenIcon size={14} color={'var(--color-primary-50)'} />
                  )
                ) : (
                  <PenIcon size={14} color={'var(--color-gray-30)'} />
                )}
              </Button>
            );

            return (
              <Grow placement="bwc" className="h-full ">
                <div className="truncate-no">{data?.field03}</div>

                {data?.nickname ? (
                  <Tooltip>
                    <TooltipTrigger asChild>{memoButton}</TooltipTrigger>
                    <TooltipContent align="center" side="bottom" sideOffset={0} variant="default">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.nickname,
                        }}
                      />
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  memoButton
                )}
              </Grow>
            );
          }),
        },
      ],
    },

    {
      headerName: '계약자',
      cellClass: 'text-center px-0! text-[1.3rem] ',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      autoHeight: true,
      children: [
        {
          headerName: '생년월일',
          width: 80,
          cellClass: 'text-center px-0! ',
          autoHeight: true,
          tooltipValueGetter: createTooltipValueGetter<Ltpa010DummyDataRow>({
            field: 'field05',
          }),
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>('field05', 'field06'),
        },
      ],
    },

    {
      headerName: '피보험자',
      cellClass: 'text-center px-0! text-[1.3rem]',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      autoHeight: true,
      children: [
        {
          headerName: '생년월일',
          width: 90,
          cellClass: 'text-center px-0!',
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>('field05', 'field06'),
        },
      ],
    },
    // M5. 수정
    {
      headerName: '보험료(원)',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      autoHeight: true,
      children: [
        {
          headerName: '환급률',
          cellClass: 'text-center px-0! text-[1.3rem]',
          width: 100,
          autoHeight: true,
          cellRenderer: (params: { data?: Ltpa010DummyDataRow }) => (
            <Grid className="w-full grid-rows-[1fr_1fr] divide-y divide-gray-200" gap={0}>
              <div className="h-[3rem] w-full leading-[3rem] truncate-no px-1">{params.data?.field07}</div>
              <div className="h-[3rem] w-full leading-[3rem] truncate-no px-1">{params.data?.field08}%</div>
            </Grid>
          ),
        },
      ],
    },
    {
      headerName: '설계일자',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      autoHeight: true,
      children: [
        {
          headerName: '유효기간',
          cellClass: 'text-center px-0! text-[1.3rem]',
          width: 90,
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>(
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              2026-01-01
            </Button>,
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              2026-01-01
            </Button>
          ),
        },
      ],
    },
    {
      headerName: '설계상태',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      children: [
        {
          headerName: '심사결과',
          cellClass: 'text-center px-0! text-[1.3rem]',
          width: 90,
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>('field09', 'field10'),
        },
      ],
    },
    {
      headerName: '청약서출력',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      children: [
        {
          headerName: '스캔여부',
          cellClass: 'text-center px-0! text-[1.3rem]',
          width: 100,
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>(
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              미출력
            </Button>,
            'field11'
          ),
        },
      ],
    },
    {
      headerName: '취급기관/팀',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      children: [
        {
          headerName: '취급자',
          cellClass: 'text-center px-0! text-[1.3rem] ',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>('field12', 'field13'),
        },
      ],
    },
    {
      headerName: '최초설계자',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      children: [
        {
          headerName: 'SM',
          cellClass: 'text-center px-0! text-[1.3rem]',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>('field14', (data?: Ltpa010DummyDataRow) => (
            <Grow gap={0.5}>
              <span>{data?.field15 ?? ''}</span>

              <Button
                color="gray-light"
                onClick={() => {}}
                only="default"
                size="sm"
                variant="outlined"
                className="w-[2.2rem] h-[2.2rem] min-w-[2.2rem] p-0"
              >
                <Typo color="primary" tag="span" variant="body-xs" weight="bold">
                  I
                </Typo>
              </Button>
              <Button color="gray-light" onClick={() => {}} only="default" size="sm" variant="outlined">
                <Typo color="primary" tag="span" variant="body-xs" weight="bold">
                  D
                </Typo>
              </Button>
            </Grow>
          )),
        },
      ],
    },
    {
      headerName: '사용인',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      children: [
        {
          headerName: '부실유의',
          cellClass: 'text-center px-0! text-[1.3rem]',
          width: 80,
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>('field16', 'field17'),
        },
      ],
    },
    {
      headerName: '설계종료',
      headerClass: 'ag-header-right-divider text-[1.3rem]',
      children: [
        {
          headerName: '증권번호',
          cellClass: 'text-center px-0! text-[1.3rem]',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<Ltpa010DummyDataRow>('field18', (data?: Ltpa010DummyDataRow) => (
            <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
              {data?.field19}
            </Button>
          )),
        },
      ],
    },
  ];

  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<Ltpa010DummyDataRow[]>(Ltpa010DummyData);
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<Ltpa010DummyDataRow, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  const pageSize = 2;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: Ltpa010DummyData,
    pageSize,
  });
  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '통합가입설계조회',
            pageId: 'LTPA010',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr_auto] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              {/* 2026-05-22 설계구분 삭제 및 간격 조정, select value값 수정 */}
              {/* M1. variant={'none'} */}

              <FormTable
                variant={'none'}
                lineTop={false}
                caption="설계번호"
                cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'조회구분'}>
                    <NativeSelect
                      aria-label="조회구분 선택"
                      width={140}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      required
                    >
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '피보험자 번호' },
                        { value: 'selection3', label: '계약자 번호' },
                        { value: 'selection4', label: '설계번호' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    {form.type01 === 'selection' || form.type01 === 'selection2' ? (
                      <Grow className="w-full" placement="ss">
                        <Input aria-label="이름" value={'김현화'} width={100} required />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </Grow>
                    ) : (
                      <Input aria-label="번호" width={150} value={'1234556556'} readOnly />
                    )}
                  </FormCell>
                  <FormCell title={'설계상태'}>
                    <NativeSelect
                      aria-label="설계상태 선택"
                      width={150}
                      value={form.type04}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '전체' },
                        { value: 'selection2', label: '간편설계' },
                        { value: 'selection3', label: '설계심사중' },
                        { value: 'selection4', label: '설계완료' },
                        { value: 'selection5', label: '심사의뢰' },
                        { value: 'selection6', label: '심사중' },
                        { value: 'selection7', label: '심사완료' },
                        { value: 'selection8', label: '청약중' },
                        { value: 'selection9', label: '청약완료' },
                        { value: 'selection10', label: '수납완료' },
                        { value: 'selection11', label: '구독심사중' },
                        { value: 'selection12', label: '구독심사완료' },
                        { value: 'selection13', label: '청약삭제' },
                        { value: 'selection14', label: '보험료산출' },
                        { value: 'selection15', label: '설계취소' },
                        { value: 'selection16', label: '지로' },
                        { value: 'selection17', label: '반려' },
                        { value: 'selection18', label: '취소' },
                        { value: 'selection19', label: '가설계' },
                        { value: 'selection20', label: '1차보험료산출' },
                        { value: 'selection21', label: '업셀링설계' },
                        { value: 'selection22', label: '검증' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'설계경로'}>
                    <NativeSelect
                      aria-label="설계경로 선택"
                      width={150}
                      value={form.type05}
                      onChange={(e) => setFormField('type05', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '전체' },
                        { value: 'selection2', label: '문서서명' },
                        { value: 'selection3', label: '전자서명(태블릿)' },
                        { value: 'selection4', label: '전자서명(휴대폰)' },
                        { value: 'selection5', label: '전자청약' },
                        { value: 'selection6', label: 'TM' },
                        { value: 'selection7', label: 'CM' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'설계조직'}>
                    <NativeSelect
                      aria-label="설계조직 선택"
                      value={form.type07}
                      width={140}
                      required
                      onChange={(e) => setFormField('type07', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '취급기관' },
                        { value: 'selection2', label: '취급직원' },
                        { value: 'selection3', label: '사용인' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input aria-label="" width={150} value={'1301097'} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={150} value={'신부산GA지점'} readOnly />
                  </FormCell>
                  <FormCell title={'영업가족'}>
                    <NativeSelect
                      aria-label="영업가족 선택"
                      value={form.type08}
                      width={150}
                      onChange={(e) => setFormField('type08', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '전체' },
                        { value: 'selection2', label: '교차' },
                        { value: 'selection3', label: 'BP' },
                        { value: 'selection4', label: '교차+BP' },
                        { value: 'selection5', label: '그 외' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'설계일자'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{
                        from: '2026-03-01',
                        to: '2026-03-07',
                      }}
                      size="lg"
                      width="sm"
                    />
                    <NativeSelect
                      aria-label="설계일자"
                      value={form.type09}
                      width={150}
                      onChange={(e) => setFormField('type09', e.target.value)}
                    >
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '7일' },
                        { value: 'selection3', label: '1개월' },
                        { value: 'selection4', label: '2개월' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                  조회
                </Button>
                <Button
                  color={'gray'}
                  only={'icon'}
                  size={'lg'}
                  variant={'outlined'}
                  onClick={() => {}}
                  aria-label="새로고침"
                >
                  <ResetIcon />
                </Button>
              </Grow>
            </Grow>
            <Grid className="grid-rows-[auto_1fr_auto]" gap={1}>
              <Grow className="w-full" placement="ec">
                <Button color="success" variant="outlined">
                  엑셀내보내기
                  <FileExportIcon />
                </Button>
              </Grow>
              <Gcol gap={1}>
                <div className="ag-theme-alpine ltpa010-grid">
                  <AgGridReact<Ltpa010DummyDataRow>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowClassRules={{
                      'ag-row-state-true': (params) => params.data?.isState === true,
                    }}
                    rowData={rowData.slice(0, loadedCount)}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    // 에디터 시
                    singleClickEdit={true}
                    onCellValueChanged={onCellValueChanged}
                    // 체크박스 시
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: true,
                      headerCheckbox: false, // M5.추가
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      cellClass: 'editable-cell p-0!', // M5.추가
                      width: 30, // M5.추가
                    }}
                    onGridReady={(params) => {
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) {
                          node.setSelected(true);
                        }
                      });
                    }}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    cacheBlockSize={pageSize}
                    maxBlocksInCache={2}
                    datasource={dataSource}
                  />
                </div>
                <TableMore
                  loadedCount={loadedCount}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onLoadAll={handleLoadAll}
                  onLoadNext={handleLoadNext}
                />
                {/* Grid2: SM → 최초설계자 */}
                {/* <div className="ag-theme-alpine ltpa010-grid">
                  <AgGridReact<Ltpa010DummyDataRow>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowClassRules={{
                      'ag-row-state-true': (params) => params.data?.isState === true,
                    }}
                    rowData={rowData}
                    columnDefs={columnDefs2}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    singleClickEdit={true}
                    onCellValueChanged={onCellValueChanged}
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{ headerName: '선택' }}
                    onGridReady={(params) => {
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) node.setSelected(true);
                      });
                    }}
                    domLayout="autoHeight"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div> */}

                {/* Grid3: 최초설계자/사용인/부실유의 제거 */}
                {/* <div className="ag-theme-alpine ltpa010-grid">
                  <AgGridReact<Ltpa010DummyDataRow>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowClassRules={{
                      'ag-row-state-true': (params) => params.data?.isState === true,
                    }}
                    rowData={rowData}
                    columnDefs={columnDefs3}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    singleClickEdit={true}
                    onCellValueChanged={onCellValueChanged}
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{ headerName: '선택' }}
                    onGridReady={(params) => {
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) node.setSelected(true);
                      });
                    }}
                    domLayout="autoHeight"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div> */}
              </Gcol>
            </Grid>
            <Gcol variant="box-info" placement="ss">
              <Typo variant="body-sm" color="primary" icon="info">
                <b>설계조회 가능기간</b> 취급기간(7일), 법인대리점(30일), FC/사용인/개인대리점 등(60일)
              </Typo>
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  삭제설계 확인
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  출력물
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  완수수납
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  설계비교
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  알림톡발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  셀프고지
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  증권발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  계약자발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  이미지조회
                </Button>
              </Grow>
              <Grow gap={1}>
                {/*2026-05-22 버튼 스타일 변경 */}
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  설계예외처리
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  저장
                </Button>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  설계삭제
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
