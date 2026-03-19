'use client';

import type { ReactNode } from 'react';

import { QuestionMark } from '@icons';
import { Button } from '@uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

type TableTooltipProps = {
  content?: ReactNode;
  defaultOpen?: boolean;
  sideOffset?: number;
};

const DEFAULT_ELECTRONIC_NOTICE_MESSAGE = `문서서명/IM은 청약서상 고객이 청약서로<br> [전자적 방법의 안내동의여부]에 기재한 내용을<br> 화면에서 선택하시면 됩니다.<br> 전자서명/전자청약은 전자적 안내동의가<br> 필수사항입니다.`;

export function TableTooltip({
  content = DEFAULT_ELECTRONIC_NOTICE_MESSAGE,
  defaultOpen = true,
  sideOffset = 1,
}: TableTooltipProps) {
  return (
    <Tooltip defaultOpen={defaultOpen}>
      <TooltipTrigger asChild>
        <Button only="icon" size="md" variant="none">
          <QuestionMark color="#61554F" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={sideOffset} variant="default">
        {content}
      </TooltipContent>
    </Tooltip>
  );
}