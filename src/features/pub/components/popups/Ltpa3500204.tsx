'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { Checkbox } from '@uiux/Checkbox';

ModuleRegistry.registerModules([AllCommunityModule]);

// 담보패키지 dummy data
type DummyDataType1 = {
  id: number;
  isCheck: boolean | null;
  field01: string | number;
};

const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    isCheck: true,
    field01: '전이암특정치료비(종합병원)(각연간1회한)',
  },
  {
    id: 2,
    isCheck: null,
    field01: '- 전이암특정치료비(종합병원)(각연간1회한)',
  },
  {
    id: 3,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)',
  },
  {
    id: 4,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)',
  },
  {
    id: 5,
    isCheck: true,
    field01: '전이암특정치료비(암전문의료기관(상급종합병원등))(각연간1회한)',
  },
  {
    id: 6,
    isCheck: null,
    field01: '- 전이암특정치료비(수술)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 7,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 8,
    isCheck: null,
    field01: ' - 전이암특정치료비(항암약물치료)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 9,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환통합치료비(연간1억원한도)',
  },
  {
    id: 10,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환통합치료비(연간5천만원한도)',
  },
  {
    id: 11,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간2천만원한도)',
  },
  {
    id: 12,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간1천만원한도)',
  },
];

// 담보 dummy data
type DummyDataType2 = {
  id: number;
  isCheck: boolean | null;
  field01: string | number;
};

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isCheck: true,
    field01: '전이암특정치료비(종합병원)(각연간1회한)',
  },
  {
    id: 2,
    isCheck: null,
    field01: '- 전이암특정치료비(종합병원)(각연간1회한)',
  },
  {
    id: 3,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)',
  },
  {
    id: 4,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)',
  },
  {
    id: 5,
    isCheck: true,
    field01: '전이암특정치료비(암전문의료기관(상급종합병원등))(각연간1회한)',
  },
  {
    id: 6,
    isCheck: null,
    field01: '- 전이암특정치료비(수술)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 7,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 8,
    isCheck: null,
    field01: ' - 전이암특정치료비(항암약물치료)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 9,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환통합치료비(연간1억원한도)',
  },
  {
    id: 10,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환통합치료비(연간5천만원한도)',
  },
  {
    id: 11,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간2천만원한도)',
  },
  {
    id: 12,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간1천만원한도)',
  },
];

export const Ltpa3500204 = ({ open, onOpenChange }: PopupBaseProps) => {
  // 담보 AgGrid Column
  const columnDefs1: ColDef<DummyDataType1>[] = [
    {
      headerName: '구분',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
    },
  ];

  // 담보 AgGrid Column
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
    },
  ];

  const [rowData1] = React.useState<DummyDataType1[]>(DummyData1);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보패키지 선택
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grid className='w-full grid-cols-[auto_1fr]' placement='ss' gap={5}>
            <Grow placement='ss'>
              <TableFold variant={'default'}>
                <TableFoldHead title="담보패키지" />
                <TableFoldBody>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType1>
                      // getRowId 적용: id 필드를 고유 식별자로 사용
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData1}
                      columnDefs={columnDefs1}
                      enableCellSpan={true}
                      domLayout="autoHeight"
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
                        checkboxes: (params) => params.data?.isCheck !== null,
                        hideDisabledCheckboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        cellClass: 'text-center',
                        width: 40,
                      }}
                    />
                  </div>
                </TableFoldBody>
              </TableFold>  
            </Grow>
            <Grow placement="ss" className="w-full" gap={5}>
              <TableFold variant={'default'}>
                <TableFoldHead title="담보" />
                <TableFoldBody>
                  {/* <Grow className="w-full" gap={5}> */}
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType2>
                        // getRowId 적용: id 필드를 고유 식별자로 사용
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData2}
                        columnDefs={columnDefs2}
                        enableCellSpan={true}
                        domLayout="autoHeight"
                        rowSelection={{
                          mode: 'multiRow',
                          checkboxes: (params) => params.data?.isCheck !== null,
                          hideDisabledCheckboxes: true,
                          enableClickSelection: false,
                        }}
                      />
                    </div>
                  {/* </Grow> */}
                </TableFoldBody>
              </TableFold>
            </Grow>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                선택
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
/**
 * 확인요청
 * 전체체크의 사용여부
 * <Grow className="ml-32"> 간격체크
 */