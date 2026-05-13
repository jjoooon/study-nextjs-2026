/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Grow, Gcol, Typo } from '@atoms';
import { ErrorIcon } from '@icons';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

type DummyDataType = {
  id: number;
  field1: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
  },
  {
    id: 2,
    field1:
      '환급금분할지금방법을 수정할 수 없습니다. 배서기준일이 환급금 최초 도래일보다 같거나 큽니다. 환급금분할지금방법을 수정할 수 없습니다. 배서기준일이 환급금 최초 도래일보다 같거나 큽니다.',
  },
  {
    id: 3,
    field1: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
  },
  {
    id: 4,
    field1: '정정 기준일이 보험시기 전일 경우 배서 불가능합니다.',
  },
  {
    id: 5,
    field1: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
  },
  {
    id: 6,
    field1: '환급금분할지급방법을 수정할 수 없습니다. 배서기준일이 환급금 최초 도래일보다 같거나 큽니다.',
  },
  {
    id: 7,
    field1: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
  },
  {
    id: 8,
    field1: '정정 기준일이 보험시기 전일 경우 배서 불가능합니다.',
  },
];

const Ltpz998 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      field: 'field1',
      flex: 1,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              업무처리안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ998)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="h-[40rem] grid-rows-[auto_20rem] overflow-hidden">
          <div className="ag-theme-alpine no-header min-h-[18.4rem]" style={{ borderTop: '0.2rem solid #1E2124' }}>
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              noRowsOverlayComponent={AgGridEmptyComponent}
              defaultColDef={{
                resizable: false,
                cellClass: 'cursor-pointer',
              }}
              headerHeight={0}
              groupHeaderHeight={0}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
          <Gcol placement="ss" gap={3} className="h-full pb-5 bg-[var(--color-gray-5)]" variant="box-line">
            <Grow placement="ec" className="w-full text-right">
              <Typo variant={'body-lg'} color={'gray'}>
                코드 LTRE006(trandZomH110)
              </Typo>
            </Grow>
            <Grow placement="ss" gap={5} className="w-full">
              <Grow className="w-[7.1rem] py-1.5 pl-1.5">
                <ErrorIcon />
                <Typo variant={'body-lg'} color={'gray'} className="font-bold">
                  오류
                </Typo>
              </Grow>
              <Gcol className="h-[13.5rem] w-[calc(100%-9.1rem)] overflow-y-auto border-l border-[var(--color-gray-15)] pl-5">
                {/* <Typo variant={'body-md'}>{selectedRow?.field1 ?? ''}</Typo> */}
                <Typo variant={'body-md'}>
                  환급금분할지급방법을 수정할 수 없습니다. 배서 기준일이 환급금최초도래일보다 같거나 큽니다.
                  정정기준일이 보험시기 전일 경우 배서 불가능합니다. 환급금분할지급방법을 수정할 수 없습니다. 배서
                  기준일이 환급금최초도래일보다 같거나 큽니다. 정정기준일이 보험시기 전일 경우 배서 불가능합니다. <br />
                  <br />
                  환급금분할지급방법을 수정할 수 없습니다. 배서 기준일이 환급금최초도래일보다 같거나 큽니다.
                  정정기준일이 보험시기 전일 경우 배서 불가능합니다. 환급금분할지급방법을 수정할 수 없습니다. 배서
                  기준일이 환급금최초도래일보다 같거나 큽니다. 정정기준일이 보험시기 전일 경우 배서 불가능합니다.
                </Typo>
              </Gcol>
            </Grow>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                오류상세설명
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                연계버튼
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

export default Ltpz998;
