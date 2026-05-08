'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { ResetIcon } from '@/shared/components/icons/CommonIcons';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';

// 담보패키지 dummy data
type DummyDataType1 = {
  id: number;
  isCheck: boolean | false;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  isDetails?: boolean;
  level?: 2 | 3;
};
const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    isCheck: true,
    field01: '사용',
    field02: '180일한도',
    field03: '10년 갱신',
  },
  {
    id: 2,
    isCheck: false,
    field01: '사용',
    field02: '180일한도',
    field03: '10년 갱신',
  },
  {
    id: 3,
    isCheck: false,
    field01: '지원',
    field02: '180일한도',
    field03: '5년 갱신',
  },
  {
    id: 4,
    isCheck: false,
    field01: '지원',
    field02: '180일한도',
    field03: '10년 갱신',
  },
  {
    id: 6,
    isCheck: false,
    field01: '암주요',
    field02: '기본형',
    field03: '',
    level: 2,
  },
  {
    id: 7,
    isCheck: false,
    field01: '통합암주요',
    field02: '체중형',
    field03: '',
    level: 2,
  },
  {
    id: 9,
    isCheck: false,
    field01: '운전자비용',
    field02: '',
    field03: '',
    level: 2,
  },
];

// 담보 dummy data
type DummyDataType2 = {
  id: number;
  isCheck: boolean | null;
  field01: string | number;
};
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isCheck: true,
    field01: '전이암특정치료비(종합병원)(각연간1회한)',
  },
  {
    id: 2,
    isCheck: null,
    field01: '- 전이암특정치료비(종합병원)(각연간1회한)',
  },
  {
    id: 3,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)',
  },
  {
    id: 4,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)',
  },
  {
    id: 5,
    isCheck: true,
    field01: '전이암특정치료비(암전문의료기관(상급종합병원등))(각연간1회한)',
  },
  {
    id: 7,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 8,
    isCheck: null,
    field01: ' - 전이암특정치료비(항암약물치료)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 9,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환통합치료비(연간1억원한도)',
  },
  {
    id: 10,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환통합치료비(연간5천만원한도)',
  },
  {
    id: 11,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간2천만원한도)',
  },
  {
    id: 12,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간1천만원한도)',
  },
];

const Ltpz020 = () => {
  const CombinedConstructionHeader = () => {
    const headerAreaStyle: React.CSSProperties = {
      width: 'calc(100% + (var(--ag-cell-horizontal-padding) * 2))',
    };

    return (
      <div className="h-full w-full overflow-hidden" style={headerAreaStyle}>
        <div className="flex h-full w-full items-center justify-center text-center">구분</div>
      </div>
    );
  };

  const CombinedConstructionCell = ({ data }: ICellRendererParams<DummyDataType1>) => {
    const field01 = data?.field01 ?? '';
    const field02 = data?.field02 ?? '';
    const field03 = data?.field03 ?? '';
    const level = data?.level ?? 3;

    // 레벨 2: field02가 있으면 2칸(50/50), 없으면 1칸(전체)
    if (level === 2) {
      if (field02) {
        return (
          <div className="grid h-full grid-cols-2">
            <div className="flex min-h-[2.5rem] h-[3rem] items-center justify-center border-r border-(--ag-border-color) px-2 py-0 text-center">
              {field01}
            </div>
            <div className="flex min-h-[2.5rem] h-[3rem] items-center justify-center px-2 text-center">{field02}</div>
          </div>
        );
      }
      return (
        <div className="flex h-full min-h-[2.5rem] h-[3rem] w-full items-center justify-center px-2 text-center">
          {field01 || '\u00A0'}
        </div>
      );
    }

    // 레벨 3 (기본): 3칸
    return (
      <div className="grid h-full grid-cols-3">
        <div className="flex min-h-[2.5rem] h-[3rem] items-center justify-center border-r border-(--ag-border-color) px-2 py-0 text-center">
          {field01}
        </div>
        <div className="flex min-h-[2.5rem] h-[3rem] items-center justify-center border-r border-(--ag-border-color) px-2 py-0 text-center">
          {field02}
        </div>
        <div className="flex min-h-[2.5rem] h-[3rem] items-center justify-center px-2 text-center">{field03}</div>
      </div>
    );
  };

  const FullWidthIsDetailsRenderer = ({ data }: ICellRendererParams<DummyDataType1>) => {
    const content = String(data?.field01 ?? data?.field02 ?? data?.field03 ?? '\u00A0');
    return (
      <div className="flex h-full w-full min-h-[2.5rem] items-center justify-center px-2 text-center">{content}</div>
    );
  };

  const columnDefs1: ColDef<DummyDataType1>[] = [
    {
      headerName: '구분',
      flex: 1,
      autoHeight: true,
      wrapText: true,
      cellClass: 'p-0! flex',
      headerComponent: CombinedConstructionHeader,
      cellRenderer: CombinedConstructionCell,
    },
  ];
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left truncate',
      tooltipValueGetter: (params) => String(params.data?.field01 ?? ''),
    },
  ];

  const [rowData1] = React.useState<DummyDataType1[]>(DummyData1);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  // 검수:체크시 트리구조 열림.
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              보장패키지 선택()
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full h--full" variant="box-round" placement={'bwe'}>
            <Grow>
              <RadioGroup className="gap-1" onValueChange={() => {}} width="full" defaultValue="간병인">
                {[
                  { value: '간병인', label: '간병인' },
                  { value: '암주요', label: '암주요' },
                  { value: '표적항암', label: '표적항암' },
                  { value: '1인실', label: '1인실' },
                  { value: '운전자비용', label: '운전자비용' },
                  { value: '패키지명', label: '패키지명' },
                ].map((option) => (
                  <RadioGroupItem value={option.value} variant="button" key={option.value}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </Grow>
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
          <Grow placement="ss" className="w-full h-full" gap={5}>
            <TableFold variant={'default'} className="w-[40%] shrink-0 h-full">
              <TableFoldHead title="담보패키지" />
              <TableFoldBody>
                <div className="ag-theme-alpine min-h-[30rem]">
                  <AgGridReact<DummyDataType1>
                    // getRowId 적용: id 필드를 고유 식별자로 사용
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData1}
                    columnDefs={columnDefs1}
                    enableCellSpan={true}
                    isFullWidthRow={(params) => params.rowNode.data?.isDetails === true}
                    fullWidthCellRenderer={FullWidthIsDetailsRenderer}
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: false,
                      checkboxes: (params) => params.data?.isCheck !== null,
                      hideDisabledCheckboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      cellClass: 'text-center editable-cell',
                      width: 40,
                    }}
                    domLayout="normal"
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold variant={'default'} className="h-full">
              <TableFoldHead title="담보" />
              <TableFoldBody>
                <div className="ag-theme-alpine min-h-[30rem]">
                  <AgGridReact<DummyDataType2>
                    // getRowId 적용: id 필드를 고유 식별자로 사용
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    enableCellSpan={true}
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: (params) => params.data?.isCheck !== null,
                      hideDisabledCheckboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      width: 40,
                      cellClass: 'editable-cell',
                    }}
                    tooltipShowDelay={0}
                    tooltipHideDelay={9999}
                    tooltipMouseTrack={true}
                    alwaysShowVerticalScroll={true}
                    domLayout="normal"
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                선택
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

export default Ltpz020;
