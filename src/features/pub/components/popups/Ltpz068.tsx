'use client';

import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold } from '@common/TableFold';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz068 = ({ open, onOpenChange }: PopupBaseProps) => {
  // 항목 dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
  };

  const DummyData: DummyDataType[] = [
    {
      id: 1,
      field01: '1',
      field02: '보통약관(상해사망)',
    },
    {
      id: 2,
      field01: '2',
      field02: '보험료납입면제대상보장(8대사융Ⅱ)',
    },
    {
      id: 3,
      field01: '3',
      field02: '보장보험료50%납입지원Ⅱ(4대유사암)',
    },
    {
      id: 4,
      field01: '4',
      field02: '상해사망(체증형)',
    },
    {
      id: 5,
      field01: '5',
      field02: '상해사망추가',
    },
    {
      id: 6,
      field01: '6',
      field02: '상해80%이상후유장애',
    },
    {
      id: 7,
      field01: '7',
      field02: '상해후유장해(3-100%)(갱신형)',
    },
    {
      id: 8,
      field01: '8',
      field02: '질병사망',
    },
    {
      id: 181,
      field01: '181',
      field02: '주요순환계질환Ⅰ특정치료비(상급종합병원,권역심뇌혈관질환센터)(각연간',
    },
    {
      id: 182,
      field01: '182',
      field02: '암(4대유사암제외)진단후특정치료비(암전문의료기관(상급종합 병원))(진',
    },
    {
      id: 292,
      field01: '292',
      field02: '주요뇌혈관질환(90일면책)진단비(간편)',
    },
    {
      id: 598,
      field01: '598',
      field02: '암(갑상선암및전립선암제외)다빈치로봇수술비(1회한)(갱신형)(CLA07606)',
    },
    {
      id: 601,
      field01: '601',
      field02: '뇌혈관질환수술비(수술1회당)',
    },
    {
      id: 602,
      field01: '602',
      field02: '뇌혈관질환수술비(수술1회당)(갱신형)',
    },
    {
      id: 605,
      field01: '605',
      field02: '허혈성심장질환수술비(수술1회당)',
    },
    {
      id: 612,
      field01: '612',
      field02: '상해종합병원1인실입원비(1일이상30일한도)',
    },
    {
      id: 619,
      field01: '619',
      field02: '상해중환자실입원비(1일이상10일한도)',
    },
  ];

  // 항목 AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '순번',
      field: 'field01',
      width: 60,
      editable: false,
      autoHeight: true,
      cellClass: 'text-center px-0!',
    },
    {
      headerName: '담보명',
      field: 'field02',
      width: 300,
      autoHeight: true,
      editable: false,
      cellClass: 'text-left',
    },
  ];

  // A안 dummy data
  type DummyDataTypeA1 = {
    id: number;
    field01: string | number;
    field02: string | number;
  };

  // A안
  const DummyDataA1: DummyDataTypeA1[] = [
    {
      id: 1,
      field01: '100',
      field02: '28',
    },
    {
      id: 2,
      field01: '10',
      field02: '320',
    },
    {
      id: 3,
      field01: '100',
      field02: '28',
    },
    {
      id: 4,
      field01: '100',
      field02: '320',
    },
    {
      id: 5,
      field01: '100',
      field02: '28',
    },
    {
      id: 6,
      field01: '100',
      field02: '320',
    },
    {
      id: 7,
      field01: '100',
      field02: '28',
    },
    {
      id: 8,
      field01: '400',
      field02: '320',
    },
    {
      id: 181,
      field01: '100',
      field02: '28',
    },
    {
      id: 182,
      field01: '100',
      field02: '28',
    },
    {
      id: 292,
      field01: '100',
      field02: '28',
    },
    {
      id: 598,
      field01: '500',
      field02: '948',
    },
    {
      id: 601,
      field01: '10',
      field02: '68',
    },
    {
      id: 602,
      field01: '10',
      field02: '13',
    },
    {
      id: 605,
      field01: '10',
      field02: '66',
    },
    {
      id: 612,
      field01: '1',
      field02: '37',
    },
    {
      id: 619,
      field01: '1',
      field02: '87',
    },
  ];

  // A안 AgGrid Column
  const columnDefsA1: ColDef<DummyDataTypeA1>[] = [
    {
      headerName: '가입금액(만원)',
      field: 'field01',
      width: 90,
      editable: false,
      autoHeight: true,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '보험료(원)',
      field: 'field02',
      width: 90,
      autoHeight: true,
      editable: false,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  // B안 dummy data
  type DummyDataTypeB1 = {
    id: number;
    field01: string | number;
    field02: string | number;
  };

  // B안
  const DummyDataB1: DummyDataTypeB1[] = [
    {
      id: 1,
      field01: '100',
      field02: '28',
    },
    {
      id: 2,
      field01: '10',
      field02: '320',
    },
    {
      id: 3,
      field01: '50',
      field02: '28',
    },
    {
      id: 4,
      field01: '200',
      field02: '640',
    },
    {
      id: 5,
      field01: '100',
      field02: '28',
    },
    {
      id: 6,
      field01: '100',
      field02: '320',
    },
    {
      id: 7,
      field01: '100',
      field02: '320',
    },
    {
      id: 8,
      field01: '100',
      field02: '28',
    },
    {
      id: 181,
      field01: '500',
      field02: '320',
    },
    {
      id: 182,
      field01: '100',
      field02: '28',
    },
    {
      id: 292,
      field01: '100',
      field02: '28',
    },
    {
      id: 598,
      field01: '300',
      field02: '558',
    },
    {
      id: 601,
      field01: '20',
      field02: '136',
    },
    {
      id: 602,
      field01: '20',
      field02: '26',
    },
    {
      id: 605,
      field01: '20',
      field02: '132',
    },
    {
      id: 612,
      field01: '2',
      field02: '74',
    },
    {
      id: 619,
      field01: '2',
      field02: '174',
    },
  ];

  // B안 AgGrid Column
  const columnDefsB1: ColDef<DummyDataTypeB1>[] = [
    {
      headerName: '가입금액(만원)',
      field: 'field01',
      width: 90,
      editable: false,
      autoHeight: true,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '보험료(원)',
      field: 'field02',
      width: 90,
      autoHeight: true,
      editable: false,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  // C안 dummy data
  type DummyDataTypeC1 = {
    id: number;
    field01: string | number;
    field02: string | number;
  };

  // C안
  const DummyDataC1: DummyDataTypeC1[] = [
    {
      id: 1,
      field01: '100',
      field02: '28',
    },
    {
      id: 2,
      field01: '10',
      field02: '320',
    },
    {
      id: 3,
      field01: '30',
      field02: '28',
    },
    {
      id: 4,
      field01: '300',
      field02: '960',
    },
    {
      id: 5,
      field01: '100',
      field02: '28',
    },
    {
      id: 6,
      field01: '100',
      field02: '320',
    },
    {
      id: 7,
      field01: '100',
      field02: '320',
    },
    {
      id: 8,
      field01: '100',
      field02: '28',
    },
    {
      id: 181,
      field01: '600',
      field02: '320',
    },
    {
      id: 182,
      field01: '100',
      field02: '28',
    },
    {
      id: 292,
      field01: '100',
      field02: '28',
    },
    {
      id: 598,
      field01: '200',
      field02: '294',
    },
    {
      id: 601,
      field01: '30',
      field02: '204',
    },
    {
      id: 602,
      field01: '30',
      field02: '39',
    },
    {
      id: 605,
      field01: '30',
      field02: '198',
    },
    {
      id: 612,
      field01: '3',
      field02: '111',
    },
    {
      id: 619,
      field01: '3',
      field02: '261',
    },
  ];

  // C안 AgGrid Column
  const columnDefsC1: ColDef<DummyDataTypeC1>[] = [
    {
      headerName: '가입금액(만원)',
      field: 'field01',
      width: 90,
      editable: false,
      autoHeight: true,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '보험료(원)',
      field: 'field02',
      width: 90,
      autoHeight: true,
      editable: false,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowDataA1] = React.useState<DummyDataTypeA1[]>(DummyDataA1);
  const [rowDataB1] = React.useState<DummyDataTypeB1[]>(DummyDataB1);
  const [rowDataC1] = React.useState<DummyDataTypeC1[]>(DummyDataC1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              AI인수지침 위배해소 결과 확인 및 적용
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ068)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <TableFold>
            <Grow className="w-full relative">
              {/* 항목 */}
              <div className="ag-theme-alpine w-full">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  enableCellSpan={true}
                  domLayout="autoHeight"
                />
              </div>
              <Grow className="absolute right-0 top-0 w-full">
                {/* A안 */}
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataTypeA1>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowDataA1}
                    columnDefs={columnDefsA1}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    enableCellSpan={true}
                    domLayout="autoHeight"
                  />
                </div>
                {/* B안 */}
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataTypeB1>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowDataB1}
                    columnDefs={columnDefsB1}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    enableCellSpan={true}
                    domLayout="autoHeight"
                  />
                </div>
                {/* C안 */}
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataTypeC1>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowDataC1}
                    columnDefs={columnDefsC1}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    enableCellSpan={true}
                    domLayout="autoHeight"
                  />
                </div>
              </Grow>
            </Grow>
          </TableFold>
        </DialogSection>
        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'ee'} gap={2} className="w-full pb-5 px-6">
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  적용
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </Grow>
            </Grow>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
