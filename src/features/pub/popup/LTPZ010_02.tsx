'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useRef } from 'react';
import * as React from 'react';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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

import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ010_02 = ({ open, onOpenChange }: PopupBaseProps) => {
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  type DummyDataType = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
  };

  const DummyData: DummyDataType[] = [
    { id: 1, field1: '최종설계저장', field2: '간편설계', field3: '수정일시:2016-03-14 김한화(12312312)' },
    { id: 2, field1: '가입설계동의', field2: '', field3: '' },
    { id: 3, field1: '설계심사', field2: '', field3: '' },
    { id: 4, field1: '서류출력', field2: '미출력', field3: '' },
    { id: 5, field1: '서류스캔', field2: '미스캔', field3: '' },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '업무구분',
      field: 'field1',
      width: 120,
      cellClass: 'text-center font-bold',
    },
    {
      headerName: '업무상태',
      field: 'field2',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '주요내용',
      field: 'field3',
      flex: 1,
      cellClass: 'text-center',
    },
  ];

  const rowData = React.useMemo(() => DummyData, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계 이력조회
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="설계번호" variant="head" cols={['w-[1rem]', 'w-auto', 'w-[1rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    LA123123123123-1
                  </Typo>
                </FormCell>
                <FormCell title={'보험시기'}>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    2026-01-01
                  </Typo>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'유효기한'}>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    2026-12-31
                  </Typo>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold variant={'default'}>
            <TableFoldHead title=""></TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  singleClickEdit={true}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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
