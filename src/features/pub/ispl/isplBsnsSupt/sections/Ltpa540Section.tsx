/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// 2026-05-26 페이징 추가

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createModifiedCellClassRules,
  createTooltipValueGetter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Grid, Grow } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { FileExportIcon, FileImportIcon, ResetIcon } from '@icons';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: number;
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
    field02:
      '나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망)',
    field03: 'CLA23114',
    field04:
      '나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망)',
    field05: 1,
    field06: 'Y',
    field07: 'CLA23114',
    field08:
      '나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망) 나눔의행복(상해사망)',
    field09: 1,
    field10: 'Y',
  },
  {
    id: 2,
    field01: 'CLA23114',
    field02: '나눔의행복(상해사망)',
    field03: 'CLA23321',
    field04: '나눔의행복(상해사망)',
    field05: 2,
    field06: 'Y',
    field07: 'CLA23321',
    field08: '나눔의행복(상해사망)',
    field09: 220,
    field10: 'Y',
  },
  {
    id: 3,
    field01: 'CLA23114',
    field02: '나눔의행복(상해사망)',
    field03: 'CLA23114',
    field04: '나눔의행복(상해사망)',
    field05: 99,
    field06: '',
    field07: 'CLA23114',
    field08: '나눔의행복(상해사망)',
    field09: 1,
    field10: 'Y',
  },
  {
    id: 4,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: 'CLA01801',
    field04: '상해사망',
    field05: 1,
    field06: '',
    field07: 'CLA01801',
    field08: '상해사망',
    field09: 1,
    field10: 'Y',
  },
  {
    id: 5,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: 'CLA12642',
    field04: '상해사망(갱신형)',
    field05: 1,
    field06: '',
    field07: 'CLA12642',
    field08: '상해사망(갱신형)',
    field09: 1,
    field10: 'Y',
  },
  {
    id: 6,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: 'CLA33333',
    field04: '상해사망(간편)',
    field05: 1,
    field06: 'Y',
    field07: 'CLA33333',
    field08: '상해사망(간편)',
    field09: 3,
    field10: '',
  },
  {
    id: 7,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: 'CLA44444',
    field04: '상해사망(간편, 갱신형)',
    field05: 1,
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: 3,
    field10: '',
  },
  {
    id: 8,
    field01: 'CLA01801',
    field02: '상해사망',
    field03: '',
    field04: '',
    field05: 0,
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: 3,
    field10: '',
  },
  {
    id: 9,
    field01: 'CLA12642',
    field02: '상해사망(갱신형)',
    field03: '',
    field04: '',
    field05: 0,
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: 3,
    field10: '',
  },
  {
    id: 10,
    field01: 'CLA12642',
    field02: '상해사망(갱신형)',
    field03: '',
    field04: '',
    field05: 0,
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: 3,
    field10: '',
  },
  {
    id: 11,
    field01: 'CLA12642',
    field02: '상해사망(갱신형)',
    field03: '',
    field04: '',
    field05: 0,
    field06: '',
    field07: 'CLA44444',
    field08: '상해사망(간편, 갱신형)',
    field09: 3,
    field10: '',
  },
];

export default function Ltpa540Section() {
  // rowData를 최상단에 선언 → useMemo보다 먼저 초기화되어야 함
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  const EditCellColor = React.useMemo(
    () => createModifiedCellClassRules({ rows: rowData, idKey: 'id', valueKey: 'field09' }),
    [rowData]
  );
  const EditCellColor2 = React.useMemo(
    () => createModifiedCellClassRules({ rows: rowData, idKey: 'id', valueKey: 'field10' }),
    [rowData]
  );

  // 기존정보보기 체크 상태
  const [showExisting, setShowExisting] = React.useState(false);

  // 2026-06-01 width, flex 수정
  // 2026-06-04 flex, minWidth 수정
  // 직접 수정된 셀 추적: Set<"rowId:fieldName">
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = React.useMemo(
    () => [
      {
        headerName: '기준담보',
        flex: 4,
        children: [
          {
            headerName: '담보코드',
            field: 'field01',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            cellClass: 'text-center',
            autoHeight: true,
            spanRows: true,
          },
          {
            headerName: '담보명',
            field: 'field02',
            flex: 10,
            cellClass: 'text-left',
            autoHeight: true,
            spanRows: true,
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
          },
        ],
      },
      {
        headerName: '기존',
        flex: 4,
        minWidth: attributeColumnWidth(495),
        children: [
          {
            headerName: '담보코드',
            field: 'field03',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            hide: !showExisting,
            cellClass: 'text-center',
          },
          {
            headerName: '유사 담보명',
            field: 'field04',
            flex: 10,
            hide: !showExisting,
            cellClass: 'text-left',
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
          },
          {
            headerName: '순위',
            field: 'field05',
            flex: 1,
            minWidth: attributeColumnWidth(50),
            suppressSizeToFit: true,
            hide: !showExisting,
            cellClass: 'text-center',
          },
          {
            headerName: '예외',
            field: 'field06',
            flex: 1,
            minWidth: attributeColumnWidth(50),
            suppressSizeToFit: true,
            hide: !showExisting,
            cellClass: 'text-center',
          },
        ],
      },
      {
        headerName: '변경 후 (조회)',
        flex: 4,
        minWidth: attributeColumnWidth(495),
        children: [
          {
            headerName: '담보코드',
            field: 'field07',
            flex: 1,
            minWidth: attributeColumnWidth(80),
            cellClass: 'text-center',
          },
          {
            headerName: '유사 담보명',
            field: 'field08',
            flex: 10,
            cellClass: 'text-left',
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field08' }),
          },
          {
            // 순위 — 직접 수정했을 때만 색상
            headerName: '순위',
            field: 'field09',
            flex: 1,
            minWidth: attributeColumnWidth(50),
            cellClass: 'text-center',
            autoHeight: true,
            editable: true,
            cellClassRules: EditCellColor,
            cellStyle: (params) => {
              const original = rowData.find((r) => r.id === params.data?.id)?.field09;
              const isModified = String(params.value) !== String(original);
              return { backgroundColor: isModified ? '#CBE3FF' : '#EFF8FF' };
            },
          },
          {
            // 예외 — 직접 수정했을 때만 색상
            headerName: '예외',
            field: 'field10',
            flex: 1,
            minWidth: attributeColumnWidth(50),
            cellClass: 'text-center',
            autoHeight: true,
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['Y', 'N'] },
            cellClassRules: EditCellColor2,
            cellStyle: (params) => {
              const original = rowData.find((r) => r.id === params.data?.id)?.field10;
              const isModified = String(params.value) !== String(original);
              return { backgroundColor: isModified ? '#CBE3FF' : '#EFF8FF' };
            },
          },
        ],
      },
    ],
    [showExisting, EditCellColor, EditCellColor2, rowData, attributeColumnWidth]
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
          <Grid className="grid-rows-[auto_1fr] w-full h-full" gap={3}>
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
                    <RadioGroup className="gap-3 ml-1" onValueChange={() => {}} width="full" defaultValue={'예'}>
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
                <Checkbox checked={showExisting} onCheckedChange={(checked) => setShowExisting(checked === true)}>
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
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData}
                    columnDefs={columnDefs}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
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
              <Grow gap={1} placement={'ec'} className="w-full">
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
