'use client';

import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo } from '@atoms';
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

ModuleRegistry.registerModules([AllCommunityModule]);

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'LA26020945959594',
    field02: '홍길순',
    field03: '인수기준',
    field04: '난임치료비 가입 시',
    field05: '누적한도초과',
  },
  {
    id: 2,
    field01: 'LA26020945959595',
    field02: '김철수',
    field03: '인수기준',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은 ',
    field05: '누적한도초과',
  },
  {
    id: 3,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 4,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 5,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 6,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 7,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 8,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 9,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 10,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 11,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 12,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 13,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },

  {
    id: 14,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
  {
    id: 15,
    field01: 'LA26020945959596',
    field02: '이영희',
    field03: '인수금지',
    field04: '질병사망(암진단후) 가입금액은 질병사망(암진단후) 가입금액은',
    field05: '누적한도초과',
  },
];

export const Ltpz023 = ({ open, onOpenChange }: PopupBaseProps) => {
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '증권번호',
      field: 'field01',
      width: 140,
      cellClass: 'text-center',
    },
    {
      headerName: '대상',
      field: 'field02',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '인수제한',
      field: 'field03',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '위배내용',
      field: 'field04',
      flex: 1,
      cellClass: 'text-left',
    },
    {
      headerName: '위배유형',
      field: 'field05',
      width: 100,
      cellClass: 'text-center',
    },
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              지침확인 결과
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ023)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr] gap-3">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={150} value={'LA26020945959594'} readOnly />
                  <Input aria-label="" width={240} value={'한화 더 경증 간편건강보험2(세만기형)2'} readOnly />
                  <Input aria-label="" width={100} value={''} readOnly />
                </FormCell>
                <FormCell title={'플랜명'}>
                  <Input
                    aria-label=""
                    width={360}
                    value={'한화 더 경증 간편건강보험2(세만기형)2올인원플랜(1~4형)'}
                    readOnly
                  />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="ag-theme-alpine min-h-[15.3rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              domLayout="normal"
            />
          </div>
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
