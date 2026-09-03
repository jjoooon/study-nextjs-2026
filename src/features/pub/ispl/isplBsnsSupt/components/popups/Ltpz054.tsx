/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import '@/shared/lib/agGridPub';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-enterprise';
import type { CellDoubleClickedEvent, ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

type DummyData1Type = {
  id: number;
  num: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: string | number;
};
type DummyData2Type = {
  id: number;
  num: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: string | number;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    num: 1,
    field1: '청약서(계약자, 주피용)',
    field2: 1,
    field3: 1,
    field4: '김*화',
    field5: '2026-04-21 14:41',
    field6: '박한화(9091999)',
    field7: '',
  },
  {
    id: 2,
    num: 2,
    field1: '청약서(계약자, 주피용)',
    field2: 1,
    field3: 1,
    field4: '김***화화화화',
    field5: '2026-04-21 14:41',
    field6: '박한화박한화박한화박한화(9091999)',
    field7:
      '비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.',
  },
  {
    id: 3,
    num: 3,
    field1:
      '청약서(계약자, 주피용청약서(계약자, 주피용청약서(계약자, 주피용청약서(계약자, 주피용청약서(계약자, 주피용청약서(계약자, 주피용청약서(계약자, 주피용청약서(계약자, 주피용청약서(계약자, 주피용)',
    field2: 1,
    field3: 1,
    field4: '김*화',
    field5: '2026-04-21 14:41',
    field6: '박한화(9091999)',
    field7: '',
  },
];
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    num: 1,
    field1: '청약서(계약자, 주피용)',
    field2: 1,
    field3: 1,
    field4: '김*화',
    field5: '2026-04-21 14:41',
    field6: '박한화(9091999)',
    field7: '',
  },
  {
    id: 2,
    num: 2,
    field1: '청약서(계약자, 주피용)',
    field2: 1,
    field3: 1,
    field4: '김***화화화화',
    field5: '2026-04-21 14:41',
    field6: '박한화박한화박한화(9091999)',
    field7:
      '비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.비고입니다. 비고입니다.',
  },
  {
    id: 3,
    num: 3,
    field1: '청약서(계약자, 주피용)',
    field2: 1,
    field3: 1,
    field4: '김*화',
    field5: '2026-04-21 14:41',
    field6: '박한화(9091999)',
    field7: '',
  },
];
const Ltpz054 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const handleCellDoubleClicked = (event: CellDoubleClickedEvent<DummyData1Type>) => {
    if (event.column?.getColId() === 'field1') {
      alert('문서명 더블클릭:');
    }
  };
  const handleCellDoubleClicked2 = (event: CellDoubleClickedEvent<DummyData2Type>) => {
    if (event.column?.getColId() === 'field1') {
      alert('문서명 더블클릭:');
    }
  };

  const columnDefs: ColDef<DummyData1Type>[] = [
    {
      headerName: '순번',
      field: 'num',
      width: attributeColumnWidth(36),
      cellClass: `text-center `,
    },
    {
      headerName: '문서명',
      field: 'field1',
      flex: 10,
      cellClass: `text-left`,
      tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field1' }),
    },
    {
      headerName: '출력순번',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center `,
    },
    {
      headerName: '발행순번',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center `,
    },
    {
      headerName: '고객명',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field4' }),
    },
    {
      headerName: '스캔일시',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(110),
      cellClass: `text-center bg-[#E9FEF2]`,
    },
    {
      headerName: '스캔처리자',
      field: 'field6',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: `text-center`,
      tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field6' }),
    },
    {
      headerName: '비고',
      field: 'field7',
      flex: 3,
      cellClass: `text-center`,
      tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field7' }),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              신계약 등록문서 목록조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ054)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        {/* 2026.05.27 */}
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'} gap={6}>
            <FormTable className="flex" variant={'none'} lineTop={false} cols={['w-1', 'w-1', 'w-1', 'w-auto']}>
              <FormRow>
                <FormCell title={'가입설계번호'} tdClassName="grid grid-cols-[auto_auto_auto_1fr] gap-1">
                  <Input width={'quoteNo'} value={'LA123456789012'} required />
                  -
                  <Input width={26} value={'1'} readOnly />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                </FormCell>
                <FormCell title={'상품명'}>
                  <Input width={'full'} variant={'info'} value={'무배당 1등 엄마의 똑똑한 자녀보험 1404'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
              <Checkbox
                color="primary"
                errorMsg="선택은 필수입니다."
                errorPs="bl"
                onCheckedChange={() => {}}
                size="lg"
                variant="default"
              >
                <span className="flex w-[3rem]">새창</span>
              </Checkbox>
              <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                조회
              </Button>
              <Button
                color={'gray'}
                only={'icon'}
                size={'lg'}
                variant={'outlined'}
                onClick={() => {}}
                aria-label="새로고침"
              >
                <ResetIcon />
              </Button>
            </Grow>
          </Grow>

          {/* 조회 정보 */}
          {/* 2026.05.27 */}
          <Grid placement="ss" className="w-full grid-rows-[auto_1fr-auto_1fr]" gap={3}>
            <TableFold className="grid-rows-[auto_1fr]">
              <TableFoldHead title="당사 스캔대상 발급물"></TableFoldHead>
              <TableFoldBody>
                {/* 2026-05-28 <Grid> 삭제 */}
                <div className="ag-theme-alpine inner-scroll" data-row={DummyData1.length}>
                  <AgGridReact<DummyData1Type>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData1}
                    columnDefs={columnDefs}
                    defaultColDef={{ sortable: true }}
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      width: 30,
                      cellClass: 'editable-cell',
                    }}
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    onCellDoubleClicked={handleCellDoubleClicked}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold className="grid-rows-[auto_1fr]">
              <TableFoldHead title="당사 스캔대상 비발급물">
                <Grow>
                  <Button color="primary" variant="outlined">
                    이미지불러오기
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                {/* 2026-05-28 Grid 삭제 */}
                <div className="ag-theme-alpine inner-scroll" data-row={DummyData2.length}>
                  <AgGridReact<DummyData2Type>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData2}
                    columnDefs={columnDefs}
                    defaultColDef={{ sortable: true }}
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      width: 30,
                      cellClass: 'editable-cell',
                    }}
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    onCellDoubleClicked={handleCellDoubleClicked2}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                이미지조회
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                자필비교
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                팩스&middot;홈페이지 유입문서등록
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                알림톡발송(홈페이지 문서 등록)
              </Button>
            </Grow>
            <Grow>
              <Input width={154} value={'1234567890123456789'} />
              <Input width={154} value="" />
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                수정
              </Button>
              <Button variant={'contained'} size={'xl'}>
                삭제
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

export default Ltpz054;
