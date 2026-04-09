'use client';

import type { ReactNode } from 'react';
import { QuestionMark } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

type TooltipQProps = {
  defaultOpen?: boolean;
  sideOffset?: number;
  children?: ReactNode;
};

export function TooltipQ({ defaultOpen = false, sideOffset = 1, children }: TooltipQProps) {
  return (
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger asChild>
        <Button only="icon" size="md" variant="none">
          <QuestionMark color="#61554F" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={sideOffset}
        variant="default"
        className="[&>span]:whitespace-auto! text-wrap text-justify tracking-[-0.08rem]"
      >
        {children}
      </TooltipContent>
    </Tooltip>
  );
}
