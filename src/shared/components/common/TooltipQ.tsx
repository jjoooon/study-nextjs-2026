/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { QuestionMark } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import type { ReactNode } from 'react';

type TooltipQProps = {
  defaultOpen?: boolean;
  sideOffset?: number;
  children?: ReactNode;
};

export function TooltipQ({ defaultOpen = false, sideOffset = 1, children }: TooltipQProps) {
  return (
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger asChild>
        <Button only="icon" size="md" variant="none" className="aspect-auto">
          <QuestionMark color="#61554F" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={sideOffset}
        variant="default"
        className="[&>span]:whitespace-auto! text-wrap tracking-[-0.08rem] break-keep"
      >
        {children}
      </TooltipContent>
    </Tooltip>
  );
}
