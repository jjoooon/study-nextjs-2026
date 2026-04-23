'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { Input } from '@/shared/components/uiux/Input';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
} from '@uiux/Dialog';

ModuleRegistry.registerModules([AllCommunityModule]);

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
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
};

const dummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: false,
    field1: 'S92',
    field2: '발등 골절',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '3',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 2,
    isChecked: false,
    field1: 'M51',
    field2: '추간판장애',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 3,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 4,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 5,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '고지',
    field9: '',
  },
];
const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    isChecked: false,
    field1: 'S92',
    field2: '발등 골절',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 2,
    isChecked: false,
    field1: 'M51',
    field2: '추간판장애',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 3,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 4,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 5,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '고지',
    field9: '',
  },
];

export const Ltpa060 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [rowData] = React.useState<DummyDataType[]>(dummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(dummyData2);
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '대표질병코드',
      field: 'field1',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병명',
      field: 'field2',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '원사고발생일',
      field: 'field3',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '최종사고발생일',
      field: 'field4',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '입원',
      field: 'field5',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '통원',
      field: 'field6',
      width: 40,
      cellClass: 'text-center',
    },
    {
      headerName: '수술',
      field: 'field7',
      width: 40,
      cellClass: 'text-center',
    },
    {
      headerName: '고지여부',
      field: 'field8',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '체크',
      field: 'field9',
      width: 60,
      cellClass: 'text-center',
      cellRenderer: (params: { data: DummyDataType }) => (
        <Gcol placement="cc" className="h-full">
          <Typo tag={'span'} variant={'body-md'} className="text-[#006ff2]">
            {params.data.field9}
          </Typo>
        </Gcol>
      ),
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '대표질병코드',
      field: 'field1',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병명',
      field: 'field2',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '원사고발생일',
      field: 'field3',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '최종사고발생일',
      field: 'field4',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '입원',
      field: 'field5',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '통원',
      field: 'field6',
      width: 40,
      cellClass: 'text-center',
    },
    {
      headerName: '수술',
      field: 'field7',
      width: 40,
      cellClass: 'text-center',
    },
    {
      headerName: '고지여부',
      field: 'field8',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '체크',
      field: 'field9',
      width: 60,
      cellClass: 'text-center',
      cellRenderer: (params: { data: DummyDataType }) => (
        <Gcol placement="cc" className="h-full">
          <Typo tag={'span'} variant={'body-md'} className="text-[#006ff2]">
            {params.data.field9}
          </Typo>
        </Gcol>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              외부정보클렌징 결과 조회(사고력요약)
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA060)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr_1fr] gap-5">
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'FP정보제공동의(유효일자)'}>
                  <Input aria-label="FP정보제공동의 유효일자" width={100} value={'2026-03-01'} readOnly />
                </FormCell>
                <FormCell title={'전문호출기간'}>
                  <Input aria-label="전문호출기간 시작일" width={100} value={'2026-03-01'} readOnly />-
                  <Input aria-label="전문호출기간 종료일" width={100} value={'2026-03-01'} readOnly />
                </FormCell>
                <FormCell title={'최종적재일'}>
                  <Input aria-label="최종적재일" width={100} value={'2026-03-01'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <TableFold>
            <TableFoldHead title="필수고지"></TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[18.5rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  selectionColumnDef={{
                    width: 30,
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  rowSelection={{
                    mode: 'multiRow',
                    isRowSelectable: (node) => node.data?.field8 !== '고지',
                    checkboxes: true,
                    hideDisabledCheckboxes: false,
                    enableClickSelection: false,
                  }}
                  domLayout="normal"
                  alwaysShowVerticalScroll={true}
                />
              </div>
            </TableFoldBody>
          </TableFold>
          <TableFold>
            <TableFoldHead title="고지확인대상"></TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[18.5rem]">
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  selectionColumnDef={{
                    width: 30,
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  rowSelection={{
                    mode: 'multiRow',
                    isRowSelectable: (node) => node.data?.field8 !== '고지',
                    checkboxes: true,
                    hideDisabledCheckboxes: false,
                    enableClickSelection: false,
                  }}
                  domLayout="normal"
                  alwaysShowVerticalScroll={true}
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                알릴사항 반영하기
              </Button>
              <Button
                variant={'outlined'}
                size={'xl'}
                color={'gray-light'}
                onClick={onOpenChange ? () => onOpenChange(false) : undefined}
              >
                닫기
              </Button>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
