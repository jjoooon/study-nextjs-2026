/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ColGroupDef, ICellRendererParams, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths, DatePickerCellEditor } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { ResetIcon, ZoomInIcon, ZoomOutIcon, CloseIcon } from '@icons';
import { Button } from '@uiux/Button';
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

type LTPZ091Tab = { value: string; label: string };
const DATA_TABS: LTPZ091Tab[] = [
  { value: 'TAB1', label: '공지사항' },
  { value: 'TAB2', label: '상품별 심사가이드라인' },
  { value: 'TAB3', label: 'UW자료' },
  { value: 'TAB4', label: '질병정보' },
];

type DummyDataType = {
  id: number;
  isNew?: boolean;
  field01: string | number; //제목
  field02: string | number; //주요내용
  field03: string | number; //미리보기
  field04: string | number; //등록일
  field05: string | number; //화면표시
  field06: string | number; //표시순서
  field07: string | number; //다운로드파일
  field08: string | number; //다운로드허용
  field09: string | number; //미로보기파일
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다.',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'Y',
    field06: 1,
    field07: '',
    field08: 'Y',
    field09: '미리보기 파일 주소',
  },
  {
    id: 2,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다.',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'Y',
    field06: 2,
    field07: '다운로드파일 주소',
    field08: 'Y',
    field09: '',
  },
  {
    id: 3,
    field01: '2026년 4월 심사가이드라인',
    field02: '요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다.',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'N',
    field06: 3,
    field07: '다운로드파일 주소',
    field08: 'N',
    field09: '미리보기 파일 주소',
  },
];
const DummyData2: DummyDataType[] = [
  {
    id: 1,
    field01: '2026년 4월 심사가이드라인',
    field02: '222요약내용이 노출되는 영역입니다. ',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'Y',
    field06: 1,
    field07: '',
    field08: 'Y',
    field09: '미리보기 파일 주소',
  },
  {
    id: 2,
    field01: '2026년 4월 심사가이드라인',
    field02: '2222요약내용이 노출되는 영역입니다.',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'Y',
    field06: 2,
    field07: '다운로드파일 주소',
    field08: 'Y',
    field09: '',
  },
  {
    id: 3,
    field01: '2026년 4월 심사가이드라인',
    field02: '2222요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다.',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'N',
    field06: 3,
    field07: '다운로드파일 주소',
    field08: 'N',
    field09: '미리보기 파일 주소',
  },
];
const DummyData3: DummyDataType[] = [
  {
    id: 1,
    field01: '2026년 4월 심사가이드라인',
    field02: '333요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다.',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'Y',
    field06: 1,
    field07: '',
    field08: 'Y',
    field09: '미리보기 파일 주소',
  },
  {
    id: 2,
    field01: '2026년 4월 심사가이드라인',
    field02: '3333요약내용이 노출되는 영역입니다.',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'Y',
    field06: 2,
    field07: '다운로드파일 주소',
    field08: 'Y',
    field09: '',
  },
  {
    id: 3,
    field01: '2026년 4월 심사가이드라인',
    field02: '3333요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다. 요약내용이 노출되는 영역입니다.',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'N',
    field06: 3,
    field07: '다운로드파일 주소',
    field08: 'N',
    field09: '미리보기 파일 주소',
  },
];
type DummyDataType4 = {
  id: number;
  isNew?: boolean;
  field01: string | number; //대표질병코드
  field02: string | number; //질병명
  field03: string | number; //미리보기
  field04: string | number; //등록일
  field05: string | number; //화면표시
  field06: string | number; //질병정보 파일
};
const DummyData4: DummyDataType4[] = [
  {
    id: 1,
    field01: 'A00',
    field02: '콜레라',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'Y',
    field06: '다운로드파일 주소',
  },
  {
    id: 2,
    field01: 'B22',
    field02: '장티푸스 및 파라티푸스',
    field03: '미리보기 link 주소',
    field04: '2026-04-08',
    field05: 'Y',
    field06: '',
  },
];

export type Ltpz091Props = {
  /** 어드민 사용자 여부 (기본값: true) */
  isAdmin?: boolean;
};

