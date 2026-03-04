'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Trigger ref={ref} className={cn(className)} {...props}>
    {children}
  </PopoverPrimitive.Trigger>
));
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

const PopoverAnchor = PopoverPrimitive.Anchor;

type PopoverMotion = 'fade' | 'scale' | 'none';

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  motion?: PopoverMotion;
  portalContainer?: HTMLElement | null;
}

const motionClassMap: Record<PopoverMotion, string> = {
  fade: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  scale: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  none: '',
};

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = 'center', sideOffset = 4, motion = 'fade', portalContainer, ...props }, ref) => {
  let motionClass = '';
  if (motion === 'fade') {
    motionClass = motionClassMap.fade;
  } else if (motion === 'scale') {
    motionClass = motionClassMap.scale;
  } else {
    motionClass = '';
  }
  React.useEffect(() => {
    // Inject style for data-radix-popper-content-wrapper only if portalContainer is set
    if (portalContainer) {
      const styleId = 'popover-content-wrapper-absolute-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = '[data-radix-popper-content-wrapper]{position:absolute !important;}';
        document.head.appendChild(style);
      }
      // Optionally remove style on unmount if needed
      // return () => { document.getElementById(styleId)?.remove(); };
    }
  }, [portalContainer]);
  return (
    <PopoverPrimitive.Portal {...(portalContainer ? { container: portalContainer } : {})}>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-auto border rounded-[.8rem] bg-popover p-4 text-popover-foreground shadow-md outline-none',
          motionClass,
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
