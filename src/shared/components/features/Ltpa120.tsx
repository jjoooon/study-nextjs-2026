/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import Image from 'next/image';
import * as React from 'react';
import { publicConfig } from '@/shared/config/env';
import useMounted from '@/shared/hooks/useMounted';
import { cn } from '@/shared/lib/shadcn/utils';
import { chatbotUtils } from '@/shared/utils/chatbotUtils';
import { withPublicUrl } from '@/shared/utils/url/publicUrl';
import { Grow } from '@atoms';
import { Dialog, DialogContent, DialogHeader } from '@uiux/Dialog';

const CHATBOT_DIALOG_WIDTH = 400;
const CHATBOT_DIALOG_HEIGHT = 560;
const VIEWPORT_MARGIN = 12;

function getInitialDialogPosition(buttonRect: DOMRect): { x: number; y: number } {
  const maxLeft = window.innerWidth - CHATBOT_DIALOG_WIDTH - VIEWPORT_MARGIN;
  const maxTop = window.innerHeight - CHATBOT_DIALOG_HEIGHT - VIEWPORT_MARGIN;

  // 버튼의 right에 맞추어 모달의 left 결정 (오른쪽 정렬)
  const targetLeft = buttonRect.right - CHATBOT_DIALOG_WIDTH;
  // 버튼의 top 기준으로 모달 높이와 12px 간격을 빼서 모달의 top 결정
  const targetTop = buttonRect.top - CHATBOT_DIALOG_HEIGHT - 12;

  const left = Math.min(Math.max(targetLeft, VIEWPORT_MARGIN), maxLeft);
  const top = Math.min(Math.max(targetTop, VIEWPORT_MARGIN), maxTop);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  return {
    x: left + CHATBOT_DIALOG_WIDTH / 2 - centerX,
    y: top + CHATBOT_DIALOG_HEIGHT / 2 - centerY,
  };
}

export interface Ltpa120Props {
  isButton?: boolean;
  className?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  minimized?: boolean;
  onMinimizeChange?: (minimized: boolean) => void;
}

export const Ltpa120 = ({
  isButton = true,
  open: openProp,
  setOpen: setOpenProp,
  minimized,
  className,
  onMinimizeChange,
}: Ltpa120Props) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [defaultPosition, setDefaultPosition] = React.useState({ x: 0, y: 0 });
  const open = openProp !== undefined ? openProp : internalOpen;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setInternalOpen;

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDefaultPosition(getInitialDialogPosition(rect));
    }
    setOpen(true);
  };

  useMounted(
    () => {},
    () => {
      // unmount시 레퍼런스 삭제
      chatbotUtils.setRef(null);
    }
  );

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        chatbotUtils.setRef(null);
        setOpen(!open);
      }}
      modal={false}
      minimized={minimized}
      onMinimizeChange={onMinimizeChange}
    >
      {isButton && (
        <button
          ref={buttonRef}
          type="button"
          aria-label={'백프로에게 물어보세요!'}
          className="max-w-[4rem] w-[4rem] h-[2.8rem] min-w-0 h-[2.8rem] relative shrink-0 flex justify-center"
          onClick={handleOpen}
        >
          <span className="w-[2.8rem] h-[2.8rem] relative flex justify-center items-center rounded-full shadow-[0_0.6rem_0.6rem_rgba(255,152,22,0.50)]">
            <Image
              src={withPublicUrl('/images/AI_01_b2.svg')}
              alt="백프로에게 물어보세요!"
              width={40}
              height={40}
              className="w-[101%] h-[101%] object-contain [backface-visibility:hidden] [shape-rendering:geometricPrecision] [image-rendering:-webkit-optimize-contrast]"
            />
          </span>
        </button>
      )}

      <DialogContent
        popupId="LTPA120"
        defaultPosition={defaultPosition}
        showCloseButton={true}
        showOverlay={true}
        resizable={true}
        minimized={true}
        zIndex={1000}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
        closeButtonClassName="absolute right-[1.2rem] top-[1.8rem] z-10 flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full bg-[var(--color-primary-50)] transition-colors hover:bg-[var(--color-primary-60)] [&>svg]:w-[1.4rem] [&>svg]:h-[1.4rem] [&>svg_path]:fill-white"
        minimizeButtonClassName="absolute right-[4rem] top-[1.8rem] z-10 flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full bg-[var(--color-primary-50)] transition-colors hover:bg-[var(--color-primary-60)] [&>span]:!bg-[var(--color-gray-0)] [&>span]:!border-[var(--color-gray-0)]"
        className={cn(
          'ai-chatbot w-[19.8rem] h-[56rem] min-w-[40rem] min-h-[30rem] max-w-[calc(100vw-2.4rem)] max-h-[calc(100vh-2.4rem)] p-0 gap-0 overflow-hidden grid-rows-[auto_1fr] bg-transparent border-0',
          className
        )}
      >
        <DialogHeader className="!max-h-[4.9rem] h-[4.9rem] min-h-0 !p-0 items-end">
          <Grow
            className="w-full relative bg-[rgba(0,0,0,0.75)] backdrop-blur-xs h-[4rem] rounded-t-[1rem] pl-3 pr-[6.6rem]"
            placement="se"
            gap={0}
          >
            <div className="pb-[1.2rem] leading-[1.1] bg-[linear-gradient(328deg,rgba(255,92,46,1)_9.4%,rgba(255,244,147,1)_97.24%)] bg-clip-text text-transparent break-keep text-[1.4rem] font-black">
              AI설계비서
            </div>
            <Image src={withPublicUrl('/images/chatbot-top.svg')} alt="백프로" width={50} height={48} />
          </Grow>
        </DialogHeader>
        <div className="w-full h-full min-h-0 bg-white rounded-b-[1rem] overflow-hidden border border-[#404040] border-t-0!">
          <iframe
            ref={(el) => chatbotUtils.setRef(el)}
            src="http://localhost:6006/hgi/chatbot.html"
            title={'AI 챗봇'}
            className="w-full h-full border-0"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpa120;
