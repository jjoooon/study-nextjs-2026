/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createModifiedCellClassRules } from '@aggrid';
import { Grid, Grow } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { PageID } from '@features/PageID';
import { ResetIcon, FileExportIcon, FileImportIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { createTooltipValueGetter } from '@aggrid';
import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';

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
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'CLA23114',
    field02: '나눔의행복(상해사망)',
    field03: 'CLA23114',
    field04: '나눔의행복(상해사망)',
    field05: '1',
    field06: 'Y',
    field07: 'CLA23114',
    field08: '나눔의행복(상해사망)',
    field09: '1',
    field10: 'Y',
  },
  {
    id: 2,
    field01: 'CLA23114',
    field02: '나눔의행복(상해사망)',
    field03: 'CLA23321',
    field04: '나눔의행복(상해사망)',
    field05: '2',
    field06: 'Y',
    field07: 'CLA23321',
    field08: '나눔의행복(상해사망)',
    field09: '98',
    field10: 'Y',
  },
  {
    id: 3,
    field01: 'CLA23114',
    field02: '나눔의행복(상해사망)',
    field03: 'CLA23114',
    field04: '나눔의행복(상해사망)',
    field05: '99',
    field06: '',
    field07: 'CLA23114',
    field08: '나눔의행복(상해사망)',
    field09: '1',
    field10: 'Y',
  },
  {
    id: 4,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: 'CLA01801',
    field04: '상해사망',
    field05: '1',
    field06: '',
    field07: 'CLA01801',
    field08: '상해사망',
    field09: '1',
    field10: 'Y',
  },
  {
    id: 5,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: 'CLA12642',
    field04: '상해사망(갱신형)',
    field05: '1',
    field06: '',
    field07: 'CLA12642',
    field08: '상해사망(갱신형)',
    field09: '1',
    field10: 'Y',
  },
  {
    id: 6,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: 'CLA33333',
    field04: '상해사망(간편)',
    field05: '1',
    field06: 'Y',
    field07: 'CLA33333',
    field08: '상해사망(간편)',
    field09: '3',
    field10: '',
  },
  {
    id: 7,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: 'CLA44444',
    field04: '상해사망(간편, 갱신형)',
    field05: '1',
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: '3',
    field10: '',
  },
  {
    id: 8,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: '3',
    field10: '',
  },
  {
    id: 9,
    field01: 'CLA12642',
    field02: '상해사망(갱신형)',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: '3',
    field10: '',
  },
  {
    id: 10,
    field01: 'CLA12642',
    field02: '상해사망(갱신형)',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: '3',
    field10: '',
  },
  {
    id: 11,
    field01: 'CLA12642',
    field02: '상해사망(갱신형)',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: '3',
    field10: '',
  },
];

