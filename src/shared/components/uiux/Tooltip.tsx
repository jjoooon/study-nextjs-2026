'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  variant = 'default',
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  variant?: 'default' | 'dark' | 'light';
}) {
  const variantStyles = {
    default: 'bg-gray-900 text-white',
    dark: 'bg-black text-white',
    light: 'bg-[#f5f5f5] text-gray-900 border border-gray-300',
  };

  const arrowStyles = {
    default: 'bg-gray-900 fill-gray-900',
    dark: 'bg-black fill-black',
    light: 'bg-[#f5f5f5] fill-[#f5f5f5] border border-gray-300',
  };

  const contentStyles = {
    default: 'bg-gray-900 fill-gray-900 rounded-md',
    dark: 'bg-black fill-black rounded-md',
    light: 'bg-[#f5f5f5] fill-[#f5f5f5] rounded-md',
  };

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md text-xs text-balance',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className={cn('px-3 py-1.5 relative z-51', contentStyles[variant], className)}>{children}</div>
        <TooltipPrimitive.Arrow
          className={cn(
            'bg-foreground fill-foreground size-2 translate-y-[calc(-50%-0.2rem)] rotate-45 rounded-[0.2rem]',
            arrowStyles[variant]
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
