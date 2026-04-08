'use client';

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
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz062 = ({ open, onOpenChange }: PopupBaseProps) => {
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

  const DummyData: DummyDataType[] = [
    {
      id: 1,
      isChecked: false,
      field1: 'S92',
      field2: '발등 골절',
      field3: '2020',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
      field9: '',
    },
    {
      id: 2,
      isChecked: false,
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
      field9: '',
    },
    {
      id: 3,
      isChecked: false,
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      field7: '',
      field8: '',
      field9: '',
    },
  ];
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

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
      field: 'field7',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '체크',
      field: 'field7',
      width: 60,
      cellClass: 'text-center',
      cellRenderer: (params: { data: DummyDataType }) => (
        <Gcol>
          <Typo tag={'span'} variant={'body-xs'}>
            {params.data.field9}
          </Typo>
        </Gcol>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고지콕콕 입력 서비스 안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ014)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Gcol className="w-full" gap={5} placement="ss">
            <Typo tag={'p'} variant={'body-lg'}>
              보험금지급이력을 기반으로 필요한 정보를 예상하여 자동입력합니다.
            </Typo>

            <TableFold>
              <TableFoldHead title="필수고지"></TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine">
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
                    domLayout="autoHeight"
                    rowSelection={{
                      mode: 'singleRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="질문항목(질병)"></TableFoldHead>
              <TableFoldBody>
                <div>table 영역</div>
              </TableFoldBody>
            </TableFold>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                중단
              </Button>
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
