'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, RowSpanParams, ICellRendererParams, CellClassParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { Grow, Gcol, FormCell, FormTable } from '@/shared/components/common';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/uiux';

ModuleRegistry.registerModules([AllCommunityModule]);

// Types
interface ProductData {
  target: string;
  underwritingLimit: string;
  violationContent: string;
  violationType: string;
  rowSpanTarget?: number;
  rowSpanLimit?: number;
}

// Mock Data
const MOCK_DATA: ProductData[] = [
  {
    target: '홍길동',
    underwritingLimit: '인수기준',
    violationContent:
      '[5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)]',
    violationType: '누적한도초과',
  },
  {
    target: '홍길동',
    underwritingLimit: '인수기준',
    violationContent:
      '[5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)]',
    violationType: '누적한도초과',
  },
  {
    target: '홍길동',
    underwritingLimit: '인수기준',
    violationContent:
      '[5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)]',
    violationType: '누적한도초과',
  },
  {
    target: '홍길동',
    underwritingLimit: '인수기준',
    violationContent:
      '[5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)]',
    violationType: '누적한도초과',
  },
  {
    target: '홍길동',
    underwritingLimit: '인수기준',
    violationContent:
      '[5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)]',
    violationType: '누적한도초과',
  },
  {
    target: '홍길동',
    underwritingLimit: '인수기준',
    violationContent:
      '[5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)][5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)]',
    violationType: '누적한도초과',
  },
  {
    target: '홍길동',
    underwritingLimit: '미인수기준',
    violationContent: '[5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)]',
    violationType: '누적한도초과',
  },
  {
    target: '홍길동',
    underwritingLimit: '미인수기준',
    violationContent: '[5대골절진단비][전체누적][인수한도: 100 만원][골절진단+통합상해진단(중등증)(합)]',
    violationType: '누적한도초과',
  },
];

/**
 * 고객 검색 결과 타입
 */
export interface UnderwritingResult {
  /** 수행된 액션 타입 */
  action: 'select' | 'cancel';
  /** 선택된 고객 (select 액션 시) */
  // TODO: @YunJunmo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customer?: any;
}

/**
 * 고객찾기 팝업 Props
 */
export interface UnderwritingProps {
  /** 팝업 제목 */
  title?: string;
  /** 팝업 설명 */
  description?: string;
  /** Promise resolve 함수 (결과 반환) */
  resolve: (result: UnderwritingResult) => void;
}

