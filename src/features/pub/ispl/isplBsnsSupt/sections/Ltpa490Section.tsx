/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createFieldRenderer, useAgGridInfiniteAppend } from '@aggrid';
import { Grid, Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

import { TableMore } from '@common/TablePagination';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';
import { useFormFields } from '@/shared/hooks/useFormFields';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
  field11: string | number;
  field12: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 2,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 3,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 4,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 5,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 6,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 7,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 8,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 9,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 10,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 11,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
  {
    id: 12,
    field01: 'LA260102288811-1',
    field02: '홍길동',
    field03: '홍일홍2',
    field04: '청약중',
    field05: '상품지원파트',
    field06: '김한화',
    field07: '김한화',
    field08: 'YYYY-MM-DD ~ YYYY-MM-DD',
    field09: '미대상',
    field10: '미초과',
    field11: '미파기',
    field12: '130211',
  },
];

export default function Ltpa490Section() {
  const pageSize = 5;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });
  const visibleRows = React.useMemo(() => DummyData.slice(0, loadedCount), [loadedCount]);

  const ExceedPeriodHeader = () => (
    <span className="w-full flex flex-col items-center">
      유효기간
      <br />
      초과여부
    </span>
  );

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '설계번호',
      field: 'field01',
      flex: 1,
      cellClass: 'text-center',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (!params.value) return null;
        return (
          <Button color="link" onClick={() => {}} variant="text">
            {params.value}
          </Button>
        );
      },
    },
    {
      headerName: '계명자명',
      flex: 1,
      cellClass: 'text-center',
      autoHeight: true,
      children: [
        {
          headerName: '피보험자명',
          flex: 1,
          cellClass: 'text-center px-0!',
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType>('field02', 'field03'),
        },
      ],
    },
    {
      headerName: '설계상태',
      field: 'field04',
      flex: 1,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '취급지점',
      flex: 1,
      cellClass: 'text-center',
      children: [
        {
          headerName: '취급자',
          field: 'field06',
          flex: 1,
          autoHeight: true,
          cellClass: 'text-center px-0!',
          cellRenderer: createFieldRenderer<DummyDataType>('field05', 'field06'),
        },
      ],
    },
    {
      headerName: '설계자',
      field: 'field07',
      flex: 1,
      autoHeight: true,
      cellClass: 'text-center',
    },
    {
      headerName: '설계시작~유효일자',
      field: 'field08',
      flex: 1.4,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '고액여부',
      field: 'field09',
      flex: 1,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '유효기간초과여부',
      headerComponent: ExceedPeriodHeader,
      field: 'field10',
      flex: 1,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '파기여부',
      field: 'field11',
      flex: 1,
      cellClass: 'editable-cell text-center',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '파기', '미파기', '미입력'] },
      autoHeight: true,
    },
    {
      headerName: '미파기 사유',
      field: 'field12',
      flex: 2,
      cellClass: 'text-center',
      editable: true,
      autoHeight: true,
    },
  ];

  // form event
  const [form, setFormField] = useFormFields({
    type01: 'selection1',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
  });

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '미사용청약서 관리',
            pageId: 'LTPA490',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr_auto]" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                caption="미사용청약서 관리 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'조회구분'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={108}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: '', label: '선택' },
                        { value: 'selection1', id: 'type01-1', label: '취급기관' },
                        { value: 'selection2', id: 'type01-2', label: '취급직원' },
                        { value: 'selection3', id: 'type01-3', label: '사용인' },
                        { value: 'selection4', id: 'type01-4', label: '증권번호' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    {form.type01 === 'selection4' ? (
                      <Input aria-label="" width={110} value={''} />
                    ) : (
                      <>
                        <Input aria-label="" width={90} value={''} />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={120} value={'김한화'} readOnly />
                      </>
                    )}
                  </FormCell>
                  <FormCell title={'설계상태'}>
                    <NativeSelect
                      aria-label="조직구분 선택"
                      width={108}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: '', label: '선택' },
                        { value: 'selection', id: 'type02-1', label: '선택' },
                        { value: 'selection', id: 'type02-2', label: '설계완료' },
                        { value: 'selection2', id: 'type02-3', label: '심사완료' },
                        { value: 'selection2', id: 'type02-4', label: '청약중' },
                        { value: 'selection2', id: 'type02-5', label: '청약완료' },
                        { value: 'selection2', id: 'type02-6', label: '청약삭제' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'설계시작월'}>
                    <DatePickerInput mode="single" onChange={() => {}} size="lg" value="" />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'파기여부'}>
                    <NativeSelect
                      aria-label="파기여부"
                      width={108}
                      value={form.type03}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: '', label: '선택' },
                        { value: 'selection1', id: 'type03-1', label: '파기' },
                        { value: 'selection2', id: 'type03-2', label: '미파기' },
                        { value: 'selection3', id: 'type03-3', label: '미입력' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'유효기간초과여부'}>
                    <NativeSelect
                      aria-label="유효기간초과여부"
                      width={108}
                      value={form.type04}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: '', label: '선택' },
                        { value: 'selection1', id: 'type04-1', label: '초과' },
                        { value: 'selection2', id: 'type04-2', label: '미초과' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'고액여부'}>
                    <NativeSelect
                      aria-label="고액여부"
                      width={108}
                      value={form.type05}
                      onChange={(e) => setFormField('type05', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: '', label: '선택' },
                        { value: 'selection1', id: 'type05-1', label: '대상' },
                        { value: 'selection2', id: 'type05-2', label: '미대상' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
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
            <TableFold className="grid-rows-[auto_1fr_auto]">
              <TableFoldHead title="대상리스트"></TableFoldHead>
              <TableFoldBody>
                <Gcol className="w-full" gap={1}>
                  <div className="ag-theme-alpine min-h-150">
                    <AgGridReact<DummyDataType>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={visibleRows}
                      columnDefs={columnDefs}
                      singleClickEdit={true}
                      domLayout="normal"
                      rowHeight={60}
                    />
                  </div>
                  <TableMore
                    isAll={false}
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
                  />
                </Gcol>
              </TableFoldBody>
            </TableFold>
            <BulletList position="col">
              <BulletListItem type="dot">
                해당 화면은 청약서가 발행된 이력이 있는 신계약 설계번호를 호출하고 있음 (단, TM/CM/전자서명/전자청약으로
                진행된 설계는 제외)
              </BulletListItem>
              <BulletListItem type="dot">
                고액여부판단은 월납기준 100만원 초과시 고액여부 대상건으로 판단
              </BulletListItem>
              <BulletListItem type="dot">
                파기여부 항목에 &apos;미파기&apos;로 선택 시 미파기사유 항목에 해당 사유를 기재하고 저장할 수 있음
              </BulletListItem>
            </BulletList>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  저장
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
