'use client';

import { useEffect, useState } from 'react';

import { Button } from '@uiux/Button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@uiux/Table';
import { Checkbox } from '@uiux/Checkbox';

// Types
interface DataBaseTableRow {
  target: string;
  underwritingLimit: string;
  violationContent: string;
  violationType: string;
}

interface ProductData {
  tbodyData?: DataBaseTableRow[];
  caption?: string;
  stickyHeader?: boolean;
  showCheckbox?: boolean;
  checkedRowIndexes?: number[];
  onCheckedRowIndexesChange?: (indexes: number[]) => void;
}

export default function DataBaseTable({
  tbodyData = [],
  caption = '지침확인결과',
  stickyHeader = false,
  showCheckbox = false,
  checkedRowIndexes,
  onCheckedRowIndexesChange,
}: ProductData) {
  const [internalCheckedRowIndexes, setInternalCheckedRowIndexes] = useState<number[]>([]);

  const resolvedCheckedRowIndexes = checkedRowIndexes ?? internalCheckedRowIndexes;

  const applyCheckedRowIndexes = (indexes: number[]) => {
    if (checkedRowIndexes === undefined) {
      setInternalCheckedRowIndexes(indexes);
    }
    onCheckedRowIndexesChange?.(indexes);
  };

  useEffect(() => {
    const max = tbodyData.length - 1;
    const sanitized = resolvedCheckedRowIndexes.filter((index) => index >= 0 && index <= max);

    if (sanitized.length !== resolvedCheckedRowIndexes.length) {
      applyCheckedRowIndexes(sanitized);
    }
  }, [tbodyData.length]);

  const toggleRow = (rowIndex: number, checked: boolean | 'indeterminate') => {
    if (checked === true) {
      if (resolvedCheckedRowIndexes.includes(rowIndex)) return;
      applyCheckedRowIndexes([...resolvedCheckedRowIndexes, rowIndex]);
      return;
    }

    applyCheckedRowIndexes(resolvedCheckedRowIndexes.filter((index) => index !== rowIndex));
  };

  const calculateRowSpans = (data: DataBaseTableRow[], key: keyof DataBaseTableRow): number[] => {
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
      <div className="min-h-0 h-full flex flex-col">
        <div className="flex-1 min-h-0 overflow-auto [&>div]:h-0 border-t-[.2rem] border-t-(--color-border-gray-darker) border-b-DEFAULT border-b-(--color-table-border-border-gray)">
          <Table>
            <TableCaption className="a11y-hidden">{caption}</TableCaption>
            <colgroup>
              {showCheckbox && <col style={{ width: '3rem' }} />}
              <col style={{ width: '12rem' }} />
              <col style={{ width: '12rem' }} />
              <col />
              <col style={{ width: '12rem' }} />
            </colgroup>
            <TableHeader style={stickyHeader ? { position: 'sticky', top: 0, zIndex: 2, background: '#fff' } : undefined}>
              <TableRow>
                {showCheckbox && <TableHead className="w-[3rem] min-w-[3rem] text-center p-0!" />}
                <TableHead>대상</TableHead>
                <TableHead>인수제한</TableHead>
                <TableHead>위배내용</TableHead>
                <TableHead>위배유형</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(() => {
                const rows = [];
                if (tbodyData.length === 0) {
                  rows.push(
                    <TableRow key="empty">
                      <TableCell colSpan={showCheckbox ? 5 : 4} className="text-center text-(--color-text-gray)">
                        데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  );
                  return rows;
                }

                const targetRowSpans = calculateRowSpans(tbodyData, 'target');
                const limitRowSpans = calculateRowSpans(tbodyData, 'underwritingLimit');
                for (let i = 0; i < tbodyData.length; i++) {
                  rows.push(
                    <TableRow key={i}>
                      {showCheckbox && (
                        <TableCell className="w-[3rem] min-w-[3rem] text-center align-middle p-0!">
                          <div className="w-full h-full flex items-center justify-center">
                            <Checkbox
                              size="sm"
                              checked={resolvedCheckedRowIndexes.includes(i)}
                              onCheckedChange={(checked) => toggleRow(i, checked)}
                              aria-label={`${i + 1}번째 행 선택`}
                            />
                          </div>
                        </TableCell>
                      )}
                      {targetRowSpans[i] > 0 && (
                        <TableCell rowSpan={targetRowSpans[i]} className="text-center align-middle">
                          <div className="w-full">{tbodyData[i].target}</div>
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
