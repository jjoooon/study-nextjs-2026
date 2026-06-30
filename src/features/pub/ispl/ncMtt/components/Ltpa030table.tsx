/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { Copy } from 'lucide-react';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { RefuseIcon, QuestionMark } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

export interface TooltipItem {
  title: string;
  content: string;
}

export interface UnderwritingItem {
  id: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  state?: boolean | 'none' | 'refuse' | 'partial';
}

export interface SimpleUnderwritingRow {
  data: UnderwritingItem[];
  tooltipData?: TooltipItem[];
}

export interface HealthUnderwritingRow {
  data: UnderwritingItem[];
  tooltipData?: TooltipItem[];
}

interface Ltpa030tableProps {
  healthRows?: HealthUnderwritingRow[];
  simpleRows?: SimpleUnderwritingRow[];
  onCheckedChange?: (id: string, checked: boolean | 'indeterminate') => void;
  isClick?: boolean;
  hideTitle?: boolean;
}

// $로 감싸진 텍스트를 <strong> 태그로 렌더링하는 헬퍼 함수
const renderFormattedText = (text: string) => {
  if (!text) return '';
  if (!text.includes('$')) {
    return text;
  }
  const parts = text.split('$');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-bold text-primary">
          {part}
        </strong>
      );
    }
    return part;
  });
};

export default function Ltpa030table({
  healthRows = [],
  simpleRows = [],
  isClick = true,
  hideTitle = false,
  onCheckedChange,
}: Ltpa030tableProps) {
  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text.replace(/\$/g, '')).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  const hasBoth = healthRows.length > 0 && simpleRows.length > 0;
  const showTitle = !hideTitle && hasBoth;

  const renderHealthTable = () => {
    if (healthRows.length === 0) return null;

    const tableContent = (
      <Table variant="default">
        <colgroup>
          <col style={{ width: '30%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3}>고지유형</TableHead>
            <TableHead>제한</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {healthRows.map((row, index) => (
            <TableRow key={index} className="text-center">
              {row.data.map((col, colIdx) => (
                <TableCell key={colIdx}>
                  {col.id && col.label ? (
                    <Grow className="w-full [&>div]:w-full">
                      <Checkbox
                        className={`w-full flex items-center justify-between no-underline ${col.disabled || !isClick ? 'cursor-default' : ''}`}
                        color="primary"
                        size="lg"
                        variant="text"
                        checked={col.checked}
                        disabled={col.disabled || !isClick}
                        onCheckedChange={(checked) => onCheckedChange?.(col.id, checked)}
                      >
                        {col.label}
                        {(col.state === 'refuse' || col.state === true) && <RefuseIcon />}
                      </Checkbox>
                    </Grow>
                  ) : null}
                </TableCell>
              ))}
              <TableCell className={row.tooltipData && row.tooltipData.length > 0 ? 'text-center' : ''}>
                {row.tooltipData && row.tooltipData.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button only="icon" size={'md'} variant="none">
                        <QuestionMark color="var(--color-gray-500)" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="start"
                      side="bottom"
                      sideOffset={0}
                      variant="default"
                      className="w-[22.1rem] block"
                    >
                      <Gcol placement={'ss'} gap={1.5}>
                        {row.tooltipData.slice(0, 3).map((tip, idx) => (
                          <Gcol key={idx} placement={'ss'}>
                            <Grow placement={'bwc'}>
                              <Typo tag={'strong'} className="body-md font-bold">
                                {renderFormattedText(tip.title)}
                              </Typo>
                              <Button
                                only="icon"
                                size={'md'}
                                variant="none"
                                onClick={() => handleCopy(tip.content)}
                                title="복사하기"
                              >
                                <Copy size={16} color="var(--color-gray-500)" />
                              </Button>
                            </Grow>
                            <Typo tag={'p'} className="text-wrap">
                              {renderFormattedText(tip.content)}
                            </Typo>
                          </Gcol>
                        ))}
                      </Gcol>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

    if (showTitle) {
      return (
        <Gcol className="h-full" placement={'ss'}>
          <Typo variant="heading-sm" color="default">
            일반/건강고지
          </Typo>
          {tableContent}
        </Gcol>
      );
    }

    return tableContent;
  };

  const renderSimpleTable = () => {
    if (simpleRows.length === 0) return null;

    const tableContent = (
      <Table variant="default">
        <colgroup>
          <col style={{ width: '30%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3}>고지유형</TableHead>
            <TableHead>제한</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {simpleRows.map((row, index) => {
            return (
              <TableRow key={index} className="text-center">
                {row.data.map((col, colIdx) => (
                  <TableCell key={colIdx}>
                    {col.id && col.label ? (
                      <Grow className="w-full [&>div]:w-full">
                        <Checkbox
                          className={`w-full flex items-center justify-between no-underline ${col.disabled || !isClick ? 'cursor-default' : ''}`}
                          color="primary"
                          size="lg"
                          variant="text"
                          checked={col.checked}
                          disabled={col.disabled || !isClick}
                          onCheckedChange={(checked) => onCheckedChange?.(col.id, checked)}
                        >
                          {col.label}
                          {(col.state === 'refuse' || col.state === true) && <RefuseIcon />}
                        </Checkbox>
                      </Grow>
                    ) : null}
                  </TableCell>
                ))}
                {row.data.length < 3 &&
                  Array.from({ length: 3 - row.data.length }).map((_, i) => <TableCell key={`empty-${i}`} />)}
                <TableCell className={row.tooltipData && row.tooltipData.length > 0 ? 'text-center' : ''}>
                  {row.tooltipData && row.tooltipData.length > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button only="icon" size={'md'} variant="none">
                          <QuestionMark color="var(--color-gray-500)" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        align="start"
                        side="bottom"
                        sideOffset={0}
                        variant="default"
                        className="w-[22.1rem] block"
                      >
                        <Gcol placement={'ss'} gap={1.5}>
                          {row.tooltipData.slice(0, 3).map((tip, idx) => (
                            <Gcol key={idx} placement={'ss'}>
                              <Grow placement={'bwc'}>
                                <Typo tag={'strong'} className="body-md font-bold">
                                  {renderFormattedText(tip.title)}
                                </Typo>
                                <Button
                                  only="icon"
                                  size={'md'}
                                  variant="none"
                                  onClick={() => handleCopy(tip.content)}
                                  title="복사하기"
                                >
                                  <Copy size={16} color="var(--color-gray-500)" />
                                </Button>
                              </Grow>
                              <Typo tag={'p'} className="text-wrap">
                                {renderFormattedText(tip.content)}
                              </Typo>
                            </Gcol>
                          ))}
                        </Gcol>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );

    if (showTitle) {
      return (
        <Gcol className="h-full" placement={'ss'}>
          <Typo variant="heading-sm" color="default">
            간편고지
          </Typo>
          {tableContent}
        </Gcol>
      );
    }

    return tableContent;
  };

  return (
    <>
      {renderHealthTable()}
      {renderSimpleTable()}
    </>
  );
}
