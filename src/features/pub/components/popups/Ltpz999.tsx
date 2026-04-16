'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo } from '@atoms';
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
  DialogClose,
} from '@uiux/Dialog';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: 'CLA 150303',
    field2: '감액및 면책음 암 4대유상사항 포함 요향벼원입원비 1일이상 90일잉하 간편',
  },
  {
    id: 2,
    field1: 'CLA 150304',
    field2: '암진단비(유사암 제외) 특약 기본형',
  },
  {
    id: 3,
    field1: 'CLA 150305',
    field2: '뇌혈관질환진단비 특약 표준형',
  },
  {
    id: 4,
    field1: 'CLA 150306',
    field2: '허혈심장질환진단비 특약 표준형',
  },
  {
    id: 5,
    field1: 'CLA 150307',
    field2: '질병수술비(1~5종) 특약',
  },
  {
    id: 6,
    field1: 'CLA 150308',
    field2: '상해수술비(1~5종) 특약',
  },
  {
    id: 7,
    field1: 'CLA 150309',
    field2: '질병입원일당(1일이상 180일한도) 특약',
  },
  {
    id: 8,
    field1: 'CLA 150310',
    field2: '상해입원일당(1일이상 180일한도) 특약',
  },
  {
    id: 9,
    field1: 'CLA 150311',
    field2: '중증질환자실입원일당 특약',
  },
  {
    id: 10,
    field1: 'CLA 150312',
    field2: '간병인사용입원일당(요양병원 제외) 특약',
  },
  {
    id: 11,
    field1: 'CLA 150313',
    field2: '3대질병(암/뇌/심) 입원일당 특약',
  },
  {
    id: 12,
    field1: 'CLA 150314',
    field2: '재해골절진단비(치아파절 제외) 특약',
  },
  {
    id: 13,
    field1: 'CLA 150315',
    field2: '화상진단비 및 수술비 특약',
  },
  {
    id: 14,
    field1: 'CLA 150316',
    field2: '운전자비용(변호사선임/벌금/교통사고처리지원) 특약',
  },
  {
    id: 15,
    field1: 'CLA 150317',
    field2: '질병후유장해(3~100%) 특약',
  },
  {
    id: 16,
    field1: 'CLA 150318',
    field2: '상해후유장해(3~100%) 특약',
  },
  {
    id: 17,
    field1: 'CLA 150319',
    field2: '표적항암약물허가치료비 특약',
  },
  {
    id: 18,
    field1: 'CLA 150320',
    field2: '항암방사선/약물치료비(연간1회한) 특약',
  },
  {
    id: 19,
    field1: 'CLA 150321',
    field2: '질병통원비(외래/처방조제) 특약',
  },
  {
    id: 20,
    field1: 'CLA 150322',
    field2: '상해통원비(외래/처방조제) 특약',
  },
];

export const Ltpz999 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보코드',
      field: 'field1',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '메시지',
      field: 'field2',
      flex: 1,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              메시지내용
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ999)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <div className="ag-theme-alpine min-h-[18.4rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              noRowsOverlayComponent={AgGridEmptyComponent}
              defaultColDef={{
                sortable: true,
                resizable: false,
              }}
              domLayout="normal"
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                엑셀저장
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
