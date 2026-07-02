/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import {
  RefuseIcon,
  DiamondIcon,
  AuditIcon,
  ConditionalIcon,
  CircleCheckIcon,
  QuestionMark,
  NewWin,
  InfoBoxWarningIcon,
} from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

export interface TooltipItem {
  title: string;
  content: string | string[];
}

export interface UnderwritingItem {
  id: string;
  label?: string;
  checked?: boolean;
  state?: '거절' | '연기' | '심사' | '조건부' | '인수' | boolean;
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
  colSpan?: number;
}

const unavailableStyle = "bg-[url('/images/checkbox/pattern_checkbox.png')] bg-repeat bg-center w-full h-[30px]";

const selectedStyle =
  'bg-[#FFEFEA] border-[0.2rem] border-[#FF5C2E] !text-[#000] [&_label]:!text-[#000] [&_span]:!text-[#000] transition-[background-color,border-color] duration-300 delay-300';

const disabledStyle = 'bg-[#E4E7EC] !text-[#000] [&_label]:!text-[#000] [&_span]:!text-[#000]';

export default function Ltpa030table({
  healthRows = [],
  isClick = true,
  onCheckedChange,
  colSpan = 3,
}: Ltpa030tableProps) {
  const tableContent = (
    <Table variant="default" style={{ tableLayout: 'fixed' }}>
      {colSpan === 1 ? (
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: '4rem' }} />
        </colgroup>
      ) : (
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '4rem' }} />
        </colgroup>
      )}
      <TableHeader>
        <TableRow>
          <TableHead colSpan={colSpan}>고지유형</TableHead>
          <TableHead>제한</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_td]:border-[#D8D8D8]!">
        {healthRows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={colSpan + 1} className="py-10 text-center align-middle h-[27rem]">
              <Gcol placement="cc" className="w-full h-full text-center justify-center items-center" gap={1}>
                <InfoBoxWarningIcon size={14} color="#777" />
                <Typo variant="body-sm" className="leading-normal text-[#414141]">
                  입력/수술 정보를 입력 후
                  <br />
                  [고지유형 확인]을 선택해 주세요.
                </Typo>
              </Gcol>
            </TableCell>
          </TableRow>
        ) : (
          healthRows.map((row, index) => (
            <TableRow key={index} className="text-center">
              {row.data.map((col, colIdx) => (
                <TableCell
                  key={colIdx}
                  style={{ height: '3rem' }}
                  className="relative bg-[#FFF] overflow-hidden px-0! py-0!"
                >
                  {col.id && col.label ? (
                    <Grow
                      className={`w-full h-full [&>div]:w-full [&>div]:h-full relative px-[0.6rem] bg-[#FFF] ${col.state === '거절' && isClick ? disabledStyle : col.checked ? selectedStyle : ''}`}
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
                      >
                        {col.label}
                        {col.state === '거절' && <RefuseIcon />}
                        {col.state === '연기' && <DiamondIcon />}
                        {col.state === '심사' && <AuditIcon />}
                        {col.state === '조건부' && <ConditionalIcon />}
                        {col.state === '인수' && <CircleCheckIcon size={14} />}
                      </Checkbox>
                    </Grow>
                  ) : (
                    <div className={unavailableStyle} />
                  )}
                </TableCell>
              ))}
              <TableCell
                style={{ height: '30px' }}
                className={`py-0! px-0! bg-[#FFF] ${row.tooltipData && row.tooltipData.length > 0 ? 'text-center bg-[#FFF]' : ''}`}
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
                              {(Array.isArray(tip.content) ? tip.content : [tip.content]).map((item, cIdx) => (
                                <BulletListItem key={cIdx}>
                                  {cIdx === 0 && <strong className="font-bold">제한담보:</strong>} {item}
                                </BulletListItem>
                              ))}
                            </BulletList>
                          </Gcol>
                        ))}
                      </Gcol>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return tableContent;
}
