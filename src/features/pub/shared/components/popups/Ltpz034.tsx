/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react';

import { createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Divider, Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletItem, BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import type { HealthUnderwritingRow } from '@features/NotificationTable';
import NotificationTable from '@features/NotificationTable';
import {
  ArrowDoubleIcon,
  AuditIcon,
  CircleCheckIcon,
  CloseIcon,
  ConditionalIcon,
  DiamondIcon,
  InfoBoxWarningIcon,
  RefuseIcon,
} from '@icons';

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

import { toast } from '@uiux/Sonner';
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
    field02: '대장직장용종대장직장용종대장직장용종대장직장용종대장직장용종12대장',
    field03: '무관',
    field04: 'SI경증',
  },
  {
    id: 2,
    isChecked: false,
    field01: 'M00.0',
    field02: '12123대장직장용종대장직장용종대장직장용종대장직장용종',
    field03: '10개월이내',
    field04: 'SI경증(감액)',
  },
  {
    id: 3,
    isChecked: false,
    field01: 'M00.0',
    field02: '대12312장직장용종대장직장용종대장직장용종대장직장용종대장직장용종12',
    field03: '10개월이내',
  },
  {
    id: 4,
    isChecked: false,
    field01: 'M00.0',
    field02: '대12312장직장용종대장직장용종대장직장용종대장직장용종대장직장용종12',
    field03: '10개월이내',
  },
];

/**
 * Ltpz034 컴포넌트의 Props 인터페이스
 */
interface Ltpz034Props {
  /** 팝업 활성화 여부 */
  open?: boolean;
  /** 팝업 활성화 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 최소화 여부 */
  minimized?: boolean;
  /** 최소화 상태 변경 콜백 */
  onMinimizeChange?: (minimized: boolean) => void;
  /** 등록 상태 여부 (true: 기등록 / false: 미등록) */
  isRegistered?: boolean;
  /** 일반/건강고지 테이블 로우 데이터 */
  basicRows?: HealthUnderwritingRow[];
  /** 간편고지 테이블 로우 데이터 */
  healthRows?: HealthUnderwritingRow[];
  /** 미등록 모드 시 좌측 그리드에 노출할 임시 데이터 */
  dummyRows?: DummyDataType[];
}

//일반/건강고지 데이터
const BASIC_ROWS: HealthUnderwritingRow[] = [
  {
    data: [
      {
        label: '일반고지형(5년)',
        state: '심사',
      },
    ],
  },
  {
    data: [
      {
        label: '일반고지형(5년)',
        state: '조건부',
      },
    ],
  },
  {
    data: [
      {
        label: '일반고지형(5년)',
        state: '연기',
      },
    ],
  },
  {
    data: [
      {
        label: '일반고지형(5년)',
        state: '거절',
      },
    ],
    tooltipData: [
      {
        title: '일반고지형명 판정결과',
        content: ['질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비', '질병수술비(ALL RISK)'],
      },
      {
        title: '345조건부(감액)',
        content: [
          '질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비',
          '인수판정률 사전안내 컬럼에 입력된 값 표시',
        ],
      },
    ],
  },
  {
    data: [
      {
        label: '2형(건강 6년)',
        state: '인수',
      },
    ],
  },
  {
    data: [
      {
        label: '1형(건강 5년)',
        state: '심사',
      },
    ],
  },
];
//간편고지 데이터
const HEALTH_ROWS: HealthUnderwritingRow[] = [
  {
    data: [
      {
        label: '355',
        state: '거절',
      },
      {
        label: '355(2일)',
        state: '연기',
      },
      {
        label: '',
        state: '',
      },
    ],
    tooltipData: [
      {
        title: '간편고지형명 판정결과',
        content: ['질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비', '질병수술비(ALL RISK)'],
      },
      {
        title: '345조건부(감액)',
        content: [
          '질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비',
          '인수판정률 사전안내 컬럼에 입력된 값 표시',
        ],
      },
    ],
  },
  {
    data: [
      {
        label: '345',
        state: '조건부',
      },
      {
        label: '345(2일)',
        state: '인수',
      },
      {
        label: '345(5일)',
        state: '거절',
      },
    ],
  },
  {
    data: [
      {
        label: '335',
        state: '연기',
      },
      {
        label: '',
        state: '',
      },
      {
        label: '335(5일)',
        state: '조건부',
      },
    ],
  },
  {
    data: [
      {
        label: '',
        state: '',
      },
      {
        label: '325(2일)',
        state: '거절',
      },
      {
        label: '325(5일)',
        state: '연기',
      },
    ],
  },
  {
    data: [
      {
        label: '315',
        state: '심사',
      },
      {
        label: '315(2일)',
        state: '조건부',
      },
      {
        label: '315(5일)',
        state: '인수',
      },
    ],
  },
  {
    data: [
      {
        label: '',
        state: '',
      },
      {
        label: '305(2일)',
        state: '연기',
      },
      {
        label: '305(5일)',
        state: '심사',
      },
    ],
  },
  {
    data: [
      {
        label: '',
        state: '',
      },
      {
        label: '305(2일)',
        state: '연기',
      },
      {
        label: '305(5일)',
        state: '심사',
      },
    ],
    tooltipData: [
      {
        title: '간편고지형명 판정결과',
        content: ['질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비', '질병수술비(ALL RISK)'],
      },
      {
        title: '345조건부(감액)',
        content: [
          '질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비',
          '인수판정률 사전안내 컬럼에 입력된 값 표시',
        ],
      },
      {
        title: '345조건부(감액)',
        content: [
          '질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비',
          '인수판정률 사전안내 컬럼에 입력된 값 표시',
        ],
      },
    ],
  },
  {
    data: [
      {
        label: '',
        state: '',
      },
      {
        label: '305(2일)',
        state: '연기',
      },
      {
        label: '305(5일)',
        state: '심사',
      },
    ],
  },
  {
    data: [
      {
        label: '305',
        state: '거절',
      },
      {
        label: '',
        state: '',
      },
      {
        label: '',
        state: '',
      },
    ],
  },
];

