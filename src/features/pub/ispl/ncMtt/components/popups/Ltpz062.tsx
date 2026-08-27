/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
};

type DummyDataType2 = {
  id: number;
  isChecked: boolean;
  field1: string;
  field2: string;
  field3: string;
};

const dummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: false,
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '22(2021-01-21~2021-02-01)',
    field6: '3',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 2,
    isChecked: false,
    field1: '',
    field2: '발등 골절발등 골절발등 골절발등 골절발등 골절',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
    field9: '',
  },
];

const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    isChecked: false,
    field1: '최근5년이내치료여부',
    field2: '예',
    field3: '입원, 계속하여 7일이상 치료',
  },
  {
    id: 2,
    isChecked: false,
    field1: '최근5년이내치료여부최근5년이내치료여부최근5년이내치료여부최근5년이내치료여부',
    field2: '예',
    field3:
      '입원, 계속하여 7일이상 치료입원, 계속하여 7일이상 치료입원, 계속하여 7일이상 치료입원, 계속하여 7일이상 치료입원, 계속하여 7일이상 치료입원, 계속하여 7일이상 치료',
  },
];

const Ltpz062 = () => {
  const [rowData] = React.useState<DummyDataType[]>(dummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(dummyData2);
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '대표질병코드',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '질병명',
        field: 'field2',
        flex: 10,
        cellClass: 'text-center',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
      },
      {
        headerName: '원사고발생일',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '최종사고발생일',
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(84),
        cellClass: 'text-center',
      },
      {
        headerName: '입원',
        field: 'field5',
        flex: 1,
        minWidth: attributeColumnWidth(160),
        cellClass: 'text-center',
      },
      {
        headerName: '통원',
        field: 'field6',
        flex: 1,
        minWidth: attributeColumnWidth(30),
        cellClass: 'text-center',
      },
      {
        headerName: '수술',
        field: 'field7',
        flex: 1,
        minWidth: attributeColumnWidth(30),
        cellClass: 'text-center',
      },
      {
        headerName: '고지여부',
        field: 'field8',
        flex: 1,
        minWidth: attributeColumnWidth(50),
        cellClass: 'text-center',
      },
      {
        headerName: '체크',
        field: 'field9',
        flex: 1,
        minWidth: attributeColumnWidth(50),
        cellClass: 'text-center',
        cellRenderer: (params: { data: DummyDataType }) => (
          <Gcol placement="cc" className="h-full">
            <Typo tag={'span'} variant={'body-md'} className="text-[#006ff2]">
              {params.data.field9}
            </Typo>
          </Gcol>
        ),
      },
    ],
    [attributeColumnWidth]
  );
  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '질문항목',
        field: 'field1',
        flex: 10,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field1' }),
      },
      {
        headerName: '질문답변',
        field: 'field2',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
      {
        headerName: '답변세부사항',
        field: 'field3',
        flex: 20,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field3' }),
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고지콕콕 입력 서비스 안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ062)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        {/*  */}
        <DialogSection className="grid-rows-[auto_auto_auto]">
          <Typo tag={'p'} variant={'body-lg'}>
            보험금지급이력을 기반으로 필요한 정보를 예상하여 자동입력합니다.
          </Typo>

          <TableFold className="grid-rows-[auto_1fr]">
            <TableFoldHead title="필수고지" />
            <TableFoldBody>
              <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  selectionColumnDef={{
                    width: 30,
                    cellClass: 'editable-cell',
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                  rowSelection={{
                    mode: 'singleRow',
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </TableFoldBody>
          </TableFold>

          <TableFold className="grid-rows-[auto_1fr]">
            <TableFoldHead title="질문항목(질병)" />
            <TableFoldBody>
              <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  selectionColumnDef={{
                    width: 30,
                    cellClass: 'editable-cell',
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                  rowSelection={{
                    mode: 'singleRow',
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
              <Gcol variant={'box-warning'} placement={'ss'} className="mt-[0.8rem]">
                <Typo variant={'body-sm'} icon={'warning'} color={'gray'}>
                  보험금 지급이력은 정보의 불안정성으로 부정확할 수 있습니다.(정보 누락, 시간차 존재, 오기재 등)
                </Typo>
                <Typo variant={'body-sm'} icon={'warning'} color={'gray'}>
                  해당 서비스는 고객의 고지의무를 대체할 수 없으며, 반드시 참고 보완자료로만 활용하시기 바랍니다.
                </Typo>
              </Gcol>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <div className="flex items-center px-6 mb-3">
            <Gcol variant={'box-warning-line'} placement={'ss'} className="w-full">
              <Checkbox>
                <span className="text-[var(--color-danger-50)]">고객에게 알릴 의무 최종 확인 후 진행하겠습니다.</span>
              </Checkbox>
            </Gcol>
          </div>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                중단
              </Button>
              <Button variant={'contained'} size={'xl'}>
                알릴사항 반영하기
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

export default Ltpz062;
