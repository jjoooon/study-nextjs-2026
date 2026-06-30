/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { X } from 'lucide-react';
import React, { useMemo } from 'react';

import Ltpa030table, { HealthUnderwritingRow } from '@/features/pub/ispl/ncMtt/components/Ltpa030table';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ArrowDoubleIcon } from '@icons';

import { Badge } from '@uiux/Badge';
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

type DummyDataType = {
  id: number;
  isChecked?: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04?: string | number;
};

const DUMMY_DATA: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field01: 'M00.0',
    field02: '대장직장용종대장직장용종대장직장용종대장직장용종대장직장용종12',
    field03: '무관',
    field04: 'SI경증',
  },
  { id: 2, isChecked: false, field01: 'M00.0', field02: '척추 염좌', field03: '10개월', field04: 'SI경증(감액)' },
  { id: 3, isChecked: false, field01: 'M00.0', field02: '후천성 백내장', field03: '10개월' },
  { id: 4, isChecked: false, field01: 'M00.0', field02: '치핵/치질', field03: '10년내' },
  { id: 5, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염', field03: '10개월' },
  { id: 6, isChecked: false, field01: 'M00.0', field02: '급성인지 만성인지 명시되지 않은 기관지염', field03: '10개월' },
  { id: 7, isChecked: false, field01: 'M00.0', field02: '후천성 백내장', field03: '10개월' },
  { id: 8, isChecked: false, field01: 'M00.0', field02: '치핵/치질', field03: '10개월' },
  { id: 9, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염', field03: '10개월' },
  {
    id: 10,
    isChecked: false,
    field01: 'M00.0',
    field02: '급성인지 만성인지 명시되지 않은 기관지염',
    field03: '10개월',
  },
  { id: 11, isChecked: false, field01: 'M00.0', field02: '치핵/치질', field03: '10개월' },
  { id: 12, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염', field03: '10개월' },
  {
    id: 13,
    isChecked: false,
    field01: 'M00.0',
    field02: '급성인지 만성인지 명시되지 않은 기관지염',
    field03: '10개월',
  },
];

interface Ltpz034Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  minimized?: boolean;
  onMinimizeChange?: (minimized: boolean) => void;
}

const UNDERWRITING_ITEMS_MAP: Record<string, string> = {
  health1: '11형(건강7년)',
  health2: '12형(건강6년)',
  health7: '3형(건강7년)',
  health8: '2형(건강6년)',
};

const Ltpz034 = ({ open = true, onOpenChange, minimized, onMinimizeChange }: Ltpz034Props) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const handleCheckedChange = React.useCallback((id: string, checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) => {
      if (checked === true) {
        if (prev.length >= 3) {
          return prev;
        }
        return prev.includes(id) ? prev : [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  }, []);

  const handleRemove = React.useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const healthRows = useMemo<HealthUnderwritingRow[]>(
    () => [
      {
        data: [
          {
            id: 'health1',
            label: '11형(건강7년)',
            state: true,
            checked: selectedIds.includes('health1'),
            disabled: selectedIds.length >= 3 && !selectedIds.includes('health1'),
          },
          { id: '' },
          {
            id: 'health2',
            label: '12형(건강6년)',
            state: true,
            checked: selectedIds.includes('health2'),
            disabled: selectedIds.length >= 3 && !selectedIds.includes('health2'),
          },
        ],
        tooltipData: [
          {
            title: '$간편고지형명 판정결과$',
            content: '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $질병수술비(ALL RISK)$',
          },
          {
            title: '$345조건부(감액)$',
            content:
              '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰 사전안내 컬럼에 입력된 값 표시$',
          },
          {
            title: '$345(2일)조건부(감액)$',
            content:
              '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰 사전안내 컬럼에 입력된 값 표시$',
          },
        ],
      },
      {
        data: [
          {
            id: 'health7',
            label: '3형(건강7년)',
            state: true,
            checked: selectedIds.includes('health7'),
            disabled: selectedIds.length >= 3 && !selectedIds.includes('health7'),
          },
          { id: '' },
          {
            id: 'health8',
            label: '2형(건강6년)',
            state: true,
            checked: selectedIds.includes('health8'),
            disabled: selectedIds.length >= 3 && !selectedIds.includes('health8'),
          },
        ],
        tooltipData: [
          {
            title: '$간편고지형명 판정결과$',
            content: '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $질병수술비(ALL RISK)$',
          },
          {
            title: '$345조건부(감액)$',
            content:
              '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰 사전안내 컬럼에 입력된 값 표시$',
          },
          {
            title: '$345(2일)조건부(감액)$',
            content:
              '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰 사전안내 컬럼에 입력된 값 표시$',
          },
        ],
      },
    ],
    [selectedIds]
  );

  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: 'KCD코드',
        field: 'field01',
        width: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '질병명',
        field: 'field02',
        flex: 1,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
        cellRenderer: (params: { value: string | number; data?: DummyDataType }) => (
          <Grow className="w-full min-w-0 justify-between">
            <span className="overflow-hidden whitespace-nowrap text-clip">{params.value}</span>
            {params.data?.field04 && <Badge color={'blue'}>{params.data.field04}</Badge>}
          </Grow>
        ),
      },
      {
        headerName: 'N년 이상',
        field: 'field03',
        width: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange} minimized={minimized} onMinimizeChange={onMinimizeChange}>
      <DialogContent showCloseButton resizable size="xl" minimized={true}>
        <DialogHeader>
          <DialogTitle>
            <Typo tag="strong" variant="heading-lg">
              고지유형찾기
            </Typo>
            <Typo tag="p" variant="body-xl">
              (LTPZ034)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid grid-rows-[auto_1fr]">
          <Grow className="w-full bg-[#374151]" variant="box-round">
            <FormTable variant="head" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell
                  title={
                    <Badge size="md" variant="contained" className="bg-[#338CF5] text-[#FFF]">
                      등록
                    </Badge>
                  }
                >
                  <span className="font-bold text-[1.3rem] text-[#FFF]">김한화 32세(여)</span>
                </FormCell>
                <FormCell title={<span className="text-[#FFF]">기준일자</span>}>
                  <Grow gap={1}>
                    <span className="font-bold text-[1.3rem] text-[#FFF]">2026-02-24</span>
                    <Button variant="contained" size="sm" color={'coolgray-light'}>
                      재조회
                    </Button>
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
            <Button variant="outlined" size="md">
              N년내 입원수술
            </Button>
            <Button variant="outlined" size="md">
              정보 변경
            </Button>
          </Grow>
          <Grid className="grid-cols-[1fr_auto_1fr]">
            <TableFold className="grid grid-rows-[auto_1fr]">
              <TableFoldHead title="입원/수술 정보(최대4건)">
                <Button variant={'outlined'} color={'gray'} size={'md'}>
                  입력/수정
                </Button>
              </TableFoldHead>
              <TableFoldBody className="grid h-full grid-flow-col">
                <Grid className="grid-rows-[1fr_auto] h-full grid-rows-[1fr]">
                  <div className="ag-theme-alpine min-h-[33rem]">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      noRowsOverlayComponentParams={{
                        message: '[입력/수정]을 선택하여 질병을 검색해 주세요.',
                      }}
                      rowData={DUMMY_DATA}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: false,
                        resizable: true,
                      }}
                      rowSelection={{
                        mode: 'multiRow',
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        width: 30,
                        cellClass: 'text-center editable-cell',
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <Grow placement="ee">
                    <Button variant={'outlined'} color={'gray'} size={'md'}>
                      초기화
                    </Button>
                    <Button variant={'contained'} size={'md'}>
                      고지유형 확인
                    </Button>
                  </Grow>
                </Grid>
              </TableFoldBody>
            </TableFold>
            <Grow className="w-full h-full flex justify-center items-center ">
              <ArrowDoubleIcon className="rotate-[270deg]" color="#FF5C2E" size={24} />
            </Grow>

            <Ltpa030table healthRows={healthRows} isClick={true} onCheckedChange={handleCheckedChange} />
          </Grid>
          <Grow className="w-full border border-[#FF5C2E] rounded-[0.8rem] px-5 py-3 flex items-center justify-between gap-4 bg-[#FFF] mt-4">
            <Grow className="flex items-center gap-4 flex-1">
              <Typo className="text-[1.3rem] font-bold text-[#FF5C2E] shrink-0">고지유형 선택</Typo>
              <Grow className="flex-wrap gap-2 justify-start py-1 flex-1">
                {selectedIds.map((id) => {
                  const label = UNDERWRITING_ITEMS_MAP[id];
                  if (!label) return null;
                  return (
                    <div
                      key={id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2E3B4E] text-[#FFF] rounded-full text-[1.2rem] font-medium"
                    >
                      <span>{label}</span>
                      <button
                        type="button"
                        onClick={() => handleRemove(id)}
                        className="flex items-center justify-center p-0.5 rounded-full hover:bg-gray-700 focus:outline-none"
                      >
                        <X size={12} className="text-gray-400 hover:text-[#FFF]" />
                      </button>
                    </div>
                  );
                })}
              </Grow>
            </Grow>
            <Grow className="flex gap-2 shrink-0">
              <Button variant="contained" size="lg" color="primary">
                가능상품 보기
              </Button>
              <Button variant="contained" size="lg" color="primary">
                추천설계 이동
              </Button>
            </Grow>
          </Grow>
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

export default Ltpz034;
