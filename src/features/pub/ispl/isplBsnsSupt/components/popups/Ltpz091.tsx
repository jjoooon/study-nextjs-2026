'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createTooltipValueGetter, } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
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

import '@/shared/lib/agGridPub';
import { Input } from '@uiux/Input';
import { ResetIcon } from '@icons';


type LTPZ091Tab = { value: string; label: string };
const DATA_TABS: LTPZ091Tab[] = [
  { value: 'TAB1', label: '공지사항' },
  { value: 'TAB2', label: '상품별 심사가이드라인' },
  { value: 'TAB3', label: 'UW/자료' },
];

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'Y',
    field05: 1,
    field06: 'Y',
  },
  {
    id: 2,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 2,
    field06: 'N',
  },
  {
    id: 3,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 3,
    field06: 'N',
  },
  {
    id: 4,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 4,
    field06: 'N',
  },
  {
    id: 5,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 5,
    field06: 'N',
  },
  {
    id: 6,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 6,
    field06: 'N',
  },
  {
    id: 7,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 7,
    field06: 'N',
  },
  {
    id: 8,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 8,
    field06: 'N',
  },
  {
    id: 9,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 9,
    field06: 'N',
  },
  {
    id: 10,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 10,
    field06: 'N',
  },
  {
    id: 11,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 11,
    field06: 'N',
  },
  {
    id: 12,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 12,
    field06: 'N',
  },
  {
    id: 13,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 13,
    field06: 'N',
  },
  {
    id: 14,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 14,
    field06: 'N',
  },
  {
    id: 15,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '2026-04-01',
    field04: 'N',
    field05: 2,
    field06: 'N',
  },
];



export const Ltpz091 = ({ open, onOpenChange }: PopupBaseProps) => {
  // AgGrid Column
  const { tabs, active, setActive } = useTabs(DATA_TABS);
  // 각 컬럼별 cellRenderer 예시 명확화
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '제목',
      flex: 1,
      cellClass: 'text-left',
      cellRenderer: (params: ICellRendererParams<DummyDataType, string | number>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field01}
        </Button>
      ),
    },
    {
      headerName: '요약내용',
      flex: 1,
      field: 'field02',
      cellClass: 'text-left editable-cell',
      editable: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '등록일',
      width: 80,
      cellClass: 'text-center',
      field: 'field03',
    },
    {
      headerName: '표시여부',
      width: 60,
      field: 'field04',
      cellClass: 'text-center editable-cell',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Y', 'N'],
      },
    },
    {
      headerName: '표시순서',
      width: 60,
      cellClass: 'text-center',
      field: 'field05',
      editable: true,
    },
    {
      headerName: '다운허용',
      width: 60,
      field: 'field06',
      cellClass: 'text-center editable-cell',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Y', 'N'],
      },
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고객 직업정보(상해급수)변경안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ051)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grid className="w-full grid-rows-[auto_auto_1fr]" gap={2.5}>
            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              hasTableBelow={true}
              getValue={(t) => t.value}
              renderTab={(t) => t.label ?? t.value}
              visibleCount={4}
              removable={false}
            >
              <Grid className="grid-rows-[1fr_auto] h-full pt-3">
                {/* {active === 'TAB1' ? ( */}
                <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
                  <Grow className="w-full" variant="box-round">
                    <FormTable variant={'head'} lineTop={false} caption="">
                      <FormRow>
                        <FormCell title={'검색'}>
                          <Input width={'16rem'} value={''} />
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
                        </FormCell>
                      </FormRow>
                    </FormTable>
                    <Grow>
                      <Button color="gray" variant="outlined">파일추가</Button>
                      <Button color="gray" variant="outlined">파일수정</Button>
                      <Button color="gray" variant="outlined">파일삭제</Button>
                    </Grow>
                  </Grow>
                  <Grid className='w-full'>
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{ sortable: true, resizable: true }}
                        domLayout="autoHeight"
                        singleClickEdit={true}
                        rowSelection={{
                          mode: 'singleRow',
                          checkboxes: true,
                          enableClickSelection: false,
                        }}
                        selectionColumnDef={{
                          headerName: '선택',
                          width: 30,
                          cellClass: 'text-center editable-cell',
                        }}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />  
                    </div>    
                  </Grid>  
                </Grid>
              </Grid>
            </TabPager>
            
          </Grid>
          
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                다운로드
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
