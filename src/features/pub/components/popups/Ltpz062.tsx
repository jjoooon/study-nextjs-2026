'use client';

import { AgGridEmptyComponent } from '@aggrid';
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
} from '@uiux/Dialog';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
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
      field1: '최근3개월내약물복용',
      field2: '예',
      field3: '',
    },
  ];

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
      flex: 1,
      cellClass: 'text-left',
    },
    {
      headerName: '질문답변',
      field: 'field2',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '답변세부사항',
      field: 'field3',
      flex: 1,
      cellClass: 'text-left',
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
              (LTPZ0)
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
                      sortable: false,
                      resizable: false,
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
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    selectionColumnDef={{
                      width: 30,
                    }}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    domLayout="autoHeight"
                    rowSelection={{
                      mode: 'singleRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                  />
                </div>
                <Gcol variant={'box-warning'} placement={'ss'} className="w-full mt-[0.8rem]">
                  <Typo variant={'body-sm'} icon={'warning'} color={'gray'}>
                    보험금 지급이력은 정보의 불안정성으로 부정확할 수 있습니다.(정보 누락, 시간차 존재, 오기재 등)
                  </Typo>
                  <Typo variant={'body-sm'} icon={'warning'} color={'gray'}>
                    해당 서비스는 고객의 고지의무를 대체할 수 없으며, 반드시 참고 보완자료로만 활용하시기 바랍니다.
                  </Typo>
                </Gcol>
              </TableFoldBody>
            </TableFold>
            <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
              <Typo variant={'body-sm'} className="text-[#E43939]">
                <Checkbox color="primary">고객에게 알릴 의무 최종 확인 후 진행하겠습니다.</Checkbox>
              </Typo>
            </Gcol>
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