export default function Ltpa540Section() {
  // rowData를 최상단에 선언 → useMemo보다 먼저 초기화되어야 함
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  const EditCellColor = React.useMemo(
    () => createModifiedCellClassRules({ rows: rowData, idKey: 'id', valueKey: 'field09' }),
    [rowData],
  );
  const EditCellColor2 = React.useMemo(
    () => createModifiedCellClassRules({ rows: rowData, idKey: 'id', valueKey: 'field10' }),
    [rowData],
  );

  // 기존정보보기 체크 상태
  const [showExisting, setShowExisting] = React.useState(false);

  // 직접 수정된 셀 추적: Set<"rowId:fieldName">
  const [modifiedCells, setModifiedCells] = React.useState<Set<string>>(new Set());

  const markModified = (id: number, field: string) => {
    setModifiedCells((prev) => new Set(prev).add(`${id}:${field}`));
  };

  // AgGrid Column — showExisting / modifiedCells 변경 시 재생성
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = React.useMemo(
    () => [
      {
        headerName: '기준담보',
        children: [
          {
            headerName: '담보코드',
            field: 'field01',
            width: 100,
            cellClass: 'flex! items-center! justify-center!',
            spanRows: true,
          },
          {
            headerName: '담보명',
            field: 'field02',
            flex: 1,
            cellClass: 'flex! items-center! justify-left!',
            spanRows: true,
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
          },
        ],
      },
      {
        headerName: '기존',
        children: [
          {
            headerName: '담보코드',
            field: 'field03',
            width: 100,
            hide: !showExisting,
            cellClass: 'text-center',
          },
          {
            headerName: '유사 담보명',
            field: 'field04',
            flex: 1,
            hide: !showExisting,
            cellClass: 'text-left',
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
          },
          {
            headerName: '순위',
            field: 'field05',
            width: 80,
            hide: !showExisting,
            cellClass: 'text-center',
          },
          {
            headerName: '예외',
            field: 'field06',
            width: 80,
            hide: !showExisting,
            cellClass: 'text-center',
          },
        ],
      },
      {
        headerName: '변경 후 (조회)',
        children: [
          {
            headerName: '담보코드',
            field: 'field07',
            width: 100,
            cellClass: 'text-center',
          },
          {
            headerName: '유사 담보명',
            field: 'field08',
            flex: 1,
            cellClass: 'text-left',
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field08' }),
          },
          {
            // 순위 — 직접 수정했을 때만 색상
            headerName: '순위',
            field: 'field09',
            width: 80,
            cellClass: 'text-right flex [&>div>span]:h-auto! editable-cell',
            autoHeight: true,
            editable: true,
            cellClassRules: EditCellColor,
            cellRenderer: (params: import('ag-grid-enterprise').ICellRendererParams<DummyDataType>) => (
              <Input
                defaultValue={String(params.value ?? '')}
                onChange={(e) => params.node.setDataValue('field09', e.target.value)}
                style={{ textAlign: 'right' }}
              />
            ),

            valueParser: (params) => Number(params.newValue) || 0,
          },
          {
            // 예외 — 직접 수정했을 때만 색상
            headerName: '예외',
            field: 'field10',
            width: 80,
            cellClass: 'text-center [&>div>span]:h-auto! editable-cell',
            autoHeight: true,
            cellClassRules: EditCellColor2,
            cellRenderer: (params: import('ag-grid-enterprise').ICellRendererParams<DummyDataType>) => {
              const id = params.data?.id as number;
              return (
                <NativeSelect
                  defaultValue={String(params.value ?? 'Y')}
                  onChange={(e) => {
                    params.node.setDataValue('field10', (e.target as HTMLSelectElement).value);
                    markModified(id, 'field10');
                  }}
                >
                  <NativeSelectOption value="Y">Y</NativeSelectOption>
                  <NativeSelectOption value="N">N</NativeSelectOption>
                </NativeSelect>
              );
            },
          },
        ],
      },
    ],
    [showExisting, modifiedCells, EditCellColor, EditCellColor2],
  );

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '유사담보관리',
            pageId: 'LTPA540',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_auto_auto_1fr_auto]" gap={3}>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'} caption="유사담보관리 조회 테이블" cols={['w-[8rem]', 'w-auto']}>
                <FormRow>
                  <FormCell title={'조회구분'}>
                    <NativeSelect aria-label="고객유형 선택" width={200} readOnly={false} required={false}>
                      <NativeSelectOption value="">전체</NativeSelectOption>
                      <NativeSelectOption value="기준담보코드">기준담보코드</NativeSelectOption>
                      <NativeSelectOption value="기준담보명">기준담보명</NativeSelectOption>
                      <NativeSelectOption value="유사담보코드">유사담보코드</NativeSelectOption>
                      <NativeSelectOption value="유사담보명">유사담보명</NativeSelectOption>
                    </NativeSelect>
                    <Input width={220} value={''} />
                    <RadioGroup
                      className="gap-3 ml-1"
                      onValueChange={() => {}}
                      width="full"
                      defaultValue={'예'}
                    >
                      {[
                        { value: '예외', label: '예외' },
                        { value: '변경항목', label: '변경항목' },
                      ].map((item) => (
                        <RadioGroupItem key={item.value} value={item.value}>
                          {item.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Checkbox
                  checked={showExisting}
                  onCheckedChange={(checked) => setShowExisting(checked === true)}
                >
                  <span className="whitespace-nowrap mr-4">기존정보보기</span>
                </Checkbox>
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
            <TableFold variant={'default'}>
              <TableFoldHead title="">
                <Grow>
                  <Button variant={'outlined'} color={'success'}>
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                  <Button variant={'outlined'} color={'success'}>
                    엑셀가져오기
                    <FileImportIcon />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody className="gap-2">
                <div className="ag-theme-alpine min-h-200">
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData}
                    columnDefs={columnDefs}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    selectionColumnDef={{
                      cellClass: 'text-center',
                    }}
                    enableCellSpan={true}
                    singleClickEdit={true}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1}>
                <Button type="submit" variant={'contained'} color={'primary'} size={'xl'}>
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