const Ltpz091: React.FC<Ltpz091Props> = ({ isAdmin = true }) => {
  // AgGrid Column
  const tabsData = useMemo(() => (isAdmin ? DATA_TABS : DATA_TABS.slice(0, 3)), [isAdmin]);
  const { tabs, active, setActive, replaceTabs } = useTabs(tabsData);

  const [prevIsAdmin, setPrevIsAdmin] = React.useState(isAdmin);
  if (prevIsAdmin !== isAdmin) {
    setPrevIsAdmin(isAdmin);
    replaceTabs(tabsData);
  }
  // 2026-06-01 width, flex 수정
  // 각 컬럼별 cellRenderer 예시 명확화
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(() => {
    const allCols: ColDef<DummyDataType>[] = [
      {
        headerName: '제목',
        flex: 1,
        minWidth: attributeColumnWidth(150),
        cellClass: (params) => (params.data?.isNew ? 'required text-left editable-cell' : 'text-left'),
        field: 'field01',
        editable: (params) => params.data?.isNew === true,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
        cellClassRules: {
          'ag-cell-error-border': (params) => {
            if (!params.data?.isNew) return false;
            const val = params.value;
            return val === null || val === undefined || String(val).trim() === '';
          },
        },
        cellStyle: (params) => {
          if (!params.data?.isNew) return {};
          const val = params.value;
          if (val === null || val === undefined || String(val).trim() === '') {
            return { '--error-msg': '"제목을 입력해 주세요."' } as Record<string, string>;
          }
          return {};
        },
      },
      {
        headerName: '주요내용',
        flex: 10,
        minWidth: attributeColumnWidth(300),
        field: 'field02',
        cellClass: (params) => (params.data?.isNew ? 'required text-left editable-cell' : 'text-left'),
        editable: (params) => params.data?.isNew === true,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
        cellClassRules: {
          'ag-cell-error-border': (params) => {
            if (!params.data?.isNew) return false;
            const val = params.value;
            return val === null || val === undefined || String(val).trim() === '';
          },
        },
        cellStyle: (params) => {
          if (!params.data?.isNew) return {};
          const val = params.value;
          if (val === null || val === undefined || String(val).trim() === '') {
            return { '--error-msg': '"주요내용을 입력해 주세요."' } as Record<string, string>;
          }
          return {};
        },
      },
      {
        headerName: '미리보기',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        field: 'field03',
        cellRenderer: (params: ICellRendererParams<DummyDataType, string | number>) => {
          const previewFile = params.data?.field09;
          if (previewFile === null || previewFile === undefined || String(previewFile).trim() === '') {
            return null;
          }
          return (
            <Button
              color="link"
              onClick={(e) => {
                e.stopPropagation();
                console.log(params.data?.field03);
              }}
              only="default"
              size="lg"
              variant="text"
            >
              보기
            </Button>
          );
        },
      },
      {
        headerName: '등록일',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(120),
        cellClass: 'text-center editable-cell',
        editable: true, // 날짜 직접 입력 가능
        cellEditor: DatePickerCellEditor,
      },
      {
        headerName: '화면표시',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        field: 'field05',
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['Y', 'N'],
        },
      },
      {
        headerName: '표시순서',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'required text-center editable-cell',
        field: 'field06',
        editable: true,
        // 1. 에러 테두리 조건 지정 (ag-cell-error-border: 빈값 또는 그리드 내 중복값)
        cellClassRules: {
          'ag-cell-error-border': (params) => {
            const val = params.value;
            if (val === null || val === undefined || String(val).trim() === '') {
              return true;
            }
            const currentStr = String(val).trim();
            let isDuplicate = false;
            params.api.forEachNode((node) => {
              if (node.id !== params.node.id && String(node.data?.field06 ?? '').trim() === currentStr) {
                isDuplicate = true;
              }
            });
            return isDuplicate;
          },
        },

        // 2. ColDef 내에서 동적 에러 메시지 문구 지정 (--error-msg)
        cellStyle: (params) => {
          const val = params.value;
          if (val === null || val === undefined || String(val).trim() === '') {
            return { '--error-msg': '"표시순서를 입력해 주세요."' } as Record<string, string>;
          }
          const currentStr = String(val).trim();
          let isDuplicate = false;
          params.api.forEachNode((node) => {
            if (node.id !== params.node.id && String(node.data?.field06 ?? '').trim() === currentStr) {
              isDuplicate = true;
            }
          });
          if (isDuplicate) {
            return { '--error-msg': '"동일한 표시순서가 있습니다. 표시순서를 다르게 표기해주세요."' } as Record<
              string,
              string
            >;
          }
          return {};
        },
      },
      {
        headerName: '다운로드 파일',
        flex: 1,
        minWidth: attributeColumnWidth(110),
        cellClass: 'text-center',
        field: 'field07',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field07' }),
        cellRenderer: (params: ICellRendererParams<DummyDataType, string | number>) => {
          const value = params.value;
          if (value === null || value === undefined || String(value).trim() === '') {
            return (
              <Button
                color="gray"
                size="sm"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                파일선택
              </Button>
            );
          }
          return (
            <Grow className="w-full h-full flex items-center justify-between gap-1 px-1">
              <span className="truncate text-[1.3rem]">{value}</span>
              <Button
                aria-label="파일 삭제"
                variant="none"
                only="icon"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  params.node.setDataValue('field07', '');
                }}
              >
                <CloseIcon size={12} color="var(--color-gray-60)" />
              </Button>
            </Grow>
          );
        },
      },
      {
        headerName: '다운로드허용',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        field: 'field08',
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['Y', 'N'],
        },
      },
      {
        headerName: '미리보기 파일',
        flex: 1,
        minWidth: attributeColumnWidth(110),
        cellClass: 'text-center',
        field: 'field09',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field09' }),
        cellRenderer: (params: ICellRendererParams<DummyDataType, string | number>) => {
          const value = params.value;
          if (value === null || value === undefined || String(value).trim() === '') {
            return (
              <Button
                color="gray"
                size="sm"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                파일선택
              </Button>
            );
          }
          return (
            <Grow className="w-full h-full flex items-center justify-between gap-1 px-1">
              <span className="truncate text-[1.3rem]">{value}</span>
              <Button
                aria-label="파일 삭제"
                variant="none"
                only="icon"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  params.node.setDataValue('field09', '');
                }}
              >
                <CloseIcon size={12} color="var(--color-gray-60)" />
              </Button>
            </Grow>
          );
        },
      },
    ];

    if (!isAdmin) {
      // 일반 사용자일 때: 제목, 주요내용, 미리보기, 등록일 컬럼만 노출
      return allCols.filter((col) => ['field01', 'field02', 'field03', 'field04'].includes(col.field as string));
    }

    return allCols;
  }, [attributeColumnWidth, isAdmin]);
  const columnDefs4: (ColDef<DummyDataType4> | ColGroupDef<DummyDataType4>)[] = useMemo(() => {
    const allCols: ColDef<DummyDataType4>[] = [
      {
        headerName: '대표질병코드',
        flex: 1,
        unSortIcon: true,
        minWidth: attributeColumnWidth(100),
        cellClass: (params) => (params.data?.isNew ? 'required text-left editable-cell' : 'text-left'),
        field: 'field01',
        editable: (params) => params.data?.isNew === true,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType4>({ field: 'field01' }),
        cellClassRules: {
          'ag-cell-error-border': (params) => {
            if (!params.data?.isNew) return false;
            const val = params.value;
            return val === null || val === undefined || String(val).trim() === '';
          },
        },
        cellStyle: (params) => {
          if (!params.data?.isNew) return {};
          const val = params.value;
          if (val === null || val === undefined || String(val).trim() === '') {
            return { '--error-msg': '"제목을 입력해 주세요."' } as Record<string, string>;
          }
          return {};
        },
      },
      {
        headerName: '질병명',
        flex: 10,
        minWidth: attributeColumnWidth(300),
        field: 'field02',
        cellClass: (params) => (params.data?.isNew ? 'required text-left editable-cell' : 'text-left'),
        editable: (params) => params.data?.isNew === true,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType4>({ field: 'field02' }),
        cellClassRules: {
          'ag-cell-error-border': (params) => {
            if (!params.data?.isNew) return false;
            const val = params.value;
            return val === null || val === undefined || String(val).trim() === '';
          },
        },
        cellStyle: (params) => {
          if (!params.data?.isNew) return {};
          const val = params.value;
          if (val === null || val === undefined || String(val).trim() === '') {
            return { '--error-msg': '"주요내용을 입력해 주세요."' } as Record<string, string>;
          }
          return {};
        },
      },
      {
        headerName: '미리보기',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
        field: 'field03',
        cellRenderer: (params: ICellRendererParams<DummyDataType4, string | number>) => {
          const previewFile = params.data?.field06;
          if (previewFile === null || previewFile === undefined || String(previewFile).trim() === '') {
            return null;
          }
          return (
            <Button
              color="link"
              onClick={(e) => {
                e.stopPropagation();
                console.log(params.data?.field03);
              }}
              only="default"
              size="lg"
              variant="text"
            >
              보기
            </Button>
          );
        },
      },
      {
        headerName: '등록일',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(120),
        cellClass: 'text-center editable-cell',
        editable: true, // 날짜 직접 입력 가능
        cellEditor: DatePickerCellEditor,
      },
      {
        headerName: '화면표시',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        field: 'field05',
        cellClass: 'text-center editable-cell',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['Y', 'N'],
        },
      },
      {
        headerName: '질병정보 파일',
        flex: 4,
        minWidth: attributeColumnWidth(110),
        cellClass: 'text-center',
        field: 'field06',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType4>({ field: 'field06' }),
        cellRenderer: (params: ICellRendererParams<DummyDataType4, string | number>) => {
          const value = params.value;
          if (value === null || value === undefined || String(value).trim() === '') {
            return (
              <Button
                color="gray"
                size="sm"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                파일선택
              </Button>
            );
          }
          return value;
        },
      },
    ];

    if (!isAdmin) {
      // 일반 사용자일 때: 제목, 주요내용, 미리보기, 등록일 컬럼만 노출
      return allCols.filter((col) => ['field01', 'field02', 'field03', 'field04'].includes(col.field as string));
    }

    return allCols;
  }, [attributeColumnWidth, isAdmin]);
  // 공지사항
  const [rowData1, setRowData1] = React.useState<DummyDataType[]>(DummyData);
  const gridApiRef1 = React.useRef<GridApi<DummyDataType> | null>(null);
  // 상품별 심사가이드라인
  const [rowData2, setRowData2] = React.useState<DummyDataType[]>(DummyData2);
  const gridApiRef2 = React.useRef<GridApi<DummyDataType> | null>(null);
  // UW자료
  const [rowData3, setRowData3] = React.useState<DummyDataType[]>(DummyData3);
  const gridApiRef3 = React.useRef<GridApi<DummyDataType> | null>(null);
  // 질병정보
  const [rowData4, setRowData4] = React.useState<DummyDataType4[]>(DummyData4);
  const gridApiRef4 = React.useRef<GridApi<DummyDataType4> | null>(null);

  // TAB1~TAB3 공통 탭의 rowData/setRowData/gridApiRef 가져오기
  const getCurrentTabContext = React.useCallback(() => {
    if (active === 'TAB2') {
      return { rowData: rowData2, setRowData: setRowData2, gridApiRef: gridApiRef2 };
    }
    if (active === 'TAB3') {
      return { rowData: rowData3, setRowData: setRowData3, gridApiRef: gridApiRef3 };
    }
    return { rowData: rowData1, setRowData: setRowData1, gridApiRef: gridApiRef1 };
  }, [active, rowData1, rowData2, rowData3]);

  // agGrid 행삭제 (현재 탭 대상)
  const handleDeleteRow = React.useCallback(() => {
    if (active === 'TAB4') {
      const api = gridApiRef4.current;
      if (!api) return;
      const selectedNodes = api.getSelectedNodes();
      if (selectedNodes.length === 0) return;
      const selectedIds = new Set(
        selectedNodes.map((node) => node.data?.id).filter((id): id is number => id !== undefined)
      );
      setRowData4((prev: DummyDataType4[]) => prev.filter((row: DummyDataType4) => !selectedIds.has(row.id)));
      return;
    }

    const { setRowData, gridApiRef } = getCurrentTabContext();
    const gridApi = gridApiRef.current;
    if (!gridApi) return;

    const selectedNodes = gridApi.getSelectedNodes();
    if (selectedNodes.length === 0) return;

    const selectedIds = new Set(
      selectedNodes.map((node) => node.data?.id).filter((id): id is number => id !== undefined)
    );

    setRowData((prev: DummyDataType[]) => prev.filter((row: DummyDataType) => !selectedIds.has(row.id)));
  }, [active, getCurrentTabContext]);

  // agGrid 행추가 (현재 탭 대상)
  const handleAddRow = React.useCallback(() => {
    const today = new Date().toISOString().split('T')[0];

    if (active === 'TAB4') {
      setRowData4((prev: DummyDataType4[]) => {
        const nextId = prev.reduce((maxId: number, row: DummyDataType4) => Math.max(maxId, row.id), 0) + 1;
        const newRow: DummyDataType4 = {
          id: nextId,
          isNew: true,
          field01: '',
          field02: '',
          field03: '',
          field04: today,
          field05: 'Y',
          field06: '',
        };
        return [...prev, newRow];
      });

      requestAnimationFrame(() => {
        const gridApi = gridApiRef4.current;
        if (!gridApi) return;
        const rowIndex = gridApi.getDisplayedRowCount() - 1;
        gridApi.ensureIndexVisible(rowIndex, 'bottom');
      });
      return;
    }

    const { setRowData, gridApiRef } = getCurrentTabContext();

    setRowData((prev: DummyDataType[]) => {
      const nextId = prev.reduce((maxId: number, row: DummyDataType) => Math.max(maxId, row.id), 0) + 1;
      const newRow: DummyDataType = {
        id: nextId,
        isNew: true,
        field01: '',
        field02: '',
        field03: '',
        field04: today,
        field05: 'Y',
        field06: prev.length + 1,
        field07: '',
        field08: 'Y',
        field09: '',
      };
      return [...prev, newRow];
    });

    requestAnimationFrame(() => {
      const gridApi = gridApiRef.current;
      if (!gridApi) return;
      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [active, getCurrentTabContext]);

  // 저장 시 유효성 검사 및 에러 셀 포커스 처리 (현재 탭 대상)
  const handleSave = React.useCallback(() => {
    if (active === 'TAB4') {
      const api = gridApiRef4.current;
      if (!api) return;
      api.refreshCells({ force: true });

      let targetRowIndex = -1;
      let targetColKey = '';

      api.forEachNode((node, index) => {
        if (targetRowIndex !== -1) return;
        const isNew = node.data?.isNew === true;
        const codeVal = String(node.data?.field01 ?? '').trim();
        const nameVal = String(node.data?.field02 ?? '').trim();

        if (isNew && codeVal === '') {
          targetRowIndex = index;
          targetColKey = 'field01';
          return;
        }

        if (isNew && nameVal === '') {
          targetRowIndex = index;
          targetColKey = 'field02';
          return;
        }
      });

      if (targetRowIndex !== -1 && targetColKey !== '') {
        api.ensureIndexVisible(targetRowIndex);
        api.setFocusedCell(targetRowIndex, targetColKey);
        api.startEditingCell({
          rowIndex: targetRowIndex,
          colKey: targetColKey,
        });
      } else {
        console.log(`${active} 저장 성공:`, rowData4);
      }
      return;
    }

    const { rowData, gridApiRef } = getCurrentTabContext();
    const api = gridApiRef.current;
    if (!api) return;

    // 모든 셀 에러 상태 강제 갱신
    api.refreshCells({ force: true });

    let targetRowIndex = -1;
    let targetColKey = '';

    const valueSet = new Set<string>();
    const duplicateValues = new Set<string>();

    // 1. 표시순서 중복값 수집
    api.forEachNode((node) => {
      const val = String(node.data?.field06 ?? '').trim();
      if (val !== '') {
        if (valueSet.has(val)) {
          duplicateValues.add(val);
        } else {
          valueSet.add(val);
        }
      }
    });

    // 2. 첫 번째 에러 (신규행 제목, 신규행 주요내용, 표시순서 빈값/중복) 발생 행 찾기
    api.forEachNode((node, index) => {
      if (targetRowIndex !== -1) return;

      const isNew = node.data?.isNew === true;
      const titleVal = String(node.data?.field01 ?? '').trim();
      const contentVal = String(node.data?.field02 ?? '').trim();
      const orderVal = String(node.data?.field06 ?? '').trim();

      // 신규행 제목 검사
      if (isNew && titleVal === '') {
        targetRowIndex = index;
        targetColKey = 'field01';
        return;
      }

      // 신규행 주요내용 검사
      if (isNew && contentVal === '') {
        targetRowIndex = index;
        targetColKey = 'field02';
        return;
      }

      // 표시순서 빈값/중복 검사
      if (orderVal === '' || duplicateValues.has(orderVal)) {
        targetRowIndex = index;
        targetColKey = 'field06';
        return;
      }
    });

    // 3. 에러 발생 셀로 강제 포커스 및 편집 모드(툴팁 노출) 진입
    if (targetRowIndex !== -1 && targetColKey !== '') {
      api.ensureIndexVisible(targetRowIndex);
      api.setFocusedCell(targetRowIndex, targetColKey);
      api.startEditingCell({
        rowIndex: targetRowIndex,
        colKey: targetColKey,
      });
    } else {
      console.log(`${active} 저장 성공:`, rowData);
    }
  }, [active, getCurrentTabContext, rowData4]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              장기심사가이드 더보기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ091)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            hasTableBelow={true}
            getValue={(t) => t.value}
            renderTab={(t) => t.label ?? t.value}
            visibleCount={isAdmin ? 4 : 4}
            removable={false}
          >
            {active === 'TAB1' && (
              <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
                <Grow className="w-full" variant="box-round-b">
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
                  {isAdmin && (
                    <Grow>
                      <Button color="gray" variant="outlined" onClick={handleAddRow}>
                        행추가
                        <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                      </Button>
                      <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                        행삭제
                        <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                      </Button>
                      <Button variant="outlined" className="ml-4">
                        결제관리
                      </Button>
                    </Grow>
                  )}
                </Grow>
                <Grid className="w-full">
                  <div className="ag-theme-alpine inner-scroll" data-row={rowData1.length}>
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData1}
                      columnDefs={columnDefs}
                      defaultColDef={{ sortable: true, resizable: true }}
                      singleClickEdit={true}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
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
                      getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                      onGridReady={(params) => {
                        gridApiRef1.current = params.api;
                      }}
                      onCellValueChanged={(params) => {
                        params.api.refreshCells({ force: true });
                      }}
                      onCellEditingStopped={(params) => {
                        params.api.refreshCells({ force: true });
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            )}
            {active === 'TAB2' && (
              <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
                <Grow className="w-full" variant="box-round-b">
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
                  {isAdmin && (
                    <Grow>
                      <Button color="gray" variant="outlined" onClick={handleAddRow}>
                        행추가
                        <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                      </Button>
                      <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                        행삭제
                        <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                      </Button>
                      <Button variant="outlined" className="ml-4">
                        결제관리
                      </Button>
                    </Grow>
                  )}
                </Grow>
                <Grid className="w-full">
                  <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData2}
                      columnDefs={columnDefs}
                      defaultColDef={{ sortable: true, resizable: true }}
                      singleClickEdit={true}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
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
                      getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                      onGridReady={(params) => {
                        gridApiRef2.current = params.api;
                      }}
                      onCellValueChanged={(params) => {
                        params.api.refreshCells({ force: true });
                      }}
                      onCellEditingStopped={(params) => {
                        params.api.refreshCells({ force: true });
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            )}
            {active === 'TAB3' && (
              <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
                <Grow className="w-full" variant="box-round-b">
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
                  {isAdmin && (
                    <Grow>
                      <Button color="gray" variant="outlined" onClick={handleAddRow}>
                        행추가
                        <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                      </Button>
                      <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                        행삭제
                        <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                      </Button>
                      <Button variant="outlined" className="ml-4">
                        결제관리
                      </Button>
                    </Grow>
                  )}
                </Grow>
                <Grid className="w-full">
                  <div className="ag-theme-alpine inner-scroll" data-row={rowData3.length}>
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData3}
                      columnDefs={columnDefs}
                      defaultColDef={{ sortable: true, resizable: true }}
                      singleClickEdit={true}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
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
                      getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                      onGridReady={(params) => {
                        gridApiRef3.current = params.api;
                      }}
                      onCellValueChanged={(params) => {
                        params.api.refreshCells({ force: true });
                      }}
                      onCellEditingStopped={(params) => {
                        params.api.refreshCells({ force: true });
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            )}
            {active === 'TAB4' && (
              <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
                <Grow className="w-full" variant="box-round-b">
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
                  {isAdmin && (
                    <Grow>
                      <Button color="gray" variant="outlined" onClick={handleAddRow}>
                        행추가
                        <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                      </Button>
                      <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                        행삭제
                        <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                      </Button>
                      <Button variant="outlined" className="ml-4">
                        결제관리
                      </Button>
                    </Grow>
                  )}
                </Grow>
                <Grid className="w-full">
                  <div className="ag-theme-alpine inner-scroll" data-row={rowData4.length}>
                    <AgGridReact<DummyDataType4>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={rowData4}
                      columnDefs={columnDefs4}
                      defaultColDef={{ sortable: true, resizable: true }}
                      singleClickEdit={true}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
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
                      getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                      onGridReady={(params) => {
                        gridApiRef4.current = params.api;
                      }}
                      onCellValueChanged={(params) => {
                        params.api.refreshCells({ force: true });
                      }}
                      onCellEditingStopped={(params) => {
                        params.api.refreshCells({ force: true });
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            )}
          </TabPager>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                다운로드
              </Button>
              <Button variant={'contained'} size={'xl'} onClick={handleSave}>
                저장
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

export default Ltpz091;
