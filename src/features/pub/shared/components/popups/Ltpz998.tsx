/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Grow, Gcol, Typo, Grid } from '@atoms';
import { ErrorIcon, NotiIcon, QueryIcon } from '@icons';
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
  type: '오류' | '질의' | '알림';
  code: string;
  field0: string;
  field1: string;
  field2?: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    type: '오류',
    code: 'LTRE006(trandZomH110)',
    field0: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field1:
      '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field2:
      '오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.',
  },
  {
    id: 2,
    type: '질의',
    code: 'LTRE007(trandZomH111)',
    field0: '환급금분할지급방법을 수정할 수 없습니다. 배서기준일이 환급금 최초 도래일보다 같거나 큽니다.',
    field1:
      '환급금분할지금방법을 수정할 수 없습니다. 배서기준일이 환급금 최초 도래일보다 같거나 큽니다. 환급금분할지금방법을 수정할 수 없습니다. 배서기준일이 환급금 최초 도래일보다 같거나 큽니다.',
  },
  {
    id: 3,
    type: '알림',
    code: 'LTRE008(trandZomH112)',
    field0: '정정 기준일이 보험시기 전일 경우 배서 불가능합니다.',
    field1:
      '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field2:
      '오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.',
  },
  {
    id: 4,
    type: '알림',
    code: 'LTRE027(trandZomH111)',
    field0: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field1:
      '정정 기준일이 보험시기 전일 경우 배서 불가능합니다.정정 기준일이 보험시기 전일 경우 배서 불가능합니다.정정 기준일이 보험시기 전일 경우 배서 불가능합니다.정정 기준일이 보험시기 전일 경우 배서 불가능합니다.',
    field2:
      '오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.',
  },
  {
    id: 5,
    type: '오류',
    code: 'LTRE107(trandZomH111)',
    field0: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field1: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field2:
      '오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.',
  },
  {
    id: 6,
    type: '오류',
    code: 'LTRE27(trandZomH111)',
    field0: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field1: '환급금분할지급방법을 수정할 수 없습니다. 배서기준일이 환급금 최초 도래일보다 같거나 큽니다.',
    field2:
      '오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.',
  },
  {
    id: 7,
    type: '오류',
    code: 'LTRE0337(trandZomH111)',
    field0: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field1: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field2:
      '오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.',
  },
  {
    id: 8,
    type: '오류',
    code: 'LTRE012307(trandZomH111)',
    field0: '채권가압류 계약일 경우 계약자 변경 배서 불가능합니다.',
    field1: '정정 기준일이 보험시기 전일 경우 배서 불가능합니다.',
    field2:
      '오류가 났을 경우 해소는 이렇게 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.\n[가입설계] 버튼을 클릭 후 담보 해소를 해주세요.',
  },
];

const Ltpz998 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [selectedData, setSelectedData] = React.useState<DummyDataType | null>(null);
  const detailLines = React.useMemo(() => selectedData?.field2?.split('\n') ?? [], [selectedData]);

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      field: 'field0',
      flex: 1,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field0' }),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
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

        <DialogSection className="grid-rows-[auto_1fr]">
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              onCellClicked={(params) => {
                if (params.data) {
                  setSelectedData(params.data);
                }
              }}
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
          <div className="w-full h-[calc(100vh-42rem)] max-h-[24rem] min-h-[10rem]">
            {selectedData && (
              <Grid
                gap={3}
                className="h-full pb-5 bg-[var(--color-gray-5)] rounded-[0.8rem] grid-rows-[auto_1fr]"
                variant="box-line"
              >
                <Grow placement="ec" className="w-full text-right">
                  <Typo variant={'body-lg'} color={'gray'}>
                    코드 {selectedData.code}
                  </Typo>
                </Grow>
                <Grow placement="ss" gap={5} className="w-full h-full">
                  <Grow className="w-[7.1rem] py-1.5 pl-1.5 shrink-0">
                    {selectedData.type === '오류' && <ErrorIcon />}
                    {selectedData.type === '질의' && <QueryIcon />}
                    {selectedData.type === '알림' && <NotiIcon />}
                    <Typo variant={'body-lg'} color={'gray'} className="font-bold">
                      {selectedData.type}
                    </Typo>
                  </Grow>
                  <Gcol
                    className="h-full flex-1 overflow-y-auto border-l border-[var(--color-gray-15)] relative"
                    placement="ss"
                    gap={3}
                  >
                    <Gcol className="absolute top-0 w-full pl-5" placement="ss" gap={3}>
                      <div>{selectedData.field1}</div>

                      {selectedData.field2 && (
                        <div className="w-full rounded-[0.8rem] border border-[var(--color-gray-15)] bg-white p-3">
                          {detailLines.map((line, index) => (
                            <React.Fragment key={`${selectedData.id}-${index}`}>
                              {line}
                              {index < detailLines.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </Gcol>
                  </Gcol>
                </Grow>
              </Grid>
            )}
          </div>
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
