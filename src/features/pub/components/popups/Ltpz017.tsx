'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
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
import { Input } from '@uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  isCheck: boolean;
  planName: string;
  myPlanName: string;
  target: boolean | string;
  registrationDate: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    planName: '(355간편지형)(프리미엄을인원플랜)(1.7.8',
    myPlanName: '3대진단형',
    registrationDate: '2026-03-22',
    target: true,
  },
  {
    id: 2,
    isCheck: false,
    planName: '(355간편지형)(프리미엄을인원플랜)(1.7.8',
    myPlanName: '3대진단형',
    registrationDate: '2026-03-22',
    target: true,
  },
  {
    id: 3,
    isCheck: true,
    planName: '(355간편지형)(프리미엄을인원플랜)(1.7.8',
    myPlanName: '3대진단형',
    registrationDate: '2026-03-22',
    target: true,
  },
];

export const Ltpz017 = ({ open, onOpenChange }: PopupBaseProps) => {
  // 검색버튼 여부에 따른 셀 렌더러
  const attributeRenderer = (params: ICellRendererParams<DummyDataType>) => {
    if (!params.value) {
      return null;
    }

    return (
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-1">
        <Button only={'icon'} variant={'none'} size={'sm'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    );
  };

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '순번',
      field: 'id',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '회사플랜명',
      field: 'planName',
      flex: 1,
    },
    {
      headerName: '나만의플랜명',
      field: 'myPlanName',
      width: 120,
    },
    {
      headerName: '등록일자',
      field: 'registrationDate',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '적용대상',
      field: 'target',
      width: 80,
      cellClass: 'text-center',
      cellRenderer: attributeRenderer,
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);

  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              나만의설계
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ017)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable
              variant={'none'}
              lineTop={false}
              caption="보험정보"
              cols={['w-[1rem]', 'w-[10rem]', 'w-[1rem]', 'w-auto']}
            >
              <FormRow>
                <FormCell title={'설계사'}>
                  <Input value={'김한화'} readOnly />
                </FormCell>
                <FormCell title={'상품명'}>
                  <Input value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <TableFold variant={'accordion'}>
            <TableFoldHead title="플랜등록사항" />
            <Gcol className="w-full" placement="ss" variant="box-detail">
              <Typo icon="detail" variant="body-sm">
                적용대상 설정 시 지정한 취급지원만 플랜이 노출됩니다.(미설정시 전체 노출)
              </Typo>
              {/* <Typo icon="detail" variant="body-sm">적용대상 설정 시 지정한 취급지원만 플랜이 노출됩니다.(미설정시 미노출)</Typo> */}
            </Gcol>
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[18.3rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{ sortable: false }}
                  singleClickEdit={true}
                  onCellValueChanged={onCellValueChanged}
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: true,
                    checkboxes: true,
                  }}
                  selectionColumnDef={{
                    width: 30,
                  }}
                  rowClassRules={{}}
                  onGridReady={(params) => {
                    params.api.forEachNode((node) => {
                      if (node.data?.isCheck) {
                        node.setSelected(true);
                      }
                    });
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
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                삭제
              </Button>
              <Button variant={'contained'} size={'xl'}>
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
