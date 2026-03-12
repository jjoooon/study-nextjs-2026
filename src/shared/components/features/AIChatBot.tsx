'use client';

import Image from 'next/image';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@uiux/Dialog';

const CHATBOT_DIALOG_WIDTH = 420;
const CHATBOT_DIALOG_HEIGHT = 560;
const VIEWPORT_MARGIN = 12;

function getInitialDialogPosition(anchorRect: DOMRect): { x: number; y: number } {
  const maxLeft = window.innerWidth - CHATBOT_DIALOG_WIDTH - VIEWPORT_MARGIN;
  const maxTop = window.innerHeight - CHATBOT_DIALOG_HEIGHT - VIEWPORT_MARGIN;

  const left = Math.min(
    Math.max(anchorRect.right - CHATBOT_DIALOG_WIDTH, VIEWPORT_MARGIN),
    maxLeft
  );
  const top = Math.min(
    Math.max(anchorRect.top - CHATBOT_DIALOG_HEIGHT - 8, VIEWPORT_MARGIN),
    maxTop
  );

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  return {
    x: left + CHATBOT_DIALOG_WIDTH / 2 - centerX,
    y: top + CHATBOT_DIALOG_HEIGHT / 2 - centerY,
  };
}

export default function AIChatBot() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [defaultPosition, setDefaultPosition] = React.useState({ x: 0, y: 0 });

  const handleOpen = () => {
    if (buttonRef.current) {
      setDefaultPosition(getInitialDialogPosition(buttonRef.current.getBoundingClientRect()));
    }
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={'챗봇'}
        className="max-w-[4rem] w-[4rem] h-[2.8rem] min-w-0 h-[2.8rem] relative shrink-0"
        onClick={handleOpen}
      >
        <Image src="/images/chatbot.png" alt="챗봇" width={32} height={32} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[4rem] h-[4rem]" />
      </button>

      <DialogContent
        defaultPosition={defaultPosition}
        resizable={true}
        className="w-[42rem] h-[56rem] min-w-[32rem] min-h-[32rem] max-w-[calc(100vw-2.4rem)] max-h-[calc(100vh-2.4rem)] p-0 gap-0 overflow-hidden grid-rows-[auto_1fr]"
      >
        <DialogHeader className="min-h-[4.4rem] px-[1.6rem] py-[1.2rem] border-b border-[var(--color-gray-15)]">
          <DialogTitle className="text-[1.4rem]">AI 챗봇</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full min-h-0">
          <iframe
            src={'https://m.hwgeneralins.com/'}
            title={'AI 챗봇'}
            className="w-full h-full border-0"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}