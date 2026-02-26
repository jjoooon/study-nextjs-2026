'use client';

import { MOCK_DATA } from '@/features/pub/poc/constants/insPlanBasicData';
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/uiux';

// Types
interface ProductData {
  tbodyData: {
    target: string;
    underwritingLimit: string;
    violationContent: string;
    violationType: string;
  }[];
  caption: string;
  stickyHeader?: boolean;
}


export default function DataBaseTable({ tbodyData, caption, stickyHeader = false }: ProductData) {
  const calculateRowSpans = (data: any[], key: string): number[] => {
    const spans: number[] = data.map(() => 0); // 초기화
    let i = 0;
    while (i < data.length) {
      const val = data[i][key];
      let cnt = 1;
      while (i + cnt < data.length && data[i + cnt][key] === val) {
        cnt++;
      }
      spans[i] = cnt;
      // 나머지는 이미 0으로 초기화되어 있으므로 추가 루프 불필요
      i += cnt;
    }
    return spans;
  };

  return (
    <>
      <div className="min-h-0 h-[100%] flex flex-col">
        <div className="flex-1 min-h-0 overflow-auto [&>div]:h-0 border-t-[.2rem] border-t-[var(--color-border-gray-darker)] border-b-[.1rem] border-b-[var(--color-table-border-border-gray)]">
          <Table>
            <TableCaption className="a11y-hidden">지침확인결과 (MOCK_DATA 기반)</TableCaption>
            <colgroup>
              <col style={{ width: '12rem' }} />
              <col style={{ width: '12rem' }} />
              <col />
              <col style={{ width: '12rem' }} />
            </colgroup>
            <TableHeader style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}>
              <TableRow>
                <TableHead>대상</TableHead>
                <TableHead>인수제한</TableHead>
                <TableHead>위배내용</TableHead>
                <TableHead>위배유형</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                const rows = [];
                const targetRowSpans = calculateRowSpans(tbodyData, 'target');
                const limitRowSpans = calculateRowSpans(tbodyData, 'underwritingLimit');
                for (let i = 0; i < tbodyData.length; i++) {
                  rows.push(
                    <TableRow key={i}>
                      {targetRowSpans[i] > 0 && (
                        <TableCell rowSpan={targetRowSpans[i]} className="text-center align-middle">
                          <div className="w-full relative w-full">
                            <div className="sticky top-0">{tbodyData[i].target}</div>
                          </div>
                        </TableCell>
                      )}
                      {limitRowSpans[i] > 0 && (
                        <TableCell rowSpan={limitRowSpans[i]} className="text-center align-middle">
                          {tbodyData[i].underwritingLimit}
                        </TableCell>
                      )}
                      <TableCell className="whitespace-pre-line">{tbodyData[i].violationContent}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="text">{tbodyData[i].violationType}</Button>
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
    </>
  );
}