interface AdditionalNotice {
  label: string;
  type: 'refuse' | 'approve';
}

// <RefuseIcon /> 거절
// <DiamondIcon /> 연기
// <AuditIcon /> 심사
// <ConditionalIcon /> 조건부
// <CircleCheckIcon />인수

const additionalNotices: AdditionalNotice[] = [
  { label: '고혈압', type: 'refuse' },
  { label: '당뇨', type: 'approve' },
  { label: '고혈압&당뇨', type: 'refuse' },
];

interface UnderwritingBadgeProps {
  id: string;
  label: string;
  onRemove: (id: string) => void;
}

/**
 * UnderwritingBadge 컴포넌트
 * - 선택된 고지유형을 하단 영역에 노출하는 뱃지
 * - 클릭된 오리지널 셀 위치를 추적하여 해당 좌표에서 최종 위치로 미끄러져 들어오는(slide) 마이크로 애니메이션을 제공
 */
const UnderwritingBadge = ({ id, label, onRemove }: UnderwritingBadgeProps) => {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = React.useState(false);
  const badgeRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const badgeEl = badgeRef.current;
    const sourceEl = document.getElementById(`grow-underwriting-${id}`);
    if (badgeEl && sourceEl) {
      const badgeRect = badgeEl.getBoundingClientRect();
      const sourceRect = sourceEl.getBoundingClientRect();

      // 클릭된 원본 셀의 중심 좌표
      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;

      // 뱃지 목적지의 원래 중심 좌표
      const badgeCenterX = badgeRect.left + badgeRect.width / 2;
      const badgeCenterY = badgeRect.top + badgeRect.height / 2;

      // 오프셋 계산 (원래 위치로 가기 전의 시작 translate 값)
      const dx = Math.round(sourceCenterX - badgeCenterX);
      const dy = Math.round(sourceCenterY - badgeCenterY);

      setOffset({ x: dx, y: dy });
      setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, [id]);

  return (
    <div
      ref={badgeRef}
      className={`inline-flex flex-row items-center gap-1 bg-[#2E3B4E] text-[#FFF] rounded-full  text-[1.2rem] py-[0.5rem] px-[0.6rem] transition-opacity duration-150 ${
        isReady ? 'animate-slide-from-click' : 'opacity-0'
      }`}
      style={
        {
          '--dx': `${offset.x}px`,
          '--dy': `${offset.y}px`,
        } as React.CSSProperties
      }
    >
      <span className="font-bold">{label}</span>
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="flex items-center justify-center rounded-full hover:bg-gray-700 focus:outline-none ml-1"
      >
        <CloseIcon size={10} className="text-gray-400 hover:text-[#FFF]" />
      </button>
    </div>
  );
};

const CustomNoRowsOverlay = () => (
  <Gcol placement="cc" className="w-full h-full text-center justify-center items-center" gap={1}>
    <InfoBoxWarningIcon size={14} color="#777" />
    <Typo variant="body-sm" className="leading-normal text-[1.3rem] text-[#414141]">
      [입력/수정]을 선택하여
      <br />
      질병을 검색해 주세요.
    </Typo>
  </Gcol>
);

