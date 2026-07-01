/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { Copy } from 'lucide-react';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { RefuseIcon, QuestionMark, NewWin } from '@icons';
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
  onCheckboxClick?: (id: string, label: string, isChecked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  isClick?: boolean;
  hideTitle?: boolean;
}

const unavailableData = "bg-[url('/images/checkbox/pattern_checkbox.png')] bg-repeat bg-center w-full h-[30px]";

const selectedData =
  'bg-[#FFEFEA] border-[0.2rem] border-[#FF5C2E] !text-[#000] [&_label]:!text-[#000] [&_span]:!text-[#000] transition-[background-color,border-color] duration-300 delay-300';

const disabledData = 'bg-[#E4E7EC] !text-[#000] [&_label]:!text-[#000] [&_span]:!text-[#000]';

export default function Ltpa030table({
  healthRows = [],
  simpleRows = [],
  isClick = true,
  hideTitle = false,
  onCheckedChange,
  onCheckboxClick,
}: Ltpa030tableProps) {
  const [flyingEffects, setFlyingEffects] = React.useState<
    {
      id: number;
      text: string;
      colId: string;
    }[]
  >([]);

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
                <TableCell key={colIdx} style={{ height: '3rem' }} className="relative overflow-hidden px-0! py-0!">
                  {col.id && col.label ? (
                    <Grow
                      className={`w-full h-full [&>div]:w-full [&>div]:h-full relative px-[0.6rem] ${col.disabled ? disabledData : col.checked ? selectedData : ''}`}
                    >
                      <Checkbox
                        id={`grow-underwriting-${col.id}`}
                        className={`w-full h-full flex items-center justify-between no-underline py-0!  ${col.disabled || !isClick ? 'cursor-default' : ''}`}
                        color="primary"
                        size="lg"
                        variant="text"
                        checked={col.checked}
                        disabled={col.disabled || !isClick}
                        onCheckedChange={(checked) => onCheckedChange?.(col.id, checked)}
                        onClick={(e) => {
                          if (!onCheckboxClick) {
                            if (!col.checked) {
                              setFlyingEffects((prev) => [
                                ...prev,
                                {
                                  id: Date.now() + Math.random(),
                                  text: col.label || '',
                                  colId: col.id,
                                },
                              ]);
                            }
                          }
                        }}
                      >
                        {col.label}
                        {(col.state === 'refuse' || col.state === true) && <RefuseIcon />}
                      </Checkbox>

                      {/* 테이블 셀 내부에서 떨어지는 복제 텍스트 */}
                      {flyingEffects
                        .filter((eff) => eff.colId === col.id)
                        .map((eff) => (
                          <div
                            key={eff.id}
                            className="animate-fly-down-cell absolute left-0 top-0 w-full h-full pointer-events-none z-[10] flex items-center justify-between text-[1.3rem] font-bold "
                            onAnimationEnd={() => {
                              setFlyingEffects((prev) => prev.filter((item) => item.id !== eff.id));
                            }}
                          >
                            <span>{eff.text}</span>
                            {(col.state === 'refuse' || col.state === true) && <RefuseIcon />}
                          </div>
                        ))}
                    </Grow>
                  ) : (
                    <div className={unavailableData} />
                  )}
                </TableCell>
              ))}
              <TableCell
                style={{ height: '30px' }}
                className={`py-0! px-0! ${row.tooltipData && row.tooltipData.length > 0 ? 'text-center' : ''}`}
              >
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
                            <Grow placement={'sc'}>
                              <Typo tag={'strong'} className="body-md font-bold">
                                {tip.title}
                              </Typo>
                              <Button only="icon" size={'md'} variant="none" title="복사하기">
                                <NewWin size={16} color="var(--color-gray-500)" />
                              </Button>
                            </Grow>
                            <Typo tag={'p'} className="text-wrap">
                              {tip.content}
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
                  <TableCell key={colIdx} style={{ height: '30px' }} className="relative overflow-hidden px-0! py-0!">
                    {col.id && col.label ? (
                      <Grow
                        className={`w-full h-full [&>div]:w-full [&>div]:h-full relative ${col.disabled ? disabledData : col.checked ? selectedData : ''}`}
                      >
                        <Checkbox
                          id={`grow-underwriting-${col.id}`}
                          className={`w-full h-full flex items-center justify-between no-underline py-0! leading-none! ${col.disabled || !isClick ? 'cursor-default' : ''}`}
                          color="primary"
                          size="lg"
                          variant="text"
                          checked={col.checked}
                          disabled={col.disabled || !isClick}
                          onCheckedChange={(checked) => onCheckedChange?.(col.id, checked)}
                          onClick={(e) => {
                            if (!onCheckboxClick) {
                              if (!col.checked) {
                                setFlyingEffects((prev) => [
                                  ...prev,
                                  {
                                    id: Date.now() + Math.random(),
                                    text: col.label || '',
                                    colId: col.id,
                                  },
                                ]);
                              }
                            }
                          }}
                        >
                          {col.label}
                          {(col.state === 'refuse' || col.state === true) && <RefuseIcon />}
                        </Checkbox>

                        {/* 테이블 셀 내부에서 떨어지는 복제 텍스트 */}
                        {flyingEffects
                          .filter((eff) => eff.colId === col.id)
                          .map((eff) => (
                            <div
                              key={eff.id}
                              className="animate-fly-down-cell absolute left-0 top-0 w-full h-full pointer-events-none z-[10] flex items-center justify-between text-[1.3rem] font-bold"
                              onAnimationEnd={() => {
                                setFlyingEffects((prev) => prev.filter((item) => item.id !== eff.id));
                              }}
                            >
                              <span>{eff.text}</span>
                              {(col.state === 'refuse' || col.state === true) && <RefuseIcon />}
                            </div>
                          ))}
                      </Grow>
                    ) : (
                      <div className={unavailableData} />
                    )}
                  </TableCell>
                ))}
                {row.data.length < 3 &&
                  Array.from({ length: 3 - row.data.length }).map((_, i) => (
                    <TableCell key={`empty-${i}`} style={{ height: '30px' }} className="py-0! px-0!" />
                  ))}
                <TableCell
                  style={{ height: '30px' }}
                  className={`py-0! px-0! ${row.tooltipData && row.tooltipData.length > 0 ? 'text-center' : ''}`}
                >
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
                              <Grow placement={'sc'}>
                                <Typo tag={'strong'} className="body-md font-bold">
                                  {tip.title}
                                </Typo>
                                <Button only="icon" size={'md'} variant="none" title="복사하기">
                                  <NewWin size={16} color="var(--color-gray-500)" />
                                </Button>
                              </Grow>
                              <Typo tag={'p'} className="text-wrap">
                                {tip.content}
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
      <style>{`
        @keyframes flyDownCell {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(28px);
            opacity: 0;
          }
        }
        .animate-fly-down-cell {
          animation: flyDownCell 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
    </>
  );
}
