/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter } from '@aggrid';
import { Grid, Gcol, Grow, Typo } from '@atoms';
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
  DialogClose,
} from '@uiux/Dialog';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@uiux/Table';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '보통약관(상해80%이상후유)',
    field02: '100만원',
    field03: '10만원',
  },
  {
    id: 2,
    field01: '상해사망(체증형)',
    field02: '15,000만원',
    field03: '9,600원',
  },
  {
    id: 3,
    field01: '상해사망추가',
    field02: '10,000만원',
    field03: '96,000원',
  },
  {
    id: 4,
    field01: '골절(치아파절포함)진단비(간편)',
    field02: '10만원',
    field03: '1,185원',
  },
  {
    id: 5,
    field01: '암(4대유사암제외)특정치료비(암전문의료기)',
    field02: '5,000만원',
    field03: '11,600원',
  },
  {
    id: 6,
    field01: '보통약관(상해80%이상후유)',
    field02: '100만원',
    field03: '10만원',
  },
  {
    id: 7,
    field01: '상해사망(체증형)',
    field02: '15,000만원',
    field03: '9,600원',
  },
  {
    id: 8,
    field01: '상해사망추가',
    field02: '10,000만원',
    field03: '96,000원',
  },
  {
    id: 9,
    field01: '',
    field02: '',
    field03: '',
  },
  {
    id: 10,
    field01: '암(4대유사암제외)특정치료비(암전문의료기)',
    field02: '5,000만원',
    field03: '11,600원',
  },
  {
    id: 11,
    field01: '암(4대유사암제외)특정치료비(암전문의료기)',
    field02: '1,000만원',
    field03: '11,600원',
  },
];

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '보통약관(상해80%이상후유)',
    field02: '100만원',
    field03: '10만원',
  },
  {
    id: 2,
    field01: '상해사망(체증형)',
    field02: '15,000만원',
    field03: '9,600원',
  },
  {
    id: 3,
    field01: '상해사망추가',
    field02: '10,000만원',
    field03: '96,000원',
  },
  {
    id: 4,
    field01: '',
    field02: '',
    field03: '',
  },
  {
    id: 5,
    field01: '암(4대유사암제외)특정치료비(암전문의료기)',
    field02: '5,000만원',
    field03: '11,600원',
  },
  {
    id: 6,
    field01: '보통약관(상해80%이상후유)',
    field02: '100만원',
    field03: '10만원',
  },
  {
    id: 7,
    field01: '상해사망(체증형)',
    field02: '15,000만원',
    field03: '9,600원',
  },
  {
    id: 8,
    field01: '상해사망추가',
    field02: '10,000만원',
    field03: '96,000원',
  },
  {
    id: 9,
    field01: '',
    field02: '',
    field03: '',
  },
  {
    id: 10,
    field01: '암(4대유사암제외)특정치료비(암전문의료기)',
    field02: '5,000만원',
    field03: '11,600원',
  },
  {
    id: 11,
    field01: '암(4대유사암제외)특정치료비(암전문의료기)',
    field02: '1,000만원',
    field03: '11,600원',
  },
];

export const Ltpz099 = () => {
  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left flex [&>div>span]:h-auto!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
    },
    {
      headerName: '가입금액',
      field: 'field02',
      width: 100,
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '보험료',
      field: 'field03',
      width: 100,
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      valueFormatter: numberValueFormatter,
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left flex [&>div>span]:h-auto!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field01' }),
    },
    {
      headerName: '가입금액',
      field: 'field02',
      width: 100,
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '보험료',
      field: 'field03',
      width: 100,
      cellClass: 'text-right flex [&>div>span]:h-auto!',
      valueFormatter: numberValueFormatter,
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              추천설계 상세보기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ099)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <TableFold>
            <TableFoldHead title="기본정보" />
            <TableFoldBody>
              <FormTable
                caption="기본정보 테이블"
                cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}
              >
                <FormRow>
                  <FormCell title={'추천일자'} colSpan={5}>
                    YYYY-MM-DD
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'기관'}>OO지점</FormCell>
                  <FormCell title={'취급자'}>대리점(3xxxxxx)</FormCell>
                  <FormCell title={'사용인'}>홍길동(8090001)</FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'고객구분'}>기등록</FormCell>
                  <FormCell title={'고객'} colSpan={4}>
                    홍길순(32세, 여, 1급) 32세(여, 14급)
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
          <TableFold>
            <TableFoldHead title="입력정보" />
            <TableFoldBody>
              <FormTable
                caption="기본정보 테이블"
                cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}
              >
                <FormRow>
                  <FormCell title={'담보군'} colSpan={5}>
                    사망후유, 입원/통원, 수술/치료, 골절/화상, 검사/지원, 운전/비용
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'무해지'}>적용</FormCell>
                  <FormCell title={'납면'}>미적용</FormCell>
                  <FormCell title={'만기구분'}>세만기</FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'보장분석'} colSpan={5}>
                    보장분석부족자금
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'고지유형'} colSpan={5}>
                    표준
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'추가질병'} colSpan={5}>
                    고혈압, 당뇨
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'질병입력'} colSpan={5}>
                    대장.직장용종(3년 내) / 질병명(N년 내) / 질병명(N년 내) / 질병명(N년 내)
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'상품명'} colSpan={5}>
                    한화 시그니처 여성 건강보험4.0
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
          <Gcol>
            <TableFold>
              <TableFoldHead title="설계비교" />
              <TableFoldBody>
                <Grow gap={3} placement="ss">
                  <Grid className="w-full h-full grid-rows-[auto_1fr] gap-0">
                    <Table variant="default">
                      <colgroup>
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: '12rem' }} />
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: 'auto' }} />
                      </colgroup>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={4}  className="bg-(--color-primary-15)">추천설계</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableHead className="text-left">추천설계번호</TableHead>
                          <TableCell>LT22222_4</TableCell>
                          <TableHead className="text-left">순번</TableHead>
                          <TableCell>2/N</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHead className="text-left">보장보험료</TableHead>
                          <TableCell className="text-right">83,500원</TableCell>
                          <TableCell colSpan={2}></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="ag-theme-alpine min-h-[33.2rem] ag-border-t">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={DummyData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                        }}
                        domLayout="normal"
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </Grid>
                  <Grid className="w-full grid-rows-[auto_1fr] gap-0">
                    <Table variant="default">
                      <colgroup>
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: '12rem' }} />
                        <col style={{ width: '10rem' }} />
                        <col style={{ width: 'auto' }} />
                      </colgroup>
                      <TableHeader>
                        <TableRow>
                          <TableHead colSpan={4} className="bg-(--color-primary-15)">진행 설계</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableHead className="text-left">설계번호</TableHead>
                          <TableCell>LA260326516615</TableCell>
                          <TableHead className="text-left">설계상태</TableHead>
                          <TableCell>설계중</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHead className="text-left">보장보험료</TableHead>
                          <TableCell className="text-right">83,000원</TableCell>
                          <TableHead className="text-left">합계보험료</TableHead>
                          <TableCell className="text-right">83,000원</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="ag-theme-alpine min-h-[33.2rem] ag-border-t">
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={DummyData2}
                        columnDefs={columnDefs2}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                        }}
                        animateRows={false}
                        domLayout="normal"
                        enableCellSpan={true}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </Grid>
                </Grow>
              </TableFoldBody>
            </TableFold>
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

export default Ltpz099;
