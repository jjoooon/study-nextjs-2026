/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Grid, Grow, Typo } from '@atoms';
import { SearchIcon, ResetIcon } from '@icons';
import { useAgGridInfiniteAppend, useDynamicColumnWidths, createTooltipValueGetter } from '@aggrid';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { useFormFields } from '@hooks/useFormFields';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isCheck: boolean;
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
const Ltpa330DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: true,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명문서종류명문서종류명문서종류명 문서종류명문서종류명문서종류명문서종류명문서종류명문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 3,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 4,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 5,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 6,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 7,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 8,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 9,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 10,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 11,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 12,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 13,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 14,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 15,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 16,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 17,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 18,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 19,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 20,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 21,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 22,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 23,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 24,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 25,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 26,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 27,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 28,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 29,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
  {
    id: 30,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: '문서종류명',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2026-05-01',
    field07: '2026-05-01',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: '2026-05-01 00:00:00',
  },
];

export default function Ltpa330Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '고객정보',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(110),
      },
      {
        headerName: '문서종류코드',
        field: 'field02',
        flex: 1,
        minWidth: attributeColumnWidth(110),
      },
      {
        headerName: '문서종류명',
        field: 'field03',
        cellClass: 'text-left',
        flex: 10,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
      },
      {
        headerName: '전자문서ID',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(110),
      },
      {
        headerName: '문서묶음ID',
        field: 'field05',
        flex: 1,
        minWidth: attributeColumnWidth(110),
      },
      {
        headerName: '문서발급일자',
        field: 'field06',
        flex: 1,
        minWidth: attributeColumnWidth(90),
      },
      {
        headerName: '전문일자',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(90),
      },
      {
        headerName: '설계상태',
        field: 'field08',
        flex: 1,
        minWidth: attributeColumnWidth(110),
      },
      {
        headerName: '이미지',
        field: 'field09',
        flex: 1,
        minWidth: attributeColumnWidth(110),
      },
      {
        headerName: '이미지저장시간',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(170),
      },
    ],
    [attributeColumnWidth]
  );
  const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
  const pageSize = 10;
  const {
    loadedCount,
    totalCount,
    handleLoadAll: handleLoadAllDefault,
    handleLoadNext: handleLoadNextDefault,
    handleLoadReset: handleLoadResetDefault,
  } = useAgGridInfiniteAppend({
    allRows: Ltpa330DummyData,
    pageSize,
  });

  const handleLoadNext = React.useCallback(() => {
    handleLoadNextDefault();
  }, [handleLoadNextDefault]);

  const handleLoadAll = React.useCallback(() => {
    handleLoadAllDefault();
  }, [handleLoadAllDefault]);

  const handleLoadReset = React.useCallback(() => {
    handleLoadResetDefault();
  }, [handleLoadResetDefault]);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '전자증명서(정부24) 등록 현황',
            pageId: 'LTPA330',
          }}
        />
      </LayoutHead>

      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr] gap-4 h-full">
            <Grow className="w-full items-center" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable variant={'head'} lineTop={false} caption="전자증명서(정부24) 등록 현황 조회">
                <FormRow>
                  <FormCell title={'조회구분'}>
                    <NativeSelect
                      aria-label="조회구분 선택"
                      value={form.type01}
                      width={100}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type01-1', label: '계약자' },
                        { value: 'selection2', id: 'type01-2', label: '피보험자' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input
                      width={100}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      readOnly
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="조직구분명 입력" width={114} value={'000000-0000000'} readOnly />
                  </FormCell>
                  <FormCell title={'문서발급일자'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{ from: '2026-01-30', to: '2026-04-30' }}
                      size="lg"
                      required
                    />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Checkbox>
                  <span className="whitespace-nowrap mr-4">정부24시 실시간 조회</span>
                </Checkbox>
                <Button id="btnRA" color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
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

            <Grid className="grid-rows-[1fr_auto] gap-2">
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  ref={gridRef}
                  getRowId={(params) => String(params.data.id)}
                  columnDefs={columnDefs}
                  rowData={Ltpa330DummyData.slice(0, loadedCount)}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    editable: false,
                    cellClass: 'text-center',
                  }}
                  onGridReady={(params) => {
                    params.api.forEachNode((node) => {
                      if (node.data?.isCheck) {
                        node.setSelected(true);
                      }
                    });
                  }}
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: true,
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    width: 30,
                    cellClass: 'text-center editable-cell',
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
              <TableMore
                gridRef={gridRef}
                loadedCount={loadedCount}
                totalCount={totalCount}
                pageSize={pageSize}
                onLoadAll={handleLoadAll}
                onLoadNext={handleLoadNext}
                onLoadReset={handleLoadReset}
                isAll={false}
              />
              <Grow placement={'ec'} className="p-2.5 bg-[#EFF8FF] rounded-lg gap-2.5">
                <Grow gap={2}>
                  <Typo variant="body-md" weight={'bold'} className="text-[#6B7280]">
                    설계번호
                  </Typo>
                  <Input width={'quoteNo'} value={'LA123456789012'} onChange={() => {}} readOnly />
                </Grow>
                <Button variant={'contained'} color={'coolgray'} size={'lg'}>
                  이미지전송
                </Button>
              </Grow>
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow className="justify-start!">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  이미지조회
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
    </>
  );
}