/**
 * Ltpz034 컴포넌트 - 고지유형찾기 팝업
 */
const Ltpz034 = ({
  open = true,
  onOpenChange,
  minimized,
  onMinimizeChange,
  isRegistered = false,
  basicRows: initialBasicRows,
  healthRows: initialHealthRows,
  dummyRows,
}: Ltpz034Props) => {
  // 최소화 로컬 상태 관리 (부모가 관리하지 않을 경우 백업)
  const [localMinimized, setLocalMinimized] = React.useState(false);
  const isMinimizedControlled = minimized !== undefined;
  const isMinimized = isMinimizedControlled ? minimized : localMinimized;

  const handleMinimizeChange = React.useCallback(
    (val: boolean) => {
      if (!isMinimizedControlled) {
        setLocalMinimized(val);
      }
      onMinimizeChange?.(val);
    },
    [isMinimizedControlled, onMinimizeChange]
  );

  // 선택된 고지유형 ID 목록 상태 관리 (최대 3개 제한)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  // 선택 개수 초과 안내 토스트 노출
  const showSelectionLimitToast = () => {
    toast.info('최대 3건의 고지유형을 선택해 주세요', { duration: 3000 });
  };

  // 일반/건강고지 데이터 가공: 각 고지유형 셀에 식별자 ID를 부여하고 선택 여부(checked)를 계산
  const basicRows = useMemo<HealthUnderwritingRow[]>(
    () =>
      (initialBasicRows ?? BASIC_ROWS).map((row, rowIndex) => ({
        ...row,
        data: row.data.map((item, colIndex) => {
          const id = item.id || `basic-${rowIndex}-${colIndex}`;
          return {
            ...item,
            id,
            checked: selectedIds.includes(id),
          };
        }),
      })),
    [initialBasicRows, selectedIds]
  );

  // 간편고지 데이터 가공: 각 고지유형 셀에 식별자 ID를 부여하고 선택 여부(checked)를 계산
  const healthRows = useMemo<HealthUnderwritingRow[]>(
    () =>
      (initialHealthRows ?? HEALTH_ROWS).map((row, rowIndex) => ({
        ...row,
        data: row.data.map((item, colIndex) => {
          const id = item.id || `health-${rowIndex}-${colIndex}`;
          return {
            ...item,
            id,
            checked: selectedIds.includes(id),
          };
        }),
      })),
    [initialHealthRows, selectedIds]
  );

  // 선택된 뱃지의 한글 라벨 조회를 빠르게 처리하기 위해 ID -> Label 형태의 룩업 테이블(Map) 캐싱
  const underwritingItemsMap = useMemo(() => {
    const map: Record<string, string> = {};
    const processRows = (rows: HealthUnderwritingRow[]) => {
      rows.forEach((row) => {
        row.data.forEach((item) => {
          if (item.id && item.label) {
            map[item.id] = item.label;
          }
        });
      });
    };
    processRows(healthRows);
    processRows(basicRows);
    return map;
  }, [healthRows, basicRows]);

  const handleCheckedChange = React.useCallback(
    (id: string, checked: boolean | 'indeterminate') => {
      if (checked === true) {
        if (selectedIds.length >= 3) {
          showSelectionLimitToast();
          return;
        }
        setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      } else {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
      }
    },
    [selectedIds]
  );

  const handleRemove = React.useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: 'KCD코드',
        field: 'field01',
        width: attributeColumnWidth(70),
        cellClass: 'text-center !flex !justify-center',
      },
      {
        headerName: '질병명',
        field: 'field02',
        flex: 1,
        cellClass: 'text-left whitespace-normal break-all justify-between',
        wrapText: true,
        autoHeight: true,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
        cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
          <Grow className="w-full min-w-0 !justify-between items-center !flex leading-[1.3]">
            <span className="">{params.value}</span>
            {params.data?.field04 && (
              <Badge color={'blue'} className="shrink-0">
                {params.data.field04}
              </Badge>
            )}
          </Grow>
        ),
      },
      {
        headerName: 'N년이내',
        field: 'field03',
        width: attributeColumnWidth(64),
        headerClass: 'bg-[#FFCCBE]',
        cellClass: 'text-center !flex !justify-center',
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange} minimized={isMinimized} onMinimizeChange={handleMinimizeChange}>
      <DialogContent
        showCloseButton
        resizable
        minimized={true}
        dim={'dark'}
        className={isRegistered ? 'w-[69.2rem]' : 'w-[76rem]'}
      >
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
          <Gcol>
            <Grow className="w-full bg-[#374151]" variant="box-round">
              <FormTable variant="head" cols={['w-1', 'w-auto']}>
                <FormRow>
                  <FormCell
                    title={
                      isRegistered ? (
                        <Badge size="md" variant="contained" className="bg-[#338CF5] text-[#FFF]">
                          등록
                        </Badge>
                      ) : (
                        <Badge size="md" variant="contained" className="bg-[#E4E7EC] text-[#414141]">
                          미등록
                        </Badge>
                      )
                    }
                  >
                    {isRegistered ? (
                      <Typo tag={'span'} weight={'bold'} variant={'body-sm'} className="text-[#FFF]">
                        김한화 32세(여)
                      </Typo>
                    ) : (
                      <Typo tag={'span'} weight={'bold'} variant={'body-sm'} className="text-[#FFF]">
                        32세(1994-02-12) / 여
                      </Typo>
                    )}
                  </FormCell>
                  {isRegistered && (
                    <FormCell title={<span className="text-[#D8DBE0]">기준일자</span>}>
                      <Grow gap={2}>
                        <span className="font-bold text-[1.3rem] text-[#FFF]">2026-02-24</span>
                        <Button variant="contained" size="sm" color={'coolgray-light'}>
                          최신정보갱신
                        </Button>
                      </Grow>
                    </FormCell>
                  )}
                </FormRow>
              </FormTable>
              {isRegistered && (
                <Button variant="outlined" size="md">
                  N년내 입원수술
                </Button>
              )}

              <Button variant="outlined" size="md">
                정보 변경
              </Button>
            </Grow>
            <Grow className="w-full" gap={2} placement="ec">
              <Typo variant={'body-sm'} weight={'bold'} className="text-[#414141]">
                범례
              </Typo>
              <Divider />
              <span className="flex items-center gap-1 text-[1.2rem]">
                <RefuseIcon size={16} />
                거절
              </span>
              <span className="flex items-center gap-1 text-[1.2rem]">
                <DiamondIcon />
                연기
              </span>
              <span className="flex items-center gap-1 text-[1.2rem]">
                <AuditIcon />
                심사
              </span>
              <span className="flex items-center gap-1 text-[1.2rem]">
                <ConditionalIcon />
                조건부
              </span>
              <span className="flex items-center gap-1 text-[1.2rem]">
                <CircleCheckIcon size={14} />
                인수
              </span>
            </Grow>
          </Gcol>
          <Grid className={isRegistered ? 'grid-cols-[18rem_1fr] gap-3' : 'grid-cols-[1fr_auto_1fr]'}>
            {isRegistered ? (
              <TableFold variant="default" className="grid grid-rows-[auto_1fr] h-full">
                <TableFoldHead title="일반/건강고지"></TableFoldHead>
                <TableFoldBody className="h-full overflow-y-auto bg-[#F2F4F7]">
                  <NotificationTable
                    healthRows={basicRows}
                    isClick={true}
                    onCheckedChange={handleCheckedChange}
                    colSpan={1}
                  />
                </TableFoldBody>
              </TableFold>
            ) : (
              <TableFold variant="default" className="grid grid-rows-[auto_1fr]">
                <TableFoldHead title="간편고지 입원/수술 정보(최대4건)">
                  <Button variant={'outlined'} color={'gray'} size={'md'}>
                    입력/수정
                  </Button>
                </TableFoldHead>
                <TableFoldBody className="grid h-full grid-flow-col">
                  <Grid className="grid-rows-[1fr_auto] h-full grid-rows-[1fr]">
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={CustomNoRowsOverlay}
                        rowData={dummyRows ?? DUMMY_DATA}
                        columnDefs={columnDefs}
                        defaultColDef={{
                          sortable: false,
                          resizable: true,
                        }}
                        rowSelection={{
                          mode: 'multiRow',
                          checkboxes: true,
                          enableClickSelection: false,
                          headerCheckbox: false,
                        }}
                        selectionColumnDef={{
                          headerName: '선택',
                          width: 30,
                          cellClass: 'text-center editable-cell',
                        }}
                        domLayout="normal"
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
            )}
            {!isRegistered && (
              <Grow className="w-full h-full flex justify-center items-center ">
                <ArrowDoubleIcon className="rotate-[270deg]" color="#FF5C2E" size={24} />
              </Grow>
            )}
            <TableFold variant="default" className="grid grid-rows-[auto_1fr]">
              <TableFoldHead title="간편고지">
                <Grow gap={2} className="items-center">
                  <Typo variant={'body-sm'} weight={'bold'} className="text-[#414141]">
                    추가고지
                  </Typo>
                  <Divider />
                  {additionalNotices.map((item) => (
                    <span key={item.label} className="flex items-center gap-[0.2rem] text-[1.2rem]">
                      {item.label}
                      {item.type === 'refuse' ? <RefuseIcon size={16} /> : <CircleCheckIcon size={14} />}
                    </span>
                  ))}
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <NotificationTable healthRows={healthRows} isClick={true} onCheckedChange={handleCheckedChange} />
              </TableFoldBody>
            </TableFold>
          </Grid>
          {/* 선택 항목 노출 영역 */}
          <Grow className="w-full border border-[#FF5C2E] rounded-[0.8rem] px-3 py-3 flex items-center justify-between bg-[#FFF] h-[5.6rem] p-[1rem]">
            <Grow className="flex items-center justify-between gap-2 flex-1">
              {selectedIds.length > 0 && (
                <Typo className="text-[1.2rem] font-bold text-[#414141] shrink-0">고지유형 선택</Typo>
              )}
              <Grow className="flex-wrap gap-[0.1rem] justify-start flex-1" id="selected-underwriting-container">
                {selectedIds.length > 0 ? (
                  selectedIds.map((id) => {
                    const label = underwritingItemsMap[id];
                    if (!label) return null;
                    return <UnderwritingBadge key={id} id={id} label={label} onRemove={handleRemove} />;
                  })
                ) : (
                  <Typo color="default" icon="info" tag="p" variant="body-sm" weight="normal">
                    최대 3건의 고지유형을 선택해 주세요.
                  </Typo>
                )}
              </Grow>
            </Grow>
            <Grow className="flex gap-0.5 shrink-0">
              <Button variant="contained" size="xl" color="primary">
                가능상품 보기
              </Button>
              <Button variant="contained" size="xl" color="primary">
                추천설계 이동
              </Button>
            </Grow>
          </Grow>
          {/* 주의사항 */}
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              <b>주의사항</b>
            </Typo>
            {isRegistered ? (
              <BulletList color={'warning'} size="sm">
                <BulletListItem>
                  추천유형 안내 :
                  <em className="font-normal!">
                    일반/건강고지형은 &quot;심사가능&quot; 유형, 간편고지형은 &quot;인수가능&quot; 유형 안내
                  </em>
                  <BulletItem size="sm" type="dash" className="text-[var(--color-danger-50)]">
                    단순 비교시 고객에게 불리한 고지유형이 적용될 수 있으므로 주의
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
            ) : (
              <BulletList color={'warning'} size="sm">
                <BulletListItem>
                  추천유형 안내 :
                  <BulletItem size="sm" type="dash">
                    단순 비교시 고객에게 불리한 고지유형이 적용될 수 있으므로 주의
                    <p className="text-[var(--color-gray-70)]">
                      (유병력자일 경우라도 사고력 &middot; 가입담보에 따라 표준체/건강체로 가입가능)
                    </p>
                  </BulletItem>
                </BulletListItem>
                <BulletListItem>
                  사전심사 적용범위 : 일부 주요상품 및 주요담보만 사전심사 적용
                  <BulletList>
                    <BulletListItem size="sm" type="dash">
                      적용상품 : 더경증간편, 시그니처 여성간편, 3N5 더간편, 311 간편, 신상품 간편
                    </BulletListItem>
                    <BulletItem size="sm" type="dash">
                      적용담보 예시 : 질병후유, 암, 2대진단비, 질병입원비, 질병수술비, 상해입원비, 상해수술비
                    </BulletItem>
                  </BulletList>
                </BulletListItem>
                <BulletListItem>
                  설계가능한 상품 선정의 보조수단으로 활용바라며, 실제 심사결과와 다를 수 있음
                </BulletListItem>
              </BulletList>
            )}
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button
                variant={'outlined'}
                size={'xl'}
                color={'gray'}
                onClick={() => handleMinimizeChange(!isMinimized)}
              >
                접어두기
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

        {/* 선택한 고지유형이 클릭 지점으로부터 날아오는 slide 효과를 정의하는 스타일 */}
        <style>{`
          @keyframes slideFromClick {
            0% {
              transform: translate(var(--dx, 0px), var(--dy, 0px)) scale(0.5) !important;
              opacity: 0.3;
            }
            100% {
              transform: translate(0, 0) scale(1) !important;
              opacity: 1;
            }
          }
          .animate-slide-from-click {
            animation: slideFromClick 0.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz034;
