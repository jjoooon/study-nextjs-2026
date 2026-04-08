'use client';
// 권오택

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
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

import { Input } from '@uiux/Input';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ColSpanParams, ValueFormatterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpa220 = ({ open, onOpenChange }: PopupBaseProps) => {
  // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
  };

  const toNumericValue = (value: string | number): number => {
    if (typeof value === 'number') {
      return value;
    }

    const parsedValue = Number(String(value).replaceAll(',', ''));
    return Number.isNaN(parsedValue) ? 0 : parsedValue;
  };

  const DummyData: DummyDataType[] = [
    {
      id: 1,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 2,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 3,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 4,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 5,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 6,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 7,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 8,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 9,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 10,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 11,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 12,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 13,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 14,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
    {
      id: 15,
      field01: '홍길동',
      field02: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
      field03: '2016-01-01',
      field04: '1000000',
      field05: '1',
      field06: '20000000',
    },
  ];

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      field: 'id',
      width: 40,
      cellClass: 'text-center',
      valueFormatter: (params: ValueFormatterParams<DummyDataType>) => {
        if (params.node?.rowPinned === 'bottom') {
          return '';
        }

        return String(params.value ?? '');
      },
    },
    {
      headerName: '피보험자',
      field: 'field01',
      width: 110,
      cellClass: 'text-center',
      colSpan: (params: ColSpanParams<DummyDataType>) => {
        if (params.node?.rowPinned === 'bottom') {
          return 3;
        }

        return 1;
      },
    },
    {
      headerName: '담보명',
      field: 'field02',
      flex: 1,
      cellClass: 'text-left',
    },
    {
      headerName: '실납입기간',
      field: 'field03',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '보험료(원)',
      field: 'field04',
      width: 100,
      cellClass: 'text-right',
    },
    {
      headerName: 'CSM배수',
      field: 'field05',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: 'CSM총액',
      field: 'field06',
      width: 100,
      cellClass: 'text-right',
    },
  ];

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const pinnedBottomRowData = React.useMemo<DummyDataType[]>(() => {
    const totalPremium = rowData.reduce((sum, row) => sum + toNumericValue(row.field04), 0);
    const totalCsm = rowData.reduce((sum, row) => sum + toNumericValue(row.field06), 0);

    return [
      {
        id: 0,
        field01: '합계',
        field02: '',
        field03: '',
        field04: totalPremium.toLocaleString('ko-KR'),
        field05: '',
        field06: totalCsm.toLocaleString('ko-KR'),
      },
    ];
  }, [rowData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              CSM계산내역
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA220)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full" gap={5}>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable caption="보험정보" cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']} variant="head">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Input
                      aria-label=""
                      width={'15rem'}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      required
                    />
                  </FormCell>
                  <FormCell title={'CSM배수'}>
                    <Input
                      aria-label=""
                      width={'15rem'}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                    />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                  조회
                </Button>
                <Button color={'gray'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                  재계산
                </Button>
              </Grow>
            </Grow>
            <Gcol className="w-full">
              <Gcol className="w-full">
                <TableFold>
                  <TableFoldHead title="담보별 CSM" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData}
                        pinnedBottomRowData={pinnedBottomRowData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                        }}
                        domLayout="autoHeight"
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </Gcol>
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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
