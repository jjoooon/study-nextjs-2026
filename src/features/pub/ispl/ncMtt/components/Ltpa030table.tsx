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
  hasCopy?: boolean;
  content: string;
}

export interface UnderwritingItem {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  hasRefuseIcon?: boolean;
  hasTooltip?: boolean;
  tooltipData?: TooltipItem[];
}

export interface SimpleUnderwritingRow {
  col1?: UnderwritingItem;
  col2?: UnderwritingItem;
}

export interface HealthUnderwritingRow {
  col1?: UnderwritingItem;
  col2?: UnderwritingItem;
  col3?: UnderwritingItem;
  hasTooltip?: boolean;
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

  const defaultTooltipData = [
    {
      title: '$간편고지형명 판정결과$',
      hasCopy: true,
      content: '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $질병수술비(ALL RISK)$',
    },
    {
      title: '$345조건부(감액)$',
      hasCopy: true,
      content:
        '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰 사전안내 컬럼에 입력된 값 표시$',
    },
    {
      title: '$345(2일)조건부(감액)$',
      hasCopy: false,
      content:
        '제한담보: $질병후유3%, 질병입원비, 질병수술비, 상해입원비, 상해수술비$ - $인수판정룰 사전안내 컬럼에 입력된 값 표시$',
    },
  ];

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
              <TableCell>
                {row.col1 && (
                  <Grow className="w-full [&>div]:w-full">
                    <Checkbox
                      className={`w-full flex items-center justify-between no-underline ${row.col1.disabled || !isClick ? 'cursor-default' : ''}`}
                      color="primary"
                      size="lg"
                      variant="text"
                      checked={row.col1.checked}
                      disabled={row.col1.disabled || !isClick}
                      onCheckedChange={(checked) => onCheckedChange?.(row.col1!.id, checked)}
                    >
                      {row.col1.label}
                      {row.col1.hasRefuseIcon && <RefuseIcon />}
                    </Checkbox>
                  </Grow>
                )}
              </TableCell>
              <TableCell>
                {row.col2 && (
                  <Grow className="w-full [&>div]:w-full">
                    <Checkbox
                      className={`w-full flex items-center justify-between no-underline ${row.col2.disabled || !isClick ? 'cursor-default' : ''}`}
                      color="primary"
                      size="lg"
                      variant="text"
                      checked={row.col2.checked}
                      disabled={row.col2.disabled || !isClick}
                      onCheckedChange={(checked) => onCheckedChange?.(row.col2!.id, checked)}
                    >
                      {row.col2.label}
                      {row.col2.hasRefuseIcon && <RefuseIcon />}
                    </Checkbox>
                  </Grow>
                )}
              </TableCell>
              <TableCell>
                {row.col3 && (
                  <Grow className="w-full [&>div]:w-full">
                    <Checkbox
                      className={`w-full flex items-center justify-between no-underline ${row.col3.disabled || !isClick ? 'cursor-default' : ''}`}
                      color="primary"
                      size="lg"
                      variant="text"
                      checked={row.col3.checked}
                      disabled={row.col3.disabled || !isClick}
                      onCheckedChange={(checked) => onCheckedChange?.(row.col3!.id, checked)}
                    >
                      {row.col3.label}
                      {row.col3.hasRefuseIcon && <RefuseIcon />}
                    </Checkbox>
                  </Grow>
                )}
              </TableCell>
              <TableCell
                className={row.hasTooltip || (row.tooltipData && row.tooltipData.length > 0) ? 'text-center' : ''}
              >
                {(row.hasTooltip || (row.tooltipData && row.tooltipData.length > 0)) && (
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
                        {(row.tooltipData && row.tooltipData.length > 0 ? row.tooltipData : defaultTooltipData)
                          .slice(0, 3)
                          .map((tip, idx) => (
                            <Gcol key={idx} placement={'ss'}>
                              <Grow placement={'bwc'}>
                                <Typo tag={'strong'} className="body-md font-bold">
                                  {renderFormattedText(tip.title)}
                                </Typo>
                                <Button only="icon" size={'md'} variant="none">
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
            const hasTooltip1 = row.col1?.hasTooltip || (row.col1?.tooltipData && row.col1.tooltipData.length > 0);
            const hasTooltip2 = row.col2?.hasTooltip || (row.col2?.tooltipData && row.col2.tooltipData.length > 0);
            const tooltipTarget = hasTooltip1 ? row.col1 : hasTooltip2 ? row.col2 : null;
            return (
              <TableRow key={index} className="text-center">
                <TableCell>
                  {row.col1 && (
                    <Grow className="w-full [&>div]:w-full">
                      <Checkbox
                        className={`w-full flex items-center justify-between no-underline ${row.col1.disabled || !isClick ? 'cursor-default' : ''}`}
                        color="primary"
                        size="lg"
                        variant="text"
                        checked={row.col1.checked}
                        disabled={row.col1.disabled || !isClick}
                        onCheckedChange={(checked) => onCheckedChange?.(row.col1!.id, checked)}
                      >
                        {row.col1.label}
                        {row.col1.hasRefuseIcon && <RefuseIcon />}
                      </Checkbox>
                    </Grow>
                  )}
                </TableCell>
                <TableCell>
                  {row.col2 && (
                    <Grow className="w-full [&>div]:w-full">
                      <Checkbox
                        className={`w-full flex items-center justify-between no-underline ${row.col2.disabled || !isClick ? 'cursor-default' : ''}`}
                        color="primary"
                        size="lg"
                        variant="text"
                        checked={row.col2.checked}
                        disabled={row.col2.disabled || !isClick}
                        onCheckedChange={(checked) => onCheckedChange?.(row.col2!.id, checked)}
                      >
                        {row.col2.label}
                        {row.col2.hasRefuseIcon && <RefuseIcon />}
                      </Checkbox>
                    </Grow>
                  )}
                </TableCell>
                <TableCell></TableCell>
                <TableCell className={tooltipTarget ? 'text-center' : ''}>
                  {tooltipTarget && (
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
                          {(tooltipTarget.tooltipData && tooltipTarget.tooltipData.length > 0
                            ? tooltipTarget.tooltipData
                            : defaultTooltipData
                          )
                            .slice(0, 3)
                            .map((tip, idx) => (
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