export default function UnderwritingDialog({ resolve }: UnderwritingProps) {
  // if (!open) return null;

  const columnDefs: ColDef<ProductData>[] = useMemo(
    () => [
      {
        headerName: '대상',
        field: 'target',
        width: 120,
        cellClass: 'text-center px-0!',
        sortable: false,
        filter: false,
        cellRenderer: (params: ICellRendererParams) => {
          return <div className="flex w-full h-full items-center justify-center bg-white">{params.value}</div>;
        },
      },
      {
        headerName: '인수제한',
        field: 'underwritingLimit',
        width: 120,
        cellClass: 'text-center px-0!',
        sortable: false,
        filter: false,
        cellRenderer: (params: ICellRendererParams) => {
          return <div className="flex w-full h-full items-center justify-center bg-white">{params.value}</div>;
        },
      },
      {
        headerName: '위배내용',
        field: 'violationContent',
        flex: 2,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        wrapText: true,
        autoHeight: true,
        tooltipValueGetter: (params) => {
          if (!params.data) return '';
          return params.data.violationContent;
        },
      },
      {
        headerName: '위배유형',
        field: 'violationType',
        width: 140,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <Button variant="text" className="flex w-full h-full items-center justify-center">
              {params.value}
            </Button>
          );
        },
      },
    ],
    []
  );

  /**
   * 취소 버튼 핸들러suppressRowTransform={true}
                
   */
  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  /**
   * 고객등록 버튼 핸들러
   */
  const handleRegister = () => {
    resolve({
      action: 'select',
    });
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="h-[80vh] w-[90rem] min-w-[70rem] min-h-[30rem]" resizable={true}>
        <DialogHeader>
          <DialogTitle>지침확인결과 (LTRZ384)</DialogTitle>
        </DialogHeader>

        {/* 모달 내용 - FormTable 사용 */}
        <div className="gap-8 flex-1 grid grid-rows-[auto_1fr] w-full px-[3.2rem]">
          <Gcol className="gap-2">
            <FormTable
              variant="setting"
              caption="지침확인결과 (LTRZ384) 테이블입니다."
              cols={['w-[8rem]', '', 'w-[8rem] max-w-[8rem]', '']}
            >
              <TableRow>
                <FormCell title="설계번호">
                  <Input type="text" aria-label="설계번호" defaultValue="LA283925895" />
                  <Input type="text" aria-label="설계번호" defaultValue="한화 311 간편건강보험" />
                  <Input type="text" aria-label="설계번호" />
                </FormCell>
                <FormCell title="플랜명">
                  <Input type="text" aria-label="플랜명" defaultValue="올인원플랜(15~30세)" />
                </FormCell>
              </TableRow>
            </FormTable>
            <Grow placement="me" className="w-full gap-2">
              <Button variant="contained" color="secondary" size="md" onClick={() => {}}>
                간편누적해소
              </Button>
            </Grow>
          </Gcol>

          {/* MOCK_DATA 기반 수동 rowspan 테이블 */}
          <div style={{ maxHeight: 320, overflow: 'auto', position: 'relative' }}>
            <Table>
              <TableCaption className="a11y-hidden">지침확인결과 (MOCK_DATA 기반)</TableCaption>
              <TableHeader style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}>
                <TableRow>
                  <TableHead className="w-[120px]">대상</TableHead>
                  <TableHead className="w-[120px]">인수제한</TableHead>
                  <TableHead>위배내용</TableHead>
                  <TableHead className="w-[140px]">위배유형</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  // rowSpanTarget/rowSpanLimit 값이 있으면 우선 사용, 없으면 연속 구간 계산
                  const rows = [];
                  // 대상 rowSpan 계산 (rowSpanTarget)
                  const targetRowSpans = MOCK_DATA.map((row) => row.rowSpanTarget || 0);
                  // 인수제한 rowSpan 계산 (rowSpanLimit)
                  const limitRowSpans = MOCK_DATA.map((row) => row.rowSpanLimit || 0);
                  // 만약 값이 없으면 연속 구간 계산 (fallback)
                  if (targetRowSpans.every((v) => v === 0)) {
                    let i = 0;
                    while (i < MOCK_DATA.length) {
                      const val = MOCK_DATA[i].target;
                      let cnt = 1;
                      while (i + cnt < MOCK_DATA.length && MOCK_DATA[i + cnt].target === val) cnt++;
                      targetRowSpans[i] = cnt;
                      for (let j = 1; j < cnt; j++) targetRowSpans[i + j] = 0;
                      i += cnt;
                    }
                  }
                  if (limitRowSpans.every((v) => v === 0)) {
                    let i = 0;
                    while (i < MOCK_DATA.length) {
                      const val = MOCK_DATA[i].underwritingLimit;
                      let cnt = 1;
                      while (i + cnt < MOCK_DATA.length && MOCK_DATA[i + cnt].underwritingLimit === val) cnt++;
                      limitRowSpans[i] = cnt;
                      for (let j = 1; j < cnt; j++) limitRowSpans[i + j] = 0;
                      i += cnt;
                    }
                  }
                  for (let i = 0; i < MOCK_DATA.length; i++) {
                    rows.push(
                      <TableRow key={i}>
                        {targetRowSpans[i] > 0 && (
                          <TableCell rowSpan={targetRowSpans[i]} className="text-center align-middle">
                            {MOCK_DATA[i].target}
                          </TableCell>
                        )}
                        {limitRowSpans[i] > 0 && (
                          <TableCell rowSpan={limitRowSpans[i]} className="text-center align-middle">
                            {MOCK_DATA[i].underwritingLimit}
                          </TableCell>
                        )}
                        <TableCell className="whitespace-pre-line">{MOCK_DATA[i].violationContent}</TableCell>
                        <TableCell className="text-center">{MOCK_DATA[i].violationType}</TableCell>
                      </TableRow>
                    );
                  }
                  return rows;
                })()}
              </TableBody>
            </Table>
          </div>

          <div style={{ width: '100%', height: '100%' }}>
            <div
              className="ag-theme-alpine grid grid-rows-[1fr_auto] no-odd"
              style={{ height: '100%', width: '100%', whiteSpace: 'pre-line' }}
            >
              <AgGridReact<ProductData>
                rowData={MOCK_DATA}
                columnDefs={columnDefs}
                suppressRowTransform={true}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 20, 50, 100]}
                // 클릭 관련 이벤트 핸들러 없음 (비활성화)
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
