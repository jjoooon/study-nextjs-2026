/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter } from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-enterprise';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback } from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'CLA08297',
    field02: '- 등급별골정(치아파절제외)진단비(1급, 연간1회한)',
    field03: '1백만원',
  },
];
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: 'CLA08298',
    field02: '- 등급별골정(치아파절제외)진단비(2급, 연간1회한)',
    field03: '40',
  },
  {
    id: 2,
    field01: 'CLA08299',
    field02: '- 등급별골정(치아파절제외)진단비(3급, 연간1회한)',
    field03: '30',
  },
  {
    id: 3,
    field01: 'CLA08300',
    field02: '- 등급별골정(치아파절제외)진단비(4급, 연간1회한)',
    field03: '20',
  },
  {
    id: 4,
    field01: 'CLA08301',
    field02: '- 등급별골정(치아파절제외)진단비(5급, 연간1회한)',
    field03: '10',
  },
];

const Ltpz066 = () => {
  const selectCellRenderer = useCallback(<TData,>(params: ICellRendererParams<TData>) => {
    const value = params.value == null ? '' : String(params.value);
    const hasValue = value.trim().length > 0;

    if (!hasValue) {
      return <div className="h-full w-full" />;
    }

    return (
      <div className="flex h-full w-full items-center justify-between gap-1 px-1">
        <span className="block min-w-0 flex-1 truncate text-center leading-[2.5rem]">{value}</span>
        <span className="ag-icon ag-icon-small-down shrink-0" aria-hidden="true" />
      </div>
    );
  }, []);

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보코드',
      field: 'field01',
      width: 100,
      resizable: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center `,
    },
    {
      headerName: '담보명',
      field: 'field02',
      flex: 1,
      resizable: true,
      cellClass: `text-left`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '가입금액',
      field: 'field03',
      width: 120,
      resizable: true,
      cellClass: `text-center`,
      editable: true,
      cellRenderer: selectCellRenderer,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['1백만원', '2백만원', '3백만원', '4백만원', '5백만원'] },
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보코드',
      field: 'field01',
      width: 100,
      resizable: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center `,
    },
    {
      headerName: '담보명',
      field: 'field02',
      flex: 1,
      resizable: true,
      cellClass: `text-left`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field02' }),
    },
    {
      headerName: '가입금액(만원)',
      field: 'field03',
      width: 120,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
  ];

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              장기가입금액세부속성
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ066)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          {/* 2027-05-27 전체 수정 */}
          <Grid placement="ss" className="w-full grid-rows-[auto_auto]" gap={3}>
            <TableFold>
              <TableFoldHead title="유형선택" />
              <TableFoldBody>
                <FormTable caption="유형" cols={['w-[12rem]', 'w-auto']}>
                  <FormRow>
                    {/* 2026-05-21 title 변경 */}
                    <FormCell title={'유형'}>
                      <NativeSelect
                        aria-label="항목 선택"
                        value={form.type01}
                        className="w-[12rem]!"
                        onChange={(e) => setFormField('type01', e.target.value)}
                      >
                        {[
                          { value: 'selection', id: 'type01-1', label: 'CLA08297_1' },
                          { value: 'selection2', id: 'type01-2', label: 'CLA08298_2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="사고등급별 담보 가입금액" />
              <TableFoldBody className="gap-2">
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData}
                    columnDefs={columnDefs}
                    defaultColDef={{ sortable: false }}
                    singleClickEdit={true}
                    enableCellSpan={true}
                    domLayout="autoHeight"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData2}
                    columnDefs={columnDefs2}
                    defaultColDef={{ sortable: false }}
                    singleClickEdit={true}
                    enableCellSpan={true}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
                {/* 2026-05-21 수정 */}
                <Typo icon="info" variant="body-sm">
                  세트형 담보는 개별 담보금액 조정 불가
                </Typo>
              </TableFoldBody>
            </TableFold>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                저장
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz066;
