/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grow, Gcol } from '@atoms';
import { FormCell, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

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
 * 지침확인결과 팝업 Props
 */
export interface DialogResult {
  /** 수행된 액션 타입 */
  action: 'select' | 'cancel';
  /** 선택된 고객 (select 액션 시) */
  // TODO: @YunJunmo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customer?: any;
}
export interface DialogProps {
  title?: string;
  description?: string;
  resolve: (result: DialogResult) => void;
}

export default function UnderwritingDialog({ resolve }: DialogProps) {
  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  const calculateRowSpans = (data: ProductData[], key: keyof ProductData): number[] => {
    const spans: number[] = data.map(() => 0);
    let i = 0;
    while (i < data.length) {
      const val = data[i][key];
      let cnt = 1;
      while (i + cnt < data.length && data[i + cnt][key] === val) {
        cnt++;
      }
      spans[i] = cnt;
      i += cnt;
    }
    return spans;
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent
        className="h-[50rem] w-[90rem] min-w-[80rem] max-h-[calc(100vh-4rem)] max-w-[calc(100vw-4rem)]"
        resizable={true}
      >
        <DialogHeader>
          <DialogTitle>지침확인결과 (LTRZ384)</DialogTitle>
        </DialogHeader>

        {/* 모달 내용 - FormTable 사용 */}
        <Gcol className="gap-8 flex-1 w-full px-[3.2rem] pb-[3.2rem]" placement="ss">
          <Gcol className="gap-2 shrink-0 w-full">
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
            <Grow placement="ec" className="w-full gap-2">
              <Button variant="contained" color="secondary" size="md" onClick={() => {}}>
                간편누적해소
              </Button>
            </Grow>
          </Gcol>
          {/* MOCK_DATA 기반 수동 rowspan 테이블 */}
          <div className="min-h-0 h-[100%] flex flex-col">
            <div className="flex-1 min-h-0 overflow-auto [&>div]:h-0 border-t-[.2rem] border-t-[var(--color-border-gray-darker)] border-b-[.1rem] border-b-[var(--color-table-border-border-gray)]">
              <Table>
                <TableCaption className="a11y-hidden">지침확인결과 (MOCK_DATA 기반)</TableCaption>
                <TableHeader style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}>
                  <TableRow>
                    <TableHead className="w-[12rem]">대상</TableHead>
                    <TableHead className="w-[12rem]">인수제한</TableHead>
                    <TableHead>위배내용</TableHead>
                    <TableHead className="w-[12rem]">위배유형</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    const rows = [];
                    const targetRowSpans = calculateRowSpans(MOCK_DATA, 'target');
                    const limitRowSpans = calculateRowSpans(MOCK_DATA, 'underwritingLimit');
                    for (let i = 0; i < MOCK_DATA.length; i++) {
                      rows.push(
                        <TableRow key={i}>
                          {targetRowSpans[i] > 0 && (
                            <TableCell rowSpan={targetRowSpans[i]} className="text-center align-middle">
                              <div className="w-full relative w-full">
                                <div className="sticky top-0">{MOCK_DATA[i].target}</div>
                              </div>
                            </TableCell>
                          )}
                          {limitRowSpans[i] > 0 && (
                            <TableCell rowSpan={limitRowSpans[i]} className="text-center align-middle">
                              {MOCK_DATA[i].underwritingLimit}
                            </TableCell>
                          )}
                          <TableCell className="whitespace-pre-line">{MOCK_DATA[i].violationContent}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="text">{MOCK_DATA[i].violationType}</Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return rows;
                  })()}
                </TableBody>
              </Table>
            </div>
          </div>
        </Gcol>
      </DialogContent>
    </Dialog>
  );
}
