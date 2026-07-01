/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { RefuseIcon, DiamondIcon, AuditIcon, ConditionalIcon, CircleCheckIcon, QuestionMark, NewWin } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

export interface TooltipItem {
  title: string;
  content: string;
  content2: string;
}

export interface UnderwritingItem {
  id: string;
  label?: string;
  checked?: boolean;
  state?: '거절' | '연기' | '심사' | '조건부' | '인수';
}

export interface HealthUnderwritingRow {
  data: UnderwritingItem[];
  tooltipData?: TooltipItem[];
}

interface Ltpa030tableProps {
  healthRows?: HealthUnderwritingRow[];
  onCheckedChange?: (id: string, checked: boolean | 'indeterminate') => void;
  onCheckboxClick?: (id: string, label: string, isChecked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  isClick?: boolean;
}

const unavailableStyle = "bg-[url('/images/checkbox/pattern_checkbox.png')] bg-repeat bg-center w-full h-[30px]";

const selectedStyle =
  'bg-[#FFEFEA] border-[0.2rem] border-[#FF5C2E] !text-[#000] [&_label]:!text-[#000] [&_span]:!text-[#000] transition-[background-color,border-color] duration-300 delay-300';

const disabledStyle = 'bg-[#E4E7EC] !text-[#000] [&_label]:!text-[#000] [&_span]:!text-[#000]';

export default function Ltpa030table({
  healthRows = [],
  isClick = true,
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
                    className={`w-full h-full [&>div]:w-full [&>div]:h-full relative px-[0.6rem] ${col.state === '거절' && isClick ? disabledStyle : col.checked ? selectedStyle : ''}`}
                  >
                    <Checkbox
                      id={`grow-underwriting-${col.id}`}
                      className={`w-full h-full flex items-center justify-between no-underline py-0!  ${col.state === '거절' || !isClick ? 'cursor-default' : ''}`}
                      color="primary"
                      size="lg"
                      variant="text"
                      checked={col.checked}
                      disabled={col.state === '거절' || !isClick}
                      onCheckedChange={(checked) => onCheckedChange?.(col.id, checked)}
                      onClick={() => {
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
                      {col.state === '거절' && <RefuseIcon />}
                      {col.state === '연기' && <DiamondIcon />}
                      {col.state === '심사' && <AuditIcon />}
                      {col.state === '조건부' && <ConditionalIcon />}
                      {col.state === '인수' && <CircleCheckIcon size={14} />}
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
                          {col.state === '거절' && <RefuseIcon />}
                        </div>
                      ))}
                  </Grow>
                ) : (
                  <div className={unavailableStyle} />
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
                        <Gcol key={idx} placement={'ss'} className="gap-[0.6rem]">
                          <Grow placement={'cc'}>
                            <Typo tag={'strong'} className="body-md font-bold text-[1.2rem]">
                              {tip.title}
                            </Typo>
                            <Button only="icon" size={'sm'} variant="none" title="복사하기" className="h-[1.8rem]">
                              <NewWin size={16} color="var(--color-gray-500)" />
                            </Button>
                          </Grow>
                          <BulletList color={'warning'} size="sm" className="gap-[0.2rem]">
                            <BulletListItem>
                              <strong className="font-bold">제한담보:</strong>{' '}
                              {tip.content.replace(/^제한담보\s*:\s*/, '')}
                            </BulletListItem>
                            <BulletListItem>{tip.content2}</BulletListItem>
                          </BulletList>
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

  return tableContent;
}
