/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ReactNode } from 'react';
import { QuestionMark } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

type TooltipQProps = {
  defaultOpen?: boolean;
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  children?: ReactNode;
};

export function TooltipQ({ defaultOpen = false, sideOffset = 1, children, align = 'center' }: TooltipQProps) {
  return (
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger asChild>
        <Button
          only="icon"
          size="md"
          variant="none"
          className="aspect-auto translate-y-[0.2rem] ml-[0.2rem] h-[1.4rem] w-[1.4rem] p-0"
        >
          <QuestionMark color="#61554F" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align={align}
        sideOffset={sideOffset}
        variant="default"
        className="[&>span]:whitespace-auto! text-wrap tracking-[-0.08rem] break-keep"
      >
        {children}
      </TooltipContent>
    </Tooltip>
  );
}
