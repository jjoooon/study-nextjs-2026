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
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletItem, BulletList, BulletListItem } from '@common/BulletList';
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

const Ltpz034 = ({ open = true, onOpenChange, minimized, onMinimizeChange }: Ltpz034Props) => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [badgeOffsets, setBadgeOffsets] = React.useState<Record<string, { x: number; y: number }>>({});

  const healthRows = useMemo<HealthUnderwritingRow[]>(
    () => [
      {
        data: [
          {
            id: 'health1',
            label: '11형(건강7년)',
            state: '심사',
            checked: selectedIds.includes('health1'),
          },
          { id: '' },
          {
            id: 'health2',
            label: '12형(건강6년)',
            state: '연기',
            checked: selectedIds.includes('health2'),
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
            state: '거절',
            checked: selectedIds.includes('health7'),
          },
          { id: '' },
          {
            id: 'health8',
            label: '2형(건강6년)',
            state: '연기',
            checked: selectedIds.includes('health8'),
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

  const underwritingItemsMap = useMemo(() => {
    const map: Record<string, string> = {};
    healthRows.forEach((row) => {
      row.data.forEach((item) => {
        if (item.id && item.label) {
          map[item.id] = item.label;
        }
      });
    });
    return map;
  }, [healthRows]);

  const handleCheckedChange = React.useCallback(
    (id: string, checked: boolean | 'indeterminate') => {
      if (checked === true) {
        if (selectedIds.length >= 3) {
          return;
        }

        // Toggling on -> Capture coordinate from the target element using its custom ID
        const sourceEl = document.getElementById(`grow-underwriting-${id}`);
        const destEl = document.getElementById('selected-underwriting-container');
        if (sourceEl && destEl) {
          const rect = sourceEl.getBoundingClientRect();
          const destRect = destEl.getBoundingClientRect();

          // Estimate target position based on existing badges
          const existingCount = selectedIds.length;
          const estimatedBadgeWidth = 110;
          const targetX = destRect.left + existingCount * estimatedBadgeWidth;
          const targetY = destRect.top;

          const dx = rect.left - targetX;
          const dy = rect.top - targetY;

          setBadgeOffsets((prev) => ({
            ...prev,
            [id]: { x: dx, y: dy },
          }));
        }

        setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      } else {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        setBadgeOffsets((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    },
    [selectedIds]
  );

  const handleRemove = React.useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setBadgeOffsets((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

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
                  const label = underwritingItemsMap[id];
                  if (!label) return null;
                  const offset = badgeOffsets[id] || { x: 0, y: 0 };
                  return (
                    <Grow
                      key={id}
                      className="animate-drop-in-reverse inline-flex items-center gap-1.5 px-3 bg-[#2E3B4E] text-[#FFF] rounded-full text-[1.2rem] font-medium"
                      style={
                        {
                          '--dx': `${offset.x}px`,
                          '--dy': `${offset.y}px`,
                        } as React.CSSProperties
                      }
                    >
                      <span>{label}</span>
                      <button
                        type="button"
                        onClick={() => handleRemove(id)}
                        className="flex items-center justify-center p-0.5 rounded-full hover:bg-gray-700 focus:outline-none"
                      >
                        <X size={12} className="text-gray-400 hover:text-[#FFF]" />
                      </button>
                    </Grow>
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
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              <b>주의사항</b>
            </Typo>
            <BulletList color={'warning'} size="sm">
              <BulletListItem>
                추천유형 안내 :
                <em>일반/건강고지형은 &quot;심사가능&quot; 유형, 간편고지형은 &quot;인수가능&quot; 유형 안내</em>
                <BulletItem size="sm" type="dash" className="text-[var(--color-danger-50)]">
                  <em>단순 비교시 고객에게 불리한 고지유형이 적용될 수 있으므로 주의</em>
                  <p className="text-[var(--color-gray-70)]">
                    (유병력자일 경우라도 사고력 &middot; 가입담보에 따라 표준체/건강체로 가입가능)
                  </p>
                </BulletItem>
              </BulletListItem>
              <BulletListItem>
                사전심사 적용범위 : 일부 주요상품 및 주요담보만 사전심사 적용
                <BulletList>
                  <BulletListItem size="sm" type="dash">
                    <Grow placement="ss">
                      적용상품 :
                      <BulletList>
                        <BulletItem size="sm" before="①" type="symbols">
                          건강/일반 - 시그니처 여성건강, 한아름, 굿밸런스, 0540, 신상품
                        </BulletItem>
                      </BulletList>
                    </Grow>
                  </BulletListItem>
                  <BulletItem size="sm" type="dash">
                    적용담보 예시 : 질병후유, 암, 2대진단비, 질병입원비, 질병수술비, 상해입원비, 상해수술비
                  </BulletItem>
                  <BulletItem size="sm" type="dash">
                    활용정보 : 보험금지급정보
                  </BulletItem>
                </BulletList>
              </BulletListItem>
              <BulletListItem>
                설계상품 &middot; 고지유형 선정의 보조수단으로 활용바라며, 실제 심사결과와 다를 수 있음
              </BulletListItem>
            </BulletList>
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

        {/* 애니메이션 스타일 */}
        <style>{`
          @keyframes dropInReverse {
            0% {
              transform: translate(var(--dx), var(--dy)) scale(1.15);
              opacity: 0.3;
            }
            15% {
              transform: translate(calc(var(--dx) * 0.85), calc(var(--dy) * 0.85 - 30px)) scale(1.2);
              opacity: 0.8;
            }
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
          }
          .animate-drop-in-reverse {
            animation: dropInReverse 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz034;
